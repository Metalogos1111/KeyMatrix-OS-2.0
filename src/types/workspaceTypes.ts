/**
 * KeyMatrix OS v2.1 — Phase 6.8.5 Local Engineering Workspace Types
 * Specifications for Local Browser Runtime (WebContainer) and Provider Abstraction.
 */

import { EvidenceLevel } from '../types';
import { TaskStatus, StepType, ToolCategory, ToolStatus } from './agentTypes';

export type MetaLogosMode = 'ASK' | 'BUILD';

export type RuntimeType = 'WEBCONTAINER';

export type RuntimeAvailability =
  | 'AVAILABLE_LOCAL'
  | 'AVAILABLE_BACKEND'
  | 'SIMULATED'
  | 'DISABLED'
  | 'BLOCKED'
  | 'DIAGNOSTIC_ONLY';

export type PersistenceMode = 'LOCAL_SESSION';

export type ProcessStatus = 'START' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';

export interface WorkspaceIdentityContext {
  did: string;
  userName: string;
  role: string;
}

export interface Workspace {
  workspaceId: string;
  identityContext: WorkspaceIdentityContext;
  sessionId: string;
  runtimeId: string;
  runtimeType: RuntimeType;
  persistenceMode: PersistenceMode;
  createdAt: string;
  lastActiveAt: string;
  filesHash: string;
  snapshotCount: number;
}

export interface WorkspaceFile {
  path: string;
  name: string;
  content: string;
  type: 'file' | 'dir';
  size: number;
  lastModified: string;
  readOnly?: boolean;
}

export interface WorkspaceSnapshot {
  snapshotId: string;
  workspaceId: string;
  filesHash: string;
  createdAt: string;
  summary: string;
  fileCount: number;
  mode: 'LOCAL_WORKSPACE_SNAPSHOT';
}

export interface ExecutionRequest {
  id: string;
  command: string;
  args?: string[];
  cwd?: string;
  timeoutMs?: number;
  maxOutputBytes?: number;
  taskId?: string;
  stepId?: string;
}

export interface ExecutionEvent {
  processId: string;
  type: 'START' | 'STDOUT' | 'STDERR' | 'STATUS_CHANGE' | 'PORT_OPEN' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  data: string;
  timestamp: string;
  port?: number;
}

export interface ExecutionResult {
  processId: string;
  command: string;
  exitCode: number;
  stdout: string;
  stderr: string;
  status: 'COMPLETED' | 'FAILED' | 'CANCELLED' | 'TIMEOUT';
  durationMs: number;
  evidenceRef?: string;
  evidenceLevel: EvidenceLevel;
  previewUrl?: string;
}

export interface ExecutionError {
  code: string;
  message: string;
  stderr?: string;
  recoverable: boolean;
}

export interface PreviewStatus {
  isListening: boolean;
  port?: number;
  url?: string;
  startedAt?: string;
}

export interface BuildLoopState {
  taskId: string;
  phase: 'PLAN' | 'EXECUTE' | 'OBSERVE' | 'ANALYZE' | 'PATCH' | 'RE-RUN' | 'VERIFY_RESULT' | 'COMPLETE' | 'FAILED';
  currentAttempt: number;
  maxAttempts: number;
  maxRuntimeMs: number;
  maxOutputBytes: number;
  activeCommand?: string;
  lastError?: string;
  proposedPatch?: {
    filePath: string;
    description: string;
    diffSummary: string;
    originalContent: string;
    newContent: string;
  };
  evidenceRefs: string[];
}

export interface LocalExecutionProvider {
  id: string;
  runtimeType: RuntimeType;
  availability: RuntimeAvailability;
  backendConnected: boolean;
  executionMode: 'LOCAL_WEBCONTAINER';
  init(workspaceId: string): Promise<Workspace>;
  getWorkspace(): Workspace | null;
  readFile(path: string): Promise<string>;
  writeFile(path: string, content: string): Promise<void>;
  createFile(path: string, content?: string): Promise<void>;
  renameFile(oldPath: string, newPath: string): Promise<void>;
  deleteFile(path: string): Promise<void>;
  listFiles(dirPath?: string): Promise<WorkspaceFile[]>;
  searchFiles(query: string): Promise<{ path: string; line: number; content: string }[]>;
  executeCommand(
    request: ExecutionRequest,
    onStream?: (event: ExecutionEvent) => void
  ): Promise<ExecutionResult>;
  cancelExecution(processId: string): Promise<void>;
  createSnapshot(summary?: string): Promise<WorkspaceSnapshot>;
  getSnapshots(): WorkspaceSnapshot[];
  getPreviewStatus(): PreviewStatus;
  stopPreview(): Promise<void>;
}
