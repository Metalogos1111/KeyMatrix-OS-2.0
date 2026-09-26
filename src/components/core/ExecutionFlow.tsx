import React, { useState } from 'react';
import {
  Play,
  ArrowRight,
  Shield,
  Cpu,
  Layers,
  Globe2,
  Sparkles,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  Users,
  Leaf,
  Coins,
  ShieldCheck,
} from 'lucide-react';
import { useOSStore } from '../../store/osStore';
import { TRANSLATIONS } from '../../data/translations';
import { SHURA_RULE_42, checkAuthority } from '../../lib/authority/shuraRules';

export const ExecutionFlow: React.FC = () => {
  const {
    executionProgress,
    executionStatus,
    isSimulatingExecution,
    runExecutionSimulation,
    setComposerModalOpen,
    language,
    role,
    setRole,
    shuraSigners,
    toggleShuraSignature,
    executionParams,
    setExecutionParams,
    lastExecutionProof,
    lastAuthorityResult,
  } = useOSStore();

  const [showConfig, setShowConfig] = useState(false);
  const t = TRANSLATIONS[language];

  // 8-Step pipeline according to Architecture specification
  const flowSteps = [
    { num: 1, label: 'Intent', ru: 'Намерение', sub: 'Human/AI' },
    { num: 2, label: 'Identity', ru: 'Идентичность', sub: 'DID:key' },
    { num: 3, label: 'Authority', ru: 'Право', sub: 'Rule #42' },
    { num: 4, label: 'Policy', ru: 'Политика', sub: 'Ethics' },
    { num: 5, label: 'Execution', ru: 'Исполнение', sub: '7 Domains' },
    { num: 6, label: 'State', ru: 'Реестр', sub: 'Ledger' },
    { num: 7, label: 'Evidence', ru: 'Доказательство', sub: 'PoR Hash' },
    { num: 8, label: 'Impact', ru: 'Импакт', sub: 'NUR / CO2' },
  ];

  // Current active step calculation based on progress
  const activeStepNum = Math.min(8, Math.max(1, Math.ceil((executionProgress / 100) * 8)));

  const willTriggerRule42 =
    executionParams.peopleAffected > SHURA_RULE_42.thresholds.maxPeopleWithoutShura ||
    executionParams.co2Tons > SHURA_RULE_42.thresholds.maxCo2WithoutShura ||
    executionParams.nurAmount > SHURA_RULE_42.thresholds.maxNurWithoutShura;

  const currentAuthCheck = checkAuthority(role, {
    peopleAffected: executionParams.peopleAffected,
    co2Tons: executionParams.co2Tons,
    nurAmount: executionParams.nurAmount,
    signers: shuraSigners,
  });

  return (
    <div className="relative flex flex-col justify-between h-full rounded-2xl bg-gradient-to-b from-[#09152e]/95 via-[#071024]/95 to-[#040915]/98 border border-cyan-800/40 p-3.5 shadow-[0_4px_25px_rgba(0,0,0,0.5)] backdrop-blur-md">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between border-b border-cyan-900/40 pb-2 mb-2">
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <h3 className="text-xs font-bold text-white tracking-wide font-['Plus_Jakarta_Sans']">
              {t.pipeline || '8-STEP EXECUTION PIPELINE'}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowConfig(!showConfig)}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-800/60 flex items-center gap-1 transition-colors"
            >
              <Sliders className="w-3 h-3" />
              <span>{showConfig ? 'Скрыть параметры' : 'Параметры & Шура'}</span>
            </button>

            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-700/50 uppercase">
              M01-M15 ACTIVE
            </span>
          </div>
        </div>

        {/* Shura Rule #42 Warning or Quorum Pill */}
        {willTriggerRule42 && (
          <div
            className={`mb-2 px-2.5 py-1.5 rounded-lg border text-xs font-mono flex items-center justify-between ${
              role === 'Shura' && currentAuthCheck.shuraQuorumMet
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                : 'bg-amber-950/50 border-amber-500/50 text-amber-300'
            }`}
          >
            <div className="flex items-center gap-1.5 truncate">
              {role === 'Shura' && currentAuthCheck.shuraQuorumMet ? (
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : (
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              )}
              <span className="truncate">
                {role === 'Shura'
                  ? `Shura Rule #42: Кворум ${currentAuthCheck.activeSignersCount}/3 подтвержден`
                  : `Внимание: Параметры превышают лимиты! Shura Rule #42 заблокирует Шаг 3`}
              </span>
            </div>

            {role !== 'Shura' && (
              <button
                onClick={() => setRole('Shura')}
                className="ml-2 px-2 py-0.5 rounded bg-amber-500 hover:bg-amber-400 text-black font-bold text-[10px] shrink-0 transition-colors"
              >
                Выбрать роль Шура
              </button>
            )}
          </div>
        )}

        {/* Collapsible Parameter Controls for Testing Rule #42 */}
        {showConfig && (
          <div className="p-3 mb-2 rounded-xl bg-slate-950/90 border border-cyan-800/60 space-y-2.5 text-xs font-mono">
            <div className="flex items-center justify-between text-slate-300 text-[11px] pb-1 border-b border-slate-800">
              <span className="font-bold text-white">Тестирование порогов Shura Rule #42</span>
              <span className="text-[10px] text-cyan-400">Роль: {role}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-blue-400" /> Люди:
                  </span>
                  <span className="text-white font-bold">{executionParams.peopleAffected}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="3000"
                  step="50"
                  value={executionParams.peopleAffected}
                  onChange={(e) =>
                    setExecutionParams({ peopleAffected: Number(e.target.value) })
                  }
                  className="w-full mt-1.5 accent-cyan-400"
                />
                <div className="text-[9px] text-slate-500 flex justify-between mt-0.5">
                  <span>10</span>
                  <span className="text-amber-400 font-bold">&gt;1000 = Шура</span>
                  <span>3000</span>
                </div>
              </div>

              <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Leaf className="w-3 h-3 text-emerald-400" /> CO2 (тонн):
                  </span>
                  <span className="text-white font-bold">{executionParams.co2Tons}т</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="1200"
                  step="25"
                  value={executionParams.co2Tons}
                  onChange={(e) => setExecutionParams({ co2Tons: Number(e.target.value) })}
                  className="w-full mt-1.5 accent-emerald-400"
                />
                <div className="text-[9px] text-slate-500 flex justify-between mt-0.5">
                  <span>5</span>
                  <span className="text-amber-400 font-bold">&gt;500т = Шура</span>
                  <span>1200</span>
                </div>
              </div>

              <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Coins className="w-3 h-3 text-amber-400" /> NUR бюджет:
                  </span>
                  <span className="text-white font-bold">{executionParams.nurAmount}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="3000"
                  step="50"
                  value={executionParams.nurAmount}
                  onChange={(e) => setExecutionParams({ nurAmount: Number(e.target.value) })}
                  className="w-full mt-1.5 accent-amber-400"
                />
                <div className="text-[9px] text-slate-500 flex justify-between mt-0.5">
                  <span>50</span>
                  <span className="text-amber-400 font-bold">&gt;1000 = Шура</span>
                  <span>3000</span>
                </div>
              </div>
            </div>

            {/* Shura Council Signers Toggle */}
            <div className="pt-2 border-t border-slate-800/80">
              <div className="text-[10px] text-slate-400 mb-1.5 flex items-center justify-between">
                <span>Подписи членов Совета Шуры (Кворум 3 из 5):</span>
                <span className="text-cyan-300 font-bold">
                  {shuraSigners.filter((s) => s.signed).length} / 5 Активно
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {shuraSigners.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => toggleShuraSignature(s.id)}
                    className={`px-2 py-1 rounded text-[9px] font-mono flex items-center gap-1 border transition-colors ${
                      s.signed
                        ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300'
                        : 'bg-slate-900 border-slate-700 text-slate-500'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${s.signed ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                    <span>{s.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 8-Step Pipeline Visual Flow */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 my-2.5">
          {flowSteps.map((step) => {
            const isCompleted = executionProgress >= (step.num / 8) * 100;
            const isCurrent = activeStepNum === step.num && isSimulatingExecution;

            return (
              <div
                key={step.num}
                className={`p-1.5 rounded-xl border text-center transition-all ${
                  isCurrent
                    ? 'bg-cyan-900/60 border-cyan-400 text-white shadow-[0_0_12px_rgba(0,212,255,0.4)] scale-105 animate-pulse'
                    : isCompleted
                    ? 'bg-slate-900/80 border-emerald-500/50 text-emerald-300'
                    : 'bg-slate-950/60 border-slate-800 text-slate-500'
                }`}
              >
                <div className="text-[9px] font-mono text-cyan-400/80">#{step.num}</div>
                <div className="text-[10px] font-bold truncate leading-tight">{step.label}</div>
                <div className="text-[8px] text-slate-400 truncate mt-0.5">{step.sub}</div>
              </div>
            );
          })}
        </div>

        {/* Status Line */}
        <div className="text-[11px] text-cyan-300/90 font-mono mb-1.5 flex items-center justify-between truncate">
          <span className="truncate">{executionStatus}</span>
          <span className="text-white font-bold ml-2 shrink-0">{executionProgress}%</span>
        </div>

        {/* Glowing Progress Bar */}
        <div className="w-full h-2 rounded-full bg-slate-900 border border-cyan-900/50 overflow-hidden relative">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              lastAuthorityResult && !lastAuthorityResult.passed
                ? 'bg-rose-500 shadow-[0_0_10px_#f43f5e]'
                : 'bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 shadow-[0_0_10px_#00D4FF]'
            }`}
            style={{ width: `${executionProgress}%` }}
          />
        </div>

        {/* Last Proof Display if generated */}
        {lastExecutionProof && (
          <div className="mt-2 px-2.5 py-1 rounded-lg bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between text-[10px] font-mono text-emerald-300">
            <span className="truncate">
              Последний хэш доказательства: <span className="font-bold">{lastExecutionProof.proofHash}</span>
            </span>
            <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-200 border border-emerald-500/40 ml-2 shrink-0">
              L5 PROVEN
            </span>
          </div>
        )}
      </div>

      {/* Footer Buttons */}
      <div className="mt-3 pt-2 border-t border-cyan-900/30 flex items-center gap-2">
        <button
          onClick={() => runExecutionSimulation()}
          disabled={isSimulatingExecution}
          className="flex-1 py-2 px-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-[11px] font-bold transition-all shadow-[0_0_12px_rgba(0,212,255,0.3)] flex items-center justify-center gap-1.5 disabled:opacity-50 active:scale-98"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{isSimulatingExecution ? 'Исполнение 8 шагов...' : 'Запустить 8-шаговый цикл'}</span>
        </button>

        <button
          onClick={() => setComposerModalOpen(true)}
          className="py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-800/50 text-[11px] font-mono transition-colors"
        >
          {t.executionWidget.open}
        </button>
      </div>
    </div>
  );
};
