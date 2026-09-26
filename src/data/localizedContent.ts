import { Language, IslamicTopic, IslamicFAQ } from '../types';

export interface LocalizedFoundationsPageUI {
  pageTitle: string;
  pageSubtitle: string;
  sourcesTitle: string;
  architectureBoxTitle: string;
  architectureBoxDesc: string;
  footerLayer: string;
  footerStatus: string;
}

export interface LocalizedFaqPageUI {
  pageTitle: string;
  pageSubtitle: string;
  searchPlaceholder: string;
  allCategoriesLabel: string;
  categoryTagLabel: string;
  canonicalAnswerBadge: string;
  categories: { id: string; label: string }[];
}

export interface LocalizedQuranPageUI {
  pageTitle: string;
  pageSubtitle: string;
  surahsTitle: string;
  searchSurahPlaceholder: string;
  searchAyahPlaceholder: string;
  versesLabel: string;
  revealedInLabel: string;
  totalVersesLabel: string;
  makkah: string;
  madinah: string;
  noVersesFound: string;
  listenTooltip: string;
  copyTooltip: string;
  copiedTooltip: string;
  tafsirTitle: string;
  ayahLabel: string;
  selectAyahPrompt: string;
  corpusFooterNote: string;
}

export interface LocalizedPrayerPageUI {
  pageTitle: string;
  pageSubtitle: string;
  notifyOn: string;
  notifyOff: string;
  nextBadge: string;
  completedBadge: string;
  waitingBadge: string;
  countdownTitle: string;
  untilPrayerLabel: string;
  nextTimeLabel: string;
  calcMethodLabel: string;
  cmbMethod: string;
  mwlMethod: string;
  qazaTitle: string;
  qazaSubtitle: string;
  qazaPrayers: {
    fajr: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  };
  qazaFooter: string;
}

export interface LocalizedQiblaPageUI {
  pageSubtitle: string;
  recalibrateBtn: string;
  calibratingBtn: string;
  exactMatch: string;
  deviation: string;
  kaabaLabel: string;
  southWest: string;
  compassTestLabel: string;
  targetKaabaTitle: string;
  bearingLabel: string;
  orthodromicDistLabel: string;
  greatCircleDesc: string;
  kaabaCoordsLabel: string;
  yourLocationLabel: string;
  nodeNameLabel: string;
  mathFormulaTitle: string;
  mathFormulaDesc: string;
  mathFormulaWhere: string;
}

export interface LocalizedTopBarUI {
  adaptersBtn: string;
  composerBtn: string;
  evidenceBtn: string;
  adaptersTooltip: string;
  composerTooltip: string;
  evidenceTooltip: string;
  gpsTooltip: string;
  localesHeader: string;
  childSafeActive: string;
  rolesHeader?: string;
  limitsMatrix?: string;
}

// ==========================================
// 1. ISLAMIC FOUNDATIONS (8 CORE MODULES)
// ==========================================

