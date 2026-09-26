import React, { useState } from 'react';
import { useAgentStore } from '../../store/agentStore';
import { Terminal, Copy, Check, Play, Trash2, X } from 'lucide-react';

export const TerminalPanel: React.FC = () => {
  const { terminalLogs, isTerminalOpen, toggleTerminal, executeTerminalCommand } = useAgentStore();
  const [inputCommand, setInputCommand] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isTerminalOpen) return null;

  const handleRun = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCommand.trim()) return;
    executeTerminalCommand(inputCommand);
    setInputCommand('');
  };

  const copyLogs = () => {
    const text = terminalLogs.map((l) => `$ ${l.command}\n${l.output}`).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="region"
      aria-label="Terminal Sandbox"
      className="rounded-2xl bg-[#040916] border border-cyan-500/40 shadow-2xl overflow-hidden flex flex-col h-[320px] transition-all"
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border-b border-cyan-900/40 text-xs select-none">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="font-mono font-bold text-white tracking-wide">
            TERMINAL SANDBOX — CONTROLLED EXECUTION
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
            LOCAL SANDBOX
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyLogs}
            className="flex items-center gap-1 text-[11px] font-mono px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Скопировано' : 'Копировать'}</span>
          </button>
          <button
            onClick={toggleTerminal}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close Terminal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Terminal Output Log */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-xs custom-scrollbar bg-black/40">
        {terminalLogs.map((log) => (
          <div key={log.id} className="space-y-1">
            <div className="flex items-center justify-between text-slate-500 text-[10px]">
              <span>
                [{new Date(log.timestamp).toLocaleTimeString()}] Requested by {log.requestedBy}
              </span>
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.2 rounded text-[9px] bg-amber-950/60 border border-amber-800/40 text-amber-300 font-bold">
                  {log.mode}
                </span>
                <span className="text-cyan-400">Exit: {log.exitCode} ({log.durationMs}ms)</span>
              </div>
            </div>
            <div className="text-cyan-300 font-bold flex items-center gap-1.5">
              <span className="text-emerald-400">$</span>
              <span>{log.command}</span>
            </div>
            <pre className="text-slate-300 bg-slate-950/60 p-2.5 rounded-lg border border-slate-900 whitespace-pre-wrap leading-relaxed text-[11px]">
              {log.output}
            </pre>
          </div>
        ))}
      </div>

      {/* Command Input Bar */}
      <form onSubmit={handleRun} className="flex items-center gap-2 p-2.5 bg-slate-950 border-t border-cyan-900/40">
        <span className="text-emerald-400 font-mono text-sm pl-2">$</span>
        <input
          type="text"
          value={inputCommand}
          onChange={(e) => setInputCommand(e.target.value)}
          placeholder="npm run build, km-verify --audit, or por-test..."
          className="flex-1 bg-transparent text-white font-mono text-xs outline-none placeholder:text-slate-600"
        />
        <button
          type="submit"
          className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-mono text-xs font-bold transition-colors flex items-center gap-1"
        >
          <Play className="w-3 h-3 fill-current" />
          <span>Выполнить</span>
        </button>
      </form>
    </div>
  );
};
