import React, { useState } from 'react';
import {
  Brain,
  Cpu,
  ShieldCheck,
  Activity,
  Database,
  Infinity as InfinityIcon,
  Coins,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Sliders
} from 'lucide-react';
import { useOSStore } from '../../store/osStore';
import { TRANSLATIONS } from '../../data/translations';
import { CoreDomain } from '../../types';

export const SevenDomains: React.FC = () => {
  const { domains, selectedDomain, selectDomain, language, setComposerModalOpen, addLog } = useOSStore();
  const t = TRANSLATIONS[language];

  const getDomainIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain':
        return Brain;
      case 'Cpu':
        return Cpu;
      case 'ShieldCheck':
        return ShieldCheck;
      case 'Activity':
        return Activity;
      case 'Database':
        return Database;
      case 'Infinity':
        return InfinityIcon;
      case 'Coins':
        return Coins;
      default:
        return Brain;
    }
  };

  return (
    <div className="w-full rounded-2xl bg-gradient-to-b from-[#08132b]/95 via-[#050e21]/95 to-[#020714]/98 border border-cyan-800/40 p-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-cyan-900/40 pb-2.5 mb-4">
        <div>
          <h2 className="text-sm font-extrabold tracking-widest text-white uppercase font-['Plus_Jakarta_Sans'] flex items-center gap-2">
            <span>{t.domainsTitle}</span>
            <span className="text-[10px] font-mono font-normal px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-700/50">
              7 CORES
            </span>
          </h2>
          <p className="text-[10px] font-mono tracking-widest text-slate-400 mt-0.5">
            {t.domainsSub}
          </p>
        </div>

        <button
          onClick={() => setComposerModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/80 text-cyan-300 border border-cyan-700/50 text-xs font-mono transition-colors"
        >
          <Sliders className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Composer (07)</span>
        </button>
      </div>

      {/* 7 Interactive Nodes Row / Ring */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {domains.map((domain) => {
          const Icon = getDomainIcon(domain.icon);
          const isOperational = domain.status === 'OPERATIONAL';
          const isSelected = selectedDomain?.id === domain.id;

          return (
            <button
              key={domain.id}
              onClick={() => {
                selectDomain(domain);
                addLog('AI', `Инспекция семантического узла [${domain.name}] (${domain.category})`, 'info');
              }}
              className={`group relative flex flex-col items-center justify-between p-3 rounded-2xl border transition-all duration-300 text-center select-none ${
                isSelected
                  ? 'bg-slate-900/90 border-white shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-[1.03]'
                  : 'bg-gradient-to-b from-[#0a152e]/70 to-[#040a17]/80 hover:bg-slate-900/90 border-cyan-900/40 hover:border-cyan-500/60 hover:scale-[1.02]'
              }`}
            >
              {/* Outer Glowing Circle Icon */}
              <div
                className="relative w-14 h-14 rounded-full flex items-center justify-center mb-2 border-2 transition-transform group-hover:rotate-6 duration-300"
                style={{
                  borderColor: domain.color,
                  backgroundColor: `${domain.color}15`,
                  boxShadow: `0 0 16px ${domain.color}40`,
                }}
              >
                <Icon className="w-6 h-6 transition-transform group-hover:scale-110" style={{ color: domain.color }} />

                {/* Status Indicator Dot */}
                <span
                  className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-950"
                  style={{
                    backgroundColor: isOperational ? '#00FF88' : '#FFD700',
                    boxShadow: isOperational ? '0 0 6px #00FF88' : '0 0 6px #FFD700',
                  }}
                />
              </div>

              {/* Title & Category */}
              <div className="w-full">
                <div className="text-xs font-bold text-white tracking-wide truncate group-hover:text-cyan-200">
                  {domain.name}
                </div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">
                  ({t.cores[domain.category.toLowerCase() as keyof typeof t.cores] || domain.category})
                </div>
              </div>

              {/* Status Badge */}
              <div className="mt-2 w-full">
                <span
                  className={`inline-flex items-center gap-1 font-mono text-[9px] uppercase px-2 py-0.5 rounded-full border w-full justify-center ${
                    isOperational
                      ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                      : 'bg-amber-950/60 text-amber-300 border-amber-500/40'
                  }`}
                >
                  <span
                    className={`w-1 h-1 rounded-full ${
                      isOperational ? 'bg-emerald-400' : 'bg-amber-400'
                    }`}
                  />
                  <span>{domain.status}</span>
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Semantic Labeling Details Drawer / Popover (Image 3 block 02) */}
      {selectedDomain && (
        <div className="mt-4 p-4 rounded-xl bg-slate-950/90 border border-cyan-700/50 shadow-2xl relative animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center justify-between border-b border-cyan-900/40 pb-2 mb-3">
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center border"
                style={{
                  borderColor: selectedDomain.color,
                  backgroundColor: `${selectedDomain.color}20`,
                }}
              >
                {React.createElement(getDomainIcon(selectedDomain.icon), {
                  className: 'w-4 h-4',
                  style: { color: selectedDomain.color },
                })}
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase font-mono flex items-center gap-2">
                  <span>02 NODE SEMANTIC LABELING: {selectedDomain.name}</span>
                  <span
                    className="text-[9px] px-2 py-0.5 rounded border"
                    style={{
                      borderColor: selectedDomain.color,
                      color: selectedDomain.color,
                    }}
                  >
                    {selectedDomain.status}
                  </span>
                </h4>
                <p className="text-[10px] text-slate-400">{selectedDomain.tagline}</p>
              </div>
            </div>

            <button
              onClick={() => selectDomain(null)}
              className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-slate-900 hover:bg-slate-800"
            >
              ✕ Закрыть
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
            {/* Column 1: IO & Dependencies */}
            <div className="p-3 rounded-lg bg-[#081022] border border-cyan-900/30 space-y-2">
              <div>
                <span className="text-[10px] text-cyan-400 uppercase tracking-wider block">Inputs:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedDomain.inputs.map((inp) => (
                    <span key={inp} className="px-1.5 py-0.5 rounded bg-cyan-950/60 text-cyan-200 border border-cyan-800/40 text-[10px]">
                      {inp}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] text-emerald-400 uppercase tracking-wider block">Outputs:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedDomain.outputs.map((out) => (
                    <span key={out} className="px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-200 border border-emerald-800/40 text-[10px]">
                      {out}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Dependencies:</span>
                <span className="text-slate-300 text-[11px]">
                  {selectedDomain.dependencies.length > 0 ? selectedDomain.dependencies.join(', ') : 'None (Autonomous Core)'}
                </span>
              </div>
            </div>

            {/* Column 2: Governance & Scopes */}
            <div className="p-3 rounded-lg bg-[#081022] border border-cyan-900/30 space-y-2">
              <div>
                <span className="text-[10px] text-amber-400 uppercase tracking-wider block">Authority Scope:</span>
                <span className="text-slate-200 text-[11px] block">{selectedDomain.authorityScope}</span>
              </div>

              <div>
                <span className="text-[10px] text-purple-400 uppercase tracking-wider block">Evidence Scope:</span>
                <span className="text-slate-200 text-[11px] block">{selectedDomain.evidenceScope}</span>
              </div>

              <div>
                <span className="text-[10px] text-blue-400 uppercase tracking-wider block">Runtime Scope:</span>
                <span className="text-slate-200 text-[11px] block">{selectedDomain.runtimeScope}</span>
              </div>
            </div>

            {/* Column 3: Live Telemetry */}
            <div className="p-3 rounded-lg bg-[#081022] border border-cyan-900/30 space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-cyan-300 uppercase tracking-wider block mb-1">Live Metrics:</span>
                <div className="space-y-1">
                  {selectedDomain.metrics.map((m) => (
                    <div key={m.label} className="flex justify-between text-[11px]">
                      <span className="text-slate-400">{m.label}:</span>
                      <span className="text-white font-bold">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[10px] text-slate-400">Load: {selectedDomain.activeLoad}%</span>
                <button
                  onClick={() => setComposerModalOpen(true)}
                  className="px-2 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white text-[10px] font-bold transition-colors"
                >
                  В Composer →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
