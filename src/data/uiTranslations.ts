import { Language } from '../types';

export interface UiTranslationsRecord {
  topBar: {
    adapters: string;
    composer: string;
    evidence: string;
    sandboxBadge: string;
    values: string;
    gpsPrompt: string;
  };
  islamPage: {
    m00Tag: string;
    bannerTitle: string;
    bannerDesc: string;
    sourcesTitle: string;
    integrationTitle: string;
    integrationDesc: string;
    ethicsLayerBadge: string;
    consensusBadge: string;
  };
  faqPage: {
    bannerTitle: string;
    bannerDesc: string;
    searchPlaceholder: string;
    allCategories: string;
    sourceTitle: string;
    integrationTitle: string;
    integrationDesc: string;
  };
  quranPage: {
    bannerTitle: string;
    bannerDesc: string;
    searchPlaceholder: string;
    catalogTitle: string;
    versesCount: string;
    makkah: string;
    madinah: string;
    surah: string;
    totalVerses: string;
    revelationIn: string;
    noVersesFound: string;
    listen: string;
    copy: string;
    copied: string;
    tafsirTitle: string;
  };
  kaabaCenterpiece: {
    simulatingProgress: string;
    clickToLaunch: string;
    pillars: Record<string, string>;
  };
  qiblaAdapter: {
    mapModalTitle: string;
    originPoint: string;
    meccaCoords: string;
    exactAzimuth: string;
    distanceGreatCircle: string;
    mathNote: string;
    close: string;
    rotateTitle: string;
    gpsRefreshTitle: string;
  };
  prayerAdapter: {
    fajr: string;
    sunrise: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
    nextPrayerIn: string;
    scheduleModalTitle: string;
    closeModal: string;
  };
  executionFlow: {
    pipelineTitle: string;
    hideParams: string;
    paramsAndShura: string;
    shuraQuorumVerified: string;
    warningExceeds: string;
    selectShuraRole: string;
    rule42Testing: string;
    people: string;
    co2: string;
    nurBudget: string;
    stepNames: Record<string, string>;
  };
  nurEconomy: {
    ecoProjects: string;
    investments: string;
    simulateProfit: string;
    mudarabahDesc: string;
  };
  globalMetrics: {
    title: string;
    realtimeSync: string;
  };
  liveLogs: {
    inputPlaceholder: string;
    send: string;
    sendTitle: string;
    noLogsForFilter: string;
    failClosedTooltip: string;
    consentTooltip: string;
    privacyTooltip: string;
    unsafeTooltip: string;
    encryptTooltip: string;
  };
  sevenDomains: {
    nodeLabeling: string;
    inputs: string;
    outputs: string;
    dependencies: string;
    close: string;
  };
  metaLogosPage: {
    bannerTitle: string;
    bannerDesc: string;
    workspaceTab: string;
    productionLoopTab: string;
    orchestrationTab: string;
  };
  settingsPage: {
    bannerTitle: string;
    bannerDesc: string;
    profileTab: string;
    privacyTab: string;
    localizationTab: string;
    appearanceTab: string;
    notificationsTab: string;
    securityTab: string;
    dataTab: string;
    saveProfile: string;
    clearCache: string;
  };
}

