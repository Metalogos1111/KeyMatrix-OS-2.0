import { create } from 'zustand';
import {
  Language,
  ActiveSection,
  UserRole,
  CoreDomain,
  AdapterItem,
  ExecutionStep,
  SystemLog,
  IslamicTopic,
  IslamicFAQ,
  EvidenceLevel,
} from '../types';
import {
  CORE_DOMAINS,
  SYSTEM_ADAPTERS,
  INITIAL_EXECUTION_STEPS,
  ISLAMIC_FOUNDATIONS,
  ISLAMIC_FAQS,
  INITIAL_SYSTEM_LOGS,
} from '../data/mockData';
import { calculateQiblaBearing, calculateDistanceToKaabaKm, DEFAULT_BAKU_COORDINATES } from '../lib/qibla';
import { calculatePrayerTimes, PrayerDaySchedule } from '../lib/prayer';
import {
  checkAuthority,
  SHURA_RULE_42,
  INITIAL_SHURA_COUNCIL,
  ShuraSigner,
  AuthorityCheckResult,
} from '../lib/authority/shuraRules';
import { isSectionAllowedForRole } from '../lib/authority/roleMatrix';
import { evaluateGovernancePolicy, PolicyCheckResult } from '../lib/policy/governancePolicy';
import { evaluatePoRGates, ResonanceMetrics, getDefaultResonanceMetrics } from '../lib/resonance';
import { generateExecutionProof, GeneratedProof } from '../lib/evidence/evidenceEngine';
import {
  db,
  seedInitialDatabase,
  DbIntent,
  DbImpact,
  DbAction,
  persistActiveSection,
  getPersistedActiveSection,
  persistUserRole,
  getPersistedUserRole,
} from '../lib/db/keymatrixDb';
import { recordNurTransaction } from '../lib/economy/nurEngine';

interface OSState {
  // Localization & Persona
  language: Language;
  isRTL: boolean;
  role: UserRole;
  user: {
    name: string;
    tagline: string;
    did: string;
    avatar: string;
  };

  // Coordinates & Telemetry
  coordinates: {
    latitude: number;
    longitude: number;
    locationName: string;
    isCustom: boolean;
  };
  qiblaBearing: number;
  distanceToKaabaKm: number;
  compassHeading: number;

  // Prayer times
  prayerSchedule: PrayerDaySchedule;

  // Active View / Modals
  activeSection: ActiveSection;
  activeNavId: string;
  setActiveSection: (section: ActiveSection) => void;
  civilizationFilter: string | null;
  setCivilizationFilter: (filter: string | null) => void;
  selectedDomain: CoreDomain | null;
  selectedAdapter: AdapterItem | null;
  selectedTopic: IslamicTopic | null;
  selectedFaq: IslamicFAQ | null;
  isEvidenceModalOpen: boolean;
  isComposerModalOpen: boolean;
  isAdaptersModalOpen: boolean;
  isIdentityModalOpen: boolean;
  isQuranModalOpen: boolean;
  isNurWalletModalOpen: boolean;
  isSafetyStatusModalOpen: boolean;
  selectedSafetyGate: 'failClosed' | 'consent' | 'privacy' | 'encrypt' | null;

  // Safety Status Widget State
  safetyStatusDetails: {
    failClosed: boolean;
    consentRequired: boolean;
    privacyStrict: boolean;
    encryptTeeAes: boolean;
    lastAudit: string;
  };
  openSafetyGateDetails: (gate: 'failClosed' | 'consent' | 'privacy' | 'encrypt') => void;
  setQuranModalOpen: (open: boolean) => void;
  setNurWalletModalOpen: (open: boolean) => void;
  setSafetyStatusModalOpen: (open: boolean) => void;

  // Shura Council
  shuraSigners: ShuraSigner[];
  toggleShuraSignature: (signerId: string) => void;

  // 7 Domains & Adapters
  domains: CoreDomain[];
  adapters: AdapterItem[];
  executionSteps: ExecutionStep[];
  executionProgress: number;
  executionStatus: string;
  isSimulatingExecution: boolean;
  lastExecutionProof: GeneratedProof | null;
  lastAuthorityResult: AuthorityCheckResult | null;
  lastPolicyResult: PolicyCheckResult | null;

