import React, { useState, useEffect } from 'react';
import { HelpCircle, Search, ChevronDown, ChevronUp, Sparkles, BookOpen, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useOSStore } from '../../store/osStore';
import { IslamicFAQ } from '../../types';
import { EvidenceBadge } from '../common/EvidenceBadge';
import { getLocalizedFaqs, LOCALIZED_FAQ_UI } from '../../data/localizedContent';

export const FaqPage: React.FC = () => {
  const { selectedFaq, selectFaq, language, addLog } = useOSStore();
  
  const faqData = getLocalizedFaqs(language);
  const ui = LOCALIZED_FAQ_UI[language] || LOCALIZED_FAQ_UI.EN;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0);
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(
    selectedFaq?.id || faqData.faqs[0].id
  );

  // Sync with selectedFaq if set externally
  useEffect(() => {
    if (selectedFaq?.id && selectedFaq.id !== expandedFaqId) {
      setExpandedFaqId(selectedFaq.id);
    }
  }, [selectedFaq]);

  const selectedCategory = faqData.categories[selectedCategoryIndex] || faqData.categories[0];

  const filteredFaqs = faqData.faqs.filter((faq) => {
    const matchesCat =
      selectedCategory.id === 'ALL' ||
      faq.category.toLowerCase() === selectedCategory.label.toLowerCase() ||
      faq.category.toLowerCase().includes(selectedCategory.id.toLowerCase());
    
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.shortAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.fullAnswer.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCat && matchesSearch;
  });

  const toggleExpand = (faq: IslamicFAQ) => {
    if (expandedFaqId === faq.id) {
      setExpandedFaqId(null);
    } else {
      setExpandedFaqId(faq.id);
      selectFaq(faq);
      addLog('AI', `FAQ Opened: [${faq.question}]`, 'info');
    }
  };

  return (
    <div id="page-faq" className="space-y-4 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#07132b]/90 via-[#0a1b3a]/70 to-[#040a17]/90 border border-cyan-800/40 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <span>KNOWLEDGE BASE</span>
            <span>•</span>
            <span>SHARIAH &amp; ETHICAL CLARIFICATIONS</span>
            <span>•</span>
            <EvidenceBadge level={5} compact />
          </div>
          <h1 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-cyan-400" />
            {ui.pageTitle}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {ui.pageSubtitle}
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="faq-search-input"
            type="text"
            placeholder={ui.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900/80 border border-cyan-800/40 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
        {faqData.categories.map((cat, idx) => (
          <button
            key={cat.id}
            id={`faq-cat-pill-${cat.id}`}
            onClick={() => setSelectedCategoryIndex(idx)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium font-mono whitespace-nowrap transition-all ${
              selectedCategoryIndex === idx
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(0,212,255,0.2)]'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-transparent'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq) => {
          const isExpanded = expandedFaqId === faq.id;
          return (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isExpanded
                  ? 'bg-gradient-to-b from-[#09152e]/90 to-[#040816]/95 border-cyan-400/60 shadow-[0_0_15px_rgba(0,212,255,0.15)]'
                  : 'bg-[#09152e]/60 border-cyan-900/30 hover:border-cyan-800/50'
              }`}
            >
              <button
                id={`faq-toggle-${faq.id}`}
                onClick={() => toggleExpand(faq)}
                className="w-full text-left p-4 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-xl bg-slate-900 border border-cyan-900/40 text-cyan-400 shrink-0">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white tracking-wide">
                      {faq.question}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-mono text-cyan-400/80 uppercase">
                        {ui.categoryTagLabel}: {faq.category}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <EvidenceBadge level={faq.evidenceLevel} compact />
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-cyan-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  )}
                </div>
              </button>

              {/* Expanded Content Area */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-cyan-900/40 space-y-3 animate-fade-in text-xs">
                  {/* Short Summary pill */}
                  <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-cyan-200 leading-relaxed font-sans">
                    <span className="font-semibold text-cyan-300 block mb-1">
                      {ui.canonicalAnswerBadge}:
                    </span>
                    {faq.shortAnswer}
                  </div>

                  {/* Full Deep Explanation */}
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-300 leading-relaxed whitespace-pre-line font-sans">
                    {faq.fullAnswer}
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-1">
                    <span>M00 ETHICAL CLARIFICATION</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      VERIFIED BY SHURA COUNCIL
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
