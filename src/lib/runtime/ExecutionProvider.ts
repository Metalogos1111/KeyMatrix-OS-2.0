/**
 * KeyMatrix OS v2.1 — Phase 6.9.1 Execution Provider Abstraction & Registry
 * Decouples ToolGateway and AgentLoop from specific LocalExecutionProvider implementations.
 * Enables registration of LocalExecutionProvider and future RemoteExecutionProvider contracts.
 */

import {
  Workspace,
  WorkspaceFile,
  WorkspaceSnapshot,
  ExecutionRequest,
  ExecutionEvent,
  ExecutionResult,
  PreviewStatus,
  RuntimeType,
  RuntimeAvailability,
} from '../../types/workspaceTypes';
import { localExecutionProvider } from './LocalExecutionProvider';

export interface ExecutionProvider {
  id: string;
  runtimeType: RuntimeType;
  availability: RuntimeAvailability;
  backendConnected: boolean;
  executionMode: string;

  init(workspaceId?: string): Promise<Workspace>;
  getDiagnosticInfo(): {
    isNativeWebContainerBooted: boolean;
    bootDiagnosticReason: string;
    hasInstance: boolean;
    activeProcessCount: number;
    virtualFileCount: number;
  };
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

/**
 * Placeholder Remote Execution Provider contract for future backend/TEE execution nodes.
 * Status: DISABLED (backendConnected = false)
 */
export class RemoteExecutionProviderPlaceholder implements ExecutionProvider {
  id = 'remote-execution-provider-placeholder';
  runtimeType: RuntimeType = 'WEBCONTAINER';
  availability: RuntimeAvailability = 'DISABLED';
  backendConnected = false;
  executionMode = 'DISABLED';

  async init(): Promise<Workspace> {
    throw new Error('[REMOTE_EXECUTION_PROVIDER] Backend not connected in Phase 6.9.1.');
  }
  getDiagnosticInfo() {
    return {
      isNativeWebContainerBooted: false,
      bootDiagnosticReason: 'Remote execution provider disabled until production backend exists',
      hasInstance: false,
      activeProcessCount: 0,
      virtualFileCount: 0,
    };
  }
  getWorkspace() { return null; }
  async readFile(path: string): Promise<string> { throw new Error(`Remote execution disabled: ${path}`); }
  async writeFile() { throw new Error('Remote execution disabled'); }
  async createFile() { throw new Error('Remote execution disabled'); }
  async renameFile() { throw new Error('Remote execution disabled'); }
  async deleteFile() { throw new Error('Remote execution disabled'); }
  async listFiles() { return []; }
  async searchFiles() { return []; }
  async executeCommand(): Promise<ExecutionResult> {
    return {
      processId: `proc-remote-disabled-${Date.now()}`,
      command: 'disabled',
      exitCode: 1,
      stdout: '',
      stderr: 'Remote execution provider disabled in Phase 6.9.1.',
      status: 'FAILED',
      durationMs: 0,
      evidenceRef: 'ev-disabled',
      evidenceLevel: 'OBSERVED',
    };
  }
  async cancelExecution() {}
  async createSnapshot(summary?: string): Promise<WorkspaceSnapshot> {
    throw new Error(`Remote execution disabled: ${summary}`);
  }
  getSnapshots() { return []; }
  getPreviewStatus() { return { isListening: false }; }
  async stopPreview() {}
}

export class ExecutionProviderRegistry {
  private providers: Map<string, ExecutionProvider> = new Map();
  private defaultProviderId: string = localExecutionProvider.id;

  constructor() {
    this.registerProvider(localExecutionProvider);
    this.registerProvider(new RemoteExecutionProviderPlaceholder());
  }

  registerProvider(provider: ExecutionProvider) {
    this.providers.set(provider.id, provider);
  }

  getProvider(id: string): ExecutionProvider | undefined {
    return this.providers.get(id);
  }

  getDefaultProvider(): ExecutionProvider {
    const provider = this.providers.get(this.defaultProviderId);
    if (!provider) {
      return localExecutionProvider;
    }
    return provider;
  }

  setDefaultProvider(id: string) {
    if (this.providers.has(id)) {
      this.defaultProviderId = id;
    }
  }

  listProviders(): ExecutionProvider[] {
    return Array.from(this.providers.values());
  }
}

export const executionProviderRegistry = new ExecutionProviderRegistry();
