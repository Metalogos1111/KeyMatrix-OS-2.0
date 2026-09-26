import React, { useState } from 'react';
import {
  Layers,
  ShieldCheck,
  Lock,
  Flame,
  Globe,
  Server,
  FolderKanban,
  UserCheck,
  Zap,
  CheckCircle2,
  AlertOctagon,
  Sparkles,
} from 'lucide-react';
import { EvidenceBadge } from '../common/EvidenceBadge';

interface PolicyTier {
  id: string;
  level: number;
  name: string;
  subtitle: string;
  scope: 'IMMUTABLE' | 'PROTOCOL_LOCKED' | 'GOVERNED' | 'USER_OPT_IN' | 'ADAPTIVE';
  icon: React.ElementType;
  colorClass: string;
  bgGradient: string;
  description: string;
  rules: { code: string; name: string; enforcedBy: string; isImmutable: boolean }[];
}

const POLICY_TIERS: PolicyTier[] = [
  {
    id: 't1',
    level: 1,
    name: 'GLOBAL LAWS',
    subtitle: 'Immutable Principles & Axioms',
    scope: 'IMMUTABLE',
    icon: Globe,
    colorClass: 'text-amber-300 border-amber-500/50',
    bgGradient: 'from-amber-950/70 to-yellow-950/40',
    description: 'Абсолютные неизменяемые аксиомы системы: Единобожие (Tawhid), запрет ссудного процента (Zero Riba), неприкосновенность человеческого достоинства и когнитивного суверенитета.',
    rules: [
      { code: 'LAW-001', name: 'Zero-Riba & No-Gharar Invariant', enforcedBy: 'TawhidCore Kernel', isImmutable: true },
      { code: 'LAW-002', name: 'Identity ≠ Authority Axiom', enforcedBy: 'Ed25519 Cryptographic Layer', isImmutable: true },
      { code: 'LAW-003', name: 'Human Biological Sovereignty', enforcedBy: 'Cognitive Shield', isImmutable: true },
    ],
  },
  {
    id: 't2',
    level: 2,
    name: 'SYSTEM POLICIES',
    subtitle: 'Protocol & Consensus Rules',
    scope: 'PROTOCOL_LOCKED',
    icon: Server,
    colorClass: 'text-cyan-300 border-cyan-500/50',
    bgGradient: 'from-cyan-950/70 to-blue-950/40',
    description: 'Системные правила протокола KeyMatrix: Требование доказательств (Evidence Ladder L3+), BFT консенсус, Shura Rule #42 и алгоритмы разрешения конфликтов.',
    rules: [
      { code: 'SYS-042', name: 'Shura Rule #42: Verification Gate', enforcedBy: 'MetaLogos Engine', isImmutable: false },
      { code: 'SYS-010', name: 'Super-Majority 75% Consensus', enforcedBy: 'Nur Council PoR Mesh', isImmutable: false },
      { code: 'SYS-008', name: 'Evidence Ladder ≥ L3 for Treasury', enforcedBy: 'Archivarius ZK-Ledger', isImmutable: true },
    ],
  },
  {
    id: 't3',
    level: 3,
    name: 'DOMAIN POLICIES',
    subtitle: 'Project & Sector-Specific Rules',
    scope: 'GOVERNED',
    icon: FolderKanban,
    colorClass: 'text-emerald-300 border-emerald-500/50',
    bgGradient: 'from-emerald-950/70 to-teal-950/40',
    description: 'Отраслевые правила и регламенты доменов (M00-M16): Экологический мониторинг Каспия, исламские вакф-сертификаты, образовательные стандарты Ихсан.',
    rules: [
      { code: 'DOM-CASP', name: 'Caspian Sturgeon Biometric Telemetry', enforcedBy: 'Eco-Oracle Station Baku', isImmutable: false },
      { code: 'DOM-WAQF', name: 'Decentralized Zakat 8-Category Filter', enforcedBy: 'Waqf Guild Smart Contract', isImmutable: false },
      { code: 'DOM-EDU', name: 'Virtue-Oriented Learning Curriculum', enforcedBy: 'Mentor Circle', isImmutable: false },
    ],
  },
  {
    id: 't4',
    level: 4,
    name: 'USER POLICIES',
    subtitle: 'Preferences, Consent & Family Rules',
    scope: 'USER_OPT_IN',
    icon: UserCheck,
    colorClass: 'text-purple-300 border-purple-500/50',
    bgGradient: 'from-purple-950/70 to-indigo-950/40',
    description: 'Персональные настройки приватности и семейного опекунства: Дневной лимит Safe Balance для детей, правила нулевого разглашения (ZK), контекст локации.',
    rules: [
      { code: 'USR-KID', name: 'Child Safe Balance & Content Filter', enforcedBy: 'Guardian Wilayah Enclave', isImmutable: false },
      { code: 'USR-PRIV', name: 'ZK-SNARK Selective Disclosure', enforcedBy: 'MindState Core', isImmutable: false },
      { code: 'USR-CONS', name: 'Explicit Consent for AI Processing', enforcedBy: 'User DID Token', isImmutable: false },
    ],
  },
  {
    id: 't5',
    level: 5,
    name: 'REAL-TIME POLICIES',
    subtitle: 'Adaptive Runtime & Edge Defenses',
    scope: 'ADAPTIVE',
    icon: Zap,
    colorClass: 'text-rose-300 border-rose-500/50',
    bgGradient: 'from-rose-950/70 to-red-950/40',
    description: 'Динамические адаптивные политики реального времени: Изоляция аномалий, защита от DDoS, динамические лимиты пропускной способности и аварийная отсечка.',
    rules: [
      { code: 'RT-ANOM', name: 'Byzantine Attack Auto-Quarantine', enforcedBy: 'PrimeCore Sentinel TEE', isImmutable: false },
      { code: 'RT-RATE', name: 'Adaptive Rate Limiting & Gas Cap', enforcedBy: 'Edge Proxy Mesh', isImmutable: false },
      { code: 'RT-OFFL', name: 'Offline Mesh Sync Conflict Arbiter', enforcedBy: 'Local IndexedDB Engine', isImmutable: false },
    ],
  },
];

