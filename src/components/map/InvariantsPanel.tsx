import React from 'react';
import {
  ShieldAlert,
  CheckCircle,
  Clock,
  ArrowRight,
  BookmarkCheck,
  Scale,
  Sparkles,
  Info,
} from 'lucide-react';

export const INVARIANTS = [
  {
    title: 'Visual = Reference (not runtime truth)',
    desc: 'Диаграмма или карта является справочным представлением топологии и не служит доказательством фактического состояния в рантайме.',
    code: 'INV-01',
  },
  {
    title: 'No absolute technical or financial claims',
    desc: 'Исключены спекулятивные обещания доходности (TVL/Yield) и декларации безапелляционной надежности без криптографического пруфа.',
    code: 'INV-02',
  },
  {
    title: 'Ethical layer ≠ technical verifier',
    desc: 'Этический фильтр (TawhidCore) проверяет правила ценностей, в то время как криптографический верификатор изолированно подтверждает математические инварианты.',
    code: 'INV-03',
  },
  {
    title: 'Each map has clear scope and boundary',
    desc: 'Каждый слой M00–M16 строго ограничен своей областью ответственности (Authority Scope) без скрытого расширения прав.',
    code: 'INV-04',
  },
  {
    title: 'Evidence required for operational status',
    desc: 'Переход в рабочий статус возможен только при прохождении лестницы доказательств (Declared → Observed → Verified → Reproduced → Proven).',
    code: 'INV-05',
  },
  {
    title: 'M∞ remains index, not an authority',
    desc: 'Слой M∞ является чистым топологическим индексом — у него нет прав на выполнение (Execution), мутацию SOT или принятие решений.',
    code: 'INV-06',
  },
  {
    title: 'All layers support human sovereignty',
    desc: 'Технологические сервисы служат усилению человеческой субъектности, справедливости (Adl) и благу общества (Maslahah).',
    code: 'INV-07',
  },
  {
    title: 'Consistency > Perfection > Evolution',
    desc: 'Согласованность и проверяемость модели превалируют над преждевременной сложностью и неподтвержденной функциональностью.',
    code: 'INV-08',
  },
];

export const CHECKLIST_STEPS = [
  { step: 1, label: 'Apply all C-01..C-09 remediations', status: 'DONE' },
  { step: 2, label: 'Update affected map annotations', status: 'DONE' },
  { step: 3, label: 'Re-run consistency validation', status: 'DONE' },
  { step: 4, label: 'Finalize M∞ as pure index/topology', status: 'IN_PROGRESS' },
  { step: 5, label: 'Publish Map Registry v1.2', status: 'IN_PROGRESS' },
  { step: 6, label: 'Archive variants (preserve value)', status: 'NEXT' },
  { step: 7, label: 'Update documentation & changelog', status: 'NEXT' },
  { step: 8, label: 'Ready for operational phase', status: 'NEXT' },
];

export const InvariantsPanel: React.FC = () => {
  return (
    <div className="rounded-2xl bg-gradient-to-b from-[#071328]/95 to-[#030816]/98 border border-cyan-800/40 p-4 shadow-xl space-y-4">
      {/* Header */}
      <div className="border-b border-cyan-900/40 pb-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Scale className="w-3.5 h-3.5" />
          </span>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
            System Invariants & Gate Checklist
          </h3>
        </div>
        <span className="text-[10px] font-mono text-cyan-300 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-700/40">
          8 INVARIANTS ACTIVE
        </span>
      </div>

      {/* Invariants Grid */}
      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
        {INVARIANTS.map((inv) => (
          <div
            key={inv.code}
            className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-800/50 transition-all text-xs"
          >
            <div className="flex items-center justify-between text-amber-400 font-mono font-bold text-[11px] mb-1">
              <span>{inv.title}</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-900 border border-slate-700 text-cyan-300">
                {inv.code}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">{inv.desc}</p>
          </div>
        ))}
      </div>

      {/* Next Steps / M∞ Final Checklist */}
      <div className="border-t border-cyan-900/40 pt-3 space-y-2">
        <div className="flex items-center justify-between text-xs font-mono font-bold text-white">
          <span className="flex items-center gap-1.5 text-cyan-300">
            <BookmarkCheck className="w-3.5 h-3.5" />
            M∞ FINAL TRANSITION CHECKLIST
          </span>
          <span className="text-[10px] text-slate-400">Section 6 Protocol</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] font-mono">
          {CHECKLIST_STEPS.map((item) => {
            const isDone = item.status === 'DONE';
            const isInProg = item.status === 'IN_PROGRESS';

            return (
              <div
                key={item.step}
                className={`p-2 rounded-lg border flex items-center justify-between gap-2 ${
                  isDone
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                    : isInProg
                    ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-200 shadow-[0_0_8px_rgba(0,212,255,0.2)]'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="font-bold opacity-80">{item.step}.</span>
                  <span className="truncate">{item.label}</span>
                </div>

                <div className="shrink-0">
                  {isDone && (
                    <span className="flex items-center gap-1 text-[9px] text-emerald-400 font-bold">
                      <CheckCircle className="w-3 h-3" />
                      DONE
                    </span>
                  )}
                  {isInProg && (
                    <span className="flex items-center gap-1 text-[9px] text-cyan-400 font-bold animate-pulse">
                      <Clock className="w-3 h-3" />
                      ACTIVE
                    </span>
                  )}
                  {!isDone && !isInProg && (
                    <span className="text-[9px] text-slate-500">NEXT</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
