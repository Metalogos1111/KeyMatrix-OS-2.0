import React, { useEffect } from 'react';
import { useOSStore } from './store/osStore';
import { TopBar } from './components/layout/TopBar';
import { TruthBoundaryStrip } from './components/common/TruthBoundaryStrip';
import { ResponsiveQuickNav } from './components/layout/ResponsiveQuickNav';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { PrayerTimesAdapter } from './components/adapters/PrayerTimesAdapter';
import { KaabaCenterpiece } from './components/islamic/KaabaCenterpiece';
import { QiblaAdapter } from './components/adapters/QiblaAdapter';
import { SevenDomains } from './components/core/SevenDomains';
import { ProofOfResonance } from './components/core/ProofOfResonance';
import { ExecutionFlow } from './components/core/ExecutionFlow';
import { NUREconomy } from './components/core/NUREconomy';
import { GlobalMetrics } from './components/dashboard/GlobalMetrics';
import { LiveLogs } from './components/dashboard/LiveLogs';
import { CivilizationBanner } from './components/dashboard/CivilizationBanner';
import { RightSidebar } from './components/layout/RightSidebar';
import { AdapterRegistryModal } from './components/modals/AdapterRegistryModal';
import './lib/i18n/auditMissing';
import { EvidenceLadderModal } from './components/modals/EvidenceLadderModal';
import { ProfileComposerModal } from './components/modals/ProfileComposerModal';
import { QuranReaderModal } from './components/modals/QuranReaderModal';
import { NURWalletModal } from './components/modals/NURWalletModal';
import { SafetyStatusModal } from './components/modals/SafetyStatusModal';

import { ErrorBoundary } from './components/common/ErrorBoundary';

// Dedicated Section Pages
import { QiblaPage } from './components/pages/QiblaPage';
import { PrayerPage } from './components/pages/PrayerPage';
import { IslamPage } from './components/pages/IslamPage';
import { QuranPage } from './components/pages/QuranPage';
import { FaqPage } from './components/pages/FaqPage';
import { MetaLogosPage } from './components/pages/MetaLogosPage';
import { ProjectsPage } from './components/pages/ProjectsPage';
import { FilesKnowledgePage } from './components/pages/FilesKnowledgePage';
import { NurWalletPage } from './components/pages/NurWalletPage';
import { MapArchitecturePage } from './components/pages/MapArchitecturePage';
import { MInfinityFinal } from './components/map/MInfinityFinal';
import { DomainsPage } from './components/pages/DomainsPage';
import { ExperimentsPage } from './components/pages/ExperimentsPage';
import { WorldAnalyticsPage } from './components/pages/WorldAnalyticsPage';
import { CommunityPage } from './components/pages/CommunityPage';
import { SecurityPage } from './components/pages/SecurityPage';
import { DRConsistencyPanel } from './components/dr/DRConsistencyPanel';
import { SettingsPage } from './components/pages/SettingsPage';
import { isSectionAllowedForRole } from './lib/authority/roleMatrix';

