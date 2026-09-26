import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Heart,
  Users,
  BookOpen,
  Sun,
  DollarSign,
  Leaf,
  HelpCircle,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useOSStore } from '../../store/osStore';
import { TRANSLATIONS, getNestedTranslation } from '../../data/translations';
import { getLocalizedFoundations, getLocalizedFaqs } from '../../data/localizedContent';
import { IslamicTopic, IslamicFAQ } from '../../types';
import { EvidenceBadge } from '../common/EvidenceBadge';

export const RightSidebar: React.FC = () => {
  const { language, selectTopic, selectFaq, setActiveSection, addLog } = useOSStore();
  const dict = TRANSLATIONS[language] || TRANSLATIONS.EN;
  const t = (k: string) => getNestedTranslation(language, k);
  const foundationsList = getLocalizedFoundations(language);
  const faqData = getLocalizedFaqs(language);

  const [activeTopic, setActiveTopic] = useState<IslamicTopic | null>(null);
  const [activeFaq, setActiveFaq] = useState<IslamicFAQ | null>(null);

  const islamicCards = [
    { id: 'iman', key: 'faith', titleKey: 'islam.faith', subKey: 'islam.faithSub', icon: Sparkles },
    { id: 'pillars', key: 'pillars', titleKey: 'islam.pillars', subKey: 'islam.pillarsSub', icon: Layers },
    { id: 'akhlaq', key: 'akhlaq', titleKey: 'islam.akhlaq', subKey: 'islam.akhlaqSub', icon: Heart },
    { id: 'family', key: 'family', titleKey: 'islam.family', subKey: 'islam.familySub', icon: Users },
    { id: 'ilm', key: 'knowledge', titleKey: 'islam.knowledge', subKey: 'islam.knowledgeSub', icon: BookOpen },
    { id: 'ibadah', key: 'worship', titleKey: 'islam.worship', subKey: 'islam.worshipSub', icon: Sun },
    { id: 'halal-finance', key: 'finance', titleKey: 'islam.finance', subKey: 'islam.financeSub', icon: DollarSign },
    { id: 'creation-care', key: 'care', titleKey: 'islam.care', subKey: 'islam.careSub', icon: Leaf },
  ];

  const faqItems = [
    { id: 'qibla-faq', key: 'qibla', transKey: 'faq.qibla' },
    { id: 'namaz-faq', key: 'prayer', transKey: 'faq.prayer' },
    { id: 'zakat-faq', key: 'zakat', transKey: 'faq.zakat' },
    { id: 'halal-haram-faq', key: 'halal', transKey: 'faq.halal' },
    { id: 'fasting-faq', key: 'fasting', transKey: 'faq.fasting' },
    { id: 'family-faq', key: 'family', transKey: 'faq.family' },
    { id: 'ai-help-faq', key: 'aiHelp', transKey: 'faq.aiHelp' },
  ];

  return (
    <aside
      id="km-right-sidebar"
      className="hidden xl:flex w-72 shrink-0 bg-[#050a17]/95 border-l border-cyan-900/30 flex-col h-[calc(100vh-65px)] sticky top-[65px] select-none overflow-y-auto custom-scrollbar p-3 space-y-4"
    >
      {/* 1. İSLAMIN ƏSASLARI (Dynamic mapped) */}
      <div className="rounded-2xl bg-gradient-to-b from-[#09152e]/80 to-[#040915]/90 border border-cyan-900/40 p-3 shadow-lg">
        <div className="flex items-center justify-between border-b border-cyan-900/40 pb-2 mb-2">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-['Plus_Jakarta_Sans']">
              {dict.islamFoundations.title}
            </h3>
          </div>
          <EvidenceBadge level={5} compact />
        </div>

        <div className="space-y-1">
          {islamicCards.map((item) => {
            const Icon = item.icon;
            const targetTopic = foundationsList.find((f) => f.id === item.id) || foundationsList[0];
            const title = targetTopic.title;
            const subtitle = targetTopic.subtitle;

            return (
              <button
                key={item.id}
                id={`right-islam-${item.key}`}
                onClick={() => {
                  setActiveTopic(targetTopic);
                  selectTopic(targetTopic);
                  setActiveSection('islam');
                  addLog('AI', `Foundations of Islam: [${title}]`, 'info');
                }}
                className="w-full group flex items-center justify-between p-2 rounded-xl text-left hover:bg-slate-900/70 border border-transparent hover:border-cyan-800/40 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-1.5 rounded-lg bg-slate-900 text-amber-400/90 group-hover:bg-amber-500/20 group-hover:text-amber-300 transition-colors">
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-semibold text-slate-200 group-hover:text-white truncate">
                      {title}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate group-hover:text-cyan-300/80">
                      {subtitle}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-cyan-400 shrink-0" />
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. TEZ-TEZ VERİLƏN SUALLAR (FAQ) (Dynamic mapped) */}
      <div className="rounded-2xl bg-gradient-to-b from-[#09152e]/80 to-[#040915]/90 border border-cyan-900/40 p-3 shadow-lg">
        <div className="flex items-center justify-between border-b border-cyan-900/40 pb-2 mb-2">
          <div className="flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-['Plus_Jakarta_Sans']">
              {dict.faqTitle}
            </h3>
          </div>
        </div>

        <div className="space-y-1">
          {faqItems.map((faq) => {
            const targetFaq = faqData.faqs.find((f) => f.id === faq.id) || faqData.faqs[0];
            const question = targetFaq.question;

            return (
              <button
                key={faq.id}
                id={`right-faq-${faq.key}`}
                onClick={() => {
                  setActiveFaq(targetFaq);
                  selectFaq(targetFaq);
                  setActiveSection('faq');
                  addLog('AI', `FAQ: "${question}"`, 'info');
                }}
                className="w-full group flex items-center justify-between p-2 rounded-xl text-left hover:bg-slate-900/70 border border-transparent hover:border-cyan-800/40 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-[11px] text-slate-400 group-hover:text-cyan-300">•</span>
                  <span className="text-xs font-medium text-slate-300 group-hover:text-white truncate">
                    {question}
                  </span>
                </div>
                <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-cyan-400 shrink-0" />
              </button>
            );
          })}
        </div>

        <button
          id="btn-all-faq-right"
          onClick={() => {
            setActiveSection('faq');
          }}
          className="mt-2 w-full py-1.5 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-300 hover:text-cyan-200 border border-cyan-800/40 text-[11px] font-medium transition-colors text-center"
        >
          {dict.allFaq}
        </button>
      </div>

      {/* Detail Modal for Islamic Topic */}
      {activeTopic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-[#081226] border border-amber-500/50 rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-cyan-900/40 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{activeTopic.title}</h3>
                  <p className="text-xs text-amber-300/80">{activeTopic.subtitle}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTopic(null)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 leading-relaxed whitespace-pre-line">
              {activeTopic.content}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
              <EvidenceBadge level={activeTopic.evidenceLevel} />
              <button
                onClick={() => setActiveTopic(null)}
                className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-black font-bold text-xs transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal for FAQ */}
      {activeFaq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-[#081226] border border-cyan-600/50 rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-cyan-900/40 pb-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">{activeFaq.question}</h3>
              </div>
              <button
                onClick={() => setActiveFaq(null)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-xs font-semibold text-cyan-200">
              {activeFaq.shortAnswer}
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              {activeFaq.fullAnswer}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
              <EvidenceBadge level={activeFaq.evidenceLevel} />
              <button
                onClick={() => setActiveFaq(null)}
                className="px-4 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
