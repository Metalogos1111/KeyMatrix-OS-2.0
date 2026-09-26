import { CoreDomain, AdapterItem, IslamicTopic, IslamicFAQ, SystemLog, ExecutionStep, MLayerItem } from '../types';

export const CORE_DOMAINS: CoreDomain[] = [
  {
    id: 'metalogos',
    name: 'MetaLogos',
    tagline: 'Reasoning & Orchestration',
    category: 'Reasoning',
    status: 'OPERATIONAL',
    color: '#00D4FF',
    icon: 'Brain',
    inputs: ['Intent', 'Context', 'Knowledge Data'],
    outputs: ['Execution Plan', 'Decomposed Tasks', 'Results'],
    dependencies: ['PrimeCore', 'MindState'],
    authorityScope: 'User / Team (Configurable)',
    evidenceScope: 'Execution logs, Verification Results',
    runtimeScope: 'Local / Hybrid / Cloud',
    activeLoad: 78,
    metrics: [
      { label: 'Latency', value: '42ms' },
      { label: 'Reasoning Coherence', value: '99.8%' },
      { label: 'Context Horizon', value: '1M tokens' }
    ]
  },
  {
    id: 'metaforge',
    name: 'MetaForge',
    tagline: 'Creation & Synthesis',
    category: 'Creation',
    status: 'OPERATIONAL',
    color: '#FF6B00',
    icon: 'Cpu',
    inputs: ['Task Specs', 'Artifact Schemas'],
    outputs: ['Code', 'Pipelines', 'Contracts'],
    dependencies: ['MetaLogos', 'Archivarius'],
    authorityScope: 'Sandbox Execution Zone',
    evidenceScope: 'Build Artifacts & Hashes',
    runtimeScope: 'Isolated Container Node',
    activeLoad: 64,
    metrics: [
      { label: 'Synthesis Speed', value: '140 tps' },
      { label: 'Pass-Gate Validation', value: '100%' },
      { label: 'Active Synthesizers', value: '16' }
    ]
  },
  {
    id: 'primecore',
    name: 'PrimeCore',
    tagline: 'Security & Shariah Guardrails',
    category: 'Security',
    status: 'OPERATIONAL',
    color: '#00FF88',
    icon: 'ShieldCheck',
    inputs: ['Intent Ingress', 'Policy Rules', 'Shura Rule #42'],
    outputs: ['Audit Proof', 'Access Token', 'Sanitized Stream'],
    dependencies: [],
    authorityScope: 'Supreme Security Arbiter',
    evidenceScope: 'Cryptographic Signatures (SHA256)',
    runtimeScope: 'Hardware TEE / Verified Kernel',
    activeLoad: 31,
    metrics: [
      { label: 'Fail-Closed State', value: 'ACTIVE' },
      { label: 'Unsafe Actions Blocked', value: '0 Breaches' },
      { label: 'Audit Integrity', value: '100%' }
    ]
  },
  {
    id: 'mindstate',
    name: 'MindState',
    tagline: 'Context & Dynamic Presence',
    category: 'Context',
    status: 'OPERATIONAL',
    color: '#A855F7',
    icon: 'Activity',
    inputs: ['User Signals', 'Location', 'Time Constraints', 'Device Telemetry'],
    outputs: ['Context Vector', 'Relevance Filters'],
    dependencies: ['Archivarius'],
    authorityScope: 'Ephemeral Session Realm',
    evidenceScope: 'Temporal Trace Logs',
    runtimeScope: 'Local Edge Memory',
    activeLoad: 52,
    metrics: [
      { label: 'Resonance Index', value: '0.94' },
      { label: 'Context Shifts/min', value: '12' },
      { label: 'TTL Cleanliness', value: '100%' }
    ]
  },
  {
    id: 'archivarius',
    name: 'Archivarius',
    tagline: 'Memory & Proof Vault',
    category: 'Memory',
    status: 'OPERATIONAL',
    color: '#06B6D4',
    icon: 'Database',
    inputs: ['Evidence Records', 'Verified Hashes', 'Canonical Texts'],
    outputs: ['Retrieved Truth Records', 'Merkle Proofs'],
    dependencies: ['PrimeCore'],
    authorityScope: 'Immutable Append-Only Vault',
    evidenceScope: 'Ledger v1.6 Hash Chain',
    runtimeScope: 'Distributed Decentralized Store',
    activeLoad: 45,
    metrics: [
      { label: 'Verified Records', value: '84,192' },
      { label: 'Tamper-Evident Gates', value: '100%' },
      { label: 'Retrieval SLA', value: '<8ms' }
    ]
  },
  {
    id: 'singularity',
    name: 'Singularity',
    tagline: 'Future & Civilizational Horizon',
    category: 'Future',
    status: 'OPERATIONAL',
    color: '#818CF8',
    icon: 'Infinity',
    inputs: ['Long-term Impact Forecasts', 'Planetary Health Metrics'],
    outputs: ['Harmonic Convergence Paths', 'Ethical Projections'],
    dependencies: ['MetaLogos', 'NUR Core'],
    authorityScope: 'Civilizational Advisory',
    evidenceScope: 'Impact Trajectory Proofs',
    runtimeScope: 'Cloud-Grid Quantum-Ready',
    activeLoad: 29,
    metrics: [
      { label: 'Trajectory Horizon', value: '50 Years' },
      { label: 'Equilibrium Index', value: '0.982' },
      { label: 'Harmonic Stability', value: 'STABLE' }
    ]
  },
  {
    id: 'nurcore',
    name: 'NUR Core',
    tagline: 'Economy & Value Circulation',
    category: 'Economy',
    status: 'SANDBOX',
    color: '#FFD700',
    icon: 'Coins',
    inputs: ['Impact Work Proofs', 'Asset Stakes', 'Zakat Calculations'],
    outputs: ['NUR Distribution', 'Micro-Grants', 'Transparency Receipts'],
    dependencies: ['PrimeCore', 'Archivarius'],
    authorityScope: 'Zero-Riba Ethical Framework',
    evidenceScope: 'Real-World Carbon & Social Ledger',
    runtimeScope: 'Regulatory Sandbox v0.1',
    activeLoad: 81,
    metrics: [
      { label: 'Circulating NUR', value: '1,250,000' },
      { label: 'Annual Real Yield', value: '12.4%' },
      { label: 'Zero Riba Compliance', value: '100% VERIFIED' }
    ]
  }
];

