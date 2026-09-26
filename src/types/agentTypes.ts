/**
 * KeyMatrix OS v2.1 — Phase 6.8 MetaLogos + Core Interaction Types
 * Conceptual Agent Interaction Model & Contracts
 * STATUS: SIMULATION-ONLY / TARGET-REFERENCE
 */

import { EvidenceLevel } from '../types';

export type AgentRole = 'user' | 'metalogos' | 'system' | 'assistant';

export type CoreStatus =
  | 'DORMANT'
  | 'AVAILABLE'
  | 'ACTIVATING'
  | 'ACTIVE'
  | 'EXECUTING'
  | 'WAITING'
  | 'BLOCKED'
  | 'COMPLETED'
  | 'ERROR'
  | 'SIMULATED'
  | 'SANDBOX'
  | 'HOLD'
  | 'DISABLED';

export type TaskStatus =
  | 'DRAFT'
  | 'PLANNED'
  | 'AWAITING_AUTHORIZATION'
  | 'RUNNING'
  | 'WAITING_FOR_TOOL'
  | 'WAITING_FOR_CORE'
  | 'VERIFYING'
  | 'COMPLETED'
  | 'FAILED'
  | 'CANCELLED';

export type TaskMode = 'SIMULATION' | 'LOCAL' | 'EXTERNAL' | 'PRODUCTION';

export type StepType =
  | 'USER_INPUT'
  | 'META_RESPONSE'
  | 'CORE_ACTIVATION'
  | 'CORE_HANDOFF'
  | 'CAPABILITY_REQUEST'
  | 'AUTHORIZATION_CHECK'
  | 'TOOL_REQUEST'
  | 'TOOL_EXECUTION'
  | 'TOOL_RESULT'
  | 'EVIDENCE_CAPTURE'
  | 'TASK_UPDATE'
  | 'FINAL_RESPONSE';

export type ToolCategory = 'WEB_SEARCH' | 'FILES' | 'TERMINAL' | 'COMPUTE' | 'API' | 'SANDBOX';

export type ToolStatus =
  | 'AVAILABLE'
  | 'SIMULATED'
  | 'LOCAL SANDBOX'
  | 'DIAGNOSTIC ONLY'
  | 'DISABLED'
  | 'BLOCKED'
  | 'LOCKED'
  | 'RUNNING'
  | 'COMPLETED'
  | 'FAILED';

export type ToolExecutionMode =
  | 'SIMULATED'
  | 'LOCAL SANDBOX'
  | 'LOCAL_SANDBOX_SIMULATED'
  | 'LOCAL'
  | 'DISABLED'
  | 'DIAGNOSTIC_ONLY';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface CoreDescriptor {
  coreId: string;
  displayName: string;
  shortDescription: string;
  status: CoreStatus;
  capabilities: string[];
  currentTaskId: string | null;
  activity: string;
  availability: boolean;
  simulationOnly: boolean;
  evidenceState: {
    level: EvidenceLevel;
    verified: boolean;
    label: string;
  };
  simulationStatus?: 'LOCAL_SIMULATION' | 'SANDBOX' | 'HOLD';
  evidenceMode?: string;
  authorityStatus?: 'NO_AUTONOMOUS_AUTHORITY' | 'SANDBOX_ONLY' | 'HOLD_AWAITING_CONTRACT';
  metrics?: { label: string; value: string }[];
}

export interface ToolDescriptor {
  toolId: string;
  name: string;
  category: ToolCategory;
  description: string;
  status: ToolStatus;
  executionMode: ToolExecutionMode;
  capabilityRequired: string;
  riskLevel: RiskLevel;
  simulationOnly: boolean;
  available: boolean;
  lastExecution?: {
    timestamp: string;
    durationMs: number;
    exitCode?: number;
  };
}

export interface ToolPermissionRequest {
  id: string;
  taskId: string;
  toolId: string;
  toolName: string;
  category: ToolCategory;
  commandOrArgs: string;
  requestedBy: string; // 'MetaLogos' or Core Name
  taskTitle: string;
  riskLevel: RiskLevel;
  timestamp: string;
  status: 'PENDING' | 'ALLOWED_ONCE' | 'ALLOWED_FOR_TASK' | 'DENIED';
}

