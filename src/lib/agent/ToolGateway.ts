/**
 * KeyMatrix OS v2.1 — Phase 6.9.1 Tool Gateway Implementation
 * Normalizes tool invocation, capability inspection, local UX policy checkpoints,
 * execution routing via ExecutionProviderRegistry, evidence attachment, and status tracking.
 *
 * ARCHITECTURAL INVARIANTS:
 * - ToolGateway does NOT grant production authority or Shura quorum.
 * - Evidence Ladder level is hard capped strictly at 'OBSERVED'.
 * - Local UX user approval != Authority Decision != Cryptographic Quorum.
 * - Fail-Closed: Unknown tool IDs resolve to 'BLOCKED'.
 */

import {
  ToolCall,
  ToolResult,
  GatewayToolStatus,
  ToolExecutionMode,
  LocalPermissionDecision,
} from '../../types/toolRuntimeTypes';
import { RiskLevel, StepType } from '../../types/agentTypes';
import { executionProviderRegistry } from '../runtime/ExecutionProvider';

export interface ToolGatewayEventListener {
  (event: {
    type: StepType;
    toolCallId: string;
    taskId: string;
    stepId: string;
    actor: string;
    data: any;
    timestamp: string;
  }): void;
}

export class ToolGateway {
  private listeners: Set<ToolGatewayEventListener> = new Set();
  private activeProcessIdMap: Map<string, string> = new Map(); // toolCallId -> processId

