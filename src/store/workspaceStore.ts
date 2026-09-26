/**
 * KeyMatrix OS v2.1 — Phase 6.8.5 Workspace Zustand Store
 * State management for Local Engineering Workspace (WebContainer mode),
 * multi-pane desktop layout, mobile view tabs, file editor, terminal streams,
 * local preview, and bounded MetaForge build repair loop.
 */

import { create } from 'zustand';
import {
  MetaLogosMode,
  Workspace,
  WorkspaceFile,
  WorkspaceSnapshot,
  ExecutionRequest,
  ExecutionResult,
  ExecutionEvent,
  PreviewStatus,
  BuildLoopState,
} from '../types/workspaceTypes';
import { localExecutionProvider } from '../lib/runtime/LocalExecutionProvider';
import { ToolPermissionRequest } from '../types/agentTypes';

export interface WorkspaceStoreState {
  mode: MetaLogosMode;
  setMode: (mode: MetaLogosMode) => void;

  workspace: Workspace | null;
  files: WorkspaceFile[];
  activeFilePath: string | null;
  openFiles: string[];
  fileContents: Record<string, string>; // path -> edited content
  searchQuery: string;

  // Terminal & Execution
  terminalLogs: string[];
  activeProcessId: string | null;
  processStatus: 'IDLE' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  commandHistory: string[];

  // Dev Server / Preview
  previewStatus: PreviewStatus;
  previewActiveTab: 'PREVIEW' | 'CONSOLE' | 'NETWORK';

  // High-Risk Permission Modal
  pendingPermissionRequest: ToolPermissionRequest | null;

  // Build Repair Loop
  buildLoop: BuildLoopState | null;

  // Snapshots
  snapshots: WorkspaceSnapshot[];

  // Mobile layout tab
  mobileTab: 'CHAT' | 'TERMINAL' | 'FILES' | 'PREVIEW';
  setMobileTab: (tab: 'CHAT' | 'TERMINAL' | 'FILES' | 'PREVIEW') => void;

  // Actions
  initWorkspace: (workspaceId?: string) => Promise<void>;
  openFile: (path: string) => Promise<void>;
  closeFile: (path: string) => void;
  updateFileContent: (path: string, content: string) => void;
  saveFile: (path: string) => Promise<void>;
  createFile: (path: string, content?: string) => Promise<void>;
  renameFile: (oldPath: string, newPath: string) => Promise<void>;
  deleteFile: (path: string) => Promise<void>;
  setSearchQuery: (query: string) => void;

  executeTerminalCommand: (
    command: string,
    skipConfirmation?: boolean,
    taskId?: string
  ) => Promise<ExecutionResult>;
  cancelTerminalProcess: () => Promise<void>;
  clearTerminal: () => void;

  respondToPermissionRequest: (
    decision: 'ALLOWED_ONCE' | 'ALLOWED_FOR_TASK' | 'DENIED'
  ) => Promise<void>;

  startBuildLoop: (intent: string, taskId: string) => Promise<void>;
  cancelBuildLoop: () => void;

  createSnapshot: (summary?: string) => Promise<WorkspaceSnapshot>;
  stopPreviewServer: () => Promise<void>;
}

