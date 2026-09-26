import React, { useState } from 'react';
import {
  Brain,
  GitBranch,
  GitGraph,
  CheckCircle2,
  Bot,
} from 'lucide-react';
import { useOSStore } from '../../store/osStore';
import { EvidenceBadge } from '../common/EvidenceBadge';
import { TRANSLATIONS } from '../../data/translations';
import { ProductionLoop } from '../core/ProductionLoop';
import { IntentIngress } from '../intent/IntentIngress';
import { AgentInteractionWorkspace } from '../agent/AgentInteractionWorkspace';

import { WorkspaceLayout } from '../workspace/WorkspaceLayout';

export const MetaLogosPage: React.FC = () => {
  const { executionSteps, language } = useOSStore();
  const t = TRANSLATIONS[language];
  const [activeTab, setActiveTab] = useState<'workspace' | 'productionLoop' | 'orchestration'>('workspace');

  return (
    <div id="page-metalogos" className="space-y-4 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#07132b]/90 via-[#0a1b3a]/70 to-[#040a17]/90 border border-cyan-800/40 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <span>CORE DOMAIN 01</span>
            <span>•</span>
            <span>REASONING, ORCHESTRATION & AGENT WORKSPACE</span>
            <span>•</span>
            <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono text-[10px]">
              OPERATIONAL
            </span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <Brain className="w-6 h-6 text-cyan-400" />
            AI MetaLogos — Ядро рассуждений и локальная инженерная среда
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Двунаправленная инженерная среда управления (WebContainer LOCAL BROWSER RUNTIME), 7 ядер и оркестрация
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 rounded-xl bg-slate-900/90 border border-cyan-900/50">
          <button
            onClick={() => setActiveTab('workspace')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              activeTab === 'workspace'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(0,212,255,0.2)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            Среда Агента (Workspace)
          </button>
          <button
            onClick={() => setActiveTab('productionLoop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              activeTab === 'productionLoop'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(0,212,255,0.2)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <GitGraph className="w-3.5 h-3.5" />
            Петля Производства
          </button>
          <button
            onClick={() => setActiveTab('orchestration')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              activeTab === 'orchestration'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(0,212,255,0.2)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            8-Step Flow
          </button>
        </div>
      </div>

      {activeTab === 'workspace' ? (
        <WorkspaceLayout />
      ) : activeTab === 'productionLoop' ? (
        <ProductionLoop />
      ) : (
        <>
          {/* Interactive Intent Execution Workbench with Role & Shura Gate */}
          <IntentIngress />

          {/* 8-Step Execution Tree Trace */}
          <div className="rounded-2xl bg-gradient-to-b from-[#09152e]/80 to-[#040816]/90 border border-cyan-900/40 p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-cyan-900/40 pb-3">
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  8-Step End-to-End Execution Flow (Живой статус шагов)
                </h3>
              </div>
              <span className="text-xs font-mono text-cyan-300">
                {executionSteps.filter((s) => s.status === 'COMPLETED').length} / 8 Шагов завершено
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {executionSteps.map((step) => {
                const isCompleted = step.status === 'COMPLETED';
                const isInProgress = step.status === 'IN_PROGRESS';
                return (
                  <div
                    key={step.id}
                    className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                      isCompleted
                        ? 'bg-emerald-950/20 border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.1)]'
                        : isInProgress
                        ? 'bg-cyan-950/40 border-cyan-400/60 shadow-[0_0_12px_rgba(0,212,255,0.2)] animate-pulse'
                        : 'bg-slate-950/40 border-slate-800 text-slate-500'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono font-bold text-cyan-300">
                          ШАГ {step.step}
                        </span>
                        {step.evidenceLevel && (
                          <EvidenceBadge level={step.evidenceLevel} compact />
                        )}
                      </div>
                      <div className="text-xs font-bold text-white mb-0.5">{step.name}</div>
                      <span className="text-[10px] font-mono text-slate-400 block mb-2">
                        Семантика: {step.semantic}
                      </span>
                      <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                        {step.detail}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono">
                      <span
                        className={`font-semibold ${
                          isCompleted
                            ? 'text-emerald-400'
                            : isInProgress
                            ? 'text-cyan-300'
                            : 'text-slate-500'
                        }`}
                      >
                        {step.status}
                      </span>
                      {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
