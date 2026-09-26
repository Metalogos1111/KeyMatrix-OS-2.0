/**
 * KeyMatrix OS v2.1 — Phase 6.9 & 6.9.1 Agent Runtime & Tool Loop Tests
 * Verifies AgentLoop, ToolGateway, SkillLoader, ConversationProvider, ExecutionProviderRegistry,
 * fail-closed unknown tool handling, cancellation propagation, and canonical 8-level evidence vocabulary.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { AgentLoop } from '../agent/AgentLoop';
import { toolGateway } from '../agent/ToolGateway';
import { skillLoader } from '../skills/SkillLoader';
import { INITIAL_CONNECTOR_MANIFESTS } from '../../types/connectorTypes';
import { localExecutionProvider } from '../runtime/LocalExecutionProvider';
import { executionProviderRegistry } from '../runtime/ExecutionProvider';
import { conversationProviderRegistry } from '../providers/ConversationProvider';
import { getDefaultResonanceMetrics } from '../resonance';

describe('Phase 6.9.1 — Provider-Agnostic Agent Runtime & Tool Loop Hardening', () => {
  beforeEach(async () => {
    await localExecutionProvider.init('ws-phase-6-9-test');
  });

  it('1. Executes bounded AgentLoop workflow cleanly via ConversationProvider', async () => {
    const loop = new AgentLoop(conversationProviderRegistry.getDefaultProvider(), { maxSteps: 4 });
    const result = await loop.runLoop('task-test-01', 'Run the project checks and build');

    expect(result.taskId).toBe('task-test-01');
    expect(result.status).toBe('COMPLETED');
    expect(result.stepsExecuted).toBeGreaterThan(0);
    expect(result.evidenceRefs.length).toBeGreaterThan(0);
    expect(result.finalOutput).toBeDefined();
  });

  it('2. Enforces AgentLoop step bounds (maxSteps = 2)', async () => {
    const loop = new AgentLoop(conversationProviderRegistry.getDefaultProvider(), { maxSteps: 2 });
    const result = await loop.runLoop('task-test-bounded', 'Run lint and build and tests and repair');

    expect(result.stepsExecuted).toBeLessThanOrEqual(2);
  });

  it('3. Supports loop cancellation via stop() with end-to-end cancellation propagation', async () => {
    const loop = new AgentLoop(conversationProviderRegistry.getDefaultProvider(), { maxSteps: 8 });
    const runPromise = loop.runLoop('task-test-cancel', 'Run long sequence', {
      onStepChange: (step) => {
        if (step.type === 'TOOL_REQUEST') {
          loop.stop(); // Cancel mid-loop and propagate cancelExecution()
        }
      },
    });

    const result = await runPromise;
    expect(result.status).toBe('CANCELLED');
    expect(result.finalOutput).toContain('cancelled');
  });

  it('4. ToolGateway resolves capability status and execution mode', () => {
    const termCap = toolGateway.resolveCapabilityStatus('tool-terminal');
    expect(['AVAILABLE_LOCAL', 'SIMULATED']).toContain(termCap.status);
    expect(['NATIVE_WEBCONTAINER', 'VIRTUAL_FILESYSTEM_FALLBACK']).toContain(termCap.executionMode);

    const apiCap = toolGateway.resolveCapabilityStatus('tool-api');
    expect(apiCap.status).toBe('DISABLED');
    expect(apiCap.executionMode).toBe('DISABLED');
  });

  it('5. ToolGateway restricts DISABLED or BLOCKED tools', async () => {
    const res = await toolGateway.invokeTool({
      id: 'tc-disabled-01',
      toolId: 'tool-api',
      taskId: 'task-api-01',
      stepId: 'step-1',
      arguments: { action: 'fetchExternalApi' },
      requestedBy: 'MetaLogos',
      riskLevel: 'HIGH',
      capabilityStatus: 'DISABLED',
      simulationOnly: true,
      requiresUserCheckpoint: true,
      createdAt: new Date().toISOString(),
    });

    expect(res.status).toBe('BLOCKED');
    expect(res.error).toContain('DISABLED');
    expect(res.evidenceLevel).toBe('OBSERVED');
  });

  it('6. FAIL-CLOSED HARDENING: Unknown tool ID resolves strictly to BLOCKED', () => {
    const unknownCap = toolGateway.resolveCapabilityStatus('tool-unknown-malicious-id');
    expect(unknownCap.status).toBe('BLOCKED');
    expect(unknownCap.executionMode).toBe('BLOCKED');
  });

  it('7. SkillLoader parses SKILL.md files and enforces Skill != Tool boundary', () => {
    const skills = skillLoader.listSkills();
    expect(skills.length).toBeGreaterThanOrEqual(5);

    const frontendSkill = skillLoader.getSkill('skill-frontend');
    expect(frontendSkill).toBeDefined();
    expect(frontendSkill?.allowedTools).toContain('tool-terminal');

    const check = skillLoader.validateSkillUsage('skill-frontend', 'tool-forbidden-tool');
    expect(check.allowed).toBe(false);
    expect(check.reason).toContain('does not allow requested tool');
  });

  it('8. Canonical 8-Level Evidence Vocabulary in Skill Instructions', () => {
    const uiSkill = skillLoader.getSkill('skill-keymatrix-ui');
    expect(uiSkill).toBeDefined();
    expect(uiSkill?.instructions).toContain('1 DECLARED');
    expect(uiSkill?.instructions).toContain('2 DOCUMENTED');
    expect(uiSkill?.instructions).toContain('3 IMPLEMENTED');
    expect(uiSkill?.instructions).toContain('4 RUNNING');
    expect(uiSkill?.instructions).toContain('5 OBSERVED');
    expect(uiSkill?.instructions).toContain('6 VERIFIED');
    expect(uiSkill?.instructions).toContain('7 REPRODUCED');
    expect(uiSkill?.instructions).toContain('8 PROVEN');
  });

  it('9. ConnectorManifests are schema-only and marked DISABLED or HOLD', () => {
    expect(INITIAL_CONNECTOR_MANIFESTS.length).toBeGreaterThan(0);
    for (const connector of INITIAL_CONNECTOR_MANIFESTS) {
      expect(['DISABLED', 'HOLD']).toContain(connector.status);
      expect(connector.simulationOnly).toBe(true);
    }
  });

  it('10. HARD CAP INVARIANT: All tool execution evidence is capped strictly at OBSERVED', async () => {
    const res = await toolGateway.invokeTool({
      id: 'tc-evidence-check',
      toolId: 'tool-terminal',
      taskId: 'task-ev-01',
      stepId: 'step-ev-1',
      arguments: { command: 'npm run lint' },
      requestedBy: 'MetaLogos',
      riskLevel: 'LOW',
      capabilityStatus: 'AVAILABLE_LOCAL',
      simulationOnly: true,
      requiresUserCheckpoint: false,
      createdAt: new Date().toISOString(),
    });

    expect(res.evidenceLevel).toBe('OBSERVED');
    expect(res.evidenceLevel).not.toBe('VERIFIED');
    expect(res.evidenceLevel).not.toBe('PROVEN');
  });

  it('11. Local permission checkpoint rejection halts tool execution', async () => {
    const res = await toolGateway.invokeTool(
      {
        id: 'tc-high-risk-denied',
        toolId: 'tool-terminal',
        taskId: 'task-perm-01',
        stepId: 'step-perm-1',
        arguments: { command: 'rm -rf /' },
        requestedBy: 'MetaLogos',
        riskLevel: 'HIGH',
        capabilityStatus: 'AVAILABLE_LOCAL',
        simulationOnly: true,
        requiresUserCheckpoint: true,
        createdAt: new Date().toISOString(),
      },
      async () => 'LOCAL_POLICY_DENIED'
    );

    expect(res.status).toBe('DENIED');
    expect(res.error).toContain('User denied execution');
  });

  it('12. ExecutionProviderRegistry registers multiple execution providers', () => {
    const providers = executionProviderRegistry.listProviders();
    expect(providers.length).toBeGreaterThanOrEqual(2);

    const defaultProvider = executionProviderRegistry.getDefaultProvider();
    expect(defaultProvider.id).toBe('local-webcontainer-provider-01');

    const remotePlaceholder = executionProviderRegistry.getProvider('remote-execution-provider-placeholder');
    expect(remotePlaceholder?.availability).toBe('DISABLED');
  });

  it('13. INVARIANT CHECK: PoR finality remains strictly null', () => {
    const por = getDefaultResonanceMetrics();
    expect(por.finality).toBeNull();
    expect(por.finality).not.toBe('NULL');
  });
});