export const SYSTEM_ADAPTERS: AdapterItem[] = [
  {
    id: 'qibla-adapter',
    name: 'Qibla Adapter',
    version: 'v1.2.0',
    status: 'REAL',
    source: 'KM Registry',
    requiredPermissions: 'Location (optional)',
    fallback: 'Geocoding (approximate Baku/Hovsan)',
    description: 'Calculates true bearing and distance to Kaaba using spherical trigonometry and compass sensor.',
    type: 'CALCULATION'
  },
  {
    id: 'prayer-times-adapter',
    name: 'Prayer Times Adapter',
    version: 'v1.1.1',
    status: 'REAL',
    source: 'adhan.js engine / MWL Method',
    requiredPermissions: 'Clock & Coordinates',
    fallback: 'Baku Local Astronomical Standard',
    description: 'Precision astronomical solar altitude calculation for all 5 daily prayers plus sunrise.',
    type: 'CALCULATION'
  },
  {
    id: 'quran-content-adapter',
    name: 'Quran Content Adapter',
    version: 'v1.0.0',
    status: 'REAL',
    source: 'Tanzil Canonical / Quran.com API v4',
    requiredPermissions: 'HTTPS Fetch & Offline Cache',
    fallback: 'Offline Canonical Surahs & Tafsir (Built-in)',
    description: 'Indexed Holy Quran text with translations (RU, EN, AR, FA, TR, UR), audio recitation, and verse-by-verse tafsir.',
    type: 'KNOWLEDGE'
  },
  {
    id: 'nur-wallet-adapter',
    name: 'NUR Wallet Adapter',
    version: 'v1.0.0',
    status: 'REAL',
    source: 'KM Zero-Riba Ledger & WalletConnect',
    requiredPermissions: 'Private Key Sign / IndexedDB Vault',
    fallback: 'Local Sanitized Vault State',
    description: 'Zero-Riba asset balance tracker, Impact Proof validation, and ethical Zakat/Sadaqah routing.',
    type: 'ECONOMIC'
  },
  {
    id: 'web-search-adapter',
    name: 'Web Search Adapter',
    version: 'v1.8.3',
    status: 'REAL',
    source: 'Grounded Live Network & Archivarius',
    requiredPermissions: 'Outbound HTTPS',
    fallback: 'Archivarius Cached Vector Index',
    description: 'Real-time knowledge ingestion with Shariah safety filters and hallucination verification gates.',
    type: 'DATA'
  },
  {
    id: 'local-data-adapter',
    name: 'Local Data Adapter',
    version: 'v1.0.0',
    status: 'REAL',
    source: 'Device Storage / IndexedDB',
    requiredPermissions: 'Origin LocalStorage',
    fallback: 'In-Memory Volatile Session',
    description: 'Secure, offline-first persistent preferences, history, and offline prayer tables.',
    type: 'DATA'
  }
];