export const PolicyEngine: React.FC = () => {
  const [selectedTierId, setSelectedTierId] = useState<string>('t1');
  const activeTier = POLICY_TIERS.find((t) => t.id === selectedTierId) || POLICY_TIERS[0];
  const Icon = activeTier.icon;

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header Info */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0b1736]/90 via-[#071026]/85 to-[#040816]/95 border border-cyan-800/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <span>M10 POLICY ENGINE ARCHITECTURE</span>
            <span>•</span>
            <span>5-TIER GOVERNANCE PYRAMID</span>
            <span>•</span>
            <EvidenceBadge level={5} compact />
          </div>
          <h2 className="text-base font-bold text-white tracking-wide flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            Пирамида Политик и Инвариантов (Policy Engine Architecture)
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Иерархическая структура от глобальных неизменяемых законов до адаптивных политик реального времени
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300">
            Активных правил: <strong className="text-cyan-400 font-bold">15</strong>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Pyramid Representation (Left Column 5 cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-gradient-to-b from-[#09152e]/80 to-[#040816]/90 border border-cyan-900/40 shadow-xl flex flex-col justify-between space-y-3">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">
            Иерархическая Пирамида Политик
          </span>

          {/* Stepped Visual Pyramid Stack */}
          <div className="flex flex-col items-center gap-2 py-2">
            {POLICY_TIERS.map((tier, idx) => {
              const isSelected = tier.id === selectedTierId;
              const TierIcon = tier.icon;
              // Width decreases as level goes to 1 (top)
              const widthClasses = [
                'w-[45%]', // Level 1 (Top)
                'w-[60%]', // Level 2
                'w-[75%]', // Level 3
                'w-[88%]', // Level 4
                'w-[100%]', // Level 5 (Base)
              ];

              return (
                <button
                  key={tier.id}
                  onClick={() => setSelectedTierId(tier.id)}
                  className={`${widthClasses[idx]} p-3 rounded-xl border transition-all text-center flex items-center justify-between ${
                    isSelected
                      ? `bg-gradient-to-r ${tier.bgGradient} ${tier.colorClass} ring-2 ring-cyan-400/50 shadow-[0_0_15px_rgba(0,212,255,0.25)]`
                      : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <TierIcon className="w-4 h-4 shrink-0" />
                  <div className="truncate px-1">
                    <span className="text-xs font-bold block truncate">{tier.name}</span>
                    <span className="text-[9px] font-mono opacity-80 block truncate">
                      L{tier.level} • {tier.scope}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold">
                    {tier.rules.length}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="text-[10px] font-mono text-slate-500 text-center">
            Правило каскада: Ни одна политика нижнего уровня не может переопределить законы верхнего уровня.
          </p>
        </div>

        {/* Selected Tier Inspector (Right Column 7 cols) */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-gradient-to-b from-[#09152e]/80 to-[#040816]/90 border border-cyan-900/40 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-cyan-900/40 pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
                <Icon className="w-5 h-5 text-cyan-300" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide">
                  Уровень {activeTier.level}: {activeTier.name}
                </h3>
                <span className="text-xs text-slate-400 font-mono">{activeTier.subtitle}</span>
              </div>
            </div>

            <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-amber-300 font-bold">
              {activeTier.scope}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-900">
            {activeTier.description}
          </p>

          <div className="space-y-2">
            <span className="text-xs font-mono text-cyan-400 uppercase font-bold block">
              Действующие правила и валидаторы ({activeTier.rules.length}):
            </span>

            <div className="space-y-2">
              {activeTier.rules.map((r, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 font-bold">
                        {r.code}
                      </span>
                      <strong className="text-xs text-white">{r.name}</strong>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 block">
                      Орган исполнения: {r.enforcedBy}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {r.isImmutable ? (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                        <Lock className="w-3 h-3" /> IMMUTABLE
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> GOVERNED
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
