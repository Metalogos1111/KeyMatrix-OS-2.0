import React from 'react';
import { ToolDescriptor, RiskLevel } from '../../types/agentTypes';
import { AlertTriangle, ShieldCheck, CheckCircle2, XCircle } from 'lucide-react';

interface ToolInvocationPreviewModalProps {
  tool: ToolDescriptor;
  taskId: string;
  onAllowOnce: () => void;
  onAllowForTask: () => void;
  onDeny: () => void;
}

export const ToolInvocationPreviewModal: React.FC<ToolInvocationPreviewModalProps> = ({
  tool,
  taskId,
  onAllowOnce,
  onAllowForTask,
  onDeny,
}) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tool-confirm-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
    >
      <div className="w-full max-w-md rounded-2xl bg-[#081226] border border-amber-500/50 p-5 shadow-[0_0_30px_rgba(245,158,11,0.2)] text-white space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-amber-500/20 pb-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-amber-400 tracking-wider uppercase font-bold block">
              TOOL REQUEST CONFIRMATION (SIMULATION GATE)
            </span>
            <h3 id="tool-confirm-title" className="text-sm font-bold text-white">
              Разрешить выполнение инструмента?
            </h3>
          </div>
        </div>

        {/* Tool Info Box */}
        <div className="p-3 rounded-xl bg-black/40 border border-cyan-950 space-y-2 text-xs font-mono">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Tool:</span>
            <span className="text-cyan-300 font-bold">{tool.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Capability:</span>
            <span className="text-slate-200">{tool.capabilityRequired}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Mode:</span>
            <span className="text-blue-300">{tool.executionMode || 'LOCAL_SANDBOX_SIMULATED'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Risk:</span>
            <span className="text-rose-400 font-bold">{tool.riskLevel}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Task ID:</span>
            <span className="text-slate-300">{taskId}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Simulation:</span>
            <span className="text-emerald-400 font-bold">YES (Isolated Container)</span>
          </div>
        </div>

        {/* Warning Policy Statement */}
        <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-800/30 text-[11px] text-amber-200/90 leading-relaxed">
          Внимание: Разрешение выполнения в интерфейсе симулятора действует исключительно внутри локальной песочницы и <strong>не является криптографическим кворумом или институциональным мандатом</strong>.
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-xs">
          <button
            type="button"
            onClick={onAllowOnce}
            className="py-2.5 px-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-black font-bold transition-colors flex items-center justify-center gap-1 shadow-md"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="text-[10px]">ALLOW ONCE</span>
          </button>
          <button
            type="button"
            onClick={onAllowForTask}
            className="py-2.5 px-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors flex items-center justify-center gap-1 shadow-md"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="text-[10px]">FOR TASK</span>
          </button>
          <button
            type="button"
            onClick={onDeny}
            className="py-2.5 px-2 rounded-xl bg-rose-950 hover:bg-rose-900 border border-rose-700/60 text-rose-300 font-bold transition-colors flex items-center justify-center gap-1"
          >
            <XCircle className="w-3.5 h-3.5" />
            <span className="text-[10px]">DENY</span>
          </button>
        </div>
      </div>
    </div>
  );
};