export const INITIAL_EXECUTION_STEPS: ExecutionStep[] = [
  {
    step: 1,
    id: 'intent',
    name: '1 Intent',
    semantic: 'Human / AI',
    status: 'COMPLETED',
    detail: 'Новый запрос: "Анализ данных PoR и расчёт времени молитвы"',
    evidenceLevel: 'DOCUMENTED'
  },
  {
    step: 2,
    id: 'identity',
    name: '2 Identity',
    semantic: 'Who',
    status: 'COMPLETED',
    detail: 'DID verified: did:key:km_7f3a... (OM_Brother, Human First)',
    evidenceLevel: 'RUNNING'
  },
  {
    step: 3,
    id: 'authority',
    name: '3 Authority',
    semantic: 'Can',
    status: 'COMPLETED',
    detail: 'Permission granted (Shura Rule #42: Ethical Compliance Passed)',
    evidenceLevel: 'OBSERVED'
  },
  {
    step: 4,
    id: 'policy',
    name: '4 Policy',
    semantic: 'Rules',
    status: 'COMPLETED',
    detail: 'Policy compliance check: PASSED (Zero Riba, Dignity, Truth)',
    evidenceLevel: 'OBSERVED'
  },
  {
    step: 5,
    id: 'execution',
    name: '5 Execution',
    semantic: 'Do',
    status: 'IN_PROGRESS',
    detail: 'Task decomposed into 4 sub-tasks across MetaLogos & PrimeCore',
    evidenceLevel: 'IMPLEMENTED'
  },
  {
    step: 6,
    id: 'state',
    name: '6 State',
    semantic: 'Update',
    status: 'PENDING',
    detail: 'Data updated: energy_grid.optimization and civic_harmonics',
    evidenceLevel: null
  },
  {
    step: 7,
    id: 'evidence',
    name: '7 Evidence',
    semantic: 'Prove',
    status: 'PENDING',
    detail: 'Proof generated: por_8f2d... verified with Evidence Ladder Level 4',
    evidenceLevel: null
  },
  {
    step: 8,
    id: 'impact',
    name: '8 Impact',
    semantic: 'Real World',
    status: 'PENDING',
    detail: 'Impact recorded: +125.6 t CO2 saved, community benefit logged',
    evidenceLevel: null
  }
];

