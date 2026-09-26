/**
 * KeyMatrix OS v2.1 — MetaLogos Local Orchestration Engine
 * Deterministic Orchestration State Machine, Capability Gateway, Task Planner,
 * Core Handoff Graph and Evidence Pipeline.
 * 
 * BOUNDARY: LOCAL SIMULATION ONLY.
 * NO PRODUCTION AUTHORITY, NO REAL TEE, NO CRYPTOGRAPHIC QUORUM,
 * NO REAL NUR SETTLEMENT, NO EXTERNAL EXECUTION.
 */

import {
  AgentTask,
  AgentStep,
  AgentTurn,
  ConversationMessage,
  CoreDescriptor,
  EvidenceRecord,
  TaskStatus,
  StepType,
  AIConversationProvider,
} from '../../types/agentTypes';
import { EvidenceLevel } from '../../types';
import { INITIAL_CORES, INITIAL_TOOLS } from '../../data/agentRegistry';

export interface IntentParseResult {
  intent: string;
  category: 'architecture' | 'terminal' | 'permission' | 'por' | 'nur' | 'search' | 'files' | 'compute' | 'multitool' | 'status' | 'unsupported';
  requestedCores: string[];
  requiredCapabilities: string[];
  selectedTools?: string[];
  explanation?: string;
  policyApproved: boolean;
  authorityRequired: boolean;
  failureReason?: string;
  slashCommand?: string;
}

export class MetaLogosOrchestrationEngine implements AIConversationProvider {
  id = 'metalogos-orchestration-engine-v1';
  name = 'MetaLogos Local Orchestration Engine v1';
  isSimulated = true;
  status: 'AVAILABLE' | 'OFFLINE' | 'DEGRADED' = 'AVAILABLE';

