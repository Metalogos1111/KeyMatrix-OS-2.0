import React from 'react';
import { CoreDescriptor } from '../../types/agentTypes';
import { X, CheckCircle2, ShieldAlert, Cpu, Sparkles, Activity } from 'lucide-react';
import { EvidenceBadge } from '../common/EvidenceBadge';

interface CoreInspectorProps {
  core: CoreDescriptor;
  onClose: () => void;
}

export const CoreInspector: React.FC<CoreInspectorProps> = ({ core, onClose }) => {
  return (
    <div className="rounded-2xl bg-[#09152e] border border-cyan-500/40 p-4 shadow-2xl space-y-4 animate-fade-in">
      <div className="flex items-center justify-between border-b border-cyan-900/40 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white tracking-wide">{core.displayName}</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {core.status}
              </span>
            </div>
            <p className="text-xs text-slate-400">{core.shortDescription}</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close Inspector"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Activity & Authority Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        <div className="p-2.5 rounded-xl bg-slate-900/70 border border-cyan-950">
          <span className="text-[10px] font-mono text-slate-500 block mb-1">ТЕКУЩАЯ АКТИВНОСТЬ:</span>
          <span className="text-slate-200 font-medium">{core.activity}</span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-900/70 border border-cyan-950">
          <span className="text-[10px] font-mono text-slate-500 block mb-1">СТАТУС ПОЛНОМОЧИЙ:</span>
          <span className="text-amber-400 font-mono font-semibold flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5" />
            NO AUTONOMOUS AUTHORITY
          </span>
        </div>
      </div>

      {/* Capabilities List */}
      <div>
        <span className="text-[10px] font-mono text-cyan-400 block mb-2 tracking-wider uppercase font-semibold">
          Заявленные возможности ядра ({core.capabilities.length}):
        </span>
        <div className="flex flex-wrap gap-1.5">
          {core.capabilities.map((cap) => (
            <span
              key={cap}
              className="text-[10px] font-mono px-2 py-1 rounded-lg bg-cyan-950/40 text-cyan-300 border border-cyan-800/40"
            >
              {cap}
            </span>
          ))}
        </div>
      </div>

      {/* Metrics */}
      {core.metrics && (
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-cyan-900/30">
          {core.metrics.map((m) => (
            <div key={m.label} className="p-2 rounded-lg bg-black/40 border border-cyan-950/60 text-center">
              <div className="text-[9px] font-mono text-slate-500">{m.label}</div>
              <div className="text-xs font-mono font-bold text-white mt-0.5">{m.value}</div>
            </div>
          ))}
        </div>
      )}

      {/* Invariants & Truth Boundary Notice */}
      <div className="p-2.5 rounded-xl bg-cyan-950/30 border border-cyan-800/30 flex items-start gap-2">
        <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <p className="text-[11px] text-slate-300 leading-relaxed">
          Ядро работает исключительно как функциональный домен внутри семантической петли MetaLogos.
          Участие ядра в задаче фиксируется в Merkle-реестре доказательств Archivarius.
        </p>
      </div>
    </div>
  );
};
