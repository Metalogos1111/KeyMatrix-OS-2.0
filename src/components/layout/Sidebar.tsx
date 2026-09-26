import React from 'react';
import {
  Home,
  Compass,
  Clock,
  BookOpen,
  HelpCircle,
  Brain,
  FolderKanban,
  FileText,
  Wallet,
  Network,
  Cpu,
  FlaskConical,
  Globe2,
  Users,
  Shield,
  GitBranch,
  Settings,
  Sparkles,
  ChevronRight,
  Infinity as InfinityIcon,
} from 'lucide-react';
import { useOSStore } from '../../store/osStore';
import { TRANSLATIONS } from '../../data/translations';
import { ActiveSection } from '../../types';
import { isSectionAllowedForRole, ROLE_CAPABILITIES } from '../../lib/authority/roleMatrix';
import { LOCALIZED_SIDEBAR_UI } from '../../data/localizedContent';

export const Sidebar: React.FC = () => {
  const { activeSection, setActiveSection, language, role } = useOSStore();
  const t = TRANSLATIONS[language] || TRANSLATIONS.EN;
  const sb = LOCALIZED_SIDEBAR_UI[language] || LOCALIZED_SIDEBAR_UI.EN;

  const allMenuItems: {
    id: ActiveSection;
    label: string;
    sub: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
    badgeColor?: string;
    isPrimary?: boolean;
  }[] = [
    { id: 'home', label: t.nav.dashboard, sub: t.nav.dashboardSub, icon: Home, isPrimary: true },
    { id: 'qibla', label: t.nav.qibla, sub: t.nav.qiblaSub, icon: Compass },
    { id: 'prayer', label: t.nav.prayer, sub: t.nav.prayerSub, icon: Clock },
    { id: 'islam', label: t.nav.islam, sub: t.nav.islamSub, icon: Sparkles },
    { id: 'quran', label: t.nav.quran, sub: t.nav.quranSub, icon: BookOpen },
    { id: 'faq', label: t.nav.faq, sub: t.nav.faqSub, icon: HelpCircle },
    { id: 'metalogos', label: t.nav.aiMetaLogos, sub: t.nav.aiMetaLogosSub, icon: Brain },
    {
      id: 'projects',
      label: t.nav.projects,
      sub: t.nav.projectsSub,
      icon: FolderKanban,
      badge: '24',
      badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
    },
    { id: 'files', label: t.nav.files, sub: t.nav.filesSub, icon: FileText },
    {
      id: 'nur',
      label: t.nav.nurWallet,
      sub: t.nav.nurWalletSub,
      icon: Wallet,
      badge: '1,250,000',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    },
    { id: 'map', label: t.nav.mapM00, sub: t.nav.mapM00Sub, icon: Network },
    {
      id: 'minfinity',
      label: t.nav.minfinity,
      sub: t.nav.minfinitySub,
      icon: InfinityIcon,
      badge: 'FINAL',
      badgeColor: 'bg-amber-500/25 text-amber-300 border-amber-500/50 shadow-[0_0_8px_rgba(245,158,11,0.3)]',
    },
    { id: 'domains', label: t.nav.sevenDomains, sub: t.nav.sevenDomainsSub, icon: Cpu },
    { id: 'experiments', label: t.nav.experiments, sub: t.nav.experimentsSub, icon: FlaskConical },
    { id: 'world', label: t.nav.worldAnalytics, sub: t.nav.worldAnalyticsSub, icon: Globe2 },
    { id: 'community', label: t.nav.community, sub: t.nav.communitySub, icon: Users },
    { id: 'security', label: t.nav.security, sub: t.nav.securitySub, icon: Shield },
    {
      id: 'dr-consistency',
      label: 'DR & HASH-001 Audit',
      sub: sb.drAuditSub,
      icon: GitBranch,
      badge: 'v0.6',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    },
    { id: 'settings', label: t.nav.settings, sub: t.nav.settingsSub, icon: Settings },
  ];

  const menuItems = allMenuItems.filter((item) => isSectionAllowedForRole(role, item.id));
  const roleConfig = ROLE_CAPABILITIES[role] || ROLE_CAPABILITIES.Adult;

  return (
    <aside
      id="km-sidebar"
      className="hidden lg:flex w-64 shrink-0 bg-[#050a17]/95 border-r border-cyan-900/30 flex-col justify-between h-[calc(100vh-65px)] sticky top-[65px] select-none z-30"
    >
      {/* Scrollable Navigation List */}
      <div className="overflow-y-auto py-3 px-2 space-y-1 custom-scrollbar">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              id={`nav-item-${item.id}`}
              onClick={() => setActiveSection(item.id)}
              className={`w-full group flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all duration-200 ${
                isActive
                  ? 'bg-[#00D4FF]/20 border-l-2 border-[#00D4FF] bg-gradient-to-r from-cyan-950/90 to-blue-950/40 text-cyan-200 border-y border-r border-cyan-500/30 shadow-[0_0_15px_rgba(0,212,255,0.25)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`p-1.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 shadow-[0_0_8px_rgba(0,212,255,0.3)]'
                      : 'bg-slate-900 text-slate-400 group-hover:text-cyan-400 group-hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                </div>
                <div className="truncate">
                  <div className={`text-xs font-semibold truncate ${isActive ? 'text-white font-bold' : ''}`}>
                    {item.label}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate group-hover:text-slate-400">
                    {item.sub}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 ml-1">
                {item.badge && (
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded border leading-none font-semibold ${
                      item.badgeColor || 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom Aesthetic Quote & Active Role Mode */}
      <div className="p-3 border-t border-cyan-950/50 bg-[#040813] space-y-2">
        {role === 'Child' && (
          <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-[10px] text-emerald-300 font-mono text-center flex items-center justify-center gap-1.5 shadow-[0_0_8px_rgba(16,185,129,0.2)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{sb.childSafeActive}</span>
          </div>
        )}
        <div className="p-2.5 rounded-xl bg-gradient-to-b from-slate-900/60 to-cyan-950/20 border border-cyan-900/30 text-center">
          <p className="text-[10px] text-slate-300 italic font-serif leading-relaxed">
            {t.footerQuote}
          </p>
          <div className="mt-1 text-[9px] text-amber-400/90 font-mono uppercase tracking-wider font-semibold">
            — KeyMatrix
          </div>
        </div>
      </div>
    </aside>
  );
};