export default function App() {
  const { isRTL, language, activeSection, role } = useOSStore();

  useEffect(() => {
    // Synchronize HTML attributes for RTL/LTR
    if (typeof document !== 'undefined') {
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
      document.documentElement.lang = language.toLowerCase();
    }
  }, [isRTL, language]);

  const renderContent = () => {
    // Fail-Closed Gate check: ensure the activeSection is permitted for current role
    if (!isSectionAllowedForRole(role, activeSection)) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center bg-[#091122]/60 rounded-2xl border border-rose-500/20 backdrop-blur-md animate-fade-in" data-testid="access-denied-gate">
          <div className="w-14 h-14 mb-4 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/40 text-xl font-mono font-bold">
            !
          </div>
          <h2 className="text-lg font-bold text-white mb-2 tracking-wide uppercase font-mono">
            Access Denied / Доступ Запрещен
          </h2>
          <p className="text-xs text-zinc-400 max-w-md mb-6 leading-relaxed">
            Раздел <span className="font-mono text-cyan-400 font-bold">[{activeSection}]</span> недоступен для роли <span className="font-mono text-amber-400 font-bold">[{role}]</span> в соответствии с матрицей безопасности (Fail-Closed).
          </p>
          <button
            onClick={() => useOSStore.getState().setActiveSection('home')}
            className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-md"
          >
            На Главную
          </button>
        </div>
      );
    }

    switch (activeSection) {
      case 'qibla':
        return <QiblaPage />;
      case 'prayer':
        return <PrayerPage />;
      case 'islam':
        return <IslamPage />;
      case 'quran':
        return <QuranPage />;
      case 'faq':
        return <FaqPage />;
      case 'metalogos':
        return <MetaLogosPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'files':
        return <FilesKnowledgePage />;
      case 'nur':
        return <NurWalletPage />;
      case 'map':
        return <MapArchitecturePage />;
      case 'minfinity':
        return <MInfinityFinal />;
      case 'domains':
        return <DomainsPage />;
      case 'experiments':
        return <ExperimentsPage />;
      case 'world':
        return <WorldAnalyticsPage />;
      case 'community':
        return <CommunityPage />;
      case 'security':
        return <SecurityPage />;
      case 'dr-consistency':
        return <DRConsistencyPanel />;
      case 'settings':
        return <SettingsPage />;
      case 'home':
      default:
        return (
          <div className="space-y-4 animate-fade-in">
            {/* Section 1: Top 3 Cards (Prayer Times, Kaaba Centerpiece, Qibla Compass) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch min-h-[360px]">
              {/* 1. Prayer Times Widget (Col 4) */}
              <div className="md:col-span-4 h-full">
                <PrayerTimesAdapter />
              </div>

              {/* 2. Kaaba Centerpiece (Col 4) */}
              <div className="md:col-span-4 h-full">
                <KaabaCenterpiece />
              </div>

              {/* 3. Qibla Compass (Col 4) */}
              <div className="md:col-span-4 h-full">
                <QiblaAdapter />
              </div>
            </div>

            {/* Section 2: 7 Core Intelligence Domains Ring */}
            <div>
              <SevenDomains />
            </div>

            {/* Section 3: Lower 3 Functional Widgets (PoR, Execution Flow, NUR Economy) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch min-h-[220px]">
              <ProofOfResonance />
              <ExecutionFlow />
              <NUREconomy />
            </div>

            {/* Section 4: Bottom 3 Dashboards (Global Metrics, Live Logs, Civilization Banner) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
              {/* Global Metrics (Col 5) */}
              <div className="lg:col-span-5">
                <GlobalMetrics />
              </div>

              {/* Live Reactive Logs (Col 4) */}
              <div className="lg:col-span-4">
                <LiveLogs />
              </div>

              {/* Civilization Future Banner (Col 3) */}
              <div className="lg:col-span-3">
                <CivilizationBanner />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className={`min-h-screen bg-[#040814] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans'] ${
        isRTL ? 'font-serif' : ''
      }`}
    >
      {/* Accessibility Skip Link */}
      <a
        href="#km-main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-3 focus:bg-cyan-500 focus:text-black focus:font-bold focus:rounded-b-lg focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* Top Bar (Brand, Wisdom, Location, Clock, Lang, Profile) */}
      <TopBar />

      {/* Global Truth Boundary Strip (Canonical Reference & Sandbox Disclaimer) */}
      <TruthBoundaryStrip />

      {/* Responsive Mobile / Tablet Quick Navigation Bar */}
      <ResponsiveQuickNav />

      {/* Main 3-Column Layout matching Reference Image 1 with RTL orientation */}
      <div className={`flex-1 flex overflow-hidden ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Left Navigation Sidebar (moves to right in RTL) */}
        <Sidebar />

        {/* Center Dynamic Workspace based on activeSection */}
        <main
          id="km-main-content"
          tabIndex={-1}
          aria-label="KeyMatrix Workspace"
          className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4 max-w-[1600px] mx-auto w-full outline-none"
        >
          <ErrorBoundary fallbackTitle="Ошибка в выбранном модуле интерфейса">
            {renderContent()}
          </ErrorBoundary>
        </main>

        {/* Right Sidebar (Islamic Foundations & FAQ) */}
        <RightSidebar />
      </div>

      {/* Footer Signature */}
      <Footer />

      {/* Interactive Global Modals */}
      <AdapterRegistryModal />
      <EvidenceLadderModal />
      <ProfileComposerModal />
      <QuranReaderModal />
      <NURWalletModal />
      <SafetyStatusModal />
    </div>
  );
}