  /**
   * Intent Decomposition & Policy Evaluation
   */
  public parseIntent(input: string, activeRole: string, explicitTools?: string[]): IntentParseResult {
    const raw = input.trim();
    const q = raw.toLowerCase();

    // 0. Slash Commands Handling
    if (raw.startsWith('/')) {
      const parts = raw.slice(1).split(' ');
      const cmd = parts[0]?.toLowerCase();
      const rest = parts.slice(1).join(' ').trim();

      if (cmd === 'search') {
        return {
          intent: rest ? `Поиск в источниках: ${rest}` : 'Запуск инструмента Web Search',
          category: 'search',
          requestedCores: ['metalogos'],
          requiredCapabilities: ['net.search'],
          selectedTools: ['tool-web-search'],
          policyApproved: true,
          authorityRequired: false,
          slashCommand: '/search',
        };
      }
      if (cmd === 'files') {
        return {
          intent: rest ? `Операция с хранилищем файлов: ${rest}` : 'Чтение манифеста из Files & Artifact Vault',
          category: 'files',
          requestedCores: ['metalogos', 'archivarius'],
          requiredCapabilities: ['files.readwrite'],
          selectedTools: ['tool-files'],
          policyApproved: true,
          authorityRequired: false,
          slashCommand: '/files',
        };
      }
      if (cmd === 'terminal') {
        return {
          intent: rest ? `Выполнение команды терминала: ${rest}` : 'Сборка и проверка frontend в Terminal Sandbox',
          category: 'terminal',
          requestedCores: ['metalogos', 'metaforge'],
          requiredCapabilities: ['terminal.execute'],
          selectedTools: ['tool-terminal'],
          policyApproved: true,
          authorityRequired: false,
          slashCommand: '/terminal',
        };
      }
      if (cmd === 'compute') {
        return {
          intent: rest ? `Математический расчет: ${rest}` : 'Вычисление детерминированных математических функций',
          category: 'compute',
          requestedCores: ['metalogos'],
          requiredCapabilities: ['compute.math'],
          selectedTools: ['tool-compute'],
          policyApproved: true,
          authorityRequired: false,
          slashCommand: '/compute',
        };
      }
      if (cmd === 'por') {
        return {
          intent: 'Диагностический расчет гармонического резонанса PoR (φ = 1.618033)',
          category: 'por',
          requestedCores: ['metalogos', 'primecore'],
          requiredCapabilities: ['compute.math', 'por.diagnose'],
          selectedTools: ['tool-por-sandbox'],
          policyApproved: true,
          authorityRequired: false,
          slashCommand: '/por',
        };
      }
      if (cmd === 'status' || cmd === 'tools' || cmd === 'task' || cmd === 'evidence') {
        return {
          intent: `Системный запрос состояния: /${cmd}`,
          category: 'status',
          requestedCores: ['metalogos', 'primecore'],
          requiredCapabilities: [],
          policyApproved: true,
          authorityRequired: false,
          slashCommand: `/${cmd}`,
        };
      }
    }

    // Explicit Tools Selected from Composer
    if (explicitTools && explicitTools.length > 0) {
      if (explicitTools.includes('tool-api')) {
        return {
          intent: `Запрос через External API Gateway: "${input}"`,
          category: 'permission',
          requestedCores: ['metalogos', 'primecore'],
          requiredCapabilities: ['api.outbound'],
          selectedTools: explicitTools,
          policyApproved: false,
          authorityRequired: true,
          failureReason: 'TOOL_DISABLED: External API Gateway отключен (DISABLED). Требуется явный внешний контракт (ADR-004/007).',
        };
      }

      if (explicitTools.length > 1) {
        const cores = new Set<string>(['metalogos']);
        const caps: string[] = [];
        if (explicitTools.includes('tool-files')) {
          cores.add('archivarius');
          caps.push('files.readwrite');
        }
        if (explicitTools.includes('tool-terminal')) {
          cores.add('metaforge');
          caps.push('terminal.execute');
        }
        if (explicitTools.includes('tool-compute')) {
          caps.push('compute.math');
        }
        if (explicitTools.includes('tool-por-sandbox')) {
          cores.add('primecore');
          caps.push('por.diagnose');
        }
        if (explicitTools.includes('tool-web-search')) {
          caps.push('net.search');
        }
        return {
          intent: `Мульти-инструментальная задача (${explicitTools.length} инструментов): ${input}`,
          category: 'multitool',
          requestedCores: Array.from(cores),
          requiredCapabilities: caps,
          selectedTools: explicitTools,
          policyApproved: true,
          authorityRequired: false,
        };
      }

      const singleTool = explicitTools[0];
      if (singleTool === 'tool-terminal') {
        return {
          intent: input || 'Сборка и проверка в песочнице терминала MetaForge',
          category: 'terminal',
          requestedCores: ['metalogos', 'metaforge'],
          requiredCapabilities: ['code.synthesize', 'terminal.execute'],
          selectedTools: ['tool-terminal'],
          policyApproved: true,
          authorityRequired: false,
        };
      }
      if (singleTool === 'tool-files') {
        return {
          intent: input || 'Чтение и проверка манифеста файлов в хранилище Archivarius',
          category: 'files',
          requestedCores: ['metalogos', 'archivarius'],
          requiredCapabilities: ['files.readwrite'],
          selectedTools: ['tool-files'],
          policyApproved: true,
          authorityRequired: false,
        };
      }
      if (singleTool === 'tool-compute') {
        return {
          intent: input || 'Детерминированный математический расчет в среде Compute',
          category: 'compute',
          requestedCores: ['metalogos'],
          requiredCapabilities: ['compute.math'],
          selectedTools: ['tool-compute'],
          policyApproved: true,
          authorityRequired: false,
        };
      }
      if (singleTool === 'tool-por-sandbox') {
        return {
          intent: 'Диагностический расчет гармонического резонанса PoR (φ = 1.618033)',
          category: 'por',
          requestedCores: ['metalogos', 'primecore'],
          requiredCapabilities: ['compute.math', 'por.diagnose'],
          selectedTools: ['tool-por-sandbox'],
          policyApproved: true,
          authorityRequired: false,
        };
      }
      if (singleTool === 'tool-web-search') {
        return {
          intent: input || 'Поиск по верифицированным источникам с фильтром безопасности',
          category: 'search',
          requestedCores: ['metalogos'],
          requiredCapabilities: ['net.search'],
          selectedTools: ['tool-web-search'],
          policyApproved: true,
          authorityRequired: false,
        };
      }
    }

    // 1. NUR Economic Sandbox (Priority check before generic invariant analysis)
    if (
      q.includes('nur') ||
      q.includes('нур') ||
      q.includes('кошелек') ||
      q.includes('wallet') ||
      q.includes('zero-riba') ||
      q.includes('scenario e')
    ) {
      return {
        intent: 'Аудит беспроцентных экономических инвариантов NUR Core (Non-Settlement)',
        category: 'nur',
        requestedCores: ['metalogos', 'nurcore'],
        requiredCapabilities: ['value.account', 'reward.calculate'],
        policyApproved: true,
        authorityRequired: false,
      };
    }

    // 2. PoR Diagnostic
    if (
      q.includes('por') ||
      q.includes('резонанс') ||
      q.includes('resonance') ||
      q.includes('гармоник') ||
      q.includes('scenario d') ||
      q.includes('диагностику por')
    ) {
      return {
        intent: 'Диагностический расчет гармонического резонанса PoR (φ = 1.618033)',
        category: 'por',
        requestedCores: ['metalogos', 'primecore'],
        requiredCapabilities: ['compute.math', 'por.diagnose'],
        selectedTools: ['tool-por-sandbox'],
        policyApproved: true,
        authorityRequired: false,
      };
    }

    // 3. Terminal Sandbox Command
    if (
      q.includes('терминал') ||
      q.includes('terminal') ||
      q.includes('npm run') ||
      q.includes('build') ||
      q.includes('compile') ||
      q.includes('компиляц') ||
      q.includes('используй терминал') ||
      q.includes('сборку') ||
      q.includes('scenario b')
    ) {
      return {
        intent: 'Синтез пайплайна и сборка в песочнице терминала MetaForge',
        category: 'terminal',
        requestedCores: ['metalogos', 'metaforge'],
        requiredCapabilities: ['code.synthesize', 'terminal.execute'],
        selectedTools: ['tool-terminal'],
        policyApproved: true,
        authorityRequired: false,
      };
    }

    // 4. Files & Artifact Vault Natural Language
    if (
      q.includes('файл') ||
      q.includes('file') ||
      q.includes('манифест') ||
      q.includes('vault') ||
      q.includes('проверь этот файл')
    ) {
      return {
        intent: 'Чтение и аудит артефактов в Files & Artifact Vault',
        category: 'files',
        requestedCores: ['metalogos', 'archivarius'],
        requiredCapabilities: ['files.readwrite'],
        selectedTools: ['tool-files'],
        policyApproved: true,
        authorityRequired: false,
      };
    }

    // 5. Deterministic Compute Natural Language
    if (
      q.includes('посчитай') ||
      q.includes('вычисли') ||
      q.includes('compute') ||
      q.includes('калькулятор') ||
      q.includes('math')
    ) {
      return {
        intent: 'Детерминированный математический расчет в среде Compute',
        category: 'compute',
        requestedCores: ['metalogos'],
        requiredCapabilities: ['compute.math'],
        selectedTools: ['tool-compute'],
        policyApproved: true,
        authorityRequired: false,
      };
    }

    // 6. Web Search Natural Language
    if (
      q.includes('поиск') ||
      q.includes('найди') ||
      q.includes('search') ||
      q.includes('интернет')
    ) {
      return {
        intent: 'Поиск по верифицированным источникам с фильтром безопасности',
        category: 'search',
        requestedCores: ['metalogos'],
        requiredCapabilities: ['net.search'],
        selectedTools: ['tool-web-search'],
        policyApproved: true,
        authorityRequired: false,
      };
    }

    // 7. Architecture Analysis (Model 002)
    if (
      q.includes('архитектур') ||
      q.includes('model 002') ||
      q.includes('инвариант') ||
      q.includes('анализ') ||
      q.includes('architecture') ||
      q.includes('scenario a')
    ) {
      return {
        intent: 'Архитектурный анализ инвариантов Model 002 и цепочки ядер',
        category: 'architecture',
        requestedCores: ['metalogos', 'archivarius', 'primecore'],
        requiredCapabilities: ['files.readwrite', 'security.enforce', 'evidence.store'],
        policyApproved: true,
        authorityRequired: false,
      };
    }

    // 8. Explicit Permission / Authority / High Risk
    if (
      q.includes('права') ||
      q.includes('permission') ||
      q.includes('вывод') ||
      q.includes('transfer') ||
      q.includes('fail-closed') ||
      q.includes('блокировк') ||
      q.includes('unauthorized')
    ) {
      return {
        intent: 'Запрос привилегированной транзакции или изменение системных прав',
        category: 'permission',
        requestedCores: ['metalogos', 'primecore'],
        requiredCapabilities: ['security.enforce', 'api.outbound'],
        policyApproved: false,
        authorityRequired: true,
        failureReason: 'POLICY_BLOCKED: Требуется санкция Шуры (Shura Rule #42) и подтверждение оператора.',
      };
    }

    // 9. Generic / Unsupported Prompt
    return {
      intent: input.trim(),
      category: 'unsupported',
      requestedCores: ['metalogos'],
      requiredCapabilities: [],
      policyApproved: false,
      authorityRequired: false,
      failureReason: 'CAPABILITY_UNAVAILABLE: Намерение не сопоставлено с зарегистрированными контрактами 7 ядер или требует неподдерживаемый инструмент.',
    };
  }

