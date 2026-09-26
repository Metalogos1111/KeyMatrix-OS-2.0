/**
 * KeyMatrix OS v2.1 — Phase 6.9.1 Agent Loop Implementation
 * Bounded, provider-agnostic, observable agent execution loop driven by ConversationProvider.
 *
 * LOOP CYCLE:
 * PLAN → REQUEST_TOOL → POLICY_CHECK → EXECUTE → OBSERVE → CAPTURE_EVIDENCE → CONTINUE_OR_FINALIZE
 *
 * BOUNDS:
 * maxSteps = 8
 * maxAttemptsPerStep = 3
 * maxRuntimeMs = 30000
 * maxOutputBytes = 100000
 */

import {
  ToolCall,
  ToolResult,
  AgentLoopBounds,
  LocalPermissionDecision,
} from '../../types/toolRuntimeTypes';
import { AgentStep, AgentTask, TaskStatus } from '../../types/agentTypes';
import { toolGateway } from './ToolGateway';
import { skillLoader } from '../skills/SkillLoader';
import {
  ConversationProvider,
  defaultConversationProvider,
  ToolRequestSpec,
} from '../providers/ConversationProvider';

export interface AgentLoopOptions {
  provider?: ConversationProvider;
  bounds?: Partial<AgentLoopBounds>;
  onStepChange?: (step: AgentStep) => void;
  onTaskChange?: (task: Partial<AgentTask>) => void;
  onPermissionRequired?: (toolCall: ToolCall) => Promise<LocalPermissionDecision>;
}

export interface AgentLoopRunResult {
  taskId: string;
  status: TaskStatus;
  finalOutput: string;
  stepsExecuted: number;
  durationMs: number;
  evidenceRefs: string[];
  error?: string;
}

export class AgentLoop {
  private bounds: AgentLoopBounds = {
    maxSteps: 8,
    maxAttemptsPerStep: 3,
    maxRuntimeMs: 30000,
    maxOutputBytes: 100000,
  };

  private provider: ConversationProvider = defaultConversationProvider;
  private isCancelled = false;
  private currentStepIndex = 0;

  constructor(provider?: ConversationProvider, bounds?: Partial<AgentLoopBounds>) {
    if (provider) {
      this.provider = provider;
    }
    if (bounds) {
      this.bounds = { ...this.bounds, ...bounds };
    }
  }

  async stop() {
    this.isCancelled = true;
    await toolGateway.cancelExecution();
  }

