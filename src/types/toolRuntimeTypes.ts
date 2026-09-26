/**
 * KeyMatrix OS v2.1 — Phase 6.9 Tool Runtime & Contract Types
 * Normalized ToolCall, ToolResult, ToolExecutionMode, and Gateway Statuses.
 */

import { RiskLevel, ToolCategory, TaskStatus } from './agentTypes';
import { EvidenceLevel } from '../types';

export type ToolExecutionMode =
  | 'NATIVE_WEBCONTAINER'
  | 'VIRTUAL_FILESYSTEM_FALLBACK'
  | 'SIMULATED'
  | 'DISABLED'
  | 'BLOCKED';

export type GatewayToolStatus =
  | 'AVAILABLE_LOCAL'
  | 'AVAILABLE_BACKEND'
  | 'SIMULATED'
  | 'DISABLED'
  | 'BLOCKED'
  | 'HOLD';

export interface ToolCall {
  id: string;
  toolId: string;
  taskId: string;
  stepId: string;
  arguments: Record<string, any>;
  requestedBy: string; // 'MetaLogos' | Core ID | 'User'
  riskLevel: RiskLevel;
  capabilityStatus: GatewayToolStatus;
  simulationOnly: boolean;
  requiresUserCheckpoint: boolean;
  createdAt: string;
}

export interface ToolResult {
  toolCallId: string;
  taskId: string;
  stepId: string;
  status: 'SUCCESS' | 'ERROR' | 'BLOCKED' | 'DENIED' | 'CANCELLED';
  output: string;
  error?: string;
  durationMs: number;
  executionMode: ToolExecutionMode;
  evidenceRef?: string;
  evidenceLevel: EvidenceLevel; // Hard capped at 'OBSERVED' for local sandbox
  simulationOnly: boolean;
  completedAt: string;
}

export interface AgentLoopBounds {
  maxSteps: number; // Default: 8
  maxAttemptsPerStep: number; // Default: 3
  maxRuntimeMs: number; // Default: 30000
  maxOutputBytes: number; // Default: 100000
}

export type LocalPermissionDecision =
  | 'USER_APPROVED'
  | 'LOCAL_POLICY_ALLOWED'
  | 'LOCAL_POLICY_DENIED'
  | 'SIMULATION_CHECKPOINT';