export const LOCALIZED_ISLAMIC_FOUNDATIONS: Record<Language, IslamicTopic[]> = {
  AZ: [
    {
      id: 'iman',
      title: 'İman (Əqidə)',
      subtitle: 'İmanın əsasları və sütunları',
      icon: 'Sparkles',
      category: 'Əqidə',
      content: 'İman altı təməl sütunu əhatə edir: Vahid Allaha, Onun mələklərinə, müqəddəs kitablarına, göndərdiyi peyğəmbərlərinə, Axirət gününə və qədərə (xeyir və şərin Allahdan olmasına) qəlbən inanmaq və dillə təsdiq etmək.\n\nKeyMatrix OS sistemində iman texnologiyanın və alqoritmlərin ali əxlaqi və mənəvi kompasını təşkil edir.',
      evidenceLevel: 'OBSERVED',
      sources: ['Quran 2:285', 'Cəbrayıl hədisi (Səhih Müslim #8)']
    },
    {
      id: 'pillars',
      title: 'İslamın 5 Sütunu',
      subtitle: 'Əməli təcrübə və mənəvi dərinlik',
      icon: 'Layers',
      category: 'Təcrübə',
      content: '1. Şəhadət (Allahın təkliyinə və Həzrət Məhəmmədin ﷺ Onun elçisi olmasına şəhadət vermək)\n2. Namaz (gündəlik 5 vaxt ibadət və Rəbblə rabitə)\n3. Zəkat (var-dövlətdən ehtiyac sahiblərinə təmizləyici pay)\n4. Oruc (Ramazan ayında nəfsin saflaşdırılması)\n5. Həcc (imkanı olanlar üçün Məkkəyə müqəddəs ziyarət).',
      evidenceLevel: 'OBSERVED',
      sources: ['Quran 2:43', 'Səhih əl-Buxari #8']
    },
    {
      id: 'akhlaq',
      title: 'Nəcib Əxlaq',
      subtitle: 'Xarakter, ləyaqət və dürüstlük',
      icon: 'Heart',
      category: 'Etika',
      content: '«Həqiqətən, mən ali əxlaqi dəyərləri tamamlamaq üçün göndərildim.» (Peyğəmbər ﷺ).\n\nDürüstlük (sıdq), ədalət (\'ədl), mərhəmət (rəhmət) və həya (abır) prinsipləri KeyMatrix OS-in bütün avtonom AI agentlərinin qərar qəbul etmə məntiqinə daxil edilmişdir.',
      evidenceLevel: 'OBSERVED',
      sources: ['Müsnəd Əhməd #8952', 'Quran 68:4']
    },
    {
      id: 'family',
      title: 'Ailə və Cəmiyyət',
      subtitle: 'Məsuliyyət, qarşılıqlı hörmət və rabitə',
      icon: 'Users',
      category: 'Sosium',
      content: 'Ailə cəmiyyətin təməl daşıdır. Valideynlərə ehtiram, övladlara sevgi və qayğı, qohumluq əlaqələrinin qorunması (silət ər-rəhim) və qonşular qarşısında məsuliyyət daşımaq hər bir fərdin borcudur.',
      evidenceLevel: 'OBSERVED',
      sources: ['Quran 17:23', 'Quran 4:36']
    },
    {
      id: 'ilm',
      title: 'Elm və Hikmət (İlm)',
      subtitle: 'Zülmətdən nura aparan yol',
      icon: 'BookOpen',
      category: 'Bilik',
      content: '«De: Ey Rəbbim, mənim elmimi artır!» (Quran 20:114).\n\nElm axtarışı hər bir müsəlman kişi və qadın üçün fərzdir. Elm, innovasiya və mənəvi hikmət bir-birinə zidd deyil, əksinə bəşəriyyətin rifahı üçün bir-birini tamamlayır.',
      evidenceLevel: 'OBSERVED',
      sources: ['Quran 20:114', 'Sünən İbn Macə #224']
    },
    {
      id: 'ibadah',
      title: 'İbadət və Yaxşılıq',
      subtitle: 'Xaliqlə əlaqə və ixlas',
      icon: 'Sun',
      category: 'Mənəviyyat',
      content: 'İbadət təkcə məsciddəki rituallarla məhdudlaşmır; səmimi niyyətlə (ixlasla), insanlara fayda vermək və Allahın rizasını qazanmaq məqsədilə edilən hər bir xeyirxah əməl ibadət sayılır.',
      evidenceLevel: 'OBSERVED',
      sources: ['Quran 51:56']
    },
    {
      id: 'halal-finance',
      title: 'Halal Maliyyə və NUR',
      subtitle: 'Təmiz qazanc, zəkat və sıfır sələm',
      icon: 'DollarSign',
      category: 'İqtisadiyyat',
      content: 'Sələmçilik (riba), aldatma (qərər) və istismar qəti qadağandır. Risk və mənfəətin ədalətli bölüşdürülməsi (müşarakə/mudarəbə) və real aktivlərə investisiya NUR iqtisadi modelinin əsasını təşkil edir.',
      evidenceLevel: 'OBSERVED',
      sources: ['Quran 2:275', 'AAOIFI İslami Maliyyə Standartları']
    },
    {
      id: 'creation-care',
      title: 'Təbiətə və Yaradılışa Qayğı',
      subtitle: 'Ekologiya və xəlifəlik əmanəti',
      icon: 'Leaf',
      category: 'Ekologiya',
      content: 'İnsan yer üzünün xəlifəsidir və ona böyük əmanət verilmişdir. İsrafçılıq, təbii tarazlığın pozulması və ətraf mühitə zərər vurmaq qadağandır.',
      evidenceLevel: 'OBSERVED',
      sources: ['Quran 6:141', 'Quran 7:56']
    }
  ],

  RU: [
    {
      id: 'iman',
      title: 'Вера (Иман)',
      subtitle: 'Основы веры и вероубеждения',
      icon: 'Sparkles',
      category: 'Догматика',
      content: 'Иман охватывает шесть столпов: веру в Единого Аллаха, Его ангелов, Его Писания, Его посланников, Судный День и предопределение (кадар). В KeyMatrix OS вера является фундаментальным источником нравственного компаса.',
      evidenceLevel: 'OBSERVED',
      sources: ['Коран 2:285', 'Хадис Джибриля (Сахих Муслим #8)']
    },
    {
      id: 'pillars',
      title: '5 Столпов Ислама',
      subtitle: 'Практика, ритуалы и духовный смысл',
      icon: 'Layers',
      category: 'Практика',
      content: '1. Шахада (свидетельство единобожия)\n2. Салят (пятикратная ежедневная молитва)\n3. Закят (обязательное очистительное очищение богатства)\n4. Саум (пост в месяц Рамадан)\n5. Хадж (паломничество в Мекку к Дому Аллаха при возможности).',
      evidenceLevel: 'OBSERVED',
      sources: ['Коран 2:43', 'Сахих аль-Бухари #8']
    },
    {
      id: 'akhlaq',
      title: 'Нравственность (Ахляк)',
      subtitle: 'Характер, достоинство и благородные поступки',
      icon: 'Heart',
      category: 'Этика',
      content: '«Поистине, я был ниспослан только для того, чтобы довести благородные нравы до совершенства». Честность (сыдк), справедливость (\'адль), милосердие (рахма) и скромность (хайя) встроены в каждое решение ИИ-агентов системы.',
      evidenceLevel: 'OBSERVED',
      sources: ['Муснад Ахмада #8952', 'Коран 68:4']
    },
    {
      id: 'family',
      title: 'Семья и общество',
      subtitle: 'Ответственность, узы и взаимоподдержка',
      icon: 'Users',
      category: 'Социум',
      content: 'Семья — краеугольный камень общества. Уважение к родителям, любовь к детям, укрепление родственных связей (силят ар-рахим) и ответственность перед соседями.',
      evidenceLevel: 'OBSERVED',
      sources: ['Коран 17:23', 'Коран 4:36']
    },
    {
      id: 'ilm',
      title: 'Знание (Ильм)',
      subtitle: 'Путь к свету и познанию',
      icon: 'BookOpen',
      category: 'Познание',
      content: '«Скажи: Господи, приумножь мои знания!» (Коран 20:114). Поиск знаний обязателен для каждого мусульманина и мусульманки. Наука, технологии и духовная мудрость не противоречат друг другу, а взаимно озаряют путь.',
      evidenceLevel: 'OBSERVED',
      sources: ['Коран 20:114', 'Сунан Ибн Маджа #224']
    },
    {
      id: 'ibadah',
      title: 'Поклонение (Ибадат)',
      subtitle: 'Связь с Создателем и искренность',
      icon: 'Sun',
      category: 'Духовность',
      content: 'Поклонение — это не только ритуалы, но и любое благое деяние, совершаемое с искренним намерением (ихляс) ради блага людей и довольства Творца.',
      evidenceLevel: 'OBSERVED',
      sources: ['Коран 51:56']
    },
    {
      id: 'halal-finance',
      title: 'Финансы (Халяль)',
      subtitle: 'Чистый заработок, закят и NUR',
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
  ],

  EN: [
    {
      id: 'iman',
      title: 'Faith (Iman)',
      subtitle: 'Pillars of Faith and Creed',
      icon: 'Sparkles',
      category: 'Creed',
      content: 'Iman encompasses the six articles of faith: belief in the Oneness of Allah, His angels, His revealed scriptures, His messengers, the Day of Judgment, and Divine Decree (Qadar).\n\nIn KeyMatrix OS, faith serves as the foundational ethical compass guiding technological execution.',
      evidenceLevel: 'OBSERVED',
      sources: ['Quran 2:285', 'Hadith of Gabriel (Sahih Muslim #8)']
    },
    {
      id: 'pillars',
      title: 'The 5 Pillars of Islam',
      subtitle: 'Practical Pillars & Spiritual Depth',
      icon: 'Layers',
      category: 'Practice',
      content: '1. Shahadah (Declaration of Faith)\n2. Salah (Five Daily Prayers connecting creature to Creator)\n3. Zakat (Purifying social welfare contribution)\n4. Sawm (Fasting during the holy month of Ramadan)\n5. Hajj (Pilgrimage to Makkah for those able).',
      evidenceLevel: 'OBSERVED',
      sources: ['Quran 2:43', 'Sahih al-Bukhari #8']
    },
    {
      id: 'akhlaq',
      title: 'Noble Character (Akhlaq)',
      subtitle: 'Ethics, Dignity, and Compassion',
      icon: 'Heart',
      category: 'Ethics',
      content: '"I have been sent only to perfect noble character." (Prophet Muhammad ﷺ).\n\nIntegrity (Sidq), justice (\'Adl), universal mercy (Rahmah), and modesty (Haya) are hardcoded into the verification gates of KeyMatrix autonomous agents.',
      evidenceLevel: 'OBSERVED',
      sources: ['Musnad Ahmad #8952', 'Quran 68:4']
    },
    {
      id: 'family',
      title: 'Family & Community',
      subtitle: 'Mutual Respect, Bonds, and Cohesion',
      icon: 'Users',
      category: 'Society',
      content: 'The family is the sacred bedrock of civilization. Respect for parents, compassionate upbringing of children, upholding kinship ties (Silat ar-Rahim), and civic responsibility towards neighbors.',
      evidenceLevel: 'OBSERVED',
      sources: ['Quran 17:23', 'Quran 4:36']
    },
    {
      id: 'ilm',
      title: 'Knowledge & Wisdom (Ilm)',
      subtitle: 'Path from Darkness into Light',
      icon: 'BookOpen',
      category: 'Knowledge',
      content: '"And say: My Lord, increase me in knowledge!" (Quran 20:114).\n\nThe pursuit of knowledge is an obligation upon every believer. Science, technological innovation, and spiritual insight reinforce one another for human flourishing.',
      evidenceLevel: 'OBSERVED',
      sources: ['Quran 20:114', 'Sunan Ibn Majah #224']
    },
    {
      id: 'ibadah',
      title: 'Worship & Good Deeds',
      subtitle: 'Divine Connection & Sincerity',
      icon: 'Sun',
      category: 'Spirituality',
      content: 'Worship extends beyond formal rituals to any beneficial action performed with sincere intent (Ikhlas) for the welfare of people and the pleasure of the Creator.',
      evidenceLevel: 'OBSERVED',
      sources: ['Quran 51:56']
    },
    {
      id: 'halal-finance',
      title: 'Halal Economics & NUR',
      subtitle: 'Pure Earning, Zakat, and Zero-Riba',
      icon: 'DollarSign',
      category: 'Economics',
      content: 'Absolute prohibition of usury (Riba), excessive ambiguity (Gharar), and exploitation. Ethical risk-sharing (Musharakah/Mudarabah) and asset-backed creation govern the NUR financial protocol.',
      evidenceLevel: 'OBSERVED',
      sources: ['Quran 2:275', 'AAOIFI Shariah Financial Standards']
    },
    {
      id: 'creation-care',
      title: 'Stewardship of Creation',
      subtitle: 'Ecology, Balance, and Earth Guardianship',
      icon: 'Leaf',
      category: 'Ecology',
      content: 'Humanity acts as a steward (Khalifah) entrusted with the Earth. Wastefulness (Israf), ecological destruction, and harming planetary equilibrium are strictly forbidden.',
      evidenceLevel: 'OBSERVED',
      sources: ['Quran 6:141', 'Quran 7:56']
    }
  ],

  TR: [
    {
      id: 'iman',
      title: 'İman (Akaid)',
      subtitle: 'İmanın esasları ve inanç temelleri',
      icon: 'Sparkles',
      category: 'Akaid',
      content: 'İman altı esası kapsar: Allah\'a, meleklerine, kitaplarına, peygamberlerine, ahiret gününe ve kadere (hayır ve şerrin Allah\'tan olduğuna) kalben inanmak.\n\nKeyMatrix OS\'te iman, teknolojinin ahlaki pusulasını teşkil eder.',
      evidenceLevel: 'OBSERVED',
      sources: ['Kuran 2:285', 'Cibril Hadisi (Sahih Müslim #8)']
    },
    {
      id: 'pillars',
      title: 'İslam\'ın 5 Şartı',
      subtitle: 'Amel, ibadet ve manevi derinlik',
      icon: 'Layers',
      category: 'Tatbikat',
      content: '1. Kelime-i Şehadet\n2. Namaz (günde 5 vakit)\n3. Zekat (ihtiyaç sahiplerine arındırıcı destek)\n4. Oruç (Ramazan ayı)\n5. Hac (gücü yetenler için Kabe ziyareti).',
      evidenceLevel: 'OBSERVED',
      sources: ['Kuran 2:43', 'Sahih-i Buhari #8']
    },
    {
      id: 'akhlaq',
      title: 'Güzel Ahlak',
      subtitle: 'Karakter, erdem ve doğruluk',
      icon: 'Heart',
      category: 'Ahlak',
      content: '«Ben ancak güzel ahlakı tamamlamak için gönderildim.» Doğruluk (sıdk), adalet, merhamet ve haya yapay zeka kararlarının temelidir.',
      evidenceLevel: 'OBSERVED',
      sources: ['Müsned Ahmed #8952', 'Kuran 68:4']
    },
    {
      id: 'family',
      title: 'Aile ve Toplum',
      subtitle: 'Sorumluluk, sevgi ve akrabalık bağları',
      icon: 'Users',
      category: 'Toplum',
      content: 'Aile toplumun temel taşıdır. Anne-babaya saygı, çocuklara şefkat ve sıla-i rahim vazgeçilmez ilkelerdir.',
      evidenceLevel: 'OBSERVED',
      sources: ['Kuran 17:23', 'Kuran 4:36']
    },
    {
      id: 'ilm',
      title: 'İlim ve Hikmet',
      subtitle: 'Aydınlığa ve hakikate giden yol',
      icon: 'BookOpen',
      category: 'İlim',
      content: '«Rabbim, ilmimi artır!» (Kuran 20:114). İlim tahsili her Müslümana farzdır. Bilim ve maneviyat birbirini tamamlar.',
      evidenceLevel: 'OBSERVED',
      sources: ['Kuran 20:114', 'Sünen İbn Mace #224']
    },
    {
      id: 'ibadah',
      title: 'İbadet ve İhlas',
      subtitle: 'Yaratan ile bağ ve hayırlı ameller',
      icon: 'Sun',
      category: 'Maneviyat',
      content: 'İbadet sadece şekilsel değil, ihlasla insanlığa fayda sağlamak için yapılan her güzel davranışı içerir.',
      evidenceLevel: 'OBSERVED',
      sources: ['Kuran 51:56']
    },
    {
      id: 'halal-finance',
      title: 'Helal Finans ve NUR',
      subtitle: 'Temiz kazanç, zekat ve sıfır faiz',
      icon: 'DollarSign',
      category: 'Ekonomi',
      content: 'Faiz (riba) ve aldatma kesin olarak haramdır. Risk paylaşımı ve reel varlıklara dayalı adil ekonomi esastır.',
      evidenceLevel: 'OBSERVED',
      sources: ['Kuran 2:275', 'AAOIFI İslami Finans İlkeleri']
    },
    {
      id: 'creation-care',
      title: 'Yaratılana Merhamet',
      subtitle: 'Çevre bilinci ve emanet şuuru',
      icon: 'Leaf',
      category: 'Ekoloji',
      content: 'İnsan yeryüzünün halifesidir. İsraf ve doğanın dengesini bozmak kesinlikle yasaklanmıştır.',
      evidenceLevel: 'OBSERVED',
      sources: ['Kuran 6:141', 'Kuran 7:56']
    }
  ],

  AR: [
    {
      id: 'iman',
      title: 'الإيمان والعقيدة',
      subtitle: 'أركان الإيمان وأصول الاعتقاد',
      icon: 'Sparkles',
      category: 'عقيدة',
      content: 'يشمل الإيمان الأركان الستة: الإيمان بالله، وملائكته، وكتبه، ورسله، واليوم الآخر، والقدر خيره وشره.\n\nيمثل الإيمان في نظام KeyMatrix OS البوصلة الأخلاقية لتوجيه الذكاء الاصطناعي والتقنية.',
      evidenceLevel: 'OBSERVED',
      sources: ['القرآن ٢:٢٨٥', 'حديث جبريل (صحيح مسلم #٨)']
    },
    {
      id: 'pillars',
      title: 'أركان الإسلام الخمسة',
      subtitle: 'التطبيق العملي والعمق الروحي',
      icon: 'Layers',
      category: 'عبادات',
      content: '١. الشهادتان\n٢. إقام الصلاة\n٣. إيتاء الزكاة\n٤. صوم رمضان\n٥. حج البيت لمن استطاع إليه سبيلاً.',
      evidenceLevel: 'OBSERVED',
      sources: ['القرآن ٢:٤٣', 'صحيح البخاري #٨']
    },
    {
      id: 'akhlaq',
      title: 'الأخلاق الفاضلة',
      subtitle: 'مكارم الأخلاق والكرامة والرحمة',
      icon: 'Heart',
      category: 'أخلاق',
      content: '«إنما بعثت لأتمم مكارم الأخلاق». الصدق والعدل والرحمة والحياء مبادئ مدمجة في صميم قرارات الذكاء الاصطناعي.',
      evidenceLevel: 'OBSERVED',
      sources: ['مسند أحمد #٨٩٥٢', 'القرآن ٦٨:٤']
    },
    {
      id: 'family',
      title: 'الأسرة والمجتمع',
      subtitle: 'التكافل والرحمة وصلة الأرحام',
      icon: 'Users',
      category: 'مجتمع',
      content: 'الأسرة هي حجر الزاوية للمجتمع الإنساني. بر الوالدين وحسن تربية الأبناء وصلة الأرحام ركائز أساسية.',
      evidenceLevel: 'OBSERVED',
      sources: ['القرآن ١٧:٢٣', 'القرآن ٤:٣٦']
    },
    {
      id: 'ilm',
      title: 'العلم والمعرفة',
      subtitle: 'طريق النور والهداية',
      icon: 'BookOpen',
      category: 'علم',
      content: '«وقل رب زدني علماً» (طه: ١١٤). طلب العلم فريضة على كل مسلم ومسلمة، والعلم النافع يخدم كرامة الإنسان.',
      evidenceLevel: 'OBSERVED',
      sources: ['القرآن ٢٠:١١٤', 'سنن ابن ماجه #٢٢٤']
    },
    {
      id: 'ibadah',
      title: 'العبادة والإخلاص',
      subtitle: 'الصلة بالخالق وعمارة الأرض',
      icon: 'Sun',
      category: 'روحانيات',
      content: 'العبادة تشمل الشعائر التعبدية وكل عمل صالح خالص لوجه الله لنفع الناس وإعمار الكون.',
      evidenceLevel: 'OBSERVED',
      sources: ['القرآن ٥١:٥٦']
    },
    {
      id: 'halal-finance',
      title: 'الاقتصاد الحلال ونور',
      subtitle: 'الكسب الطيب والتكافل ومحاربة الربا',
      icon: 'DollarSign',
      category: 'اقتصاد',
      content: 'تحريم الربا والغرر والاحتكار، وإرساء المشاركة العادلة في الربح والخسارة وتوجيه الثروة للإنتاج الحقيقي.',
      evidenceLevel: 'OBSERVED',
      sources: ['القرآن ٢:٢٧٥', 'معايير أيوفي الشرعية']
    },
    {
      id: 'creation-care',
      title: 'رعاية الخلق والبيئة',
      subtitle: 'الاستخلاف في الأرض وحفظ الميزان',
      icon: 'Leaf',
      category: 'بيئة',
      content: 'الإنسان مستخلف في الأرض مؤتمن عليها، وينهى الإسلام عن الإسراف والإفساد في الأرض.',
      evidenceLevel: 'OBSERVED',
      sources: ['القرآن ٦:١٤١', 'القرآن ٧:٥٦']
    }
  ],

  FA: [
    {
      id: 'iman',
      title: 'ایمان و باورها',
      subtitle: 'اصول و ارکان ایمان اسلامی',
      icon: 'Sparkles',
      category: 'عقاید',
      content: 'ایمان شامل ارکان بنیادین است: باور به یگانگی خداوند، فرشتگان، کتب آسمانی، پیامبران، روز جزا و تقدیر الهی.\n\nدر KeyMatrix OS ایمان قطب‌نمای اخلاقی هدایت‌کننده هوش مصنوعی است.',
      evidenceLevel: 'OBSERVED',
      sources: ['قرآن ۲:۲۸۵', 'حدیث جبرئیل (صحیح مسلم)']
    },
    {
      id: 'pillars',
      title: 'پنج رکن اسلام',
      subtitle: 'اعمال عبادی و بعد معنوی',
      icon: 'Layers',
      category: 'اعمال',
      content: '۱. شهادتین\n۲. نمازهای پنج‌گانه\n۳. زکات و انفاق\n۴. روزه ماه مبارک رمضان\n۵. حج برای توانمندان.',
      evidenceLevel: 'OBSERVED',
      sources: ['قرآن ۲:۴۳', 'صحیح بخاری #۸']
    },
    {
      id: 'akhlaq',
      title: 'اخلاق حسنه',
      subtitle: 'کرامت انسانی، صداقت و محبت',
      icon: 'Heart',
      category: 'اخلاق',
      content: '«همانا من برای تکمیل مکارم اخلاق برانگیخته شدم». صداقت، عدالت، رافت و حیا سرلوحه تصمیمات سیستم است.',
      evidenceLevel: 'OBSERVED',
      sources: ['مسند احمد', 'قرآن ۶۸:۴']
    },
    {
      id: 'family',
      title: 'خانواده و جامعه',
      subtitle: 'احترام متقابل و پیوندهای خویشاوندی',
      icon: 'Users',
      category: 'جامعه',
      content: 'خانواده بنیان اصیل جامعه است. نیکی به والدین، مهرورزی به فرزندان و صله رحم از واجبات است.',
      evidenceLevel: 'OBSERVED',
      sources: ['قرآن ۱۷:۲۳', 'قرآن ۴:۳۶']
    },
    {
      id: 'ilm',
      title: 'دانش و حکمت',
      subtitle: 'مسیر روشنایی و آگاهی',
      icon: 'BookOpen',
      category: 'دانش',
      content: '«بگو پروردگارا بر دانشم بیفزای!» طلب علم فریضه‌ای بر دوش همگان است و علم و معنویت همگام پیش می‌روند.',
      evidenceLevel: 'OBSERVED',
      sources: ['قرآن ۲۰:۱۱۴', 'سنن ابن ماجه']
    },
    {
      id: 'ibadah',
      title: 'عبادت و نیت خالص',
      subtitle: 'ارتباط با پروردگار و عمل صالح',
      icon: 'Sun',
      category: 'معنویت',
      content: 'عبادت تنها مناسک نیست، بلکه هر کار نیکی که با اخلاص برای خدمت به خلق و رضای خالق باشد عبادت است.',
      evidenceLevel: 'OBSERVED',
      sources: ['قرآن ۵۱:۵۶']
    },
    {
      id: 'halal-finance',
      title: 'اقتصاد حلال و نور',
      subtitle: 'کسب پاکیزه، نفی ربا و عدالت اقتصادی',
      icon: 'DollarSign',
      category: 'اقتصاد',
      content: 'حرمت ربا و فریبکاری و استقرار اقتصاد مشارکتی و تولیدمحور در بستر پروتکل مالی نور.',
      evidenceLevel: 'OBSERVED',
      sources: ['قرآن ۲:۲۷۵', 'استانداردهای مالی اسلامی']
    },
    {
      id: 'creation-care',
      title: 'حفاظت از محیط زیست',
      subtitle: 'مسئولیت امانت‌داری بر روی زمین',
      icon: 'Leaf',
      category: 'محیط‌زیست',
      content: 'انسان خلیفه خداوند در زمین است؛ اسراف و تخریب تعادل زیستی در جهان هستی اکیداً نهی شده است.',
      evidenceLevel: 'OBSERVED',
      sources: ['قرآن ۶:۱۴۱', 'قرآن ۷:۵۶']
    }
  ],

  UR: [
    {
      id: 'iman',
      title: 'ایمان اور عقائد',
      subtitle: 'ایمان کے بنیادی ارکان اور ستون',
      icon: 'Sparkles',
      category: 'عقائد',
      content: 'ایمان چھ بنیادی ارکان پر مشتمل ہے: اللہ، اس کے فرشتوں، آسمانی کتب، رسولوں، قیامت کے دن اور تقدیر پر پختہ یقین رکھنا۔\n\nKeyMatrix OS میں ایمان ٹیکنالوجی کا اعلیٰ اخلاقی اور روحانی قطب نما ہے۔',
      evidenceLevel: 'OBSERVED',
      sources: ['قرآن ۲:۲۸۵', 'حدیث جبریل (صحیح مسلم #۸)']
    },
    {
      id: 'pillars',
      title: 'اسلام کے ۵ بنیادی ارکان',
      subtitle: 'عملی عبادات اور روحانی گہرائی',
      icon: 'Layers',
      category: 'عبادات',
      content: '۱. کلمہ شہادت\n۲. پانچ وقت کی نماز\n۳. زکوٰۃ کی ادائیگی\n۴. رمضان کے روزے\n۵. صاحب استطاعت کے لیے حج بیت اللہ۔',
      evidenceLevel: 'OBSERVED',
      sources: ['قرآن ۲:۴۳', 'صحیح بخاری #۸']
    },
    {
      id: 'akhlaq',
      title: 'اخلاق حسنہ',
      subtitle: 'کردار، سچائی اور انسانی وقار',
      icon: 'Heart',
      category: 'اخلاقیات',
      content: '«مجھے بہترین اخلاق کی تکمیل کے لیے بھیجا گیا ہے۔» سچائی، عدل، رحمت اور حیا تمام اے آئی ماڈلز کی بنیادی ہدایات ہیں۔',
      evidenceLevel: 'OBSERVED',
      sources: ['مسند احمد #۸۹۵۲', 'قرآن ۶۸:۴']
    },
    {
      id: 'family',
      title: 'خاندان اور معاشرہ',
      subtitle: 'باہمی احترام اور صلہ رحمی',
      icon: 'Users',
      category: 'معاشرہ',
      content: 'خاندان انسانی معاشرے کی بنیادی اکائی ہے۔ والدین کا احترام، اولاد کی شفقت اور صلہ رحمی لازمی فرائض ہیں۔',
      evidenceLevel: 'OBSERVED',
      sources: ['قرآن ۱۷:۲۳', 'قرآن ۴:۳۶']
    },
    {
      id: 'ilm',
      title: 'علم اور حکمت',
      subtitle: 'تاریکی سے نور کی طرف راستہ',
      icon: 'BookOpen',
      category: 'علم',
      content: '«کہہ دیجیے: اے میرے رب! میرے علم میں اضافہ فرما!» طلب علم ہر مسلمان پر فرض ہے۔',
      evidenceLevel: 'OBSERVED',
      sources: ['قرآن ۲۰:۱۱۴', 'سنن ابن ماجہ #۲۲۴']
    },
    {
      id: 'ibadah',
      title: 'عبادت اور اخلاص',
      subtitle: 'خالق سے تعلق اور مخلوق کی خدمت',
      icon: 'Sun',
      category: 'روحانیت',
      content: 'عبادت محض رسومات تک محدود نہیں بلکہ خلوص نیت کے ساتھ بنی نوع انسان کی فلاح کا ہر عمل عبادت ہے۔',
      evidenceLevel: 'OBSERVED',
      sources: ['قرآن ۵۱:۵۶']
    },
    {
      id: 'halal-finance',
      title: 'حلال معیشت اور نور',
      subtitle: 'پاکیزہ کمائی، زکوٰۃ اور سود سے پاک نظام',
      icon: 'DollarSign',
      category: 'معیشت',
      content: 'سود اور دھوکہ دہی کی مکمل ممانعت، نفع و نقصان کی شراکت اور حقیقی پیداوار پر مبنی نور معاشی نظام۔',
      evidenceLevel: 'OBSERVED',
      sources: ['قرآن ۲:۲۷۵', 'اسلامی مالیاتی اصول']
    },
    {
      id: 'creation-care',
      title: 'ماحولیات اور مخلوق کا تحفظ',
      subtitle: 'زمین پر خلافت اور امانت داری',
      icon: 'Leaf',
      category: 'ماحولیات',
      content: 'انسان زمین پر اللہ کا خلیفہ اور نگہبان ہے۔ اسراف اور ماحولیاتی بگاڑ کی سخت ممانعت ہے۔',
      evidenceLevel: 'OBSERVED',
      sources: ['قرآن ۶:۱۴۱', 'قرآن ۷:۵۶']
    }
  ]
};

// ==========================================
// 2. ISLAMIC FAQS (7 CORE TOPICS)
// ==========================================

export const LOCALIZED_ISLAMIC_FAQS: Record<Language, { categories: { id: string; label: string }[]; faqs: IslamicFAQ[] }> = {
  AZ: {
    categories: [
      { id: 'ALL', label: 'Bütün Kateqoriyalar' },
      { id: 'Namaz', label: 'Namaz' },
      { id: 'Maliyyə', label: 'Maliyyə' },
      { id: 'Etika', label: 'Əxlaq və Etika' },
      { id: 'İbadət', label: 'İbadət' },
      { id: 'Ailə', label: 'Ailə' },
      { id: 'Texnologiya', label: 'Texnologiya' }
    ],
    faqs: [
      {
        id: 'qibla-faq',
        question: 'Qibləni necə tapmaq olar?',
        shortAnswer: 'Qiblə Məkkədəki Müqəddəs Kəbənin istiqamətidir (21.4225° N, 39.8262° E). Bakı üçün azimut 236.1° (Cənub-Qərb) təşkil edir.',
        fullAnswer: 'Qiblə müsəlmanların namaz qılarkən üz tutduğu Müqəddəs Kəbənin istiqamətidir. KeyMatrix OS-də Qibla Adapter cihazın dəqiq GPS koordinatlarından və sferik triqonometriya düsturlarından istifadə edərək real azimutu hesablayır.',
        category: 'Namaz',
        evidenceLevel: 'OBSERVED'
      },
      {
        id: 'namaz-faq',
        question: 'Namaz necə qılınır?',
        shortAnswer: 'Gündəlik beş vaxt namaz: Sübh (2 rükət), Zöhr (4), Əsr (4), Məğrib (3), İşa (4) dəstəmazlı halda qılınır.',
        fullAnswer: 'Namaz dəstəmaz aldıqdan sonra Qibləyə yönələrək, səmimi niyyət və təkbir ilə başlayır. Namaz Fatihə surəsinin və əlavə ayələrin oxunmasını, rükuları və səcdələri əhatə edir.',
        category: 'Namaz',
        evidenceLevel: 'OBSERVED'
      },
      {
        id: 'zakat-faq',
        question: 'Zəkat nədir və kimlərə verilir?',
        shortAnswer: 'Nisab həddini aşan yığılmış qazanc və var-dövlətdən ildə bir dəfə 2.5% miqdarında ehtiyac sahiblərinə verilən vacib paydır.',
        fullAnswer: 'Zəkat İslamın beş sütunundan biridir, var-dövləti mənəvi cəhətdən təmizləyir və cəmiyyətdə sosial ədaləti bərqərar edir. NUR iqtisadiyyatında zəkat şəffaf şəkildə ehtiyac sahiblərinə yönəldilir.',
        category: 'Maliyyə',
        evidenceLevel: 'OBSERVED'
      },
      {
        id: 'halal-haram-faq',
        question: 'Halal və haram nə deməkdir?',
        shortAnswer: 'Halal — Allahın icazə verdiyi xeyirli və təmiz şeylərdir. Haram — qadağan olunmuş, insana və cəmiyyətə zərərli olan əməllərdir.',
        fullAnswer: 'İslam hüququnda əsas prinsip odur ki, haqqında qadağa olmayan hər bir təmiz şey halaldır. Sələmçilik, yalan, fırıldaqçılıq, zərərli maddələr və ekoloji dağıntı haramdır.',
        category: 'Etika',
        evidenceLevel: 'OBSERVED'
      },
      {
        id: 'fasting-faq',
        question: 'Ramazan orucu necə tutulur?',
        shortAnswer: 'Fəcr (dan yeri söküləndən) Məğribə (gün batana) qədər yeməkdən, içməkdən və nəfsani istəklərdən çəkinməklə mənəvi saflaşma.',
        fullAnswer: 'Ramazan orucu insanda təqva (məsuliyyət şüuru), iradə möhkəmliyi və ehtiyac sahiblərinə qarşı empatiya formalaşdırır.',
        category: 'İbadət',
        evidenceLevel: 'OBSERVED'
      },
      {
        id: 'family-faq',
        question: 'İslamda ailə dəyərləri nələrdir?',
        shortAnswer: 'Sevgi (məvəddə), mərhəmət (rəhmət) və qarşılıqlı hörmət üzərində qurulmuş müqəddəs ittifaqdır.',
        fullAnswer: 'Peyğəmbərimiz ﷺ buyurmuşdur: «Sizin ən xeyirliniz öz ailəsinə qarşı ən xeyirxah olanınızdır». Ailə cəmiyyətin mənəvi sütunudur.',
        category: 'Ailə',
        evidenceLevel: 'OBSERVED'
      },
      {
        id: 'ai-help-faq',
        question: 'Süni intellekt insana necə kömək edir?',
        shortAnswer: 'KeyMatrix OS-də AI insanın xidmətində olan, etik və Şura qaydaları ilə idarə olunan faydalı vasitədir.',
        fullAnswer: 'Süni intellekt resursların ədalətli paylanmasına kömək edir, təhsili asanlaşdırır, ekoloji monitorinq aparır və insanın vaxtına qənaət edərək onu mənəvi inkişafa yönəldir.',
        category: 'Texnologiya',
        evidenceLevel: 'RUNNING'
      }
    ]
  },

  RU: {
    categories: [
      { id: 'ALL', label: 'Все категории' },
      { id: 'Намаз', label: 'Намаз' },
      { id: 'Финансы', label: 'Финансы' },
      { id: 'Этика', label: 'Этика' },
      { id: 'Поклонение', label: 'Поклонение' },
      { id: 'Семья', label: 'Семья' },
      { id: 'Технологии', label: 'Технологии' }
    ],
    faqs: [
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
    ]
  },

  EN: {
    categories: [
      { id: 'ALL', label: 'All Categories' },
      { id: 'Prayer', label: 'Prayer' },
      { id: 'Finance', label: 'Finance' },
      { id: 'Ethics', label: 'Ethics' },
      { id: 'Worship', label: 'Worship' },
      { id: 'Family', label: 'Family' },
      { id: 'Technology', label: 'Technology' }
    ],
    faqs: [
      {
        id: 'qibla-faq',
        question: 'How do I locate the Qibla?',
        shortAnswer: 'Qibla is the direction towards the Holy Kaaba in Makkah (21.4225° N, 39.8262° E). From Baku, bearing is 236.1° (South-West).',
        fullAnswer: 'The Qibla represents the unified direction faced by Muslims in prayer. In KeyMatrix OS, the Qibla Adapter computes the exact orthodromic bearing via spherical geodesy using live device coordinates.',
        category: 'Prayer',
        evidenceLevel: 'OBSERVED'
      },
      {
        id: 'namaz-faq',
        question: 'How is Salah performed?',
        shortAnswer: 'Five daily prayers: Fajr (2 rakats), Dhuhr (4), Asr (4), Maghrib (3), and Isha (4) in a state of ritual purity (Wudu).',
        fullAnswer: 'Salah begins with sincere intention (Niyyah) and the Takbir facing the Qibla. It encompasses recitation of Surah Al-Fatiha, bowing (Ruku), and prostration (Sujud) before the Almighty.',
        category: 'Prayer',
        evidenceLevel: 'OBSERVED'
      },
      {
        id: 'zakat-faq',
        question: 'What is Zakat and who receives it?',
        shortAnswer: 'An obligatory purifying contribution of 2.5% on qualifying wealth held above the Nisab threshold for a lunar year.',
        fullAnswer: 'Zakat is a core pillar of Islam fostering economic justice and social cohesion. Within the NUR economy, Zakat is routed transparently without intermediary overhead.',
        category: 'Finance',
        evidenceLevel: 'OBSERVED'
      },
      {
        id: 'halal-haram-faq',
        question: 'What defines Halal and Haram?',
        shortAnswer: 'Halal denotes lawful, pure, and wholesome things. Haram refers to explicitly forbidden and harmful practices.',
        fullAnswer: 'Islamic jurisprudence presumes permissibility in all beneficial worldly matters unless explicitly prohibited, such as usury, deceit, intoxicants, and environmental harm.',
        category: 'Ethics',
        evidenceLevel: 'OBSERVED'
      },
      {
        id: 'fasting-faq',
        question: 'How is fasting observed in Ramadan?',
        shortAnswer: 'Abstaining from food, drink, and desires from dawn (Fajr) to sunset (Maghrib) accompanied by spiritual refinement.',
        fullAnswer: 'Fasting in Ramadan instills consciousness of God (Taqwa), discipline, compassion for the underprivileged, and focused self-mastery.',
        category: 'Worship',
        evidenceLevel: 'OBSERVED'
      },
      {
        id: 'family-faq',
        question: 'Family values in Islam',
        shortAnswer: 'A sacred union built on mutual affection (Mawaddah), mercy (Rahmah), and supportive responsibility.',
        fullAnswer: 'Prophet Muhammad ﷺ stated: "The best among you are those who are best to their families." The family is civilization\'s moral bedrock.',
        category: 'Family',
        evidenceLevel: 'OBSERVED'
      },
      {
        id: 'ai-help-faq',
        question: 'How can ethical AI assist humanity?',
        shortAnswer: 'In KeyMatrix OS, AI is a loyal steward serving human dignity, bound by Shura Rule #42 and Maqasid al-Shariah.',
        fullAnswer: 'AI optimizes resource distribution, accelerates learning, monitors environmental regeneration, and frees human time for contemplation and family.',
        category: 'Technology',
        evidenceLevel: 'RUNNING'
      }
    ]
  },

  TR: {
    categories: [
      { id: 'ALL', label: 'Tüm Kategoriler' },
      { id: 'Namaz', label: 'Namaz' },
      { id: 'Finans', label: 'Finans' },
      { id: 'Ahlak', label: 'Ahlak' },
      { id: 'İbadet', label: 'İbadet' },
      { id: 'Aile', label: 'Aile' },
      { id: 'Teknoloji', label: 'Teknoloji' }
    ],
    faqs: [
      {
        id: 'qibla-faq',
        question: 'Kıble yönü nasıl bulunur?',
        shortAnswer: 'Mekke\'deki Kabe yönüdür. Qibla Adapter, cihazın GPS verisiyle küresel trigonometri kullanarak tam açıyı belirler.',
        fullAnswer: 'Kıble namazda yönelinen istikamettir. Sistemimiz küresel ortodromik hesaplamalarla en hassas istikameti sunar.',
        category: 'Namaz',
        evidenceLevel: 'OBSERVED'
      },
      {
        id: 'namaz-faq',
        question: 'Namaz nasıl kılınır?',
        shortAnswer: 'Günde beş vakit: Sabah (2 rekat), Öğle (4), İkindi (4), Akşam (3), Yatsı (4) abdestli olarak kılınır.',
        fullAnswer: 'Namaz niyet ve tekbir ile başlar; Fatiha okunması, rüku ve secdeler ile huşu içinde eda edilir.',
        category: 'Namaz',
        evidenceLevel: 'OBSERVED'
      },
      {
        id: 'zakat-faq',
        question: 'Zekat nedir ve kimlere verilir?',
        shortAnswer: 'Nisap miktarını aşan birikimden yılda bir kez %2.5 oranında ihtiyaç sahiplerine verilen farz arınma payıdır.',
        fullAnswer: 'Zekat İslam\'ın beş temel şartından biridir. Toplumsal adaleti ve dayanışmayı tesis eder.',
        category: 'Finans',
        evidenceLevel: 'OBSERVED'
      },
      {
        id: 'halal-haram-faq',
        question: 'Helal ve haram nedir?',
        shortAnswer: 'Helal, dinen izin verilen faydalı şeylerdir. Haram ise yasaklanan ve topluma zarar veren unsurlardır.',
        fullAnswer: 'Faiz, hile, israf ve çevre tahribatı haram kapsamındadır; helal dairesi geniştir.',
        category: 'Ahlak',
        evidenceLevel: 'OBSERVED'
      },
      {
        id: 'fasting-faq',
        question: 'Ramazan orucu nasıl tutulur?',
        shortAnswer: 'İmsak vaktinden iftara kadar yeme-içme ve nefsani arzulardan uzak durarak nefsi terbiye etmek.',
        fullAnswer: 'Oruç takvayı, irade gücünü ve fakirlerin halini anlamayı sağlar.',
        category: 'İbadet',
        evidenceLevel: 'OBSERVED'
      },
      {
        id: 'family-faq',
        question: 'İslam\'da aile bağları',
        shortAnswer: 'Sevgi, merhamet ve karşılıklı hürmet üzerine kurulu kutsal bir müessesedir.',
        fullAnswer: '«Sizin en hayırlınız ailesine karşı en hayırlı olanınızdır.» Aile toplumun temelidir.',
        category: 'Aile',
        evidenceLevel: 'OBSERVED'
      },
      {
        id: 'ai-help-faq',
        question: 'Yapay zeka insanlığa nasıl yardımcı olur?',
        shortAnswer: 'KeyMatrix OS\'te yapay zeka, etik ve Şura kurallarına tabi güvenilir bir yardımcıdır.',
        fullAnswer: 'Kaynak yönetimini optimize eder, eğitimi destekler ve insana sevdikleriyle vakit geçirme imkanı tanır.',
        category: 'Teknoloji',
        evidenceLevel: 'RUNNING'
      }
    ]
  },

  AR: {
    categories: [
      { id: 'ALL', label: 'جميع الفئات' },
      { id: 'الصلاة', label: 'الصلاة' },
      { id: 'المالية', label: 'المعاملات المالية' },
      { id: 'الأخلاق', label: 'الأخلاق' },
      { id: 'العبادات', label: 'العبادات' },
      { id: 'الأسرة', label: 'الأسرة' },
      { id: 'التقنية', label: 'التقنية' }
    ],
    faqs: [
      {
        id: 'qibla-faq',
        question: 'كيف يمكن تحديد اتجاه القبلة بدقة؟',
        shortAnswer: 'القبلة هي الاتجاه نحو الكعبة المشرفة بمكة المكرمة. يحسب محول القبلة السمت الدقيق عبر الإحداثيات المباشرة.',
        fullAnswer: 'تعتمد القبلة على الحساب الفلكي الكروي الدقيق لحساب زاوية السمت من موقع المستخدم إلى مكة المكرمة.',
        category: 'الصلاة',
        evidenceLevel: 'OBSERVED'
      },
      {
        id: 'namaz-faq',
        question: 'كيف تؤدى الصلوات الخمس المفروضة؟',
        shortAnswer: 'خمس صلوات يومية: الفجر (ركعتان)، الظهر (٤)، العصر (٤)، المغرب (٣)، العشاء (٤) مع استيفاء الطهارة.',
        fullAnswer: 'تؤدى الصلاة متوجهاً إلى القبلة مع النية وتكبيرة الإحرام، وقراءة الفاتحة والركوع والسجود بخشوع تام.',
        category: 'الصلاة',
        evidenceLevel: 'OBSERVED'
      },
      {
        id: 'zakat-faq',
        question: 'ما هي الزكاة ومصارفها الشرعية؟',
        shortAnswer: 'ركن من أركان الإسلام، تبلغ ٢.٥٪ من الأموال البالغة للنصاب التي حال عليها الحول وتصرف للمستحقين.',
        fullAnswer: 'تطهر الزكاة الأموال وتعزز التكافل الاجتماعي وتمنع تركز الثروة في يد قلة محددة.',
        category: 'المالية',
        evidenceLevel: 'OBSERVED'
      },
      {
        id: 'halal-haram-faq',
        question: 'ما هو ضابط الحلال والحرام؟',
        shortAnswer: 'الحلال ما أحل الله من الطيبات، والحرام ما نهى عنه لما فيه من ضرر ومفسدة.',
        fullAnswer: 'الأصل في الأشياء النافعة الإباحة، والتحريم يتعلق بالمفاسد كالربا والظلم والإفساد في الأرض.',
        category: 'الأخلاق',
        evidenceLevel: 'OBSERVED'
      },
      {
        id: 'fasting-faq',
        question: 'كيف يتحقق صيام شهر رمضان المبارك؟',
        shortAnswer: 'الإمساك عن المفطرات من طلوع الفجر إلى غروب الشمس بنية التقرب إلى الله عز وجل.',
        fullAnswer: 'يهدف الصيام إلى تحقيق التقوى ومراقبة النفس وتزكيتها والإحساس بآلام الفقراء والمحتاجين.',
        category: 'العبادات',
        evidenceLevel: 'OBSERVED'
      },
      {
        id: 'family-faq',
        question: 'مكانة الأسرة في الإسلام',
        shortAnswer: 'ميثاق غليظ مبني على المودة والرحمة والمعاشرة بالمعروف وحفظ الحقوق.',
        fullAnswer: 'قال رسول الله ﷺ: «خيركم خيركم لأهله». والأسرة الصالحة هي نواة الحضارة الراشدة.',
        category: 'الأسرة',
        evidenceLevel: 'OBSERVED'
      },
      {
        id: 'ai-help-faq',
        question: 'كيف يسهم الذكاء الاصطناعي الأخلاقي في خدمة الإنسانية؟',
        shortAnswer: 'يعمل الذكاء الاصطناعي في KeyMatrix OS خادماً لكرامة الإنسان تحت مظلة الشورى والأخلاق.',
        fullAnswer: 'يساعد في إدارة الموارد وتيسير سبل المعرفة وحماية البيئة وصون أوقات البشر.',
        category: 'التقنية',
        evidenceLevel: 'RUNNING'
      }
    ]
  },

  FA: {
    categories: [
      { id: 'ALL', label: 'همه دسته‌ها' },
      { id: 'نماز', label: 'نماز' },
      { id: 'مالی', label: 'مالی' },
      { id: 'اخلاق', label: 'اخلاق' },
      { id: 'عبادت', label: 'عبادت' },
      { id: 'خانواده', label: 'خانواده' },
      { id: 'فناوری', label: 'فناوری' }
    ],
    faqs: [
      {
        id: 'qibla-faq',
        question: 'قبله چگونه تعیین می‌شود؟',
        shortAnswer: 'قبله جهت کعبه مشرفه در مکه است. این سیستم با مثلثات کروی زاویه دقیق قبله را محاسبه می‌کند.',
        fullAnswer: 'با دریافت مختصات جغرافیایی دستگاه، جهت دقیق قبله در هر نقطه از جهان به دقت نمایش داده می‌شود.',
        category: 'نماز',
        evidenceLevel: 'OBSERVED'
      },
      {
        id: 'namaz-faq',
        question: 'نمازهای یومیه چگونه اقامه می‌شوند؟',
        shortAnswer: 'پنج نماز روزانه: صبح (۲ رکعت)، ظهر (۴)، عصر (۴)، مغرب (۳)، عشاء (۴) با رعایت طهارت.',
        fullAnswer: 'نماز با نیت و تکبیرة‌الاحرام به سوی قبله آغاز شده و شامل قرائت سوره حمد، رکوع و سجود است.',
        category: 'نماز',
        evidenceLevel: 'OBSERVED'
      },
      {
        id: 'zakat-faq',
        question: 'زکات چیست و چه کاربردی دارد؟',
        shortAnswer: 'حق مالی واجبی است که برای پاکسازی اموال و کمک به نیازمندان پرداخت می‌شود.',
        fullAnswer: 'زکات از ارکان دین است و در بستر شفاف اقتصادی نور بدون کارمزد واسطه توزیع می‌گردد.',
        category: 'مالی',
        evidenceLevel: 'OBSERVED'
      },
      {
        id: 'halal-haram-faq',
        question: 'حلال و حرام به چه معناست؟',
        shortAnswer: 'حلال هر امر پاکیزه و مجاز است و حرام هر آنچه که به فرد و جامعه آسیب می‌رساند.',
        fullAnswer: 'ربا، فریبکاری و تخریب محیط زیست از محرمات هستند و منفعت حقیقی در پایبندی به حلال است.',
        category: 'اخلاق',
        evidenceLevel: 'OBSERVED'
      },
      {
        id: 'fasting-faq',
        question: 'روزه ماه رمضان چگونه است؟',
        shortAnswer: 'خودداری از مبطلات روزه از اذان صبح تا مغرب به قصد تقرب به درگاه خداوند.',
        fullAnswer: 'روزه موجب تقویت اراده، تقوا و همدردی عمیق با گرسنگان و مستمندان می‌گردد.',
        category: 'عبادت',
        evidenceLevel: 'OBSERVED'
      },
      {
        id: 'family-faq',
        question: 'جایگاه خانواده در فرهنگ اسلامی',
        shortAnswer: 'پیوندی مقدس مبتنی بر مودت، رحمت و مسئولیت‌پذیری دوجانبه است.',
        fullAnswer: 'پیامبر اکرم ﷺ فرمودند: بهترین شما کسی است که برای خانواده‌اش بهترین باشد.',
        category: 'خانواده',
        evidenceLevel: 'OBSERVED'
      },
      {
        id: 'ai-help-faq',
        question: 'هوش مصنوعی چگونه به انسان کمک می‌کند؟',
        shortAnswer: 'ابزاری در خدمت کرامت انسان و تحت نظارت دقیق اخلاق و موازین شورا.',
        fullAnswer: 'هوش مصنوعی به توزیع عادلانه امکانات، آموزش بهتر و حفظ محیط زیست یاری می‌رساند.',
        category: 'فناوری',
        evidenceLevel: 'RUNNING'
      }
    ]
  },

  UR: {
    categories: [
      { id: 'ALL', label: 'تمام زمرے' },
      { id: 'نماز', label: 'نماز' },
      { id: 'مالیات', label: 'مالیات' },
      { id: 'اخلاقیات', label: 'اخلاقیات' },
      { id: 'عبادت', label: 'عبادت' },
      { id: 'خاندان', label: 'خاندان' },
      { id: 'ٹیکنالوجی', label: 'ٹیکنالوجی' }
    ],
    faqs: [
      {
        id: 'qibla-faq',
        question: 'قبلہ کی سمت کیسے معلوم کی جائے؟',
        shortAnswer: 'قبلہ خانہ کعبہ کی سمت ہے۔ قبلہ ایڈاپٹر لائیو جی پی ایس اور کروی حساب کے ذریعے درست سمت فراہم کرتا ہے۔',
        fullAnswer: 'یہ نظام ریاضیاتی ماڈل کے ذریعے کرہ ارض کے کسی بھی مقام سے مکہ مکرمہ کا درست زاویہ معلوم کرتا ہے۔',
        category: 'نماز',
        evidenceLevel: 'OBSERVED'
      },
      {
        id: 'namaz-faq',
        question: 'پانچ وقت کی نماز کا طریقہ کیا ہے؟',
        shortAnswer: 'فجر (۲ رکعت)، ظہر (۴)، عصر (۴)، مغرب (۳)، اور عشاء (۴) پاکیزگی کی حالت میں ادا کی جاتی ہیں۔',
        fullAnswer: 'نماز قبلہ رخ ہو کر نیت اور تکبیر تحریمہ سے شروع ہوتی ہے اور سجدوں و قیام کے ساتھ مکمل کی جاتی ہے۔',
        category: 'نماز',
        evidenceLevel: 'OBSERVED'
      },
      {
        id: 'zakat-faq',
        question: 'زکوٰۃ کیا ہے اور اس کی اہمیت کیا ہے؟',
        shortAnswer: 'نصاب پر سال گزرنے کے بعد اڑھائی فیصد (2.5%) مالی امداد جو غریبوں کا حق ہے۔',
        fullAnswer: 'زکوٰۃ اسلام کا بنیادی ستون ہے جو معاشرے میں معاشی انصاف اور غربت کے خاتمے کا ضامن ہے۔',
        category: 'مالیات',
        evidenceLevel: 'OBSERVED'
      },
      {
        id: 'halal-haram-faq',
        question: 'حلال اور حرام کی تعریف کیا ہے؟',
        shortAnswer: 'حلال وہ پاکیزہ اشیاء ہیں جن کی اجازت دی گئی ہے اور حرام وہ ہیں جن سے انسان کو نقصان پہنچے۔',
        fullAnswer: 'سود، دھوکہ، رشوت اور ناانصافی حرام ہیں جبکہ محنت اور سچائی پر مبنی کمائی حلال ہے۔',
        category: 'اخلاقیات',
        evidenceLevel: 'OBSERVED'
      },
      {
        id: 'fasting-faq',
        question: 'رمضان کا روزہ کیسے رکھا جاتا ہے؟',
        shortAnswer: 'صبح صادق سے لے کر غروب آفتاب تک کھانے پینے اور برائیوں سے رکنے کا نام روزہ ہے۔',
        fullAnswer: 'روزہ تقویٰ پیدا کرتا ہے اور انسان میں صبر، شکر اور غریبوں کے احساس کو بیدار کرتا ہے۔',
        category: 'عبادت',
        evidenceLevel: 'OBSERVED'
      },
      {
        id: 'family-faq',
        question: 'اسلام میں خاندانی اقدار',
        shortAnswer: 'محبت، شفقت، اور باہمی تعاون پر مبنی ایک مضبوط اور پاکیزہ رشتہ۔',
        fullAnswer: 'نبی کریم ﷺ نے فرمایا: تم میں سے بہترین وہ ہے جو اپنے اہل و عیال کے لیے بہترین ہو۔',
        category: 'خاندان',
        evidenceLevel: 'OBSERVED'
      },
      {
        id: 'ai-help-faq',
        question: 'اخلاقی اے آئی کس طرح انسان کا مددگار ہے؟',
        shortAnswer: 'KeyMatrix OS میں مصنوعی ذہانت انسان کے ماتحت اور اخلاقی اصولوں کے تابع ایک خادم ہے۔',
        fullAnswer: 'یہ علم کے فروغ، وسائل کی منصفانہ تقسیم اور انسان کی فلاح و بہبود کے لیے کام کرتی ہے۔',
        category: 'ٹیکنالوجی',
        evidenceLevel: 'RUNNING'
      }
    ]
  }
};

// ==========================================
// 3. UI PANELS TRANSLATION STRINGS
// ==========================================

export const LOCALIZED_FOUNDATIONS_UI: Record<Language, LocalizedFoundationsPageUI> = {
  AZ: {
    pageTitle: 'İslamın Əsasları və Mənəvi Etika',
    pageSubtitle: 'İslam dəyərləri KeyMatrix OS adapterlərinin nüvəsi və əxlaqi kompasını təşkil edir',
    sourcesTitle: 'Kanonik Mənbələr və Sübutlar (Evidence Proofs)',
    architectureBoxTitle: 'KeyMatrix OS Memarlığına İnteqrasiya',
    architectureBoxDesc: 'Bu etik prinsip PrimeCore moduluna proqramlaşdırılıb və Şura Qaydası #42 vasitəsilə təsdiqlənir. Bütün muxtar AI agentləri generasiyalarını insan ləyaqətinin qorunması, bəşəriyyətə fayda və zərərin aradan qaldırılması (Məqasid əş-Şəriə) süzgəcindən keçirirlər.',
    footerLayer: 'M00 ETİKA VƏ DƏYƏRLƏR QATI v2.0',
    footerStatus: 'ŞƏRİƏT RAZILIĞI: 100% PASS'
  },
  RU: {
    pageTitle: 'Фундамент Ислама и Духовная Этика',
    pageSubtitle: 'Исламские ценности являются ядром адаптеров и нравственным компасом KeyMatrix OS',
    sourcesTitle: 'Канонические источники и ссылки (Evidence Proofs)',
    architectureBoxTitle: 'Интеграция в архитектуру KeyMatrix OS',
    architectureBoxDesc: 'Этот этический постулат запрограммирован в модуль PrimeCore и верифицируется в процессе Shura Rule #42. Все автономные ИИ-агенты фильтруют генерации через призму сохранения чести, пользы человечеству и недопущения вреда (Макасыд аш-Шариа).',
    footerLayer: 'M00 ETHICS LAYER v2.0',
    footerStatus: 'SHARIAH CONSENSUS: 100% PASS'
  },
  EN: {
    pageTitle: 'Foundations of Islam & Spiritual Ethics',
    pageSubtitle: 'Islamic values form the ethical core and moral compass of KeyMatrix OS adapters',
    sourcesTitle: 'Canonical Sources & Evidence Proofs',
    architectureBoxTitle: 'KeyMatrix OS Architecture Integration',
    architectureBoxDesc: 'This ethical foundation is embedded in the PrimeCore module and verified through Shura Rule #42. All autonomous AI agents filter executions to preserve human dignity, ensure universal benefit, and prevent harm (Maqasid al-Shariah).',
    footerLayer: 'M00 ETHICS LAYER v2.0',
    footerStatus: 'SHARIAH CONSENSUS: 100% PASS'
  },
  TR: {
    pageTitle: 'İslamın Temelleri ve Manevi Ahlak',
    pageSubtitle: 'İslami değerler KeyMatrix OS bağdaştırıcılarının çekirdeğini ve ahlaki pusulasını oluşturur',
    sourcesTitle: 'Kanonik Kaynaklar ve Kanıtlar (Evidence Proofs)',
    architectureBoxTitle: 'KeyMatrix OS Mimarisine Entegrasyon',
    architectureBoxDesc: 'Bu ahlaki ilke PrimeCore modülüne programlanmış olup Şura Kuralı #42 ile doğrulanmaktadır. Tüm otonom yapay zeka ajanları üretimlerini insan onurunu koruma, topluma fayda sağlama ve zararı önleme (Makasidüş-Şeria) ilkelerine göre filtreler.',
    footerLayer: 'M00 AHLAK VE DEĞERLER KATMANI v2.0',
    footerStatus: 'ŞERİAT MUTABAKATI: 100% PASS'
  },
  AR: {
    pageTitle: 'أسس الإسلام والأخلاق الروحية',
    pageSubtitle: 'تشكل القيم الإسلامية جوهر المحولات والبوصلة الأخلاقية لنظام KeyMatrix OS',
    sourcesTitle: 'المصادر المعتمدة وأدلة الإثبات (Evidence Proofs)',
    architectureBoxTitle: 'التكامل مع بنية نظام KeyMatrix OS',
    architectureBoxDesc: 'هذا المبدأ الأخلاقي مبرمج في وحدة PrimeCore ويتم التحقق منه عبر قاعدة الشورى رقم 42. تقوم جميع وكلاء الذكاء الاصطناعي بتصفية المخرجات وفق مقاصد الشريعة لحفظ الكرامة الإنسانية وتحقيق النفع العام ودرء المفاسد.',
    footerLayer: 'M00 طبقة الأخلاق والقيم v2.0',
    footerStatus: 'التوافق الشرعي: 100% PASS'
  },
  FA: {
    pageTitle: 'مبانی اسلام و اخلاق معنوی',
    pageSubtitle: 'ارزش‌های اسلامی هسته آداپتورها و قطب‌نمای اخلاقی سیستم KeyMatrix OS را تشکیل می‌دهند',
    sourcesTitle: 'منابع معتبر و شواهد استنادی (Evidence Proofs)',
    architectureBoxTitle: 'یکپارچه‌سازی با معماری سیستم KeyMatrix OS',
    architectureBoxDesc: 'این اصل اخلاقی در ماژول PrimeCore برنامه‌ریزی شده و از طریق قاعده شورای شماره ۴۲ راستی‌آزمایی می‌شود. کلیه کارگزاران هوش مصنوعی خروجی‌های خود را در چارچوب مقاصد شریعت و حفظ کرامت انسانی فیلتر می‌کنند.',
    footerLayer: 'M00 لایه اخلاق و ارزش‌ها v2.0',
    footerStatus: 'انطباق شرعی: 100% PASS'
  },
  UR: {
    pageTitle: 'اسلام کی بنیادیں اور روحانی اخلاقیات',
    pageSubtitle: 'اسلامی اقدار KeyMatrix OS ایڈاپٹرز کا اخلاقی مرکز اور قطب نما ہیں',
    sourcesTitle: 'مستند مآخذ اور ثبوتی شواہد (Evidence Proofs)',
    architectureBoxTitle: 'KeyMatrix OS فن تعمیر کے ساتھ انضمام',
    architectureBoxDesc: 'یہ اخلاقی اصول PrimeCore ماڈیول میں شامل ہے اور شوری رول #42 کے ذریعے تصدیق شدہ ہے۔ تمام خودکار اے آئی ایجنٹس مقاصد شریعت کے مطابق انسانی وقار کے تحفظ اور نفع کے لیے نتائج کی جانچ کرتے ہیں۔',
    footerLayer: 'M00 اخلاقیات اور اقدار کی سطح v2.0',
    footerStatus: 'شرعی اتفاق رائے: 100% PASS'
  }
};

export const LOCALIZED_FAQ_UI: Record<Language, LocalizedFaqPageUI> = {
  AZ: {
    pageTitle: 'Tez-tez Verilən Suallar (FAQ) — Bilik və Cavablar',
    pageSubtitle: 'Namaz, halal maliyyə, oruc, ailə və etik süni intellektin rolu haqqında etibarlı kanonik cavablar',
    searchPlaceholder: 'Suallarda axtarış...',
    allCategoriesLabel: 'Bütün Kateqoriyalar',
    categoryTagLabel: 'Kateqoriya',
    canonicalAnswerBadge: 'Kanonik Cavab',
    categories: LOCALIZED_ISLAMIC_FAQS.AZ.categories
  },
  RU: {
    pageTitle: 'Частые вопросы (FAQ) — Знания и Ответы',
    pageSubtitle: 'Канонические ответы на вопросы о молитве, финансах, посте, семье и роли этичного ИИ',
    searchPlaceholder: 'Поиск по вопросам...',
    allCategoriesLabel: 'Все категории',
    categoryTagLabel: 'Категория',
    canonicalAnswerBadge: 'Канонический ответ',
    categories: LOCALIZED_ISLAMIC_FAQS.RU.categories
  },
  EN: {
    pageTitle: 'Frequently Asked Questions (FAQ) — Knowledge & Answers',
    pageSubtitle: 'Canonical clarifications on prayer, halal finance, fasting, family, and ethical AI in KeyMatrix OS',
    searchPlaceholder: 'Search questions and answers...',
    allCategoriesLabel: 'All Categories',
    categoryTagLabel: 'Category',
    canonicalAnswerBadge: 'Canonical Clarification',
    categories: LOCALIZED_ISLAMIC_FAQS.EN.categories
  },
  TR: {
    pageTitle: 'Sıkça Sorulan Sorular (SSS) — Bilgi ve Cevaplar',
    pageSubtitle: 'Namaz, helal finans, oruç, aile ve etik yapay zekanın rolü hakkında kanonik cevaplar',
    searchPlaceholder: 'Sorularda ara...',
    allCategoriesLabel: 'Tüm Kategoriler',
    categoryTagLabel: 'Kategori',
    canonicalAnswerBadge: 'Kanonik Cevap',
    categories: LOCALIZED_ISLAMIC_FAQS.TR.categories
  },
  AR: {
    pageTitle: 'الأسئلة الشائعة (FAQ) — المعرفة والإجابات',
    pageSubtitle: 'إجابات معتمدة حول الصلاة والمعاملات المالية والصيام والأسرة ودور الذكاء الاصطناعي الأخلاقي',
    searchPlaceholder: 'بحث في الأسئلة...',
    allCategoriesLabel: 'جميع الفئات',
    categoryTagLabel: 'الفئة',
    canonicalAnswerBadge: 'إيضاح شرعي معتمد',
    categories: LOCALIZED_ISLAMIC_FAQS.AR.categories
  },
  FA: {
    pageTitle: 'پرسش‌های متداول (FAQ) — دانش و پاسخ‌ها',
    pageSubtitle: 'پاسخ‌های معتبر در مورد نماز، مالیات حلال، روزه، خانواده و هوش مصنوعی اخلاقی',
    searchPlaceholder: 'جستجو در پرسش‌ها...',
    allCategoriesLabel: 'همه دسته‌ها',
    categoryTagLabel: 'دسته‌بندی',
    canonicalAnswerBadge: 'پاسخ معتبر مستند',
    categories: LOCALIZED_ISLAMIC_FAQS.FA.categories
  },
  UR: {
    pageTitle: 'اکثر پوچھے جانے والے سوالات (FAQ) — علم اور جوابات',
    pageSubtitle: 'نماز، حلال مالیات، روزہ، خاندانی نظام اور اخلاقی اے آئی کے متعلق مستند جوابات',
    searchPlaceholder: 'سوالات میں تلاش کریں...',
    allCategoriesLabel: 'تمام زمرے',
    categoryTagLabel: 'زمرہ',
    canonicalAnswerBadge: 'مستند شرعی جواب',
    categories: LOCALIZED_ISLAMIC_FAQS.UR.categories
  }
};

export const LOCALIZED_TOPBAR_UI: Record<Language, LocalizedTopBarUI> = {
  AZ: {
    adaptersBtn: 'Adapterlər',
    composerBtn: 'Profil',
    evidenceBtn: 'Sübutlar',
    adaptersTooltip: '01 Adapterlərin Avtomatik Aşkarlanması',
    composerTooltip: '07 İstifadəçi Profili və Tənzimləmə',
    evidenceTooltip: '06 Sübutlar Pilləkəni (Level 1–8)',
    gpsTooltip: 'Canlı GPS üçün klikləyin',
    localesHeader: '7 Qlobal Dil və Əlifba',
    childSafeActive: 'Uşaq Təhlükəsizlik Rejimi Aktivdir',
    rolesHeader: '9 Səlahiyyət Rolu (M10)',
    limitsMatrix: 'Hədlər & Matris'
  },
  RU: {
    adaptersBtn: 'Адаптеры',
    composerBtn: 'Профиль',
    evidenceBtn: 'Доказательства',
    adaptersTooltip: '01 Автоопределение адаптеров',
    composerTooltip: '07 Профиль и компоновщик',
    evidenceTooltip: '06 Лестница доказательств (Level 1–8)',
    gpsTooltip: 'Нажмите для использования реального GPS',
    localesHeader: '7 Глобальных локалей и письменностей',
    childSafeActive: 'Защита детей активна',
    rolesHeader: '9 Системных Ролей (M10)',
    limitsMatrix: 'Лимиты & Матрица'
  },
  EN: {
    adaptersBtn: 'Adapters',
    composerBtn: 'Composer',
    evidenceBtn: 'Evidence',
    adaptersTooltip: '01 Adapter Auto-Detection',
    composerTooltip: '07 Profile & Composer',
    evidenceTooltip: '06 Evidence Ladder (Level 1–8)',
    gpsTooltip: 'Click to use live GPS coordinates',
    localesHeader: '7 Global Locales & Scripts',
    childSafeActive: 'Child Safe Protection Active',
    rolesHeader: '9 Authority Roles (M10)',
    limitsMatrix: 'Limits & Matrix'
  },
  TR: {
    adaptersBtn: 'Bağdaştırıcılar',
    composerBtn: 'Profil',
    evidenceBtn: 'Kanıtlar',
    adaptersTooltip: '01 Bağdaştırıcı Otomatik Algılama',
    composerTooltip: '07 Kullanıcı Profili ve Düzenleyici',
    evidenceTooltip: '06 Kanıt Merdiveni (Level 1–8)',
    gpsTooltip: 'Canlı GPS kullanmak için tıklayın',
    localesHeader: '7 Küresel Dil ve Yazı Sistemi',
    childSafeActive: 'Çocuk Güvenliği Koruması Aktif',
    rolesHeader: '9 Yetki Rolü (M10)',
    limitsMatrix: 'Limitler & Matris'
  },
  AR: {
    adaptersBtn: 'المحولات',
    composerBtn: 'الملف',
    evidenceBtn: 'الأدلة',
    adaptersTooltip: '٠١ الكشف التلقائي عن المحولات',
    composerTooltip: '٠٧ ملف المستخدم والإعدادات',
    evidenceTooltip: '٠٦ سلم أدلة الإثبات (المستوى ١-٨)',
    gpsTooltip: 'انقر لاستخدام نظام تحديد المواقع المباشر',
    localesHeader: '٧ لغات وأنظمة كتابة عالمية',
    childSafeActive: 'حماية الطفل مفعلة',
    rolesHeader: '٩ أدوار للسلطة (M10)',
    limitsMatrix: 'الحدود والمصفوفة'
  },
  FA: {
    adaptersBtn: 'آداپتورها',
    composerBtn: 'نمایه',
    evidenceBtn: 'شواهد',
    adaptersTooltip: '۰۱ شناسایی خودکار آداپتورها',
    composerTooltip: '۰۷ نمایه و تنظیمات کاربری',
    evidenceTooltip: '۰۶ نردبان شواهد (سطوح ۱ تا ۸)',
    gpsTooltip: 'برای استفاده از موقعیت مکانی زنده کلیک کنید',
    localesHeader: '۷ زبان و خط جهانی',
    childSafeActive: 'حفاظت امن کودک فعال است',
    rolesHeader: '۹ نقش حاکمیتی (M10)',
    limitsMatrix: 'محدودیت‌ها و ماتریس'
  },
  UR: {
    adaptersBtn: 'ایڈاپٹرز',
    composerBtn: 'پروفائل',
    evidenceBtn: 'شواہد',
    adaptersTooltip: '۰۱ ایڈاپٹرز کی خودکار شناخت',
    composerTooltip: '۰۷ صارف پروفائل اور ترتیبات',
    evidenceTooltip: '۰۶ شواہد کا زینہ (لیول ۱ تا ۸)',
    gpsTooltip: 'براہ راست GPS کے لیے کلک کریں',
    localesHeader: '۷ عالمی زبانیں اور رسم الخط',
    childSafeActive: 'بچوں کے تحفظ کا نظام فعال ہے',
    rolesHeader: '9 مجاز اختیاری کردار (M10)',
    limitsMatrix: 'حدود اور میٹرکس'
  }
};

export const LOCALIZED_QURAN_UI: Record<Language, LocalizedQuranPageUI> = {
  AZ: {
    pageTitle: 'Qurani-Kərim Korpusu və Təfsir',
    pageSubtitle: 'Tanzil kanonik məlumatları, Uthmani xətti və dəqiq təfsir izahları',
    surahsTitle: 'Quran Surələri',
    searchSurahPlaceholder: 'Surə axtarışı...',
    searchAyahPlaceholder: 'Ayələrdə axtarış...',
    versesLabel: 'ayə',
    revealedInLabel: 'Nazil olub:',
    totalVersesLabel: 'Cəmi ayələr:',
    makkah: 'Məkkə',
    madinah: 'Mədinə',
    noVersesFound: 'Axtarış üzrə ayə tapılmadı.',
    listenTooltip: 'Qiraəti dinlə',
    copyTooltip: 'Kopyala',
    copiedTooltip: 'Kopyalandı',
    tafsirTitle: 'Təfsir və Məna Konteksti',
    ayahLabel: 'AYƏ',
    selectAyahPrompt: 'Təfsir və izah üçün siyahıdan ayə seçin.',
    corpusFooterNote: 'Oflayn-kəş: Tanzil Korpusu v1.0 • Qiraət: Şeyx Mişari Rəşid əl-Əfasi'
  },
  RU: {
    pageTitle: 'Коранический Корпус и Тафсир',
    pageSubtitle: 'Канонические данные Tanzil, шрифт Усмани и проверенные толкования аятов',
    surahsTitle: 'Суры Корана',
    searchSurahPlaceholder: 'Поиск сур...',
    searchAyahPlaceholder: 'Поиск по аятам...',
    versesLabel: 'аятов',
    revealedInLabel: 'Ниспослана в:',
    totalVersesLabel: 'Всего аятов:',
    makkah: 'Мекка',
    madinah: 'Медина',
    noVersesFound: 'Аяты по данному запросу не найдены.',
    listenTooltip: 'Прослушать чтение',
    copyTooltip: 'Копировать',
    copiedTooltip: 'Скопировано',
    tafsirTitle: 'Тафсир и смысловой контекст',
    ayahLabel: 'АЯТ',
    selectAyahPrompt: 'Выберите аят для просмотра толкования и контекста.',
    corpusFooterNote: 'Автономный оффлайн-кэш: Tanzil Quranic Corpus v1.0 • Аудио: шейх Мишари Рашид аль-Афаси'
  },
  EN: {
    pageTitle: 'Noble Quran Corpus & Tafsir',
    pageSubtitle: 'Canonical Tanzil corpus, authentic Uthmani script, and verified multi-lingual commentary',
    surahsTitle: 'Quran Surahs',
    searchSurahPlaceholder: 'Search surahs...',
    searchAyahPlaceholder: 'Search ayah keywords...',
    versesLabel: 'verses',
    revealedInLabel: 'Revealed in:',
    totalVersesLabel: 'Total verses:',
    makkah: 'Makkah',
    madinah: 'Madinah',
    noVersesFound: 'No verses found matching the query.',
    listenTooltip: 'Listen to recitation',
    copyTooltip: 'Copy verse',
    copiedTooltip: 'Copied',
    tafsirTitle: 'Tafsir & Meaning Context',
    ayahLabel: 'AYAH',
    selectAyahPrompt: 'Select an ayah to view tafsir and context.',
    corpusFooterNote: 'Offline-first cache: Tanzil Quranic Corpus v1.0 • Recitation: Sheikh Mishary Rashid Alafasy'
  },
  TR: {
    pageTitle: 'Kur\'an-ı Kerim Külliyatı ve Tefsir',
    pageSubtitle: 'Tanzil kanonik veritabanı, Osmani hattı ve güvenilir tefsir açıklamaları',
    surahsTitle: 'Kur\'an Sureleri',
    searchSurahPlaceholder: 'Sure ara...',
    searchAyahPlaceholder: 'Ayetlerde ara...',
    versesLabel: 'ayet',
    revealedInLabel: 'İndirildiği yer:',
    totalVersesLabel: 'Toplam ayet:',
    makkah: 'Mekke',
    madinah: 'Medine',
    noVersesFound: 'Aramaya uygun ayet bulunamadı.',
    listenTooltip: 'Tilaveti dinle',
    copyTooltip: 'Kopyala',
    copiedTooltip: 'Kopyalandı',
    tafsirTitle: 'Tefsir ve Anlam Bağlamı',
    ayahLabel: 'AYET',
    selectAyahPrompt: 'Tefsir ve açıklama için bir ayet seçin.',
    corpusFooterNote: 'Çevrimdışı önbellek: Tanzil Külliyatı v1.0 • Kıraat: Şeyh Meşari Raşid el-Afasi'
  },
  AR: {
    pageTitle: 'القرآن الكريم والتفسير المعتمد',
    pageSubtitle: 'النص العثماني الموثق من مشروع تنزيل مع التفاسير المعتمدة',
    surahsTitle: 'سور القرآن الكريم',
    searchSurahPlaceholder: 'بحث في السور...',
    searchAyahPlaceholder: 'بحث في الآيات...',
    versesLabel: 'آيات',
    revealedInLabel: 'مكان النزول:',
    totalVersesLabel: 'عدد الآيات:',
    makkah: 'مكية',
    madinah: 'مدنية',
    noVersesFound: 'لم يتم العثور على آيات تطابق البحث.',
    listenTooltip: 'استمع للتلاوة',
    copyTooltip: 'نسخ الآية',
    copiedTooltip: 'تم النسخ',
    tafsirTitle: 'التفسير وسياق المعاني',
    ayahLabel: 'الآية',
    selectAyahPrompt: 'اختر آية لعرض التفسير والمعاني.',
    corpusFooterNote: 'الذاكرة المؤقتة: مشروع تنزيل القرآني v1.0 • تلاوة: الشيخ مشاري راشد العفاسي'
  },
  FA: {
    pageTitle: 'متن کلام‌الله و تفسیر معتبر',
    pageSubtitle: 'متن معتبر عثمانی با تفاسیر مستند و ترجمه‌های چندزبانه',
    surahsTitle: 'سوره‌های قرآن',
    searchSurahPlaceholder: 'جستجوی سوره...',
    searchAyahPlaceholder: 'جستجو در آیات...',
    versesLabel: 'آیه',
    revealedInLabel: 'محل نزول:',
    totalVersesLabel: 'تعداد آیات:',
    makkah: 'مکی',
    madinah: 'مدنی',
    noVersesFound: 'آیه‌ای مطابق با جستجو یافت نشد.',
    listenTooltip: 'شنیدن قرائت',
    copyTooltip: 'کپی آیه',
    copiedTooltip: 'کپی شد',
    tafsirTitle: 'تفسیر و زمینه معنایی',
    ayahLabel: 'آیه',
    selectAyahPrompt: 'برای مشاهده تفسیر آیه‌ای را انتخاب کنید.',
    corpusFooterNote: 'حافظه آفلاین: پایگاه قرآنی تنزیل v1.0 • قاری: شیخ مشاری راشد العفاسی'
  },
  UR: {
    pageTitle: 'قرآن مجید اور مستند تفسیر',
    pageSubtitle: 'تنزيل کارپس کے مستند رسم الخط اور معتبر تفاسیر کے ساتھ',
    surahsTitle: 'قرآن مجید کی سورتیں',
    searchSurahPlaceholder: 'سورت تلاش کریں...',
    searchAyahPlaceholder: 'آیات میں تلاش کریں...',
    versesLabel: 'آیات',
    revealedInLabel: 'مقام نزول:',
    totalVersesLabel: 'کل آیات:',
    makkah: 'مکی',
    madinah: 'مدنی',
    noVersesFound: 'تلاش کے مطابق کوئی آیت نہیں ملی۔',
    listenTooltip: 'تلاوت سنیں',
    copyTooltip: 'آیت کاپی کریں',
    copiedTooltip: 'کاپی ہو گئی',
    tafsirTitle: 'تفسیر اور معنوی سیاق',
    ayahLabel: 'آیت',
    selectAyahPrompt: 'تفسیر اور معانی دیکھنے کے لیے آیت منتخب کریں۔',
    corpusFooterNote: 'آف لائن ڈیٹا: تنزیل قرآنی کارپس v1.0 • تلاوت: شیخ مشاری راشد العفاسی'
  }
};

export const LOCALIZED_PRAYER_UI: Record<Language, LocalizedPrayerPageUI> = {
  AZ: {
    pageTitle: 'Namaz Vaxtları — Astronomik Günəş Hesabı',
    pageSubtitle: 'Üfüqi günəş bucaqlarına əsaslanan dəqiq vaxtlar (adhan.js / QMİ & MWL)',
    notifyOn: 'Azan bildirişləri: AÇIQ',
    notifyOff: 'Azan bildirişləri: BAĞLI',
    nextBadge: 'NÖVBƏTİ',
    completedBadge: 'Başa çatıb',
    waitingBadge: 'Gözlənilir',
    countdownTitle: 'Geri Sayım Taymeri',
    untilPrayerLabel: 'Növbəti namaza qalan vaxt:',
    nextTimeLabel: 'Növbəti namaz vaxtı:',
    calcMethodLabel: 'Hesablama metodu:',
    cmbMethod: 'Qafqaz Müsəlmanları İdarəsi (QMİ)',
    mwlMethod: 'Dünya İslam Liqası (MWL)',
    qazaTitle: 'Qəza Namazları (Bərpa Qeydiyyatı)',
    qazaSubtitle: 'Fərdi uçot IndexedDB-də',
    qazaPrayers: {
      fajr: 'Sübh (2 rükət)',
      dhuhr: 'Zöhr (4 rükət)',
      asr: 'Əsr (4 rükət)',
      maghrib: 'Məğrib (3 rükət)',
      isha: 'İşa (4 rükət)'
    },
    qazaFooter: 'Buraxılmış vacib namazların qəzasını qılmaq möminin Yaradan qarşısındakı borcudur.'
  },
  RU: {
    pageTitle: 'Время намаза — Астрономический расчет',
    pageSubtitle: 'Точное солнечное время намаза (adhan.js / MWL & CMB)',
    notifyOn: 'Оповещения азана: ВКЛ',
    notifyOff: 'Оповещения азана: ВЫКЛ',
    nextBadge: 'СЛЕДУЮЩИЙ',
    completedBadge: 'Завершён',
    waitingBadge: 'Ожидается',
    countdownTitle: 'Таймер обратного отсчета',
    untilPrayerLabel: 'До наступления молитвы осталось:',
    nextTimeLabel: 'Время следующего намаза:',
    calcMethodLabel: 'Метод вычисления:',
    cmbMethod: 'Управление Мусульман Кавказа (CMB)',
    mwlMethod: 'Всемирная Мусульманская Лига (MWL)',
    qazaTitle: 'Каза-намаз (Учет возмещения)',
    qazaSubtitle: 'Персональный учет в IndexedDB',
    qazaPrayers: {
      fajr: 'Фаджр (2 ракаата)',
      dhuhr: 'Зухр (4 ракаата)',
      asr: 'Аср (4 ракаата)',
      maghrib: 'Магриб (3 ракаата)',
      isha: 'Иша (4 ракаата)'
    },
    qazaFooter: 'Возмещение пропущенных обязательных молитв (када) является долгом верующего перед Творцом.'
  },
  EN: {
    pageTitle: 'Prayer Times — Astronomical Solar Calculation',
    pageSubtitle: 'Precise solar timetable calculated via astronomical algorithms (adhan.js / MWL & CMB)',
    notifyOn: 'Adhan alerts: ON',
    notifyOff: 'Adhan alerts: OFF',
    nextBadge: 'NEXT',
    completedBadge: 'Completed',
    waitingBadge: 'Upcoming',
    countdownTitle: 'Countdown Timer',
    untilPrayerLabel: 'Time remaining until:',
    nextTimeLabel: 'Next prayer time:',
    calcMethodLabel: 'Calculation method:',
    cmbMethod: 'Caucasus Muslim Board (CMB)',
    mwlMethod: 'Muslim World League (MWL)',
    qazaTitle: 'Qaza Prayers (Missed Prayers Tracker)',
    qazaSubtitle: 'Personal log stored in IndexedDB',
    qazaPrayers: {
      fajr: 'Fajr (2 Rakats)',
      dhuhr: 'Dhuhr (4 Rakats)',
      asr: 'Asr (4 Rakats)',
      maghrib: 'Maghrib (3 Rakats)',
      isha: 'Isha (4 Rakats)'
    },
    qazaFooter: 'Making up missed obligatory prayers (qada) is a solemn spiritual duty before the Creator.'
  },
  TR: {
    pageTitle: 'Namaz Vakitleri — Astronomik Güneş Hesabı',
    pageSubtitle: 'Hassas güneş açılarına dayalı namaz vakitleri (adhan.js / Diyanet & MWL)',
    notifyOn: 'Ezan bildirimleri: AÇIK',
    notifyOff: 'Ezan bildirimleri: KAPALI',
    nextBadge: 'SONRAKİ',
    completedBadge: 'Tamamlandı',
    waitingBadge: 'Bekleniyor',
    countdownTitle: 'Geri Sayım Sayacı',
    untilPrayerLabel: 'Vaktin girmesine kalan süre:',
    nextTimeLabel: 'Sonraki namaz vakti:',
    calcMethodLabel: 'Hesaplama yöntemi:',
    cmbMethod: 'Kafkas Müslümanları İdaresi (CMB)',
    mwlMethod: 'Dünya İslam Birliği (MWL)',
    qazaTitle: 'Kaza Namazları Takibi',
    qazaSubtitle: 'IndexedDB ile kişisel takip',
    qazaPrayers: {
      fajr: 'Sabah (2 Rekat)',
      dhuhr: 'Öğle (4 Rekat)',
      asr: 'İkindi (4 Rekat)',
      maghrib: 'Akşam (3 Rekat)',
      isha: 'Yatsı (4 Rekat)'
    },
    qazaFooter: 'Kazaya kalan farz namazları kaza etmek müminin Yaratıcıya karşı borcudur.'
  },
  AR: {
    pageTitle: 'مواقيت الصلاة — الحساب الفلكي الشمسي',
    pageSubtitle: 'أوقات الصلاة الفلكية الدقيقة بالاعتماد على خوارزميات adhan.js',
    notifyOn: 'تنبيهات الأذان: مفعلة',
    notifyOff: 'تنبيهات الأذان: معطلة',
    nextBadge: 'التالي',
    completedBadge: 'مضت',
    waitingBadge: 'قادمة',
    countdownTitle: 'العد التنازلي للوقت',
    untilPrayerLabel: 'الوقت المتبقي حتى:',
    nextTimeLabel: 'وقت الصلاة القادمة:',
    calcMethodLabel: 'طريقة الحساب:',
    cmbMethod: 'إدارة مسلمي القوقاز (CMB)',
    mwlMethod: 'رابطة العالم الإسلامي (MWL)',
    qazaTitle: 'قضاء الفوائت (سجل الصلوات)',
    qazaSubtitle: 'سجل شخصي محفوظ محلياً',
    qazaPrayers: {
      fajr: 'الفجر (ركعتان)',
      dhuhr: 'الظهر (٤ ركعات)',
      asr: 'العصر (٤ ركعات)',
      maghrib: 'المغرب (٣ ركعات)',
      isha: 'العشاء (٤ ركعات)'
    },
    qazaFooter: 'قضاء الصلوات المفروضة الفائتة دين في ذمة العبد تجب المبادرة بأدائه.'
  },
  FA: {
    pageTitle: 'اوقات شرعی — محاسبه دقیق نجومی',
    pageSubtitle: 'اوقات شرعی دقیق بر مبنای زاویه خورشید (adhan.js)',
    notifyOn: 'هشدار اذان: فعال',
    notifyOff: 'هشدار اذان: غیرفعال',
    nextBadge: 'بعدی',
    completedBadge: 'گذشته',
    waitingBadge: 'در انتظار',
    countdownTitle: 'شمارش معکوس زمان',
    untilPrayerLabel: 'زمان باقی‌مانده تا:',
    nextTimeLabel: 'زمان نماز بعدی:',
    calcMethodLabel: 'روش محاسبه:',
    cmbMethod: 'اداره مسلمانان قفقاز (CMB)',
    mwlMethod: 'مجمع جهانی اسلامی (MWL)',
    qazaTitle: 'نمازهای قضا (ثبت ادای فریضه)',
    qazaSubtitle: 'ثبت شخصی در حافظه داخلی',
    qazaPrayers: {
      fajr: 'صبح (۲ رکعت)',
      dhuhr: 'ظهر (۴ رکعت)',
      asr: 'عصر (۴ رکعت)',
      maghrib: 'مغرب (۳ رکعت)',
      isha: 'عشاء (۴ رکعت)'
    },
    qazaFooter: 'قضای نمازهای واجب فوت شده فریضه‌ای بر عهده مؤمن در برابر پروردگار است.'
  },
  UR: {
    pageTitle: 'نماز کے اوقات — فلکیاتی شمسی حساب',
    pageSubtitle: 'درست ترین شمسی زاویوں کے مطابق نمازوں کے اوقات (adhan.js)',
    notifyOn: 'اذان کے نوٹیفکیشن: آن',
    notifyOff: 'اذان کے نوٹیفکیشن: آف',
    nextBadge: 'اگلی',
    completedBadge: 'گزر گئی',
    waitingBadge: 'آنے والی',
    countdownTitle: 'الٹی گنتی کا ٹائمر',
    untilPrayerLabel: 'نماز کے وقت میں باقی:',
    nextTimeLabel: 'اگلی نماز کا وقت:',
    calcMethodLabel: 'طریقہ کار:',
    cmbMethod: 'قفقاز مسلم بورڈ (CMB)',
    mwlMethod: 'رابطہ عالم اسلامی (MWL)',
    qazaTitle: 'قضا نمازوں کا ریکارڈ',
    qazaSubtitle: 'انفرادی ریکارڈ محفوظ',
    qazaPrayers: {
      fajr: 'فجر (۲ رکعت)',
      dhuhr: 'ظہر (۴ رکعت)',
      asr: 'عصر (۴ رکعت)',
      maghrib: 'مغرب (۳ رکعت)',
      isha: 'عشاء (۴ رکعت)'
    },
    qazaFooter: 'چھوٹی ہوئی فرض نمازوں کی قضا ادا کرنا بندے پر واجب ہے۔'
  }
};

export const LOCALIZED_QIBLA_UI: Record<Language, LocalizedQiblaPageUI> = {
  AZ: {
    pageSubtitle: 'Sferik triqonometriya və Müqəddəs Kəbəyə (Məkkə, Səudiyyə Ərəbistanı) doğru azimutal proyeksiyası',
    recalibrateBtn: 'GPS Yenilə / Kalibrasiya',
    calibratingBtn: 'Kalibrasiya edilir...',
    exactMatch: 'İSTİQAMƏT DƏQİQ ÜST-ÜSTƏ DÜŞÜR',
    deviation: 'MEYİL:',
    kaabaLabel: 'KƏBƏ',
    southWest: 'Cənub-Qərb',
    compassTestLabel: 'Kompas sınağı:',
    targetKaabaTitle: 'Hədəf İstiqamət: Kəbə (Məkkə)',
    bearingLabel: 'Azimut (Bearing)',
    orthodromicDistLabel: 'Böyük dairə məsafəsi',
    greatCircleDesc: 'Böyük dairə (orthodromic)',
    kaabaCoordsLabel: 'Kəbə koordinatları:',
    yourLocationLabel: 'Sizin məkanınız:',
    nodeNameLabel: 'Qovşaq adı:',
    mathFormulaTitle: 'Riyazi Düstur (WGS84)',
    mathFormulaDesc: 'Qiblə bucağının hesablanması sferik haversinus və ortodromik azimut düsturuna əsaslanır:',
    mathFormulaWhere: 'burada φ₁ — istifadəçinin enliyi, φ₂ — Məkkənin enliyi (21.4225°), Δλ — uzunluqlar fərqidir.'
  },
  RU: {
    pageSubtitle: 'Сферическая тригонометрия и азимутальная проекция на Священную Каабу (Мекка, Саудовская Аравия)',
    recalibrateBtn: 'Обновить GPS / Калибровка',
    calibratingBtn: 'Калибровка...',
    exactMatch: 'НАПРАВЛЕНИЕ ТОЧНО СОВПАДАЕТ',
    deviation: 'ОТКЛОНЕНИЕ:',
    kaabaLabel: 'КААБА',
    southWest: 'Юго-Запад',
    compassTestLabel: 'Тест компаса:',
    targetKaabaTitle: 'Целевой ориентир: Кааба (Мекка)',
    bearingLabel: 'Азимут (Bearing)',
    orthodromicDistLabel: 'Расстояние по дуге',
    greatCircleDesc: 'Большой круг (orthodromic)',
    kaabaCoordsLabel: 'Координаты Каабы:',
    yourLocationLabel: 'Ваша локация:',
    nodeNameLabel: 'Название узла:',
    mathFormulaTitle: 'Математическая формула (WGS84)',
    mathFormulaDesc: 'Вычисление угла Кыблы использует сферическую формулу гаверсинусов и прямого ортодромического азимута:',
    mathFormulaWhere: 'где φ₁ — широта локации пользователя, φ₂ — широта Мекки (21.4225°), Δλ — разница долгот.'
  },
  EN: {
    pageSubtitle: 'Spherical trigonometry and orthodromic bearing towards the Holy Kaaba (Makkah, Saudi Arabia)',
    recalibrateBtn: 'Refresh GPS / Calibrate',
    calibratingBtn: 'Calibrating...',
    exactMatch: 'ALIGNED PRECISELY WITH QIBLA',
    deviation: 'DEVIATION:',
    kaabaLabel: 'KAABA',
    southWest: 'South-West',
    compassTestLabel: 'Compass test:',
    targetKaabaTitle: 'Target Destination: Kaaba (Makkah)',
    bearingLabel: 'Bearing Azimuth',
    orthodromicDistLabel: 'Great Circle Distance',
    greatCircleDesc: 'Orthodromic geodesic arc',
    kaabaCoordsLabel: 'Kaaba coordinates:',
    yourLocationLabel: 'Your location:',
    nodeNameLabel: 'Node identity:',
    mathFormulaTitle: 'Mathematical Formula (WGS84)',
    mathFormulaDesc: 'Qibla bearing computation applies spherical trigonometry and forward orthodromic azimuth:',
    mathFormulaWhere: 'where φ₁ is user latitude, φ₂ is Kaaba latitude (21.4225°), and Δλ is longitude difference.'
  },
  TR: {
    pageSubtitle: 'Küresel trigonometri ve Kabe-i Muazzama\'ya (Mekke) yönelik azimut projeksiyonu',
    recalibrateBtn: 'GPS Yenile / Kalibre Et',
    calibratingBtn: 'Kalibre ediliyor...',
    exactMatch: 'KIBLE İLE TAM HİZALANDI',
    deviation: 'SAPMA:',
    kaabaLabel: 'KABE',
    southWest: 'Güneybatı',
    compassTestLabel: 'Pusula testi:',
    targetKaabaTitle: 'Hedef Yön: Kabe (Mekke)',
    bearingLabel: 'Azimut (Bearing)',
    orthodromicDistLabel: 'Büyük daire mesafesi',
    greatCircleDesc: 'Büyük daire (ortodromik)',
    kaabaCoordsLabel: 'Kabe koordinatları:',
    yourLocationLabel: 'Konumunuz:',
    nodeNameLabel: 'Düğüm adı:',
    mathFormulaTitle: 'Matematiksel Formül (WGS84)',
    mathFormulaDesc: 'Kıble açısının hesaplanması küresel trigonometri ve ortodromik formüle dayanır:',
    mathFormulaWhere: 'burada φ₁ kullanıcı enlemi, φ₂ Mekke enlemi (21.4225°), Δλ boylam farkıdır.'
  },
  AR: {
    pageSubtitle: 'حسابات المثلثات الكروية وتحديد اتجاه القبلة نحو الكعبة المشرفة بمكة المكرمة',
    recalibrateBtn: 'تحديث GPS / معايرة',
    calibratingBtn: 'جاري المعايرة...',
    exactMatch: 'الاتجاه متطابق بدقة مع القبلة',
    deviation: 'الانحراف:',
    kaabaLabel: 'الكعبة',
    southWest: 'جنوب غرب',
    compassTestLabel: 'اختبار البوصلة:',
    targetKaabaTitle: 'الوجهة المستهدفة: الكعبة المشرفة',
    bearingLabel: 'زاوية السمت (Bearing)',
    orthodromicDistLabel: 'المسافة عبر الدائرة العظمى',
    greatCircleDesc: 'المسار الدائري العظيم (الأرثودرومي)',
    kaabaCoordsLabel: 'إحداثيات الكعبة:',
    yourLocationLabel: 'موقعك الحالي:',
    nodeNameLabel: 'اسم العقدة:',
    mathFormulaTitle: 'المعادلة الرياضية (WGS84)',
    mathFormulaDesc: 'يعتمد تحديد زاوية القبلة على صيغة المثلثات الكروية وحساب زاوية السمت المباشرة:',
    mathFormulaWhere: 'حيث φ₁ خط عرض موقعك، φ₂ خط عرض مكة (21.4225°)، و Δλ فرق خطوط الطول.'
  },
  FA: {
    pageSubtitle: 'مثلثات کروی و محاسبه زاویه سمت قبله به سوی کعبه مشرفه در مکه مکرمه',
    recalibrateBtn: 'به‌روزرسانی موقعیت / کالیبراسیون',
    calibratingBtn: 'در حال کالیبراسیون...',
    exactMatch: 'جهت کاملاً منطبق بر قبله است',
    deviation: 'انحراف:',
    kaabaLabel: 'کعبه',
    southWest: 'جنوب غربی',
    compassTestLabel: 'تست قطب‌نما:',
    targetKaabaTitle: 'مقصد هدف: کعبه مشرفه',
    bearingLabel: 'زاویه سمت (Bearing)',
    orthodromicDistLabel: 'فاصله کمان دایره عظیمه',
    greatCircleDesc: 'مسیر دایره عظیمه (ارتودرومیک)',
    kaabaCoordsLabel: 'مختصات کعبه:',
    yourLocationLabel: 'موقعیت شما:',
    nodeNameLabel: 'نام گره:',
    mathFormulaTitle: 'فرمول ریاضی (WGS84)',
    mathFormulaDesc: 'محاسبه زاویه قبله با استفاده از روابط مثلثات کروی و آزیموت مستقیم صورت می‌پذیرد:',
    mathFormulaWhere: 'که در آن φ₁ عرض جغرافیایی کاربر، φ₂ عرض جغرافیایی مکه (21.4225°) و Δλ اختلاف طول است.'
  },
  UR: {
    pageSubtitle: 'کروی تکونیات اور مکہ مکرمہ میں خانہ کعبہ کی سمت کا درست فلکیاتی حساب',
    recalibrateBtn: 'تازہ ترین GPS / ایڈجسٹ کریں',
    calibratingBtn: 'درستگی جاری ہے...',
    exactMatch: 'قبلہ کا رخ بالکل درست ہے',
    deviation: 'انحراف:',
    kaabaLabel: 'کعبہ',
    southWest: 'جنوب مغرب',
    compassTestLabel: 'قطب نما ٹیسٹ:',
    targetKaabaTitle: 'مقصود سمت: خانہ کعبہ',
    bearingLabel: 'زاویہ سمت (Bearing)',
    orthodromicDistLabel: 'کروی فاصلہ',
    greatCircleDesc: 'بڑے دائرے کا فاصلہ',
    kaabaCoordsLabel: 'کعبہ کے نقاط:',
    yourLocationLabel: 'آپ کا مقام:',
    nodeNameLabel: 'نوڈ کا نام:',
    mathFormulaTitle: 'ریاضیاتی فارمولا (WGS84)',
    mathFormulaDesc: 'قبلہ کی سمت کا تعین کروی مثلثات اور براہ راست ازیموت کے فارمولے سے کیا جاتا ہے:',
    mathFormulaWhere: 'جہاں φ₁ صارف کا عرض بلد، φ₂ مکہ کا عرض بلد (21.4225°)، اور Δλ طول بلد کا فرق ہے۔'
  }
};

// ==========================================
// 4. GENERAL LABELS (LOGS, METRICS, ETC)
// ==========================================

export const LOCALIZED_METRICS_UI: Record<Language, { title: string; realtimeSync: string }> = {
  AZ: { title: 'Qlobal Metriklər', realtimeSync: 'CANLI SİNXRONİZASİYA' },
  RU: { title: 'Глобальные метрики', realtimeSync: 'REALTIME SYNC' },
  EN: { title: 'Global Metrics', realtimeSync: 'REALTIME SYNC' },
  TR: { title: 'Küresel Metrikler', realtimeSync: 'CANLI SENKRONİZASYON' },
  AR: { title: 'المؤشرات العالمية', realtimeSync: 'مزامنة مباشرة' },
  FA: { title: 'معیارهای جهانی', realtimeSync: 'همگام‌سازی زنده' },
  UR: { title: 'عالمی اشاریے', realtimeSync: 'براہ راست ہم آہنگی' }
};

export const LOCALIZED_LOGS_UI: Record<Language, { emptyLogs: string; placeholder: string; sendBtn: string }> = {
  AZ: {
    emptyLogs: 'Seçilmiş filtr üçün sistem girişləri yoxdur',
    placeholder: 'Niyyət və ya komanda daxil edin (/test-rule-42, /shura, /clear)...',
    sendBtn: 'Göndər'
  },
  RU: {
    emptyLogs: 'Логи для выбранного фильтра отсутствуют',
    placeholder: 'Введите намерение или команду (/test-rule-42, /shura, /clear)...',
    sendBtn: 'Отправить'
  },
  EN: {
    emptyLogs: 'No logs available for the selected filter',
    placeholder: 'Enter an intent or command (/test-rule-42, /shura, /clear)...',
    sendBtn: 'Send'
  },
  TR: {
    emptyLogs: 'Seçili filtre için kayıt bulunamadı',
    placeholder: 'Bir niyet veya komut girin (/test-rule-42, /shura, /clear)...',
    sendBtn: 'Gönder'
  },
  AR: {
    emptyLogs: 'لا توجد سجلات لهذا التصنيف',
    placeholder: 'أدخل نيتك أو أمراً (/test-rule-42, /shura, /clear)...',
    sendBtn: 'إرسال'
  },
  FA: {
    emptyLogs: 'گزارشی برای این فیلتر ثبت نشده است',
    placeholder: 'نیت یا دستور خود را وارد کنید (/test-rule-42, /shura, /clear)...',
    sendBtn: 'ارسال'
  },
  UR: {
    emptyLogs: 'منتخب فلٹر کے لیے لاگز موجود نہیں ہیں',
    placeholder: 'اپنا مقصد یا کمانڈ درج کریں (/test-rule-42, /shura, /clear)...',
    sendBtn: 'بھیجیں'
  }
};

export const LOCALIZED_CENTERPIECE_UI: Record<Language, { simActive: string; clickToLaunch: string }> = {
  AZ: {
    simActive: '8-ADDIMLI SİMULYASİYA AKTİVDİR...',
    clickToLaunch: 'Niyyət → Təsir dövrünü başlatmaq üçün klikləyin'
  },
  RU: {
    simActive: 'СИМУЛЯЦИЯ 8 ШАГОВ АКТИВНА...',
    clickToLaunch: 'Нажмите для запуска цикла Intent → Impact'
  },
  EN: {
    simActive: '8-STEP SIMULATION RUNNING...',
    clickToLaunch: 'Click to launch Intent → Impact loop'
  },
  TR: {
    simActive: '8 ADIMLI SİMÜLASYON AKTİF...',
    clickToLaunch: 'Niyet → Etki döngüsünü başlatmak için tıklayın'
  },
  AR: {
    simActive: 'محاكاة المراحل الثماني قيد التشغيل...',
    clickToLaunch: 'انقر لبدء دورة النية ← التأثير'
  },
  FA: {
    simActive: 'شبیه‌سازی ۸ مرحله‌ای در حال اجراست...',
    clickToLaunch: 'برای شروع چرخه نیت ← اثر کلیک کنید'
  },
  UR: {
    simActive: '۸ مرحلہ وار سمیولیشن جاری ہے...',
    clickToLaunch: 'نیت سے اثر کا چکر شروع کرنے کے لیے کلک کریں'
  }
};

// Accessor helpers
export function getLocalizedFoundations(lang: Language): IslamicTopic[] {
  return LOCALIZED_ISLAMIC_FOUNDATIONS[lang] || LOCALIZED_ISLAMIC_FOUNDATIONS.EN;
}

export function getLocalizedFaqs(lang: Language): { categories: { id: string; label: string }[]; faqs: IslamicFAQ[] } {
  return LOCALIZED_ISLAMIC_FAQS[lang] || LOCALIZED_ISLAMIC_FAQS.EN;
}

// ==========================================
// 5. PRAYER DISPLAY NAME RESOLVER (ALL 7 LOCALES)
// ==========================================

export function getPrayerDisplayName(name: string, lang: Language): string {
  const isFajr = name.includes('Фаджр') || name.includes('Fajr') || name.includes('فجر') || name.includes('Sübh');
  const isSunrise = name.includes('Восход') || name.includes('Sunrise') || name.includes('شروق') || name.includes('Günəş');
  const isDhuhr = name.includes('Зухр') || name.includes('Dhuhr') || name.includes('ظهر') || name.includes('Zöhr');
  const isAsr = name.includes('Аср') || name.includes('Asr') || name.includes('عصر') || name.includes('Əsr');
  const isMaghrib = name.includes('Магриб') || name.includes('Maghrib') || name.includes('مغرب') || name.includes('Məğrib');
  const isIsha = name.includes('Иша') || name.includes('Isha') || name.includes('عشاء') || name.includes('İşa');

  if (lang === 'AZ') {
    if (isFajr) return 'Sübh';
    if (isSunrise) return 'Günəş';
    if (isDhuhr) return 'Zöhr';
    if (isAsr) return 'Əsr';
    if (isMaghrib) return 'Məğrib';
    if (isIsha) return 'İşa';
  } else if (lang === 'RU') {
    if (isFajr) return 'Фаджр';
    if (isSunrise) return 'Восход';
    if (isDhuhr) return 'Зухр';
    if (isAsr) return 'Аср';
    if (isMaghrib) return 'Магриб';
    if (isIsha) return 'Иша';
  } else if (lang === 'TR') {
    if (isFajr) return 'İmsak';
    if (isSunrise) return 'Güneş';
    if (isDhuhr) return 'Öğle';
    if (isAsr) return 'İkindi';
    if (isMaghrib) return 'Akşam';
    if (isIsha) return 'Yatsı';
  } else if (lang === 'AR') {
    if (isFajr) return 'الفجر';
    if (isSunrise) return 'الشروق';
    if (isDhuhr) return 'الظهر';
    if (isAsr) return 'العصر';
    if (isMaghrib) return 'المغرب';
    if (isIsha) return 'العشاء';
  } else if (lang === 'FA') {
    if (isFajr) return 'صبح';
    if (isSunrise) return 'طلوع';
    if (isDhuhr) return 'ظهر';
    if (isAsr) return 'عصر';
    if (isMaghrib) return 'مغرب';
    if (isIsha) return 'عشاء';
  } else if (lang === 'UR') {
    if (isFajr) return 'فجر';
    if (isSunrise) return 'طلوع';
    if (isDhuhr) return 'ظہر';
    if (isAsr) return 'عصر';
    if (isMaghrib) return 'مغرب';
    if (isIsha) return 'عشاء';
  }
  if (isFajr) return 'Fajr';
  if (isSunrise) return 'Sunrise';
  if (isDhuhr) return 'Dhuhr';
  if (isAsr) return 'Asr';
  if (isMaghrib) return 'Maghrib';
  if (isIsha) return 'Isha';
  return name;
}

// ==========================================
// 7. PRAYER WIDGET & MODAL
// ==========================================

export interface LocalizedPrayerWidgetUI {
  title: string;
  nextPrayer: string;
  fullSchedule: string;
  notifyOn: string;
  notifyOff: string;
  notifyTooltip: string;
  modalTitle: string;
  modalDesc: string;
  latLabel: string;
  lngLabel: string;
  closeBtn: string;
  notifLogOn: string;
  notifLogOff: string;
}

export const LOCALIZED_PRAYER_WIDGET_UI: Record<Language, LocalizedPrayerWidgetUI> = {
  AZ: {
    title: 'NAMAZ VAXTLARI',
    nextPrayer: 'Növbəti namaz',
    fullSchedule: 'Tam Cədvəl',
    notifyOn: 'Aktiv',
    notifyOff: 'Bildirişlər',
    notifyTooltip: 'Azan audio və bildirişlərini idarə edin',
    modalTitle: 'Namaz vaxtları cədvəli',
    modalDesc: 'Hesablama sferik astronomiya alqoritmi (MWL / CMB metodikası) əsasında aparılmışdır.',
    latLabel: 'Enlik (Lat):',
    lngLabel: 'Uzunluq (Lng):',
    closeBtn: 'Bağla',
    notifLogOn: 'Namaz bildirişləri aktivləşdirildi: səsli azan və xəbərdarlıqlar',
    notifLogOff: 'Namaz bildirişləri söndürüldü'
  },
  RU: {
    title: 'РАСПИСАНИЕ НАМАЗА',
    nextPrayer: 'Следующий намаз',
    fullSchedule: 'Полное расписание',
    notifyOn: 'Вкл',
    notifyOff: 'Уведомления',
    notifyTooltip: 'Включить / выключить уведомления об азане',
    modalTitle: 'Расписание намаза',
    modalDesc: 'Расчёт выполнен с использованием алгоритма сферической астрономии (методика Всемирной Мусульманской Лиги, угол Фаджра 18°, угол Иша 17°).',
    latLabel: 'Широта (Lat):',
    lngLabel: 'Долгота (Lng):',
    closeBtn: 'Закрыть',
    notifLogOn: 'Уведомления о намазе активированы: аудио-азан и всплывающие окна',
    notifLogOff: 'Уведомления о намазе отключены'
  },
  EN: {
    title: 'PRAYER TIMETABLE',
    nextPrayer: 'Next Prayer',
    fullSchedule: 'Full Timetable',
    notifyOn: 'On',
    notifyOff: 'Alerts',
    notifyTooltip: 'Toggle audio and visual Adhan notifications',
    modalTitle: 'Prayer Timetable Schedule',
    modalDesc: 'Calculation is performed using spherical astronomy algorithm (Muslim World League method, Fajr 18°, Isha 17°).',
    latLabel: 'Latitude (Lat):',
    lngLabel: 'Longitude (Lng):',
    closeBtn: 'Close',
    notifLogOn: 'Prayer notifications enabled: audio Adhan and alert badges',
    notifLogOff: 'Prayer notifications disabled'
  },
  TR: {
    title: 'NAMAZ VAKİTLERİ',
    nextPrayer: 'Sonraki Namaz',
    fullSchedule: 'Tam Çizelge',
    notifyOn: 'Açık',
    notifyOff: 'Bildirimler',
    notifyTooltip: 'Ezan bildirimlerini aç / kapat',
    modalTitle: 'Namaz Vakitleri Çizelgesi',
    modalDesc: 'Hesaplama küresel astronomi algoritması (Dünya İslam Birliği MWL metodolojisi) kullanılarak yapılmıştır.',
    latLabel: 'Enlem (Lat):',
    lngLabel: 'Boylam (Lng):',
    closeBtn: 'Kapat',
    notifLogOn: 'Ezan bildirimleri açıldı: sesli ezan ve uyarılar',
    notifLogOff: 'Ezan bildirimleri kapatıldı'
  },
  AR: {
    title: 'مواقيت الصلاة',
    nextPrayer: 'الصلاة القادمة',
    fullSchedule: 'الجدول الكامل',
    notifyOn: 'مفعل',
    notifyOff: 'الإشعارات',
    notifyTooltip: 'تفعيل أو إيقاف تنبيهات الأذان',
    modalTitle: 'جدول مواقيت الصلاة الفلكي',
    modalDesc: 'يتم الحساب باستخدام خوارزمية علم الفلك الكروي (منهجية رابطة العالم الإسلامي، زاوية الفجر 18° والعشاء 17°).',
    latLabel: 'خط العرض (Lat):',
    lngLabel: 'خط الطول (Lng):',
    closeBtn: 'إغلاق',
    notifLogOn: 'تم تفعيل تنبيهات الصلاة والأذان الصوتي',
    notifLogOff: 'تم إيقاف تنبيهات الصلاة'
  },
  FA: {
    title: 'اوقات شرعی نماز',
    nextPrayer: 'نماز بعدی',
    fullSchedule: 'جدول کامل',
    notifyOn: 'فعال',
    notifyOff: 'اعلان‌ها',
    notifyTooltip: 'روشن یا خاموش کردن اعلان‌های اذان',
    modalTitle: 'جدول اوقات شرعی و نجومی',
    modalDesc: 'محاسبات بر اساس الگوریتم مثلثات کروی و نجومی با دقت مختصات محلی انجام می‌شود.',
    latLabel: 'عرض جغرافیایی:',
    lngLabel: 'طول جغرافیایی:',
    closeBtn: 'بستن',
    notifLogOn: 'اعلان‌های نماز و اذان صوتی فعال شد',
    notifLogOff: 'اعلان‌های نماز غیرفعال شد'
  },
  UR: {
    title: 'اوقات نماز',
    nextPrayer: 'اگلی نماز',
    fullSchedule: 'مکمل شیڈول',
    notifyOn: 'فعال',
    notifyOff: 'اطلاعات',
    notifyTooltip: 'اذان کے اعلانات آن / آف کریں',
    modalTitle: 'نماز کے اوقات کا مکمل شیڈول',
    modalDesc: 'یہ حساب کروی فلکیات کے مسلم ورلڈ لیگ فارمولے کے تحت خودکار طریقے سے تیار کیا گیا ہے۔',
    latLabel: 'عرض بلد:',
    lngLabel: 'طول بلد:',
    closeBtn: 'بند کریں',
    notifLogOn: 'نماز کے اعلانات اور اذان فعال ہو گئی',
    notifLogOff: 'نماز کے اعلانات غیر فعال کر دیے گئے'
  }
};

// ==========================================
// 8. SIDEBAR UI
// ==========================================

export const LOCALIZED_SIDEBAR_UI: Record<Language, { drAuditSub: string; childSafeActive: string }> = {
  AZ: { drAuditSub: 'Kanon & Prob', childSafeActive: 'Uşaq Təhlükəsizlik Rejimi Aktivdir' },
  RU: { drAuditSub: 'Канонизация & Probe', childSafeActive: 'Защита ребенка активна' },
  EN: { drAuditSub: 'Canon & Probe', childSafeActive: 'Child Safe Protection Active' },
  TR: { drAuditSub: 'Kanon & Prob', childSafeActive: 'Çocuk Güvenlik Koruması Aktif' },
  AR: { drAuditSub: 'التحقيق الكنسي والتدقيق', childSafeActive: 'وضع حماية الطفل نشط' },
  FA: { drAuditSub: 'کانونی‌سازی و آزمون', childSafeActive: 'حالت حفاظت از کودک فعال است' },
  UR: { drAuditSub: 'قانون سازی اور پروب', childSafeActive: 'بچوں کا تحفظ فعال ہے' }
};

// ==========================================
// 9. KAABA CENTERPIECE PILLARS
// ==========================================

export const LOCALIZED_CENTERPIECE_PILLARS: Record<Language, Record<string, string>> = {
  AZ: {
    FAITH: 'İMAN',
    KNOWLEDGE: 'BİLİK',
    PEOPLE: 'İNSANLAR',
    TECHNOLOGY: 'TEXNOLOGİYA',
    EARTH: 'YER KÜRƏSİ',
    HARMONY: 'HARMONİYA'
  },
  RU: {
    FAITH: 'ВЕРА',
    KNOWLEDGE: 'ЗНАНИЕ',
    PEOPLE: 'ЛЮДИ',
    TECHNOLOGY: 'ТЕХНОЛОГИИ',
    EARTH: 'ЗЕМЛЯ',
    HARMONY: 'ГАРМОНИЯ'
  },
  EN: {
    FAITH: 'FAITH',
    KNOWLEDGE: 'KNOWLEDGE',
    PEOPLE: 'PEOPLE',
    TECHNOLOGY: 'TECHNOLOGY',
    EARTH: 'EARTH',
    HARMONY: 'HARMONY'
  },
  TR: {
    FAITH: 'İNANÇ',
    KNOWLEDGE: 'BİLGİ',
    PEOPLE: 'İNSANLAR',
    TECHNOLOGY: 'TEKNOLOJİ',
    EARTH: 'DÜNYA',
    HARMONY: 'UYUM'
  },
  AR: {
    FAITH: 'الإيمان',
    KNOWLEDGE: 'المعرفة',
    PEOPLE: 'الناس',
    TECHNOLOGY: 'التقنية',
    EARTH: 'الأرض',
    HARMONY: 'التناغم'
  },
  FA: {
    FAITH: 'ایمان',
    KNOWLEDGE: 'دانش',
    PEOPLE: 'مردم',
    TECHNOLOGY: 'فناوری',
    EARTH: 'زمین',
    HARMONY: 'هماهنگی'
  },
  UR: {
    FAITH: 'ایمان',
    KNOWLEDGE: 'علم',
    PEOPLE: 'انسان',
    TECHNOLOGY: 'ٹیکنالوجی',
    EARTH: 'زمین',
    HARMONY: 'ہم آہنگی'
  }
};

// ==========================================
// 10. SETTINGS PAGE UI
// ==========================================

export interface LocalizedSettingsPageUI {
  headerTitle: string;
  headerSubtitle: string;
  tabs: {
    profile: string;
    privacy: string;
    localization: string;
    appearance: string;
    notifications: string;
    security: string;
    data: string;
  };
  profile: {
    title: string;
    personaLabel: string;
    taglineLabel: string;
    avatarLabel: string;
    didLabel: string;
    roleLabel: string;
    clusterLabel: string;
    saveBtn: string;
    savedNotice: string;
    canonTitle: string;
    canonDesc: string;
    bullet1: string;
    bullet2: string;
    bullet3: string;
  };
  privacy: {
    title: string;
    graphTitle: string;
    graphDesc: string;
    noticeUpdated: string;
  };
  localization: {
    title: string;
    activeLabel: string;
    desc: string;
    changedNotice: string;
  };
  appearance: {
    title: string;
    themesLabel: string;
    fontScaleLabel: string;
    highContrast: string;
    animations: string;
  };
  notifications: {
    title: string;
  };
  security: {
    title: string;
    desc: string;
    rolesTitle: string;
    roleUpdatedNotice: string;
  };
  data: {
    title: string;
    desc: string;
    clearCacheBtn: string;
    clearCacheConfirm: string;
    cacheClearedNotice: string;
  };
}

export const LOCALIZED_SETTINGS_UI: Record<Language, LocalizedSettingsPageUI> = {
  AZ: {
    headerTitle: 'Sistem Parametrləri və Fərdi Profil',
    headerSubtitle: '7 qlobal dil (EN, RU, AZ, TR, AR, FA, UR), Məxfilik Qrafı, 9 Səlahiyyət Rolu və yaddaş konfiqurasiyası',
    tabs: {
      profile: 'Profil & DID',
      privacy: 'Məxfilik Qrafı (10)',
      localization: 'Dillər & Əlifbalar (7)',
      appearance: 'Dizayn & İnterfeys',
      notifications: 'Bildirişlər',
      security: 'Hüquq Matrisi (9 Rol)',
      data: 'Məlumat & Sensorlar'
    },
    profile: {
      title: 'Şəxsiyyət və Mərkəzsizləşdirilmiş ID (DID)',
      personaLabel: 'Görünən ad (Persona)',
      taglineLabel: 'Şüar / Missiya (Tagline)',
      avatarLabel: 'Avatar URL',
      didLabel: 'Kriptoqrafik DID:',
      roleLabel: 'Cari sistem rolu:',
      clusterLabel: 'Xəzər klasteri:',
      saveBtn: 'Fərdi profili yadda saxla',
      savedNotice: 'Profil uğurla yadda saxlanıldı!',
      canonTitle: 'Section 03 Kanonik Prinsipi',
      canonDesc: '«Identity ≠ Authority. Profile ≠ Identity. Wallet ≠ Identity. Social Reputation ≠ Financial Creditworthiness ≠ Governance Authority.»',
      bullet1: '• DID insanı autentifikasiya edir.',
      bullet2: '• Rol səlahiyyət sahəsini (Authority Scope) təmin edir.',
      bullet3: '• Sübutlar (Evidence) əməliyyatları təsdiqləyir.'
    },
    privacy: {
      title: 'M10 Məxfilik Qrafı — Məlumatlara Giriş Hədləri',
      graphTitle: 'Məxfilik Qrafı (Master Model 002 - Section 10)',
      graphDesc: 'Məxfilik səviyyəsi pul kisəsindən və reputasiyadan asılı deyildir.',
      noticeUpdated: 'Məxfilik parametri yeniləndi'
    },
    localization: {
      title: '04 Çoxdilli Sistem — 7 Qanuni Dil və Əlifba',
      activeLabel: 'Aktiv Dil:',
      desc: 'Hər bir dil təbəqəsi əlifbanı, yazı istiqamətini (LTR/RTL), rəqəm formatını və namaz hesablamasını tənzimləyir.',
      changedNotice: 'Sistem dili uğurla dəyişdirildi'
    },
    appearance: {
      title: 'Görünüş və İnterfeys Mövzuları',
      themesLabel: 'Mövzular',
      fontScaleLabel: 'Şrift miqyası',
      highContrast: 'Yüksək kontrast',
      animations: 'Vizual animasiyalar'
    },
    notifications: {
      title: 'Bildiriş Kanalları və Hadisələr'
    },
    security: {
      title: '9 Sistem Rolu və Səlahiyyətlər Matrisi (M03 / M10)',
      desc: 'Hər bir rolun səlahiyyətləri yalnız təsdiq olunmuş sübutlarla məhdudlaşır.',
      rolesTitle: 'Rollar siyahısı',
      roleUpdatedNotice: 'Rol uğurla yeniləndi:'
    },
    data: {
      title: 'M07 IndexedDB Yaddaşı və Sensorlar',
      desc: 'Bütün tranzaksiyalar və sübutlar cihazınızda IndexedDB daxilində saxlanılır.',
      clearCacheBtn: 'M07 Keşini Təmizlə',
      clearCacheConfirm: 'IndexedDB müvəqqəti keşi təmizlənsin? Rol və dil saxlanılacaq.',
      cacheClearedNotice: 'Lokal keş uğurla təmizləndi'
    }
  },
  RU: {
    headerTitle: 'Настройки системы и Персональный Контур',
    headerSubtitle: 'Конфигурация 7 мировых локализаций (EN, RU, AZ, TR, AR, FA, UR), Privacy Graph, Матрицы 9 Ролей и локальной памяти',
    tabs: {
      profile: 'Профиль и DID',
      privacy: 'Privacy Graph (10)',
      localization: 'Языки и Скрипты (7)',
      appearance: 'Оформление & UI',
      notifications: 'Уведомления',
      security: 'Матрица прав (9 Ролей)',
      data: 'Данные и Сенсоры'
    },
    profile: {
      title: 'Идентичность и Децентрализованный ID (DID)',
      personaLabel: 'Отображаемое имя (Persona)',
      taglineLabel: 'Слоган / Миссия (Tagline)',
      avatarLabel: 'URL Аватара',
      didLabel: 'Криптографический DID:',
      roleLabel: 'Текущая системная роль:',
      clusterLabel: 'Каспийский кластер:',
      saveBtn: 'Сохранить персональный профиль',
      savedNotice: 'Профиль успешно сохранен!',
      canonTitle: 'Канонический принцип Section 03',
      canonDesc: '«Identity ≠ Authority. Profile ≠ Identity. Wallet ≠ Identity. Social Reputation ≠ Financial Creditworthiness ≠ Governance Authority.»',
      bullet1: '• DID аутентифицирует человека.',
      bullet2: '• Роль предоставляет область полномочий (Authority Scope).',
      bullet3: '• Доказательства (Evidence) подтверждают действия.'
    },
    privacy: {
      title: 'M10 Privacy Graph — Контуры доступа данных',
      graphTitle: 'Граф приватности (Master Model 002 - Section 10)',
      graphDesc: 'Privacy scope полностью независим от объекта кошелька и репутации.',
      noticeUpdated: 'Настройка приватности обновлена'
    },
    localization: {
      title: '04 Мультиязычная ткань — 7 Канонических Языков и Скриптов',
      activeLabel: 'Активный:',
      desc: 'Каждый языковой слой настраивает скрипт, направление письма (LTR/RTL), формат чисел и расчет молитв.',
      changedNotice: 'Язык успешно изменен'
    },
    appearance: {
      title: 'Оформление и темы интерфейса',
      themesLabel: 'Темы',
      fontScaleLabel: 'Масштаб шрифта',
      highContrast: 'Высокий контраст',
      animations: 'Анимации интерфейса'
    },
    notifications: {
      title: 'Каналы уведомлений и события'
    },
    security: {
      title: 'Матрица 9 системных ролей и полномочий (M03 / M10)',
      desc: 'Полномочия роли определяются мандатом и проверяются через Shura Rule #42.',
      rolesTitle: 'Системные роли',
      roleUpdatedNotice: 'Роль успешно обновлена:'
    },
    data: {
      title: 'Локальное хранилище IndexedDB и Сенсоры (M07)',
      desc: 'Все транзакции и доказательства сохраняются локально в защищенном контуре.',
      clearCacheBtn: 'Очистить кэш M07',
      clearCacheConfirm: 'Очистить временный кэш IndexedDB? Настройки роли и языка сохранятся.',
      cacheClearedNotice: 'Локальный кэш успешно очищен'
    }
  },
  EN: {
    headerTitle: 'System Settings & Personal Sovereign Plane',
    headerSubtitle: 'Configuration for 7 Global Locales (EN, RU, AZ, TR, AR, FA, UR), Privacy Graph, 9 Authority Roles and Memory',
    tabs: {
      profile: 'Profile & DID',
      privacy: 'Privacy Graph (10)',
      localization: 'Languages & Scripts (7)',
      appearance: 'Appearance & UI',
      notifications: 'Notifications',
      security: 'Authority Matrix (9 Roles)',
      data: 'Data & Sensors'
    },
    profile: {
      title: 'Identity & Decentralized Identifier (DID)',
      personaLabel: 'Display Name (Persona)',
      taglineLabel: 'Tagline / Mission',
      avatarLabel: 'Avatar Image URL',
      didLabel: 'Cryptographic DID:',
      roleLabel: 'Current System Role:',
      clusterLabel: 'Caspian Cluster:',
      saveBtn: 'Save Personal Profile',
      savedNotice: 'Profile saved successfully!',
      canonTitle: 'Canonical Principle Section 03',
      canonDesc: '“Identity ≠ Authority. Profile ≠ Identity. Wallet ≠ Identity. Social Reputation ≠ Financial Creditworthiness ≠ Governance Authority.”',
      bullet1: '• DID authenticates the human.',
      bullet2: '• Role confers the Authority Scope.',
      bullet3: '• Evidence proves runtime actions.'
    },
    privacy: {
      title: 'M10 Privacy Graph — Scopes & Data Boundaries',
      graphTitle: 'Privacy Graph (Master Model 002 - Section 10)',
      graphDesc: 'Privacy scope is completely independent of the wallet object and reputation.',
      noticeUpdated: 'Privacy setting updated'
    },
    localization: {
      title: '04 Multilingual Fabric — 7 Canonical Languages & Scripts',
      activeLabel: 'Active Locale:',
      desc: 'Each language layer configures script direction (LTR/RTL), number formatting, and prayer calculation astronomy.',
      changedNotice: 'Language changed successfully'
    },
    appearance: {
      title: 'Interface Themes & Visual Preferences',
      themesLabel: 'Themes',
      fontScaleLabel: 'Font Scale',
      highContrast: 'High Contrast Mode',
      animations: 'UI Transitions & Glows'
    },
    notifications: {
      title: 'Notification Channels & System Events'
    },
    security: {
      title: 'Matrix of 9 System Roles & Authority (M03 / M10)',
      desc: 'Role capabilities are scoped and cryptographically verified under Shura Rule #42.',
      rolesTitle: 'System Roles',
      roleUpdatedNotice: 'Role updated successfully:'
    },
    data: {
      title: 'M07 IndexedDB Local Storage & Sensors',
      desc: 'All ledger logs and evidence records are preserved securely inside local IndexedDB.',
      clearCacheBtn: 'Clear M07 Local Cache',
      clearCacheConfirm: 'Clear temporary IndexedDB cache? Role and language settings will be preserved.',
      cacheClearedNotice: 'Local cache cleared successfully'
    }
  },
  TR: {
    headerTitle: 'Sistem Ayarları ve Kişisel Egemen Düzlem',
    headerSubtitle: '7 Küresel Yerel Ayar (EN, RU, AZ, TR, AR, FA, UR), Gizlilik Grafiği, 9 Yetki Rolü ve Yerel Bellek Yapılandırması',
    tabs: {
      profile: 'Profil & DID',
      privacy: 'Gizlilik Grafiği (10)',
      localization: 'Diller & Alfabeler (7)',
      appearance: 'Görünüm & Arayüz',
      notifications: 'Bildirimler',
      security: 'Yetki Matrisi (9 Rol)',
      data: 'Veri & Sensörler'
    },
    profile: {
      title: 'Kimlik ve Merkeziyetsiz Tanımlayıcı (DID)',
      personaLabel: 'Görünen Ad (Persona)',
      taglineLabel: 'Slogan / Misyon',
      avatarLabel: 'Avatar URL',
      didLabel: 'Kriptografik DID:',
      roleLabel: 'Mevcut Sistem Rolü:',
      clusterLabel: 'Hazar Kümesi:',
      saveBtn: 'Kişisel Profili Kaydet',
      savedNotice: 'Profil başarıyla kaydedildi!',
      canonTitle: 'Section 03 Kanonik İlkesi',
      canonDesc: '«Identity ≠ Authority. Profile ≠ Identity. Wallet ≠ Identity. Social Reputation ≠ Financial Creditworthiness ≠ Governance Authority.»',
      bullet1: '• DID insanı doğrular.',
      bullet2: '• Rol yetki kapsamını sağlar.',
      bullet3: '• Kanıtlar eylemleri onaylar.'
    },
    privacy: {
      title: 'M10 Gizlilik Grafiği — Veri Erişim Sınırları',
      graphTitle: 'Gizlilik Grafiği (Master Model 002 - Section 10)',
      graphDesc: 'Gizlilik kapsamı cüzdan nesnesinden ve itibardan tamamen bağımsızdır.',
      noticeUpdated: 'Gizlilik ayarı güncellendi'
    },
    localization: {
      title: '04 Çok Dilli Kumaş — 7 Kanonik Dil ve Alfabe',
      activeLabel: 'Aktif Dil:',
      desc: 'Her dil katmanı yazım yönünü (LTR/RTL), sayı biçimlendirmesini ve namaz hesaplama kurallarını ayarlar.',
      changedNotice: 'Dil başarıyla değiştirildi'
    },
    appearance: {
      title: 'Arayüz Temaları ve Görsel Tercihler',
      themesLabel: 'Temalar',
      fontScaleLabel: 'Yazı Tipi Boyutu',
      highContrast: 'Yüksek Kontrast',
      animations: 'Arayüz Animasyonları'
    },
    notifications: {
      title: 'Bildirim Kanalları ve Olaylar'
    },
    security: {
      title: '9 Sistem Rolü ve Yetkiler Matrisi (M03 / M10)',
      desc: 'Rol yetkileri kapsamlıdır ve Shura Kuralı #42 altında denetlenir.',
      rolesTitle: 'Sistem Rolleri',
      roleUpdatedNotice: 'Rol başarıyla güncellendi:'
    },
    data: {
      title: 'M07 IndexedDB Yerel Depolama ve Sensörler',
      desc: 'Tüm işlemler ve kanıtlar yerel olarak IndexedDB içinde korunur.',
      clearCacheBtn: 'M07 Önbelleğini Temizle',
      clearCacheConfirm: 'Geçici IndexedDB önbelleği temizlensin mi? Rol ve dil ayarları korunacaktır.',
      cacheClearedNotice: 'Yerel önbellek başarıyla temizlendi'
    }
  },
  AR: {
    headerTitle: 'إعدادات النظام والمستوى السيادي الشخصي',
    headerSubtitle: 'تهيئة 7 لغات عالمية (EN, RU, AZ, TR, AR, FA, UR)، ومخطط الخصوصية، ومصفوفة 9 أدوار للسلطة',
    tabs: {
      profile: 'الملف التعريفي & DID',
      privacy: 'مخطط الخصوصية (10)',
      localization: 'اللغات والخطوط (7)',
      appearance: 'المظهر والواجهة',
      notifications: 'الإشعارات',
      security: 'مصفوفة الصلاحيات (9 أدوار)',
      data: 'البيانات والمستشعرات'
    },
    profile: {
      title: 'الهوية والمعرف اللامركزي (DID)',
      personaLabel: 'الاسم الظاهر (Persona)',
      taglineLabel: 'الشعار / المهمة',
      avatarLabel: 'رابط الصورة الشخصية',
      didLabel: 'معرف DID التشفيري:',
      roleLabel: 'الدور الحالي في النظام:',
      clusterLabel: 'كتلة قزوين:',
      saveBtn: 'حفظ الملف التعريفي',
      savedNotice: 'تم حفظ الملف بنجاح!',
      canonTitle: 'المبدأ القانوني Section 03',
      canonDesc: '«الهوية ليست السلطة، والملف ليس الهوية، والمحفظة ليست الهوية، والسمعة الاجتماعية ليست الجدارة المالية ولا سلطة الحوكمة.»',
      bullet1: '• معرف DID يوثق هوية الإنسان.',
      bullet2: '• الدور يمنح نطاق الصلاحيات والمسؤولية.',
      bullet3: '• الأدلة تؤكد شرعية التنفيذ.'
    },
    privacy: {
      title: 'M10 مخطط الخصوصية — نطاقات الوصول للبيانات',
      graphTitle: 'مخطط الخصوصية (النموذج الرئيسي 002)',
      graphDesc: 'نطاق الخصوصية مستقل تماماً عن المحفظة والسمعة.',
      noticeUpdated: 'تم تحديث إعداد الخصوصية'
    },
    localization: {
      title: '04 النسيج اللغوي — 7 لغات ونصوص معتمدة',
      activeLabel: 'اللغة النشطة:',
      desc: 'تحدد كل طبقة لغوية اتجاه الخط (LTR/RTL) وتنسيق الأرقام وحساب المواقيت.',
      changedNotice: 'تم تغيير اللغة بنجاح'
    },
    appearance: {
      title: 'سمات الواجهة والخيارات المرئية',
      themesLabel: 'السمات',
      fontScaleLabel: 'حجم الخط',
      highContrast: 'تباين عالي',
      animations: 'المؤثرات الحركية'
    },
    notifications: {
      title: 'قنوات الإشعارات والأحداث'
    },
    security: {
      title: 'مصفوفة الأدوار التسعة والصلاحيات (M03 / M10)',
      desc: 'تخضع صلاحيات الأدوار لقاعدة الشورى رقم 42.',
      rolesTitle: 'أدوار النظام',
      roleUpdatedNotice: 'تم تحديث الدور بنجاح:'
    },
    data: {
      title: 'مخزن IndexedDB المحلي والمستشعرات (M07)',
      desc: 'يتم حفظ السجلات والأدلة محلياً في IndexedDB بطريقة آمنة.',
      clearCacheBtn: 'مسح ذاكرة M07 المؤقتة',
      clearCacheConfirm: 'هل تريد مسح ذاكرة IndexedDB؟ سيتم الاحتفاظ بالدور واللغة.',
      cacheClearedNotice: 'تم مسح الذاكرة المؤقتة بنجاح'
    }
  },
  FA: {
    headerTitle: 'تنظیمات سیستم و مدار حاکمیت شخصی',
    headerSubtitle: 'پیکربندی ۷ زبان جهانی، گراف حریم خصوصی، ماتریس ۹ نقش و حافظه محلی',
    tabs: {
      profile: 'پروفایل و DID',
      privacy: 'گراف حریم خصوصی (10)',
      localization: 'زبان‌ها و خطوط (7)',
      appearance: 'ظاهر و پوسته',
      notifications: 'اعلان‌ها',
      security: 'ماتریس اختیارات (9 نقش)',
      data: 'داده‌ها و حسگرها'
    },
    profile: {
      title: 'هویت و شناسه غیرمتمرکز (DID)',
      personaLabel: 'نام نمایشی (Persona)',
      taglineLabel: 'شعار / مأموریت',
      avatarLabel: 'آدرس آواتار',
      didLabel: 'شناسه رمزنگاری DID:',
      roleLabel: 'نقش فعلی در سیستم:',
      clusterLabel: 'خوشه کاسپین:',
      saveBtn: 'ذخیره پروفایل شخصی',
      savedNotice: 'پروفایل با موفقیت ذخیره شد!',
      canonTitle: 'اصل کانونی Section 03',
      canonDesc: '«هویت قدرت نیست، پروفایل هویت نیست، کیف پول هویت نیست، شهرت اجتماعی اعتبار مالی یا قدرت حاکمیت نیست.»',
      bullet1: '• شناسه DID هویت انسان را تأیید می‌کند.',
      bullet2: '• نقش دامنه اختیارات را فراهم می‌سازد.',
      bullet3: '• شواهد اقدامات اجرایی را اثبات می‌کنند.'
    },
    privacy: {
      title: 'گراف حریم خصوصی M10 — مرزهای دسترسی داده',
      graphTitle: 'گراف حریم خصوصی (مدل اصلی 002)',
      graphDesc: 'دامنه حریم خصوصی مستقل از کیف پول و شهرت است.',
      noticeUpdated: 'تنظیم حریم خصوصی به‌روزرسانی شد'
    },
    localization: {
      title: '04 بافت چندزبانه — ۷ زبان و خط استاندارد',
      activeLabel: 'زبان فعال:',
      desc: 'هر لایه زبانی جهت متن (LTR/RTL)، فرمت اعداد و محاسبات شرعی را تنظیم می‌کند.',
      changedNotice: 'زبان با موفقیت تغییر یافت'
    },
    appearance: {
      title: 'پوسته‌های رابط کاربری و تنظیمات ظاهری',
      themesLabel: 'پوسته‌ها',
      fontScaleLabel: 'مقیاس قلم',
      highContrast: 'کنتراست بالا',
      animations: 'پویانمایی‌ها'
    },
    notifications: {
      title: 'کانال‌های اعلان و رویدادها'
    },
    security: {
      title: 'ماتریس ۹ نقش سیستمی و اختیارات (M03 / M10)',
      desc: 'اختیارات نقش‌ها بر اساس قاعده شماره ۴۲ شورا بررسی می‌شود.',
      rolesTitle: 'نقش‌های سیستم',
      roleUpdatedNotice: 'نقش با موفقیت به‌روزرسانی شد:'
    },
    data: {
      title: 'حافظه محلی IndexedDB و حسگرها (M07)',
      desc: 'تمامی گزارش‌ها و شواهد به صورت محلی در IndexedDB ذخیره می‌گردند.',
      clearCacheBtn: 'پاکسازی حافظه موقت M07',
      clearCacheConfirm: 'حافظه موقت پاک شود؟ نقش و زبان حفظ خواهند شد.',
      cacheClearedNotice: 'حافظه موقت با موفقیت پاک شد'
    }
  },
  UR: {
    headerTitle: 'سسٹم کی ترتیبات اور ذاتی خود مختار سرکل',
    headerSubtitle: '7 عالمی زبانوں، پرائیویسی گراف، 9 مجاز کرداروں اور مقامی میموری کی ترتیب',
    tabs: {
      profile: 'پروفائل اور DID',
      privacy: 'پرائیویسی گراف (10)',
      localization: 'زبانیں اور رسم الخط (7)',
      appearance: 'ظاہری شکل و صورت',
      notifications: 'اطلاعات',
      security: 'اختیارات کی میٹرکس (9 کردار)',
      data: 'ڈیٹا اور سینسرز'
    },
    profile: {
      title: 'شناخت اور غیر مرکزی شناخت کنندہ (DID)',
      personaLabel: 'ظاہر ہونے والا نام (Persona)',
      taglineLabel: 'نعرہ / مشن',
      avatarLabel: 'اواتار کا لنک',
      didLabel: 'کرپٹوگرافک DID:',
      roleLabel: 'موجودہ سسٹم کا کردار:',
      clusterLabel: 'کیسپین کلسٹر:',
      saveBtn: 'ذاتی پروفائل محفوظ کریں',
      savedNotice: 'پروفائل کامیابی سے محفوظ ہو گیا!',
      canonTitle: 'Section 03 کا قانونی اصول',
      canonDesc: '«شناخت اختیار نہیں، پروفائل شناخت نہیں، بٹوا شناخت نہیں، سماجی شہرت مالی یا حکمرانی کا اختیار نہیں۔»',
      bullet1: '• شناخت کنندہ DID انسان کی تصدیق کرتا ہے۔',
      bullet2: '• کردار اختیارات کا دائرہ کار فراہم کرتا ہے۔',
      bullet3: '• شواہد اقدامات کی تصدیق کرتے ہیں۔'
    },
    privacy: {
      title: 'M10 پرائیویسی گراف — ڈیٹا تک رسائی کے دائرے',
      graphTitle: 'پرائیویسی گراف (ماسٹر ماڈل 002)',
      graphDesc: 'پرائیویسی کا دائرہ بٹوے اور شہرت سے بالکل الگ ہے۔',
      noticeUpdated: 'پرائیویسی کی ترتیب اپ ڈیٹ ہو گئی'
    },
    localization: {
      title: '04 کثیر لسانی فیبرک — 7 قانونی زبانیں اور رسم الخط',
      activeLabel: 'فعال زبان:',
      desc: 'ہر زبان رسم الخط، سمت (LTR/RTL) اور اوقات کی درست ترتیب دیتی ہے۔',
      changedNotice: 'زبان کامیابی سے تبدیل ہو گئی'
    },
    appearance: {
      title: 'انٹرفیس کے تھیمز اور بصری ترجیحات',
      themesLabel: 'تھیمز',
      fontScaleLabel: 'فونٹ کا سائز',
      highContrast: 'ہائی کنٹراسٹ موڈ',
      animations: 'اینیمیشنز'
    },
    notifications: {
      title: 'اطلاعات کے ذرائع اور واقعات'
    },
    security: {
      title: '9 سسٹمی کرداروں اور اختیارات کی میٹرکس (M03 / M10)',
      desc: 'کردار کے اختیارات شوری رول نمبر 42 کے تحت جانچے جاتے ہیں۔',
      rolesTitle: 'سسٹم کے کردار',
      roleUpdatedNotice: 'کردار کامیابی سے تبدیل کر دیا گیا:'
    },
    data: {
      title: 'M07 IndexedDB لوکل اسٹوریج اور سینسرز',
      desc: 'تمام لیجر ٹرانزیکشنز اور شواہد آپ کے ڈیوائس پر محفوظ رہتے ہیں۔',
      clearCacheBtn: 'M07 کیشے صاف کریں',
      clearCacheConfirm: 'عارضی IndexedDB کیشے صاف کریں؟ کردار اور زبان محفوظ رہے گی۔',
      cacheClearedNotice: 'مقامی کیشے کامیابی سے صاف ہو گیا'
    }
  }
};