  /**
   * Runs the provider-agnostic, bounded multi-step agent execution loop for a task intent.
   */
  async runLoop(
    taskId: string,
    intent: string,
    options: AgentLoopOptions = {}
  ): Promise<AgentLoopRunResult> {
    const startTime = Date.now();
    this.isCancelled = false;
    this.currentStepIndex = 0;

    const provider = options.provider || this.provider;
    const bounds = { ...this.bounds, ...options.bounds };
    const evidenceRefs: string[] = [];
    const contextResults: string[] = [];
    const previousToolResults: ToolResult[] = [];
    let taskStatus: TaskStatus = 'RUNNING';
    let finalOutput = '';

    if (options.onTaskChange) {
      options.onTaskChange({ taskId, intent, status: 'RUNNING' });
    }

    // Initial Plan Step via Provider
    const turnOutput = await provider.generateTurn({ userPrompt: intent });

    const planStep: AgentStep = {
      id: `step-${taskId}-plan`,
      taskId,
      type: 'CORE_ACTIVATION',
      actor: provider.name,
      target: 'Provider Intent Turn Decomposition',
      status: 'COMPLETED',
      timestamp: new Date().toISOString(),
      output: `${turnOutput.replyMessage} (Provider: ${provider.name}, bounded max ${bounds.maxSteps} steps).`,
    };
    if (options.onStepChange) options.onStepChange(planStep);

    let activeTurn = turnOutput;

    while (
      this.currentStepIndex < bounds.maxSteps &&
      activeTurn.status !== 'FINAL' &&
      activeTurn.status !== 'FAILED'
    ) {
      // Check timeout
      if (Date.now() - startTime > bounds.maxRuntimeMs) {
        taskStatus = 'FAILED';
        finalOutput = `Agent loop exceeded maximum runtime bound (${bounds.maxRuntimeMs}ms).`;
        break;
      }

      // Check cancellation
      if (this.isCancelled) {
        taskStatus = 'CANCELLED';
        finalOutput = 'Agent loop cancelled by user.';
        await toolGateway.cancelExecution();
        break;
      }

      // Iterate through tool requests provided by current turn
      for (const reqSpec of activeTurn.toolRequests) {
        if (this.currentStepIndex >= bounds.maxSteps || this.isCancelled) break;

        this.currentStepIndex++;
        const stepId = `step-${taskId}-${this.currentStepIndex}`;

        // Emit Step: TOOL_REQUEST
        const requestStep: AgentStep = {
          id: `${stepId}-req`,
          taskId,
          type: 'TOOL_REQUEST',
          actor: provider.name,
          target: reqSpec.toolId,
          status: 'RUNNING',
          timestamp: new Date().toISOString(),
          inputSummary: `$ ${reqSpec.command}`,
        };
        if (options.onStepChange) options.onStepChange(requestStep);

        // Check skill validation if specified
        if (reqSpec.skillId) {
          const skillCheck = skillLoader.validateSkillUsage(reqSpec.skillId, reqSpec.toolId);
          if (!skillCheck.allowed) {
            const failStep: AgentStep = {
              id: `${stepId}-skill-blocked`,
              taskId,
              type: 'AUTHORIZATION_CHECK',
              actor: 'ToolGateway',
              status: 'FAILED',
              timestamp: new Date().toISOString(),
              error: skillCheck.reason,
            };
            if (options.onStepChange) options.onStepChange(failStep);
            taskStatus = 'FAILED';
            finalOutput = skillCheck.reason;
            break;
          }
        }

        // Construct ToolCall
        const requiresUserCheckpoint = toolGateway.requiresCheckpoint(reqSpec.toolId, reqSpec.command, reqSpec.riskLevel);
        const toolCall: ToolCall = {
          id: `tc-${stepId}`,
          toolId: reqSpec.toolId,
          taskId,
          stepId,
          arguments: { command: reqSpec.command },
          requestedBy: provider.name,
          riskLevel: reqSpec.riskLevel,
          capabilityStatus: toolGateway.resolveCapabilityStatus(reqSpec.toolId).status,
          simulationOnly: true,
          requiresUserCheckpoint,
          createdAt: new Date().toISOString(),
        };

        // Bounded retries per step
        let toolResult: ToolResult | null = null;
        let attempt = 0;

        while (attempt < bounds.maxAttemptsPerStep && !this.isCancelled) {
          attempt++;
          toolResult = await toolGateway.invokeTool(toolCall, options.onPermissionRequired);

          if (toolResult.status === 'SUCCESS' || toolResult.status === 'DENIED' || toolResult.status === 'BLOCKED') {
            break;
          }
        }

        if (this.isCancelled) {
          taskStatus = 'CANCELLED';
          finalOutput = 'Agent loop cancelled by user.';
          await toolGateway.cancelExecution();
          break;
        }

        if (!toolResult) {
          taskStatus = 'FAILED';
          finalOutput = `Step ${this.currentStepIndex} failed after ${bounds.maxAttemptsPerStep} retry attempts.`;
          break;
        }

        previousToolResults.push(toolResult);

        if (toolResult.status === 'DENIED') {
          taskStatus = 'CANCELLED';
          finalOutput = `Task halted: ${toolResult.error}`;
          break;
        }

        if (toolResult.status === 'BLOCKED') {
          taskStatus = 'FAILED';
          finalOutput = `Task blocked: ${toolResult.error}`;
          break;
        }

        // Step: CAPTURE_EVIDENCE
        if (toolResult.evidenceRef) {
          evidenceRefs.push(toolResult.evidenceRef);
          const evStep: AgentStep = {
            id: `${stepId}-ev`,
            taskId,
            type: 'EVIDENCE_CAPTURE',
            actor: 'Archivarius',
            status: 'COMPLETED',
            timestamp: new Date().toISOString(),
            evidenceRef: toolResult.evidenceRef,
            evidenceLevel: 'OBSERVED',
            outputSummary: `Captured OBSERVED evidence: ${toolResult.evidenceRef}`,
          };
          if (options.onStepChange) options.onStepChange(evStep);
        }

        // Step: OBSERVE & Context Injection
        const truncatedOutput =
          toolResult.output.length > bounds.maxOutputBytes
            ? toolResult.output.substring(0, bounds.maxOutputBytes) + '\n... [Output truncated at maxOutputBytes limit]'
            : toolResult.output;

        contextResults.push(`[Step ${this.currentStepIndex}: ${reqSpec.command}]\n${truncatedOutput}`);

        const obsStep: AgentStep = {
          id: `${stepId}-obs`,
          taskId,
          type: 'TOOL_RESULT',
          actor: 'ToolGateway',
          status: toolResult.status === 'SUCCESS' ? 'COMPLETED' : 'FAILED',
          timestamp: new Date().toISOString(),
          outputSummary: truncatedOutput.split('\n')[0] || 'Command completed',
          output: truncatedOutput,
          durationMs: toolResult.durationMs,
        };
        if (options.onStepChange) options.onStepChange(obsStep);

        if (toolResult.status === 'ERROR') {
          taskStatus = 'FAILED';
          finalOutput = `Step ${this.currentStepIndex} execution error: ${toolResult.error}`;
          break;
        }
      }

      if (taskStatus === 'FAILED' || taskStatus === 'CANCELLED') {
        break;
      }

      // Generate next turn from Provider passing observed results
      activeTurn = await provider.generateTurn({ userPrompt: intent }, previousToolResults);
    }

    if (taskStatus === 'RUNNING') {
      taskStatus = 'COMPLETED';
      finalOutput = activeTurn.summary || `Agent loop completed successfully across ${contextResults.length} steps.\n\nExecution Summary:\n` + contextResults.join('\n\n');
    }

    // Step: FINAL_RESPONSE
    const finalStep: AgentStep = {
      id: `step-${taskId}-final`,
      taskId,
      type: 'FINAL_RESPONSE',
      actor: provider.name,
      status: taskStatus === 'COMPLETED' ? 'COMPLETED' : 'FAILED',
      timestamp: new Date().toISOString(),
      output: finalOutput,
    };
    if (options.onStepChange) options.onStepChange(finalStep);

    if (options.onTaskChange) {
      options.onTaskChange({
        taskId,
        status: taskStatus,
        result: finalOutput,
        evidenceRefs,
      });
    }

    return {
      taskId,
      status: taskStatus,
      finalOutput,
      stepsExecuted: contextResults.length,
      durationMs: Date.now() - startTime,
      evidenceRefs,
      error: taskStatus === 'FAILED' ? finalOutput : undefined,
    };
  }
}
