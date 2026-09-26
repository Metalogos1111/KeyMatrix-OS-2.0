import { Language } from '../types';

export interface TranslationDictionary {
  appName: string;
  subTitle: string;
  mission: string;
  motto1: string;
  motto2: string;
  quoteHadith: string;
  quoteHadithAuthor: string;
  pipeline: string;
  nav: {
    dashboard: string;
    dashboardSub: string;
    qibla: string;
    qiblaSub: string;
    prayer: string;
    prayerSub: string;
    islam: string;
    islamSub: string;
    quran: string;
    quranSub: string;
    faq: string;
    faqSub: string;
    aiMetaLogos: string;
    aiMetaLogosSub: string;
    projects: string;
    projectsSub: string;
    files: string;
    filesSub: string;
    nurWallet: string;
    nurWalletSub: string;
    mapM00: string;
    mapM00Sub: string;
    minfinity: string;
    minfinitySub: string;
    sevenDomains: string;
    sevenDomainsSub: string;
    experiments: string;
    experimentsSub: string;
    worldAnalytics: string;
    worldAnalyticsSub: string;
    community: string;
    communitySub: string;
    security: string;
    securitySub: string;
    settings: string;
    settingsSub: string;
  };
  qiblaCompass: {
    title: string;
    directionToQibla: string;
    showOnMap: string;
    trueBearing: string;
    distance: string;
    southWest: string;
    accuracy: string;
  };
  prayerWidget: {
    title: string;
    todaySchedule: string;
    nextPrayer: string;
    fullSchedule: string;
    notifications: string;
  };
  domainsTitle: string;
  domainsSub: string;
  porWidget: {
    title: string;
    score: string;
    threshold: string;
    status: string;
    details: string;
  };
  executionWidget: {
    title: string;
    statusLabel: string;
    open: string;
  };
  nurWidget: {
    title: string;
    totalValue: string;
    activeProjects: string;
    impactInvestments: string;
    yieldAnnual: string;
  };
  globalMetrics: {
    activeIntentions: string;
    peopleInSystem: string;
    positiveImpact: string;
    co2Saved: string;
  };
  liveLogs: {
    title: string;
  };
  islamFoundations: {
    title: string;
  };
  faqTitle: string;
  allFaq: string;
  worldPeopleFuture: {
    title: string;
    desc: string;
    joinBtn: string;
  };
  footerQuote: string;
  footerRights: string;
  // Deep Right Panel & Global Value Keys
  faq: {
    qibla: string;
    prayer: string;
    zakat: string;
    halal: string;
    fasting: string;
    family: string;
    aiHelp: string;
  };
  islam: {
    faith: string;
    faithSub: string;
    pillars: string;
    pillarsSub: string;
    akhlaq: string;
    akhlaqSub: string;
    family: string;
    familySub: string;
    knowledge: string;
    knowledgeSub: string;
    worship: string;
    worshipSub: string;
    finance: string;
    financeSub: string;
    care: string;
    careSub: string;
  };
  footer: {
    truth: string;
    justice: string;
    mercy: string;
    freedom: string;
    humanity: string;
    knowledge: string;
    harmony: string;
  };
  cores: {
    reasoning: string;
    creation: string;
    security: string;
    context: string;
    memory: string;
    future: string;
    economy: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  AZ: {
    appName: 'KeyMatrix OS',
    subTitle: 'İNSANİYYƏT · SÜNİ İNTELLEKT · BİLİK · ƏMƏL',
    mission: 'DAHA ƏDALƏTLİ, ŞÜURLU VƏ RUZİLİ BİR SİVİLİZASİYAYA DOĞRU',
    motto1: 'TEXNOLOGİYADAN ÜSTÜN — YER ÜZÜNƏ XİDMƏT',
    motto2: 'BİRLİKDƏ DAHA GÖZƏL GƏLƏCƏYƏ',
    quoteHadith: '«İnsanların ən xeyirlisi insanlara ən çox fayda verənidir.»',
    quoteHadithAuthor: '— Həzrət Məhəmməd ﷺ',
    pipeline: '8-ADDIMLI İCRA BORU KƏMƏRİ',
    nav: {
      dashboard: 'Ana Səhifə',
      dashboardSub: 'Sistem icmalı',
      qibla: 'Qiblə Kompası',
      qiblaSub: 'Dəqiq istiqamət',
      prayer: 'Namaz Vaxtları',
      prayerSub: 'Gündəlik cədvəl',
      islam: 'İslamın Əsasları',
      islamSub: 'Bilik və sütunlar',
      quran: 'Qurani-Kərim',
      quranSub: 'Oxuma, axtarış, təfsir',
      faq: 'Sual-Cavab (FAQ)',
      faqSub: 'Etibarlı cavablar',
      aiMetaLogos: 'AI MetaLogos',
      aiMetaLogosSub: 'Süni intellekt köməkçisi',
      projects: 'Layihələr',
      projectsSub: 'Alətlər və tapşırıqlar',
      files: 'Fayllar və Bilik',
      filesSub: 'Kitabxana xəzinəsi',
      nurWallet: 'NUR Pulqabı',
      nurWalletSub: 'Dəyərlər və təmiz iqtisadiyyat',
      mapM00: 'M00–M16 Xəritəsi',
      mapM00Sub: 'Memarlıq təbəqələri',
      minfinity: 'M∞ Xəritələrin Xəritəsi',
      minfinitySub: 'Topologiya İndeksi',
      sevenDomains: '7 Əsas Nüvə',
      sevenDomainsSub: 'İntellekt nüvələri',
      experiments: 'Eksperimentlər',
      experimentsSub: 'Test mühiti',
      worldAnalytics: 'Dünya və Analitika',
      worldAnalyticsSub: 'Qlobal mənzərə',
      community: 'Cəmiyyət',
      communitySub: 'İnsanlar və həmrəylik',
      security: 'Təhlükəsizlik',
      securitySub: 'Məxfilik və qorunma',
      settings: 'Tənzimləmələr',
      settingsSub: 'Sistem parametrləri',
    },
    qiblaCompass: {
      title: 'QİBLƏ KOMPASI',
      directionToQibla: 'Qibləyə İstiqamət',
      showOnMap: 'Xəritədə Göstər',
      trueBearing: 'Dəqiq Azimut',
      distance: 'Məkkəyə Məsafə',
      southWest: 'Cənub-Qərb',
      accuracy: 'Yüksək Dəqiqlik',
    },
    prayerWidget: {
      title: 'NAMAZ VAXTLARI',
      todaySchedule: 'Bugünkü cədvəl',
      nextPrayer: 'Növbəti namaz',
      fullSchedule: 'Tam Cədvəl',
      notifications: 'Bildirişlər',
    },
    domainsTitle: '7 ƏSAS İNTELLEKT NÜVƏSİ',
    domainsSub: 'KƏŞF ET · YARAT · İCRA ET · DOĞRULA · İNKİŞAF ET',
    porWidget: {
      title: 'Rezonans Sübutu (PoR)',
      score: 'Xal (ortalama)',
      threshold: 'Hədd Qiyməti',
      status: 'Status',
      details: 'Ətraflı →',
    },
    executionWidget: {
      title: 'İcra Axını',
      statusLabel: 'Status: Ssenari icra edilir...',
      open: 'AÇ',
    },
    nurWidget: {
      title: 'NUR İqtisadi Təbəqəsi',
      totalValue: 'Ümumi Dəyər (NUR)',
      activeProjects: 'Aktiv Layihələr',
      impactInvestments: 'Təsir İnvestisiyaları',
      yieldAnnual: 'İllik Gəlir',
    },
    globalMetrics: {
      activeIntentions: 'Aktiv Niyyətlər',
      peopleInSystem: 'Sistemdəki İnsanlar',
      positiveImpact: 'Müsbət Təsir',
      co2Saved: 'Qənaət Olunan CO₂ (ton)',
    },
    liveLogs: {
      title: 'Canlı Sistem Girişləri',
    },
    islamFoundations: {
      title: 'İSLAMIN ƏSASLARI',
    },
    faqTitle: 'TEZ-TEZ VERİLƏN SUALLAR (FAQ)',
    allFaq: 'Bütün suallar və cavablar',
    worldPeopleFuture: {
      title: 'Dünya. İnsan. Gələcək.',
      desc: 'Birlikdə daha ədalətli, təmiz və şüurlu bir sivilizasiya qururuq.',
      joinBtn: 'Qoşulun',
    },
    footerQuote: '«Həqiqi güc — biliklə mərhəmətin harmonik birliyindədir.»',
    footerRights: 'KeyMatrix OS v2.0 | Bakı Nüvəsi | Niyyətdən Əbədi Xeyirə',
    faq: {
      qibla: 'Qibləni necə tapmaq olar?',
      prayer: 'Namaz necə qılınır?',
      zakat: 'Zəkat nədir?',
      halal: 'Halal və haram nədir?',
      fasting: 'Oruc necə tutulur? (Ramazan)',
      family: 'İslamda ailə',
      aiHelp: 'Süni intellekt necə kömək edir?',
    },
    islam: {
      faith: 'İman',
      faithSub: 'İmanın əsasları',
      pillars: '5 Rükn',
      pillarsSub: 'Təcrübə və məna',
      akhlaq: 'Əxlaq',
      akhlaqSub: 'Xarakter və əməllər',
      family: 'Ailə və Cəmiyyət',
      familySub: 'Məsuliyyət və bağlar',
      knowledge: 'Bilik (Elm)',
      knowledgeSub: 'Nura doğru yol',
      worship: 'İbadət',
      worshipSub: 'Yaradanla rabitə',
      finance: 'Maliyyə (Halal)',
      financeSub: 'Təmiz qazanc və NUR',
      care: 'Yaradılışa Qayğı',
      careSub: 'Ekologiya və davamlılıq',
    },
    footer: {
      truth: 'Həqiqət',
      justice: 'Ədalət',
      mercy: 'Mərhəmət',
      freedom: 'Azadlıq',
      humanity: 'İnsanlıq',
      knowledge: 'Bilik',
      harmony: 'Harmoniya',
    },
    cores: {
      reasoning: 'Məntiq',
      creation: 'Yaradılış',
      security: 'Təhlükəsizlik',
      context: 'Kontekst',
      memory: 'Yaddaş',
      future: 'Gələcək',
      economy: 'İqtisadiyyat',
    },
  },
  RU: {
    appName: 'KeyMatrix OS',
    subTitle: 'HUMANITY · AI · KNOWLEDGE · ACTION',
    mission: 'НА ПУТИ К БОЛЕЕ СПРАВЕДЛИВОЙ, ОСОЗНАННОЙ И ПРОЦВЕТАЮЩЕЙ ЦИВИЛИЗАЦИИ',
    motto1: 'БОЛЬШЕ ЧЕМ ТЕХНОЛОГИЯ — СЛУЖЕНИЕ ЗЕМЛЕ',
    motto2: 'ЛУЧШЕЕ ВМЕСТЕ',
    quoteHadith: '«Лучшие из людей — те, кто приносит наибольшую пользу другим людям.»',
    quoteHadithAuthor: '— Пророк Мухаммад ﷺ',
    pipeline: '8-ШАГОВЫЙ КОНВЕЙЕР ИСПОЛНЕНИЯ',
    nav: {
      dashboard: 'Главная',
      dashboardSub: 'Обзор системы',
      qibla: 'Компас к Кыбле',
      qiblaSub: 'Направление',
      prayer: 'Время намаза',
      prayerSub: 'Сегодняшнее расписание',
      islam: 'Ислам',
      islamSub: 'Знания и фундамент',
      quran: 'Коран',
      quranSub: 'Чтение, поиск, тафсир',
      faq: 'FAQ',
      faqSub: 'Вопросы и ответы',
      aiMetaLogos: 'AI MetaLogos',
      aiMetaLogosSub: 'Ваш ИИ помощник',
      projects: 'Проекты',
      projectsSub: 'Инструменты и задачи',
      files: 'Файлы и Знания',
      filesSub: 'Библиотека',
      nurWallet: 'Кошелёк (NUR)',
      nurWalletSub: 'Ценности и экономика',
      mapM00: 'Карта M00–M16',
      mapM00Sub: 'Архитектура',
      minfinity: 'M∞ Map of Maps',
      minfinitySub: 'Индекс топологии',
      sevenDomains: '7 Core Domains',
      sevenDomainsSub: 'Интеллектуальные ядра',
      experiments: 'Эксперименты',
      experimentsSub: 'Тестирование',
      worldAnalytics: 'Мир и Аналитика',
      worldAnalyticsSub: 'Глобальный обзор',
      community: 'Сообщество',
      communitySub: 'Люди и сотрудничество',
      security: 'Безопасность',
      securitySub: 'Защита и приватность',
      settings: 'Настройки',
      settingsSub: 'Параметры системы',
    },
    qiblaCompass: {
      title: 'КОМПАС К КЫБЛЕ',
      directionToQibla: 'Направление к Кыбле',
      showOnMap: 'Показать на карте',
      trueBearing: 'Точный азимут',
      distance: 'Расстояние до Мекки',
      southWest: 'Юго-Запад',
      accuracy: 'Высокая точность',
    },
    prayerWidget: {
      title: 'ВРЕМЯ НАМАЗА',
      todaySchedule: 'Расписание на сегодня',
      nextPrayer: 'Следующий намаз',
      fullSchedule: 'Полное расписание',
      notifications: 'Уведомления',
    },
    domainsTitle: '7 CORE INTELLIGENCE DOMAINS',
    domainsSub: 'DISCOVER · COMPOSE · EXECUTE · VERIFY · EVOLVE',
    porWidget: {
      title: 'Proof of Resonance (PoR)',
      score: 'Score (pair_avg)',
      threshold: 'Threshold (adaptive)',
      status: 'Status',
      details: 'Детали →',
    },
    executionWidget: {
      title: 'Execution Flow',
      statusLabel: 'Статус: Выполнение сценария...',
      open: 'ОТКРЫТЬ',
    },
    nurWidget: {
      title: 'NUR Economic Layer',
      totalValue: 'Общая стоимость (NUR)',
      activeProjects: 'Активные проекты',
      impactInvestments: 'Инвестиции влияния',
      yieldAnnual: 'Доходность (годовая)',
    },
    globalMetrics: {
      activeIntentions: 'Активные намерения',
      peopleInSystem: 'Люди в системе',
      positiveImpact: 'Положительное влияние',
      co2Saved: 'Сохранено CO₂ (т)',
    },
    liveLogs: {
      title: 'Реактивность Системы (Live)',
    },
    islamFoundations: {
      title: 'ФУНДАМЕНТ ИСЛАМА',
    },
    faqTitle: 'ЧАСТЫЕ ВОПРОСЫ (FAQ)',
    allFaq: 'Все вопросы и ответы',
    worldPeopleFuture: {
      title: 'Мир. Люди. Будущее.',
      desc: 'Вместе мы строим более справедливый, чистый и осознанный мир.',
      joinBtn: 'Присоединиться',
    },
    footerQuote: '«Истинная сила — в гармоничном соединении знания и милосердия.»',
    footerRights: 'KeyMatrix OS v2.0 | Final Interface | From Intent to a Better Tomorrow.',
    faq: {
      qibla: 'Как найти Кыблу?',
      prayer: 'Как совершается намаз?',
      zakat: 'Что такое закят?',
      halal: 'Что такое халяль и харам?',
      fasting: 'Как держать пост (Рамадан)?',
      family: 'Семья в Исламе',
      aiHelp: 'Как ИИ может помогать?',
    },
    islam: {
      faith: 'Вера (Иман)',
      faithSub: 'Основы веры',
      pillars: '5 Столпов',
      pillarsSub: 'Практика и смысл',
      akhlaq: 'Нравственность',
      akhlaqSub: 'Характер и поступки',
      family: 'Семья и общество',
      familySub: 'Ответственность и узы',
      knowledge: 'Знание (Ильм)',
      knowledgeSub: 'Путь к свету',
      worship: 'Поклонение',
      worshipSub: 'Связь с Создателем',
      finance: 'Финансы (Халяль)',
      financeSub: 'Чистый заработок и NUR',
      care: 'Забота о творении',
      careSub: 'Экология и устойчивость',
    },
    footer: {
      truth: 'Истина',
      justice: 'Справедливость',
      mercy: 'Милосердие',
      freedom: 'Свобода',
      humanity: 'Человечность',
      knowledge: 'Знание',
      harmony: 'Гармония',
    },
    cores: {
      reasoning: 'Логика',
      creation: 'Творение',
      security: 'Безопасность',
      context: 'Контекст',
      memory: 'Память',
      future: 'Будущее',
      economy: 'Экономика',
    },
  },
  EN: {
    appName: 'KeyMatrix OS',
    subTitle: 'HUMANITY · AI · KNOWLEDGE · ACTION',
    mission: 'TOWARDS A MORE JUST, MORE CONSCIOUS, MORE PROSPEROUS CIVILIZATION',
    motto1: 'MORE THAN TECHNOLOGY A SERVICE TO EARTH',
    motto2: 'A BETTER TOGETHER',
    quoteHadith: '"The best of people are those who bring the greatest benefit to people."',
    quoteHadithAuthor: '— Prophet Muhammad ﷺ',
    pipeline: '8-STEP EXECUTION PIPELINE',
    nav: {
      dashboard: 'Dashboard',
      dashboardSub: 'System overview',
      qibla: 'Qibla Compass',
      qiblaSub: 'Direction',
      prayer: 'Prayer Times',
      prayerSub: "Today's schedule",
      islam: 'Islam Foundations',
      islamSub: 'Knowledge & Pillars',
      quran: 'Quran',
      quranSub: 'Read, search, tafsir',
      faq: 'FAQ',
      faqSub: 'Questions & answers',
      aiMetaLogos: 'AI MetaLogos',
      aiMetaLogosSub: 'Your AI assistant',
      projects: 'Projects',
      projectsSub: 'Tools & tasks',
      files: 'Files & Knowledge',
      filesSub: 'Library vault',
      nurWallet: 'NUR Wallet',
      nurWalletSub: 'Values & economy',
      mapM00: 'M00–M16 Map',
      mapM00Sub: 'Architecture layers',
      minfinity: 'M∞ Map of Maps',
      minfinitySub: 'Pure Topology Index',
      sevenDomains: '7 Core Domains',
      sevenDomainsSub: 'Intelligence cores',
      experiments: 'Experiments',
      experimentsSub: 'Testing & Harness',
      worldAnalytics: 'World & Analytics',
      worldAnalyticsSub: 'Global overview',
      community: 'Community',
      communitySub: 'People & solidarity',
      security: 'Security & Privacy',
      securitySub: 'Protection & audit',
      settings: 'Settings',
      settingsSub: 'System parameters',
    },
    qiblaCompass: {
      title: 'QIBLA COMPASS',
      directionToQibla: 'Direction to Qibla',
      showOnMap: 'Show on Map',
      trueBearing: 'True Bearing',
      distance: 'Distance to Makkah',
      southWest: 'South-West',
      accuracy: 'High Accuracy',
    },
    prayerWidget: {
      title: 'PRAYER TIMES',
      todaySchedule: "Today's schedule",
      nextPrayer: 'Next prayer',
      fullSchedule: 'Full Schedule',
      notifications: 'Notifications',
    },
    domainsTitle: '7 CORE INTELLIGENCE DOMAINS',
    domainsSub: 'DISCOVER · COMPOSE · EXECUTE · VERIFY · EVOLVE',
    porWidget: {
      title: 'Proof of Resonance (PoR)',
      score: 'Score (pair_avg)',
      threshold: 'Threshold (adaptive)',
      status: 'Status',
      details: 'Details →',
    },
    executionWidget: {
      title: 'Execution Flow',
      statusLabel: 'Status: Scenario executing...',
      open: 'OPEN',
    },
    nurWidget: {
      title: 'NUR Economic Layer',
      totalValue: 'Total Value (NUR)',
      activeProjects: 'Active Projects',
      impactInvestments: 'Impact Investments',
      yieldAnnual: 'Annual Yield',
    },
    globalMetrics: {
      activeIntentions: 'Active Intentions',
      peopleInSystem: 'People in System',
      positiveImpact: 'Positive Impact',
      co2Saved: 'CO₂ Saved (t)',
    },
    liveLogs: {
      title: 'System Reactivity (Live)',
    },
    islamFoundations: {
      title: 'ISLAMIC FOUNDATIONS',
    },
    faqTitle: 'FREQUENTLY ASKED QUESTIONS (FAQ)',
    allFaq: 'All questions and answers',
    worldPeopleFuture: {
      title: 'World. Humanity. Future.',
      desc: 'Together we build a more just, clean and conscious civilization.',
      joinBtn: 'Join Now',
    },
    footerQuote: '"True strength lies in the harmonious union of knowledge and mercy."',
    footerRights: 'KeyMatrix OS v2.0 | Final Interface | From Intent to a Better Tomorrow.',
    faq: {
      qibla: 'How to find Qibla?',
      prayer: 'How to perform prayer?',
      zakat: 'What is Zakat?',
      halal: 'What is Halal and Haram?',
      fasting: 'How to fast (Ramadan)?',
      family: 'Family in Islam',
      aiHelp: 'How does AI help?',
    },
    islam: {
      faith: 'Faith (Iman)',
      faithSub: 'Foundations of belief',
      pillars: '5 Pillars',
      pillarsSub: 'Practice and meaning',
      akhlaq: 'Morality (Akhlaq)',
      akhlaqSub: 'Character and deeds',
      family: 'Family and Society',
      familySub: 'Responsibility and bonds',
      knowledge: 'Knowledge (Ilm)',
      knowledgeSub: 'Path to light',
      worship: 'Worship (Ibadah)',
      worshipSub: 'Bond with Creator',
      finance: 'Finance (Halal)',
      financeSub: 'Clean earnings and NUR',
      care: 'Creation Care',
      careSub: 'Ecology and sustainability',
    },
    footer: {
      truth: 'Truth',
      justice: 'Justice',
      mercy: 'Mercy',
      freedom: 'Freedom',
      humanity: 'Humanity',
      knowledge: 'Knowledge',
      harmony: 'Harmony',
    },
    cores: {
      reasoning: 'Reasoning',
      creation: 'Creation',
      security: 'Security',
      context: 'Context',
      memory: 'Memory',
      future: 'Future',
      economy: 'Economy',
    },
  },
  TR: {
    appName: 'KeyMatrix OS',
    subTitle: 'İNSANLIK · YAPAY ZEKA · BİLGİ · EYLEM',
    mission: 'DAHA ADİL, DAHA BİLİNÇLİ VE DAHA MÜREFFEH BİR MEDENİYETE DOĞRU',
    motto1: 'TEKNOLOJİDEN ÖTE — YERYÜZÜNE HİZMET',
    motto2: 'BİRLİKTE DAHA İYİYE',
    quoteHadith: '«İnsanların en hayırlısı, insanlara en çok faydalı olanıdır.»',
    quoteHadithAuthor: '— Hz. Muhammed ﷺ',
    pipeline: '8 ADIMLI YÜRÜTME BORU HATTI',
    nav: {
      dashboard: 'Ana Sayfa',
      dashboardSub: 'Sistem genel bakış',
      qibla: 'Kıble Pusulası',
      qiblaSub: 'Hassas yön',
      prayer: 'Namaz Vakitleri',
      prayerSub: 'Günlük vakitler',
      islam: 'İslam Temelleri',
      islamSub: 'Bilgi ve sütunlar',
      quran: "Kur'an-ı Kerim",
      quranSub: 'Okuma, arama, tefsir',
      faq: 'S.S.S.',
      faqSub: 'Sorular ve cevaplar',
      aiMetaLogos: 'AI MetaLogos',
      aiMetaLogosSub: 'Yapay zeka asistanı',
      projects: 'Projeler',
      projectsSub: 'Araçlar ve görevler',
      files: 'Dosyalar ve Bilgi',
      filesSub: 'Kütüphane kasası',
      nurWallet: 'NUR Cüzdanı',
      nurWalletSub: 'Değerler ve ekonomi',
      mapM00: 'M00–M16 Haritası',
      mapM00Sub: 'Mimari katmanlar',
      minfinity: 'M∞ Haritalar Haritası',
      minfinitySub: 'Topoloji İndeksi',
      sevenDomains: '7 Çekirdek Alan',
      sevenDomainsSub: 'Zeka çekirdekleri',
      experiments: 'Deneyler',
      experimentsSub: 'Test ortamı',
      worldAnalytics: 'Dünya & Analiz',
      worldAnalyticsSub: 'Küresel görünüm',
      community: 'Topluluk',
      communitySub: 'İnsanlar ve dayanışma',
      security: 'Güvenlik ve Gizlilik',
      securitySub: 'Koruma ve denetim',
      settings: 'Ayarlar',
      settingsSub: 'Sistem parametreleri',
    },
    qiblaCompass: {
      title: 'KIBLE PUSULASI',
      directionToQibla: 'Kıble Yönü',
      showOnMap: 'Haritada Göster',
      trueBearing: 'Gerçek Açı',
      distance: "Mekke'ye Mesafe",
      southWest: 'Güneybatı',
      accuracy: 'Yüksek Hassasiyet',
    },
    prayerWidget: {
      title: 'NAMAZ VAKİTLERİ',
      todaySchedule: 'Bugünün vakitleri',
      nextPrayer: 'Sonraki namaz',
      fullSchedule: 'Tüm Takvim',
      notifications: 'Bildirimler',
    },
    domainsTitle: '7 ÇEKİRDEK ZEKA ALANI',
    domainsSub: 'KEŞFET · OLUŞTUR · YÜRÜT · DOĞRULA · EVRİL',
    porWidget: {
      title: 'Rezonans Kanıtı (PoR)',
      score: 'Puan (ortalama)',
      threshold: 'Eşik Değeri',
      status: 'Durum',
      details: 'Detaylar →',
    },
    executionWidget: {
      title: 'Uçtan Uca Yürütme Akışı',
      statusLabel: 'Durum: Senaryo çalışıyor...',
      open: 'AÇ',
    },
    nurWidget: {
      title: 'NUR Ekonomik Katmanı',
      totalValue: 'Toplam Değer (NUR)',
      activeProjects: 'Aktif Projeler',
      impactInvestments: 'Etki Yatırımları',
      yieldAnnual: 'Yıllık Getiri',
    },
    globalMetrics: {
      activeIntentions: 'Aktif Niyetler',
      peopleInSystem: 'Sistemdeki İnsanlar',
      positiveImpact: 'Pozitif Etki',
      co2Saved: 'Kurtarılan CO₂ (ton)',
    },
    liveLogs: {
      title: 'Canlı Sistem Tepkileri',
    },
    islamFoundations: {
      title: 'İSLAM TEMELLERİ',
    },
    faqTitle: 'SIKÇA SORULAN SORULAR',
    allFaq: 'Tüm sorular ve cevaplar',
    worldPeopleFuture: {
      title: 'Dünya. İnsan. Gelecek.',
      desc: 'Birlikte daha adil, temiz ve bilinçli bir dünya inşa ediyoruz.',
      joinBtn: 'Katılın',
    },
    footerQuote: '«Gerçek güç, bilgi ile merhametin ahengindedir.»',
    footerRights: 'KeyMatrix OS v2.0 | Nihai Arayüz | Niyetten Kalıcı Etkiye',
    faq: {
      qibla: 'Kıble nasıl bulunur?',
      prayer: 'Namaz nasıl kılınır?',
      zakat: 'Zekat nedir?',
      halal: 'Helal ve haram nedir?',
      fasting: 'Oruç nasıl tutulur? (Ramazan)',
      family: 'İslamda aile',
      aiHelp: 'Yapay zeka nasıl yardımcı olur?',
    },
    islam: {
      faith: 'İman',
      faithSub: 'İmanın esasları',
      pillars: '5 Şart',
      pillarsSub: 'Uygulama ve anlam',
      akhlaq: 'Ahlak',
      akhlaqSub: 'Karakter ve eylemler',
      family: 'Aile ve Toplum',
      familySub: 'Sorumluluk ve bağlar',
      knowledge: 'İlim (Bilgi)',
      knowledgeSub: 'Nura giden yol',
      worship: 'İbadet',
      worshipSub: 'Yaratıcı ile bağ',
      finance: 'Helal Finans',
      financeSub: 'Temiz kazanç ve NUR',
      care: 'Yaratılana Şefkat',
      careSub: 'Çevre ve sürdürülebilirlik',
    },
    footer: {
      truth: 'Hakikat',
      justice: 'Adalet',
      mercy: 'Merhamet',
      freedom: 'Özgürlük',
      humanity: 'İnsanlık',
      knowledge: 'Bilgi',
      harmony: 'Ahenk',
    },
    cores: {
      reasoning: 'Akıl Yürütme',
      creation: 'Yaratılış',
      security: 'Güvenlik',
      context: 'Bağlam',
      memory: 'Hafıza',
      future: 'Gelecek',
      economy: 'Ekonomi',
    },
  },
  AR: {
    appName: 'كي ماتریکس أو إس',
    subTitle: 'الإنسانية · الذكاء الاصطناعي · المعرفة · العمل',
    mission: 'نحو حضارة أكثر عدلاً ووعياً وازدهاراً',
    motto1: 'أكثر من مجرد تكنولوجيا — خدمة للأرض',
    motto2: 'معاً نحو الأفضل',
    quoteHadith: '«خيرُ الناسِ أنفعُهم للناسِ»',
    quoteHadithAuthor: '— النبي محمد ﷺ',
    pipeline: 'مسار التنفيذ ذو 8 خطوات',
    nav: {
      dashboard: 'الرئيسية',
      dashboardSub: 'نظرة عامة على النظام',
      qibla: 'بوصلة القبلة',
      qiblaSub: 'الاتجاه الدقيق',
      prayer: 'أوقات الصلاة',
      prayerSub: 'جدول اليوم',
      islam: 'أسس الإسلام',
      islamSub: 'المعرفة والأركان',
      quran: 'القرآن الكريم',
      quranSub: 'تلاوة وبحث وتفسير',
      faq: 'الأسئلة الشائعة',
      faqSub: 'إجابات موثوقة',
      aiMetaLogos: 'مساعد ميتا لوغوس',
      aiMetaLogosSub: 'مساعدك الذكي',
      projects: 'المشاريع',
      projectsSub: 'الأدوات والمهام',
      files: 'الملفات والمعرفة',
      filesSub: 'خزانة الحقيقة',
      nurWallet: 'محفظة نور',
      nurWalletSub: 'القيم والاقتصاد النظيف',
      mapM00: 'خريطة الطبقات',
      mapM00Sub: 'هيكل M00–M16',
      minfinity: 'خريطة M∞ الشاملة',
      minfinitySub: 'دليل الطوبولوجيا الموحد',
      sevenDomains: 'النوى السبعة',
      sevenDomainsSub: 'دوائر الذكاء',
      experiments: 'التجارب',
      experimentsSub: 'بيئة الاختبار',
      worldAnalytics: 'العالم والتحليلات',
      worldAnalyticsSub: 'مؤشرات كوكبية',
      community: 'المجتمع',
      communitySub: 'التعاون الإنساني',
      security: 'الأمان والخصوصية',
      securitySub: 'حماية وحوكمة',
      settings: 'الإعدادات',
      settingsSub: 'معايير النظام',
    },
    qiblaCompass: {
      title: 'بوصلة القبلة المشرفة',
      directionToQibla: 'الاتجاه نحو القبلة',
      showOnMap: 'عرض على الخريطة',
      trueBearing: 'السمت الحقيقي',
      distance: 'المسافة إلى مكة',
      southWest: 'الجنوب الغربي',
      accuracy: 'دقة فلكية عالية',
    },
    prayerWidget: {
      title: 'مواقيت الصلاة',
      todaySchedule: 'جدول اليوم',
      nextPrayer: 'الصلاة القادمة',
      fullSchedule: 'الجدول الكامل',
      notifications: 'التنبيهات',
    },
    domainsTitle: 'دوائر الذكاء الجوهري السبع',
    domainsSub: 'اكتشف · كوّن · نفّذ · تحقق · تطوّر',
    porWidget: {
      title: 'برهان الرنين (PoR)',
      score: 'النتيجة (متوسط الزوج)',
      threshold: 'العتبة التكيفية',
      status: 'الحالة',
      details: 'التفاصيل ←',
    },
    executionWidget: {
      title: 'مسار التنفيذ التكاملي',
      statusLabel: 'الحالة: جاري تشغيل السيناريو...',
      open: 'فتح',
    },
    nurWidget: {
      title: 'الطبقة الاقتصادية (نور)',
      totalValue: 'القيمة الكلية (نور)',
      activeProjects: 'المشاريع الفعالة',
      impactInvestments: 'استثمارات الأثر',
      yieldAnnual: 'العائد السنوي',
    },
    globalMetrics: {
      activeIntentions: 'النوايا الفعالة',
      peopleInSystem: 'المستفيدون في النظام',
      positiveImpact: 'أحداث الأثر الإيجابي',
      co2Saved: 'الكربون المخفض (طن)',
    },
    liveLogs: {
      title: 'سجل تفاعل النظام المباشر',
    },
    islamFoundations: {
      title: 'أسس الإسلام العظيمة',
    },
    faqTitle: 'الأسئلة المتكررة',
    allFaq: 'جميع الأسئلة والأجوبة',
    worldPeopleFuture: {
      title: 'العالم. الإنسان. المستقبل.',
      desc: 'معاً نبني عالماً أكثر عدلاً وطهارة ووعياً.',
      joinBtn: 'انضم الآن',
    },
    footerQuote: '«القوة الحقيقية في التناغم بين العلم والرحمة.»',
    footerRights: 'KeyMatrix OS v2.0 | الواجهة الشاملة | من النية إلى الأثر الخالد',
    faq: {
      qibla: 'كيف تجد القبلة بدقة؟',
      prayer: 'كيفية أداء الصلوات الخمس؟',
      zakat: 'ما هو الزكاة وأحكامه؟',
      halal: 'ما هو الحلال والحرام؟',
      fasting: 'كيفية صيام شهر رمضان؟',
      family: 'الأسرة في هدي الإسلام',
      aiHelp: 'كيف يخدم الذكاء الاصطناعي الإنسان؟',
    },
    islam: {
      faith: 'الإيمان',
      faithSub: 'أركان العقيدة الصافية',
      pillars: 'أركان الإسلام الخمسة',
      pillarsSub: 'العمل والمعنى',
      akhlaq: 'الأخلاق والفضائل',
      akhlaqSub: 'السلوك والتعامل',
      family: 'الأسرة والمجتمع',
      familySub: 'صلة الرحم والمسؤولية',
      knowledge: 'العلم والمعرفة',
      knowledgeSub: 'طريق النور والحقيقة',
      worship: 'العبادة والتقرب',
      worshipSub: 'الصلة مع الخالق',
      finance: 'المعاملات المالية الحلال',
      financeSub: 'الكسب الطيب ونور',
      care: 'رعاية الخلق والبيئة',
      careSub: 'الأمانة والاستدامة',
    },
    footer: {
      truth: 'الحقيقة',
      justice: 'العدالة',
      mercy: 'الرحمة',
      freedom: 'الحرية',
      humanity: 'الإنسانية',
      knowledge: 'المعرفة',
      harmony: 'الانسجام',
    },
    cores: {
      reasoning: 'الاستدلال',
      creation: 'الإبداع',
      security: 'الأمان',
      context: 'السياق',
      memory: 'الذاكرة',
      future: 'المستقبل',
      economy: 'الاقتصاد',
    },
  },
  FA: {
    appName: 'کی‌ماتریکس او‌اس',
    subTitle: 'انسانیت · هوش مصنوعی · دانش · عمل',
    mission: 'به سوی تمدنی عادلانه‌تر، آگاه‌تر و شکوفاتر',
    motto1: 'فراتر از فناوری — خدمتی به زمین',
    motto2: 'همبستگی برای آینده‌ای بهتر',
    quoteHadith: '«بهترین مردم سودمندترین آنان برای مردم است.»',
    quoteHadithAuthor: '— پیامبر اکرم ﷺ',
    pipeline: 'خط لوله اجرایی ۸ مرحله‌ای',
    nav: {
      dashboard: 'صفحه اصلی',
      dashboardSub: 'نمای کلی سامانه',
      qibla: 'قطب‌نمای قبله',
      qiblaSub: 'جهت‌یابی دقیق',
      prayer: 'اوقات شرعی',
      prayerSub: 'جدول روزانه',
      islam: 'مبانی اسلام',
      islamSub: 'دانش و اصول',
      quran: 'قرآن کریم',
      quranSub: 'تلاوت و پژوهش',
      faq: 'پرسش و پاسخ',
      faqSub: 'پاسخ‌های معتبر',
      aiMetaLogos: 'دستیار متالوگوس',
      aiMetaLogosSub: 'هوش مصنوعی همراه',
      projects: 'پروژه‌ها',
      projectsSub: 'ابزارها و وظایف',
      files: 'پرونده‌ها و دانش',
      filesSub: 'گنجینه حقیقت',
      nurWallet: 'کیف پول نور',
      nurWalletSub: 'اقتصاد پاک و ارزش‌ها',
      mapM00: 'نقشه لایه‌ها',
      mapM00Sub: 'معماری M00–M16',
      minfinity: 'نقشه جامع M∞',
      minfinitySub: 'شاخص توپولوژی',
      sevenDomains: 'هفت قلمرو بنیادین',
      sevenDomainsSub: 'هسته‌های هوشمندی',
      experiments: 'آزمایش‌ها',
      experimentsSub: 'محیط آزمون',
      worldAnalytics: 'تحلیل‌های جهانی',
      worldAnalyticsSub: 'چشم‌انداز گیتی',
      community: 'جامعه',
      communitySub: 'همبستگی انسانی',
      security: 'امنیت و حریم خصوصی',
      securitySub: 'حفاظت و نظارت',
      settings: 'تنظیمات',
      settingsSub: 'پارامترهای سامانه',
    },
    qiblaCompass: {
      title: 'قطب‌نمای قبله',
      directionToQibla: 'جهت قبله',
      showOnMap: 'نمایش روی نقشه',
      trueBearing: 'زاویه دقیق',
      distance: 'فاصله تا مکه',
      southWest: 'جنوب غربی',
      accuracy: 'دقت بالا',
    },
    prayerWidget: {
      title: 'اوقات شرعی',
      todaySchedule: 'جدول امروز',
      nextPrayer: 'نماز بعدی',
      fullSchedule: 'جدول کامل',
      notifications: 'اعلان‌ها',
    },
    domainsTitle: 'هفت قلمرو بنیادین هوشمندی',
    domainsSub: 'کشف · ترکیب · اجرا · اعتبارسنجی · تکامل',
    porWidget: {
      title: 'اثبات رزونانس (PoR)',
      score: 'امتیاز (میانگین)',
      threshold: 'آستانه پذیرش',
      status: 'وضعیت',
      details: 'جزئیات ←',
    },
    executionWidget: {
      title: 'جریان اجرای سراسری',
      statusLabel: 'وضعیت: در حال اجرا...',
      open: 'باز کردن',
    },
    nurWidget: {
      title: 'لایه اقتصادی نور',
      totalValue: 'ارزش کل (نور)',
      activeProjects: 'پروژه‌های فعال',
      impactInvestments: 'سرمایه‌گذاری اثرگذار',
      yieldAnnual: 'بازده سالانه',
    },
    globalMetrics: {
      activeIntentions: 'اهداف فعال',
      peopleInSystem: 'کاربران بهره‌مند',
      positiveImpact: 'رویدادهای اثر مثبت',
      co2Saved: 'صرفه‌جویی کربن (تن)',
    },
    liveLogs: {
      title: 'گزارش‌های زنده سامانه',
    },
    islamFoundations: {
      title: 'بنیان‌های معرفت اسلامی',
    },
    faqTitle: 'پرسش‌های متداول',
    allFaq: 'مشاهده همه پرسش‌ها',
    worldPeopleFuture: {
      title: 'جهان. انسان. فردا.',
      desc: 'با هم تمدنی پاک‌تر، دادگرانه‌تر و هوشیارتر می‌سازیم.',
      joinBtn: 'پیوستن',
    },
    footerQuote: '«نیروی راستین در پیوند دانش و مهربانی نهفته است.»',
    footerRights: 'KeyMatrix OS v2.0 | واسط پایانی | از نیت تا نیکی ماندگار',
    faq: {
      qibla: 'چگونه قبله را بیابیم؟',
      prayer: 'نماز چگونه خوانده می‌شود؟',
      zakat: 'زکات چیست؟',
      halal: 'حلال و حرام چیست؟',
      fasting: 'چگونه روزه بگیریم؟',
      family: 'خانواده در اسلام',
      aiHelp: 'هوش مصنوعی چگونه یاری می‌رساند؟',
    },
    islam: {
      faith: 'ایمان',
      faithSub: 'اصول عقاید',
      pillars: '۵ رکن',
      pillarsSub: 'عمل و معنا',
      akhlaq: 'اخلاق',
      akhlaqSub: 'رفتار و کردار',
      family: 'خانواده و جامعه',
      familySub: 'مسئولیت و پیوندها',
      knowledge: 'دانش و معرفت',
      knowledgeSub: 'مسیر روشنایی',
      worship: 'عبادت',
      worshipSub: 'پیوند با پروردگار',
      finance: 'مالیات و اقتصاد حلال',
      financeSub: 'کسب پاک و نور',
      care: 'پاسداشت آفرینش',
      careSub: 'محیط زیست و پایداری',
    },
    footer: {
      truth: 'حقیقت',
      justice: 'عدالت',
      mercy: 'رحمت',
      freedom: 'آزادی',
      humanity: 'انسانیت',
      knowledge: 'دانش',
      harmony: 'هماهنگی',
    },
    cores: {
      reasoning: 'استدلال',
      creation: 'آفرینش',
      security: 'امنیت',
      context: 'بستر',
      memory: 'حافظه',
      future: 'آینده',
      economy: 'اقتصاد',
    },
  },
  UR: {
    appName: 'کی میٹرکس او ایس',
    subTitle: 'انسانیت · مصنوعی ذہانت · علم · عمل',
    mission: 'ایک زیادہ عادلانہ، باشعور اور خوشحال تہذیب کی جانب',
    motto1: 'ٹیکنالوجی سے بڑھ کر — زمین کی خدمت',
    motto2: 'بہتر مستقبل کے لیے اتحاد',
    quoteHadith: '«تم میں سے بہترین وہ ہے جو لوگوں کو سب سے زیادہ نفع پہنچائے۔»',
    quoteHadithAuthor: '— حضرت محمد مصطفیٰ ﷺ',
    pipeline: '8 مرحلہ وار ایگزیکیوشن پائپ لائن',
    nav: {
      dashboard: 'مرکزی صفحہ',
      dashboardSub: 'نظام کا جائزہ',
      qibla: 'قبلہ قطب نما',
      qiblaSub: 'درست سمت',
      prayer: 'نماز کے اوقات',
      prayerSub: 'آج کا شیڈول',
      islam: 'اسلامی بنیادیں',
      islamSub: 'علم اور ارکان',
      quran: 'قرآن کریم',
      quranSub: 'تلاوت و تحقیق',
      faq: 'عمومی سوالات',
      faqSub: 'مستند جوابات',
      aiMetaLogos: 'اے آئی میٹا لوگوس',
      aiMetaLogosSub: 'ذہین مددگار',
      projects: 'منصوبے',
      projectsSub: 'اوزار اور کام',
      files: 'فائلز و کتب خانہ',
      filesSub: 'علمی خزانہ',
      nurWallet: 'نور والیٹ',
      nurWalletSub: 'معاشی نظام',
      mapM00: 'تہوں کا نقشہ',
      mapM00Sub: 'M00–M16 معمار',
      minfinity: 'M∞ جامع نقشہ',
      minfinitySub: 'ٹاپولوجی اشاریہ',
      sevenDomains: 'سات بنیادی مراکز',
      sevenDomainsSub: 'ذہانت کی جہتیں',
      experiments: 'تجربات',
      experimentsSub: 'ٹیسٹنگ زون',
      worldAnalytics: 'عالمی تجزیات',
      worldAnalyticsSub: 'مجموعی منظر',
      community: 'برادری',
      communitySub: 'افراد اور تعاون',
      security: 'سلامتی اور تحفظ',
      securitySub: 'پرائیویسی',
      settings: 'ترتیبات',
      settingsSub: 'سسٹم پیرامیٹرز',
    },
    qiblaCompass: {
      title: 'قبلہ قطب نما',
      directionToQibla: 'قبلہ کی سمت',
      showOnMap: 'نقشے پر دیکھیں',
      trueBearing: 'درست زاویہ',
      distance: 'مکہ تک فاصلہ',
      southWest: 'جنوب مغرب',
      accuracy: 'اعلیٰ درجے کی درستگی',
    },
    prayerWidget: {
      title: 'نماز کے اوقات',
      todaySchedule: 'آج کے اوقات',
      nextPrayer: 'اگلی نماز',
      fullSchedule: 'مکمل شیڈول',
      notifications: 'اطلاعات',
    },
    domainsTitle: 'سات بنیادی انٹیلی جنس ڈومینز',
    domainsSub: 'دریافت · ترکیب · عمل · توثیق · ارتقاء',
    porWidget: {
      title: 'گواہی گونج (PoR)',
      score: 'اسکور (اوسط)',
      threshold: 'حد فاصل',
      status: 'حالت',
      details: 'تفصیلات ←',
    },
    executionWidget: {
      title: 'تکمیلی عمل کا بہاؤ',
      statusLabel: 'حالت: جاری ہے...',
      open: 'کھولیں',
    },
    nurWidget: {
      title: 'نور معاشی تہہ',
      totalValue: 'کل قیمت (نور)',
      activeProjects: 'فعال منصوبے',
      impactInvestments: 'مثبت سرمایہ کاری',
      yieldAnnual: 'سالانہ منافع',
    },
    globalMetrics: {
      activeIntentions: 'فعال ارادے',
      peopleInSystem: 'منسلک افراد',
      positiveImpact: 'مثبت اثرات',
      co2Saved: 'بچائی گئی کاربن (ٹن)',
    },
    liveLogs: {
      title: 'براہ راست سسٹم ریکارڈ',
    },
    islamFoundations: {
      title: 'اسلام کی بنیادی اقدار',
    },
    faqTitle: 'اکثر پوچھے گئے سوالات',
    allFaq: 'تمام سوالات و جوابات',
    worldPeopleFuture: {
      title: 'دنیا۔ لوگ۔ مستقبل۔',
      desc: 'مل کر ایک زیادہ عادلانہ اور پرامن جہاں تشکیل دیں۔',
      joinBtn: 'شامل ہوں',
    },
    footerQuote: '«حقیقی طاقت علم اور رحم دلی کے باہمی ملاپ میں ہے۔»',
    footerRights: 'KeyMatrix OS v2.0 | حتمی انٹرفیس | نیت سے ابدی اثر تک',
    faq: {
      qibla: 'قبلہ کی سمت کیسے تلاش کریں؟',
      prayer: 'نماز کی ادائیگی کا طریقہ کیا ہے؟',
      zakat: 'زکوٰۃ کیا ہے؟',
      halal: 'حلال و حرام کیا ہے؟',
      fasting: 'روزہ کیسے رکھیں؟',
      family: 'اسلام میں خاندان کی اہمیت',
      aiHelp: 'مصنوعی ذہانت کیسے مدد کر سکتی ہے؟',
    },
    islam: {
      faith: 'ایمان',
      faithSub: 'عقائد کی بنیاد',
      pillars: '۵ ارکان',
      pillarsSub: 'عمل اور حقیقت',
      akhlaq: 'اخلاق',
      akhlaqSub: 'کردار اور اعمال',
      family: 'خاندان اور معاشرہ',
      familySub: 'ذمہ داری اور تعلقات',
      knowledge: 'علم',
      knowledgeSub: 'روشنی کی راہ',
      worship: 'عبادت',
      worshipSub: 'خالق سے تعلق',
      finance: 'حلال مالیات',
      financeSub: 'پاک کمائی اور نور',
      care: 'تخلیق کی دیکھ بھال',
      careSub: 'ماحولیات اور پائیداری',
    },
    footer: {
      truth: 'سچائی',
      justice: 'عدل و انصاف',
      mercy: 'رحمت',
      freedom: 'آزادی',
      humanity: 'انسانیت',
      knowledge: 'علم',
      harmony: 'ہم آہنگی',
    },
    cores: {
      reasoning: 'استدلال',
      creation: 'تخلیق',
      security: 'تحفظ',
      context: 'تناظر',
      memory: 'یادداشت',
      future: 'مستقبل',
      economy: 'معیشت',
    },
  },
};

/**
 * Universal dot-notation translation accessor
 * Supports nested paths like:
 * - t('faq.qibla')
 * - t('islam.faith')
 * - t('footer.truth')
 * - t('cores.reasoning')
 * - t('pipeline')
 */
export function getNestedTranslation(lang: Language, key: string): string {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.EN;
  const parts = key.split('.');

  let current: any = dict;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      // Fallback to English
      let fallbackCurrent: any = TRANSLATIONS.EN;
      for (const fPart of parts) {
        if (fallbackCurrent && typeof fallbackCurrent === 'object' && fPart in fallbackCurrent) {
          fallbackCurrent = fallbackCurrent[fPart];
        } else {
          return key;
        }
      }
      return typeof fallbackCurrent === 'string' ? fallbackCurrent : key;
    }
  }

  return typeof current === 'string' ? current : key;
}

/**
 * Quick helper for reactive translation resolution
 */
export const t = (key: string, language: Language = 'AZ'): string => {
  return getNestedTranslation(language, key);
};
