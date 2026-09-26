import React from 'react';
import {
  CheckCircle2,
  FileCheck,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Layers,
  AlertCircle,
} from 'lucide-react';

export interface RemediationCard {
  code: string;
  title: string;
  sub: string;
  status: 'FIXED' | 'CLARIFIED' | 'REWRITTEN' | 'VALIDATED';
  detail: string;
}

export const REMEDIATION_ITEMS: RemediationCard[] = [
  {
    code: 'C-01',
    title: 'Terminology Alignment',
    sub: 'Schema normalization resolved',
    status: 'FIXED',
    detail: 'Устранена двусмысленность между терминами Identity, Authority, Profile и Wallet.',
  },
  {
    code: 'C-02',
    title: 'Authority Boundary',
    sub: 'Ontology definitions clarified',
    status: 'CLARIFIED',
    detail: 'Разделены понятия Capability (возможность) и Authority (полномочие).',
  },
  {
    code: 'C-03',
    title: 'Adapter Claims',
    sub: 'Rule logic rewritten for clarity',
    status: 'REWRITTEN',
    detail: 'Четко разграничены реальные, санированные и тестовые адаптеры (Real/Simulated/Sanitized).',
  },
  {
    code: 'C-04',
    title: 'Governance Scope',
    sub: 'Constraints validated against source',
    status: 'VALIDATED',
    detail: 'Закреплен принцип Shura: Propose ≠ Approve ≠ Execute ≠ Audit + инвариант Shura Rule #42.',
  },
  {
    code: 'C-05',
    title: 'Metrics & Status',
    sub: 'Identifier collisions fixed',
    status: 'FIXED',
    detail: 'Исключены спекулятивные метрики (TVL/Yield) из топологической модели; только верифицируемые данные.',
  },
  {
    code: 'C-06',
    title: 'Recovery vs Authority',
    sub: 'Class boundaries clarified',
    status: 'CLARIFIED',
    detail: 'Процедуры восстановления M06 не могут обходить этические фильтры и кворум Шуры.',
  },
  {
    code: 'C-07',
    title: 'Exit Guarantees',
    sub: 'Mapping functions rewritten',
    status: 'REWRITTEN',
    detail: 'Гарантирован суверенный экспорт личных данных и графа знаний без привязки к провайдеру.',
  },
  {
    code: 'C-08',
    title: 'Shariah & Economy',
    sub: 'Reference integrity validated',
    status: 'VALIDATED',
    detail: 'Зафиксирован инвариант Zero Riba и разделение: NUR Value ≠ NUR Reward ≠ NUR Digital Cash.',
  },
  {
    code: 'C-09',
    title: 'Financial Claims',
    sub: 'Edge cases remediated and fixed',
    status: 'FIXED',
    detail: 'Полное покрытие детских и семейных балансов, устранена возможность скрытого кредитного плеча.',
  },
];

export const RemediationResults: React.FC = () => {
  const getStatusBadge = (status: RemediationCard['status']) => {
    switch (status) {
      case 'FIXED':
        return (
          <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            FIXED
          </span>
        );
      case 'CLARIFIED':
        return (
          <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono font-bold flex items-center gap-1">
            <FileCheck className="w-3 h-3 text-cyan-400" />
            CLARIFIED
          </span>
        );
      case 'REWRITTEN':
        return (
          <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold flex items-center gap-1">
            <RotateCcw className="w-3 h-3 text-amber-400" />
            REWRITTEN
          </span>
        );
      case 'VALIDATED':
        return (
          <span className="px-2 py-0.5 rounded-md bg-teal-500/20 text-teal-300 border border-teal-500/40 text-[10px] font-mono font-bold flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-teal-400" />
            VALIDATED
          </span>
        );
    }
  };

  return (
    <div className="rounded-2xl bg-gradient-to-b from-[#071328]/95 to-[#030816]/98 border border-cyan-800/40 p-4 shadow-xl space-y-3">
      {/* Box Header */}
      <div className="border-b border-cyan-900/40 pb-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              <Layers className="w-3.5 h-3.5" />
            </span>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              C-01 to C-09 Remediation Results
            </h3>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30">
            9/9 ALIGNED
          </span>
        </div>
        <p className="text-[10px] text-slate-400 mt-1">
          Результаты устранения семантических коллизий и нормализации границ
        </p>
      </div>

      {/* 9 Cards Grid / List */}
      <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1 custom-scrollbar">
        {REMEDIATION_ITEMS.map((item) => (
          <div
            key={item.code}
            className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-700/50 transition-all group"
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold font-mono text-amber-400">{item.code}</span>
                <span className="text-xs font-semibold text-white group-hover:text-cyan-200 transition-colors">
                  {item.title}
                </span>
              </div>
              {getStatusBadge(item.status)}
            </div>

            <div className="text-[10px] font-mono text-slate-400 mb-1">{item.sub}</div>

            <p className="text-[10px] text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
              {item.detail}
            </p>
          </div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="p-2.5 rounded-xl bg-slate-900/60 border border-cyan-950/60 flex flex-col gap-1 text-[10px] font-mono text-slate-400">
        <div className="flex justify-between items-center text-cyan-300 font-bold">
          <span>SUMMARY: 9/9 REMEDIATED</span>
          <span className="text-emerald-400">PASS 100%</span>
        </div>
        <div className="text-[9px] text-slate-500">
          METHODS: FIXED / CLARIFIED / REWRITTEN / VALIDATED
        </div>
      </div>
    </div>
  );
};
