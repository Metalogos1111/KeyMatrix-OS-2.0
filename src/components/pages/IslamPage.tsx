import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Layers,
  Heart,
  Users,
  BookOpen,
  Sun,
  DollarSign,
  Leaf,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { useOSStore } from '../../store/osStore';
import { IslamicTopic } from '../../types';
import { EvidenceBadge } from '../common/EvidenceBadge';
import { getLocalizedFoundations, LOCALIZED_FOUNDATIONS_UI } from '../../data/localizedContent';

export const IslamPage: React.FC = () => {
  const { selectedTopic, selectTopic, language, addLog } = useOSStore();
  
  const foundationsList = getLocalizedFoundations(language);
  const ui = LOCALIZED_FOUNDATIONS_UI[language] || LOCALIZED_FOUNDATIONS_UI.EN;

  const [activeItemId, setActiveItemId] = useState<string>(
    selectedTopic?.id || foundationsList[0].id
  );

  // Sync if selectedTopic changes externally
  useEffect(() => {
    if (selectedTopic?.id && selectedTopic.id !== activeItemId) {
      setActiveItemId(selectedTopic.id);
    }
  }, [selectedTopic]);

  const activeItem: IslamicTopic =
    foundationsList.find((item) => item.id === activeItemId) || foundationsList[0];

  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return Sparkles;
      case 'Layers':
        return Layers;
      case 'Heart':
        return Heart;
      case 'Users':
        return Users;
      case 'BookOpen':
        return BookOpen;
      case 'Sun':
        return Sun;
      case 'DollarSign':
        return DollarSign;
      case 'Leaf':
        return Leaf;
      default:
        return Sparkles;
    }
  };

  const handleSelect = (item: IslamicTopic) => {
    setActiveItemId(item.id);
    selectTopic(item);
    addLog('AI', `Foundations of Islam: [${item.title}]`, 'info');
  };

  return (
    <div id="page-islam" className="space-y-4 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#07132b]/90 via-[#0a1b3a]/70 to-[#040a17]/90 border border-cyan-800/40 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <span>M00 ETHICAL BASE</span>
            <span>•</span>
            <span>CORE VALUES &amp; SHARIAH HARMONY</span>
            <span>•</span>
            <EvidenceBadge level={5} compact />
          </div>
          <h1 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-400" />
            {ui.pageTitle}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {ui.pageSubtitle}
          </p>
        </div>
      </div>

      {/* 2-Column: Left cards list (8 modules), Right detailed view */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left 8 Foundational Cards (Col 5) */}
        <div className="lg:col-span-5 space-y-2">
          {foundationsList.map((item) => {
            const Icon = getTopicIcon(item.icon);
            const isSelected = activeItem.id === item.id;
            return (
              <button
                key={item.id}
                id={`islam-topic-card-${item.id}`}
                onClick={() => handleSelect(item)}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between group ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-950/90 to-blue-950/70 border-cyan-400 shadow-[0_0_15px_rgba(0,212,255,0.25)] text-white'
                    : 'bg-[#09152e]/70 border-cyan-900/30 text-slate-300 hover:bg-slate-900/80 hover:border-cyan-800/50'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`p-2 rounded-xl transition-colors ${
                      isSelected
                        ? 'bg-cyan-500/20 text-cyan-300 shadow-[0_0_10px_rgba(0,212,255,0.3)]'
                        : 'bg-slate-900 text-amber-400/90 group-hover:bg-amber-500/10'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                  </div>
                  <div className="truncate">
                    <div className="text-sm font-semibold truncate">{item.title}</div>
                    <div className="text-[11px] text-slate-400 truncate">{item.subtitle}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/80 border border-slate-700 text-slate-400">
                    {item.category}
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? 'text-cyan-400 translate-x-0.5' : 'text-slate-600 group-hover:text-cyan-400'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Active Topic Detail (Col 7) */}
        <div className="lg:col-span-7 rounded-2xl bg-gradient-to-b from-[#09152e]/90 to-[#040816]/95 border border-cyan-800/40 p-6 shadow-xl flex flex-col justify-between min-h-[500px]">
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-cyan-900/50 pb-4">
              <div className="flex items-center gap-3">
                {(() => {
                  const Icon = getTopicIcon(activeItem.icon);
                  return (
                    <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(0,212,255,0.3)]">
                      <Icon className="w-6 h-6" />
                    </div>
                  );
                })()}
                <div>
                  <h2 className="text-lg font-bold text-white tracking-wide">{activeItem.title}</h2>
                  <span className="text-xs text-amber-400/90 font-mono">{activeItem.subtitle}</span>
                </div>
              </div>
              <EvidenceBadge level={activeItem.evidenceLevel} />
            </div>

            {/* Main Content */}
            <div className="p-4 rounded-xl bg-slate-900/50 border border-cyan-900/30 text-sm text-slate-200 leading-relaxed whitespace-pre-line">
              {activeItem.content}
            </div>

            {/* Canonical Sources & Proofs */}
            <div>
              <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                {ui.sourcesTitle}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeItem.sources.map((source, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-950/60 border border-cyan-900/40 flex items-center justify-between text-xs"
                  >
                    <span className="text-slate-300 font-mono">{source}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* AI Shariah Alignment Box */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/30 to-blue-950/30 border border-cyan-800/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                {ui.architectureBoxTitle}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {ui.architectureBoxDesc}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-cyan-900/40 flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>{ui.footerLayer}</span>
            <span>{ui.footerStatus}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
