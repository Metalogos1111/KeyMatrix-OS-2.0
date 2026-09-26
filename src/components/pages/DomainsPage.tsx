import React, { useState } from 'react';
import {
  Brain,
  Hammer,
  ShieldAlert,
  Layers,
  Archive,
  Sparkles,
  Coins,
  CheckCircle2,
  Activity,
  Zap,
  Cpu,
  ChevronRight,
} from 'lucide-react';
import { useOSStore } from '../../store/osStore';
import { SEVEN_DOMAINS } from '../../data/mockData';
import { CoreDomain } from '../../types';
import { EvidenceBadge } from '../common/EvidenceBadge';
import { TRANSLATIONS } from '../../data/translations';
import { CapabilityFabric } from '../core/CapabilityFabric';

export const DomainsPage: React.FC = () => {
  const { selectedDomain, selectDomain, language, addLog } = useOSStore();
  const t = TRANSLATIONS[language];

  const [activeDomain, setActiveDomain] = useState<CoreDomain>(
    selectedDomain || SEVEN_DOMAINS[0]
  );

  const getDomainIcon = (name: string) => {
    switch (name) {
      case 'MetaLogos':
        return Brain;
      case 'MetaForge':
        return Hammer;
      case 'PrimeCore':
        return ShieldAlert;
      case 'MindState':
        return Layers;
      case 'Archivarius':
        return Archive;
      case 'Singularity':
        return Sparkles;
      case 'NUR Core':
        return Coins;
      default:
        return Brain;
    }
  };

  const handleSelect = (domain: CoreDomain) => {
    setActiveDomain(domain);
    selectDomain(domain);
    addLog('SYSTEM', `Выбран Core Domain: [${domain.name}] (${domain.status})`, 'info');
  };

  return (
    <div id="page-domains" className="space-y-4 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#07132b]/90 via-[#0a1b3a]/70 to-[#040a17]/90 border border-cyan-800/40 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <span>CORE INTELLIGENCE RING</span>
            <span>•</span>
            <span>7 FUNDAMENTAL CAPABILITIES</span>
            <span>•</span>
            <EvidenceBadge level={5} compact />
          </div>
          <h1 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <Cpu className="w-6 h-6 text-cyan-400" />
            7 Core Intelligence Domains — Матрица доменов
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Семидоменная архитектура общего интеллекта: рассуждение, творение, безопасность, память, будущее и экономика
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-cyan-900/40 text-xs font-mono text-slate-300">
          <span>Операционных:</span>
          <strong className="text-emerald-400">6</strong>
          <span className="text-slate-600">|</span>
          <span>Песочница:</span>
          <strong className="text-amber-400">1 (NUR Core)</strong>
        </div>
      </div>

      {/* 5-Stage Capability Fabric Pipeline */}
      <CapabilityFabric />

      {/* Grid: 7 Domain Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {SEVEN_DOMAINS.map((domain) => {
          const Icon = getDomainIcon(domain.name);
          const isSelected = activeDomain.id === domain.id;
          const isSandbox = domain.status === 'SANDBOX';

          return (
            <div
              key={domain.id}
              onClick={() => handleSelect(domain)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                isSelected
                  ? 'bg-gradient-to-b from-[#0e2246] to-[#040816] shadow-[0_0_20px_rgba(0,212,255,0.25)]'
                  : 'bg-[#09152e]/70 hover:bg-[#0a1b3a]/90'
              }`}
              style={{
                borderColor: isSelected ? domain.color : 'rgba(12, 74, 110, 0.3)',
              }}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div
                    className="p-3 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-105"
                    style={{
                      backgroundColor: `${domain.color}18`,
                      borderColor: `${domain.color}40`,
                      color: domain.color,
                      boxShadow: `0 0 12px ${domain.color}25`,
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span
                      className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${
                        isSandbox
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      }`}
                    >
                      {domain.status}
                    </span>
                    <EvidenceBadge level={domain.evidenceLevel ?? 5} compact />
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white tracking-wide">
                    {domain.name}
                  </h3>
                  <span
                    className="text-xs font-mono font-semibold"
                    style={{ color: domain.color }}
                  >
                    {domain.semanticLabel}
                  </span>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {domain.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-500">Доступность: 99.9%</span>
                <span
                  className="font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  style={{ color: domain.color }}
                >
                  Инспекция <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Inspector of Active Domain */}
      <div className="rounded-2xl bg-gradient-to-b from-[#09152e]/90 to-[#040816]/95 border border-cyan-800/40 p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-cyan-900/40 pb-4">
          <div className="flex items-center gap-3">
            {(() => {
              const Icon = getDomainIcon(activeDomain.name);
              return (
                <div
                  className="p-3 rounded-2xl border"
                  style={{
                    backgroundColor: `${activeDomain.color}20`,
                    borderColor: `${activeDomain.color}50`,
                    color: activeDomain.color,
                  }}
                >
                  <Icon className="w-6 h-6" />
                </div>
              );
            })()}
            <div>
              <h2 className="text-lg font-bold text-white tracking-wide">
                {activeDomain.name} — Детализация и Контракты
              </h2>
              <span className="text-xs font-mono text-cyan-400">
                Семантика: {activeDomain.semanticLabel} • Статус: {activeDomain.status}
              </span>
            </div>
          </div>
          <EvidenceBadge level={activeDomain.evidenceLevel ?? 5} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">
              Шина данных (IPC Bus)
            </span>
            <span className="text-xs font-mono font-bold text-cyan-300">
              gRPC Microkernel / Zero-Copy TEE
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">
              Порог резонанса (PoR)
            </span>
            <span className="text-xs font-mono font-bold text-emerald-300">
              0.482 (Норма &ge; 0.450)
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">
              Этический фильтр
            </span>
            <span className="text-xs font-mono font-bold text-amber-300">
              Shura Rule #42 Active Guard
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {activeDomain.description} Домен гарантирует выполнение запросов с сохранением приватности пользователя,
          подтверждением происхождения данных через SHA-256 Merkle-деревья и прозрачным аудитом на уровне Evidence Ladder.
        </p>
      </div>
    </div>
  );
};
