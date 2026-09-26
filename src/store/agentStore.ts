/**
 * KeyMatrix OS v2.1 — Agent Interaction Store (Phase 6.8)
 * Manages persistent MetaLogos conversation, 7 Cores orchestration,
 * tool execution gateway, tasks, terminal log, and evidence drawer.
 * STATUS: LOCAL PERSISTENCE / SIMULATION ONLY
 */

import { create } from 'zustand';
import {
  ConversationMessage,
  CoreDescriptor,
  ToolDescriptor,
  AgentTask,
  AgentStep,
  EvidenceRecord,
  TerminalLogEntry,
  ToolPermissionRequest,
} from '../types/agentTypes';
import { INITIAL_CORES, INITIAL_TOOLS, canTransitionTask } from '../data/agentRegistry';
import { MetaLogosOrchestrationEngine } from '../lib/agent/MetaLogosOrchestrationEngine';

interface AgentState {
  // Conversation
  conversationId: string;
  messages: ConversationMessage[];
  isThinking: boolean;
  activeTaskId: string | null;

  // 7 Cores & Inspector
  cores: CoreDescriptor[];
  selectedCoreId: string | null;
  setSelectedCoreId: (coreId: string | null) => void;

  // Tools & Gateway
  tools: ToolDescriptor[];
  selectedToolId: string | null;
  selectedToolIds: string[];
  setSelectedToolId: (toolId: string | null) => void;
  toggleChatTool: (toolId: string) => void;
  clearChatTools: () => void;
  permissionRequests: ToolPermissionRequest[];
  activePermissionRequest: ToolPermissionRequest | null;
  resolvePermission: (id: string, decision: 'ALLOWED_ONCE' | 'ALLOWED_FOR_TASK' | 'DENIED') => void;

  // Tasks & Timeline
  tasks: AgentTask[];
  activitySteps: AgentStep[];
  isActivityPanelOpen: boolean;
  toggleActivityPanel: () => void;

  // Terminal Panel
  terminalLogs: TerminalLogEntry[];
  isTerminalOpen: boolean;
  toggleTerminal: () => void;
  executeTerminalCommand: (command: string) => Promise<void>;

  // Evidence Drawer
  evidenceRecords: EvidenceRecord[];
  isEvidenceDrawerOpen: boolean;
  selectedEvidenceId: string | null;
  toggleEvidenceDrawer: (evidenceId?: string) => void;

  // Actions
  sendMessage: (text: string, activeRole?: string, locale?: string) => Promise<void>;
  resetConversation: () => void;
  runDemoScenario: (scenario: 'simple' | 'collaboration' | 'permission' | 'terminal' | 'failure' | 'por' | 'nur') => Promise<void>;
}

const engine = new MetaLogosOrchestrationEngine();