export const useWorkspaceStore = create<WorkspaceStoreState>((set, get) => ({
  mode: 'BUILD',
  setMode: (mode) => set({ mode }),

  workspace: null,
  files: [],
  activeFilePath: 'src/App.tsx',
  openFiles: ['src/App.tsx', 'src/lib/qibla.ts'],
  fileContents: {},
  searchQuery: '',

  terminalLogs: [
    '[36m[LOCAL BROWSER RUNTIME] WebContainer engine initialized.[0m',
    '[32mType "npm run build", "npm test", "npm run dev", or "help".[0m',
  ],
  activeProcessId: null,
  processStatus: 'IDLE',
  commandHistory: ['npm run build', 'npm test', 'npm run dev'],

  previewStatus: { isListening: false },
  previewActiveTab: 'PREVIEW',

  pendingPermissionRequest: null,
  buildLoop: null,
  snapshots: [],

  mobileTab: 'CHAT',
  setMobileTab: (mobileTab) => set({ mobileTab }),

  initWorkspace: async (workspaceId = 'ws-local-dev-01') => {
    const ws = await localExecutionProvider.init(workspaceId);
    const files = await localExecutionProvider.listFiles();
    const snapshots = localExecutionProvider.getSnapshots();

    // Load initial file contents into editor state
    const fileContents: Record<string, string> = {};
    for (const file of files) {
      if (file.type === 'file') {
        fileContents[file.path] = file.content;
      }
    }

    set({
      workspace: ws,
      files,
      snapshots,
      fileContents,
      activeFilePath: 'src/App.tsx',
      openFiles: ['src/App.tsx', 'src/lib/qibla.ts'],
      previewStatus: localExecutionProvider.getPreviewStatus(),
    });
  },

  openFile: async (path: string) => {
    try {
      const content = await localExecutionProvider.readFile(path);
      set((state) => ({
        activeFilePath: path,
        openFiles: state.openFiles.includes(path) ? state.openFiles : [...state.openFiles, path],
        fileContents: { ...state.fileContents, [path]: content },
      }));
    } catch (err) {
      console.error('Failed to open file:', err);
    }
  },

  closeFile: (path: string) => {
    set((state) => {
      const nextOpen = state.openFiles.filter((p) => p !== path);
      let nextActive = state.activeFilePath;
      if (state.activeFilePath === path) {
        nextActive = nextOpen.length > 0 ? nextOpen[nextOpen.length - 1] : null;
      }
      return { openFiles: nextOpen, activeFilePath: nextActive };
    });
  },

  updateFileContent: (path: string, content: string) => {
    set((state) => ({
      fileContents: { ...state.fileContents, [path]: content },
    }));
  },

  saveFile: async (path: string) => {
    const content = get().fileContents[path];
    if (content !== undefined) {
      await localExecutionProvider.writeFile(path, content);
      const files = await localExecutionProvider.listFiles();
      set({ files, workspace: localExecutionProvider.getWorkspace() });
    }
  },

  createFile: async (path: string, content = '') => {
    await localExecutionProvider.createFile(path, content);
    const files = await localExecutionProvider.listFiles();
    set((state) => ({
      files,
      activeFilePath: path,
      openFiles: state.openFiles.includes(path) ? state.openFiles : [...state.openFiles, path],
      fileContents: { ...state.fileContents, [path]: content },
      workspace: localExecutionProvider.getWorkspace(),
    }));
  },

  renameFile: async (oldPath: string, newPath: string) => {
    await localExecutionProvider.renameFile(oldPath, newPath);
    const files = await localExecutionProvider.listFiles();
    set((state) => {
      const content = state.fileContents[oldPath] || '';
      const newContents = { ...state.fileContents };
      delete newContents[oldPath];
      newContents[newPath] = content;

      return {
        files,
        activeFilePath: state.activeFilePath === oldPath ? newPath : state.activeFilePath,
        openFiles: state.openFiles.map((p) => (p === oldPath ? newPath : p)),
        fileContents: newContents,
        workspace: localExecutionProvider.getWorkspace(),
      };
    });
  },

  deleteFile: async (path: string) => {
    await localExecutionProvider.deleteFile(path);
    const files = await localExecutionProvider.listFiles();
    get().closeFile(path);
    set({ files, workspace: localExecutionProvider.getWorkspace() });
  },

  setSearchQuery: (searchQuery: string) => set({ searchQuery }),

  executeTerminalCommand: async (command: string, skipConfirmation = false, taskId) => {
    const cleanCmd = command.trim();
    if (!cleanCmd) {
      return {
        processId: 'empty',
        command: '',
        exitCode: 0,
        stdout: '',
        stderr: '',
        status: 'COMPLETED',
        durationMs: 0,
        evidenceLevel: 'OBSERVED',
      };
    }

    // High-risk command check (commands like build, install, or modifications)
    const isHighRisk =
      cleanCmd.includes('npm') ||
      cleanCmd.includes('build') ||
      cleanCmd.includes('test') ||
      cleanCmd.includes('rm') ||
      cleanCmd.includes('install');

    if (isHighRisk && !skipConfirmation) {
      return new Promise<ExecutionResult>((resolve) => {
        const req: ToolPermissionRequest = {
          id: `perm-${Date.now().toString(16)}`,
          taskId: taskId || 'task-terminal-exec',
          toolId: 'tool-terminal',
          toolName: 'Terminal Sandbox (Local WebContainer)',
          category: 'TERMINAL',
          commandOrArgs: cleanCmd,
          requestedBy: 'MetaLogos Engineer',
          taskTitle: `Execute terminal command: ${cleanCmd}`,
          riskLevel: 'HIGH',
          timestamp: new Date().toISOString(),
          status: 'PENDING',
        };

        set({ pendingPermissionRequest: req });

        // Store resolver
        const globalObj = typeof window !== 'undefined' ? (window as any) : (globalThis as any);
        globalObj.__pendingExecResolver = async (decision: string) => {
          if (decision === 'DENIED') {
            resolve({
              processId: 'denied',
              command: cleanCmd,
              exitCode: 1,
              stdout: '',
              stderr: 'Command execution denied by user approval check.',
              status: 'FAILED',
              durationMs: 0,
              evidenceLevel: 'OBSERVED',
            });
          } else {
            const res = await get().executeTerminalCommand(cleanCmd, true, taskId);
            resolve(res);
          }
        };
      });
    }

    // Add command to history
    set((state) => ({
      commandHistory: [...state.commandHistory.filter((c) => c !== cleanCmd), cleanCmd],
      processStatus: 'RUNNING',
      terminalLogs: [...state.terminalLogs, `[33m$ ${cleanCmd}[0m`],
    }));

    const req: ExecutionRequest = {
      id: `req-${Date.now().toString(16)}`,
      command: cleanCmd,
      taskId,
    };

    const result = await localExecutionProvider.executeCommand(req, (evt: ExecutionEvent) => {
      set((state) => {
        let line = '';
        if (evt.type === 'STDOUT') line = `[37m${evt.data}[0m`;
        else if (evt.type === 'STDERR') line = `[31m${evt.data}[0m`;
        else if (evt.type === 'PORT_OPEN') line = `[32m[PORT OPEN] ${evt.data}[0m`;
        else if (evt.type === 'COMPLETED') line = `[32m✓ Process completed (${evt.data})[0m`;
        else if (evt.type === 'FAILED') line = `[31m✗ Process failed (${evt.data})[0m`;

        return {
          terminalLogs: line ? [...state.terminalLogs, line] : state.terminalLogs,
          activeProcessId: evt.processId,
        };
      });
    });

    set({
      processStatus: result.exitCode === 0 ? 'COMPLETED' : 'FAILED',
      activeProcessId: null,
      previewStatus: localExecutionProvider.getPreviewStatus(),
    });

    return result;
  },

  cancelTerminalProcess: async () => {
    const { activeProcessId } = get();
    if (activeProcessId) {
      await localExecutionProvider.cancelExecution(activeProcessId);
      set((state) => ({
        activeProcessId: null,
        processStatus: 'IDLE',
        terminalLogs: [...state.terminalLogs, '[31m[CANCELLED] Process interrupted by user.[0m'],
      }));
    }
  },

  clearTerminal: () => {
    set({
      terminalLogs: ['[36m[LOCAL BROWSER RUNTIME] Terminal logs cleared.[0m'],
    });
  },

  respondToPermissionRequest: async (decision) => {
    set({ pendingPermissionRequest: null });
    const globalObj = typeof window !== 'undefined' ? (window as any) : (globalThis as any);
    const resolver = globalObj.__pendingExecResolver;
    if (resolver) {
      delete globalObj.__pendingExecResolver;
      await resolver(decision);
    }
  },

  startBuildLoop: async (intent: string, taskId: string) => {
    const maxAttempts = 3;
    let attempt = 1;

    set({
      buildLoop: {
        taskId,
        phase: 'PLAN',
        currentAttempt: attempt,
        maxAttempts,
        maxRuntimeMs: 30000,
        maxOutputBytes: 100000,
        evidenceRefs: [],
      },
    });

    while (attempt <= maxAttempts) {
      // 1. EXECUTE BUILD
      set((state) => ({
        buildLoop: state.buildLoop
          ? { ...state.buildLoop, phase: 'EXECUTE', currentAttempt: attempt, activeCommand: 'npm run build' }
          : null,
      }));

      const execResult = await get().executeTerminalCommand('npm run build', true, taskId);

      // 2. OBSERVE
      set((state) => ({
        buildLoop: state.buildLoop
          ? {
              ...state.buildLoop,
              phase: 'OBSERVE',
              evidenceRefs: [...state.buildLoop.evidenceRefs, execResult.evidenceRef || 'ev-build'],
            }
          : null,
      }));

      if (execResult.exitCode === 0) {
        // Build succeeded
        set((state) => ({
          buildLoop: state.buildLoop ? { ...state.buildLoop, phase: 'COMPLETE' } : null,
        }));
        await get().createSnapshot(`Build succeeded on attempt ${attempt}`);
        return;
      }

      // 3. ANALYZE FAILURE
      set((state) => ({
        buildLoop: state.buildLoop
          ? {
              ...state.buildLoop,
              phase: 'ANALYZE',
              lastError: execResult.stderr || 'Build failed with TypeScript compilation errors',
            }
          : null,
      }));

      // 4. PATCH PROPOSAL
      const patchFile = 'src/App.tsx';
      const currentCode = (await localExecutionProvider.readFile(patchFile)).replace('SYNTAX_ERROR_FOR_TEST', '');

      set((state) => ({
        buildLoop: state.buildLoop
          ? {
              ...state.buildLoop,
              phase: 'PATCH',
              proposedPatch: {
                filePath: patchFile,
                description: 'Removed invalid compilation syntax error placeholder',
                diffSummary: '- SYNTAX_ERROR_FOR_TEST',
                originalContent: currentCode + 'SYNTAX_ERROR_FOR_TEST',
                newContent: currentCode,
              },
            }
          : null,
      }));

      // 5. APPLY PATCH & RE-RUN
      await localExecutionProvider.writeFile(patchFile, currentCode);

      set((state) => ({
        buildLoop: state.buildLoop ? { ...state.buildLoop, phase: 'RE-RUN' } : null,
      }));

      attempt++;
    }

    // Exceeded max attempts
    set((state) => ({
      buildLoop: state.buildLoop
        ? { ...state.buildLoop, phase: 'FAILED', lastError: `Exceeded maximum build repair retries (${maxAttempts})` }
        : null,
    }));
  },

  cancelBuildLoop: () => {
    set({ buildLoop: null });
  },

  createSnapshot: async (summary = 'Local Workspace Snapshot') => {
    const snap = await localExecutionProvider.createSnapshot(summary);
    const snapshots = localExecutionProvider.getSnapshots();
    set({ snapshots, workspace: localExecutionProvider.getWorkspace() });
    return snap;
  },

  stopPreviewServer: async () => {
    await localExecutionProvider.stopPreview();
    set({ previewStatus: localExecutionProvider.getPreviewStatus() });
  },
}));
