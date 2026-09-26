import React, { useState, useRef, useEffect } from 'react';
import { useAgentStore } from '../../store/agentStore';
import { useOSStore } from '../../store/osStore';
import { CoreCard } from './CoreCard';
import { CoreInspector } from './CoreInspector';
import { ToolCard } from './ToolCard';
import { TerminalPanel } from './TerminalPanel';
import { EvidenceDrawer } from './EvidenceDrawer';
import { PermissionModal } from './PermissionModal';
import { ChatToolPalette } from './ChatToolPalette';
import { ToolInvocationPreviewModal } from './ToolInvocationPreviewModal';
import { ToolDescriptor } from '../../types/agentTypes';
import {
  Send,
  Sparkles,
  Terminal,
  Database,
  Play,
  RotateCcw,
  ShieldAlert,
  Bot,
  User,
  Cpu,
  Layers,
  Search,
  ExternalLink,
  ChevronRight,
  Plus,
  X,
  AlertTriangle,
  FolderLock,
  Calculator,
  Globe2,
  Activity,
} from 'lucide-react';
import { EvidenceBadge } from '../common/EvidenceBadge';

const TOOL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'tool-web-search': Search,
  'tool-files': FolderLock,
  'tool-terminal': Terminal,
  'tool-compute': Calculator,
  'tool-api': Globe2,
  'tool-por-sandbox': Activity,
};

