import React, { useState } from 'react';
import {
  Users,
  Baby,
  GraduationCap,
  Heart,
  Briefcase,
  HeartHandshake,
  Scroll,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  Scale,
  Calculator,
  UserCheck,
  Building,
} from 'lucide-react';
import { EvidenceBadge } from '../common/EvidenceBadge';
import { useOSStore } from '../../store/osStore';

export interface LifecycleStage {
  id: string;
  number: string;
  title: string;
  mLayer: string;
  icon: any;
  tagline: string;
  principles: string[];
  evidenceFlow: string;
  shariahBasis: string;
  details: string;
}

const LIFECYCLE_STAGES: LifecycleStage[] = [
  {
    id: 'stage-birth',
    number: '01',
    title: 'Рождение и Суверенная Идентичность',
    mLayer: 'M02 (Идентичность)',
    icon: Baby,
    tagline: 'Начало пути: DID-регистрация, подтверждение родословия (Насаб) и первичное опекунство',
    principles: [
      'Генерация криптографического DID без передачи биометрии в центральные облака',
      'Назначение первичных опекунов (Вилаят) с фиксацией в TEE Enclave',
      'Открытие безопасного стартового кошелька Safe Balance',
      'Регистрация родословия и гражданского статуса в неизменяемом локальном реестре',
    ],
    evidenceFlow: 'Human → Birth Certificate → Guardian Signature → DID Ed25519 → Evidence Level 5',
    shariahBasis: 'Право ребенка на жизнь, имя, чистое родословие (Хифз ан-Насл) и заботу (Тахрим 66:6).',
    details: 'На первом этапе жизни ребенок получает защищенный профиль с нулевым риском утечки данных. Опекун управляет доступом и устанавливает жесткие правила безопасности.',
  },
  {
    id: 'stage-education',
    number: '02',
    title: 'Образование и Доказательство Навыков',
    mLayer: 'M05 (Образование)',
    icon: GraduationCap,
    tagline: 'Цикл познания: Знания → Обучение → Оценка → Доказательства навыков → Вклад',
    principles: [
      'Доступ к канонической исламской мысли, наукам и этике передовых технологий',
      'Верификация навыков через криптографические свидетельства (Verifiable Credentials)',
      'Наставничество сертифицированных преподавателей (Устазов) в децентрализованной сети',
      'Формирование первичной репутации полезного вклада (Proof of Skill)',
    ],
    evidenceFlow: 'Knowledge → Learning → Assessment → Skill Evidence → Reputation → Contribution',
    shariahBasis: 'Обязанность стремления к знаниям (Талаб аль-Ильм) и их практическая польза (Амаль Салих).',
    details: 'Образовательный слой гарантирует защиту когнитивного суверенитета учащегося от манипулятивного ИИ-контента и подтверждает реальную квалификацию без бумажной бюрократии.',
  },
  {
    id: 'stage-family',
    number: '03',
    title: 'Семья, Брак и Опекунство',
    mLayer: 'M04 (Семья и Дом)',
    icon: Heart,
    tagline: 'Этичный брачный союз (Никях), права супругов, жилье и семейный фонд солидарности',
    principles: [
      'Фиксация брачного договора (Никях) с условиями Махра в TEE Enclave',
      'Создание объединенного Семейного Фонда с разграничением прав собственности',
      'Распределение родительской опеки (Вилаят) и воспитательной ответственности',
      'Интеграция с программами доступного экологичного жилья Вакф',
    ],
    evidenceFlow: 'Two Identities → Nikah Contract → Guardian Agreement → Family Node → Evidence Level 5',
    shariahBasis: 'Святость семьи (Митакан Гализан - Ан-Ниса 4:21) и взаимная любовь и милосердие (Ар-Рум 30:21).',
    details: 'Семейный узел служит базовой ячейкой общества в KeyMatrix. Он обеспечивает финансовую и эмоциональную безопасность всех членов семьи с сохранением финансовой независимости женщины.',
  },
  {
    id: 'stage-work',
    number: '04',
    title: 'Труд, Предпринимательство и Творчество',
    mLayer: 'M08 (Труд и Производство)',
    icon: Briefcase,
    tagline: 'Халяльное созидание, партнерство Мудараба/Мушарака и вознаграждение за доказанный вклад',
    principles: [
      'Беспроцентные контракты разделения прибыли и убытков (Zero Riba, Zero Gharar)',
      'Экологический аудит каждого производственного процесса (CO₂ лимиты)',
      'Автоматическое начисление NUR Value за общественно полезные результаты',
      'Защита прав работников и исключение эксплуатации',
    ],
    evidenceFlow: 'Intent → Halal Work → Useful Result → Proof of Value → NUR Reward / Cash',
    shariahBasis: 'Благословенный честный труд (Аль-Касб аль-Халяль) и справедливая торговля (Тиджара - Ан-Ниса 4:29).',
    details: 'Экономическая деятельность направлена на созидание реальных ценностей: чистой энергии, воды, технологий и продуктов питания, исключая спекуляции и финансовые пузыри.',
  },
  {
    id: 'stage-social',
    number: '05',
    title: 'Социальная Поддержка и Взаимопомощь',
    mLayer: 'M09 / M10 (Солидарность)',
    icon: HeartHandshake,
    tagline: 'Адресное распределение Закята (8 категорий) и вечные блага Вакфа',
    principles: [
      'Автоматический расчет права на получение Закята по критерию бедности/нужды',
      'Беспроцентные ссуды взаимопомощи (Кард Хасан) в трудных жизненных ситуациях',
      'Пожизненное медицинское и социальное страхование через систему Такафул',
      'Использование инфраструктуры общественных Вакфов безвозмездно',
    ],
    evidenceFlow: 'Need Verification → Shura Validation → Zakat Fund Distribution → Zero-Riba Aid',
    shariahBasis: 'Священное право бедняка в имуществе богатого (Ат-Тауба 9:60, Аль-Мааридж 70:24-25).',
    details: 'Ни один человек в цивилизации KeyMatrix не остается без крова, еды и медицинской помощи. Социальная сеть работает автономно на смарт-контрактах с открытым аудитом.',
  },
  {
    id: 'stage-legacy',
    number: '06',
    title: 'Завершение Жизни, Наследие и Вакф (M14)',
    mLayer: 'M14 (Протокол Наследия)',
    icon: Scroll,
    tagline: 'Достойное погребение (Джаназа), духовное завещание (Васийя) и шариатский раздел (Мирас)',
    principles: [
      'Координация ритуального погребения (Джаназа) и оповещение общины',
      'Исполнение завещания (Васийя) — до 1/3 имущества на благотворительность и Вакф',
      'Строгий математический расчет долей наследников по Корану (Сура Ан-Ниса 4:11-12)',
      'Превращение проектов наследодателя в непрерывную милостыню (Садака Джария)',
    ],
    evidenceFlow: 'Death Record → Janazah Protocol → Wasiyyah Execution → Mirath Division → Proof Hash',
    shariahBasis: 'Священный закон раздела наследства (Мирас) и вечная награда Садака Джария (Муслим 1631).',
    details: 'Протокол M14 гарантирует абсолютную справедливость передачи наследства, защищает права сирот и вдов, и превращает накопленные знания и активы в вечный эндаумент Вакф.',
  },
];

