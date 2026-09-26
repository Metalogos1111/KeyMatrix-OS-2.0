import React, { useState } from 'react';
import {
  Scale,
  Users,
  GitPullRequest,
  Layers,
  Sparkles,
  Vote,
  ShieldCheck,
  Award,
  BookOpen,
} from 'lucide-react';
import { EvidenceBadge } from '../common/EvidenceBadge';
import { NurCouncil } from './NurCouncil';
import { DecisionFlow } from './DecisionFlow';
import { PolicyEngine } from './PolicyEngine';
import { EthicalMatrix } from './EthicalMatrix';
import { ProposalSystem } from './ProposalSystem';
import { GovernanceMetricsPanel } from './GovernanceMetricsPanel';

export type ShuraSubTab =
  | 'councils'
  | 'decisionFlow'
  | 'proposals'
  | 'policyPyramid'
  | 'ethicalMatrix'
  | 'metricsRules';

export const ShuraGovernanceDashboard: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<ShuraSubTab>('proposals');

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Sub-Navigation Bar */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900/90 border border-cyan-900/50 shadow-lg">
        <button
          onClick={() => setActiveSubTab('proposals')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
            activeSubTab === 'proposals'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(0,212,255,0.2)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Vote className="w-3.5 h-3.5" />
          Инициативы и Голосование
        </button>

        <button
          onClick={() => setActiveSubTab('councils')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
            activeSubTab === 'councils'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(0,212,255,0.2)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          6 Палат Совета НУР
        </button>

        <button
          onClick={() => setActiveSubTab('decisionFlow')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
            activeSubTab === 'decisionFlow'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(0,212,255,0.2)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <GitPullRequest className="w-3.5 h-3.5" />
          6-Step Decision Flow
        </button>

        <button
          onClick={() => setActiveSubTab('policyPyramid')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
            activeSubTab === 'policyPyramid'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(0,212,255,0.2)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Пирамида Политик
        </button>

        <button
          onClick={() => setActiveSubTab('ethicalMatrix')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
            activeSubTab === 'ethicalMatrix'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(0,212,255,0.2)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Матрица 786 TawhidCore
        </button>

        <button
          onClick={() => setActiveSubTab('metricsRules')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
            activeSubTab === 'metricsRules'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(0,212,255,0.2)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          Метрики & 6 Правил
        </button>
      </div>

      {/* Tab Views */}
      {activeSubTab === 'proposals' && <ProposalSystem />}
      {activeSubTab === 'councils' && <NurCouncil />}
      {activeSubTab === 'decisionFlow' && <DecisionFlow />}
      {activeSubTab === 'policyPyramid' && <PolicyEngine />}
      {activeSubTab === 'ethicalMatrix' && <EthicalMatrix />}
      {activeSubTab === 'metricsRules' && <GovernanceMetricsPanel />}

      {/* Persistent Fail-Safe Bottom Mini Strip when on other tabs */}
      {activeSubTab !== 'metricsRules' && (
        <div className="pt-2">
          <GovernanceMetricsPanel />
        </div>
      )}
    </div>
  );
};
