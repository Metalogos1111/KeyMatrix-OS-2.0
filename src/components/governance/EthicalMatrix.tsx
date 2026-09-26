import React, { useState } from 'react';
import {
  Scale,
  Sparkles,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Sliders,
  HelpCircle,
  Award,
} from 'lucide-react';
import { EvidenceBadge } from '../common/EvidenceBadge';
import { useOSStore } from '../../store/osStore';

interface EthicalPillar {
  key: string;
  name: string;
  arabic: string;
  score: number;
  weight: number;
  description: string;
  violationCondition: string;
}

const INITIAL_PILLARS: EthicalPillar[] = [
  {
    key: 'haqq',
    name: 'Haqq (Истина и Доказательность)',
    arabic: 'الحق',
    score: 99.8,
    weight: 0.25,
    description: 'Верифицируемость утверждений, точность телеметрии, отсутствие фальсификаций и ложной информации.',
    violationCondition: 'Неподтвержденные заявления (Evidence Level < 3) или искажение данных.',
  },
  {
    key: 'adl',
    name: 'Adl (Справедливость и Баланс)',
    arabic: 'العدل',
    score: 100.0,
    weight: 0.30,
    description: 'Абсолютный запрет ссудного процента (Zero Riba), недопущение эксплуатации, равноправие участников.',
    violationCondition: 'Любая форма ростовщичества, монопольного давления или скрытых сборов.',
  },
  {
    key: 'hikmah',
    name: 'Hikmah (Мудрость и Долгосрочность)',
    arabic: 'الحكمة',
    score: 98.5,
    weight: 0.15,
    description: 'Учет долгосрочных цивилизационных последствий, сохранение знаний и баланс технологий.',
    violationCondition: 'Инициативы с риском разрушения культурного фонда или деградации навыков.',
  },
  {
    key: 'rahmah',
    name: 'Rahmah (Милосердие и Забота)',
    arabic: 'الرحمة',
    score: 99.0,
    weight: 0.15,
    description: 'Защита уязвимых групп, когнитивная безопасность детей, социальная солидарность и Вакф.',
    violationCondition: 'Ущерб благополучию детей, агрессивный алгоритмический контент.',
  },
  {
    key: 'ilkmah',
    name: 'Ilkmah & Amanah (Доверие и Ответственность)',
    arabic: 'الأمانة والثقة',
    score: 99.5,
    weight: 0.15,
    description: 'Соблюдение фидуциарных обязательств, прозрачность смарт-контрактов и защита персональных данных.',
    violationCondition: 'Несанкционированная передача приватных данных или нарушение условий доверия.',
  },
];