export const ISLAMIC_FOUNDATIONS: IslamicTopic[] = [
  {
    id: 'iman',
    title: 'Вера (Иман)',
    subtitle: 'Основы веры',
    icon: 'Sparkles',
    category: 'Догматика',
    content: 'Иман охватывает шесть столпов: веру в Единого Аллаха, Его ангелов, Его Писания, Его посланников, Судный День и предопределение (кадар). В KeyMatrix OS вера является фундаментальным источником нравственного компаса.',
    evidenceLevel: 'OBSERVED',
    sources: ['Коран 2:285', 'Хадис Джибриля (Сахих Муслим)']
  },
  {
    id: 'pillars',
    title: '5 Столпов Ислама',
    subtitle: 'Практика и смысл',
    icon: 'Layers',
    category: 'Практика',
    content: '1. Шахада (свидетельство единобожия)\n2. Салят (пятикратная ежедневная молитва)\n3. Закят (обязательное очистительное очищение богатства)\n4. Саум (пост в месяц Рамадан)\n5. Хадж (паломничество в Мекку к Дому Аллаха при возможности).',
    evidenceLevel: 'OBSERVED',
    sources: ['Коран 2:43', 'Сахих аль-Бухари #8']
  },
  {
    id: 'akhlaq',
    title: 'Нравственность (Ахляк)',
    subtitle: 'Характер и поступки',
    icon: 'Heart',
    category: 'Этика',
    content: '«Поистине, я был ниспослан только для того, чтобы довести благородные нравы до совершенства». Честность (сыдк), справедливость (\'адль), милосердие (рахма) и скромность (хайя) встроены в каждое решение ИИ-агентов системы.',
    evidenceLevel: 'OBSERVED',
    sources: ['Муснад Ахмада 8952', 'Коран 68:4']
  },
  {
    id: 'family',
    title: 'Семья и общество',
    subtitle: 'Ответственность и узы',
    icon: 'Users',
    category: 'Социум',
    content: 'Семья — краеугольный камень общества. Уважение к родителям, любовь к детям, укрепление родственных связей (силят ар-рахим) и ответственность перед соседями.',
    evidenceLevel: 'OBSERVED',
    sources: ['Коран 17:23', 'Коран 4:36']
  },
  {
    id: 'ilm',
    title: 'Знание (Ильм)',
    subtitle: 'Путь к свету',
    icon: 'BookOpen',
    category: 'Познание',
    content: '«Скажи: Господи, приумножь мои знания!» (Коран 20:114). Поиск знаний обязателен для каждого мусульманина и мусульманки. Наука, технологии и духовная мудрость не противоречат друг другу, а взаимно озаряют путь.',
    evidenceLevel: 'OBSERVED',
    sources: ['Коран 20:114', 'Сунан Ибн Маджа #224']
  },
  {
    id: 'ibadah',
    title: 'Поклонение (Ибадат)',
    subtitle: 'Связь с Создателем',
    icon: 'Sun',
    category: 'Духовность',
    content: 'Поклонение — это не только ритуалы, но и любое благое деяние, совершаемое с искренним намерением (ихляс) ради блага людей и довольства Творца.',
    evidenceLevel: 'OBSERVED',
    sources: ['Коран 51:56']
  },
  {
    id: 'halal-finance',
    title: 'Финансы (Халяль)',
    subtitle: 'Чистый заработок и NUR',
    icon: 'DollarSign',
    category: 'Экономика',
    content: 'Категорический запрет на ростовщичество (риба), чрезмерную неопределенность (гарар) и эксплуатацию. Принцип разделения рисков (мушарака), инвестиции в созидательные экологические проекты.',
    evidenceLevel: 'OBSERVED',
    sources: ['Коран 2:275', 'Принципы исламских финансов AAOIFI']
  },
  {
    id: 'creation-care',
    title: 'Забота о творении',
    subtitle: 'Экология и устойчивость',
    icon: 'Leaf',
    category: 'Планета',
    content: 'Человек — наместник (халифа) на Земле, наделенный доверием (амана). Расточительство (исраф) и разрушение природного баланса строго запрещены.',
    evidenceLevel: 'OBSERVED',
    sources: ['Коран 6:141', 'Коран 7:56']
  }
];