export interface AgentStep {
  id: string;
  taskId?: string;
  type: StepType;
  actor: string; // 'MetaLogos' | Core ID | 'ToolGateway' | 'User'
  target?: string;
  capability?: string;
  status: 'PLANNED' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'HOLD';
  timestamp: string;
  startedAt?: string;
  completedAt?: string;
  input?: any;
  output?: any;
  inputSummary?: string;
  outputSummary?: string;
  simulation?: boolean;
  evidenceRef?: string;
  evidenceLevel?: EvidenceLevel;
  durationMs?: number;
  error?: string;
}

export interface AgentTurn {
  id: string;
  conversationId: string;
  actor: string;
  status: 'PENDING' | 'EXECUTING' | 'COMPLETED' | 'ERROR';
  startedAt: string;
  completedAt?: string;
  steps: AgentStep[];
}

export interface ConversationMessage {
  id: string;
  role: AgentRole;
  content: string;
  timestamp: string;
  taskId?: string;
  activeCores?: string[];
  toolInvocations?: {
    toolId: string;
    toolName: string;
    category: ToolCategory;
    status: ToolStatus;
    input: string;
    output?: string;
    isSimulated: boolean;
    evidenceRef?: string;
  }[];
  handoffs?: {
    fromCore: string;
    toCore: string;
    reason: string;
    capability?: string;
    simulation?: boolean;
    evidenceRef?: string;
  }[];
  evidenceRef?: string;
  evidenceLevel?: EvidenceLevel;
  metadata?: Record<string, any>;
}

export interface AgentTask {
  taskId: string;
  parentTaskId?: string | null;
  conversationId: string;
  intent: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
  requestedBy?: string;
  assignedCore?: string;
  actor: string;
  activeCores: string[];
  activeTools: string[];
  steps: AgentStep[];
  currentStep?: number;
  simulationMode?: boolean;
  authorityDecision?: 'ALLOWED' | 'PENDING' | 'DENIED' | 'SIMULATED_ROLE';
  policyDecision?: 'PERMITTED' | 'BLOCKED_FAIL_CLOSED' | 'SHURA_MANDATE_REQUIRED';
  evidenceRefs: string[];
  result?: string;
  mode: TaskMode;
  error?: string;
  errors?: string[];
  timestamps?: {
    created: string;
    started?: string;
    completed?: string;
    failed?: string;
  };
}

export interface EvidenceRecord {
  id: string;
  taskId: string;
  stepId?: string;
  sourceType?: string;
  level: EvidenceLevel;
  source: string;
  artifact: string;
  provenance: string;
  hash?: string;
  verificationMethod?: string;
  simulation?: boolean;
  verificationStatus: 'DECLARED' | 'OBSERVED' | 'VERIFIED' | 'HOLD' | 'SIMULATED';
  reproductionStatus: 'PENDING' | 'REPRODUCED' | 'UNREPRODUCED' | 'CANONICAL_HOLD';
  simulationOnly: boolean;
  timestamp: string;
  createdAt?: string;
  summary: string;
  whyAssigned?: string;
  nextLevelRequirement?: string;
}

export interface TerminalLogEntry {
  id: string;
  taskId?: string;
  command: string;
  requestedBy: string;
  tool: string;
  mode: 'SIMULATED' | 'LOCAL SANDBOX';
  output: string;
  exitCode: number;
  durationMs: number;
  timestamp: string;
  evidenceRef?: string;
}

export interface AIConversationProvider {
  id: string;
  name: string;
  isSimulated: boolean;
  status: 'AVAILABLE' | 'OFFLINE' | 'DEGRADED';
  sendMessage(
    input: string,
    context: {
      conversationId: string;
      taskId?: string;
      activeRole: string;
      locale: string;
    }
  ): Promise<{
    message: ConversationMessage;
    turn: AgentTurn;
    task: AgentTask;
  }>;
}
