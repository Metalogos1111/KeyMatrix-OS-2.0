import React, { useState } from 'react';
import {
  Zap,
  Play,
  CheckCircle2,
  AlertTriangle,
  Shield,
  Coins,
  Users,
  Leaf,
  Layers,
  ArrowRight,
  Info,
} from 'lucide-react';
import { useOSStore } from '../../store/osStore';
import { checkAuthority, SHURA_RULE_42 } from '../../lib/authority/shuraRules';
import { ROLE_CAPABILITIES } from '../../lib/authority/roleMatrix';
import { EvidenceBadge } from '../common/EvidenceBadge';

export const IntentIngress: React.FC = () => {
  const {
    role,
    executionParams,
    setExecutionParams,
    runExecutionSimulation,
    addLog,
  } = useOSStore();

  const [intentText, setIntentText] = useState(
    'Оптимизировать энергобаланс солнечного кластера Баку с проверкой Shura Rule #42 и начислением 150 NUR'
  );
  const [nurCost, setNurCost] = useState(150);
  const [peopleCount, setPeopleCount] = useState(120);
  const [co2Amount, setCo2Amount] = useState(25);
  const [reasoningDepth, setReasoningDepth] = useState<'fast' | 'formal'>('formal');
  const [isRunning, setIsRunning] = useState(false);

  // Authority check live evaluation
  const authorityCheck = checkAuthority(role, {
    nurAmount: nurCost,
    peopleAffected: peopleCount,
    co2Tons: co2Amount,
  });

  const roleConfig = ROLE_CAPABILITIES[role] || ROLE_CAPABILITIES.Adult;

  const handleRun = async () => {
    if (!intentText.trim() || isRunning) return;

    if (!authorityCheck.passed) {
      addLog(
        'SHURA',
        `Попытка выполнения заблокирована: ${authorityCheck.reason} [${authorityCheck.ruleCode}]`,
        'error'
      );
      return;
    }

    setIsRunning(true);
    setExecutionParams({
      nurAmount: nurCost,
      peopleAffected: peopleCount,
      co2Tons: co2Amount,
    });
    addLog('INTENT', `Запуск намерения: "${intentText.slice(0, 50)}..." [Роль: ${role}, NUR: ${nurCost}]`, 'info');
    await runExecutionSimulation(intentText);
    setIsRunning(false);
  };

  return (
    <div className="rounded-2xl bg-gradient-to-b from-[#09152e]/90 to-[#040816]/95 border border-cyan-900/40 p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyan-900/40 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Intent Ingress & Authority Gate
              </h3>
              <span className={`text-[10px] px-2 py-0.5 rounded border font-mono ${roleConfig.badgeColor}`}>
                {role}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Валидация полномочий роли и автоматическая маршрутизация Shura Rule #42 (&le;1000 NUR Auto-Approve / &gt;1000 NUR Shura Consensus)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setReasoningDepth('fast')}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${
              reasoningDepth === 'fast'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            System 1 (Быстрый)
          </button>
          <button
            onClick={() => setReasoningDepth('formal')}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${
              reasoningDepth === 'formal'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            System 2 (Shura Formal)
          </button>
        </div>
      </div>

      {/* Input Textarea */}
      <div className="space-y-2">
        <label className="block text-xs font-mono text-slate-400">
          Сформулируйте намерение или задачу:
        </label>
        <textarea
          id="metalogos-intent-textarea"
          rows={3}
          value={intentText}
          onChange={(e) => setIntentText(e.target.value)}
          placeholder="Введите цель, задачу или намерение..."
          className="w-full p-3.5 rounded-xl bg-slate-950/80 border border-cyan-800/40 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono leading-relaxed shadow-inner"
        />
      </div>

      {/* Numerical Impact Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* NUR Cost Slider / Input */}
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 flex items-center gap-1">
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              NUR Затраты:
            </span>
            <span className="text-amber-400 font-bold">{nurCost.toLocaleString()} NUR</span>
          </div>
          <input
            type="range"
            min={10}
            max={2000}
            step={10}
            value={nurCost}
            onChange={(e) => setNurCost(Number(e.target.value))}
            className="w-full accent-amber-400"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>10 NUR</span>
            <span className="text-cyan-400">Порог 1000 NUR</span>
            <span>2,000 NUR</span>
          </div>
        </div>

        {/* People Impact */}
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              Охват людей:
            </span>
            <span className="text-cyan-300 font-bold">{peopleCount.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={1}
            max={2000}
            step={10}
            value={peopleCount}
            onChange={(e) => setPeopleCount(Number(e.target.value))}
            className="w-full accent-cyan-400"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>1 чел</span>
            <span className="text-cyan-400">Порог 1,000</span>
            <span>2,000 чел</span>
          </div>
        </div>

        {/* CO2 Impact */}
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 flex items-center gap-1">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              CO2 эффект:
            </span>
            <span className="text-emerald-300 font-bold">{co2Amount} тонн</span>
          </div>
          <input
            type="range"
            min={0}
            max={1000}
            step={5}
            value={co2Amount}
            onChange={(e) => setCo2Amount(Number(e.target.value))}
            className="w-full accent-emerald-400"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>0 т</span>
            <span className="text-cyan-400">Порог 500 т</span>
            <span>1,000 т</span>
          </div>
        </div>
      </div>

      {/* Live Authority Status Banner */}
      <div
        className={`p-3.5 rounded-xl border flex items-start gap-3 transition-all ${
          authorityCheck.passed
            ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
            : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
        }`}
      >
        {authorityCheck.passed ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        ) : (
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
        )}
        <div className="text-xs space-y-0.5 flex-1">
          <div className="font-bold font-mono flex items-center justify-between">
            <span>
              {authorityCheck.passed
                ? 'Авторизация намерения подтверждена (Authority Clear)'
                : 'Требуется повышение полномочий или одобрение Шуры'}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700">
              {authorityCheck.ruleCode}
            </span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-300">{authorityCheck.reason}</p>
        </div>
      </div>

      {/* Execution Trigger Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <div className="text-[11px] text-slate-400 font-mono">
          Инварианты: <span className="text-amber-400">Zero Riba</span> • <span className="text-cyan-300">PoR &ge; 0.450</span> • <span className="text-emerald-400">TawhidCore Ethics</span>
        </div>

        <button
          id="metalogos-run-btn"
          onClick={handleRun}
          disabled={isRunning || !authorityCheck.passed}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(0,212,255,0.3)] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Play className={`w-3.5 h-3.5 fill-current ${isRunning ? 'animate-spin' : ''}`} />
          <span>{isRunning ? 'Исполнение цепочки...' : 'Запустить цепочку рассуждений'}</span>
        </button>
      </div>
    </div>
  );
};
