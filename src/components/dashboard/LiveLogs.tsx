import React, { useState } from 'react';
import {
  Terminal,
  CheckCircle2,
  AlertCircle,
  Info,
  RefreshCw,
  Send,
  ShieldCheck,
  Lock,
  EyeOff,
  Filter,
  Trash2,
} from 'lucide-react';
import { useOSStore } from '../../store/osStore';
import { TRANSLATIONS } from '../../data/translations';
import { LOCALIZED_LOGS_UI } from '../../data/localizedContent';
import { SystemLog } from '../../types';

type ConsoleFilterTab = 'ALL' | 'SYSTEM' | 'EXECUTION' | 'EVIDENCE' | 'NUR' | 'DEBUG';

export const LiveLogs: React.FC = () => {
  const {
    logs,
    language,
    runExecutionSimulation,
    isSimulatingExecution,
    addLog,
    setRole,
    setComposerModalOpen,
    setEvidenceModalOpen,
    openSafetyGateDetails,
    setSafetyStatusModalOpen,
  } = useOSStore();
  const t = TRANSLATIONS[language] || TRANSLATIONS.EN;
  const ll = LOCALIZED_LOGS_UI[language] || LOCALIZED_LOGS_UI.EN;

  const [activeTab, setActiveTab] = useState<ConsoleFilterTab>('ALL');
  const [commandInput, setCommandInput] = useState('');

  const getTagBadgeClass = (tag: string) => {
    switch (tag) {
      case 'PRAYER':
        return 'text-amber-400 bg-amber-950/60 border-amber-500/40';
      case 'INTENT':
        return 'text-blue-400 bg-blue-950/60 border-blue-500/40';
      case 'AI':
        return 'text-cyan-400 bg-cyan-950/60 border-cyan-500/40';
      case 'EVIDENCE':
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40';
      case 'NUR':
        return 'text-yellow-400 bg-yellow-950/60 border-yellow-500/40';
      case 'SHURA':
        return 'text-purple-400 bg-purple-950/60 border-purple-500/40';
      case 'SECURITY':
        return 'text-rose-400 bg-rose-950/60 border-rose-500/40';
      default:
        return 'text-slate-400 bg-slate-900 border-slate-700';
    }
  };

  const filteredLogs = logs.filter((log) => {
    if (activeTab === 'ALL') return true;
    if (activeTab === 'SYSTEM') return log.tag === 'SYSTEM' || log.tag === 'PRAYER';
    if (activeTab === 'EXECUTION') return log.tag === 'INTENT' || log.tag === 'AI' || log.tag === 'SHURA';
    if (activeTab === 'EVIDENCE') return log.tag === 'EVIDENCE' || log.tag === 'SECURITY';
    if (activeTab === 'NUR') return log.tag === 'NUR';
    if (activeTab === 'DEBUG') return true;
    return true;
  });

  const handleSendCommand = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cmd = commandInput.trim();
    if (!cmd) return;

    setCommandInput('');

    // Handle slash commands
    if (cmd === '/clear') {
      useOSStore.setState({ logs: [] });
      return;
    }

    if (cmd === '/test-rule-42') {
      addLog('SYSTEM', 'Запуск теста Shura Rule #42 с высокой нагрузкой (5000 людей, 600т CO2, 5000 NUR)...', 'warning');
      useOSStore.getState().setExecutionParams({
        intentText: 'Масштабная трансформация энергетического пояса Каспия',
        peopleAffected: 5000,
        co2Tons: 600,
        nurAmount: 5000,
      });
      runExecutionSimulation('Масштабная трансформация энергетического пояса Каспия');
      return;
    }

    if (cmd === '/shura') {
      setRole('Shura');
      addLog('SHURA', 'Роль переключена на "Shura". Доступ к кворуму Правила #42 разблокирован.', 'success');
      return;
    }

    if (cmd === '/composer') {
      setComposerModalOpen(true);
      return;
    }

    if (cmd === '/evidence') {
      setEvidenceModalOpen(true);
      return;
    }

    // Natural language intent
    runExecutionSimulation(cmd);
  };

  return (
    <div className="flex flex-col justify-between h-full rounded-2xl bg-gradient-to-b from-[#08132b]/95 via-[#050e21]/95 to-[#020714]/98 border border-cyan-800/40 p-3.5 shadow-[0_4px_25px_rgba(0,0,0,0.5)] backdrop-blur-md">
      {/* Header & Tabs */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cyan-900/40 pb-2 mb-2">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              RUNTIME CONSOLE (08)
            </h3>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto py-0.5">
            {(['ALL', 'SYSTEM', 'EXECUTION', 'EVIDENCE', 'NUR'] as ConsoleFilterTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                  activeTab === tab
                    ? 'bg-cyan-600 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Safety Status Indicators from Map 2 - Interactive Gates */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 mb-2.5 text-[9px] font-mono">
          <button
            onClick={() => openSafetyGateDetails('failClosed')}
            className="px-2 py-1 rounded bg-slate-950/80 hover:bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 flex items-center gap-1 truncate cursor-pointer transition-all hover:scale-[1.02] text-left"
            title="Нажмите для просмотра архитектуры Fail-Closed"
          >
            <ShieldCheck className="w-2.5 h-2.5 shrink-0 text-emerald-400" />
            <span className="truncate">Fail-Closed: ON</span>
          </button>

          <button
            onClick={() => openSafetyGateDetails('consent')}
            className="px-2 py-1 rounded bg-slate-950/80 hover:bg-cyan-950/50 border border-cyan-500/40 text-cyan-300 flex items-center gap-1 truncate cursor-pointer transition-all hover:scale-[1.02] text-left"
            title="Нажмите для просмотра политики Human Consent"
          >
            <CheckCircle2 className="w-2.5 h-2.5 shrink-0 text-cyan-400" />
            <span className="truncate">Consent: YES</span>
          </button>

          <button
            onClick={() => openSafetyGateDetails('privacy')}
            className="px-2 py-1 rounded bg-slate-950/80 hover:bg-purple-950/50 border border-purple-500/40 text-purple-300 flex items-center gap-1 truncate cursor-pointer transition-all hover:scale-[1.02] text-left"
            title="Нажмите для просмотра стандартов приватности"
          >
            <EyeOff className="w-2.5 h-2.5 shrink-0 text-purple-400" />
            <span className="truncate">Privacy: STRICT</span>
          </button>

          <button
            onClick={() => openSafetyGateDetails('failClosed')}
            className="px-2 py-1 rounded bg-slate-950/80 hover:bg-amber-950/50 border border-amber-500/40 text-amber-300 flex items-center gap-1 truncate cursor-pointer transition-all hover:scale-[1.02] text-left"
            title="Нажмите для просмотра правил блокировки"
          >
            <AlertCircle className="w-2.5 h-2.5 shrink-0 text-amber-400" />
            <span className="truncate">Unsafe: BLOCKED</span>
          </button>

          <button
            onClick={() => openSafetyGateDetails('encrypt')}
            className="px-2 py-1 rounded bg-slate-950/80 hover:bg-blue-950/50 border border-blue-500/40 text-blue-300 flex items-center gap-1 truncate col-span-2 sm:col-span-1 cursor-pointer transition-all hover:scale-[1.02] text-left"
            title="Нажмите для аудита TEE / AES-256 хранилища"
          >
            <Lock className="w-2.5 h-2.5 shrink-0 text-blue-400" />
            <span className="truncate">Encrypt: TEE/AES</span>
          </button>
        </div>
      </div>

      {/* Log Feed */}
      <div className="space-y-1 font-mono text-[11px] overflow-y-auto max-h-[140px] pr-1 custom-scrollbar my-1">
        {filteredLogs.length === 0 ? (
          <div className="text-center py-4 text-slate-500 text-xs font-mono">
            {ll.emptyLogs} [{activeTab}]
          </div>
        ) : (
          filteredLogs.map((log) => (
            <div
              key={log.id}
              className="flex items-start gap-2 py-1 px-2 rounded bg-slate-900/50 hover:bg-slate-900/90 border border-slate-800/60 transition-colors"
            >
              <span className="text-[10px] text-slate-500 shrink-0 font-medium">{log.timestamp}</span>
              <span
                className={`text-[9px] font-bold px-1.5 py-0.2 rounded border shrink-0 ${getTagBadgeClass(
                  log.tag
                )}`}
              >
                [{log.tag}]
              </span>
              <span className="text-slate-300 leading-snug flex-1 truncate">{log.message}</span>
              {log.level === 'success' && (
                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
              )}
              {log.level === 'error' && (
                <AlertCircle className="w-3 h-3 text-rose-400 shrink-0 mt-0.5" />
              )}
            </div>
          ))
        )}
      </div>

      {/* Interactive Command Prompt Line */}
      <form onSubmit={handleSendCommand} className="mt-2 pt-2 border-t border-cyan-900/40 flex items-center gap-2">
        <div className="relative flex-1">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-cyan-400 font-mono text-xs font-bold select-none">
            &gt;
          </span>
          <input
            type="text"
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            placeholder={ll.placeholder}
            className="w-full pl-6 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700/80 text-cyan-200 text-xs font-mono placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSimulatingExecution || !commandInput.trim()}
          className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono font-bold flex items-center gap-1 transition-all disabled:opacity-40"
          title={ll.sendBtn}
        >
          <Send className="w-3 h-3" />
          <span className="hidden sm:inline">{ll.sendBtn}</span>
        </button>
      </form>
    </div>
  );
};
