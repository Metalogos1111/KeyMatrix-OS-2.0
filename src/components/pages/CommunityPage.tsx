import React, { useState } from 'react';
import {
  Users,
  Vote,
  Heart,
  Scale,
} from 'lucide-react';
import { useOSStore } from '../../store/osStore';
import { EvidenceBadge } from '../common/EvidenceBadge';
import { TRANSLATIONS } from '../../data/translations';
import { FamilyCore } from '../civilization/FamilyCore';
import { ShuraGovernanceDashboard } from '../governance/ShuraGovernanceDashboard';

export const CommunityPage: React.FC = () => {
  const { language } = useOSStore();
  const t = TRANSLATIONS[language];
  const [activeTab, setActiveTab] = useState<'shura' | 'family'>('shura');

  return (
    <div id="page-community" className="space-y-4 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#07132b]/90 via-[#0a1b3a]/70 to-[#040a17]/90 border border-cyan-800/40 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <span>M10 POLICY & GOVERNANCE</span>
            <span>•</span>
            <span>SHURA & FAMILY WILAYAH LAYER</span>
            <span>•</span>
            <EvidenceBadge level={5} compact />
          </div>
          <h1 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <Scale className="w-6 h-6 text-amber-400" />
            Сообщество, Совет Шуры & Семья
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            M10 Governance Engine v1: 6 Палат Совета НУР, 6-ступенчатый поток решений, этическая матрица 786 и пирамида политик
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 rounded-xl bg-slate-900/90 border border-cyan-900/50 shrink-0">
          <button
            onClick={() => setActiveTab('shura')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              activeTab === 'shura'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(0,212,255,0.2)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Vote className="w-3.5 h-3.5" />
            Совет Шуры (M10)
          </button>
          <button
            onClick={() => setActiveTab('family')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              activeTab === 'family'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(0,212,255,0.2)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-pink-400" />
            Семья и Опекунство
          </button>
        </div>
      </div>

      {activeTab === 'family' ? (
        <FamilyCore />
      ) : (
        <ShuraGovernanceDashboard />
      )}
    </div>
  );
};