export const ISLAMIC_FAQS: IslamicFAQ[] = [
  {
    id: 'qibla-faq',
    question: 'Как найти Кыблу?',
    shortAnswer: 'Направление на Каабу в Мекке (21.4225° N, 39.8262° E). Для Баку направление составляет 236.1° (Юго-Запад).',
    fullAnswer: 'Кыбла — это направление к Священной Каабе в Мекке, к которой обращаются мусульмане во время совершения молитвы. Qibla Adapter в KeyMatrix OS вычисляет азимут по формулам сферической тригонометрии, используя GPS-координаты устройства или точную локацию.',
    category: 'Намаз',
    evidenceLevel: 'OBSERVED'
  },
  {
    id: 'namaz-faq',
    question: 'Как совершается намаз?',
    shortAnswer: 'Пять ежедневных молитв: Фаджр (2 ракаата), Зухр (4), Аср (4), Магриб (3), Иша (4) в состоянии ритуальной чистоты (тахарат).',
    fullAnswer: 'Молитва совершается после очищения (вуду) с направлением на Кыблу, соблюдением условий и искренним намерением. Намаз включает чтение суры Аль-Фатиха, поясные поклоны (руку) и земные поклоны (суджуд).',
    category: 'Намаз',
    evidenceLevel: 'OBSERVED'
  },
  {
    id: 'zakat-faq',
    question: 'Что такое закят?',
    shortAnswer: 'Обязательная милостыня (2.5% от сбережений, превышающих нисаб за год) для помощи нуждающимся.',
    fullAnswer: 'Закят — один из пяти столпов Ислама, очищающий имущество и укрепляющий социальную справедливость. В экономическом контуре NUR закят рассчитывается и направляется прозрачно без комиссий посредников.',
    category: 'Финансы',
    evidenceLevel: 'OBSERVED'
  },
  {
    id: 'halal-haram-faq',
    question: 'Что такое халяль и харам?',
    shortAnswer: 'Халяль — дозволенное и благое. Харам — запретное и вредоносное для человека и общества.',
    fullAnswer: 'Принцип Ислама: всё сотворенное изначально дозволено, кроме того, на что есть прямой запрет (ростовщичество, обман, алкоголь, несправедливость, вред экологии).',
    category: 'Этика',
    evidenceLevel: 'OBSERVED'
  },
  {
    id: 'fasting-faq',
    question: 'Как держать пост (Рамадан)?',
    shortAnswer: 'Воздержание от еды, питья и страстей от рассвета (Фаджр) до заката (Магриб) с духовным очищением.',
    fullAnswer: 'Пост в месяц Рамадан развивает самообладание (таква), сострадание к голодным и концентрацию на главном.',
    category: 'Поклонение',
    evidenceLevel: 'OBSERVED'
  },
  {
    id: 'family-faq',
    question: 'Семья в Исламе',
    shortAnswer: 'Священный союз, построенный на любви (мавадда), милосердии (рахма) и взаимной поддержке.',
    fullAnswer: 'Пророк Мухаммад ﷺ сказал: «Лучшие из вас — те, кто лучше всего относится к своей семье».',
    category: 'Семья',
    evidenceLevel: 'OBSERVED'
  },
  {
    id: 'ai-help-faq',
    question: 'Как ИИ может помогать?',
    shortAnswer: 'ИИ в KeyMatrix OS — это верный инструмент и помощник человека, подчиненный этике и Shura-правилам.',
    fullAnswer: 'ИИ оптимизирует распределение ресурсов, помогает в обучении, обеспечивает экологический мониторинг и бережет время человека для познания, молитвы и семьи.',
    category: 'Технологии',
    evidenceLevel: 'RUNNING'
  }
];

export const INITIAL_SYSTEM_LOGS: SystemLog[] = [
  {
    id: 'log-1',
    timestamp: '20:44:12',
    tag: 'PRAYER',
    message: 'Магриб наступит через 02:17:45 (Hovsan, Az.)',
    level: 'info'
  },
  {
    id: 'log-2',
    timestamp: '20:44:15',
    tag: 'INTENT',
    message: 'Новый запрос: "Анализ данных PoR и расчёт времени молитвы"',
    level: 'info'
  },
  {
    id: 'log-3',
    timestamp: '20:44:18',
    tag: 'AI',
    message: 'MetaLogos успешно обработал мульти-доменный граф рассуждений',
    level: 'success'
  },
  {
    id: 'log-4',
    timestamp: '20:44:21',
    tag: 'EVIDENCE',
    message: 'Запись добавлена в блокчейн-реестр доказательств (sandbox gate passed)',
    level: 'success'
  },
  {
    id: 'log-5',
    timestamp: '20:44:25',
    tag: 'NUR',
    message: 'Рассчитано положительное воздействие: +125.6 NUR вознаграждения',
    level: 'success'
  },
  {
    id: 'log-6',
    timestamp: '20:44:28',
    tag: 'SYSTEM',
    message: 'Все 7 модулей ядра в норме [Coherence 99.8%]',
    level: 'success'
  }
];

