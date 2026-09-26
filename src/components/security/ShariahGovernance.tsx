import React, { useState } from 'react';
import {
  Scale,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  HelpCircle,
  Cpu,
  Lock,
  ArrowRight,
  UserCheck,
  FileCheck,
  Play,
  RotateCcw,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { EvidenceBadge } from '../common/EvidenceBadge';
import { useOSStore } from '../../store/osStore';

export type ShariahStatus =
  | 'SHARIAH_VERIFIED'
  | 'SHARIAH_REVIEW_REQUIRED'
  | 'SCHOLARLY_DISAGREEMENT'
  | 'JURISDICTION_DEPENDENT'
  | 'NOT_APPLICABLE'
  | 'TECHNICAL_ONLY';

interface GovernanceProtocolItem {
  id: string;
  name: string;
  category: string;
  status: ShariahStatus;
  evidenceLevel: 1 | 2 | 3 | 4 | 5;
  muftiNotes: string;
}

const PROTOCOLS_LIST: GovernanceProtocolItem[] = [
  {
    id: 'gov-01',
    name: 'NUR Zero-Riba Settlement Engine',
    category: 'Экономика (M10)',
    status: 'SHARIAH_VERIFIED',
    evidenceLevel: 5,
    muftiNotes: 'Полное отсутствие ссудного процента (Риба) и неопределенности (Гарар). Соответствие AAOIFI.',
  },
  {
    id: 'gov-02',
    name: 'AI Agent Autonomous Financial Execution',
    category: 'ИИ-Этика (M07)',
    status: 'SHARIAH_REVIEW_REQUIRED',
    evidenceLevel: 3,
    muftiNotes: 'ИИ не может обладать субъектностью распоряжения имуществом без подтверждения человека-опекуна.',
  },
  {
    id: 'gov-03',
    name: 'Decentralized Zakat Distribution Oracle',
    category: 'Социальный фонд (M09)',
    status: 'SHARIAH_VERIFIED',
    evidenceLevel: 5,
    muftiNotes: 'Строгое целевое назначение по 8 категориям (9:60) проверено коллегией Шуры Баку.',
  },
  {
    id: 'gov-04',
    name: 'Algorithmic Bio-Sensing on Caspian Marine Fauna',
    category: 'Экология (M13)',
    status: 'TECHNICAL_ONLY',
    evidenceLevel: 4,
    muftiNotes: 'Телеметрия буев нейтральна с точки зрения фикха, служит охране творений Всевышнего.',
  },
  {
    id: 'gov-05',
    name: 'Cross-Border Sukuk Asset Tokenization',
    category: 'Финансы (M10)',
    status: 'JURISDICTION_DEPENDENT',
    evidenceLevel: 3,
    muftiNotes: 'Требуется гармонизация с законами Азербайджана, Турции, Казахстана и ОАЭ.',
  },
  {
    id: 'gov-06',
    name: 'Synthetic Voice Cloning for Religious Instruction',
    category: 'Медиа (M06)',
    status: 'SCHOLARLY_DISAGREEMENT',
    evidenceLevel: 2,
    muftiNotes: 'Разногласие ученых: дозволено для перевода лекций, запрещено для создания фейковых фатв.',
  },
];

const STATUS_DETAILS: Record<
  ShariahStatus,
  { label: string; color: string; badgeBg: string; desc: string }
> = {
  SHARIAH_VERIFIED: {
    label: 'SHARIAH_VERIFIED',
    color: 'text-emerald-300',
    badgeBg: 'bg-emerald-500/20 border-emerald-500/40',
    desc: 'Полное соответствие фикху и этике ислама, верифицировано Советом ученых.',
  },
  SHARIAH_REVIEW_REQUIRED: {
    label: 'SHARIAH_REVIEW_REQUIRED',
    color: 'text-amber-300',
    badgeBg: 'bg-amber-500/20 border-amber-500/40',
    desc: 'Требуется заседание коллегии богословов и дополнительная экспертиза.',
  },
  SCHOLARLY_DISAGREEMENT: {
    label: 'SCHOLARLY_DISAGREEMENT (Ихтиляф)',
    color: 'text-purple-300',
    badgeBg: 'bg-purple-500/20 border-purple-500/40',
    desc: 'Разногласие мазхабов. Применяется правило наименьшего вреда (Ахван ад-Дарарайн).',
  },
  JURISDICTION_DEPENDENT: {
    label: 'JURISDICTION_DEPENDENT',
    color: 'text-blue-300',
    badgeBg: 'bg-blue-500/20 border-blue-500/40',
    desc: 'Зависит от правового режима конкретного суверенного государства.',
  },
  NOT_APPLICABLE: {
    label: 'NOT_APPLICABLE',
    color: 'text-slate-300',
    badgeBg: 'bg-slate-500/20 border-slate-500/40',
    desc: 'Нейтральные протоколы общего назначения без религиозных ограничений.',
  },
  TECHNICAL_ONLY: {
    label: 'TECHNICAL_ONLY',
    color: 'text-cyan-300',
    badgeBg: 'bg-cyan-500/20 border-cyan-500/40',
    desc: 'Низкоуровневые алгоритмические и сетевые спецификации.',
  },
};

export const ShariahGovernance: React.FC = () => {
  const { role, addLog } = useOSStore();

  // 4-Button Invariant Flow Simulator
  // PROPOSE -> APPROVE -> EXECUTE -> AUDIT
  const [activeStep, setActiveStep] = useState<number>(0);
  const [flowLog, setFlowLog] = useState<string[]>([
    'Инициатор сформулировал предложение по калибровке фильтра ИИ.',
  ]);

  const steps = [
    {
      id: 'propose',
      name: '1. PROPOSE (Предложение)',
      roleReq: 'Initiator / Researcher',
      desc: 'Формулирование намерения, плана и гипотезы с фиксацией в реестре.',
    },
    {
      id: 'approve',
      name: '2. APPROVE (Одобрение Шуры)',
      roleReq: 'Shura Council / Mufti',
      desc: 'Проверка соответствия Shura Rule #42 и каноническим нормам фикха.',
    },
    {
      id: 'execute',
      name: '3. EXECUTE (Исполнение)',
      roleReq: 'TEE Enclave / Operator',
      desc: 'Автоматическое изолированное исполнение в защищенном анклаве.',
    },
    {
      id: 'audit',
      name: '4. AUDIT (Независимый аудит)',
      roleReq: 'External Auditor',
      desc: 'Проверка соответствия фактического результата исходному намерению.',
    },
  ];

  const handleNextStep = (stepIdx: number) => {
    if (stepIdx === activeStep + 1) {
      setActiveStep(stepIdx);
      const stepName = steps[stepIdx].name;
      const msg = `Шаг [${stepName}] исполнен субъектом роли "${steps[stepIdx].roleReq}".`;
      setFlowLog((prev) => [...prev, msg]);
      addLog('SHURA', msg, 'info');
    }
  };

  const handleResetFlow = () => {
    setActiveStep(0);
    setFlowLog(['Инициатор сформулировал новое предложение по обновлению системы.']);
    addLog('SHURA', 'Сброс цикла инварианта PROPOSE != APPROVE != EXECUTE != AUDIT', 'info');
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#171607]/90 via-[#26210b]/80 to-[#0e0c03]/95 border border-amber-600/40 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-900/50 pb-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40">
              <Scale className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">
                Shariah Governance & Разделение Властей (Model 002)
              </h2>
              <span className="text-xs text-amber-400 font-mono">
                Инвариант Шуры, лестница доказательств и верификация канонического соответствия
              </span>
            </div>
          </div>
          <EvidenceBadge level={5} compact />
        </div>

        {/* Fundamental 4-Step Invariant Banner */}
        <div className="p-3 rounded-xl bg-slate-950/80 border border-amber-500/30 font-mono text-xs text-amber-200 space-y-1">
          <span className="text-[10px] text-slate-400 block uppercase">ФУНДАМЕНТАЛЬНЫЙ ИНВАРИАНТ ВЛАСТИ (NO SILENT AI GOVERNANCE):</span>
          <div className="text-sm font-bold text-white tracking-wider flex items-center gap-2 flex-wrap">
            <span>PROPOSE</span> <span className="text-rose-400">≠</span>
            <span>APPROVE</span> <span className="text-rose-400">≠</span>
            <span>EXECUTE</span> <span className="text-rose-400">≠</span>
            <span>AUDIT</span>
          </div>
          <p className="text-[10px] text-slate-400">
            ИИ может помогать в анализе и моделировании, но НИКОГДА не получает скрытой или прямой исполнительной власти без разделения ролей людей.
          </p>
        </div>
      </div>

      {/* 4-Step Invariant Interactive Workflow */}
      <div className="p-5 rounded-2xl bg-gradient-to-b from-[#091836]/90 to-[#040b19]/95 border border-cyan-700/40 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-cyan-900/50 pb-2">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
            <UserCheck className="w-4 h-4 text-emerald-400" />
            Интерактивный симулятор разделения полномочий (4 Roles)
          </span>
          <button
            onClick={handleResetFlow}
            className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            Сброс
          </button>
        </div>

        {/* 4 Steps Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {steps.map((s, idx) => {
            const isCompleted = activeStep >= idx;
            const isCurrent = activeStep === idx;
            const isNext = activeStep + 1 === idx;
            return (
              <div
                key={s.id}
                className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-amber-950/40 border-amber-400 ring-2 ring-amber-400/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                    : isCompleted
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-slate-300'
                    : 'bg-slate-950/60 border-slate-800 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono font-bold mb-1">
                    <span className={isCompleted ? 'text-emerald-300' : 'text-slate-400'}>{s.name}</span>
                    {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 block mb-1.5">
                    Роль: <strong>{s.roleReq}</strong>
                  </span>
                  <p className="text-[11px] text-slate-400 leading-tight">{s.desc}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800">
                  {isNext ? (
                    <button
                      onClick={() => handleNextStep(idx)}
                      className="w-full py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold font-mono text-xs hover:from-cyan-400 hover:to-blue-500 transition-all flex items-center justify-center gap-1"
                    >
                      <Play className="w-3 h-3" />
                      Подтвердить роль
                    </button>
                  ) : isCurrent ? (
                    <span className="text-[10px] font-mono text-amber-400 font-bold block text-center">
                      ТЕКУЩАЯ ФАЗА
                    </span>
                  ) : isCompleted ? (
                    <span className="text-[10px] font-mono text-emerald-400 font-bold block text-center">
                      ВЕРИФИЦИРОВАНО
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-600 block text-center">ОЖИДАНИЕ</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Flow Event Log */}
        <div className="p-3 rounded-xl bg-black/60 border border-cyan-950 font-mono text-[11px] text-slate-300 space-y-1 max-h-24 overflow-y-auto custom-scrollbar">
          {flowLog.map((log, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-cyan-500">[{i + 1}]</span>
              <span>{log}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 6 Shariah Compliance Statuses Matrix */}
      <div className="p-5 rounded-2xl bg-gradient-to-b from-[#09152e]/80 to-[#040816]/90 border border-cyan-900/40 shadow-xl space-y-3">
        <div className="flex items-center justify-between border-b border-cyan-900/40 pb-2">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            Матрица Шариатского Статуса Протоколов (6 Категорий)
          </span>
          <span className="text-[10px] font-mono text-slate-400">AAOIFI & Shura Compliant</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {PROTOCOLS_LIST.map((pr) => {
            const st = STATUS_DETAILS[pr.status];
            return (
              <div
                key={pr.id}
                className="p-3.5 rounded-xl bg-slate-950/70 border border-cyan-950/80 flex flex-col justify-between space-y-2"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-xs font-mono text-cyan-400">{pr.category}</span>
                    <EvidenceBadge level={pr.evidenceLevel} compact />
                  </div>
                  <h4 className="text-xs font-bold text-white leading-tight">{pr.name}</h4>
                  <div className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border inline-block mt-1.5 ${st.badgeBg} ${st.color}`}>
                    {st.label}
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 leading-tight border-t border-slate-900 pt-2 italic">
                  «{pr.muftiNotes}»
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Critical Distinctions & Evidence Ladder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Evidence Ladder */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-cyan-900/40 space-y-2">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block">
            Лестница Доказательств (Evidence Ladder)
          </span>
          <div className="space-y-1.5 text-xs font-mono">
            {[
              { lvl: 1, name: 'DECLARED', desc: 'Заявлено автором манифеста (гипотеза)' },
              { lvl: 2, name: 'OBSERVED', desc: 'Однократно зафиксировано в тестах' },
              { lvl: 3, name: 'VERIFIED', desc: 'Проверено независимым тестом' },
              { lvl: 4, name: 'REPRODUCED', desc: 'Воспроизведено на 3+ независимых узлах' },
              { lvl: 5, name: 'PROVEN', desc: 'Криптографически и математически доказано' },
            ].map((el) => (
              <div key={el.lvl} className="p-2 rounded-lg bg-black/50 border border-cyan-950 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <EvidenceBadge level={el.lvl as any} compact />
                  <span className="font-bold text-white">{el.name}</span>
                </div>
                <span className="text-[10px] text-slate-400">{el.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Invariants Matrix */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-amber-900/40 space-y-2">
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
            Критические Онтологические Различия (Master Model 002)
          </span>
          <div className="grid grid-cols-1 gap-1 text-[11px] font-mono text-slate-300">
            <div className="p-1.5 rounded bg-slate-950/70 border border-slate-900">• Manifest <span className="text-rose-400">≠</span> Implementation</div>
            <div className="p-1.5 rounded bg-slate-950/70 border border-slate-900">• Source <span className="text-rose-400">≠</span> Execution</div>
            <div className="p-1.5 rounded bg-slate-950/70 border border-slate-900">• Execution <span className="text-rose-400">≠</span> Verification</div>
            <div className="p-1.5 rounded bg-slate-950/70 border border-slate-900">• Verification <span className="text-rose-400">≠</span> Reproduction</div>
            <div className="p-1.5 rounded bg-slate-950/70 border border-slate-900">• Reproduction <span className="text-rose-400">≠</span> automatically Proven</div>
            <div className="p-1.5 rounded bg-slate-950/70 border border-slate-900">• Capability <span className="text-rose-400">≠</span> Authority</div>
            <div className="p-1.5 rounded bg-slate-950/70 border border-slate-900">• Identity <span className="text-rose-400">≠</span> Authority</div>
            <div className="p-1.5 rounded bg-slate-950/70 border border-slate-900">• Wallet <span className="text-rose-400">≠</span> Identity</div>
          </div>
        </div>
      </div>
    </div>
  );
};