  subscribe(listener: ToolGatewayEventListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private emit(
    type: StepType,
    toolCallId: string,
    taskId: string,
    stepId: string,
    actor: string,
    data: any
  ) {
    const timestamp = new Date().toISOString();
    this.listeners.forEach((listener) => {
      listener({ type, toolCallId, taskId, stepId, actor, data, timestamp });
    });
  }

  /**
   * Resolves tool capability status based on tool ID and ExecutionProvider state.
   * FAIL-CLOSED HARDENING: Unknown tools resolve strictly to 'BLOCKED'.
   */
  resolveCapabilityStatus(toolId: string): { status: GatewayToolStatus; executionMode: ToolExecutionMode } {
    const provider = executionProviderRegistry.getDefaultProvider();
    const diag = provider.getDiagnosticInfo();

    const knownTerminalTools = ['tool-terminal', 'terminal', 'tool-files', 'files', 'tool-editor', 'editor'];
    if (knownTerminalTools.includes(toolId)) {
      if (diag.isNativeWebContainerBooted) {
        return { status: 'AVAILABLE_LOCAL', executionMode: 'NATIVE_WEBCONTAINER' };
      }
      return { status: 'SIMULATED', executionMode: 'VIRTUAL_FILESYSTEM_FALLBACK' };
    }

    if (toolId === 'tool-por-sandbox' || toolId === 'por-sandbox') {
      return { status: 'HOLD', executionMode: 'SIMULATED' };
    }

    if (toolId === 'tool-api' || toolId === 'external-api') {
      return { status: 'DISABLED', executionMode: 'DISABLED' };
    }

    // FAIL-CLOSED INVARIANT: Unknown tools are BLOCKED
    return { status: 'BLOCKED', executionMode: 'BLOCKED' };
  }

  /**
   * Determines if a ToolCall requires a user UX permission checkpoint modal.
   */
  requiresCheckpoint(toolId: string, commandOrArgs: string, riskLevel: RiskLevel): boolean {
    if (riskLevel === 'HIGH' || riskLevel === 'CRITICAL') return true;

    const highRiskKeywords = ['rm ', 'install', 'delete', 'sudo', 'chmod', 'chown', 'eval', 'exec'];
    if (highRiskKeywords.some((kw) => commandOrArgs.toLowerCase().includes(kw))) {
      return true;
    }

    return false;
  }

  /**
   * Submits a ToolCall request to the Gateway.
   */
  async invokeTool(
    toolCall: ToolCall,
    onPermissionRequired?: (toolCall: ToolCall) => Promise<LocalPermissionDecision>
  ): Promise<ToolResult> {
    const startTime = Date.now();
    const provider = executionProviderRegistry.getDefaultProvider();
    const { status: capabilityStatus, executionMode } = this.resolveCapabilityStatus(toolCall.toolId);

    this.emit('TOOL_REQUEST', toolCall.id, toolCall.taskId, toolCall.stepId, toolCall.requestedBy, {
      toolId: toolCall.toolId,
      arguments: toolCall.arguments,
      capabilityStatus,
      executionMode,
    });

    // Check capability status (Fail-Closed Rejection)
    if (capabilityStatus === 'DISABLED' || capabilityStatus === 'BLOCKED') {
      const err = `Tool '${toolCall.toolId}' is ${capabilityStatus} in ToolGateway (Fail-Closed Policy).`;
      this.emit('TOOL_RESULT', toolCall.id, toolCall.taskId, toolCall.stepId, 'ToolGateway', { status: 'BLOCKED', error: err });
      return {
        toolCallId: toolCall.id,
        taskId: toolCall.taskId,
        stepId: toolCall.stepId,
        status: 'BLOCKED',
        output: '',
        error: err,
        durationMs: Date.now() - startTime,
        executionMode: 'DISABLED',
        evidenceLevel: 'OBSERVED',
        simulationOnly: true,
        completedAt: new Date().toISOString(),
      };
    }

    // UX Permission Checkpoint if required
    let permissionDecision: LocalPermissionDecision = 'LOCAL_POLICY_ALLOWED';
    if (toolCall.requiresUserCheckpoint) {
      this.emit('AUTHORIZATION_CHECK', toolCall.id, toolCall.taskId, toolCall.stepId, 'ToolGateway', {
        checkpointMessage: 'Local UX Checkpoint required: User Approval != Authority Decision != Cryptographic Quorum',
      });

      if (onPermissionRequired) {
        permissionDecision = await onPermissionRequired(toolCall);
      } else {
        permissionDecision = 'LOCAL_POLICY_ALLOWED';
      }

      if (permissionDecision === 'LOCAL_POLICY_DENIED') {
        const err = `User denied execution in local UX permission modal: '${toolCall.toolId}'.`;
        this.emit('TOOL_RESULT', toolCall.id, toolCall.taskId, toolCall.stepId, 'ToolGateway', { status: 'DENIED', error: err });
        return {
          toolCallId: toolCall.id,
          taskId: toolCall.taskId,
          stepId: toolCall.stepId,
          status: 'DENIED',
          output: '',
          error: err,
          durationMs: Date.now() - startTime,
          executionMode,
          evidenceLevel: 'OBSERVED',
          simulationOnly: true,
          completedAt: new Date().toISOString(),
        };
      }
    }

    // Execution routing
    this.emit('TOOL_EXECUTION', toolCall.id, toolCall.taskId, toolCall.stepId, provider.id, {
      executionMode,
      command: toolCall.arguments.command || toolCall.arguments.action,
    });

    try {
      const cmd = toolCall.arguments.command || toolCall.arguments.action || `echo "Executing ${toolCall.toolId}"`;
      const execReq = {
        id: toolCall.id,
        command: cmd,
        cwd: toolCall.arguments.cwd || '.',
        requestedBy: toolCall.requestedBy,
      };

      const result = await provider.executeCommand(execReq, (streamEvt) => {
        if (streamEvt.processId) {
          this.activeProcessIdMap.set(toolCall.id, streamEvt.processId);
        }
        if (streamEvt.type === 'STDOUT' || streamEvt.type === 'STDERR') {
          this.emit('TOOL_EXECUTION', toolCall.id, toolCall.taskId, toolCall.stepId, 'ExecutionProviderStream', {
            streamType: streamEvt.type,
            data: streamEvt.data,
          });
        }
      });

      this.activeProcessIdMap.delete(toolCall.id);

      const toolResultStatus = result.exitCode === 0 ? 'SUCCESS' : 'ERROR';
      const durationMs = Date.now() - startTime;
      const evidenceRef = `ev-tool-${toolCall.id}`;

      this.emit('EVIDENCE_CAPTURE', toolCall.id, toolCall.taskId, toolCall.stepId, 'Archivarius', {
        evidenceRef,
        evidenceLevel: 'OBSERVED',
        hash: result.evidenceRef,
        summary: `Captured OBSERVED evidence for tool ${toolCall.toolId} ($ ${cmd})`,
      });

      const finalResult: ToolResult = {
        toolCallId: toolCall.id,
        taskId: toolCall.taskId,
        stepId: toolCall.stepId,
        status: toolResultStatus,
        output: result.stdout || result.stderr,
        error: result.exitCode !== 0 ? result.stderr || 'Execution failed' : undefined,
        durationMs,
        executionMode: executionMode === 'NATIVE_WEBCONTAINER' ? 'NATIVE_WEBCONTAINER' : 'VIRTUAL_FILESYSTEM_FALLBACK',
        evidenceRef,
        evidenceLevel: 'OBSERVED', // HARD CAP AT OBSERVED
        simulationOnly: true,
        completedAt: new Date().toISOString(),
      };

      this.emit('TOOL_RESULT', toolCall.id, toolCall.taskId, toolCall.stepId, 'ToolGateway', finalResult);
      return finalResult;
    } catch (execErr: any) {
      this.activeProcessIdMap.delete(toolCall.id);
      const err = execErr?.message || 'Tool execution error';
      this.emit('TOOL_RESULT', toolCall.id, toolCall.taskId, toolCall.stepId, 'ToolGateway', { status: 'ERROR', error: err });

      return {
        toolCallId: toolCall.id,
        taskId: toolCall.taskId,
        stepId: toolCall.stepId,
        status: 'ERROR',
        output: '',
        error: err,
        durationMs: Date.now() - startTime,
        executionMode,
        evidenceLevel: 'OBSERVED',
        simulationOnly: true,
        completedAt: new Date().toISOString(),
      };
    }
  }

  /**
   * End-to-end cancellation propagation to ExecutionProvider.
   */
  async cancelExecution(toolCallId?: string): Promise<void> {
    const provider = executionProviderRegistry.getDefaultProvider();
    if (toolCallId) {
      const processId = this.activeProcessIdMap.get(toolCallId);
      if (processId) {
        await provider.cancelExecution(processId);
        this.activeProcessIdMap.delete(toolCallId);
      }
    } else {
      // Cancel all active process IDs
      for (const [tcId, procId] of this.activeProcessIdMap.entries()) {
        await provider.cancelExecution(procId);
      }
      this.activeProcessIdMap.clear();
    }
  }
}

export const toolGateway = new ToolGateway();
