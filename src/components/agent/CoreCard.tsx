import React from 'react';
import { CoreDescriptor } from '../../types/agentTypes';
import { Brain, Cpu, ShieldCheck, Activity, Database, Infinity as InfinityIcon, Coins } from 'lucide-react';
import { EvidenceBadge } from '../common/EvidenceBadge';

interface CoreCardProps {
  core: CoreDescriptor;
  isSelected: boolean;
  onSelect: () => void;
}

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  metalogos: Brain,
  metaforge: Cpu,
  primecore: ShieldCheck,
  mindstate: Activity,
  archivarius: Database,
  singularity: InfinityIcon,
  nurcore: Coins,
};

export const CoreCard: React.FC<CoreCardProps> = ({ core, isSelected, onSelect }) => {
  const Icon = ICONS[core.coreId] || Brain;
  const isExecuting = core.status === 'EXECUTING';

  return (
    <button
      onClick={onSelect}
      className={`w-full text-left p-3 rounded-xl border transition-all duration-200 flex flex-col justify-between relative overflow-hidden ${
        isSelected
          ? 'bg-cyan-950/60 border-cyan-400 shadow-[0_0_15px_rgba(0,212,255,0.25)]'
          : isExecuting
          ? 'bg-blue-950/40 border-cyan-500/60 animate-pulse'
          : 'bg-[#081226]/80 hover:bg-[#0c1a36] border-cyan-900/40 text-slate-300'
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-2">
            <div
              className={`p-1.5 rounded-lg ${
                isSelected
                  ? 'bg-cyan-500 text-black'
                  : 'bg-slate-900/90 text-cyan-400 border border-cyan-500/20'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-white tracking-wide">{core.displayName}</span>
          </div>

          <span
            className={`text-[9px] font-mono px-1.5 py-0.5 rounded border uppercase font-semibold ${
              core.status === 'EXECUTING'
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 animate-pulse'
                : core.status === 'AVAILABLE'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : core.status === 'SANDBOX'
                ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                : core.status === 'HOLD'
                ? 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
            title={core.status === 'AVAILABLE' ? 'Locally Available in Simulation' : core.status}
          >
            {core.status === 'AVAILABLE' ? 'SIM-READY' : core.status}
          </span>
        </div>

        <p className="text-[11px] text-slate-400 line-clamp-1 mb-2">{core.shortDescription}</p>
      </div>

      <div className="pt-2 border-t border-cyan-900/30 flex items-center justify-between text-[10px]">
        <div className="flex items-center gap-1">
          <span className="text-slate-500">Capabilities:</span>
          <span className="font-mono text-cyan-300 font-semibold">{core.capabilities.length}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <EvidenceBadge level={core.evidenceState.level} compact />
        </div>
      </div>
    </button>
  );
};
