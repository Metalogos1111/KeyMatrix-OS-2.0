import React from 'react';
import { ToolDescriptor } from '../../types/agentTypes';
import { Search, FolderGit2, Terminal, Calculator, Globe, Waves } from 'lucide-react';

interface ToolCardProps {
  tool: ToolDescriptor;
  onSelect: () => void;
}

const TOOL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  WEB_SEARCH: Search,
  FILES: FolderGit2,
  TERMINAL: Terminal,
  COMPUTE: Calculator,
  API: Globe,
  SANDBOX: Waves,
};

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onSelect }) => {
  const Icon = TOOL_ICONS[tool.category] || Terminal;

  return (
    <div className="p-3 rounded-xl bg-[#071329]/80 border border-cyan-900/40 hover:border-cyan-500/50 transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-slate-900 text-cyan-400 border border-cyan-500/20">
              <Icon className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-white">{tool.name}</span>
          </div>

          <span
            className={`text-[9px] font-mono px-1.5 py-0.5 rounded border uppercase font-semibold ${
              tool.riskLevel === 'HIGH'
                ? 'bg-red-500/20 text-red-300 border-red-500/40'
                : tool.riskLevel === 'MEDIUM'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
            }`}
          >
            {tool.riskLevel} RISK
          </span>
        </div>

        <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2 mb-2">
          {tool.description}
        </p>
      </div>

      <div className="pt-2 border-t border-cyan-900/30 flex items-center justify-between text-[10px]">
        <span className="font-mono text-cyan-400">{tool.capabilityRequired}</span>
        <span className="font-mono px-1.5 py-0.5 rounded bg-black/50 text-slate-400 border border-slate-800">
          {tool.status}
        </span>
      </div>
    </div>
  );
};
