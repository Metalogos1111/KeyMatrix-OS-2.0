import React, { useState } from 'react';
import {
  Compass,
  Layers,
  Cpu,
  CheckCircle2,
  GitBranch,
  Sparkles,
  ArrowRight,
  Shield,
  Activity,
  Zap,
  Repeat,
  FileCheck,
} from 'lucide-react';
import { useOSStore } from '../../store/osStore';
import { EvidenceBadge } from '../common/EvidenceBadge';

export type PipelineStage = 'DISCOVER' | 'COMPOSE' | 'EXECUTE' | 'VERIFY' | 'EVOLVE';

interface PipelineStepInfo {
  stage: PipelineStage;
  label: string;
  nativeLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description: string;
  subsystem: string;
  evidenceGate: string;
}

export const CapabilityFabric: React.FC = () => {
  const { domains, role, addLog } = useOSStore();
  const [activeStage, setActiveStage] = useState<PipelineStage>('DISCOVER');
  const [simulatedProgress, setSimulatedProgress] = useState(1);

  const pipelineStages: PipelineStepInfo[] = [
    {
      stage: 'DISCOVER',
      label: 'DISCOVER',
      nativeLabel: 'Поиск и Резолюция',
      icon: Compass,
      color: 'text-cyan-400 border-cyan-500/50 bg-cyan-950/40',
      description: 'Поиск семантических возможностей, проверка области полномочий (Authority Scope) и доступных адаптеров.',
      subsystem: 'MetaLogos & PrimeCore Resolution',
      evidenceGate: 'Level 1-2 Observed',
    },
    {
      stage: 'COMPOSE',
      label: 'COMPOSE',
      nativeLabel: 'Композиция Пайплайна',
      icon: Layers,
      color: 'text-blue-400 border-blue-500/50 bg-blue-950/40',
      description: 'Сборка адаптеров M00-M16 в исполняемый DAG-граф с внедрением этических инвариантов TawhidCore.',
      subsystem: 'MetaForge Composer DAG',
      evidenceGate: 'Level 3 Verified',
    },
    {
      stage: 'EXECUTE',
      label: 'EXECUTE',
      nativeLabel: 'Параллельное Исполнение',
      icon: Cpu,
      color: 'text-amber-400 border-amber-500/50 bg-amber-950/40',
      description: 'Запуск задач в изолированном TEE-анклаве (Casper TEE / WebAssembly Sandbox) с контролем лимитов.',
      subsystem: 'MindState & Execution Engine',
      evidenceGate: 'Zero Riba Invariant Checked',
    },
    {
      stage: 'VERIFY',
      label: 'VERIFY',
      nativeLabel: 'Криптографическая Верификация',
      icon: CheckCircle2,
      color: 'text-emerald-400 border-emerald-500/50 bg-emerald-950/40',
      description: 'Генерация ZK-доказательств, проверка консилиума Шуры (Shura Rule #42) и аудит неизменяемого журнала.',
      subsystem: 'Proof of Resonance (PoR) & Archivarius',
      evidenceGate: 'Level 4-5 Proven Cryptographic Hash',
    },
    {
      stage: 'EVOLVE',
      label: 'EVOLVE',
      nativeLabel: 'Эволюция и Начисление',
      icon: Sparkles,
      color: 'text-purple-400 border-purple-500/50 bg-purple-950/40',
      description: 'Обновление графа знаний, начисление вознаграждения NUR Value/Reward и адаптация следующего цикла.',
      subsystem: 'Singularity & NUR Value Engine',
      evidenceGate: 'Engagement != Value Signal Persisted',
    },
  ];

  const handleStepClick = (stage: PipelineStage, idx: number) => {
    setActiveStage(stage);
    setSimulatedProgress(idx + 1);
    addLog('SYSTEM', `Capability Fabric: Переход к фазе [${stage}] (${pipelineStages[idx].nativeLabel})`, 'info');
  };

  const currentInfo = pipelineStages.find((s) => s.stage === activeStage) || pipelineStages[0];

  return (
    <div className="w-full rounded-2xl bg-gradient-to-b from-[#08132b]/95 via-[#050e21]/95 to-[#020714]/98 border border-cyan-800/40 p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cyan-900/40 pb-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-0.5">
            <span>7 CORE CAPABILITY FABRIC</span>
            <span>•</span>
            <span>SECTION 01 MASTER MODEL 002</span>
            <span>•</span>
            <EvidenceBadge level={5} compact />
          </div>
          <h2 className="text-base font-bold text-white tracking-wide flex items-center gap-2 font-['Plus_Jakarta_Sans']">
            <Zap className="w-5 h-5 text-cyan-400" />
            Ткань Возможностей: DISCOVER → COMPOSE → EXECUTE → VERIFY → EVOLVE
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Канонический 5-фазный цикл выполнения для 7 ядер (MetaCore, MetaForge, MetaLogos, MindState, PrimeCore, Archivarius, Singularity)
          </p>
        </div>

        <div className="text-xs font-mono px-3 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-700/40 text-cyan-300">
          Активная роль: <span className="font-bold text-white">{role}</span>
        </div>
      </div>

      {/* 5-Step Pipeline Flow Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
        {pipelineStages.map((step, idx) => {
          const Icon = step.icon;
          const isCurrent = activeStage === step.stage;
          const isPassed = idx < simulatedProgress;

          return (
            <button
              key={step.stage}
              onClick={() => handleStepClick(step.stage, idx)}
              className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                isCurrent
                  ? 'bg-slate-900/90 border-cyan-400 shadow-[0_0_15px_rgba(0,212,255,0.3)] scale-[1.02]'
                  : isPassed
                  ? 'bg-slate-950/80 border-cyan-900/60 text-slate-300 hover:border-cyan-600/50'
                  : 'bg-slate-950/40 border-slate-800 text-slate-500 opacity-80 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-cyan-400 font-bold">0{idx + 1}</span>
                <span
                  className={`w-6 h-6 rounded-lg flex items-center justify-center border text-xs ${step.color}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </span>
              </div>

              <div>
                <div className="text-xs font-bold font-mono text-white tracking-wider">{step.label}</div>
                <div className="text-[10px] text-slate-400 mt-0.5 truncate">{step.nativeLabel}</div>
              </div>

              <div className="mt-2 pt-2 border-t border-slate-800/80 text-[9px] font-mono text-slate-500 truncate">
                {step.subsystem}
              </div>

              {isCurrent && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Detailed Inspection Box for Selected Phase */}
      <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-900/40 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-8 space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono font-bold">
              ФАЗА {currentInfo.label}
            </span>
            <span className="text-xs font-bold text-white">{currentInfo.nativeLabel}</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{currentInfo.description}</p>
          <div className="flex flex-wrap gap-2 text-[10px] font-mono pt-1">
            <span className="text-slate-400">Подсистема:</span>
            <span className="text-cyan-300 font-bold">{currentInfo.subsystem}</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">Шлюз доказательств:</span>
            <span className="text-emerald-400 font-bold">{currentInfo.evidenceGate}</span>
          </div>
        </div>

        <div className="md:col-span-4 flex flex-col justify-center items-end p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-right font-mono text-[11px] space-y-1">
          <div className="text-slate-400">Связанные ядра (7 Cores):</div>
          <div className="text-cyan-200 font-bold truncate max-w-full">
            {domains.map((d) => d.name).slice(0, 4).join(' • ')}
          </div>
          <div className="text-[10px] text-amber-400">Proof of Resonance: HIGH (786)</div>
        </div>
      </div>
    </div>
  );
};