export const SEVEN_DOMAINS: CoreDomain[] = CORE_DOMAINS.map((domain) => ({
  ...domain,
  semanticLabel: domain.tagline,
  evidenceLevel: (domain.id === 'nurcore' ? 'SANDBOX' : 5) as any,
  description: domain.tagline + ' — ' + domain.inputs.join(', ') + ' → ' + domain.outputs.join(', ')
}));

export const M_LAYERS: MLayerItem[] = [
  {
    code: 'M00',
    name: 'Foundation & Invariants',
    description: 'Математические и этические инварианты, золотое сечение φ, постулаты веры и гуманистические аксиомы.',
    status: 'OPERATIONAL',
    evidenceLevel: 'OBSERVED',
    mission: 'Обеспечить нерушимость базовых аксиом системы при любых трансформациях ИИ.',
    spec: 'RFC-KM-00: Immutable Axiomatic Kernel & Shura Consensus Guard'
  },
  {
    code: 'M01',
    name: 'Interface & UX',
    description: 'Интерфейсный слой, адаптация восприятия, мультиязычная ткань и поддержка RTL/LTR.',
    status: 'OPERATIONAL',
    evidenceLevel: 'OBSERVED',
    mission: 'Сделать взаимодействие с операционной системой интуитивным, вдохновляющим и доступным для всех возрастов.',
    spec: 'RFC-KM-01: Cognitive Surface Protocol & Multilingual Fabric'
  },
  {
    code: 'M02',
    name: 'Identity & DID',
    description: 'Децентрализованная суверенная идентичность человека, аппаратные ключи и приватность.',
    status: 'OPERATIONAL',
    evidenceLevel: 'OBSERVED',
    mission: 'Защитить человеческое достоинство и гарантировать право на приватность без централизованных корпораций.',
    spec: 'RFC-KM-02: Self-Sovereign Identity Specification (W3C DID/VC)'
  },
  {
    code: 'M03',
    name: 'Authority & Delegation',
    description: 'Роли, мандаты доступа, родительский контроль и ограничения полномочий агентов.',
    status: 'OPERATIONAL',
    evidenceLevel: 'OBSERVED',
    mission: 'Ограничить права искусственного интеллекта жесткими рамками человеческого поручения.',
    spec: 'RFC-KM-03: Shura Role Delegation & Attestation Framework'
  },
  {
    code: 'M04',
    name: 'Policy & Governance',
    description: 'Shura Rule #42, запрет ростовщичества (Zero Riba), исламские этические фильтры.',
    status: 'OPERATIONAL',
    evidenceLevel: 'OBSERVED',
    mission: 'Автоматическая отбраковка любых действий, нарушающих справедливость и благополучие людей.',
    spec: 'RFC-KM-04: Makasid Shariah Guardrails & Ethical Tensor'
  },
  {
    code: 'M05',
    name: 'Evidence & Ladder',
    description: 'Криптографическая лестница доказательств: от Declared (1) до Proven (5) и Merkle-деревья.',
    status: 'OPERATIONAL',
    evidenceLevel: 'OBSERVED',
    mission: 'Исключить галлюцинации и непроверенные утверждения во всех процессах принятия решений.',
    spec: 'RFC-KM-05: 5-Tier Epistemic Proof Standard'
  },
  {
    code: 'M06',
    name: 'Resonance Engine (PoR)',
    description: 'Proof of Resonance — гармоническая когерентность волн, золотое сечение φ = 1.618033.',
    status: 'OPERATIONAL',
    evidenceLevel: 'OBSERVED',
    mission: 'Измерение созвучия мыслей, действий и материальных последствий законам природной гармонии.',
    spec: 'RFC-KM-06: Harmonic Phase Coherence Protocol'
  },
  {
    code: 'M07',
    name: 'State & Data Plane',
    description: 'Локальное хранилище IndexedDB, распределенные хэш-таблицы и оффлайн-персистентность.',
    status: 'OPERATIONAL',
    evidenceLevel: 'OBSERVED',
    mission: 'Полная автономность и работоспособность даже при отсутствии внешнего интернета.',
    spec: 'RFC-KM-07: Offline-First Zero-Leak Storage Protocol'
  },
  {
    code: 'M08',
    name: 'AI Orchestration (MetaLogos)',
    description: 'Мультиагентный оркестратор, декомпозиция целей и координация синтезаторов MetaForge.',
    status: 'OPERATIONAL',
    evidenceLevel: 'OBSERVED',
    mission: 'Синхронизация специализированных ИИ в единую созидательную симфонию.',
    spec: 'RFC-KM-08: Multi-Agent Consensus & Logos Pipeline'
  },
  {
    code: 'M09',
    name: 'External Adapters',
    description: 'Реестр адаптеров: Qibla, Prayer Times, Quran Content, Web Search, Local Data.',
    status: 'OPERATIONAL',
    evidenceLevel: 'OBSERVED',
    mission: 'Безопасное и верифицированное сопряжение системы с физическим и цифровым миром.',
    spec: 'RFC-KM-09: Sandboxed Adapter Interface & Audit Registry'
  },
  {
    code: 'M10',
    name: 'Economic Layer (NUR Core)',
    description: 'Циркуляция ценности, социальный капитал, безусловный вакф и чистая экономика без процентов.',
    status: 'SANDBOX',
    evidenceLevel: 'IMPLEMENTED',
    mission: 'Создание альтернативной финансовой среды, ориентированной на благотворительность и созидание.',
    spec: 'RFC-KM-10: Zero-Riba Ecological Value Mesh'
  },
  {
    code: 'M11',
    name: 'Real-World Actuation',
    description: 'Сенсоры, IoT-узлы, контроллеры энергосетей и автоматика умных домов.',
    status: 'ACTIVE',
    evidenceLevel: 'RUNNING',
    mission: 'Перевод цифровых решений в полезные физические действия в окружающем пространстве.',
    spec: 'RFC-KM-11: Physical Grid Ingress/Egress Framework'
  },
  {
    code: 'M12',
    name: 'Ecological Balance',
    description: 'Мониторинг Каспийского бассейна, качество воздуха, чистота почв и вод.',
    status: 'ACTIVE',
    evidenceLevel: 'OBSERVED',
    mission: 'Сохранение Земли как священного аманата для будущих поколений.',
    spec: 'RFC-KM-12: Biosphere Telemetry & Regenerative Feedback'
  },
  {
    code: 'M13',
    name: 'Collective Wisdom',
    description: 'База мудрости веков (Хикма), хадисы, научные трактаты и философское наследие.',
    status: 'OPERATIONAL',
    evidenceLevel: 'OBSERVED',
    mission: 'Обогащение алгоритмов тысячелетним нравственным опытом человечества.',
    spec: 'RFC-KM-13: Canonical Wisdom Graph'
  },
  {
    code: 'M14',
    name: 'Social Cohesion & Waqf',
    description: 'Поддержка семей, образовательные гранты, взаимопомощь и солидарность общин.',
    status: 'ACTIVE',
    evidenceLevel: 'RUNNING',
    mission: 'Укрепление уз дружбы, братства и солидарности между людьми.',
    spec: 'RFC-KM-14: Transparent Waqf Endowment Engine'
  },
  {
    code: 'M15',
    name: 'Civilization Layer',
    description: 'Планетарная сеть гармонии, глобальная координация и диалог культур.',
    status: 'OPERATIONAL',
    evidenceLevel: 'OBSERVED',
    mission: 'Служение Земле и построение справедливой, процветающей цивилизации.',
    spec: 'RFC-KM-15: Planetary Synthesis & Cultural Harmony'
  },
  {
    code: 'M16',
    name: 'Singularity Horizon',
    description: 'Долгосрочный горизонт на 50+ лет, гармоническое сосуществование человека и сверхсложных систем.',
    status: 'OPERATIONAL',
    evidenceLevel: 'OBSERVED',
    mission: 'Гарантировать, что будущее останется человечным, духовным и озаренным светом Истины.',
    spec: 'RFC-KM-16: Transcendent Horizon Stability Standard'
  }
];

export type { MLayerItem };

