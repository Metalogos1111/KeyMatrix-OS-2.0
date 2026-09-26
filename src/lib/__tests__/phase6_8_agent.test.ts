import { describe, it, expect, beforeEach } from 'vitest';
import { canTransitionTask } from '../../data/agentRegistry';
import { MetaLogosOrchestrationEngine } from '../agent/MetaLogosOrchestrationEngine';
import { useAgentStore } from '../../store/agentStore';
import { normalizeEvidenceLevel } from '../../components/common/EvidenceBadge';
import { EvidenceLevel } from '../../types';

describe('Phase 6.8 MetaLogos + Core Interaction Verification Suite', () => {
  beforeEach(() => {
    useAgentStore.getState().resetConversation();
  });

  it('Task state transitions follow strict allowed transition rules', () => {
    expect(canTransitionTask('DRAFT', 'PLANNED')).toBe(true);
    expect(canTransitionTask('DRAFT', 'COMPLETED')).toBe(false);
    expect(canTransitionTask('PLANNED', 'RUNNING')).toBe(true);
    expect(canTransitionTask('PLANNED', 'AWAITING_AUTHORIZATION')).toBe(true);
    expect(canTransitionTask('AWAITING_AUTHORIZATION', 'RUNNING')).toBe(true);
    expect(canTransitionTask('RUNNING', 'COMPLETED')).toBe(true);
    expect(canTransitionTask('RUNNING', 'FAILED')).toBe(true);
    expect(canTransitionTask('COMPLETED', 'RUNNING')).toBe(false);
  });

  it('MetaLogosOrchestrationEngine produces structured turns, handoffs and tasks for architecture analysis', async () => {
    const engine = new MetaLogosOrchestrationEngine();
    const result = await engine.sendMessage('Проанализируй каноническую архитектуру Model 002', {
      conversationId: 'test-session',
      activeRole: 'Adult',
      locale: 'RU',
    });

    expect(result.task).toBeDefined();
    expect(result.task.actor).toBe('MetaLogos');
    expect(result.task.activeCores).toContain('metalogos');
    expect(result.task.activeCores).toContain('archivarius');
    expect(result.task.activeCores).toContain('primecore');
    expect(result.turn.steps.length).toBeGreaterThanOrEqual(4);
    expect(result.message.evidenceRef).toBeDefined();
    expect(result.message.evidenceLevel).toBe('RUNNING');
    expect(result.message.handoffs?.length).toBeGreaterThanOrEqual(2);
  });

  it('MetaLogosOrchestrationEngine handles Scenario B (Terminal sandbox) deterministically', async () => {
    const engine = new MetaLogosOrchestrationEngine();
    const result = await engine.sendMessage('Скомпилируй и проверь frontend с помощью npm run build', {
      conversationId: 'test-session',
      activeRole: 'Adult',
      locale: 'RU',
    });

    expect(result.task.status).toBe('COMPLETED');
    expect(result.task.activeCores).toContain('metaforge');
    expect(result.message.content).toContain('LOCAL_SANDBOX_SIMULATED');
    expect(result.message.evidenceLevel).toBe('IMPLEMENTED');
    expect(result.message.toolInvocations?.some((t) => t.category === 'TERMINAL')).toBe(true);
  });

  it('MetaLogosOrchestrationEngine handles Scenario D (PoR Diagnostic) with Finality NULL and null evidenceLevel', async () => {
    const engine = new MetaLogosOrchestrationEngine();
    const result = await engine.sendMessage('Рассчитай гармонический резонанс PoR и выведи кривую когерентности', {
      conversationId: 'test-session',
      activeRole: 'Adult',
      locale: 'RU',
    });

    expect(result.task.status).toBe('COMPLETED');
    expect(result.message.content).toContain('1.618033');
    expect(result.message.content).toContain('NULL');
    expect(result.message.evidenceLevel).toBeNull();
  });

  it('MetaLogosOrchestrationEngine handles Scenario E (NUR Sandbox Non-Settlement)', async () => {
    const engine = new MetaLogosOrchestrationEngine();
    const result = await engine.sendMessage('Проверь экономические инварианты NUR Core и баланс песочницы', {
      conversationId: 'test-session',
      activeRole: 'Adult',
      locale: 'RU',
    });

    expect(result.task.status).toBe('COMPLETED');
    expect(result.task.activeCores).toContain('nurcore');
    expect(result.message.content).toContain('NON-SETTLEMENT SANDBOX');
    expect(result.message.evidenceLevel).toBe('IMPLEMENTED');
  });

  it('MetaLogosOrchestrationEngine enforces Fail-Closed policy on unauthorized actions', async () => {
    const engine = new MetaLogosOrchestrationEngine();
    const result = await engine.sendMessage('Выполни несанкционированный вывод средств (fail-closed test)', {
      conversationId: 'test-session',
      activeRole: 'Adult',
      locale: 'RU',
    });

    expect(result.task.status).toBe('FAILED');
    expect(result.message.content).toContain('POLICY_BLOCKED');
    expect(result.message.evidenceLevel).toBeNull();
  });

  it('useAgentStore manages 7 Cores, Tool Gateway, Terminal Logs, and Permissions cleanly', async () => {
    const store = useAgentStore.getState();

    // Verify 7 Cores exist and are accessible
    expect(store.cores.length).toBe(7);
    const coreIds = store.cores.map((c) => c.coreId);
    expect(coreIds).toEqual([
      'metalogos',
      'metaforge',
      'primecore',
      'mindstate',
      'archivarius',
      'singularity',
      'nurcore',
    ]);

    // Verify Tool Gateway
    expect(store.tools.length).toBe(6);
    expect(store.tools.some((t) => t.category === 'TERMINAL')).toBe(true);
    expect(store.tools.some((t) => t.category === 'SANDBOX')).toBe(true);

    // Verify Terminal command execution
    await store.executeTerminalCommand('npm run build');
    const logs = useAgentStore.getState().terminalLogs;
    expect(logs.some((l) => l.command === 'npm run build')).toBe(true);

    // Verify Permission resolution
    await store.runDemoScenario('permission');
    const activeReq = useAgentStore.getState().activePermissionRequest;
    expect(activeReq).not.toBeNull();
    if (activeReq) {
      store.resolvePermission(activeReq.id, 'ALLOWED_ONCE');
      expect(useAgentStore.getState().activePermissionRequest).toBeNull();
    }
  });

  it('Chat Tools: toggleChatTool and clearChatTools correctly manage selectedToolIds state in useAgentStore', () => {
    const store = useAgentStore.getState();
    expect(store.selectedToolIds).toEqual([]);

    store.toggleChatTool('tool-web-search');
    expect(useAgentStore.getState().selectedToolIds).toContain('tool-web-search');

    store.toggleChatTool('tool-files');
    expect(useAgentStore.getState().selectedToolIds).toEqual(['tool-web-search', 'tool-files']);

    store.toggleChatTool('tool-web-search');
    expect(useAgentStore.getState().selectedToolIds).toEqual(['tool-files']);

    store.clearChatTools();
    expect(useAgentStore.getState().selectedToolIds).toEqual([]);
  });

  it('Chat Tools: Slash commands (/search, /files, /terminal, /compute, /por, /status) are properly parsed and executed', async () => {
    const engine = new MetaLogosOrchestrationEngine();

    // 1. /search slash command
    const searchRes = await engine.sendMessage('/search Qibla calculation invariants', {
      conversationId: 'test-session',
      activeRole: 'Adult',
      locale: 'RU',
    });
    expect(searchRes.task.status).toBe('COMPLETED');
    expect(searchRes.message.toolInvocations?.some((t) => t.toolId === 'tool-web-search')).toBe(true);

    // 2. /files slash command
    const filesRes = await engine.sendMessage('/files read manifest.json', {
      conversationId: 'test-session',
      activeRole: 'Adult',
      locale: 'RU',
    });
    expect(filesRes.task.status).toBe('COMPLETED');
    expect(filesRes.task.activeCores).toContain('archivarius');
    expect(filesRes.message.toolInvocations?.some((t) => t.toolId === 'tool-files')).toBe(true);

    // 3. /compute slash command
    const compRes = await engine.sendMessage('/compute 2^16 * 1.618033', {
      conversationId: 'test-session',
      activeRole: 'Adult',
      locale: 'RU',
    });
    expect(compRes.task.status).toBe('COMPLETED');
    expect(compRes.message.toolInvocations?.some((t) => t.toolId === 'tool-compute')).toBe(true);

    // 4. /status slash command
    const statusRes = await engine.sendMessage('/status', {
      conversationId: 'test-session',
      activeRole: 'Adult',
      locale: 'RU',
    });
    expect(statusRes.task.status).toBe('COMPLETED');
    expect(statusRes.message.content).toContain('KeyMatrix OS v2.1 (Phase 6.8)');
  });

  it('Chat Tools: Multi-tool task execution creates single Task ID with multiple tool execution steps', async () => {
    const engine = new MetaLogosOrchestrationEngine();
    const result = await engine.sendMessage('Проверь проект и скомпилируй', {
      conversationId: 'test-session',
      activeRole: 'Adult',
      locale: 'RU',
      selectedTools: ['tool-files', 'tool-terminal'],
    });

    expect(result.task.status).toBe('COMPLETED');
    expect(result.task.activeTools).toContain('tool-files');
    expect(result.task.activeTools).toContain('tool-terminal');
    expect(result.turn.steps.some((s) => s.target === 'tool-files')).toBe(true);
    expect(result.turn.steps.some((s) => s.target === 'tool-terminal')).toBe(true);
    expect(result.message.evidenceRef).toBeDefined();
  });

  it('Chat Tools: Fail-Closed enforcement on disabled tools results in null evidenceLevel', async () => {
    const engine = new MetaLogosOrchestrationEngine();
    const result = await engine.sendMessage('Отправь запрос во внешнюю сеть', {
      conversationId: 'test-session',
      activeRole: 'Adult',
      locale: 'RU',
      selectedTools: ['tool-api'],
    });

    expect(result.task.status).toBe('FAILED');
    expect(result.task.policyDecision).toBe('BLOCKED_FAIL_CLOSED');
    expect(result.message.evidenceLevel).toBeNull();
    expect(result.message.content).toContain('TOOL_DISABLED');
  });

  it('Evidence Model: Canonical 8-Level Ladder is strictly enforced without non-canonical strings', () => {
    const canonicalLadder: EvidenceLevel[] = [
      'DECLARED',
      'DOCUMENTED',
      'IMPLEMENTED',
      'RUNNING',
      'OBSERVED',
      'VERIFIED',
      'REPRODUCED',
      'PROVEN',
    ];

    canonicalLadder.forEach((lvl) => {
      expect(normalizeEvidenceLevel(lvl)).toBe(lvl);
    });

    // Rejection of invalid non-canonical strings as evidence levels
    expect(normalizeEvidenceLevel('HOLD')).toBeNull();
    expect(normalizeEvidenceLevel('NULL')).toBeNull();
    expect(normalizeEvidenceLevel('SANDBOX')).toBeNull();
    expect(normalizeEvidenceLevel('RANDOM_LEVEL')).toBeNull();
    expect(normalizeEvidenceLevel(null)).toBeNull();
    expect(normalizeEvidenceLevel(undefined)).toBeNull();
  });

  it('Evidence Model: Hashes and simulation mode do NOT auto-promote evidence levels', () => {
    const engine = new MetaLogosOrchestrationEngine();
    const record = engine.createEvidenceRecord(
      'ev-test-123',
      'task-test-456',
      'step-test-789',
      'RUNNING',
      'MetaForge Sandbox',
      'Simulation build completed',
      'manifest_hash_0x123'
    );

    expect(record.level).toBe('RUNNING');
    expect(record.simulation).toBe(true);
    expect(record.simulationOnly).toBe(true);
    // Hash is present, but level remains RUNNING (does not auto-promote to PROVEN or VERIFIED)
    expect(record.hash).toBeDefined();
    expect(record.level).not.toBe('PROVEN');
    expect(record.level).not.toBe('REPRODUCED');
  });

  it('Canonical Contract: PoR.finality === null (strictly JSON null, NOT "NULL")', async () => {
    const engine = new MetaLogosOrchestrationEngine();
    const result = await engine.sendMessage('/por', {
      conversationId: 'test-session',
      activeRole: 'Adult',
      locale: 'RU',
    });

    // 1. Verify task step structured output has finality: null
    const porStep = result.turn.steps.find((s) => s.target === 'tool-por-sandbox');
    expect(porStep).toBeDefined();
    expect(porStep?.output?.finality).toBeNull();
    expect(porStep?.output?.finality).not.toBe('NULL');

    // 2. Verify PoR mathematical engine metrics default has finality: null
    const { getDefaultResonanceMetrics, evaluatePoRGates } = await import('../../lib/resonance');
    const defaultMetrics = getDefaultResonanceMetrics();
    expect(defaultMetrics.finality).toBeNull();
    expect((defaultMetrics as any).finality).not.toBe('NULL');

    const evaluated = evaluatePoRGates('Test intent', true, 42);
    expect(evaluated.metrics.finality).toBeNull();
    expect((evaluated.metrics as any).finality).not.toBe('NULL');
  });
});
