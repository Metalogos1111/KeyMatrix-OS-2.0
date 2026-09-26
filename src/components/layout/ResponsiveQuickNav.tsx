import React from 'react';
import {
  Home,
  Bot,
  Compass,
  Clock,
  BookOpen,
  LayoutGrid,
  Shield,
  Wallet,
  Settings,
  GitBranch,
  Layers,
} from 'lucide-react';
import { useOSStore } from '../../store/osStore';
import { TRANSLATIONS } from '../../data/translations';
import { ActiveSection } from '../../types';

export const ResponsiveQuickNav: React.FC = () => {
  const { activeSection, setActiveSection, language, isRTL } = useOSStore();
  const t = TRANSLATIONS[language] || TRANSLATIONS.EN;

  const items: { id: ActiveSection; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: t.nav.dashboard, icon: Home },
    { id: 'metalogos', label: t.nav.aiMetaLogos, icon: Bot },
    { id: 'qibla', label: t.nav.qibla, icon: Compass },
    { id: 'prayer', label: t.nav.prayer, icon: Clock },
    { id: 'quran', label: t.nav.quran, icon: BookOpen },
    { id: 'domains', label: t.nav.sevenDomains, icon: LayoutGrid },
    { id: 'dr-consistency', label: 'DR Audit', icon: GitBranch },
    { id: 'nur', label: t.nav.nurWallet, icon: Wallet },
    { id: 'security', label: t.nav.security, icon: Shield },
    { id: 'map', label: t.nav.mapM00, icon: Layers },
    { id: 'settings', label: t.nav.settings, icon: Settings },
  ];

  return (
    <div
      className={`lg:hidden bg-[#09152e]/95 border-b border-cyan-900/50 p-2 overflow-x-auto custom-scrollbar flex items-center gap-1.5 ${
        isRTL ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all ${
              isActive
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-[0_0_10px_rgba(0,212,255,0.2)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
