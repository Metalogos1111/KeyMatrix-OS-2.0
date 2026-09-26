import React, { useState, useEffect } from 'react';
import {
  GitGraph,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Clock,
  Zap,
  Shield,
  Layers,
  Sparkles,
  ArrowRight,
  Cpu,
  RefreshCw,
} from 'lucide-react';
import { EvidenceBadge } from '../common/EvidenceBadge';
import { useOSStore } from '../../store/osStore';

interface GraphNode {
  id: string;
  name: string;
  category: 'PLAN' | 'AUTHORITY' | 'EXECUTE' | 'VERIFY' | 'STATE';
  status: 'IDLE' | 'ACTIVE' | 'COMPLETED';
  desc: string;
  parallelTracks?: string[];
}

const PRODUCTION_GRAPH_NODES: GraphNode[] = [
  {
    id: 'n1',
    name: '1. MISSION',
    category: 'PLAN',
    status: 'COMPLETED',
    desc: 'Глобальная цель и намерение пользователя (Declarative Intent).',
  },
  {
    id: 'n2',
    name: '2. TASK GRAPH',
    category: 'PLAN',
    status: 'COMPLETED',
    desc: 'Декомпозиция намерения в направленный ациклический граф (DAG).',
    parallelTracks: ['DAG: Core Subtasks', 'DAG: Security Gates', 'DAG: Value Impact'],
  },
  {
    id: 'n3',
    name: '3. IDENTITY / AUTHORITY',
    category: 'AUTHORITY',
    status: 'COMPLETED',
    desc: 'Проверка криптографического DID и прав доступа (Identity ≠ Authority).',
  },
  {
    id: 'n4',
    name: '4. CAPABILITY RESOLUTION',
    category: 'AUTHORITY',
    status: 'COMPLETED',
    desc: 'Динамическое сопоставление инструментов M00-M16 и 7 Core доменов.',
  },
  {
    id: 'n5',
    name: '5. PARALLEL EXECUTION',
    category: 'EXECUTE',
    status: 'ACTIVE',
    desc: 'Параллельное исполнение задач на независимых рабочих потоках (Worker Threads).',
    parallelTracks: ['Worker α: Zero-Riba Ledger', 'Worker β: TEE Sandbox', 'Worker γ: Caspian Telemetry'],
  },
  {
    id: 'n6',
    name: '6. EVIDENCE MESH',
    category: 'VERIFY',
    status: 'ACTIVE',
    desc: 'Сбор криптографических доказательств и хэшей по Evidence Ladder (1-5).',
  },
  {
    id: 'n7',
    name: '7. VERIFICATION',
    category: 'VERIFY',
    status: 'IDLE',
    desc: 'Формальная проверка инвариантов Шуры и математических гейтов.',
  },
  {
    id: 'n8',
    name: '8. STATE PROJECTION',
    category: 'STATE',
    status: 'IDLE',
    desc: 'Атомарное применение изменений в глобальный контекст и IndexedDB.',
  },
  {
    id: 'n9',
    name: '9. VALUE / IMPACT',
    category: 'STATE',
    status: 'IDLE',
    desc: 'Оценка полезного эффекта (Engagement ≠ Value) и расчет NUR.',
  },
  {
    id: 'n10',
    name: '10. DEPENDENCY UPDATE',
    category: 'PLAN',
    status: 'IDLE',
    desc: 'Каскадное обновление графа зависимостей и разблокировка следующих шагов.',
  },
  {
    id: 'n11',
    name: '11. AUTO NEXT-TASK SELECTION',
    category: 'PLAN',
    status: 'IDLE',
    desc: 'Автоматический выбор следующего параллельного пакета задач → Замыкание петли.',
  },
];

