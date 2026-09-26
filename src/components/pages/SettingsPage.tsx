import React, { useState } from 'react';
import {
  Settings,
  Globe2,
  UserCheck,
  MapPin,
  Database,
  Trash2,
  CheckCircle2,
  RefreshCw,
  ShieldCheck,
  Lock,
  Palette,
  Bell,
  HardDrive,
  Users,
  Eye,
  Sliders,
  Shield,
  FileCheck,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { useOSStore } from '../../store/osStore';
import { Language, UserRole } from '../../types';
import { EvidenceBadge } from '../common/EvidenceBadge';
import { TRANSLATIONS } from '../../data/translations';
import { LOCALES_REGISTRY } from '../../data/locales';
import { ROLE_CAPABILITIES } from '../../lib/authority/roleMatrix';
import { db } from '../../lib/db/keymatrixDb';
import { LOCALIZED_SETTINGS_UI } from '../../data/localizedContent';

type SettingsTab =
  | 'profile'
  | 'privacy'
  | 'localization'
  | 'appearance'
  | 'notifications'
  | 'security'
  | 'data';

export const SettingsPage: React.FC = () => {
  const {
    language,
    setLanguage,
    role,
    setRole,
    user,
    coordinates,
    requestGeolocation,
    addLog,
  } = useOSStore();
  const t = TRANSLATIONS[language] || TRANSLATIONS.EN;
  const st = LOCALIZED_SETTINGS_UI[language] || LOCALIZED_SETTINGS_UI.EN;

  const [activeTab, setActiveTab] = useState<SettingsTab>('localization');
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  // Profile fields state
  const [userName, setUserName] = useState(user.name);
  const [userTagline, setUserTagline] = useState(user.tagline);
  const [avatarUrl, setAvatarUrl] = useState(user.avatar);

  // Privacy Graph state
  const [privacyScopes, setPrivacyScopes] = useState({
    profilePublic: true,
    familyShared: true,
    communityVisible: true,
    organizationVisible: false,
    shuraAuditable: true,
    anonymizeEvidence: false,
    allowEdgeSync: true,
  });

  // Appearance & UI Theme state
  const [themeMode, setThemeMode] = useState<'deep_caspian' | 'emerald_oasis' | 'cosmic_indigo'>('deep_caspian');
  const [fontScale, setFontScale] = useState<'compact' | 'standard' | 'generous'>('standard');
  const [highContrast, setHighContrast] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  // Notifications state
  const [notifs, setNotifs] = useState({
    prayerAzan: true,
    shuraProposals: true,
    nurTransactions: true,
    evidenceVerifications: true,
    offlineWarnings: true,
  });

  const languagesList: Language[] = ['EN', 'RU', 'AZ', 'TR', 'AR', 'FA', 'UR'];
  const rolesList: UserRole[] = [
    'Child',
    'Guardian',
    'Adult',
    'Teacher',
    'Instructor',
    'Researcher',
    'Developer',
    'Engineer',
    'Moderator',
    'Shura',
  ];

  const currentRoleCfg = ROLE_CAPABILITIES[role] || ROLE_CAPABILITIES.Adult;
  const currentLocaleMeta = LOCALES_REGISTRY[language] || LOCALES_REGISTRY.EN;

  const showNotice = (msg: string) => {
    setSavedNotice(msg);
    setTimeout(() => setSavedNotice(null), 3000);
  };

  const handleLanguageChange = (code: Language) => {
    setLanguage(code);
    addLog('SYSTEM', `${st.localization.changedNotice}: [${code}] - ${LOCALES_REGISTRY[code].name}`, 'info');
    showNotice(`${st.localization.changedNotice}: ${LOCALES_REGISTRY[code].name}`);
  };

  const handleRoleChange = (r: UserRole) => {
    setRole(r);
    addLog('SECURITY', `${st.security.roleUpdatedNotice} [${r}] (${ROLE_CAPABILITIES[r].nativeTitle})`, 'info');
    showNotice(`${st.security.roleUpdatedNotice} ${r}`);
  };

  const handleSaveProfile = () => {
    useOSStore.setState((state) => ({
      user: {
        ...state.user,
        name: userName,
        tagline: userTagline,
        avatar: avatarUrl,
      },
    }));
    addLog('SYSTEM', st.profile.savedNotice, 'success');
    showNotice(st.profile.savedNotice);
  };

  const handleClearCache = async () => {
    if (window.confirm(st.data.clearCacheConfirm)) {
      try {
        await db.intents.clear();
        await db.actions.clear();
        await db.evidenceRecords.clear();
        addLog('SYSTEM', st.data.cacheClearedNotice, 'info');
        showNotice(st.data.cacheClearedNotice);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const tabs: { id: SettingsTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'profile', label: st.tabs.profile, icon: UserCheck },
    { id: 'privacy', label: st.tabs.privacy, icon: Lock },
    { id: 'localization', label: st.tabs.localization, icon: Globe2 },
    { id: 'appearance', label: st.tabs.appearance, icon: Palette },
    { id: 'notifications', label: st.tabs.notifications, icon: Bell },
    { id: 'security', label: st.tabs.security, icon: ShieldCheck },
    { id: 'data', label: st.tabs.data, icon: HardDrive },
  ];

  return (
    <div id="page-settings" className="space-y-4 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#07132b]/90 via-[#0a1b3a]/70 to-[#040a17]/90 border border-cyan-800/40 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <span>KEYMATRIX MASTER MODEL 002</span>
            <span>•</span>
            <span>SECTION 09 & 10 SETTINGS</span>
            <span>•</span>
            <EvidenceBadge level={5} compact />
          </div>
          <h1 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <Settings className="w-6 h-6 text-cyan-400" />
            {st.headerTitle}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {st.headerSubtitle}
          </p>
        </div>

        {savedNotice && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono shadow-[0_0_12px_rgba(16,185,129,0.3)] animate-fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>{savedNotice}</span>
          </div>
        )}
      </div>

      {/* Tabs Navigation Bar */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#071224]/80 border border-cyan-900/40 overflow-x-auto custom-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-cyan-500/20 border border-cyan-400/60 text-cyan-200 font-bold shadow-[0_0_12px_rgba(0,212,255,0.25)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT 1: PROFILE */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 animate-fade-in">
          <div className="lg:col-span-7 space-y-4">
            <div className="p-5 rounded-2xl bg-[#09152e]/80 border border-cyan-900/40 shadow-xl space-y-4">
              <div className="flex items-center gap-2 border-b border-cyan-900/40 pb-2.5">
                <UserCheck className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  {st.profile.title}
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 font-mono mb-1">{st.profile.personaLabel}</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-cyan-800/40 text-white font-mono focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-mono mb-1">{st.profile.taglineLabel}</label>
                  <input
                    type="text"
                    value={userTagline}
                    onChange={(e) => setUserTagline(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-cyan-800/40 text-white font-mono focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-mono mb-1">{st.profile.avatarLabel}</label>
                  <input
                    type="text"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-cyan-800/40 text-white font-mono focus:border-cyan-400 focus:outline-none text-[11px]"
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 font-mono space-y-1">
                  <div className="flex justify-between text-slate-400">
                    <span>{st.profile.didLabel}</span>
                    <span className="text-amber-400 font-bold">{user.did}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>{st.profile.roleLabel}</span>
                    <span className="text-cyan-300 font-bold">{role}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>{st.profile.clusterLabel}</span>
                    <span className="text-emerald-400 font-bold">Baku-Casper-01</span>
                  </div>
                </div>

                <button
                  onClick={handleSaveProfile}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono font-bold transition-all shadow-[0_0_15px_rgba(0,212,255,0.3)]"
                >
                  {st.profile.saveBtn}
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-[#09152e]/80 border border-cyan-900/40 shadow-xl space-y-3">
              <h4 className="text-xs font-bold text-amber-400 font-mono uppercase tracking-wider">
                {st.profile.canonTitle}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {st.profile.canonDesc}
              </p>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 font-mono space-y-1">
                <div>{st.profile.bullet1}</div>
                <div>{st.profile.bullet2}</div>
                <div>{st.profile.bullet3}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: PRIVACY GRAPH (Section 10) */}
      {activeTab === 'privacy' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 animate-fade-in">
          <div className="lg:col-span-7 space-y-4">
            <div className="p-5 rounded-2xl bg-[#09152e]/80 border border-cyan-900/40 shadow-xl space-y-4">
              <div className="flex items-center gap-2 border-b border-cyan-900/40 pb-2.5">
                <Lock className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  M10 Privacy Graph — Контуры доступа данных
                </h3>
              </div>

              <div className="space-y-3">
                {[
                  {
                    key: 'profilePublic',
                    label: 'Public Profile Visibility',
                    desc: 'Публичный базовый профиль доступен участникам экосистемы',
                  },
                  {
                    key: 'familyShared',
                    label: 'Family & Guardian Circle Sharing',
                    desc: 'Передача прогресса и защищенного баланса опекунам семьи',
                  },
                  {
                    key: 'communityVisible',
                    label: 'Community Contribution Evidence',
                    desc: 'Публикация доказательств пользы в ленту общины',
                  },
                  {
                    key: 'organizationVisible',
                    label: 'Organization / Employer Scope',
                    desc: 'Доступ к рабочим навыкам и проектам для институтов',
                  },
                  {
                    key: 'shuraAuditable',
                    label: 'Shura Governance Audit Logs',
                    desc: 'Открытие криптографических логов для аудиторов Шуры (Level 5)',
                  },
                  {
                    key: 'anonymizeEvidence',
                    label: 'Anonymize Evidence Zero-Knowledge Proofs',
                    desc: 'Скрытие личных идентификаторов при отправке ZK-доказательств',
                  },
                  {
                    key: 'allowEdgeSync',
                    label: 'Edge & Offline Mesh Synchronization',
                    desc: 'Разрешить защищенную P2P репликацию при обрыве сети',
                  },
                ].map((item) => {
                  const val = (privacyScopes as any)[item.key];
                  return (
                    <div
                      key={item.key}
                      onClick={() => {
                        setPrivacyScopes((prev) => ({
                          ...prev,
                          [item.key]: !val,
                        }));
                        showNotice(`Настройка "${item.label}" обновлена`);
                      }}
                      className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-cyan-800/60 cursor-pointer flex items-center justify-between transition-all"
                    >
                      <div className="pr-3">
                        <div className="text-xs font-bold text-slate-200 font-mono">{item.label}</div>
                        <div className="text-[11px] text-slate-400">{item.desc}</div>
                      </div>
                      <div
                        className={`w-10 h-6 rounded-full p-1 transition-colors ${
                          val ? 'bg-emerald-500' : 'bg-slate-800'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full bg-white transition-transform ${
                            val ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-[#09152e]/80 border border-cyan-900/40 shadow-xl space-y-3">
              <h4 className="text-xs font-bold text-emerald-400 font-mono uppercase tracking-wider">
                Граф приватности (Master Model 002 - Section 10)
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Privacy scope полностью независим от объекта кошелька и репутации. Иерархия контуров:
              </p>
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] font-mono text-cyan-300 space-y-1">
                <div>Public ──▶ Contacts ──▶ Community</div>
                <div>Organization ──▶ Guardian ──▶ Shura</div>
                <div>Employer ──▶ Private (Strict ZK)</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: LOCALIZATION & 7 LANGUAGES (With preview sentence) */}
      {activeTab === 'localization' && (
        <div className="space-y-4 animate-fade-in">
          <div className="p-5 rounded-2xl bg-[#09152e]/80 border border-cyan-900/40 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-cyan-900/40 pb-3">
              <div className="flex items-center gap-2">
                <Globe2 className="w-5 h-5 text-cyan-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  04 Мультиязычная ткань — 7 Канонических Языков и Скриптов
                </h3>
              </div>
              <div className="text-xs font-mono text-cyan-300 bg-cyan-950/80 px-2.5 py-1 rounded-lg border border-cyan-800/40">
                Активный: {currentLocaleMeta.flag} {currentLocaleMeta.name} ({currentLocaleMeta.dir.toUpperCase()})
              </div>
            </div>

            <p className="text-xs text-slate-400">
              Каждый языковой слой настраивает скрипт, направление письма (LTR/RTL), формат чисел и расчет молитв. Для арабского, фарси и урду числа в изолированных блоках (время, градусы Киблы 236.1°) сохраняют <code className="text-amber-400">dir="ltr"</code>.
            </p>

            {/* Grid of 7 languages */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {languagesList.map((code) => {
                const meta = LOCALES_REGISTRY[code];
                const isSelected = language === code;

                return (
                  <div
                    key={code}
                    onClick={() => handleLanguageChange(code)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                      isSelected
                        ? 'bg-gradient-to-b from-cyan-950/80 to-blue-950/80 border-cyan-400 text-white shadow-[0_0_18px_rgba(0,212,255,0.3)]'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-cyan-900'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{meta.flag}</span>
                          <div>
                            <div className="text-sm font-bold font-mono text-white">
                              {meta.code} · {meta.nativeName}
                            </div>
                            <div className="text-[11px] text-slate-400">{meta.name}</div>
                          </div>
                        </div>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                            meta.dir === 'rtl'
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                              : 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                          }`}
                        >
                          {meta.dir.toUpperCase()}
                        </span>
                      </div>

                      {/* Preview Sentence Box */}
                      <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-serif italic text-cyan-200">
                        «{meta.previewSentence}»
                      </div>
                    </div>

                    <div className="space-y-1 text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-800/80">
                      <div className="flex justify-between">
                        <span>Скрипт:</span>
                        <span className="text-slate-200">{meta.script}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Метод молитв:</span>
                        <span className="text-amber-300 truncate max-w-[150px]">{meta.prayerMethod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Числа / Дата:</span>
                        <span className="text-slate-200">{meta.dateFormat}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 4: APPEARANCE */}
      {activeTab === 'appearance' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 animate-fade-in">
          <div className="lg:col-span-7 space-y-4">
            <div className="p-5 rounded-2xl bg-[#09152e]/80 border border-cyan-900/40 shadow-xl space-y-4">
              <div className="flex items-center gap-2 border-b border-cyan-900/40 pb-2.5">
                <Palette className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Цветовые Палитры и Визуальная Гармония
                </h3>
              </div>

              <div className="space-y-3">
                {[
                  {
                    id: 'deep_caspian',
                    name: 'Deep Caspian Glow (Каспийский ночной)',
                    desc: 'Глубокий сине-циановый фон с мягким золотым свечением 786',
                    color: 'from-cyan-950 to-slate-950 border-cyan-400',
                  },
                  {
                    id: 'emerald_oasis',
                    name: 'Emerald Oasis (Изумрудный оазис)',
                    desc: 'Мягкий зеленый тон духовного спокойствия и исламского благочестия',
                    color: 'from-emerald-950 to-slate-950 border-emerald-400',
                  },
                  {
                    id: 'cosmic_indigo',
                    name: 'Cosmic Indigo (Космический индиго)',
                    desc: 'Высококонтрастная палитра для глубоких научных вычислений',
                    color: 'from-indigo-950 to-slate-950 border-indigo-400',
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setThemeMode(item.id as any);
                      showNotice(`Тема "${item.name}" применена`);
                    }}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all bg-gradient-to-r ${item.color} ${
                      themeMode === item.id ? 'shadow-[0_0_15px_rgba(0,212,255,0.3)] ring-1 ring-cyan-400' : 'opacity-70'
                    }`}
                  >
                    <div className="text-xs font-bold text-white font-mono">{item.name}</div>
                    <div className="text-[11px] text-slate-300 mt-0.5">{item.desc}</div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-cyan-900/40 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300">Анимации и переходы интерфейса</span>
                  <input
                    type="checkbox"
                    checked={animationsEnabled}
                    onChange={(e) => setAnimationsEnabled(e.target.checked)}
                    className="rounded border-cyan-800 bg-slate-900 text-cyan-500 focus:ring-0"
                  />
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300">Режим высокой контрастности (WCAG AAA)</span>
                  <input
                    type="checkbox"
                    checked={highContrast}
                    onChange={(e) => setHighContrast(e.target.checked)}
                    className="rounded border-cyan-800 bg-slate-900 text-cyan-500 focus:ring-0"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-[#09152e]/80 border border-cyan-900/40 shadow-xl space-y-3">
              <h4 className="text-xs font-bold text-cyan-400 font-mono uppercase tracking-wider">
                Типографическая шкала
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Гармония Playfair Display для заголовков, JetBrains Mono для криптографических хэшей и Inter для канонического текста.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 5: NOTIFICATIONS */}
      {activeTab === 'notifications' && (
        <div className="p-5 rounded-2xl bg-[#09152e]/80 border border-cyan-900/40 shadow-xl space-y-4 animate-fade-in">
          <div className="flex items-center gap-2 border-b border-cyan-900/40 pb-2.5">
            <Bell className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Система Оповещений и Событийных Триггеров
            </h3>
          </div>

          <div className="space-y-3">
            {[
              {
                key: 'prayerAzan',
                label: 'Напоминания о времени намаза (Азан и Икама)',
                desc: 'Точные уведомления по Бакинскому и глобальным методам расчета',
              },
              {
                key: 'shuraProposals',
                label: 'Инициативы Шуры (M10 Governance Alerts)',
                desc: 'Оповещения о критических голосованиях и эскалациях >1000 NUR',
              },
              {
                key: 'nurTransactions',
                label: 'Движение NUR Digital Cash & Value',
                desc: 'Уведомления о поступлении наград за вклад и транзакциях 4 Фондов',
              },
              {
                key: 'evidenceVerifications',
                label: 'Верификация доказательств (Evidence Ladder 1-5)',
                desc: 'Статусы криптографической проверки через Casper TEE и PoR',
              },
              {
                key: 'offlineWarnings',
                label: 'События Edge Mesh & Offline Режима',
                desc: 'Предупреждения о переходе на автономное кэширование P2P',
              },
            ].map((item) => {
              const val = (notifs as any)[item.key];
              return (
                <div
                  key={item.key}
                  onClick={() => {
                    setNotifs((prev) => ({ ...prev, [item.key]: !val }));
                    showNotice(`Оповещение "${item.label}" обновлено`);
                  }}
                  className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-cyan-800/60 cursor-pointer flex items-center justify-between transition-all"
                >
                  <div className="pr-3">
                    <div className="text-xs font-bold text-slate-200 font-mono">{item.label}</div>
                    <div className="text-[11px] text-slate-400">{item.desc}</div>
                  </div>
                  <div
                    className={`w-10 h-6 rounded-full p-1 transition-colors ${
                      val ? 'bg-amber-500' : 'bg-slate-800'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        val ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB CONTENT 6: SECURITY & 9 ROLES MATRIX */}
      {activeTab === 'security' && (
        <div className="space-y-4 animate-fade-in">
          <div className="p-5 rounded-2xl bg-[#09152e]/80 border border-cyan-900/40 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-cyan-900/40 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Матрица Прав и Полномочий 9 Системных Ролей
                </h3>
              </div>
              <div className="text-xs font-mono text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-800/40">
                Активная роль: {role}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {rolesList.map((r) => {
                const cfg = ROLE_CAPABILITIES[r];
                const isSelected = role === r;
                return (
                  <div
                    key={r}
                    onClick={() => handleRoleChange(r)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                      isSelected
                        ? 'bg-gradient-to-b from-amber-950/80 to-slate-950/90 border-amber-400 text-white shadow-[0_0_18px_rgba(245,158,11,0.3)]'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-amber-900'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="text-sm font-bold font-mono text-white flex items-center gap-1.5">
                          <span>{r}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded border font-mono ${cfg.badgeColor}`}>
                          {cfg.safeBalanceLimitNUR.toLocaleString()} NUR
                        </span>
                      </div>
                      <div className="text-xs text-amber-300 font-semibold mb-2">{cfg.nativeTitle}</div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{cfg.description}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 space-y-1 text-[10px] font-mono text-slate-400">
                      <div className="flex justify-between">
                        <span>Переводы NUR:</span>
                        <span className={cfg.canTransferNUR ? 'text-emerald-400' : 'text-rose-400'}>
                          {cfg.canTransferNUR ? 'Разрешены' : 'Заблокированы'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Создание инициатив:</span>
                        <span className={cfg.canCreateProposal ? 'text-emerald-400' : 'text-rose-400'}>
                          {cfg.canCreateProposal ? 'Разрешено' : 'Заблокировано'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shura Rule #42:</span>
                        <span className="text-cyan-300">Порог {cfg.thresholds.maxNUR.toLocaleString()} NUR</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 7: DATA & SENSORS */}
      {activeTab === 'data' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 animate-fade-in">
          <div className="lg:col-span-6 space-y-4">
            <div className="p-5 rounded-2xl bg-[#09152e]/80 border border-cyan-900/40 shadow-xl space-y-3">
              <div className="flex items-center gap-2 border-b border-cyan-900/40 pb-2.5">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Геолокация, Баку и Сенсоры Каспия
                </h3>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Локация:</span>
                  <span className="text-cyan-300 font-bold">{coordinates.locationName}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Широта (Lat):</span>
                  <span className="text-white">{coordinates.latitude}° N</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Долгота (Lon):</span>
                  <span className="text-white">{coordinates.longitude}° E</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Точный азимут на Каабу:</span>
                  <span className="text-amber-400 font-bold" dir="ltr">236.1° SW</span>
                </div>
              </div>

              <button
                onClick={() => {
                  requestGeolocation();
                  addLog('PRAYER', 'Запрос геолокации через Web API...', 'info');
                  showNotice('Геолокация обновлена!');
                }}
                className="w-full py-2.5 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-700/40 text-xs font-mono font-medium transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Определить GPS автоматически
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="p-5 rounded-2xl bg-[#09152e]/80 border border-cyan-900/40 shadow-xl space-y-3">
              <div className="flex items-center gap-2 border-b border-cyan-900/40 pb-2.5">
                <Database className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Локальное хранилище (Dexie / IndexedDB)
                </h3>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Все намерения, транзакции NUR, кэш Корана, выбранный язык и активная роль хранятся локально в изолированном IndexedDB хранилище без передачи на сервер.
              </p>

              <button
                onClick={handleClearCache}
                className="w-full py-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/40 text-rose-300 border border-rose-800/40 text-xs font-mono transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Очистить журнал логов и временный кэш
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