export const UI_TRANSLATIONS: Record<Language, UiTranslationsRecord> = {
  AZ: {
    topBar: {
      adapters: 'Adapterlər',
      composer: 'Tərtibçi',
      evidence: 'Sübutlar',
      sandboxBadge: 'SANDBOX RUNTIME',
      values: 'BİLİK · ƏDALƏT · MƏRHƏMƏT · BİRLİK · RUZİ',
      gpsPrompt: 'Real GPS məkanını istifadə etmək üçün klikləyin',
    },
    islamPage: {
      m00Tag: 'M00 ƏXLAQİ BAZA · DƏYƏRLƏR VƏ ŞƏRİƏT HARMONİYASI',
      bannerTitle: 'İslamın Əsasları və Mənəvi Əxlaq',
      bannerDesc: 'İslam dəyərləri KeyMatrix OS-in adapterlərinin nüvəsi və mənəvi kompasını təşkil edir',
      sourcesTitle: 'Kanonik Mənbələr və İstinadlar (Evidence Proofs)',
      integrationTitle: 'KeyMatrix OS Memarlığına İnteqrasiya',
      integrationDesc: 'Bu etik postulat PrimeCore modulunda proqramlaşdırılıb və Shura Rule #42 auditində yoxlanılır. Bütün avtonom süni intellekt agentləri nəsilləri insan şərəfinin qorunması, insanlığa fayda və zərərin aradan qaldırılması (Məqasidüş-Şəriə) prizmasından süzgəcdən keçirir.',
      ethicsLayerBadge: 'M00 ƏXLAQ TƏBƏQƏSİ v2.0',
      consensusBadge: 'ŞƏRİƏT KONSENSUSU: 100% PASS',
    },
    faqPage: {
      bannerTitle: 'Tez-Tez Verilən Suallar (FAQ) — Bilik və Cavablar',
      bannerDesc: 'Namaz, maliyyə, oruc, ailə və etik süni intellektin rolu barədə etibarlı cavablar',
      searchPlaceholder: 'Suallar və cavablar üzrə axtarış...',
      allCategories: 'Bütün Kateqoriyalar',
      sourceTitle: 'Kanonik Mənbə və Sübut (Evidence Level)',
      integrationTitle: 'Shura Rule #42 və AI Agentləri ilə İnteqrasiya',
      integrationDesc: 'Bu məsələnin cavabı sistemin etika filtrinə daxil edilib və qərarların şəriət prinsiplərinə uyğunluğunu təmin edir.',
    },
    quranPage: {
      bannerTitle: 'Müqəddəs Quran — Elektron Müshəf',
      bannerDesc: 'Kanonik mətn, osmanlı xətti, çoxdilli tərcümələr, təfsir və səsli qiraət',
      searchPlaceholder: 'Ayələr və mənalar üzrə axtarış...',
      catalogTitle: 'Surələr Kataloqu',
      versesCount: 'ayə',
      makkah: 'Məkkə',
      madinah: 'Mədinə',
      surah: 'Surə',
      totalVerses: 'Ümumi ayələr:',
      revelationIn: 'Nazil olub:',
      noVersesFound: 'Axtarış üzrə ayə tapılmadı.',
      listen: 'Qiraəti dinlə',
      copy: 'Kopyala',
      copied: 'Kopyalandı!',
      tafsirTitle: 'İbn Kəsir Təfsiri və Məna İzahı',
    },
    kaabaCenterpiece: {
      simulatingProgress: '8-ADDIMLI SİMULYASİYA AKTİVDİR...',
      clickToLaunch: 'Niyyət → Təsir dövrünü başlatmaq üçün klikləyin',
      pillars: {
        FAITH: 'İMAN',
        KNOWLEDGE: 'BİLİK',
        PEOPLE: 'İNSANLAR',
        TECHNOLOGY: 'TEXNOLOGİYA',
        EARTH: 'YER ÜZÜ',
        HARMONY: 'HARMONİYA',
      },
    },
    qiblaAdapter: {
      mapModalTitle: 'Qiblə Vektoru: Cari Məkan → Müqəddəs Məkkə',
      originPoint: 'Çıxış nöqtəsi:',
      meccaCoords: 'Məkkə koordinatları (Kəbə):',
      exactAzimuth: 'Dəqiq azimut (Bearing):',
      distanceGreatCircle: 'Ortodromiya üzrə məsafə:',
      mathNote: 'Hesablama Haversine düsturu və sferik triqonometriya ilə həyata keçirilir. Xarici xəritə serverlərindən tamamilə asılı olmadan avtonom işləyir.',
      close: 'Bağla',
      rotateTitle: 'Kompasın fırlanmasını simulyasiya etmək üçün klikləyin',
      gpsRefreshTitle: 'Koordinatları GPS ilə yeniləyin',
    },
    prayerAdapter: {
      fajr: 'Sübh (Fəcr)',
      sunrise: 'Günəş',
      dhuhr: 'Zöhr',
      asr: 'Əsr',
      maghrib: 'Məğrib (Axşam)',
      isha: 'İşa (Gecə)',
      nextPrayerIn: 'Növbəti namaza qalan vaxt:',
      scheduleModalTitle: 'Aylıq Namaz Cədvəli və Dəqiq Hesablama',
      closeModal: 'Bağla',
    },
    executionFlow: {
      pipelineTitle: '8-ADDIMLI İCRA BORU KƏMƏRİ',
      hideParams: 'Parametrləri Gizlət',
      paramsAndShura: 'Parametrlər və Şura',
      shuraQuorumVerified: 'Shura Rule #42: Kvorum təsdiqləndi',
      warningExceeds: 'Diqqət: Parametrlər həddi aşır! Shura Rule #42 3-cü addımı bloklayacaq',
      selectShuraRole: 'Şura rolunu seçin',
      rule42Testing: 'Shura Rule #42 hədlərinin sınağı',
      people: 'İnsanlar',
      co2: 'CO2 (ton)',
      nurBudget: 'NUR büdcəsi',
      stepNames: {
        intent: 'Niyyət',
        identity: 'Şəxsiyyət',
        authority: 'Səlahiyyət',
        policy: 'Siyasət',
        execution: 'İcra',
        state: 'Vəziyyət',
        evidence: 'Sübut',
        impact: 'Təsir',
      },
    },
    nurEconomy: {
      ecoProjects: 'Eko-layihə',
      investments: 'İnvestisiya',
      simulateProfit: 'Müzarabə Gəlirini Simulyasiya Et (+850 NUR)',
      mudarabahDesc: 'Rüblük Müzarabə paylanması (+12.4% illik gəlir ekvivalenti, Zero-Riba)',
    },
    globalMetrics: {
      title: 'QLOBAL METRİKALAR',
      realtimeSync: 'REALTIME SYNC',
    },
    liveLogs: {
      inputPlaceholder: 'Niyyət və ya komanda daxil edin (/test-rule-42, /shura, /clear)...',
      send: 'Göndər',
      sendTitle: 'Komandanı icra et',
      noLogsForFilter: 'Bu filtr üçün qeyd tapılmadı',
      failClosedTooltip: 'Fail-Closed memarlığına baxış',
      consentTooltip: 'Human Consent siyasətinə baxış',
      privacyTooltip: 'Məxfilik standartlarına baxış',
      unsafeTooltip: 'Təhlükəsizlik bloklama qaydaları',
      encryptTooltip: 'TEE / AES-256 anbarının auditi',
    },
    sevenDomains: {
      nodeLabeling: 'NÜVƏNİN SEMANTİK TƏFƏRRÜATI',
      inputs: 'Girişlər:',
      outputs: 'Çıxışlar:',
      dependencies: 'Asılılıqlar:',
      close: 'Bağla',
    },
    metaLogosPage: {
      bannerTitle: 'AI MetaLogos — Məntiq Nüvəsi və Mühəndislik Mühiti',
      bannerDesc: 'WebContainer lokal brauzer icra mühiti, 7 nüvə və orkestrasiya mexanizmi',
      workspaceTab: 'Agent İş Mühiti (Workspace)',
      productionLoopTab: 'İstehsalat Dövrü (Production Loop)',
      orchestrationTab: '8-Addımlı İcra Axını',
    },
    settingsPage: {
      bannerTitle: 'Sistem Tənzimləmələri və Fərdi Mühit',
      bannerDesc: '7 dünya lokalizasiyası (EN, RU, AZ, TR, AR, FA, UR), Məxfilik Qrafı və Rol Matrisi tənzimləmələri',
      profileTab: 'Profil və DID',
      privacyTab: 'Məxfilik Qrafı (10)',
      localizationTab: 'Dillər və Əlifbalar (7)',
      appearanceTab: 'Dizayn və Görünüş',
      notificationsTab: 'Bildirişlər',
      securityTab: 'Səlahiyyət Matrisi (9 Rol)',
      dataTab: 'Məlumatlar və Sensorlar',
      saveProfile: 'Profili Yadda Saxla',
      clearCache: 'Lokal Keşi Təmizlə',
    },
  },
  RU: {
    topBar: {
      adapters: 'Адаптеры',
      composer: 'Композер',
      evidence: 'Доказательства',
      sandboxBadge: 'SANDBOX RUNTIME',
      values: 'ЗНАНИЕ · СПРАВЕДЛИВОСТЬ · МИЛОСЕРДИЕ · ЕДИНСТВО · БЛАГОПОЛУЧИЕ',
      gpsPrompt: 'Нажмите для использования реального GPS',
    },
    islamPage: {
      m00Tag: 'M00 ЭТИЧЕСКАЯ БАЗА · ЦЕННОСТИ И ШАРИАТСКАЯ ГАРМОНИЯ',
      bannerTitle: 'Фундамент Ислама и Духовная Этика',
      bannerDesc: 'Исламские ценности являются ядром адаптеров и нравственным компасом KeyMatrix OS',
      sourcesTitle: 'Канонические источники и ссылки (Evidence Proofs)',
      integrationTitle: 'Интеграция в архитектуру KeyMatrix OS',
      integrationDesc: 'Этот этический постулат запрограммирован в модуль PrimeCore и верифицируется в процессе Shura Rule #42. Все автономные ИИ-агенты фильтруют генерации через призму сохранения чести, пользы человечеству и недопущения вреда (Макасыд аш-Шариа).',
      ethicsLayerBadge: 'M00 ЭТИЧЕСКИЙ СЛОЙ v2.0',
      consensusBadge: 'ШАРИАТСКИЙ КОНСЕНСУС: 100% PASS',
    },
    faqPage: {
      bannerTitle: 'Частые вопросы (FAQ) — Знания и Ответы',
      bannerDesc: 'Канонические ответы на вопросы о молитве, финансах, посте, семье и роли этичного ИИ',
      searchPlaceholder: 'Поиск по вопросам...',
      allCategories: 'Все категории',
      sourceTitle: 'Канонический источник и доказательство (Evidence Level)',
      integrationTitle: 'Интеграция с Shura Rule #42 и ИИ-агентами',
      integrationDesc: 'Этот вопрос проверен через этический фильтр и гарантирует соответствие шариатским нормам.',
    },
    quranPage: {
      bannerTitle: 'Священный Коран — Электронный Мусхаф',
      bannerDesc: 'Канонический текст, османская каллиграфия, многоязычные переводы, тафсир и аудио-чтение',
      searchPlaceholder: 'Поиск по аятам, смыслу...',
      catalogTitle: 'Каталог Сур',
      versesCount: 'аятов',
      makkah: 'Мекка',
      madinah: 'Медина',
      surah: 'Сура',
      totalVerses: 'Всего аятов:',
      revelationIn: 'Ниспослана в:',
      noVersesFound: 'Аяты по данному запросу не найдены.',
      listen: 'Прослушать чтение',
      copy: 'Копировать',
      copied: 'Скопировано!',
      tafsirTitle: 'Тафсир Ибн Касира и комментарии',
    },
    kaabaCenterpiece: {
      simulatingProgress: 'СИМУЛЯЦИЯ 8 ШАГОВ АКТИВНА...',
      clickToLaunch: 'Нажмите для запуска цикла Intent → Impact',
      pillars: {
        FAITH: 'ВЕРА',
        KNOWLEDGE: 'ЗНАНИЕ',
        PEOPLE: 'ЛЮДИ',
        TECHNOLOGY: 'ТЕХНОЛОГИИ',
        EARTH: 'ЗЕМЛЯ',
        HARMONY: 'ГАРМОНИЯ',
      },
    },
    qiblaAdapter: {
      mapModalTitle: 'Вектор Кыблы: Исходная точка → Священная Мекка',
      originPoint: 'Исходная точка:',
      meccaCoords: 'Координаты Мекки (Кааба):',
      exactAzimuth: 'Точный азимут (Bearing):',
      distanceGreatCircle: 'Расстояние по ортодромии:',
      mathNote: 'Расчет реализован по формуле Хаверсина и сферической тригонометрии. Полная автономность без зависимости от внешних картографических серверов.',
      close: 'Закрыть',
      rotateTitle: 'Нажмите для имитации вращения компаса',
      gpsRefreshTitle: 'Обновить координаты по GPS',
    },
    prayerAdapter: {
      fajr: 'Фаджр',
      sunrise: 'Восход',
      dhuhr: 'Зухр',
      asr: 'Аср',
      maghrib: 'Магриб',
      isha: 'Иша',
      nextPrayerIn: 'До следующего намаза:',
      scheduleModalTitle: 'Ежемесячное расписание молитв и расчеты',
      closeModal: 'Закрыть',
    },
    executionFlow: {
      pipelineTitle: '8-ШАГОВЫЙ КОНВЕЙЕР ИСПОЛНЕНИЯ',
      hideParams: 'Скрыть параметры',
      paramsAndShura: 'Параметры & Шура',
      shuraQuorumVerified: 'Shura Rule #42: Кворум подтвержден',
      warningExceeds: 'Внимание: Параметры превышают лимиты! Shura Rule #42 заблокирует Шаг 3',
      selectShuraRole: 'Выбрать роль Шура',
      rule42Testing: 'Тестирование порогов Shura Rule #42',
      people: 'Люди',
      co2: 'CO2 (тонн)',
      nurBudget: 'NUR бюджет',
      stepNames: {
        intent: 'Намерение',
        identity: 'Идентичность',
        authority: 'Право',
        policy: 'Политика',
        execution: 'Исполнение',
        state: 'Реестр',
        evidence: 'Доказательство',
        impact: 'Импакт',
      },
    },
    nurEconomy: {
      ecoProjects: 'Эко-проектов',
      investments: 'Инвестиций',
      simulateProfit: 'Симулировать прибыль Мудараба (+850 NUR)',
      mudarabahDesc: 'Квартальное распределение Мудараба (+12.4% APR эквивалент, Zero-Riba)',
    },
    globalMetrics: {
      title: 'ГЛОБАЛЬНЫЕ МЕТРИКИ',
      realtimeSync: 'REALTIME SYNC',
    },
    liveLogs: {
      inputPlaceholder: 'Введите намерение или команду (/test-rule-42, /shura, /clear)...',
      send: 'Отправить',
      sendTitle: 'Выполнить команду / намерение',
      noLogsForFilter: 'Логи для данного фильтра отсутствуют',
      failClosedTooltip: 'Нажмите для просмотра архитектуры Fail-Closed',
      consentTooltip: 'Нажмите для просмотра политики Human Consent',
      privacyTooltip: 'Нажмите для просмотра стандартов приватности',
      unsafeTooltip: 'Нажмите для просмотра правил блокировки',
      encryptTooltip: 'Нажмите для аудита TEE / AES-256 хранилища',
    },
    sevenDomains: {
      nodeLabeling: 'СЕМАНТИЧЕСКИЕ ДАННЫЕ УЗЛА',
      inputs: 'Входы:',
      outputs: 'Выходы:',
      dependencies: 'Зависимости:',
      close: 'Закрыть',
    },
    metaLogosPage: {
      bannerTitle: 'AI MetaLogos — Ядро рассуждений и инженерная среда',
      bannerDesc: 'Двунаправленная инженерная среда WebContainer (LOCAL BROWSER RUNTIME), 7 ядер и оркестрация',
      workspaceTab: 'Среда Агента (Workspace)',
      productionLoopTab: 'Петля Производства',
      orchestrationTab: '8-Step Flow',
    },
    settingsPage: {
      bannerTitle: 'Настройки системы и Персональный Контур',
      bannerDesc: 'Конфигурация 7 мировых локализаций (EN, RU, AZ, TR, AR, FA, UR), Privacy Graph и Матрицы Ролей',
      profileTab: 'Профиль и DID',
      privacyTab: 'Privacy Graph (10)',
      localizationTab: 'Языки и Скрипты (7)',
      appearanceTab: 'Оформление & UI',
      notificationsTab: 'Уведомления',
      securityTab: 'Матрица прав (9 Ролей)',
      dataTab: 'Данные и Сенсоры',
      saveProfile: 'Сохранить профиль',
      clearCache: 'Очистить кэш',
    },
  },
  EN: {
    topBar: {
      adapters: 'Adapters',
      composer: 'Composer',
      evidence: 'Evidence',
      sandboxBadge: 'SANDBOX RUNTIME',
      values: 'KNOWLEDGE · JUSTICE · MERCY · UNITY · PROSPERITY',
      gpsPrompt: 'Click to use real GPS location',
    },
    islamPage: {
      m00Tag: 'M00 ETHICAL BASE · CORE VALUES & SHARIAH HARMONY',
      bannerTitle: 'Foundations of Islam & Spiritual Ethics',
      bannerDesc: 'Islamic values form the core of adapters and the ethical compass of KeyMatrix OS',
      sourcesTitle: 'Canonical Sources & Evidence Proofs',
      integrationTitle: 'KeyMatrix OS Architecture Integration',
      integrationDesc: 'This ethical tenet is programmed into the PrimeCore module and verified via Shura Rule #42. Autonomous AI agents filter generation through preservation of human dignity, societal benefit, and prevention of harm (Maqasid al-Shariah).',
      ethicsLayerBadge: 'M00 ETHICS LAYER v2.0',
      consensusBadge: 'SHARIAH CONSENSUS: 100% PASS',
    },
    faqPage: {
      bannerTitle: 'Frequently Asked Questions (FAQ) — Knowledge & Answers',
      bannerDesc: 'Canonical clarifications on prayer, finance, fasting, family, and ethical AI',
      searchPlaceholder: 'Search questions and answers...',
      allCategories: 'All Categories',
      sourceTitle: 'Canonical Source & Evidence Level',
      integrationTitle: 'Integration with Shura Rule #42 & AI Agents',
      integrationDesc: 'This answer is audited via our ethical filters and ensures full compliance with Shariah and ethical standards.',
    },
    quranPage: {
      bannerTitle: 'The Holy Quran — Electronic Mushaf',
      bannerDesc: 'Canonical text, Uthmani calligraphy, multilingual translations, tafsir and audio recitations',
      searchPlaceholder: 'Search verses, meanings...',
      catalogTitle: 'Surahs Catalog',
      versesCount: 'verses',
      makkah: 'Mecca',
      madinah: 'Medina',
      surah: 'Surah',
      totalVerses: 'Total verses:',
      revelationIn: 'Revealed in:',
      noVersesFound: 'No verses found matching the query.',
      listen: 'Listen recitation',
      copy: 'Copy',
      copied: 'Copied!',
      tafsirTitle: 'Tafsir Ibn Kathir & Commentary',
    },
    kaabaCenterpiece: {
      simulatingProgress: '8-STEP SIMULATION ACTIVE...',
      clickToLaunch: 'Click to launch Intent → Impact cycle',
      pillars: {
        FAITH: 'FAITH',
        KNOWLEDGE: 'KNOWLEDGE',
        PEOPLE: 'PEOPLE',
        TECHNOLOGY: 'TECHNOLOGY',
        EARTH: 'EARTH',
        HARMONY: 'HARMONY',
      },
    },
    qiblaAdapter: {
      mapModalTitle: 'Qibla Vector: Current Location → Sacred Mecca',
      originPoint: 'Origin point:',
      meccaCoords: 'Mecca coordinates (Kaaba):',
      exactAzimuth: 'Exact bearing:',
      distanceGreatCircle: 'Great-circle distance:',
      mathNote: 'Calculated via Haversine formula and spherical trigonometry. Fully autonomous without external map server dependencies.',
      close: 'Close',
      rotateTitle: 'Click to simulate compass rotation',
      gpsRefreshTitle: 'Refresh coordinates via GPS',
    },
    prayerAdapter: {
      fajr: 'Fajr',
      sunrise: 'Sunrise',
      dhuhr: 'Dhuhr',
      asr: 'Asr',
      maghrib: 'Maghrib',
      isha: 'Isha',
      nextPrayerIn: 'Next prayer in:',
      scheduleModalTitle: 'Monthly Prayer Schedule & Accurate Calculations',
      closeModal: 'Close',
    },
    executionFlow: {
      pipelineTitle: '8-STEP EXECUTION PIPELINE',
      hideParams: 'Hide Parameters',
      paramsAndShura: 'Parameters & Shura',
      shuraQuorumVerified: 'Shura Rule #42: Quorum verified',
      warningExceeds: 'Warning: Thresholds exceeded! Shura Rule #42 will block Step 3',
      selectShuraRole: 'Select Shura Role',
      rule42Testing: 'Shura Rule #42 Threshold Testing',
      people: 'People',
      co2: 'CO2 (tons)',
      nurBudget: 'NUR budget',
      stepNames: {
        intent: 'Intent',
        identity: 'Identity',
        authority: 'Authority',
        policy: 'Policy',
        execution: 'Execution',
        state: 'State',
        evidence: 'Evidence',
        impact: 'Impact',
      },
    },
    nurEconomy: {
      ecoProjects: 'Eco-Projects',
      investments: 'Investments',
      simulateProfit: 'Simulate Mudarabah Profit Share (+850 NUR)',
      mudarabahDesc: 'Quarterly Mudarabah distribution (+12.4% APR equivalent, Zero-Riba)',
    },
    globalMetrics: {
      title: 'GLOBAL METRICS',
      realtimeSync: 'REALTIME SYNC',
    },
    liveLogs: {
      inputPlaceholder: 'Enter intent or command (/test-rule-42, /shura, /clear)...',
      send: 'Send',
      sendTitle: 'Execute command or intent',
      noLogsForFilter: 'No logs found for this filter',
      failClosedTooltip: 'Click to view Fail-Closed architecture',
      consentTooltip: 'Click to view Human Consent policy',
      privacyTooltip: 'Click to view privacy standards',
      unsafeTooltip: 'Click to view blocking rules',
      encryptTooltip: 'Click to audit TEE / AES-256 storage',
    },
    sevenDomains: {
      nodeLabeling: 'NODE SEMANTIC LABELING',
      inputs: 'Inputs:',
      outputs: 'Outputs:',
      dependencies: 'Dependencies:',
      close: 'Close',
    },
    metaLogosPage: {
      bannerTitle: 'AI MetaLogos — Reasoning Core & Engineering Runtime',
      bannerDesc: 'WebContainer local browser runtime, 7 cores and task orchestration',
      workspaceTab: 'Agent Workspace',
      productionLoopTab: 'Production Loop',
      orchestrationTab: '8-Step Flow',
    },
    settingsPage: {
      bannerTitle: 'System Settings & Personal Realm',
      bannerDesc: 'Configuration of 7 global locales (EN, RU, AZ, TR, AR, FA, UR), Privacy Graph and Role Matrix',
      profileTab: 'Profile & DID',
      privacyTab: 'Privacy Graph (10)',
      localizationTab: 'Languages & Scripts (7)',
      appearanceTab: 'Appearance & UI',
      notificationsTab: 'Notifications',
      securityTab: 'Role Matrix (9 Roles)',
      dataTab: 'Data & Storage',
      saveProfile: 'Save Profile',
      clearCache: 'Clear Local Cache',
    },
  },
  TR: {
    topBar: {
      adapters: 'Adaptörler',
      composer: 'Besteci',
      evidence: 'Kanıtlar',
      sandboxBadge: 'KORUMALI ALAN',
      values: 'BİLGİ · ADALET · MERHAMET · BİRLİK · REFAH',
      gpsPrompt: 'Gerçek GPS konumunu kullanmak için tıklayın',
    },
    islamPage: {
      m00Tag: 'M00 AHLAKİ TEMEL · TEMEL DEĞERLER VE ŞERİAT UYUMU',
      bannerTitle: 'İslam\'ın Temelleri ve Manevi Ahlak',
      bannerDesc: 'İslami değerler KeyMatrix OS adaptörlerinin çekirdeğini ve ahlaki pusulasını oluşturur',
      sourcesTitle: 'Kanonik Kaynaklar ve Referanslar (Evidence Proofs)',
      integrationTitle: 'KeyMatrix OS Mimarisine Entegrasyon',
      integrationDesc: 'Bu ahlaki ilke PrimeCore modülüne işlenmiş olup Shura Rule #42 sürecinde doğrulanır. Otonom yapay zeka ajanları tüm çıktıları insan onuru, toplumsal fayda ve zararın önlenmesi (Makasıdü\'ş-Şeria) prizmasından geçirir.',
      ethicsLayerBadge: 'M00 AHLAK KATMANI v2.0',
      consensusBadge: 'ŞERİAT UZLAŞISI: 100% GEÇTİ',
    },
    faqPage: {
      bannerTitle: 'Sıkça Sorulan Sorular (SSS) — Bilgi ve Yanıtlar',
      bannerDesc: 'Namaz, finans, oruç, aile ve ahlaki yapay zekanın rolüne dair kanonik yanıtlar',
      searchPlaceholder: 'Sorularda ve yanıtlarda ara...',
      allCategories: 'Tüm Kategoriler',
      sourceTitle: 'Kanonik Kaynak ve Kanıt Düzeyi',
      integrationTitle: 'Shura Rule #42 ve AI Ajanları ile Entegrasyon',
      integrationDesc: 'Bu yanıt etik filtrelerimiz tarafından denetlenmiş olup Şeriat ilkeleriyle tam uyumludur.',
    },
    quranPage: {
      bannerTitle: 'Kuran-ı Kerim — Elektronik Mushaf',
      bannerDesc: 'Kanonik metin, Osmanlı hattı, çok dilli mealler, tefsir ve sesli kıraat',
      searchPlaceholder: 'Ayetlerde ve meallerde ara...',
      catalogTitle: 'Sureler Kataloğu',
      versesCount: 'ayet',
      makkah: 'Mekke',
      madinah: 'Medine',
      surah: 'Sure',
      totalVerses: 'Toplam ayet:',
      revelationIn: 'İniş yeri:',
      noVersesFound: 'Aramaya uygun ayet bulunamadı.',
      listen: 'Kıraati dinle',
      copy: 'Kopyala',
      copied: 'Kopyalandı!',
      tafsirTitle: 'İbn Kesir Tefsiri ve Açıklamalar',
    },
    kaabaCenterpiece: {
      simulatingProgress: '8 ADIMLI SİMÜLASYON AKTİF...',
      clickToLaunch: 'Niyet → Etki döngüsünü başlatmak için tıklayın',
      pillars: {
        FAITH: 'İMAN',
        KNOWLEDGE: 'BİLGİ',
        PEOPLE: 'İNSANLAR',
        TECHNOLOGY: 'TEKNOLOJİ',
        EARTH: 'DÜNYA',
        HARMONY: 'UYUM',
      },
    },
    qiblaAdapter: {
      mapModalTitle: 'Kıble Vektörü: Konum → Kutsal Mekke',
      originPoint: 'Başlangıç noktası:',
      meccaCoords: 'Mekke koordinatları (Kabe):',
      exactAzimuth: 'Tam azimut (Açı):',
      distanceGreatCircle: 'Büyük daire mesafesi:',
      mathNote: 'Haversine formülü ve küresel trigonometri ile hesaplanmıştır. Dış harita sunucularından bağımsız çalışır.',
      close: 'Kapat',
      rotateTitle: 'Pusula dönüşünü simüle etmek için tıklayın',
      gpsRefreshTitle: 'GPS ile koordinatları yenile',
    },
    prayerAdapter: {
      fajr: 'İmsak (Sabah)',
      sunrise: 'Güneş',
      dhuhr: 'Öğle',
      asr: 'İkindi',
      maghrib: 'Akşam',
      isha: 'Yatsı',
      nextPrayerIn: 'Sonraki namaza kalan:',
      scheduleModalTitle: 'Aylık Namaz Vakitleri ve Hesaplamalar',
      closeModal: 'Kapat',
    },
    executionFlow: {
      pipelineTitle: '8 ADIMLI İCRA HATTI',
      hideParams: 'Parametreleri Gizle',
      paramsAndShura: 'Parametreler ve Şura',
      shuraQuorumVerified: 'Shura Rule #42: Yeter sayısı doğrulandı',
      warningExceeds: 'Uyarı: Limitler aşıldı! Shura Rule #42 3. adımı engelleyecektir',
      selectShuraRole: 'Şura Rolünü Seçin',
      rule42Testing: 'Shura Rule #42 Limit Testi',
      people: 'İnsanlar',
      co2: 'CO2 (ton)',
      nurBudget: 'NUR bütçesi',
      stepNames: {
        intent: 'Niyet',
        identity: 'Kimlik',
        authority: 'Yetki',
        policy: 'Politika',
        execution: 'İcra',
        state: 'Durum',
        evidence: 'Kanıt',
        impact: 'Etki',
      },
    },
    nurEconomy: {
      ecoProjects: 'Eko-Proje',
      investments: 'Yatırım',
      simulateProfit: 'Mudaraba Gelirini Simüle Et (+850 NUR)',
      mudarabahDesc: 'Üç aylık Mudaraba dağıtımı (+%12.4 yıllık getiri eşdeğeri, Sıfır Faiz)',
    },
    globalMetrics: {
      title: 'KÜRESEL METRİKLER',
      realtimeSync: 'GERÇEK ZAMANLI SENKRONİZASYON',
    },
    liveLogs: {
      inputPlaceholder: 'Niyet veya komut girin (/test-rule-42, /shura, /clear)...',
      send: 'Gönder',
      sendTitle: 'Komutu çalıştır',
      noLogsForFilter: 'Bu filtre için kayıt bulunamadı',
      failClosedTooltip: 'Fail-Closed mimarisini görüntüle',
      consentTooltip: 'Human Consent politikasını görüntüle',
      privacyTooltip: 'Gizlilik standartlarını görüntüle',
      unsafeTooltip: 'Engelleme kurallarını görüntüle',
      encryptTooltip: 'TEE / AES-256 depolamasını denetle',
    },
    sevenDomains: {
      nodeLabeling: 'ÇEKİRDEK SEMANTİK BİLGİSİ',
      inputs: 'Girişler:',
      outputs: 'Çıkışlar:',
      dependencies: 'Bağımlılıklar:',
      close: 'Kapat',
    },
    metaLogosPage: {
      bannerTitle: 'AI MetaLogos — Muhakeme Çekirdeği ve Mühendislik Ortamı',
      bannerDesc: 'WebContainer yerel tarayıcı ortamı, 7 çekirdek ve orkestrasyon',
      workspaceTab: 'Ajan Çalışma Alanı',
      productionLoopTab: 'Üretim Döngüsü',
      orchestrationTab: '8 Adımlı Akış',
    },
    settingsPage: {
      bannerTitle: 'Sistem Ayarları ve Kişisel Alan',
      bannerDesc: '7 küresel dil (EN, RU, AZ, TR, AR, FA, UR), Gizlilik Grafiği ve Rol Matrisi yapılandırması',
      profileTab: 'Profil ve DID',
      privacyTab: 'Gizlilik Grafiği (10)',
      localizationTab: 'Diller ve Alfabeler (7)',
      appearanceTab: 'Tasarım ve Görünüm',
      notificationsTab: 'Bildirimler',
      securityTab: 'Yetki Matrisi (9 Rol)',
      dataTab: 'Veriler ve Depolama',
      saveProfile: 'Profili Kaydet',
      clearCache: 'Yerel Önbelleği Temizle',
    },
  },
  AR: {
    topBar: {
      adapters: 'المحولات',
      composer: 'المصمم',
      evidence: 'الأدلة',
      sandboxBadge: 'بيئة المحاكاة',
      values: 'العلم · العدل · الرحمة · الوحدة · النماء',
      gpsPrompt: 'انقر لاستخدام نظام تحديد المواقع الحقيقي',
    },
    islamPage: {
      m00Tag: 'M00 القاعدة الأخلاقية · القيم الأساسية والانسجام الشرعي',
      bannerTitle: 'أسس الإسلام والأخلاق الروحية',
      bannerDesc: 'تمثل القيم الإسلامية جوهر المحولات والبوصلة الأخلاقية لنظام KeyMatrix OS',
      sourcesTitle: 'المصادر والوثائق المعتمدة (Evidence Proofs)',
      integrationTitle: 'التكامل مع معمارية KeyMatrix OS',
      integrationDesc: 'تمت برمجة هذا المبدأ الأخلاقي في وحدة PrimeCore ويتم التحقق منه عبر قاعدة الشورى رقم 42، حيث تمر مخرجات الذكاء الاصطناعي عبر ميزان حفظ الكرامة ومقاصد الشريعة.',
      ethicsLayerBadge: 'M00 طبقة الأخلاق v2.0',
      consensusBadge: 'الإجماع الشرعي: 100% نجاح',
    },
    faqPage: {
      bannerTitle: 'الأسئلة الشائعة (FAQ) — المعرفة والأجوبة',
      bannerDesc: 'أجوبة معتمدة حول الصلاة والمعاملات والصيام والأسرة والذكاء الاصطناعي الأخلاقي',
      searchPlaceholder: 'ابحث في الأسئلة والأجوبة...',
      allCategories: 'جميع الفئات',
      sourceTitle: 'المصدر المعتمد ومستوى الإثبات',
      integrationTitle: 'التكامل مع قاعدة الشورى رقم 42 والوكلاء الأذكياء',
      integrationDesc: 'تمت مراجعة هذا الجواب لضمان توافقه التام مع المعايير والأحكام الشرعية.',
    },
    quranPage: {
      bannerTitle: 'القرآن الكريم — المصحف الإلكتروني',
      bannerDesc: 'النص المعتمد، الخط العثماني، الترجمات المتعددة، التفاسير والتلاوات الصوتية',
      searchPlaceholder: 'ابحث في الآيات والمعاني...',
      catalogTitle: 'فهرس السور',
      versesCount: 'آية',
      makkah: 'مكية',
      madinah: 'مدنية',
      surah: 'سورة',
      totalVerses: 'عدد الآيات:',
      revelationIn: 'مكان النزول:',
      noVersesFound: 'لم يتم العثور على آيات مطابقة للبحث.',
      listen: 'استمع للتلاوة',
      copy: 'نسخ',
      copied: 'تم النسخ!',
      tafsirTitle: 'تفسير ابن كثير والبيان',
    },
    kaabaCenterpiece: {
      simulatingProgress: 'المحاكاة ذات 8 خطوات نشطة...',
      clickToLaunch: 'انقر لتشغيل دورة النية ← الأثر',
      pillars: {
        FAITH: 'الإيمان',
        KNOWLEDGE: 'العلم',
        PEOPLE: 'الناس',
        TECHNOLOGY: 'التقنية',
        EARTH: 'الأرض',
        HARMONY: 'الانسجام',
      },
    },
    qiblaAdapter: {
      mapModalTitle: 'متجه القبلة: الموقع الحالي ← مكة المكرمة',
      originPoint: 'نقطة الانطلاق:',
      meccaCoords: 'إحداثيات مكة (الكعبة):',
      exactAzimuth: 'الاتجاه الدقيق (Azimuth):',
      distanceGreatCircle: 'المسافة عبر الدائرة العظمى:',
      mathNote: 'يتم الحساب وفق صيغة هافرسين وحساب المثلثات الكروية، باستقلالية تامة عن الخوادم الخارجية.',
      close: 'إغلاق',
      rotateTitle: 'انقر لمحاكاة دوران البوصلة',
      gpsRefreshTitle: 'تحديث الإحداثيات عبر GPS',
    },
    prayerAdapter: {
      fajr: 'الفجر',
      sunrise: 'الشروق',
      dhuhr: 'الظهر',
      asr: 'العصر',
      maghrib: 'المغرب',
      isha: 'العشاء',
      nextPrayerIn: 'الوقت المتبقي للصلاة القادمة:',
      scheduleModalTitle: 'جدول مواقيت الصلاة والحسابات الفلكية',
      closeModal: 'إغلاق',
    },
    executionFlow: {
      pipelineTitle: 'خطوات التنفيذ الثمانية',
      hideParams: 'إخفاء المعلمات',
      paramsAndShura: 'المعايير والشورى',
      shuraQuorumVerified: 'قاعدة الشورى رقم 42: تم استيفاء النصاب',
      warningExceeds: 'تحذير: تجاوز الحدود المسموحة! قاعدة الشورى رقم 42 ستوقف الخطوة 3',
      selectShuraRole: 'اختر دور الشورى',
      rule42Testing: 'اختبار حدود قاعدة الشورى رقم 42',
      people: 'الناس',
      co2: 'ثاني أكسيد الكربون (طن)',
      nurBudget: 'ميزانية NUR',
      stepNames: {
        intent: 'النية',
        identity: 'الهوية',
        authority: 'السلطة',
        policy: 'السياسة',
        execution: 'التنفيذ',
        state: 'الحالة',
        evidence: 'الدليل',
        impact: 'الأثر',
      },
    },
    nurEconomy: {
      ecoProjects: 'مشاريع بيئية',
      investments: 'استثمارات',
      simulateProfit: 'محاكاة أرباح المضاربة (+850 NUR)',
      mudarabahDesc: 'توزيع أرباح المضاربة الفصلي (عائد سنوي يعادل 12.4%، خالٍ من الربا)',
    },
    globalMetrics: {
      title: 'المؤشرات العالمية',
      realtimeSync: 'مزامنة فورية',
    },
    liveLogs: {
      inputPlaceholder: 'أدخل النية أو الأمر (/test-rule-42, /shura, /clear)...',
      send: 'إرسال',
      sendTitle: 'تنفيذ الأمر أو النية',
      noLogsForFilter: 'لا توجد سجلات لهذا التصنيف',
      failClosedTooltip: 'عرض معمارية Fail-Closed',
      consentTooltip: 'عرض سياسة الموافقة الإنسانية',
      privacyTooltip: 'عرض معايير الخصوصية',
      unsafeTooltip: 'عرض قواعد الحظر الوقائي',
      encryptTooltip: 'تدقيق تشفير TEE / AES-256',
    },
    sevenDomains: {
      nodeLabeling: 'البيانات الدلالية للنواة',
      inputs: 'المدخلات:',
      outputs: 'المخرجات:',
      dependencies: 'التبعيات:',
      close: 'إغلاق',
    },
    metaLogosPage: {
      bannerTitle: 'AI MetaLogos — نواة التفكير والبيئة الهندسية',
      bannerDesc: 'بيئة WebContainer المحلية في المتصفح، النوى السبعة والتنسيق الفعال',
      workspaceTab: 'مساحة عمل الوكيل',
      productionLoopTab: 'حلقة الإنتاج',
      orchestrationTab: 'التدفق ذو 8 خطوات',
    },
    settingsPage: {
      bannerTitle: 'إعدادات النظام والملف الشخصي',
      bannerDesc: 'إعداد 7 لغات عالمية، ومخطط الخصوصية ومصفوفة الصلاحيات',
      profileTab: 'الملف الشخصي و DID',
      privacyTab: 'مخطط الخصوصية (10)',
      localizationTab: 'اللغات والخطوط (7)',
      appearanceTab: 'المظهر والواجهة',
      notificationsTab: 'الإشعارات',
      securityTab: 'مصفوفة الصلاحيات (9 أدوار)',
      dataTab: 'البيانات والتخزين',
      saveProfile: 'حفظ الملف الشخصي',
      clearCache: 'مسح الذاكرة المؤقتة',
    },
  },
  FA: {
    topBar: {
      adapters: 'مبدل‌ها',
      composer: 'طراح',
      evidence: 'شواهد',
      sandboxBadge: 'محیط آزمایشی',
      values: 'دانش · عدالت · مهر · یکپارچگی · برکت',
      gpsPrompt: 'برای استفاده از موقعیت مکانی واقعی کلیک کنید',
    },
    islamPage: {
      m00Tag: 'M00 پایگاه اخلاقی · ارزش‌های بنیادین و هماهنگی شریعت',
      bannerTitle: 'بنیان‌های اسلام و اخلاق معنوی',
      bannerDesc: 'ارزش‌های اسلامی هسته اصلی مبدل‌ها و قطب‌نمای اخلاقی سیستم KeyMatrix OS هستند',
      sourcesTitle: 'منابع و مدارک معتبر (Evidence Proofs)',
      integrationTitle: 'یکپارچه‌سازی در معماری KeyMatrix OS',
      integrationDesc: 'این اصل اخلاقی در ماژول PrimeCore تعریف شده و در فرایند قانون شماره ۴۲ شورا بررسی می‌شود تا منافع بشریت و کرامت انسانی حفظ گردد.',
      ethicsLayerBadge: 'M00 لایه اخلاق v2.0',
      consensusBadge: 'اجماع شرعی: ۱۰۰٪ موفق',
    },
    faqPage: {
      bannerTitle: 'پرسش‌های متداول (FAQ) — دانش و پاسخ‌ها',
      bannerDesc: 'پاسخ‌های معتبر در مورد نماز، امور مالی، روزه، خانواده و هوش مصنوعی اخلاقی',
      searchPlaceholder: 'جستجو در پرسش‌ها و پاسخ‌ها...',
      allCategories: 'همه دسته‌ها',
      sourceTitle: 'منبع معتبر و سطح مدرک',
      integrationTitle: 'یکپارچگی با قانون شماره ۴۲ شورا و عامل‌های هوش مصنوعی',
      integrationDesc: 'پاسخ این پرسش با معیارهای اخلاقی و موازین شرعی مطابقت کامل دارد.',
    },
    quranPage: {
      bannerTitle: 'قرآن کریم — مصحف الکترونیکی',
      bannerDesc: 'متن معتبر، خط عثمانی، ترجمه‌های چندزبانه، تفسیر و تلاوت صوتی',
      searchPlaceholder: 'جستجو در آیات و معانی...',
      catalogTitle: 'فهرست سوره‌ها',
      versesCount: 'آیه',
      makkah: 'مکی',
      madinah: 'مدنی',
      surah: 'سوره',
      totalVerses: 'تعداد کل آیات:',
      revelationIn: 'محل نزول:',
      noVersesFound: 'آیه‌ای مطابق با جستجو یافت نشد.',
      listen: 'شنیدن تلاوت',
      copy: 'کپی',
      copied: 'کپی شد!',
      tafsirTitle: 'تفسیر ابن کثیر و توضیحات',
    },
    kaabaCenterpiece: {
      simulatingProgress: 'شبیه‌سازی ۸ مرحله‌ای فعال است...',
      clickToLaunch: 'برای آغاز چرخه نیت به اثر کلیک کنید',
      pillars: {
        FAITH: 'ایمان',
        KNOWLEDGE: 'دانش',
        PEOPLE: 'مردم',
        TECHNOLOGY: 'فناوری',
        EARTH: 'زمین',
        HARMONY: 'هماهنگی',
      },
    },
    qiblaAdapter: {
      mapModalTitle: 'بردار قبله: موقعیت فعلی به سوی مکه مکرمه',
      originPoint: 'نقطه آغاز:',
      meccaCoords: 'مختصات مکه (کعبه):',
      exactAzimuth: 'زاویه دقیق:',
      distanceGreatCircle: 'فاصله دایره عظیمه:',
      mathNote: 'محاسبه با فرمول هاورسین و مثلثات کروی انجام می‌شود، کاملاً مستقل از سرورهای خارجی.',
      close: 'بستن',
      rotateTitle: 'برای شبیه‌سازی چرخش قطب‌نما کلیک کنید',
      gpsRefreshTitle: 'به‌روزرسانی مختصات با GPS',
    },
    prayerAdapter: {
      fajr: 'فجر (صبح)',
      sunrise: 'طلوع آفتاب',
      dhuhr: 'ظهر',
      asr: 'عصر',
      maghrib: 'مغرب',
      isha: 'عشاء',
      nextPrayerIn: 'زمان تا نماز بعدی:',
      scheduleModalTitle: 'جدول ماهانه اوقات شرعی و محاسبات دقیق',
      closeModal: 'بستن',
    },
    executionFlow: {
      pipelineTitle: 'چرخه اجرای ۸ مرحله‌ای',
      hideParams: 'پنهان کردن پارامترها',
      paramsAndShura: 'پارامترها و شورا',
      shuraQuorumVerified: 'قانون شورا ۴۲: حد نصاب تأیید شد',
      warningExceeds: 'هشدار: مقادیر از حد مجاز فراتر رفته است! قانون شورا گام ۳ را متوقف خواهد کرد',
      selectShuraRole: 'انتخاب نقش شورا',
      rule42Testing: 'آزمایش آستانه‌های قانون شماره ۴۲ شورا',
      people: 'افراد',
      co2: 'دی‌اکسید کربن (تن)',
      nurBudget: 'بودجه NUR',
      stepNames: {
        intent: 'نیت',
        identity: 'هویت',
        authority: 'صلاحیت',
        policy: 'خط‌مشی',
        execution: 'اجرا',
        state: 'وضعیت',
        evidence: 'مدرک',
        impact: 'اثرگذاری',
      },
    },
    nurEconomy: {
      ecoProjects: 'پروژه زیست‌محیطی',
      investments: 'سرمایه‌گذاری',
      simulateProfit: 'شبیه‌سازی سود مضاربه (+850 NUR)',
      mudarabahDesc: 'توزیع سود مضاربه سه‌ماهه (معادل ۱۲.۴٪ سالانه، کاملاً بدون ربا)',
    },
    globalMetrics: {
      title: 'شاخص‌های جهانی',
      realtimeSync: 'همگام‌سازی بلادرنگ',
    },
    liveLogs: {
      inputPlaceholder: 'نیت یا دستور را وارد کنید (/test-rule-42, /shura, /clear)...',
      send: 'ارسال',
      sendTitle: 'اجرای دستور یا نیت',
      noLogsForFilter: 'هیچ گزارشی برای این فیلتر یافت نشد',
      failClosedTooltip: 'مشاهده معماری Fail-Closed',
      consentTooltip: 'مشاهده خط‌مشی رضایت انسانی',
      privacyTooltip: 'مشاهده استانداردهای حریم خصوصی',
      unsafeTooltip: 'مشاهده قوانین بازدارنده',
      encryptTooltip: 'بررسی امنیت TEE / AES-256',
    },
    sevenDomains: {
      nodeLabeling: 'اطلاعات معنایی هسته',
      inputs: 'ورودی‌ها:',
      outputs: 'خروجی‌ها:',
      dependencies: 'وابستگی‌ها:',
      close: 'بستن',
    },
    metaLogosPage: {
      bannerTitle: 'AI MetaLogos — هسته استدلال و محیط مهندسی',
      bannerDesc: 'محیط مرورگر محلی WebContainer، ۷ هسته و هماهنگی کارها',
      workspaceTab: 'محیط کار عامل',
      productionLoopTab: 'چرخه تولید',
      orchestrationTab: 'جریان ۸ مرحله‌ای',
    },
    settingsPage: {
      bannerTitle: 'تنظیمات سیستم و حریم شخصی',
      bannerDesc: 'پیکربندی ۷ زبان جهانی، گراف حریم خصوصی و ماتریس نقش‌ها',
      profileTab: 'پروفایل و DID',
      privacyTab: 'گراف حریم خصوصی (۱۰)',
      localizationTab: 'زبان‌ها و خطوط (۷)',
      appearanceTab: 'ظاهر و تم',
      notificationsTab: 'اعلان‌ها',
      securityTab: 'ماتریس دسترسی (۹ نقش)',
      dataTab: 'داده‌ها و حافظه',
      saveProfile: 'ذخیره پروفایل',
      clearCache: 'پاک کردن حافظه پنهان',
    },
  },
  UR: {
    topBar: {
      adapters: 'اڈاپٹرز',
      composer: 'کمپوزر',
      evidence: 'شواہد',
      sandboxBadge: 'سینڈ باکس رن ٹائم',
      values: 'علم · عدل · رحمت · اتحاد · خوشحالی',
      gpsPrompt: 'حقیقی جی پی ایس کے لیے کلک کریں',
    },
    islamPage: {
      m00Tag: 'M00 اخلاقی بنیاد · بنیادی اقدار اور شریعت کی ہم آہنگی',
      bannerTitle: 'اسلام کی بنیادی تعلیمات اور روحانی اخلاق',
      bannerDesc: 'اسلامی اقدار KeyMatrix OS کے اڈاپٹرز کا بنیادی ستون اور اخلاقی قطب نما ہیں',
      sourcesTitle: 'مستند مآخذ اور حوالہ جات (Evidence Proofs)',
      integrationTitle: 'KeyMatrix OS کے ڈھانچے میں انضمام',
      integrationDesc: 'یہ اخلاقی اصول پرائم کور میں شامل ہے اور شوریٰ رول ۴۲ کے تحت جانچا جاتا ہے تاکہ انسانیت کے فائدے اور مقاصدِ شریعت کی تکمیل ہو۔',
      ethicsLayerBadge: 'M00 اخلاقیات کی تہہ v2.0',
      consensusBadge: 'شرعی اتفاق رائے: ۱۰۰٪ کامیاب',
    },
    faqPage: {
      bannerTitle: 'اکثر پوچھے جانے والے سوالات — علم اور جوابات',
      bannerDesc: 'نماز، مالیات، روزے، خاندان اور اخلاقی مصنوعی ذہانت کے بارے میں مستند وضاحتیں',
      searchPlaceholder: 'سوالات و جوابات میں تلاش کریں...',
      allCategories: 'تمام زمرہ جات',
      sourceTitle: 'مستند ماخذ اور ثبوت کا درجہ',
      integrationTitle: 'شوریٰ رول ۴۲ اور AI ایجنٹس کے ساتھ ہم آہنگی',
      integrationDesc: 'یہ جواب اخلاقی فلٹرز کے تحت تصدیق شدہ اور شرعی اصولوں کے عین مطابق ہے۔',
    },
    quranPage: {
      bannerTitle: 'قرآن مجید — الیکٹرانک مصحف',
      bannerDesc: 'مستند متن، عثمانی خط، کثیر لسانی تراجم، تفاسیر اور تلاوت',
      searchPlaceholder: 'آیات اور تراجم میں تلاش کریں...',
      catalogTitle: 'سورتوں کی فہرست',
      versesCount: 'آیات',
      makkah: 'مکی',
      madinah: 'مدنی',
      surah: 'سورۃ',
      totalVerses: 'کل آیات:',
      revelationIn: 'مقام نزول:',
      noVersesFound: 'تلاش کے مطابق کوئی آیت نہیں ملی۔',
      listen: 'تلاوت سنیں',
      copy: 'کاپی کریں',
      copied: 'کاپی ہو گیا!',
      tafsirTitle: 'تفسیر ابن کثیر اور وضاحتی نکات',
    },
    kaabaCenterpiece: {
      simulatingProgress: '۸ مراحل کا سمیولیشن جاری ہے...',
      clickToLaunch: 'نیت سے اثر کے عمل کو شروع کرنے کے لیے کلک کریں',
      pillars: {
        FAITH: 'ایمان',
        KNOWLEDGE: 'علم',
        PEOPLE: 'لوگ',
        TECHNOLOGY: 'ٹیکنالوجی',
        EARTH: 'زمین',
        HARMONY: 'ہم آہنگی',
      },
    },
    qiblaAdapter: {
      mapModalTitle: 'قبلہ رخ: موجودہ مقام تا مکہ مکرمہ',
      originPoint: 'مقام آغاز:',
      meccaCoords: 'مکہ کے کوآرڈینیٹس:',
      exactAzimuth: 'درست زاویہ:',
      distanceGreatCircle: 'فاصلہ:',
      mathNote: 'حسابات بیرونی نقشوں پر انحصار کیے بغیر خود مختار طور پر ہاورسائن فارمولے کے تحت کیے جاتے ہیں۔',
      close: 'بند کریں',
      rotateTitle: 'قطب نما گھمانے کے لیے کلک کریں',
      gpsRefreshTitle: 'جی پی ایس کے ذریعے کوآرڈینیٹس اپ ڈیٹ کریں',
    },
    prayerAdapter: {
      fajr: 'فجر',
      sunrise: 'طلوع آفتاب',
      dhuhr: 'ظہر',
      asr: 'عصر',
      maghrib: 'مغرب',
      isha: 'عشاء',
      nextPrayerIn: 'اگلی نماز میں باقی وقت:',
      scheduleModalTitle: 'نماز کے اوقات کا ماہانہ جدول',
      closeModal: 'بند کریں',
    },
    executionFlow: {
      pipelineTitle: '۸ مراحل پر مشتمل نفاذ کا عمل',
      hideParams: 'پیرامیٹرز چھپائیں',
      paramsAndShura: 'پیرامیٹرز اور شوریٰ',
      shuraQuorumVerified: 'شوریٰ رول ۴۲: کورم مکمل ہو گیا',
      warningExceeds: 'انتباہ: حدود پار ہو گئیں! شوریٰ رول ۴۲ تیسرا مرحلہ روک دے گا',
      selectShuraRole: 'شوریٰ کا کردار منتخب کریں',
      rule42Testing: 'شوریٰ رول ۴۲ کی حدود کی جانچ',
      people: 'افراد',
      co2: 'کاربن (ٹن)',
      nurBudget: 'نور بجٹ',
      stepNames: {
        intent: 'نیت',
        identity: 'شناخت',
        authority: 'اختیار',
        policy: 'پالیسی',
        execution: 'عمل درآمد',
        state: 'حالت',
        evidence: 'ثبوت',
        impact: 'اثر',
      },
    },
    nurEconomy: {
      ecoProjects: 'ماحولیاتی منصوبے',
      investments: 'سرمایہ کاری',
      simulateProfit: 'مضاربہ منافع کا تخمینہ (+850 NUR)',
      mudarabahDesc: 'سہ ماہی مضاربہ منافع (۱۲.۴ فیصد سالانہ کے مساوی، بلا سود)',
    },
    globalMetrics: {
      title: 'عالمی اشاریے',
      realtimeSync: 'براہ راست ہم آہنگی',
    },
    liveLogs: {
      inputPlaceholder: 'نیت یا کمانڈ درج کریں (/test-rule-42, /shura, /clear)...',
      send: 'ارسال کریں',
      sendTitle: 'کمانڈ یا نیت پر عمل کریں',
      noLogsForFilter: 'اس فلٹر کے لیے کوئی ریکارڈ موجود نہیں',
      failClosedTooltip: 'Fail-Closed ڈھانچہ دیکھیں',
      consentTooltip: 'انسانی رضامندی کی پالیسی دیکھیں',
      privacyTooltip: 'پرائیویسی معیارات دیکھیں',
      unsafeTooltip: 'حفاظتی پابندیاں دیکھیں',
      encryptTooltip: 'TEE / AES-256 کی جانچ کریں',
    },
    sevenDomains: {
      nodeLabeling: 'نوڈ کی معنوی تفصیلات',
      inputs: 'ان پٹ:',
      outputs: 'آؤٹ پٹ:',
      dependencies: 'انحصار:',
      close: 'بند کریں',
    },
    metaLogosPage: {
      bannerTitle: 'AI MetaLogos — استدلال کا مرکز اور انجینئرنگ کا ماحول',
      bannerDesc: 'براؤزر پر مبنی WebContainer رن ٹائم، ۷ کور اور نظم و ضبط',
      workspaceTab: 'ایجنٹ ورک اسپیس',
      productionLoopTab: 'پروڈکشن کا دائرہ',
      orchestrationTab: '۸ مراحل کا عمل',
    },
    settingsPage: {
      bannerTitle: 'سسٹم کی ترتیبات اور ذاتی حدود',
      bannerDesc: '۷ عالمی زبانوں کی ترتیبات، پرائیویسی گراف اور کردار کی حدود',
      profileTab: 'پروفائل اور DID',
      privacyTab: 'پرائیویسی گراف (۱۰)',
      localizationTab: 'زبانیں اور رسم الخط (۷)',
      appearanceTab: 'ظاہری ساخت اور تھیم',
      notificationsTab: 'اطلاعات',
      securityTab: 'اختیارات کا نقشہ (۹ کردار)',
      dataTab: 'ڈیٹا اور اسٹوریج',
      saveProfile: 'پروفائل محفوظ کریں',
      clearCache: 'مقامی کیش صاف کریں',
    },
  },
};

/**
 * Universal UI translation accessor with dot-notation and language fallback
 */
export function getUiTranslation(lang: Language, keyPath: string, fallback?: string): string {
  const dict = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.EN;
  const parts = keyPath.split('.');
  let curr: any = dict;
  for (const part of parts) {
    if (curr && typeof curr === 'object' && part in curr) {
      curr = curr[part];
    } else {
      // fallback to EN
      let fallbackCurr: any = UI_TRANSLATIONS.EN;
      for (const fPart of parts) {
        if (fallbackCurr && typeof fallbackCurr === 'object' && fPart in fallbackCurr) {
          fallbackCurr = fallbackCurr[fPart];
        } else {
          return fallback || keyPath;
        }
      }
      return typeof fallbackCurr === 'string' ? fallbackCurr : (fallback || keyPath);
    }
  }
  return typeof curr === 'string' ? curr : (fallback || keyPath);
}
