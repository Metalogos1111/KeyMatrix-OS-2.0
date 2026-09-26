import React from 'react';
import { ToolDescriptor, RiskLevel } from '../../types/agentTypes';
import {
  Search,
  FolderLock,
  Terminal,
  Calculator,
  Globe2,
  Activity,
  AlertTriangle,
  ShieldCheck,
  Check,
  X,
  Sparkles,
} from 'lucide-react';

interface ChatToolPaletteProps {
  tools: ToolDescriptor[];
  selectedToolIds: string[];
  onToggleTool: (toolId: string) => void;
  onClose: () => void;
  isMobile?: boolean;
}

const TOOL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'tool-web-search': Search,
  'tool-files': FolderLock,
  'tool-terminal': Terminal,
  'tool-compute': Calculator,
  'tool-api': Globe2,
  'tool-por-sandbox': Activity,
};

const RISK_BADGES: Record<RiskLevel, { label: string; className: string }> = {
  LOW: { label: 'LOW RISK', className: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/40' },
  MEDIUM: { label: 'MEDIUM RISK', className: 'text-amber-400 bg-amber-950/40 border-amber-800/40' },
  HIGH: { label: 'HIGH RISK', className: 'text-rose-400 bg-rose-950/40 border-rose-800/40' },
  CRITICAL: { label: 'CRITICAL', className: 'text-red-400 bg-red-950/40 border-red-800/40' },
};

const STATUS_BADGES: Record<string, { label: string; className: string }> = {
  AVAILABLE: { label: 'AVAILABLE (LOCAL)', className: 'text-emerald-400 border-emerald-700/50 bg-emerald-950/40' },
  SIMULATED: { label: 'SIMULATED', className: 'text-cyan-300 border-cyan-700/50 bg-cyan-950/40' },
  'LOCAL SANDBOX': { label: 'LOCAL SANDBOX', className: 'text-blue-300 border-blue-700/50 bg-blue-950/40' },
  'DIAGNOSTIC ONLY': { label: 'DIAGNOSTIC ONLY', className: 'text-purple-300 border-purple-700/50 bg-purple-950/40' },
  DISABLED: { label: 'DISABLED', className: 'text-slate-500 border-slate-700 bg-slate-900/60' },
  BLOCKED: { label: 'BLOCKED', className: 'text-rose-400 border-rose-800 bg-rose-950/60' },
};

export const ChatToolPalette: React.FC<ChatToolPaletteProps> = ({
  tools,
  selectedToolIds,
  onToggleTool,
  onClose,
  isMobile = false,
}) => {
  return (
    <div
      role="dialog"
      aria-label="Палитра инструментов MetaLogos"
      className={`${
        isMobile
          ? 'fixed inset-x-0 bottom-0 z-50 rounded-t-2xl max-h-[85vh] overflow-y-auto'
          : 'absolute bottom-full left-0 mb-2 w-96 rounded-2xl shadow-2xl'
      } bg-[#061026] border border-cyan-500/40 p-4 text-white z-40 backdrop-blur-xl animate-fade-in`}
    >
      {/* Palette Header */}
      <div className="flex items-center justify-between border-b border-cyan-900/40 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              Инструменты чата (Chat Tools)
            </h3>
            <span className="text-[10px] text-slate-400">
              Выберите инструмент(ы) для выполнения в задаче
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Закрыть палитру инструментов"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tool List */}
      <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1 custom-scrollbar">
        {tools.map((tool) => {
          const Icon = TOOL_ICONS[tool.toolId] || Sparkles;
          const isSelected = selectedToolIds.includes(tool.toolId);
          const isDisabled = tool.status === 'DISABLED' || tool.status === 'BLOCKED';
          const riskInfo = RISK_BADGES[tool.riskLevel] || RISK_BADGES.LOW;
          const statusInfo = STATUS_BADGES[tool.status] || {
            label: tool.status,
            className: 'text-slate-400 border-slate-700 bg-slate-900',
          };

          return (
            <button
              key={tool.toolId}
              type="button"
              disabled={isDisabled}
              onClick={() => onToggleTool(tool.toolId)}
              className={`w-full text-left p-2.5 rounded-xl border transition-all flex flex-col gap-1.5 relative ${
                isSelected
                  ? 'bg-cyan-950/70 border-cyan-400 shadow-[0_0_12px_rgba(0,212,255,0.2)]'
                  : isDisabled
                  ? 'bg-slate-950/40 border-slate-800/60 opacity-60 cursor-not-allowed'
                  : 'bg-[#09152f]/90 hover:bg-[#0d1e44] border-cyan-950 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`p-1.5 rounded-lg border ${
                      isSelected
                        ? 'bg-cyan-500 text-black border-cyan-400'
                        : 'bg-slate-900 text-cyan-400 border-cyan-500/20'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white tracking-wide block">
                      {tool.name}
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400/90 block">
                      {tool.capabilityRequired}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded border uppercase font-semibold ${statusInfo.className}`}
                  >
                    {statusInfo.label}
                  </span>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-cyan-500 text-black flex items-center justify-center font-bold">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                {tool.description}
              </p>

              <div className="flex items-center justify-between pt-1 border-t border-cyan-950 text-[10px] font-mono">
                <span className={`px-1.5 py-0.5 rounded border text-[9px] font-semibold ${riskInfo.className}`}>
                  {riskInfo.label}
                </span>

                <span className="text-slate-500 text-[10px]">
                  Режим: <span className="text-slate-300">{tool.executionMode || tool.status}</span>
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Palette Footer Notice */}
      <div className="mt-3 pt-2 border-t border-cyan-900/40 text-[10px] font-mono text-slate-400 flex items-center justify-between">
        <span className="text-amber-400/90">Статус: Local Simulation Only</span>
        <span className="text-slate-500">Выбрано: {selectedToolIds.length}</span>
      </div>
    </div>
  );
};