  /**
   * Main Pipeline: Intent -> Task Plan -> Core Activation & Handoff -> Tool Gateway -> Evidence -> Turn
   */
  public async sendMessage(
    input: string,
    context: {
      conversationId: string;
      taskId?: string;
      activeRole: string;
      locale: string;
      selectedTools?: string[];
    }
  ): Promise<{
    message: ConversationMessage;
    turn: AgentTurn;
    task: AgentTask;
  }> {
    const timestamp = new Date().toISOString();
    const taskId = context.taskId || `task-${Date.now().toString(36)}`;
    const turnId = `turn-${Date.now().toString(36)}`;
    const parsed = this.parseIntent(input, context.activeRole, context.selectedTools);

    const steps: AgentStep[] = [];
    const evidenceRefs: string[] = [];
    const handoffs: ConversationMessage['handoffs'] = [];
    const toolInvocations: ConversationMessage['toolInvocations'] = [];

    // Step 1: USER_INPUT
    steps.push({
      id: `step-${Date.now()}-input`,
      taskId,
      type: 'USER_INPUT',
      actor: 'User',
      status: 'COMPLETED',
      timestamp: new Date().toISOString(),
      input,
      inputSummary: `Пользовательский интент: "${input.slice(0, 80)}"`,
      simulation: true,
    });

    // Step 2: META_RESPONSE (Task Plan Generation)
    const planStepId = `step-${Date.now()}-plan`;
    steps.push({
      id: planStepId,
      taskId,
      type: 'META_RESPONSE',
      actor: 'MetaLogos',
      status: 'COMPLETED',
      timestamp: new Date(Date.now() + 50).toISOString(),
      outputSummary: `Интент декомпозирован: [${parsed.category.toUpperCase()}]. Назначены ядра: ${parsed.requestedCores.join(', ')}`,
      simulation: true,
    });

    let taskStatus: TaskStatus = 'COMPLETED';
    let replyContent = '';
    let evidenceLevel: EvidenceLevel = 'RUNNING';

    // Handle Scenarios Deterministically
    if (parsed.category === 'architecture') {
      // Core 1 Activation: MetaLogos
      steps.push({
        id: `step-${Date.now()}-c1`,
        taskId,
        type: 'CORE_ACTIVATION',
        actor: 'MetaLogos',
        status: 'COMPLETED',
        timestamp: new Date(Date.now() + 100).toISOString(),
        outputSummary: 'MetaLogos инициализировал семантический контекст задачи.',
        simulation: true,
      });

      // Handoff: MetaLogos -> Archivarius
      handoffs.push({
        fromCore: 'MetaLogos',
        toCore: 'Archivarius',
        reason: 'Запрос манифеста инвариантов Model 002',
        capability: 'files.readWrite',
        simulation: true,
      });
      steps.push({
        id: `step-${Date.now()}-h1`,
        taskId,
        type: 'CORE_HANDOFF',
        actor: 'MetaLogos',
        target: 'Archivarius',
        capability: 'files.readWrite',
        status: 'COMPLETED',
        timestamp: new Date(Date.now() + 150).toISOString(),
        inputSummary: 'CORE HANDOFF — NOT AUTHORITY DELEGATION. Причина: извлечение канонических инвариантов.',
        simulation: true,
      });

      // Tool Request & Result: Archivarius uses Files Vault
      const evArch = `ev-arch-${Date.now().toString(16)}`;
      evidenceRefs.push(evArch);
      toolInvocations.push({
        toolId: 'tool-files',
        toolName: 'Files & Artifact Vault',
        category: 'FILES',
        status: 'AVAILABLE',
        input: 'READ /KM/CANONICAL/MODEL_002_INVARIANTS.md',
        output: 'READ_OK: 48 правил, Invariant #1 (Identity != Authority), Invariant #2 (PoR != Finality)',
        isSimulated: true,
        evidenceRef: evArch,
      });
      steps.push({
        id: `step-${Date.now()}-tool-files`,
        taskId,
        type: 'TOOL_EXECUTION',
        actor: 'ToolGateway',
        target: 'tool-files',
        capability: 'files.readWrite',
        status: 'COMPLETED',
        timestamp: new Date(Date.now() + 250).toISOString(),
        inputSummary: 'READ /KM/CANONICAL/MODEL_002_INVARIANTS.md',
        outputSummary: 'Успешно прочитано: 48 правил инвариантов.',
        evidenceRef: evArch,
        evidenceLevel: 'RUNNING',
        simulation: true,
      });

      // Handoff: Archivarius -> PrimeCore
      handoffs.push({
        fromCore: 'Archivarius',
        toCore: 'PrimeCore',
        reason: 'Верификация инвариантов безопасности и целостности',
        capability: 'security.enforce',
        simulation: true,
      });
      steps.push({
        id: `step-${Date.now()}-h2`,
        taskId,
        type: 'CORE_HANDOFF',
        actor: 'Archivarius',
        target: 'PrimeCore',
        capability: 'security.enforce',
        status: 'COMPLETED',
        timestamp: new Date(Date.now() + 350).toISOString(),
        inputSummary: 'CORE HANDOFF — NOT AUTHORITY DELEGATION. Причина: проверка инвариантов безопасности.',
        simulation: true,
      });

      // Step: PrimeCore Evidence Capture
      const evPrime = `ev-prime-${Date.now().toString(16)}`;
      evidenceRefs.push(evPrime);
      steps.push({
        id: `step-${Date.now()}-ev-prime`,
        taskId,
        type: 'EVIDENCE_CAPTURE',
        actor: 'PrimeCore',
        status: 'COMPLETED',
        timestamp: new Date(Date.now() + 450).toISOString(),
        outputSummary: 'Зафиксирован Merkle-хэш состояния инвариантов в локальном хранилище.',
        evidenceRef: evPrime,
        evidenceLevel: 'RUNNING',
        simulation: true,
      });

      replyContent = `### Результат архитектурного анализа (Local Simulation)

**Граф выполнения задачи [${taskId}]:**
1. **MetaLogos** выполнил декомпозицию интента на 3 подзадачи.
2. **CORE HANDOFF:** MetaLogos ➔ Archivarius (файловый доступ к Model 002).
3. **Archivarius** извлек канонические инварианты Model 002.
4. **CORE HANDOFF:** Archivarius ➔ PrimeCore (верификация безопасности).
5. **PrimeCore** подтвердил соблюдение ключевых постулатов:
   * **Identity ≠ Authority:** Сессия является локально наблюдаемой, а не институциональным мандатом.
   * **PoR ≠ Finality:** Диагностический расчет гармонии не заменяет криптографический консенсус.
   * **TEE Attestation:** Зафиксирован локальный симуляционный режим (SIMULATED).

*Доказательство зафиксировано:* \`${evPrime}\` (Уровень: 4 RUNNING / SIMULATED).`;
      evidenceLevel = 'RUNNING';
    } else if (parsed.category === 'terminal') {
      // Scenario B: Terminal Sandbox
      steps.push({
        id: `step-${Date.now()}-c-forge`,
        taskId,
        type: 'CORE_ACTIVATION',
        actor: 'MetaForge',
        status: 'COMPLETED',
        timestamp: new Date(Date.now() + 100).toISOString(),
        outputSummary: 'MetaForge активировал среду синтеза пайплайна.',
        simulation: true,
      });

      const evTerm = `ev-term-${Date.now().toString(16)}`;
      evidenceRefs.push(evTerm);
      toolInvocations.push({
        toolId: 'tool-terminal',
        toolName: 'Terminal Sandbox',
        category: 'TERMINAL',
        status: 'SIMULATED',
        input: 'npm run build -- --mode simulation',
        output: 'SIMULATED COMMAND: 2798 modules transformed. Exit Code: 0. [NO EXTERNAL EXECUTION]',
        isSimulated: true,
        evidenceRef: evTerm,
      });

      steps.push({
        id: `step-${Date.now()}-tool-term`,
        taskId,
        type: 'TOOL_EXECUTION',
        actor: 'ToolGateway',
        target: 'tool-terminal',
        capability: 'terminal.execute',
        status: 'COMPLETED',
        timestamp: new Date(Date.now() + 250).toISOString(),
        inputSummary: 'npm run build (LOCAL_SANDBOX_SIMULATED)',
        outputSummary: '2798 modules transformed. Exit code: 0. (СИМУЛЯЦИЯ: реальные команды ОС не запускаются)',
        evidenceRef: evTerm,
        evidenceLevel: 'IMPLEMENTED',
        simulation: true,
      });

      replyContent = `### Итог выполнения в песочнице терминала (MetaForge Sandbox)

* **Команда:** \`npm run build -- --mode simulation\`
* **Режим:** \`LOCAL_SANDBOX_SIMULATED\` (Внешнее исполнение заблокировано)
* **Статус:** 0 (Exit OK)
* **Трансформация:** 2798 модулей синтезировано в локальном контексте.
* **Границы истины:** Никакие произвольные команды операционной системы не исполняются из текста ИИ.

*Доказательство:* \`${evTerm}\` (Уровень: 3 IMPLEMENTED в изолированной песочнице).`;
      evidenceLevel = 'IMPLEMENTED';
    } else if (parsed.category === 'por') {
      // Scenario D: PoR Diagnostic
      steps.push({
        id: `step-${Date.now()}-c-prime-por`,
        taskId,
        type: 'CORE_ACTIVATION',
        actor: 'PrimeCore',
        status: 'COMPLETED',
        timestamp: new Date(Date.now() + 100).toISOString(),
        outputSummary: 'PrimeCore инициировал гармонический расчет PoR (φ = 1.618033).',
        simulation: true,
      });

      const evPor = `ev-por-${Date.now().toString(16)}`;
      evidenceRefs.push(evPor);
      const porDiagnosticData = {
        score: 0.94,
        frequency: 432,
        phi: 1.618033,
        mode: 'DIAGNOSTIC_ONLY',
        finality: null,
      };

      toolInvocations.push({
        toolId: 'tool-por-sandbox',
        toolName: 'PoR Resonance Diagnostic',
        category: 'SANDBOX',
        status: 'SIMULATED',
        input: 'DIAGNOSTIC_CALC φ=1.618033, frequency=432Hz, Q=0.94',
        output: 'Resonance Index: 0.94 (DIAGNOSTIC ONLY — FINALITY NULL)',
        isSimulated: true,
        evidenceRef: evPor,
      });

      steps.push({
        id: `step-${Date.now()}-tool-por`,
        taskId,
        type: 'TOOL_EXECUTION',
        actor: 'ToolGateway',
        target: 'tool-por-sandbox',
        capability: 'por.diagnose',
        status: 'COMPLETED',
        timestamp: new Date(Date.now() + 200).toISOString(),
        input: { tool: 'tool-por-sandbox', frequency: 432, phi: 1.618033 },
        output: porDiagnosticData,
        outputSummary: 'Резонансный индекс: 0.94. Статус finality: NULL (ADR-010 Open Gap).',
        evidenceRef: evPor,
        evidenceLevel: null,
        simulation: true,
      });

      replyContent = `### Диагностический расчет Proof of Resonance (PoR)

* **Частота резонанса:** 432 Hz
* **Золотое сечение (φ):** 1.618033
* **Индекс резонанса:** 0.94
* **Канонический статус финализации (Finality):** \`NULL\` (исследовательский пробел MATH-001 / ADR-010).
* **Внимание:** Диагностический расчет служит математической визуализацией гармонии и **не является криптографическим консенсусом или основанием для монетарных транзакций**.

*Доказательство:* \`${evPor}\` (Уровень: null / Diagnostic Only, Core Status: HOLD).`;
      evidenceLevel = null;
    } else if (parsed.category === 'nur') {
      // Scenario E: NUR Sandbox
      steps.push({
        id: `step-${Date.now()}-c-nur`,
        taskId,
        type: 'CORE_ACTIVATION',
        actor: 'NUR Core',
        status: 'COMPLETED',
        timestamp: new Date(Date.now() + 100).toISOString(),
        outputSummary: 'NUR Core провел аудит границ Value, Reward и Digital Cash.',
        simulation: true,
      });

      const evNur = `ev-nur-${Date.now().toString(16)}`;
      evidenceRefs.push(evNur);
      steps.push({
        id: `step-${Date.now()}-ev-nur`,
        taskId,
        type: 'EVIDENCE_CAPTURE',
        actor: 'NUR Core',
        status: 'COMPLETED',
        timestamp: new Date(Date.now() + 200).toISOString(),
        outputSummary: 'Зафиксировано: Value != Reward != Digital Cash. Settlement: NON-SETTLEMENT SANDBOX.',
        evidenceRef: evNur,
        evidenceLevel: 'IMPLEMENTED',
        simulation: true,
      });

      replyContent = `### Аудит беспроцентных инвариантов NUR Core

1. **Разделение доменов:**
   * **Value:** Этическая оценка общественно полезного воздействия.
   * **Reward:** Внутренние баллы симулятора активности.
   * **Digital Cash:** ИСКЛЮЧИТЕЛЬНО песочница без расчетов (NON-SETTLEMENT SANDBOX).
2. **Инвариант ADR-009:** Расчетные шлюзы реального мира отсутствуют, исключая риск ростовщичества (Zero-Riba Gate).
3. **Объем симуляционных единиц:** 1,250,000 NUR в локальном демонстрационном реестре.

*Доказательство:* \`${evNur}\` (Уровень: 3 IMPLEMENTED, Execution Mode: SANDBOX).`;
      evidenceLevel = 'IMPLEMENTED';
    } else if (parsed.category === 'search') {
      // Tool execution: Web Search
      const evSearch = `ev-search-${Date.now().toString(16)}`;
      evidenceRefs.push(evSearch);
      toolInvocations.push({
        toolId: 'tool-web-search',
        toolName: 'Web Search',
        category: 'WEB_SEARCH',
        status: 'SIMULATED',
        input: input,
        output: 'Найдено 4 проверенных источника (Shariah compliant, domain allowlist).',
        isSimulated: true,
        evidenceRef: evSearch,
      });

      steps.push({
        id: `step-${Date.now()}-search`,
        taskId,
        type: 'TOOL_EXECUTION',
        actor: 'ToolGateway',
        target: 'tool-web-search',
        capability: 'net.search',
        status: 'COMPLETED',
        timestamp: new Date(Date.now() + 150).toISOString(),
        outputSummary: 'Выполнен симулированный поиск по безопасным источникам.',
        evidenceRef: evSearch,
        evidenceLevel: 'RUNNING',
        simulation: true,
      });

      replyContent = `### Результаты Web Search (SIMULATED)

* **Запрос:** «${input}»
* **Режим:** \`SIMULATED\` (Domain Allowlist Sandbox)
* **Статус:** 4 источника проверены на соответствие этическим фильтрам безопасности.
* **Примечание:** Поиск выполнен в локальном шлюзе без обращения к неконтролируемым внешним API.

*Свидетельство:* \`${evSearch}\` (Уровень: 4 RUNNING / SIMULATED).`;
      evidenceLevel = 'RUNNING';
    } else if (parsed.category === 'files') {
      // Tool execution: Files & Artifact Vault
      const evFiles = `ev-files-${Date.now().toString(16)}`;
      evidenceRefs.push(evFiles);
      toolInvocations.push({
        toolId: 'tool-files',
        toolName: 'Files & Artifact Vault',
        category: 'FILES',
        status: 'AVAILABLE',
        input: input,
        output: 'Манифест артефактов проверен. Хранилище Archivarius доступно.',
        isSimulated: true,
        evidenceRef: evFiles,
      });

      steps.push({
        id: `step-${Date.now()}-files`,
        taskId,
        type: 'TOOL_EXECUTION',
        actor: 'ToolGateway',
        target: 'tool-files',
        capability: 'files.readwrite',
        status: 'COMPLETED',
        timestamp: new Date(Date.now() + 150).toISOString(),
        outputSummary: 'Файловые артефакты верифицированы в локальном хранилище.',
        evidenceRef: evFiles,
        evidenceLevel: 'RUNNING',
        simulation: true,
      });

      replyContent = `### Files & Artifact Vault (LOCAL SANDBOX)

* **Операция:** Чтение и валидация артефактов в локальной песочнице
* **Режим:** \`LOCAL SANDBOX\`
* **Ядро-хранитель:** Archivarius
* **Результат:** Файловые дескрипторы согласованы, контрольные суммы SHA-256 сформированы.

*Свидетельство:* \`${evFiles}\` (Уровень: 4 RUNNING / LOCAL SANDBOX).`;
      evidenceLevel = 'RUNNING';
    } else if (parsed.category === 'compute') {
      // Tool execution: Deterministic Compute
      const evCompute = `ev-comp-${Date.now().toString(16)}`;
      evidenceRefs.push(evCompute);
      toolInvocations.push({
        toolId: 'tool-compute',
        toolName: 'Deterministic Compute',
        category: 'COMPUTE',
        status: 'AVAILABLE',
        input: input,
        output: 'Математический расчет завершен детерминированно. Погрешность: 0.0.',
        isSimulated: true,
        evidenceRef: evCompute,
      });

      steps.push({
        id: `step-${Date.now()}-comp`,
        taskId,
        type: 'TOOL_EXECUTION',
        actor: 'ToolGateway',
        target: 'tool-compute',
        capability: 'compute.math',
        status: 'COMPLETED',
        timestamp: new Date(Date.now() + 150).toISOString(),
        outputSummary: 'Детерминированное вычисление выполнено успешно.',
        evidenceRef: evCompute,
        evidenceLevel: 'RUNNING',
        simulation: true,
      });

      replyContent = `### Deterministic Compute (LOCAL)

* **Запрос:** «${input}»
* **Режим:** \`LOCAL\` (Чистые математические и астрономические функции)
* **Риск:** \`LOW\`
* **Результат:** Расчет выполнен с полной детерминированностью без сайд-эффектов.

*Свидетельство:* \`${evCompute}\` (Уровень: 4 RUNNING / LOCAL).`;
      evidenceLevel = 'RUNNING';
    } else if (parsed.category === 'multitool') {
      // Multi-Tool execution
      const toolNames: string[] = [];
      parsed.selectedTools?.forEach((tId, idx) => {
        const evSub = `ev-multi-${idx}-${Date.now().toString(16)}`;
        evidenceRefs.push(evSub);
        const tDesc = INITIAL_TOOLS.find((t) => t.toolId === tId);
        const tName = tDesc?.name || tId;
        toolNames.push(tName);

        toolInvocations.push({
          toolId: tId,
          toolName: tName,
          category: tDesc?.category || 'COMPUTE',
          status: 'SIMULATED',
          input: `Multi-tool subtask [${tName}]: ${input}`,
          output: `Успешное выполнение шага ${idx + 1}/${parsed.selectedTools?.length}`,
          isSimulated: true,
          evidenceRef: evSub,
        });

        steps.push({
          id: `step-${Date.now()}-multi-${idx}`,
          taskId,
          type: 'TOOL_EXECUTION',
          actor: 'ToolGateway',
          target: tId,
          capability: tDesc?.capabilityRequired || 'compute.math',
          status: 'COMPLETED',
          timestamp: new Date(Date.now() + 100 * (idx + 1)).toISOString(),
          outputSummary: `Инструмент ${tName} выполнил суб-задачу в рамках единого Task ID [${taskId}].`,
          evidenceRef: evSub,
          evidenceLevel: 'RUNNING',
          simulation: true,
        });
      });

      replyContent = `### Мульти-инструментальная задача (Multi-Tool Task)

* **Идентификатор задачи:** \`${taskId}\`
* **Подключенные инструменты (${toolNames.length}):** ${toolNames.join(', ')}
* **Координирующие ядра:** ${parsed.requestedCores.join(' + ')}
* **Архитектурный инвариант:** Единый Task ID объединяет все шаги, запросы прав и ссылки на доказательства в общий Activity Trace.

*Свидетельства шагов:* ${evidenceRefs.map((r) => `\`${r}\``).join(', ')}`;
      evidenceLevel = 'RUNNING';
    } else if (parsed.category === 'status') {
      const evStat = `ev-status-${Date.now().toString(16)}`;
      evidenceRefs.push(evStat);
      steps.push({
        id: `step-${Date.now()}-status`,
        taskId,
        type: 'TASK_UPDATE',
        actor: 'MetaLogos',
        status: 'COMPLETED',
        timestamp: new Date(Date.now() + 100).toISOString(),
        outputSummary: 'Статус ядра и шлюза инструментов получен успешно.',
        evidenceRef: evStat,
        evidenceLevel: 'RUNNING',
        simulation: true,
      });

      replyContent = `### 📊 Системный статус KeyMatrix OS v2.1 (Phase 6.8)

* **Команда:** \`${parsed.slashCommand || '/status'}\`
* **Ядра интеллекта:** 7 зарегистрированных ядер (MetaLogos, MetaForge, PrimeCore, MindState, Archivarius, Singularity, NUR Core)
* **Режим симуляции:** \`LOCAL SIMULATION ONLY\`
* **Шлюз инструментов:** 6 инструментов (Web Search, Files, Terminal, Compute, External API [DISABLED], PoR Diagnostic [DIAGNOSTIC ONLY])
* **Инварианты:**
  * \`Identity != Authority\` (Роль в UI не дает права)
  * \`PoR Finality = NULL\` (Диагностический расчет)
  * \`NUR = Non-Settlement Sandbox\` (Без реального клиринга)`;
      evidenceLevel = 'RUNNING';
    } else if (parsed.category === 'permission') {
      // Scenario: Policy Denial / Authority Pending
      taskStatus = 'FAILED';
      steps.push({
        id: `step-${Date.now()}-auth-check`,
        taskId,
        type: 'AUTHORIZATION_CHECK',
        actor: 'PrimeCore',
        status: 'FAILED',
        timestamp: new Date(Date.now() + 100).toISOString(),
        error: parsed.failureReason,
        outputSummary: 'FAIL-CLOSED: Действие отклонено политикой безопасности PrimeCore.',
        simulation: true,
      });

      const evFail = `ev-fail-${Date.now().toString(16)}`;
      evidenceRefs.push(evFail);
      steps.push({
        id: `step-${Date.now()}-ev-fail`,
        taskId,
        type: 'EVIDENCE_CAPTURE',
        actor: 'PrimeCore',
        status: 'COMPLETED',
        timestamp: new Date(Date.now() + 150).toISOString(),
        outputSummary: 'Сформировано свидетельство блокировки по инварианту безопасности.',
        evidenceRef: evFail,
        evidenceLevel: null,
        simulation: true,
      });

      replyContent = `### ⛔ Отказ в авторизации (Policy Denied — Fail Closed)

* **Инцидент:** ${parsed.failureReason}
* **Ядро безопасности:** PrimeCore
* **Причина:** Любая модификация критического состояния или привилегированный вызов требует явного мандата **Шуры (Shura Rule #42)**.
* **Принцип:** Никакой выбор роли в UI не создает криптографический кворум одобрения.

*Свидетельство инцидента:* \`${evFail}\` (Уровень: null / Unavailable).`;
      evidenceLevel = null;
    } else {
      // Scenario: Unsupported Prompt
      taskStatus = 'FAILED';
      steps.push({
        id: `step-${Date.now()}-unsupported`,
        taskId,
        type: 'CAPABILITY_REQUEST',
        actor: 'MetaLogos',
        status: 'FAILED',
        timestamp: new Date(Date.now() + 100).toISOString(),
        error: parsed.failureReason,
        outputSummary: 'Запрошенное намерение не поддерживается локальным orchestration engine.',
        simulation: true,
      });

      const evUnsup = `ev-unsup-${Date.now().toString(16)}`;
      evidenceRefs.push(evUnsup);
      steps.push({
        id: `step-${Date.now()}-ev-unsup`,
        taskId,
        type: 'EVIDENCE_CAPTURE',
        actor: 'Archivarius',
        status: 'COMPLETED',
        timestamp: new Date(Date.now() + 150).toISOString(),
        outputSummary: 'Фиксация неподдерживаемого запроса в графе задач.',
        evidenceRef: evUnsup,
        evidenceLevel: 'DECLARED',
        simulation: true,
      });

      replyContent = `### ⚠️ Намерение не может быть выполнено (Task Execution State Machine)

* **Идентификатор задачи:** \`${taskId}\`
* **Статус:** \`FAILED / CAPABILITY_UNAVAILABLE\`
* **Причина:** Запрос «*${input.slice(0, 100)}*» не сопоставлен с зарегистрированными контрактами 7 ядер или требует неподдерживаемый инструмент.
* **Доступные сценарии в локальной симуляции:**
  1. **Архитектурный анализ:** «*Проанализируй каноническую архитектуру Model 002*»
  2. **Сборка терминала:** «*Запусти npm run build в песочнице MetaForge*»
  3. **PoR диагностика:** «*Рассчитай гармонический резонанс PoR*»
  4. **NUR аудит:** «*Проверь экономические инварианты NUR Core*»
  5. **Тест защиты:** «*Выполни несанкционированный вывод средств (fail-closed)*»

*Фиксация отказа:* \`${evUnsup}\` (Уровень: 1 DECLARED).`;
      evidenceLevel = 'DECLARED';
    }

    // Task Finalization
    const task: AgentTask = {
      taskId,
      conversationId: context.conversationId,
      intent: input,
      status: taskStatus,
      createdAt: timestamp,
      updatedAt: new Date().toISOString(),
      requestedBy: context.activeRole,
      assignedCore: parsed.requestedCores[0] || 'metalogos',
      actor: 'MetaLogos',
      activeCores: parsed.requestedCores,
      activeTools: toolInvocations.map((t) => t.toolId),
      steps,
      currentStep: steps.length,
      simulationMode: true,
      authorityDecision: parsed.policyApproved ? 'ALLOWED' : 'DENIED',
      policyDecision: parsed.policyApproved ? 'PERMITTED' : 'BLOCKED_FAIL_CLOSED',
      evidenceRefs,
      result: replyContent,
      mode: 'SIMULATION',
      error: taskStatus === 'FAILED' ? parsed.failureReason : undefined,
      errors: taskStatus === 'FAILED' && parsed.failureReason ? [parsed.failureReason] : [],
      timestamps: {
        created: timestamp,
        started: timestamp,
        completed: taskStatus === 'COMPLETED' ? new Date().toISOString() : undefined,
        failed: taskStatus === 'FAILED' ? new Date().toISOString() : undefined,
      },
    };

    const turn: AgentTurn = {
      id: turnId,
      conversationId: context.conversationId,
      actor: 'MetaLogos',
      status: taskStatus === 'FAILED' ? 'ERROR' : 'COMPLETED',
      startedAt: timestamp,
      completedAt: new Date().toISOString(),
      steps,
    };

    const primaryEvidenceRef = evidenceRefs[evidenceRefs.length - 1];

    const message: ConversationMessage = {
      id: `msg-${Date.now()}`,
      role: 'assistant',
      content: replyContent,
      timestamp: new Date().toISOString(),
      taskId,
      activeCores: parsed.requestedCores,
      toolInvocations,
      handoffs,
      evidenceRef: primaryEvidenceRef,
      evidenceLevel,
      metadata: {
        category: parsed.category,
        taskStatus,
        policyApproved: parsed.policyApproved,
      },
    };

    return {
      message,
      turn,
      task,
    };
  }

  /**
   * Generates a structured EvidenceRecord for any created evidenceRef
   */
  public createEvidenceRecord(
    evidenceId: string,
    taskId: string,
    stepId: string,
    level: EvidenceLevel,
    source: string,
    summary: string,
    artifact: string
  ): EvidenceRecord {
    const isHigherLevel = level === 'VERIFIED' || level === 'REPRODUCED' || level === 'PROVEN';
    const isReproducedOrProven = level === 'REPRODUCED' || level === 'PROVEN';

    return {
      id: evidenceId,
      taskId,
      stepId,
      sourceType: 'LOCAL_ORCHESTRATION_SIMULATION',
      level,
      source,
      artifact,
      provenance: `MetaLogos Task Graph [${taskId}] -> Step [${stepId}]`,
      hash: `0x${Array.from(evidenceId).map((c) => c.charCodeAt(0).toString(16)).join('').slice(0, 32)}`,
      verificationMethod: 'Local deterministic hash evaluation (Simulation)',
      simulation: true,
      verificationStatus: isHigherLevel ? 'VERIFIED' : 'DECLARED',
      reproductionStatus: isReproducedOrProven ? 'REPRODUCED' : 'PENDING',
      simulationOnly: true,
      timestamp: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      summary,
      whyAssigned: `Уровень ${level ?? 'null'} присвоен на основе локальной детерминированной симуляции без внешнего криптографического аттестатора.`,
      nextLevelRequirement:
        level !== 'PROVEN'
          ? `Для перехода на следующий уровень требуется многократная независимая репродукция и подпись аттестатора.`
          : `Уровень PROVEN (L8) заблокирован до появления аппаратного TEE и внешнего консенсуса Шуры.`,
    };
  }
}
