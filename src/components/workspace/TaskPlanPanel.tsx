import React from 'react';
import { useWorkspaceStore } from '../../store/workspaceStore';
import {
  GitBranch,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  Activity,
} from 'lucide-react';

export const TaskPlanPanel: React.FC = () => {
  const { buildLoop, startBuildLoop, cancelBuildLoop } = useWorkspaceStore();

  const handleStartLoop = async () => {
    await startBuildLoop('Автоматический запуск сборки и верификации проекта', 'task-build-loop-01');
  };

  const steps = [
    { key: 'PLAN', label: '1. PLAN (План)' },
    { key: 'EXECUTE', label: '2. EXECUTE (Сборка)' },
    { key: 'OBSERVE', label: '3. OBSERVE (Наблюдение)' },
    { key: 'ANALYZE', label: '4. ANALYZE (Анализ)' },
    { key: 'PATCH', label: '5. PATCH (Патч)' },
    { key: 'RE-RUN', label: '6. RE-RUN (Повтор)' },
    { key: 'VERIFY_RESULT', label: '7. VERIFY (Проверка)' },
    { key: 'COMPLETE', label: '8. COMPLETE (Успех)' },
  ];

  return (
    <div className="p-3 bg-slate-900/90 border-b border-cyan-900/40 font-mono text-xs text-slate-300 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-cyan-400" />
          <span className="font-bold text-white uppercase tracking-wider">
            Build Repair Loop (MetaForge Agent)
          </span>
        </div>

        {buildLoop ? (
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-700/50 text-[10px] font-bold">
              Попытка {buildLoop.currentAttempt} / {buildLoop.maxAttempts}
            </span>
            <button
              onClick={cancelBuildLoop}
              className="p-1 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-bold"
            >
              Сброс
            </button>
          </div>
        ) : (
          <button
            onClick={handleStartLoop}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all font-bold text-[11px]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Запустить Loop
          </button>
        )}
      </div>

      {/* Loop Progress Bar */}
      {buildLoop && (
        <div className="space-y-2">
          <div className="grid grid-cols-4 gap-1">
            {steps.map((step) => {
              const isCurrent = buildLoop.phase === step.key;
              const isDone =
                buildLoop.phase === 'COMPLETE' ||
                (steps.findIndex((s) => s.key === buildLoop.phase) > steps.findIndex((s) => s.key === step.key));

              return (
                <div
                  key={step.key}
                  className={`p-1.5 rounded border text-[10px] font-bold transition-all text-center ${
                    isDone
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                      : isCurrent
                      ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300 animate-pulse shadow-[0_0_8px_rgba(0,212,255,0.2)]'
                      : 'bg-slate-950/40 border-slate-800 text-slate-600'
                  }`}
                >
                  {step.label}
                </div>
              );
            })}
          </div>

          {buildLoop.lastError && (
            <div className="p-2 rounded bg-rose-950/40 border border-rose-800/40 text-[11px] text-rose-300 flex items-start gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
              <div className="break-all font-mono">{buildLoop.lastError}</div>
            </div>
          )}

          {buildLoop.proposedPatch && (
            <div className="p-2 rounded bg-amber-950/30 border border-amber-700/40 text-[11px] text-amber-200 font-mono space-y-1">
              <div className="font-bold uppercase text-amber-400">Предложенный патч:</div>
              <div>Файл: {buildLoop.proposedPatch.filePath}</div>
              <div className="text-slate-400">{buildLoop.proposedPatch.description}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