export const HumanLifeGraph: React.FC = () => {
  const { addLog } = useOSStore();
  const [selectedStage, setSelectedStage] = useState<LifecycleStage>(LIFECYCLE_STAGES[0]);

  // Inheritance (Mirath) interactive calculator state
  const [estateTotal, setEstateTotal] = useState<number>(100000);
  const [wasiyyahPct, setWasiyyahPct] = useState<number>(20); // max 33.3%
  const [hasWife, setHasWife] = useState<boolean>(true);
  const [numSons, setNumSons] = useState<number>(2);
  const [numDaughters, setNumDaughters] = useState<number>(1);
  const [hasParents, setHasParents] = useState<boolean>(true);

  // Calculate Mirath division according to Surah An-Nisa 4:11-12
  const wasiyyahAmount = (estateTotal * Math.min(33.33, wasiyyahPct)) / 100;
  const netEstate = estateTotal - wasiyyahAmount;

  // Parents: 1/6 each if children exist
  const fatherShare = hasParents ? netEstate * (1 / 6) : 0;
  const motherShare = hasParents ? netEstate * (1 / 6) : 0;

  // Wife: 1/8 if children exist
  const wifeShare = hasWife ? netEstate * (1 / 8) : 0;

  // Residue (Asabah) to children: son gets 2 shares, daughter gets 1 share
  const fixedDeductions = fatherShare + motherShare + wifeShare;
  const residue = Math.max(0, netEstate - fixedDeductions);
  const totalChildPortions = numSons * 2 + numDaughters;
  const singlePortion = totalChildPortions > 0 ? residue / totalChildPortions : 0;
  const eachSonShare = singlePortion * 2;
  const eachDaughterShare = singlePortion;

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#06182c]/90 via-[#0a2340]/80 to-[#030e1b]/95 border border-cyan-800/40 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cyan-900/50 pb-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              <Users className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">
                Human Life Graph & Протокол Жизненного Цикла (M14)
              </h2>
              <span className="text-xs text-cyan-400 font-mono">
                Человекоцентричная модель бытия: от рождения до вечного наследия
              </span>
            </div>
          </div>
          <EvidenceBadge level={5} compact />
        </div>

        {/* Fundamental Graph Topology ASCII */}
        <div className="p-3 rounded-xl bg-slate-950/80 border border-cyan-900/40 font-mono text-[11px] text-cyan-300 overflow-x-auto custom-scrollbar">
          <div className="text-slate-400 mb-1 text-[10px] uppercase">ТОПОЛОГИЯ ГРАФА ЖИЗНИ MASTER MODEL 002:</div>
          <div className="whitespace-pre text-center text-emerald-300">
            HUMAN ➔ ( FAMILY • EDUCATION • WORK ) ➔ COMMUNITY ➔ ( TRUST • ECONOMY • GOVERNANCE ) ➔ EVIDENCE
          </div>
        </div>
      </div>

      {/* 6 Lifecycle Stage Horizontal Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {LIFECYCLE_STAGES.map((st) => {
          const isSelected = selectedStage.id === st.id;
          const Icon = st.icon;
          return (
            <button
              key={st.id}
              onClick={() => {
                setSelectedStage(st);
                addLog('SYSTEM', `Просмотр этапа жизни: [${st.number}] ${st.title}`, 'info');
              }}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between group ${
                isSelected
                  ? 'bg-gradient-to-b from-cyan-950/90 to-blue-950/80 border-cyan-400 shadow-[0_0_15px_rgba(0,212,255,0.25)] text-white'
                  : 'bg-slate-900/60 border-cyan-950/60 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-cyan-400 text-slate-950' : 'bg-slate-950 text-slate-400'
                  }`}
                >
                  {st.number}
                </span>
                <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
              </div>
              <div>
                <div className="text-xs font-bold leading-tight line-clamp-2">{st.title}</div>
                <div className="text-[10px] font-mono text-cyan-400/80 mt-1">{st.mLayer}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Stage Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Detailed Stage Cards (Col 7) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="p-5 rounded-2xl bg-gradient-to-b from-[#091836]/90 to-[#040b19]/95 border border-cyan-700/40 shadow-xl space-y-4">
            <div className="flex items-start justify-between border-b border-cyan-900/50 pb-3">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 flex items-center justify-center font-mono font-bold text-sm">
                  {selectedStage.number}
                </span>
                <div>
                  <h3 className="text-base font-bold text-white">{selectedStage.title}</h3>
                  <span className="text-xs font-mono text-cyan-400">{selectedStage.mLayer}</span>
                </div>
              </div>
              <EvidenceBadge level={5} />
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-cyan-950 font-sans">
              {selectedStage.tagline}
            </p>

            {/* Principles Checklist */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
                Ключевые принципы и протоколы этапа:
              </span>
              <div className="space-y-1.5">
                {selectedStage.principles.map((pr, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-900/60 border border-cyan-950 flex items-start gap-2 text-xs text-slate-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{pr}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Evidence Flow */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-cyan-900/40 space-y-1">
              <span className="text-[10px] font-mono text-cyan-400 uppercase">Сквозная цепочка доказательств:</span>
              <div className="text-xs font-mono text-emerald-300">{selectedStage.evidenceFlow}</div>
            </div>

            {/* Shariah Basis */}
            <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/40 space-y-1">
              <span className="text-[10px] font-mono text-amber-400 uppercase font-bold flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5" />
                Шариатское и каноническое обоснование:
              </span>
              <p className="text-xs text-amber-200/90 leading-relaxed font-sans">{selectedStage.shariahBasis}</p>
            </div>
          </div>
        </div>

        {/* Right: Stage 6 Interactive Mirath Calculator or Stage Summary (Col 5) */}
        <div className="lg:col-span-5 space-y-3">
          {selectedStage.id === 'stage-legacy' ? (
            <div className="p-5 rounded-2xl bg-gradient-to-b from-[#181105]/95 to-[#090501]/95 border border-amber-600/40 shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-amber-900/50 pb-2">
                <span className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5">
                  <Calculator className="w-4 h-4" />
                  Калькулятор Наследства (Мирас)
                </span>
                <span className="text-[10px] font-mono text-amber-400">Коран 4:11-12</span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div>
                  <label className="text-[11px] font-mono text-slate-400 block mb-1">
                    Общая масса имущества (NUR):
                  </label>
                  <input
                    type="number"
                    value={estateTotal}
                    onChange={(e) => setEstateTotal(Math.max(0, Number(e.target.value)))}
                    className="w-full p-2 bg-slate-950 border border-amber-900/50 rounded-xl text-white font-mono font-bold text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                    <span>Завещание на Вакф / Садака (макс 33.3%):</span>
                    <strong className="text-amber-300">{wasiyyahPct}%</strong>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="33.33"
                    step="0.5"
                    value={wasiyyahPct}
                    onChange={(e) => setWasiyyahPct(Number(e.target.value))}
                    className="w-full accent-amber-400"
                  />
                  <span className="text-[10px] text-slate-400 block text-right font-mono">
                    = {wasiyyahAmount.toLocaleString()} NUR (Вакф)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-xs">
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/70 border border-amber-950 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasWife}
                      onChange={(e) => setHasWife(e.target.checked)}
                      className="rounded accent-amber-400"
                    />
                    <span>Супруга (1/8)</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/70 border border-amber-950 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasParents}
                      onChange={(e) => setHasParents(e.target.checked)}
                      className="rounded accent-amber-400"
                    />
                    <span>Родители (1/6+1/6)</span>
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Сыновья:</label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={numSons}
                      onChange={(e) => setNumSons(Math.max(0, Number(e.target.value)))}
                      className="w-full p-1.5 bg-slate-950 border border-amber-900/40 rounded-lg text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Дочери:</label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={numDaughters}
                      onChange={(e) => setNumDaughters(Math.max(0, Number(e.target.value)))}
                      className="w-full p-1.5 bg-slate-950 border border-amber-900/40 rounded-lg text-white text-xs"
                    />
                  </div>
                </div>

                {/* Calculation Results Breakdown */}
                <div className="p-3 rounded-xl bg-slate-950/90 border border-amber-900/40 space-y-1.5 font-mono text-[11px]">
                  <span className="text-amber-400 font-bold block border-b border-amber-950 pb-1">
                    РАСЧЕТ ДОЛЕЙ ПО ШАРИАТУ:
                  </span>
                  <div className="flex justify-between text-slate-300">
                    <span>Чистая масса после Васийи:</span>
                    <span className="text-white font-bold">{netEstate.toLocaleString()} NUR</span>
                  </div>
                  {hasParents && (
                    <>
                      <div className="flex justify-between text-slate-400">
                        <span>Отец (1/6):</span>
                        <span className="text-emerald-300">{fatherShare.toLocaleString()} NUR</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Мать (1/6):</span>
                        <span className="text-emerald-300">{motherShare.toLocaleString()} NUR</span>
                      </div>
                    </>
                  )}
                  {hasWife && (
                    <div className="flex justify-between text-slate-400">
                      <span>Супруга (1/8):</span>
                      <span className="text-emerald-300">{wifeShare.toLocaleString()} NUR</span>
                    </div>
                  )}
                  {numSons > 0 && (
                    <div className="flex justify-between text-amber-300">
                      <span>Каждый сын (x2 доля):</span>
                      <span className="font-bold">{eachSonShare.toLocaleString()} NUR</span>
                    </div>
                  )}
                  {numDaughters > 0 && (
                    <div className="flex justify-between text-amber-300">
                      <span>Каждая дочь (x1 доля):</span>
                      <span className="font-bold">{eachDaughterShare.toLocaleString()} NUR</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-cyan-900/40 space-y-3">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                Связанные институты и сервисы
              </span>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-slate-950/70 border border-cyan-950">
                  <strong className="text-white block mb-0.5">Взаимодействие с Шурой:</strong>
                  <p className="text-[11px] text-slate-400">
                    Все ключевые акты жизненного цикла заверяются советом Шуры и фиксируются в TEE Enclave без права одностороннего изменения.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/70 border border-cyan-950">
                  <strong className="text-white block mb-0.5">Непрерывность данных:</strong>
                  <p className="text-[11px] text-slate-400">
                    Локальный кэш IndexedDB сохраняет копию всей истории жизни человека для работы без подключения к внешним серверам.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