export const ProductionLoop: React.FC = () => {
  const { addLog } = useOSStore();
  const [nodes, setNodes] = useState<GraphNode[]>(PRODUCTION_GRAPH_NODES);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(4);
  const [loopCycleCount, setLoopCycleCount] = useState<number>(1);

  useEffect(() => {
    let timer: any;
    if (isRunning) {
      timer = setInterval(() => {
        setCurrentStepIdx((prev) => {
          const next = (prev + 1) % nodes.length;
          if (next === 0) {
            setLoopCycleCount((c) => c + 1);
            addLog('INTENT', `Завершен цикл петли производства #${loopCycleCount}. Переход на следующий пакет.`, 'success');
          }
          return next;
        });
      }, 1500);
    }
    return () => clearInterval(timer);
  }, [isRunning, loopCycleCount, nodes.length, addLog]);

  const handleToggleRunning = () => {
    setIsRunning(!isRunning);
    addLog('INTENT', !isRunning ? 'Параллельный производственный цикл запущен' : 'Цикл приостановлен', 'info');
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentStepIdx(0);
    setLoopCycleCount(1);
    addLog('INTENT', 'Сброс производственного цикла', 'info');
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header Info */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0b1736]/90 via-[#071026]/80 to-[#040816]/95 border border-cyan-800/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <span>KEYMATRIX MASTER MODEL 002</span>
            <span>•</span>
            <span>SECTION 14: PARALLEL GRAPH PRODUCTION MECHANISM</span>
            <span>•</span>
            <EvidenceBadge level={5} compact />
          </div>
          <h2 className="text-base font-bold text-white tracking-wide flex items-center gap-2">
            <GitGraph className="w-5 h-5 text-cyan-400" />
            Петля Графового Производства (Graph-based Parallel Engine)
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Переход от линейного одногейтового выполнения к динамическому параллельному графу задач и сетке доказательств
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-cyan-900/50 font-mono text-xs text-cyan-300">
            Цикл петли: <strong className="text-amber-400 font-bold">#{loopCycleCount}</strong>
          </div>
          <button
            onClick={handleToggleRunning}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-1.5 ${
              isRunning
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 shadow-[0_0_12px_rgba(0,212,255,0.25)]'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-3.5 h-3.5" /> Пауза
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" /> Запустить петлю
              </>
            )}
          </button>
          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Production Loop Parallel Flow Nodes */}
      <div className="p-5 rounded-2xl bg-gradient-to-b from-[#09152e]/80 to-[#040816]/90 border border-cyan-900/40 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-cyan-900/40 pb-2">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            11-Стадийный Замкнутый Граф Производства
          </span>
          <span className="text-[10px] font-mono text-slate-400">
            Текущая фаза: <strong className="text-white">{nodes[currentStepIdx].name}</strong>
          </span>
        </div>

        {/* 11 Nodes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {nodes.map((n, idx) => {
            const isCurrent = currentStepIdx === idx;
            const isPast = currentStepIdx > idx;

            return (
              <div
                key={n.id}
                className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-cyan-950/60 border-cyan-400 ring-2 ring-cyan-400/50 shadow-[0_0_15px_rgba(0,212,255,0.25)]'
                    : isPast
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-slate-300'
                    : 'bg-slate-950/60 border-slate-800/80 opacity-70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono font-bold mb-1">
                    <span className={isCurrent ? 'text-cyan-300' : isPast ? 'text-emerald-300' : 'text-slate-400'}>
                      {n.name}
                    </span>
                    {isPast ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : isCurrent ? (
                      <RefreshCw className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                    ) : null}
                  </div>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-400 inline-block mb-1.5">
                    {n.category}
                  </span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{n.desc}</p>

                  {n.parallelTracks && (
                    <div className="mt-2 pt-2 border-t border-slate-900 space-y-1">
                      <span className="text-[9px] font-mono text-amber-400 block uppercase font-bold">
                        Параллельные потоки:
                      </span>
                      {n.parallelTracks.map((trk, i) => (
                        <div
                          key={i}
                          className="text-[10px] font-mono text-cyan-300 bg-black/40 px-2 py-0.5 rounded border border-cyan-950 flex items-center gap-1"
                        >
                          <Zap className="w-2.5 h-2.5 text-amber-400 shrink-0" />
                          <span className="truncate">{trk}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/60 text-[10px] font-mono text-right">
                  {isCurrent ? (
                    <span className="text-cyan-400 font-bold animate-pulse">● ВЫПОЛНЕНИЕ</span>
                  ) : isPast ? (
                    <span className="text-emerald-400 font-bold">✓ СВЕДЕНО В СЕТКУ</span>
                  ) : (
                    <span className="text-slate-600">ОЖИДАНИЕ</span>
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
