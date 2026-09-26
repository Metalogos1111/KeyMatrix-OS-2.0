import React, { useState, useEffect } from 'react';
import {
  Globe,
  MapPin,
  Clock,
  ChevronDown,
  Sparkles,
  Sliders,
  Layers,
  Cpu,
  ShieldAlert,
  Compass,
  WifiOff,
} from 'lucide-react';
import { useOSStore } from '../../store/osStore';
import { TRANSLATIONS } from '../../data/translations';
import { Language, UserRole } from '../../types';
import { LOCALES_REGISTRY } from '../../data/locales';
import { ROLE_CAPABILITIES } from '../../lib/authority/roleMatrix';
import { formatTime } from '../../lib/i18n/localeRuntime';
import { LOCALIZED_TOPBAR_UI } from '../../data/localizedContent';

export const TopBar: React.FC = () => {
  const {
    language,
    setLanguage,
    role,
    setRole,
    user,
    coordinates,
    requestGeolocation,
    setAdaptersModalOpen,
    setComposerModalOpen,
    setEvidenceModalOpen,
    refreshPrayerCountdown,
  } = useOSStore();

  const [currentTimeStr, setCurrentTimeStr] = useState('22:45:39');
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const t = TRANSLATIONS[language] || TRANSLATIONS.EN;
  const tb = LOCALIZED_TOPBAR_UI[language] || LOCALIZED_TOPBAR_UI.EN;
  const languages: Language[] = ['EN', 'RU', 'AZ', 'TR', 'AR', 'FA', 'UR'];
  const roles: UserRole[] = [
    'Child',
    'Guardian',
    'Adult',
    'Teacher',
    'Researcher',
    'Developer',
    'Engineer',
    'Moderator',
    'Shura',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date();
      const timeFormatted = formatTime(d, language);
      setCurrentTimeStr(timeFormatted);
      refreshPrayerCountdown();
    }, 1000);
    return () => clearInterval(timer);
  }, [language, refreshPrayerCountdown]);

  const currentLocaleMeta = LOCALES_REGISTRY[language] || LOCALES_REGISTRY.EN;
  const currentRoleConfig = ROLE_CAPABILITIES[role] || ROLE_CAPABILITIES.Adult;

  return (
    <header className="relative w-full border-b border-cyan-900/40 bg-[#060c1c]/95 backdrop-blur-md z-40 text-slate-200">
      {/* Top subtle golden & cyan gradient bar */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent opacity-80" />

      <div className="px-4 py-2.5 flex flex-wrap items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-600/30 to-amber-500/20 border border-cyan-400/40 flex items-center justify-center shadow-[0_0_15px_rgba(0,212,255,0.25)] transition-transform group-hover:scale-105">
              <span className="text-2xl select-none font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-amber-200 to-cyan-400">
                ∞
              </span>
            </div>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-extrabold tracking-wide text-white flex items-center gap-1.5 font-['Plus_Jakarta_Sans']">
                <span>{t.appName}</span>
                <span className="text-xs px-1.5 py-0.5 rounded border border-cyan-500/40 text-cyan-400 font-mono bg-cyan-950/40">
                  v2.0
                </span>
              </h1>
              <span className="hidden sm:inline-block text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded-full bg-blue-900/40 text-blue-300 border border-blue-700/50">
                SANDBOX RUNTIME
              </span>
            </div>
            <p className="text-[11px] tracking-wider text-cyan-300/80 font-medium uppercase">
              {t.subTitle}
            </p>
            <p className="hidden md:block text-[9px] text-slate-400/80 tracking-wide">
              {t.mission}
            </p>
          </div>
        </div>

        {/* Center: Divine Bismillah Calligraphy & Hadith wisdom */}
        <div className="hidden lg:flex flex-col items-center justify-center text-center max-w-xl mx-auto px-2">
          <div className="text-lg tracking-wide text-amber-300/90 font-['Amiri'] font-bold drop-shadow-[0_0_12px_rgba(251,191,36,0.3)]">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </div>
          <div className="text-[10px] tracking-[0.2em] font-semibold text-cyan-200/90 uppercase">
            KNOWLEDGE · JUSTICE · MERCY · UNITY · PROSPERITY
          </div>
          <div className="text-[10px] text-slate-300/80 italic line-clamp-1 mt-0.5">
            {t.quoteHadith}{' '}
            <span className="text-amber-400 not-italic font-medium">{t.quoteHadithAuthor}</span>
          </div>
        </div>

        {/* Right: Telemetry, Tools, Lang & Profile */}
        <div className="flex items-center gap-3">
          {/* Action shortcuts: Adapters, Composer, Evidence */}
          <div className="hidden xl:flex items-center gap-1.5 bg-slate-900/60 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setAdaptersModalOpen(true)}
              className="px-2.5 py-1 text-xs rounded hover:bg-cyan-950/60 text-slate-300 hover:text-cyan-300 flex items-center gap-1.5 border border-transparent hover:border-cyan-500/40 transition-colors"
              title={tb.adaptersTooltip}
            >
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>{tb.adaptersBtn}</span>
            </button>
            <button
              onClick={() => setComposerModalOpen(true)}
              className="px-2.5 py-1 text-xs rounded hover:bg-purple-950/60 text-slate-300 hover:text-purple-300 flex items-center gap-1.5 border border-transparent hover:border-purple-500/40 transition-colors"
              title={tb.composerTooltip}
            >
              <Sliders className="w-3.5 h-3.5 text-purple-400" />
              <span>{tb.composerBtn}</span>
            </button>
            <button
              onClick={() => setEvidenceModalOpen(true)}
              className="px-2.5 py-1 text-xs rounded hover:bg-emerald-950/60 text-slate-300 hover:text-emerald-300 flex items-center gap-1.5 border border-transparent hover:border-emerald-500/40 transition-colors"
              title={tb.evidenceTooltip}
            >
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>{tb.evidenceBtn}</span>
            </button>
          </div>

          {/* Time & Location Pill */}
          <div className="flex items-center gap-2 bg-slate-900/80 border border-cyan-800/40 px-3 py-1.5 rounded-lg shadow-inner">
            <Clock className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <div className="text-right font-mono">
              <div className="text-xs font-bold text-white tracking-wider flex items-center gap-1.5">
                <span>{currentTimeStr}</span>
                <span className="text-[9px] text-slate-400 hidden sm:inline">17 Sep 2026</span>
              </div>
              <button
                onClick={requestGeolocation}
                className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center justify-end gap-1 hover:underline text-right"
                title={tb.gpsTooltip}
              >
                <MapPin className="w-2.5 h-2.5 text-amber-400" />
                <span className="truncate max-w-[130px]">{coordinates.locationName}</span>
              </button>
            </div>
          </div>

          {/* Multilingual Selector (7 Languages: EN, RU, AZ, TR, AR, FA, UR) */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/70 hover:border-cyan-500 text-xs font-mono text-cyan-300 transition-colors"
              title={`Active Locale: ${currentLocaleMeta.name} (${currentLocaleMeta.nativeName}) - ${currentLocaleMeta.dir.toUpperCase()}`}
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>{currentLocaleMeta.flag}</span>
              <span className="font-bold">{language}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-1 w-52 bg-[#091124] border border-cyan-800/60 rounded-xl shadow-2xl py-1.5 z-50 animate-fade-in divide-y divide-slate-800/60">
                <div className="px-3 py-1 text-[10px] uppercase font-mono text-cyan-400 font-semibold tracking-wider">
                  {tb.localesHeader}
                </div>
                <div className="py-1">
                  {languages.map((lng) => {
                    const meta = LOCALES_REGISTRY[lng];
                    const isSelected = language === lng;
                    return (
                      <button
                        key={lng}
                        onClick={() => {
                          setLanguage(lng);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs font-mono flex items-center justify-between hover:bg-cyan-950/70 transition-colors ${
                          isSelected ? 'text-cyan-300 font-bold bg-cyan-900/30' : 'text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{meta.flag}</span>
                          <div>
                            <div className="font-bold leading-tight">{meta.code} · {meta.nativeName}</div>
                            <div className="text-[10px] text-slate-400 leading-tight">{meta.name} ({meta.dir.toUpperCase()})</div>
                          </div>
                        </div>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* User Persona & Role Selector (9 Roles from Master Model) */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-slate-900 to-[#0c1833] border border-cyan-800/50 hover:border-cyan-400 transition-all text-left"
              title={`Role: ${currentRoleConfig.title} - ${currentRoleConfig.description}`}
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-7 h-7 rounded-full object-cover border border-amber-400/60 shadow-[0_0_6px_rgba(245,158,11,0.3)]"
              />
              <div className="hidden sm:block">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>{user.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded border font-mono ${currentRoleConfig.badgeColor}`}>
                    {role}
                  </span>
                </div>
                <div className="text-[9px] text-cyan-300/80 font-mono tracking-wider">{user.tagline}</div>
              </div>
              <ChevronDown className="w-3 h-3 text-slate-400 ml-1" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-1 w-64 bg-[#091124] border border-cyan-700/60 rounded-xl shadow-2xl py-1.5 z-50 divide-y divide-slate-800/60 animate-fade-in">
                <div className="px-3 py-1 text-[10px] uppercase font-mono text-amber-400 font-semibold tracking-wider flex items-center justify-between">
                  <span>{tb.rolesHeader}</span>
                  <span className="text-[9px] text-slate-400 font-normal">{tb.limitsMatrix}</span>
                </div>
                <div className="py-1 max-h-[380px] overflow-y-auto">
                  {roles.map((r) => {
                    const cfg = ROLE_CAPABILITIES[r];
                    const isSelected = role === r;
                    return (
                      <button
                        key={r}
                        onClick={() => {
                          setRole(r);
                          setRoleDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-start justify-between hover:bg-cyan-950/70 transition-colors ${
                          isSelected ? 'bg-cyan-900/40 text-cyan-200' : 'text-slate-300'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-1.5 font-bold">
                            <span>{r}</span>
                            <span className={`text-[9px] px-1 py-0.2 rounded border ${cfg.badgeColor}`}>
                              {cfg.safeBalanceLimitNUR.toLocaleString()} NUR
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-400 leading-tight mt-0.5">{cfg.nativeTitle}</div>
                        </div>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Offline Connectivity Banner */}
      {isOffline && (
        <div className="bg-amber-950/90 border-t border-amber-600/50 px-4 py-1.5 flex items-center justify-between text-amber-200 text-xs font-mono animate-fade-in shadow-inner">
          <div className="flex items-center gap-2">
            <WifiOff className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>
              <strong>Режим офлайн / Edge:</strong> Нет активного интернет-соединения. Задействовано локальное хранилище IndexedDB и PWA Service Worker.
            </span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-900/60 border border-amber-700 text-amber-300">
            LOCAL MESH ACTIVE
          </span>
        </div>
      )}
    </header>
  );
};