export const useAgentStore = create<AgentState>((set, get) => ({
  conversationId: 'km-metalogos-session-001',
  messages: [
    {
      id: 'msg-welcome',
      role: 'assistant',
      content: `### Добро пожаловать в MetaLogos — Единую Среду Оркестрации

Я выступаю persistent диалоговым шлюзом KeyMatrix OS v2.1 к **7 доменам возможностей (7 Core Domains — Local Simulation)**:
* **1. MetaLogos:** Рассуждения, декомпозиция интента и координация задач
* **2. MetaForge:** Песочница синтеза кода, сборки и компиляции пайплайнов
* **3. PrimeCore:** Инварианты безопасности, Shura Rule #42 и TEE-аттестация (симуляция)
* **4. MindState:** Непрерывность сессионного контекста и локальная память
* **5. Archivarius:** Хранилище доказательств и детерминированные Merkle-хэши
* **6. Singularity:** Долгосрочное моделирование траекторий (Статус: HOLD / Awaiting Contract)
* **7. NUR Core:** Беспроцентный этический учет ценности (Статус: SANDBOX / Non-Settlement)

Введите запрос, выберите демо-сценарий или задачу для запуска графа выполнения.`,
      timestamp: new Date().toISOString(),
      activeCores: ['metalogos', 'primecore', 'archivarius'],
    },
  ],
  isThinking: false,
  activeTaskId: null,

  cores: INITIAL_CORES,
  selectedCoreId: null,
  setSelectedCoreId: (coreId) => set({ selectedCoreId: coreId }),

  tools: INITIAL_TOOLS,
  selectedToolId: null,
  selectedToolIds: [],
  setSelectedToolId: (toolId) => set({ selectedToolId: toolId }),
  toggleChatTool: (toolId) =>
    set((state) => ({
      selectedToolIds: state.selectedToolIds.includes(toolId)
        ? state.selectedToolIds.filter((id) => id !== toolId)
        : [...state.selectedToolIds, toolId],
    })),
  clearChatTools: () => set({ selectedToolIds: [] }),

  permissionRequests: [],
  activePermissionRequest: null,
  resolvePermission: (id, decision) => {
    set((state) => ({
      permissionRequests: state.permissionRequests.map((req) =>
        req.id === id ? { ...req, status: decision } : req
      ),
      activePermissionRequest: null,
    }));
  },

  tasks: [],
  activitySteps: [
    {
      id: 'step-init',
      type: 'META_RESPONSE',
      actor: 'MetaLogos',
      status: 'COMPLETED',
      timestamp: new Date().toISOString(),
      output: 'MetaLogos session initialized with 7 Core Intelligence Fabric',
    },
  ],
  isActivityPanelOpen: true,
  toggleActivityPanel: () => set((state) => ({ isActivityPanelOpen: !state.isActivityPanelOpen })),

  terminalLogs: [
    {
      id: 'term-init',
      command: 'km-kernel-status --verify-invariants',
      requestedBy: 'MetaLogos',
      tool: 'Terminal Sandbox',
      mode: 'LOCAL SANDBOX',
      output: `[KM-INIT] 7 Core Fabrics Loaded.\n[KM-SEC] Invariants: Identity != Authority, PoR != Finality verified.\n[KM-SYS] Mode: SIMULATION / RUNTIME-UX. Ready.`,
      exitCode: 0,
      durationMs: 42,
      timestamp: new Date().toISOString(),
    },
  ],
  isTerminalOpen: false,
  toggleTerminal: () => set((state) => ({ isTerminalOpen: !state.isTerminalOpen })),

  executeTerminalCommand: async (command: string) => {
    const timestamp = new Date().toISOString();
    const isBuild = command.toLowerCase().includes('build');
    const isPor = command.toLowerCase().includes('por');

    let output = '';
    let exitCode = 0;
    const durationMs = Math.floor(Math.random() * 400) + 120;

    if (isBuild) {
      output = `> vite build && km-compile\n✓ 2788 modules transformed.\n✓ Build clean in 1.83s. Dist ready.`;
    } else if (isPor) {
      output = `[PoR Diagnostic]\nResonance frequency: 432 Hz\nGolden ratio correlation φ: 1.618033\nCalculated coherence: 0.94\n[STATUS] DIAGNOSTIC ONLY — NON-FINAL.`;
    } else {
      output = `Command executed in local container sandbox.\nNo external side effects produced.`;
    }

    const logEntry: TerminalLogEntry = {
      id: `term-${Date.now()}`,
      command,
      requestedBy: 'User Terminal',
      tool: 'Terminal Sandbox',
      mode: 'SIMULATED',
      output,
      exitCode,
      durationMs,
      timestamp,
    };

    set((state) => ({
      terminalLogs: [...state.terminalLogs, logEntry],
    }));
  },

  evidenceRecords: [
    {
      id: 'ev-seed-001',
      taskId: 'task-initialization',
      level: 'RUNNING',
      source: 'Archivarius Merkle Ledger',
      artifact: 'km-model-002-canonical-manifest.sha256',
      provenance: 'W3C DID did:key:km_7f3a... signed by Shura Council #42',
      verificationStatus: 'VERIFIED',
      reproductionStatus: 'CANONICAL_HOLD',
      simulationOnly: true,
      timestamp: new Date().toISOString(),
      summary: 'Семантическая верификация структуры 17 M-слоев и 7 ядер интеллекта.',
    },
  ],
  isEvidenceDrawerOpen: false,
  selectedEvidenceId: null,
  toggleEvidenceDrawer: (evidenceId) =>
    set((state) => ({
      isEvidenceDrawerOpen: evidenceId !== undefined ? true : !state.isEvidenceDrawerOpen,
      selectedEvidenceId: evidenceId || null,
    })),

  sendMessage: async (text: string, activeRole = 'Adult', locale = 'RU') => {
    if (!text.trim()) return;

    const userMessage: ConversationMessage = {
      id: `msg-user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };

    set((state) => ({
      messages: [...state.messages, userMessage],
      isThinking: true,
    }));

    try {
      const activeSelectedTools = get().selectedToolIds;

      // Execute local deterministic orchestration engine
      const response = await engine.sendMessage(text, {
        conversationId: get().conversationId,
        activeRole,
        locale,
        selectedTools: activeSelectedTools.length > 0 ? activeSelectedTools : undefined,
      });

      // Update cores activity state
      const updatedCores = get().cores.map((c) => {
        if (response.task.activeCores.includes(c.coreId)) {
          return {
            ...c,
            status: 'EXECUTING' as const,
            currentTaskId: response.task.taskId,
            activity: `Orchestrated by MetaLogos: ${response.task.intent.slice(0, 32)}...`,
          };
        }
        return c;
      });

      // Update terminal if terminal tool was called
      const termTool = response.message.toolInvocations?.find((t: any) => t.category === 'TERMINAL');
      let newTerminalLogs = get().terminalLogs;
      if (termTool) {
        newTerminalLogs = [
          ...newTerminalLogs,
          {
            id: `term-${Date.now()}`,
            taskId: response.task.taskId,
            command: termTool.input,
            requestedBy: 'MetaForge',
            tool: termTool.toolName,
            mode: 'SIMULATED',
            output: termTool.output || '',
            exitCode: 0,
            durationMs: 350,
            timestamp: new Date().toISOString(),
            evidenceRef: termTool.evidenceRef,
          },
        ];
      }

      // Add evidence records if captured
      let newEvidenceRecords = get().evidenceRecords;
      if (response.task.evidenceRefs && response.task.evidenceRefs.length > 0) {
        const primaryEv = response.task.evidenceRefs[response.task.evidenceRefs.length - 1];
        const newRecord = engine.createEvidenceRecord(
          primaryEv,
          response.task.taskId,
          response.turn.steps[response.turn.steps.length - 1]?.id || 'step-final',
          response.message.evidenceLevel || 'RUNNING',
          response.task.activeCores.join(' + '),
          response.message.content.slice(0, 160) + '...',
          `artifact-${response.task.taskId}.json`
        );
        newEvidenceRecords = [newRecord, ...newEvidenceRecords];
      }

      set((state) => ({
        messages: [...state.messages, response.message],
        tasks: [response.task, ...state.tasks],
        activitySteps: [...response.turn.steps, ...state.activitySteps],
        cores: updatedCores,
        terminalLogs: newTerminalLogs,
        evidenceRecords: newEvidenceRecords,
        activeTaskId: response.task.taskId,
        selectedToolIds: [],
        isThinking: false,
      }));

      // Return cores to available/standard status after completion
      setTimeout(() => {
        set((state) => ({
          cores: state.cores.map((c) => ({
            ...c,
            status: c.coreId === 'singularity' ? 'HOLD' : c.coreId === 'nurcore' ? 'SANDBOX' : c.availability ? 'AVAILABLE' : 'DORMANT',
            activity: 'Standing by for user conversational intent',
          })),
        }));
      }, 3000);
    } catch (e: any) {
      set({ isThinking: false });
    }
  },

  resetConversation: () => {
    set({
      messages: [
        {
          id: `msg-reset-${Date.now()}`,
          role: 'assistant',
          content: 'Сессия MetaLogos очищена. Ядра переведены в исходное состояние готовности.',
          timestamp: new Date().toISOString(),
          activeCores: ['metalogos'],
        },
      ],
      tasks: [],
      activitySteps: [],
      activeTaskId: null,
    });
  },

  runDemoScenario: async (scenario) => {
    if (scenario === 'simple') {
      await get().sendMessage('Привет MetaLogos, расскажи о своем назначении');
    } else if (scenario === 'collaboration') {
      await get().sendMessage('Проанализируй каноническую архитектуру Model 002 и найди противоречия');
    } else if (scenario === 'terminal') {
      await get().sendMessage('Скомпилируй и проверь frontend с помощью npm run build');
    } else if (scenario === 'por') {
      await get().sendMessage('Рассчитай гармонический резонанс PoR и выведи кривую когерентности');
    } else if (scenario === 'nur') {
      await get().sendMessage('Проверь экономические инварианты NUR Core и баланс песочницы');
    } else if (scenario === 'permission') {
      // Trigger a simulated permission request dialog
      const req: ToolPermissionRequest = {
        id: `perm-${Date.now()}`,
        taskId: `task-perm-${Date.now().toString(36)}`,
        toolId: 'tool-terminal',
        toolName: 'Terminal Sandbox',
        category: 'TERMINAL',
        commandOrArgs: 'npm run test:e2e --scope=security-gate',
        requestedBy: 'MetaLogos',
        taskTitle: 'Frontend Security Attestation',
        riskLevel: 'HIGH',
        timestamp: new Date().toISOString(),
        status: 'PENDING',
      };
      set((state) => ({
        permissionRequests: [...state.permissionRequests, req],
        activePermissionRequest: req,
      }));
    } else if (scenario === 'failure') {
      await get().sendMessage('Выполни принудительный вывод средств без подтверждения Шуры (fail-closed test)');
    }
  },
}));
