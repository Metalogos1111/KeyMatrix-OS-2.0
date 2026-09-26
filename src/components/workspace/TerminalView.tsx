import React, { useState, useRef, useEffect } from 'react';
import { useWorkspaceStore } from '../../store/workspaceStore';
import {
  Terminal,
  Play,
  Square,
  Trash2,
  Copy,
  Check,
  Zap,
  Activity,
  ShieldCheck,
} from 'lucide-react';

export const TerminalView: React.FC = () => {
  const {
    terminalLogs,
    executeTerminalCommand,
    cancelTerminalProcess,
    clearTerminal,
    processStatus,
    commandHistory,
  } = useWorkspaceStore();

  const [inputCmd, setInputCmd] = useState('');
  const [copied, setCopied] = useState(false);
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLogs]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCmd.trim()) return;
    const cmd = inputCmd;
    setInputCmd('');
    await executeTerminalCommand(cmd);
  };

  const handleQuickCmd = async (cmd: string) => {
    await executeTerminalCommand(cmd);
  };

  const handleCopyLogs = () => {
    navigator.clipboard.writeText(terminalLogs.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#020617] border-cyan-900/40 text-xs font-mono">
      {/* Terminal Header */}
      <div className="p-3 bg-slate-900/90 border-b border-cyan-900/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="font-bold text-white uppercase tracking-wider">
            WebContainer Terminal Stream
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-600/50 font-bold flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-cyan-400" />
            LOCAL BROWSER RUNTIME
          </span>
        </div>

        <div className="flex items-center gap-2">
          {processStatus === 'RUNNING' ? (
            <button
              onClick={cancelTerminalProcess}
              className="flex items-center gap-1 px-2 py-1 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30 transition-all font-bold animate-pulse"
            >
              <Square className="w-3 h-3 fill-rose-300" />
              Прервать процесс
            </button>
          ) : (
            <span className="text-[10px] text-slate-500 flex items-center gap-1">
              <Activity className="w-3 h-3 text-emerald-400" />
              Готов к командам
            </span>
          )}

          <button
            onClick={handleCopyLogs}
            className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white"
            title="Скопировать логи"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={clearTerminal}
            className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white"
            title="Очистить терминал"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Quick Action Command Toolbar */}
      <div className="p-2 bg-slate-950 border-b border-cyan-900/30 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[10px] text-slate-500 uppercase font-bold shrink-0">Быстрый запуск:</span>
        <button
          onClick={() => handleQuickCmd('npm run build')}
          className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 font-bold shrink-0 transition-all"
        >
          npm run build
        </button>
        <button
          onClick={() => handleQuickCmd('npm test')}
          className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 font-bold shrink-0 transition-all"
        >
          npm test
        </button>
        <button
          onClick={() => handleQuickCmd('npm run dev')}
          className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 font-bold shrink-0 transition-all"
        >
          npm run dev
        </button>
        <button
          onClick={() => handleQuickCmd('npm run lint')}
          className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 hover:bg-purple-500/30 font-bold shrink-0 transition-all"
        >
          npm run lint
        </button>
      </div>

      {/* Terminal Log Output Stream */}
      <div className="flex-1 overflow-y-auto p-3 bg-[#020617] space-y-1 font-mono text-xs text-slate-300 leading-relaxed">
        {terminalLogs.map((log, idx) => {
          // Parse basic ANSI color codes or apply styling
          const isCmd = log.includes('$ ');
          const isErr = log.includes('Exit code: 1') || log.includes('[31m') || log.includes('error TS');
          const isOk = log.includes('Exit code: 0') || log.includes('✓') || log.includes('[32m');

          return (
            <div
              key={idx}
              className={`whitespace-pre-wrap break-all ${
                isCmd
                  ? 'text-cyan-300 font-bold'
                  : isErr
                  ? 'text-rose-400'
                  : isOk
                  ? 'text-emerald-400'
                  : 'text-slate-300'
              }`}
            >
              {log.replace(/\[31m|\[32m|\[33m|\[36m|\[37m|\[0m/g, '')}
            </div>
          );
        })}
        <div ref={logsEndRef} />
      </div>

      {/* Interactive Command Input Form */}
      <form onSubmit={handleSubmit} className="p-2 bg-slate-900 border-t border-cyan-900/40 flex items-center gap-2">
        <span className="text-cyan-400 font-bold shrink-0">$</span>
        <input
          type="text"
          value={inputCmd}
          onChange={(e) => setInputCmd(e.target.value)}
          placeholder="Введите команду (например, npm run build, npm test, ls)..."
          className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder-slate-600"
        />
        <button
          type="submit"
          className="px-3 py-1 rounded bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 flex items-center gap-1 transition-all shrink-0"
        >
          <Play className="w-3 h-3 fill-slate-950" />
          Запуск
        </button>
      </form>
    </div>
  );
};