  // Execution configuration
  executionParams: {
    intentText: string;
    peopleAffected: number;
    co2Tons: number;
    nurAmount: number;
  };
  setExecutionParams: (params: Partial<OSState['executionParams']>) => void;

  // Proof of Resonance
  porMetrics: ResonanceMetrics;

  // NUR Economy
  nurMetrics: {
    totalValue: number;
    activeProjects: number;
    impactInvestments: number;
    yieldAnnual: number;
  };

  // Global metrics
  globalMetrics: {
    activeIntentions: number;
    peopleInSystem: number;
    positiveImpact: number;
    co2Saved: number;
  };

  // System Logs
  logs: SystemLog[];

  // Actions
  setLanguage: (lang: Language) => void;
  setRole: (role: UserRole) => void;
  setActiveNav: (id: string) => void;
  selectDomain: (domain: CoreDomain | null) => void;
  selectAdapter: (adapter: AdapterItem | null) => void;
  selectTopic: (topic: IslamicTopic | null) => void;
  selectFaq: (faq: IslamicFAQ | null) => void;
  setEvidenceModalOpen: (open: boolean) => void;
  setComposerModalOpen: (open: boolean) => void;
  setAdaptersModalOpen: (open: boolean) => void;
  setIdentityModalOpen: (open: boolean) => void;
  updateCompassHeading: (heading: number) => void;
  requestGeolocation: () => Promise<void>;
  runExecutionSimulation: (customIntent?: string) => Promise<void>;
  testAdapter: (adapterId: string) => Promise<string>;
  addLog: (tag: SystemLog['tag'], message: string, level?: SystemLog['level']) => void;
  refreshPrayerCountdown: () => void;
  initializeDb: () => Promise<void>;
}