export const AgentInteractionWorkspace: React.FC = () => {
  const { role, language } = useOSStore();
  const {
    messages,
    isThinking,
    sendMessage,
    resetConversation,
    cores,
    selectedCoreId,
    setSelectedCoreId,
    tools,
    selectedToolId,
    setSelectedToolId,
    selectedToolIds,
    toggleChatTool,
    clearChatTools,
    activitySteps,
    isActivityPanelOpen,
    toggleActivityPanel,
    isTerminalOpen,
    toggleTerminal,
    isEvidenceDrawerOpen,
    toggleEvidenceDrawer,
    runDemoScenario,
  } = useAgentStore();

  const [inputText, setInputText] = useState('');
  const [isToolPaletteOpen, setIsToolPaletteOpen] = useState(false);
  const [pendingConfirmationTool, setPendingConfirmationTool] = useState<ToolDescriptor | null>(null);
  const [pendingText, setPendingText] = useState<string>('');
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const paletteContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  // Click outside to close palette
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isToolPaletteOpen &&
        paletteContainerRef.current &&
        !paletteContainerRef.current.contains(e.target as Node)
      ) {
        setIsToolPaletteOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isToolPaletteOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isThinking) return;

    // Check if terminal tool is invoked (high-risk check for confirmation modal)
    const hasTerminal =
      selectedToolIds.includes('tool-terminal') ||
      inputText.toLowerCase().includes('terminal') ||
      inputText.toLowerCase().includes('терминал') ||
      inputText.startsWith('/terminal');

    if (hasTerminal && !pendingConfirmationTool) {
      const termTool = tools.find((t) => t.toolId === 'tool-terminal');
      if (termTool) {
        setPendingConfirmationTool(termTool);
        setPendingText(inputText);
        return;
      }
    }

    sendMessage(inputText, role, language);
    setInputText('');
  };

  const handleConfirmOnce = () => {
    if (pendingText) {
      sendMessage(pendingText, role, language);
      setInputText('');
    }
    setPendingConfirmationTool(null);
    setPendingText('');
  };

  const handleConfirmForTask = () => {
    if (pendingText) {
      sendMessage(pendingText, role, language);
      setInputText('');
    }
    setPendingConfirmationTool(null);
    setPendingText('');
  };

  const handleDenyConfirmation = () => {
    setPendingConfirmationTool(null);
    setPendingText('');
    // Trigger explicit policy blocked message
    sendMessage('Запрос отменен пользователем (Fail-Closed User Denial)', role, language);
    setInputText('');
  };

  const selectedCore = cores.find((c) => c.coreId === selectedCoreId);

  return (
    <div id="agent-interaction-workspace" className="space-y-4 animate-fade-in">
      {/* Top Banner with Demo Controls */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#07132b]/95 via-[#0b1b3b]/85 to-[#040a18]/95 border border-cyan-800/40 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <span>KEYMATRIX OS v2.1</span>
            <span>•</span>
            <span className="font-bold">METALOGOS RUNTIME WORKSPACE</span>
            <span>•</span>
            <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px]">
              SIMULATION GATE PASS
            </span>
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px]">
              LOCAL ROLE SIMULATION ({role})
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 text-[10px]">
              AUTHORITY PENDING (ADR-001)
            </span>
          </div>
          <h2 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
            <Bot className="w-5 h-5 text-cyan-400" />
            MetaLogos + 7 Core Intelligence Fabric
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Двунаправленное взаимодействие человека и ИИ-агента с декомпозицией задач, песочницей инструментов и 8-уровневой канонической лестницей доказательств.
          </p>
        </div>

        {/* Demo Scenario Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
          <span className="text-slate-500 text-[11px] mr-1 hidden sm:inline">Демо-сценарии:</span>
          <button
            onClick={() => runDemoScenario('collaboration')}
            className="px-2.5 py-1.5 rounded-lg bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-800/60 text-cyan-300 transition-colors"
            title="Сценарий A: Архитектурный анализ Model 002"
          >
            Архитектура
          </button>
          <button
            onClick={() => runDemoScenario('terminal')}
            className="px-2.5 py-1.5 rounded-lg bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-800/60 text-cyan-300 transition-colors"
            title="Сценарий B: Синтез и сборка в песочнице MetaForge"
          >
            Терминал build
          </button>
          <button
            onClick={() => runDemoScenario('por')}
            className="px-2.5 py-1.5 rounded-lg bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-800/60 text-cyan-300 transition-colors"
            title="Сценарий D: Диагностический расчет PoR (Finality NULL)"
          >
            PoR гармоника
          </button>
          <button
            onClick={() => runDemoScenario('nur')}
            className="px-2.5 py-1.5 rounded-lg bg-amber-950/60 hover:bg-amber-900 border border-amber-800/60 text-amber-300 transition-colors"
            title="Сценарий E: Аудит экономических инвариантов NUR Core (Non-Settlement)"
          >
            NUR песочница
          </button>
          <button
            onClick={() => runDemoScenario('permission')}
            className="px-2.5 py-1.5 rounded-lg bg-purple-950/60 hover:bg-purple-900 border border-purple-800/60 text-purple-300 transition-colors"
            title="Интерактивный запрос разрешения на выполнение инструмента"
          >
            Запрос прав
          </button>
          <button
            onClick={() => runDemoScenario('failure')}
            className="px-2.5 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 border border-red-800/60 text-red-300 transition-colors"
            title="Тест защиты Fail-Closed при несанкционированном вызове"
          >
            Fail-Closed
          </button>
          <button
            onClick={resetConversation}
            className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors ml-1"
            title="Сбросить сессию"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 7 Cores Overview Bar */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" />
            7 Вычислительных Ядер (Capability Domains):
          </span>
          <span className="text-[11px] font-mono text-slate-500">
            Кликните на ядро для инспекции полномочий
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {cores.map((core) => (
            <CoreCard
              key={core.coreId}
              core={core}
              isSelected={selectedCoreId === core.coreId}
              onSelect={() => setSelectedCoreId(selectedCoreId === core.coreId ? null : core.coreId)}
            />
          ))}
        </div>
      </div>

      {/* Core Inspector Drawer if selected */}
      {selectedCore && (
        <CoreInspector core={selectedCore} onClose={() => setSelectedCoreId(null)} />
      )}

      {/* Main Split: Left Chat Conversation, Right Activity & Tool Gateway */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Chat Conversation */}
        <div className="lg:col-span-7 flex flex-col h-[580px] rounded-2xl bg-[#060e22]/90 border border-cyan-900/40 shadow-xl overflow-hidden">
          {/* Chat Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-slate-950 via-[#071329] to-slate-950 border-b border-cyan-900/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-white font-mono">
                METALOGOS INTERACTIVE CHANNEL
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleTerminal}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono transition-colors border ${
                  isTerminalOpen
                    ? 'bg-cyan-500 text-black border-cyan-400 font-bold'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                <Terminal className="w-3 h-3" />
                <span>Терминал</span>
              </button>

              <button
                onClick={() => toggleEvidenceDrawer()}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono transition-colors border ${
                  isEvidenceDrawerOpen
                    ? 'bg-cyan-500 text-black border-cyan-400 font-bold'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                <Database className="w-3 h-3" />
                <span>Доказательства</span>
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-black/20">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 text-xs leading-relaxed ${
                    isUser ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {!isUser && (
                    <div className="w-7 h-7 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 space-y-2.5 ${
                      isUser
                        ? 'bg-blue-600 text-white shadow-lg rounded-tr-none'
                        : 'bg-[#09152f] text-slate-200 border border-cyan-900/40 shadow-xl rounded-tl-none'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-1.5 text-[10px] font-mono">
                      <span className="font-bold tracking-wider">
                        {isUser ? 'HUMAN INTENT' : 'METALOGOS ENGINE'}
                      </span>
                      <span className="opacity-60">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                    </div>

                    <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>

                    {/* Tool Invocation Badges if any */}
                    {msg.toolInvocations && msg.toolInvocations.length > 0 && (
                      <div className="pt-2 border-t border-cyan-900/40 space-y-1.5">
                        <span className="text-[10px] font-mono text-cyan-400 uppercase font-semibold block">
                          Вызовы инструментов:
                        </span>
                        {msg.toolInvocations.map((t, idx) => (
                          <div
                            key={idx}
                            className="p-2 rounded-lg bg-black/40 border border-cyan-950 flex flex-col gap-1 text-[11px] font-mono"
                          >
                            <div className="flex items-center justify-between text-cyan-300">
                              <span className="font-bold">{t.toolName}</span>
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                                {t.status}
                              </span>
                            </div>
                            <div className="text-slate-400 break-all">{t.input}</div>
                            {t.output && <div className="text-emerald-400 text-[10px]">{t.output}</div>}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Evidence Reference Tag if captured */}
                    {msg.evidenceRef && (
                      <div className="pt-2 border-t border-cyan-900/40 flex items-center justify-between text-[10px] font-mono">
                        <span className="text-slate-400">Доказательство зафиксировано:</span>
                        <button
                          onClick={() => toggleEvidenceDrawer(msg.evidenceRef)}
                          className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
                        >
                          <span>{msg.evidenceRef.slice(0, 14)}...</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>

                  {isUser && (
                    <div className="w-7 h-7 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-300 shrink-0 mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {isThinking && (
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono p-3 rounded-xl bg-cyan-950/30 border border-cyan-900/40 w-fit animate-pulse">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>MetaLogos декомпозирует намерение и опрашивает ядра...</span>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Selected Tool Chips Bar (above input) */}
          {selectedToolIds.length > 0 && (
            <div className="px-3 py-2 bg-[#040b1d] border-t border-cyan-900/30 flex items-center justify-between gap-2 overflow-x-auto">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wide mr-1">
                  Подключено:
                </span>
                {selectedToolIds.map((tId) => {
                  const tDesc = tools.find((t) => t.toolId === tId);
                  const Icon = TOOL_ICONS[tId] || Sparkles;
                  return (
                    <div
                      key={tId}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-[11px] font-mono shadow-sm"
                    >
                      <Icon className="w-3 h-3 text-cyan-400" />
                      <span>{tDesc?.name || tId}</span>
                      <button
                        type="button"
                        onClick={() => toggleChatTool(tId)}
                        className="ml-1 text-slate-400 hover:text-white"
                        aria-label={`Удалить ${tDesc?.name || tId}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={clearChatTools}
                className="text-[10px] font-mono text-slate-400 hover:text-rose-400 shrink-0 underline decoration-dotted"
              >
                Очистить
              </button>
            </div>
          )}

          {/* Chat Input Bar */}
          <form
            onSubmit={handleSend}
            className="p-3 bg-slate-950 border-t border-cyan-900/40 flex items-center gap-2 relative"
          >
            {/* Tool Palette Trigger & Popover Container */}
            <div ref={paletteContainerRef} className="relative">
              <button
                type="button"
                onClick={() => setIsToolPaletteOpen(!isToolPaletteOpen)}
                aria-label="Открыть палитру инструментов чата"
                className={`px-2.5 py-2.5 rounded-xl border text-xs font-mono font-semibold flex items-center gap-1.5 transition-all shadow-md ${
                  isToolPaletteOpen || selectedToolIds.length > 0
                    ? 'bg-cyan-500 text-black border-cyan-400 shadow-[0_0_12px_rgba(0,212,255,0.3)]'
                    : 'bg-[#09152f] text-cyan-400 border-cyan-800/60 hover:bg-[#0e2046]'
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Инструменты</span>
                {selectedToolIds.length > 0 && (
                  <span className="w-4 h-4 rounded-full bg-black text-cyan-400 text-[10px] flex items-center justify-center font-bold">
                    {selectedToolIds.length}
                  </span>
                )}
              </button>

              {/* Chat Tool Palette Popover */}
              {isToolPaletteOpen && (
                <ChatToolPalette
                  tools={tools}
                  selectedToolIds={selectedToolIds}
                  onToggleTool={(toolId) => toggleChatTool(toolId)}
                  onClose={() => setIsToolPaletteOpen(false)}
                />
              )}
            </div>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Введите запрос, слэш-команду (/search, /files, /terminal, /compute) или задачу..."
              className="flex-1 bg-[#09152f] border border-cyan-900/40 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 outline-none focus:border-cyan-400 transition-colors"
            />
            <button
              type="submit"
              disabled={isThinking || !inputText.trim()}
              className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-lg"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Отправить</span>
            </button>
          </form>
        </div>

        {/* Right Column: Execution Activity & Tool Gateway */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Tool Gateway Registry */}
          <div className="p-4 rounded-2xl bg-[#060e22]/90 border border-cyan-900/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-cyan-900/30 pb-2">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                Шлюз инструментов (Tool Gateway)
              </span>
              <span className="text-[10px] font-mono text-cyan-300">6 Инструментов</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {tools.map((tool) => (
                <ToolCard
                  key={tool.toolId}
                  tool={tool}
                  onSelect={() => setSelectedToolId(tool.toolId)}
                />
              ))}
            </div>
          </div>

          {/* Activity Trace / Steps Timeline */}
          <div className="flex-1 p-4 rounded-2xl bg-[#060e22]/90 border border-cyan-900/40 shadow-xl space-y-3 flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between border-b border-cyan-900/30 pb-2">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Хроника шагов (Agent Activity Trace)
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">
                {activitySteps.length} Зафиксировано
              </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar max-h-[220px]">
              {activitySteps.map((step) => (
                <div
                  key={step.id}
                  className="p-2.5 rounded-xl bg-slate-900/70 border border-cyan-950 text-xs flex items-start justify-between gap-2"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-cyan-400 text-[10px]">{step.actor}</span>
                      <span className="text-slate-600 text-[10px]">•</span>
                      <span className="text-[10px] font-mono text-slate-400">{step.type}</span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      {typeof step.input === 'string'
                        ? step.input
                        : typeof step.output === 'string'
                        ? step.output
                        : 'Шаг выполнен успешно'}
                    </p>
                  </div>

                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                    {step.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Terminal Panel if toggled */}
      <TerminalPanel />

      {/* Floating Evidence Drawer */}
      <EvidenceDrawer />

      {/* Permission Request Modal */}
      <PermissionModal />

      {/* Tool Invocation Confirmation Modal for High-Risk Tools */}
      {pendingConfirmationTool && (
        <ToolInvocationPreviewModal
          tool={pendingConfirmationTool}
          taskId={`task-${Date.now().toString(36)}`}
          onAllowOnce={handleConfirmOnce}
          onAllowForTask={handleConfirmForTask}
          onDeny={handleDenyConfirmation}
        />
      )}
    </div>
  );
};
