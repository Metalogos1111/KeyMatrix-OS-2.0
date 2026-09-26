import React from 'react';
import {
  ShieldCheck,
  Award,
  Lock,
  FileCheck2,
  Users,
  Bot,
  Scale,
  Sparkles,
  CheckCircle2,
  KeyRound,
  Eye,
  Shield,
  Fingerprint,
} from 'lucide-react';
import { EvidenceBadge } from '../common/EvidenceBadge';

export const GovernanceMetricsPanel: React.FC = () => {
  const metrics = [
    { label: 'Trust Score', value: '98.7%', desc: 'Индекс доверия сообщества', color: 'text-emerald-400' },
    { label: 'Transparency', value: '97.1%', desc: 'Открытость реестров и аудита', color: 'text-cyan-300' },
    { label: 'Accountability', value: '99.2%', desc: 'Криптографическая подотчетность', color: 'text-cyan-400' },
    { label: 'Community Satisfaction', value: '95.6%', desc: 'Удовлетворенность решениями', color: 'text-amber-300' },
    { label: 'AI Alignment', value: '99.0%', desc: 'Соответствие этике ИИ (Rule #12)', color: 'text-purple-300' },
    { label: 'Sovereign Strength', value: '100%', desc: 'Цифровой суверенитет системы', color: 'text-emerald-300' },
  ];

  const failSafeRules = [
    {
      num: 1,
      rule: 'No Action without Authority',
      sub: 'Identity ≠ Authority',
      desc: 'Ни одно действие не исполняется без явной криптографической делегации прав.',
      icon: KeyRound,
    },
    {
      num: 2,
      rule: 'No Change without Evidence',
      sub: 'Evidence Ladder ≥ L3',
      desc: 'Любая модификация состояния требует верифицированных наблюдаемых доказательств.',
      icon: FileCheck2,
    },
    {
      num: 3,
      rule: 'No Policy without Consent',
      sub: 'Explicit Human Opt-In',
      desc: 'Ни одна норма не навязывается без согласия заинтересованного сообщества.',
      icon: Users,
    },
    {
      num: 4,
      rule: 'No Data without Permission',
      sub: 'ZK Privacy & Sovereignty',
      desc: 'Данные принадлежат человеку и защищаются протоколами нулевого разглашения.',
      icon: Lock,
    },
    {
      num: 5,
      rule: 'No System without Justice',
      sub: 'Adl & Zero-Riba Invariant',
      desc: 'Полный запрет ссудного процента, монопольной ренты и угнетения (Zulm).',
      icon: Scale,
    },
    {
      num: 6,
      rule: 'No Future without Humanity',
      sub: 'Human-First AI Primacy',
      desc: 'ИИ является инструментом и советником, высшая субъектность принадлежит человеку.',
      icon: Sparkles,
    },
  ];

  const govTechnologies = [
    { name: 'Secure Voting System', desc: 'Защищенное голосование с взвешенными долями палат', icon: ShieldCheck },
    { name: 'Zero-Knowledge Proofs (ZKP)', desc: 'Доказательство права голоса без раскрытия личности', icon: Fingerprint },
    { name: 'Immutable Audit Logs', desc: 'SHA-256 хешированная неизменяемая цепочка аудита', icon: FileCheck2 },
    { name: 'Delegated Liquid Democracy', desc: 'Возможность динамического делегирования экспертам', icon: Users },
  ];

  return (
    <div className="space-y-4 animate-fade-in">
      {/* 6 Key Governance Metrics */}
      <div className="p-5 rounded-2xl bg-gradient-to-b from-[#09152e]/80 to-[#040816]/90 border border-cyan-900/40 shadow-xl space-y-3">
        <div className="flex items-center justify-between border-b border-cyan-900/40 pb-2">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">
            Системные Метрики Управления Шуры (Governance Performance)
          </span>
          <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> ALL INVARIANTS ACTIVE
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex flex-col justify-between"
            >
              <span className="text-[11px] font-mono text-slate-400 block mb-1">{m.label}</span>
              <div className={`text-xl font-bold font-mono ${m.color}`}>{m.value}</div>
              <span className="text-[9px] text-slate-500 font-mono mt-1 leading-tight">{m.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 6 Fail-Safe Invariant Rules */}
      <div className="p-5 rounded-2xl bg-gradient-to-b from-[#09152e]/80 to-[#040816]/90 border border-cyan-900/40 shadow-xl space-y-3">
        <div className="flex items-center justify-between border-b border-cyan-900/40 pb-2">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">
            6 Фундаментальных Защитных Правил (Fail-Safe Invariants)
          </span>
          <span className="text-[10px] font-mono text-slate-400">
            Model 002 Architectural Baseline
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {failSafeRules.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.num}
                className="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-950 flex items-start gap-3 hover:border-cyan-800/60 transition-colors"
              >
                <div className="p-2 rounded-lg bg-cyan-950/70 border border-cyan-800/40 text-cyan-400 shrink-0 mt-0.5">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono text-amber-400 font-bold">#{r.num}</span>
                    <strong className="text-xs text-white">{r.rule}</strong>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-300 block">{r.sub}</span>
                  <p className="text-[11px] text-slate-400 leading-relaxed pt-0.5">{r.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Governance Technologies */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#07132b]/90 via-[#0a1b3a]/70 to-[#040a17]/90 border border-cyan-800/40 shadow-xl">
        <div className="flex items-center justify-between border-b border-cyan-900/40 pb-2 mb-3">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">
            Технологический Стек Управления (Governance Technologies)
          </span>
          <span className="text-[10px] font-mono text-slate-400">Cryptographic Grade</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {govTechnologies.map((tech, idx) => {
            const TechIcon = tech.icon;
            return (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-2.5"
              >
                <div className="p-2 rounded-lg bg-cyan-950/50 border border-cyan-800/40 text-cyan-400">
                  <TechIcon className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-xs text-white block">{tech.name}</strong>
                  <span className="text-[10px] text-slate-400 block leading-tight">{tech.desc}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