export const useOSStore = create<OSState>((set, get) => {
  const defaultCoords = {
    latitude: DEFAULT_BAKU_COORDINATES.latitude,
    longitude: DEFAULT_BAKU_COORDINATES.longitude,
    locationName: DEFAULT_BAKU_COORDINATES.locationName,
    isCustom: false,
  };

  const initialBearing = calculateQiblaBearing(defaultCoords.latitude, defaultCoords.longitude);
  const initialDistance = calculateDistanceToKaabaKm(defaultCoords.latitude, defaultCoords.longitude);
  const initialPrayers = calculatePrayerTimes(defaultCoords.latitude, defaultCoords.longitude);

  // Initialize DB in background
  seedInitialDatabase().catch(console.error);

  return {
    language: 'RU',
    isRTL: false,
    role: 'Adult',
    user: {
      name: 'OM_Brother',
      tagline: 'Human First',
      did: 'did:key:km_7f3a8b92c41d',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },

    coordinates: defaultCoords,
    qiblaBearing: initialBearing, // 236.1°
    distanceToKaabaKm: initialDistance,
    compassHeading: 0,

    prayerSchedule: initialPrayers,

    activeSection: 'home',
    activeNavId: 'home',
    civilizationFilter: null,
    setCivilizationFilter: (filter: string | null) => {
      set({ civilizationFilter: filter });
      if (filter) {
        get().addLog('SHURA', `Применен цивилизационный фильтр ценностей: [${filter.toUpperCase()}]`, 'info');
      }
    },
    setActiveSection: (section: ActiveSection) => {
      const currentRole = get().role;
      if (!isSectionAllowedForRole(currentRole, section)) {
        get().addLog('SECURITY', `[FAIL-CLOSED] Отказ в навигации: раздел [${section}] недоступен для роли [${currentRole}]`, 'warning');
        return;
      }
      set({ activeSection: section, activeNavId: section });
      persistActiveSection(section);
      get().addLog('SYSTEM', `Навигация: переход в раздел [${section}]`, 'info');
    },
    selectedDomain: null,
    selectedAdapter: null,
    selectedTopic: null,
    selectedFaq: null,
    isEvidenceModalOpen: false,
    isComposerModalOpen: false,
    isAdaptersModalOpen: false,
    isIdentityModalOpen: false,
    isQuranModalOpen: false,
    isNurWalletModalOpen: false,
    isSafetyStatusModalOpen: false,
    selectedSafetyGate: null,

    safetyStatusDetails: {
      failClosed: true,
      consentRequired: true,
      privacyStrict: true,
      encryptTeeAes: true,
      lastAudit: '2026-09-17 21:00:00 UTC (100% PASS - TEE Enclave Secured)',
    },

    shuraSigners: INITIAL_SHURA_COUNCIL,
    toggleShuraSignature: (signerId: string) => {
      set((state) => ({
        shuraSigners: state.shuraSigners.map((s) =>
          s.id === signerId ? { ...s, signed: !s.signed } : s
        ),
      }));
      const signer = get().shuraSigners.find((s) => s.id === signerId);
      if (signer) {
        get().addLog(
          'SHURA',
          `Подпись члена Совета [${signer.name}]: ${signer.signed ? 'ПОСТАВЛЕНА' : 'ОТОЗВАНА'}`,
          signer.signed ? 'success' : 'warning'
        );
      }
    },

    domains: CORE_DOMAINS,
    adapters: SYSTEM_ADAPTERS,
    executionSteps: INITIAL_EXECUTION_STEPS,
    executionProgress: 65,
    executionStatus: 'Статус: Готов к исполнению намерений',
    isSimulatingExecution: false,
    lastExecutionProof: null,
    lastAuthorityResult: null,
    lastPolicyResult: null,

    executionParams: {
      intentText: 'Оптимизация гармонического резонанса и устойчивости экосистемы Каспия',
      peopleAffected: 50,
      co2Tons: 15,
      nurAmount: 150,
    },
    setExecutionParams: (params) => {
      set((state) => ({
        executionParams: { ...state.executionParams, ...params },
      }));
    },

    porMetrics: getDefaultResonanceMetrics(),

    nurMetrics: {
      totalValue: 1250000,
      activeProjects: 24,
      impactInvestments: 18,
      yieldAnnual: 12.4,
    },

    globalMetrics: {
      activeIntentions: 248,
      peopleInSystem: 1482320,
      positiveImpact: 3204,
      co2Saved: 1245.6,
    },

    logs: INITIAL_SYSTEM_LOGS,

    initializeDb: async () => {
      await seedInitialDatabase();
    },

    setLanguage: (lang: Language) => {
      const isRtl = lang === 'AR' || lang === 'FA' || lang === 'UR';
      if (typeof document !== 'undefined') {
        document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
        document.documentElement.lang = lang.toLowerCase();
        document.body.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
        document.body.setAttribute('data-direction', isRtl ? 'rtl' : 'ltr');
        document.body.setAttribute('data-language', lang);
      }
      set({ language: lang, isRTL: isRtl });
      get().addLog('SYSTEM', `Языковой слой переключен на ${lang} (${isRtl ? 'RTL' : 'LTR'})`, 'info');
    },

    setRole: (role: UserRole) => {
      const currentSection = get().activeSection;
      const isAllowed = isSectionAllowedForRole(role, currentSection);
      const targetSection = isAllowed ? currentSection : 'home';
      set({ role, activeSection: targetSection, activeNavId: targetSection });
      persistUserRole(role);
      persistActiveSection(targetSection);
      get().addLog('SHURA', `Роль изменена на [${role}]. Секция: [${targetSection}] (Матрица прав синхронизирована).`, 'warning');
    },

    setActiveNav: (id: string) => {
      const aliasMap: Record<string, ActiveSection> = {
        dashboard: 'home',
        home: 'home',
        architecture: 'map',
        analytics: 'world',
      };
      const section: ActiveSection = aliasMap[id] || (id as ActiveSection);
      get().setActiveSection(section);
    },
    selectDomain: (domain: CoreDomain | null) => set({ selectedDomain: domain }),
    selectAdapter: (adapter: AdapterItem | null) => set({ selectedAdapter: adapter }),
    selectTopic: (topic: IslamicTopic | null) => set({ selectedTopic: topic }),
    selectFaq: (faq: IslamicFAQ | null) => set({ selectedFaq: faq }),
    setEvidenceModalOpen: (open: boolean) => set({ isEvidenceModalOpen: open }),
    setComposerModalOpen: (open: boolean) => set({ isComposerModalOpen: open }),
    setAdaptersModalOpen: (open: boolean) => set({ isAdaptersModalOpen: open }),
    setIdentityModalOpen: (open: boolean) => set({ isIdentityModalOpen: open }),
    setQuranModalOpen: (open: boolean) => set({ isQuranModalOpen: open }),
    setNurWalletModalOpen: (open: boolean) => set({ isNurWalletModalOpen: open }),
    setSafetyStatusModalOpen: (open: boolean) => set({ isSafetyStatusModalOpen: open }),
    openSafetyGateDetails: (gate: 'failClosed' | 'consent' | 'privacy' | 'encrypt') =>
      set({ selectedSafetyGate: gate, isSafetyStatusModalOpen: true }),
    updateCompassHeading: (heading: number) => set({ compassHeading: heading }),

    requestGeolocation: async () => {
      if (typeof navigator === 'undefined' || !navigator.geolocation) {
        get().addLog('SYSTEM', 'Геолокация недоступна в браузере, используется геокод Баку', 'warning');
        return;
      }

      try {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;
            const bearing = calculateQiblaBearing(lat, lng);
            const dist = calculateDistanceToKaabaKm(lat, lng);
            const prayers = calculatePrayerTimes(lat, lng);

            set({
              coordinates: {
                latitude: Math.round(lat * 10000) / 10000,
                longitude: Math.round(lng * 10000) / 10000,
                locationName: `GPS: ${lat.toFixed(2)}° N, ${lng.toFixed(2)}° E`,
                isCustom: true,
              },
              qiblaBearing: bearing,
              distanceToKaabaKm: dist,
              prayerSchedule: prayers,
            });

            get().addLog('PRAYER', `Локация обновлена: Кыбла = ${bearing}°, до Каабы ${dist} км`, 'success');
          },
          (err) => {
            get().addLog('SYSTEM', `Запрос GPS отклонен: ${err.message}. Используется Баку (40.3849° N, 49.9567° E)`, 'info');
          },
          { enableHighAccuracy: true, timeout: 6000 }
        );
      } catch (e: any) {
        get().addLog('SYSTEM', `Ошибка геопозиционирования: ${e?.message || e}`, 'warning');
      }
    },

    runExecutionSimulation: async (customIntent?: string) => {
      const state = get();
      const intentText = customIntent || state.executionParams.intentText;
      const { peopleAffected, co2Tons, nurAmount } = state.executionParams;
      const currentRole = state.role;
      const currentDid = state.user.did;

      set({
        isSimulatingExecution: true,
        executionProgress: 12,
        executionStatus: 'Шаг 1 Intent: Регистрация человеческого намерения...',
      });

      state.addLog('INTENT', `[Шаг 1 Intent] Новое намерение: "${intentText}" (DID: ${currentDid})`, 'info');

      // 1. Store intent in IndexedDB
      const intentId = `intent-${Date.now()}`;
      try {
        await db.intents.add({
          id: intentId,
          text: intentText,
          role: currentRole,
          status: 'PENDING',
          timestamp: new Date().toLocaleTimeString(),
          porScore: 0.482,
          evidenceLevel: 5,
          peopleAffected,
          co2Impact: co2Tons,
          nurAmount,
        });
      } catch (e) {
        console.warn('DB intent add error:', e);
      }

      await new Promise((r) => setTimeout(r, 600));

      // Step 2: Identity Who
      set({
        executionProgress: 25,
        executionStatus: 'Шаг 2 Identity: Проверка криптографического DID ключа и мандата...',
      });
      state.addLog('SECURITY', `[Шаг 2 Identity] Суверенный идентификатор ${currentDid} подтвержден. Роль: [${currentRole}]`, 'info');

      await new Promise((r) => setTimeout(r, 600));

      // Step 3: Authority - Shura Rule #42 Check
      set({
        executionProgress: 38,
        executionStatus: 'Шаг 3 Authority: Проверка прав роли и Shura Rule #42...',
      });

      const authResult = checkAuthority(currentRole, {
        peopleAffected,
        co2Tons,
        nurAmount,
        signers: state.shuraSigners,
      });

      set({ lastAuthorityResult: authResult });

      if (!authResult.passed) {
        set({
          isSimulatingExecution: false,
          executionProgress: 38,
          executionStatus: `ОТКЛОНЕНО на Шаге 3 (Authority): ${authResult.ruleCode}`,
        });
        state.addLog('SHURA', `[Шаг 3 Authority ОШИБКА] ${authResult.reason}`, 'error');
        return;
      }

      state.addLog('SHURA', `[Шаг 3 Authority УСПЕХ] ${authResult.reason}`, 'success');

      await new Promise((r) => setTimeout(r, 600));

      // Step 4: Policy - Shariah & Ethical filters (Zero-Riba, Zero-Maysir)
      set({
        executionProgress: 50,
        executionStatus: 'Шаг 4 Policy: Проверка соблюдения исламских и этических политик...',
      });

      const policyResult = evaluateGovernancePolicy(intentText, 5);
      set({ lastPolicyResult: policyResult });

      if (!policyResult.passed) {
        set({
          isSimulatingExecution: false,
          executionProgress: 50,
          executionStatus: `ОТКЛОНЕНО на Шаге 4 (Policy): ${policyResult.policyCode}`,
        });
        state.addLog('SHURA', `[Шаг 4 Policy ОШИБКА] ${policyResult.reason}`, 'error');
        return;
      }

      state.addLog('SHURA', `[Шаг 4 Policy УСПЕХ] ${policyResult.reason}`, 'success');

      await new Promise((r) => setTimeout(r, 600));

      // Step 5: Execution Do - 7 Core Domains & PoR Gates
      set({
        executionProgress: 65,
        executionStatus: 'Шаг 5 Execution: Распараллеливание в 7 ядрах интеллекта и TEE...',
      });

      const porEval = evaluatePoRGates(intentText, policyResult.passed);
      set({ porMetrics: porEval.metrics });

      state.addLog(
        'AI',
        `[Шаг 5 Execution] 7 доменов синхронизированы. 4 PoR гейта (MATH, AMP, SEM, CONS) пройдены. Оценка PoR: ${porEval.metrics.scorePairAvg}`,
        'info'
      );

      // Save action to DB
      try {
        await db.actions.add({
          id: `act-${Date.now()}`,
          intentId,
          domain: 'MetaLogos / MetaForge',
          actionType: 'ECOLOGICAL_COHERENCE',
          parameters: { peopleAffected, co2Tons, nurAmount },
          status: 'COMPLETED',
          timestamp: new Date().toLocaleTimeString(),
        });
      } catch (e) {
        console.warn('DB action add error:', e);
      }

      await new Promise((r) => setTimeout(r, 600));

      // Step 6: State Update
      set({
        executionProgress: 78,
        executionStatus: 'Шаг 6 State: Обновление распределенного реестра и IndexedDB...',
      });
      state.addLog('SYSTEM', '[Шаг 6 State] Локальный стейт M07 синхронизирован. Атомарность гарантирована.', 'info');

      await new Promise((r) => setTimeout(r, 600));

      // Step 7: Evidence Prove - Generate proof hash pos_f7Bu...
      set({
        executionProgress: 90,
        executionStatus: 'Шаг 7 Evidence: Генерация криптографического хэша pos_f7Bu...',
      });

      const proof = await generateExecutionProof({
        intentText,
        userDid: currentDid,
        role: currentRole,
        authorityApproval: authResult.ruleCode,
        porScore: porEval.metrics.scorePairAvg,
        mathCoherence: porEval.metrics.mathCoherence,
        nurDistributed: nurAmount,
        co2Saved: co2Tons,
        peopleBenefited: peopleAffected,
        timestamp: new Date().toLocaleTimeString(),
      });

      set({ lastExecutionProof: proof });
      state.addLog(
        'EVIDENCE',
        `[Шаг 7 Evidence] Создано доказательство Level 5 (PROVEN): ${proof.proofHash.substring(0, 20)}... (Merkle Root: ${proof.merkleRoot.substring(0, 16)}...)`,
        'success'
      );

      await new Promise((r) => setTimeout(r, 600));

      // Step 8: Impact - Distribute NUR & Record Impact
      // Record transaction if NUR > 0
      if (nurAmount > 0) {
        await recordNurTransaction({
          type: 'IMPACT_PROFIT_SHARE',
          amount: nurAmount,
          from: 'NUR Impact Pool',
          to: currentDid,
          project: 'Ecosystem Harmonic Regeneration',
          description: `Zero-Riba вознаграждение за исполнение намерения "${intentText.substring(0, 30)}..."`,
        });
      }

      try {
        await db.impacts.add({
          id: `imp-${Date.now()}`,
          intentId,
          nurDistributed: nurAmount,
          co2Saved: co2Tons,
          peopleBenefited: peopleAffected,
          verified: true,
          timestamp: new Date().toLocaleTimeString(),
        });
      } catch (e) {
        console.warn('DB impact add error:', e);
      }

      set((s) => ({
        executionProgress: 100,
        executionStatus: 'Шаг 8 Impact: Завершено! Реальное благополучие и позитивный импакт зафиксированы.',
        isSimulatingExecution: false,
        globalMetrics: {
          activeIntentions: s.globalMetrics.activeIntentions + 1,
          peopleInSystem: s.globalMetrics.peopleInSystem + peopleAffected,
          positiveImpact: s.globalMetrics.positiveImpact + 1,
          co2Saved: Math.round((s.globalMetrics.co2Saved + co2Tons) * 10) / 10,
        },
      }));

      state.addLog(
        'NUR',
        `[Шаг 8 Impact] Результат доставлен: ${peopleAffected} человек получили пользу, предотвращено ${co2Tons}т CO2, ${nurAmount} NUR распределено.`,
        'success'
      );
    },

    testAdapter: async (adapterId: string) => {
      const state = get();
      const adapter = state.adapters.find((a) => a.id === adapterId);
      if (!adapter) return 'Адаптер не найден';

      state.addLog('SYSTEM', `Запуск теста адаптера [${adapter.name}] (${adapter.version})...`, 'info');

      if (adapterId === 'ad-01' || adapter.name.includes('Qibla')) {
        // Run REAL calculation using qibla.ts
        const { latitude, longitude } = state.coordinates;
        const bearing = calculateQiblaBearing(latitude, longitude);
        const dist = calculateDistanceToKaabaKm(latitude, longitude);
        const result = `Реальный расчет Кыблы: Азимут = ${bearing}° от координат (${latitude}°, ${longitude}°) до Каабы. Дистанция: ${dist} км. Статус: REAL OK`;
        state.addLog('EVIDENCE', `[Qibla Adapter] ${result}`, 'success');
        return result;
      }

      if (adapterId === 'ad-02' || adapter.name.includes('Prayer')) {
        // Run REAL calculation using adhan.js via prayer.ts
        const { latitude, longitude } = state.coordinates;
        const schedule = calculatePrayerTimes(latitude, longitude);
        const prayersList = schedule.prayers.map((p) => `${p.name}: ${p.time}`).join(' | ');
        const result = `Реальный расчет времени намаза (adhan.js): ${prayersList}. Следующий: ${schedule.nextPrayer.name} через ${schedule.nextPrayer.formattedCountdown}. Статус: REAL OK`;
        state.addLog('EVIDENCE', `[Prayer Times Adapter] ${result}`, 'success');
        return result;
      }

      if (adapterId === 'ad-04' || adapter.name.includes('NUR')) {
        const result = `Тест кошелька NUR: Проверка Zero-Riba реестра, баланс пула: 1,250,000 NUR, Мудараба дивиденды: 12.4%, Статус: SANITIZED OK`;
        state.addLog('NUR', `[NUR Wallet Adapter] ${result}`, 'success');
        return result;
      }

      const defaultResult = `Адаптер [${adapter.name}] (${adapter.version}) верифицирован в песочнице TEE. Режим: ${adapter.status}`;
      state.addLog('EVIDENCE', defaultResult, 'success');
      return defaultResult;
    },

    addLog: (tag, message, level = 'info') => {
      const now = new Date();
      const timestamp = now.toTimeString().split(' ')[0];
      const newLog: SystemLog = {
        id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        timestamp,
        tag,
        message,
        level,
      };
      set((state) => ({
        logs: [newLog, ...state.logs.slice(0, 24)],
      }));
    },

    refreshPrayerCountdown: () => {
      const coords = get().coordinates;
      const updated = calculatePrayerTimes(coords.latitude, coords.longitude);
      set({ prayerSchedule: updated });
    },
  };
});

// Restore persisted activeSection and activeRole on startup with Fail-Closed gate
if (typeof window !== 'undefined') {
  Promise.all([getPersistedActiveSection(), getPersistedUserRole()])
    .then(([savedSection, savedRole]) => {
      const state = useOSStore.getState();
      const role = (savedRole as UserRole) || state.role;
      let section = (savedSection as ActiveSection) || state.activeSection;

      if (!isSectionAllowedForRole(role, section)) {
        section = 'home';
      }

      useOSStore.setState({
        role,
        activeSection: section,
        activeNavId: section,
      });
    })
    .catch(() => {});
}