export const EthicalMatrix: React.FC = () => {
  const { addLog } = useOSStore();
  const [pillars, setPillars] = useState<EthicalPillar[]>(INITIAL_PILLARS);
  const [testMode, setTestMode] = useState<'safe' | 'violation'>('safe');

  const compositeScore = pillars.reduce((acc, p) => acc + (p.score * p.weight), 0);
  const isBlocked = pillars.some((p) => p.score < 70.0);
  const failedPillars = pillars.filter((p) => p.score < 70.0);

  const handleTriggerViolation = () => {
    setTestMode('violation');
    setPillars((prev) =>
      prev.map((p) => (p.key === 'adl' ? { ...p, score: 35.0 } : p))
    );
    addLog('SHURA', 'Этическая Матрица 786: Зафиксировано падение Adl < 70%. TawhidCore активировал БЛОКИРОВКУ!', 'error');
  };

  const handleReset = () => {
    setTestMode('safe');
    setPillars(INITIAL_PILLARS);
    addLog('SHURA', 'Этическая Матрица 786: Сброс к базовым гармоническим значениям.', 'info');
  };

  const handleScoreChange = (key: string, newScore: number) => {
    setPillars((prev) =>
      prev.map((p) => (p.key === key ? { ...p, score: newScore } : p))
    );
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0b1736]/90 via-[#071026]/85 to-[#040816]/95 border border-cyan-800/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-bold flex items-center gap-1.5 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              786 HARMONIC MATRIX: <strong className="text-white">{compositeScore.toFixed(1)}/100</strong>
            </span>
            <span>•</span>
            <span>TAWHIDCORE 5 PILLARS</span>
            <span>•</span>
            <EvidenceBadge level={5} compact />
          </div>
          <h2 className="text-base font-bold text-white tracking-wide flex items-center gap-2">
            <Scale className="w-5 h-5 text-amber-400" />
            Этическая Матрица 786 (TawhidCore Ethical Matrix)
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Пятимерный этический контур Шуры. Нарушение любого критерия ведет к немедленному вето TawhidCore
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={testMode === 'safe' ? handleTriggerViolation : handleReset}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all border flex items-center gap-1.5 ${
              testMode === 'violation'
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-[0_0_12px_rgba(244,63,94,0.3)]'
                : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 hover:bg-cyan-500/30'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            {testMode === 'violation' ? 'Снять блокировку (Reset)' : 'Тест: Симулировать Riba'}
          </button>
          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white"
            title="Сбросить матрицу"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: 786 Circle + 5 Pillar Sliders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Central 786 Dial Visualizer (Left Column 5 cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-gradient-to-b from-[#09152e]/80 to-[#040816]/90 border border-cyan-900/40 shadow-xl flex flex-col items-center justify-between text-center space-y-4">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">
            Ядро 786 Резонанса & Статус TawhidCore
          </span>

          {/* SVG Circular Ring Dial */}
          <div className="relative w-48 h-48 flex items-center justify-center my-2">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background Circle */}
              <circle
                cx="50"
                cy="50"
                r="42"
                className="text-slate-900 stroke-current"
                strokeWidth="7"
                fill="transparent"
              />
              {/* Foreground Gradient Progress */}
              <circle
                cx="50"
                cy="50"
                r="42"
                className={`${
                  isBlocked ? 'text-rose-500' : 'text-cyan-400'
                } stroke-current transition-all duration-700`}
                strokeWidth="7"
                strokeDasharray={264}
                strokeDashoffset={264 - (264 * compositeScore) / 100}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Inner Hub Content */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-xs font-mono font-serif text-amber-400 font-bold tracking-widest text-lg">
                ﷽
              </span>
              <span className="text-2xl font-bold font-mono text-white mt-0.5">
                786
              </span>
              <span className="text-[10px] font-mono text-cyan-300">
                {compositeScore.toFixed(1)}% Coherence
              </span>
            </div>
          </div>

          {/* Status Verdict Banner */}
          <div
            className={`w-full p-3 rounded-xl border text-xs font-mono ${
              isBlocked
                ? 'bg-rose-950/80 border-rose-500/60 text-rose-200 animate-pulse'
                : 'bg-emerald-950/50 border-emerald-500/50 text-emerald-300'
            }`}
          >
            {isBlocked ? (
              <div className="flex items-center justify-center gap-2 font-bold">
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                <span>TAWHIDCORE BLOCKED (Haram / Invariant Breach)</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>TAWHIDCORE HARMONY PASSED (100% Halal)</span>
              </div>
            )}
          </div>
        </div>

        {/* 5 Pillars Slider Inspector (Right Column 7 cols) */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-gradient-to-b from-[#09152e]/80 to-[#040816]/90 border border-cyan-900/40 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-cyan-900/40 pb-2">
            <span className="text-xs font-mono text-cyan-400 uppercase font-bold">
              5 Столпов Этического Аудита
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              Порог допуска: ≥ 70.0% на каждый столп
            </span>
          </div>

          <div className="space-y-3">
            {pillars.map((p) => {
              const isPillarFailed = p.score < 70.0;
              return (
                <div
                  key={p.key}
                  className={`p-3 rounded-xl border transition-all space-y-1.5 ${
                    isPillarFailed
                      ? 'bg-rose-950/50 border-rose-500 text-rose-200'
                      : 'bg-slate-950/70 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <strong className={isPillarFailed ? 'text-rose-300' : 'text-white'}>
                        {p.name}
                      </strong>
                      <span className="text-amber-400 font-serif text-sm">{p.arabic}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-500 font-mono">Вес: {p.weight * 100}%</span>
                      <strong
                        className={`text-xs ${
                          isPillarFailed ? 'text-rose-400 font-bold' : 'text-emerald-400'
                        }`}
                      >
                        {p.score.toFixed(1)}%
                      </strong>
                    </div>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="0.5"
                    value={p.score}
                    onChange={(e) => handleScoreChange(p.key, Number(e.target.value))}
                    className={`w-full h-1.5 rounded-lg cursor-pointer bg-slate-800 ${
                      isPillarFailed ? 'accent-rose-500' : 'accent-cyan-400'
                    }`}
                  />

                  <p className="text-[10px] text-slate-400 leading-tight">
                    {p.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
