/**
 * KeyMatrix OS v2.1 — MockMetaLogosProvider
 * Deterministic Orchestration Simulation for Phase 6.8 Workspace
 * STATUS: SIMULATION ONLY
 */

import {
  AIConversationProvider,
  ConversationMessage,
  AgentTurn,
  AgentTask,
  AgentStep,
} from '../../types/agentTypes';

export class MockMetaLogosProvider implements AIConversationProvider {
  id = 'mock-metalogos-provider';
  name = 'KeyMatrix MetaLogos Simulation Engine';
  isSimulated = true;
  status: 'AVAILABLE' | 'OFFLINE' | 'DEGRADED' = 'AVAILABLE';

  async sendMessage(
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
  }> {
    const taskId = context.taskId || `task-${Date.now().toString(36)}`;
    const turnId = `turn-${Date.now().toString(36)}`;
    const now = new Date().toISOString();
    const query = input.toLowerCase();

    let scenario:
      | 'architecture'
      | 'terminal'
      | 'permission'
      | 'por'
      | 'failure'
      | 'generic' = 'generic';

    if (query.includes('архитектур') || query.includes('analyze') || query.includes('model 002') || query.includes('анализ')) {
      scenario = 'architecture';
    } else if (query.includes('build') || query.includes('тест') || query.includes('npm') || query.includes('terminal')) {
      scenario = 'terminal';
    } else if (query.includes('por') || query.includes('резонанс') || query.includes('resonance')) {
      scenario = 'por';
    } else if (query.includes('error') || query.includes('ошибк') || query.includes('fail')) {
      scenario = 'failure';
    }

    const steps: AgentStep[] = [
      {
        id: `step-1-${Date.now()}`,
        type: 'USER_INPUT',
        actor: 'User',
        status: 'COMPLETED',
        timestamp: now,
        input: input,
      },
      {
        id: `step-2-${Date.now()}`,
        type: 'META_RESPONSE',
        actor: 'MetaLogos',
        status: 'COMPLETED',
        timestamp: new Date(Date.now() + 100).toISOString(),
        output: 'Намерение декомпозировано в граф задач. Назначены участвующие ядра.',
      },
    ];

    let replyContent = '';
    let activeCores: string[] = ['metalogos'];
    let handoffs: ConversationMessage['handoffs'] = [];
    let toolInvocations: ConversationMessage['toolInvocations'] = [];
    let evidenceRef = `ev-trace-${Date.now().toString(16)}`;

    if (scenario === 'architecture') {
      activeCores = ['metalogos', 'primecore', 'archivarius'];
      steps.push(
        {
          id: `step-3-${Date.now()}`,
          type: 'CORE_ACTIVATION',
          actor: 'Archivarius',
          status: 'COMPLETED',
          timestamp: new Date(Date.now() + 200).toISOString(),
          input: 'Запрос канонического манифеста KEYMATRIX_MASTER_SYSTEM_MODEL_002.md',
        },
        {
          id: `step-4-${Date.now()}`,
          type: 'TOOL_REQUEST',
          actor: 'ToolGateway',
          status: 'COMPLETED',
          timestamp: new Date(Date.now() + 350).toISOString(),
          input: { tool: 'tool-files', action: 'read', path: 'KM-CORE-MASTER-SYSTEM-MODEL-002' },
        },
        {
          id: `step-5-${Date.now()}`,
          type: 'CORE_HANDOFF',
          actor: 'MetaLogos',
          status: 'COMPLETED',
          timestamp: new Date(Date.now() + 500).toISOString(),
          input: 'Archivarius → PrimeCore: передача структуры инвариантов для аудита',
        },
        {
          id: `step-6-${Date.now()}`,
          type: 'EVIDENCE_CAPTURE',
          actor: 'Archivarius',
          status: 'COMPLETED',
          timestamp: new Date(Date.now() + 650).toISOString(),
          output: 'Артефакт хэш-цепи сохранён в локальном журнале доказательств',
          evidenceRef,
          evidenceLevel: 'RUNNING',
        }
      );

      handoffs.push({
        fromCore: 'Archivarius',
        toCore: 'PrimeCore',
        reason: 'Верификация инвариантов безопасности и структуры 17 M-слоев',
      });

      toolInvocations.push({
        toolId: 'tool-files',
        toolName: 'Files & Artifact Vault',
        category: 'FILES',
        status: 'COMPLETED',
        input: 'READ KEYMATRIX_MASTER_SYSTEM_MODEL_002.md',
        output: 'Манифест успешно извлечен (17 M-слоев, 7 ядер, Zero-Riba инварианты).',
        isSimulated: true,
        evidenceRef,
      });

      replyContent = `**MetaLogos Orchestration Completed:**\n\n1. **Анализ архитектурного манифеста:** Archivarius извлек канонические инварианты Model 002.\n2. **Семантический аудит:** Совместно с PrimeCore подтверждено разграничение *Identity != Authority* и *PoR != Finality*.\n3. **Результат:** 7 ядер и плоскости M00–M16 находятся в согласованном симуляционном состоянии без конфликтов зависимостей.`;
    } else if (scenario === 'terminal') {
      activeCores = ['metalogos', 'metaforge'];
      steps.push(
        {
          id: `step-term-1-${Date.now()}`,
          type: 'CORE_ACTIVATION',
          actor: 'MetaForge',
          status: 'COMPLETED',
          timestamp: new Date(Date.now() + 200).toISOString(),
          input: 'Подготовка среды песочницы для валидации сборки frontend',
        },
        {
          id: `step-term-2-${Date.now()}`,
          type: 'TOOL_EXECUTION',
          actor: 'ToolGateway',
          status: 'COMPLETED',
          timestamp: new Date(Date.now() + 400).toISOString(),
          input: { tool: 'tool-terminal', cmd: 'npm run build' },
          output: { exitCode: 0, duration: '1.83s', chunks: '2788 modules transformed' },
        },
        {
          id: `step-term-3-${Date.now()}`,
          type: 'EVIDENCE_CAPTURE',
          actor: 'Archivarius',
          status: 'COMPLETED',
          timestamp: new Date(Date.now() + 600).toISOString(),
          evidenceRef,
          evidenceLevel: 'OBSERVED',
        }
      );

      toolInvocations.push({
        toolId: 'tool-terminal',
        toolName: 'Terminal Sandbox',
        category: 'TERMINAL',
        status: 'COMPLETED',
        input: '$ npm run build',
        output: '✓ 2788 modules transformed. Built in 1.83s. Exit code: 0.',
        isSimulated: true,
        evidenceRef,
      });

      replyContent = `**MetaForge Sandbox Execution Result:**\n\nКоманда \`npm run build\` успешно симулирована внутри песочницы.\n- Модулей трансформировано: 2788\n- Код возврата: 0 (УСПЕХ)\n- Артефакт зафиксирован в журнале доказательств.`;
    } else if (scenario === 'por') {
      activeCores = ['metalogos', 'singularity'];
      steps.push(
        {
          id: `step-por-1-${Date.now()}`,
          type: 'CORE_ACTIVATION',
          actor: 'Singularity',
          status: 'COMPLETED',
          timestamp: new Date(Date.now() + 200).toISOString(),
          input: 'Инициализация гармонической кривой PoR (φ = 1.618033)',
        },
        {
          id: `step-por-2-${Date.now()}`,
          type: 'TOOL_REQUEST',
          actor: 'ToolGateway',
          status: 'COMPLETED',
          timestamp: new Date(Date.now() + 400).toISOString(),
          input: { tool: 'tool-por-sandbox', freq: 432, phiRatio: 1.618 },
        }
      );

      toolInvocations.push({
        toolId: 'tool-por-sandbox',
        toolName: 'PoR Resonance Diagnostic',
        category: 'SANDBOX',
        status: 'SIMULATED',
        input: 'DIAGNOSTIC_CALC φ=1.618033, Q=0.94',
        output: 'Resonance Index: 0.94 (DIAGNOSTIC ONLY — NOT FINALITY)',
        isSimulated: true,
        evidenceRef,
      });

      replyContent = `**PoR Diagnostic Calculation (Simulation):**\n\n- Индекс гармонии: 0.94\n- Фазовое соотношение: Золотое сечение φ = 1.618033\n- **Важное примечание:** Значение PoR является диагностическим и **не представляет собой математическую финализацию или властные полномочия**.`;
    } else if (scenario === 'failure') {
      activeCores = ['metalogos', 'primecore'];
      steps.push(
        {
          id: `step-fail-1-${Date.now()}`,
          type: 'AUTHORIZATION_CHECK',
          actor: 'PrimeCore',
          status: 'FAILED',
          timestamp: new Date(Date.now() + 200).toISOString(),
          output: 'POLICY_BLOCKED: Операция требует явного одобрения Шуры (Shura Rule #42).',
        }
      );

      replyContent = `**Отказ в авторизации (Policy Guardrail):**\n\nДействие заблокировано PrimeCore согласно инварианту защиты: \`POLICY_BLOCKED\`. Требуется явное человеческое подтверждение или мандат роли Shura.`;
    } else {
      activeCores = ['metalogos'];
      steps.push({
        id: `step-gen-1-${Date.now()}`,
        type: 'FINAL_RESPONSE',
        actor: 'MetaLogos',
        status: 'COMPLETED',
        timestamp: new Date(Date.now() + 250).toISOString(),
      });

      replyContent = `Приветствую в рабочей среде **KeyMatrix MetaLogos**. Я выступаю единым диалоговым шлюзом к 7 ядрам интеллекта (MetaCore, MetaForge, PrimeCore, MindState, Archivarius, Singularity, NUR Core).\n\nВы можете запросить декомпозицию архитектуры, аудит инвариантов, запуск симуляции терминала или диагностику PoR.`;
    }

    const task: AgentTask = {
      taskId,
      conversationId: context.conversationId,
      intent: input,
      status: scenario === 'failure' ? 'FAILED' : 'COMPLETED',
      createdAt: now,
      updatedAt: new Date().toISOString(),
      actor: 'MetaLogos',
      activeCores,
      activeTools: (toolInvocations || []).map((t: NonNullable<ConversationMessage['toolInvocations']>[number]) => t.toolId),
      steps,
      evidenceRefs: [evidenceRef],
      result: replyContent,
      mode: 'SIMULATION',
    };

    const turn: AgentTurn = {
      id: turnId,
      conversationId: context.conversationId,
      actor: 'MetaLogos',
      status: scenario === 'failure' ? 'ERROR' : 'COMPLETED',
      startedAt: now,
      completedAt: new Date().toISOString(),
      steps,
    };

    const message: ConversationMessage = {
      id: `msg-${Date.now()}`,
      role: 'assistant',
      content: replyContent,
      timestamp: new Date().toISOString(),
      taskId,
      activeCores,
      toolInvocations,
      handoffs,
      evidenceRef,
      evidenceLevel: scenario === 'por' ? null : 'RUNNING',
    };

    return {
      message,
      turn,
      task,
    };
  }
}
