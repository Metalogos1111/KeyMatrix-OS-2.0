import React from 'react';
import {
  Scale,
  Heart,
  Infinity as InfinityIcon,
  BookOpen,
  Sparkles,
  Users,
  Feather,
} from 'lucide-react';
import { useOSStore } from '../../store/osStore';
import { TRANSLATIONS, getNestedTranslation } from '../../data/translations';

export const Footer: React.FC = () => {
  const { language, activeSection, setActiveSection, civilizationFilter, setCivilizationFilter } = useOSStore();
  const dict = TRANSLATIONS[language] || TRANSLATIONS.EN;
  const t = (k: string) => getNestedTranslation(language, k);

  const virtues: {
    key: 'truth' | 'justice' | 'mercy' | 'freedom' | 'humanity' | 'knowledge' | 'harmony';
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { key: 'truth', icon: InfinityIcon },
    { key: 'justice', icon: Scale },
    { key: 'mercy', icon: Heart },
    { key: 'freedom', icon: Feather },
    { key: 'humanity', icon: Users },
    { key: 'knowledge', icon: BookOpen },
    { key: 'harmony', icon: Sparkles },
  ];

  return (
    <footer id="km-footer" className="w-full border-t border-cyan-950/60 bg-[#030610] text-slate-400 py-2.5 px-4 select-none z-30">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
        {/* Left: Version & Mission */}
        <div className="text-[11px] font-mono text-slate-400">
          <span className="text-cyan-400 font-bold">KeyMatrix OS v2.0</span> | <span className="text-slate-300 font-medium">{dict.footerRights}</span>
        </div>

        {/* Center: 7 Core Virtues clickable buttons */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 text-[10px] font-mono tracking-widest text-slate-400">
          {virtues.map((v) => {
            const Icon = v.icon;
            const isFilterActive = activeSection === 'world' && civilizationFilter === v.key;
            const label = t(`footer.${v.key}`);

            return (
              <button
                key={v.key}
                id={`footer-virtue-${v.key}`}
                onClick={() => {
                  setActiveSection('world');
                  setCivilizationFilter(v.key);
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-all duration-200 uppercase font-semibold ${
                  isFilterActive
                    ? 'bg-[#00D4FF]/20 border-t-2 border-[#00D4FF] text-[#00D4FF] shadow-[0_0_12px_rgba(0,212,255,0.4)]'
                    : 'hover:text-cyan-300 hover:bg-slate-900/60 border-t-2 border-transparent'
                }`}
              >
                <Icon className={`w-3 h-3 ${isFilterActive ? 'text-[#00D4FF]' : 'text-cyan-500/80'}`} />
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Signature */}
        <div className="text-[11px] font-medium text-amber-300/80 font-serif italic">
          {dict.footerQuote}
        </div>
      </div>
    </footer>
  );
};
