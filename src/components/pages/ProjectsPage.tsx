import React, { useState } from 'react';
import {
  FolderKanban,
  Coins,
  TrendingUp,
  Leaf,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Search,
  Filter,
} from 'lucide-react';
import { useOSStore } from '../../store/osStore';
import { NUR_REAL_PROJECTS, NurProject } from '../../lib/economy/nurEngine';
import { EvidenceBadge } from '../common/EvidenceBadge';
import { TRANSLATIONS } from '../../data/translations';

// 24 Real Zero-Riba Projects Catalog
const ALL_24_PROJECTS: NurProject[] = [
  ...NUR_REAL_PROJECTS,
  {
    id: 'proj-05-wind',
    name: 'Ветропарк Апшерон-Север (Gilmeydan)',
    category: 'ENERGY',
    annualYieldPercentage: 11.8,
    totalCapNur: 350000,
    activeInvestmentsNur: 310000,
    contractType: 'Musharakah',
    isZeroRiba: true,
    co2SavedTonsPerYear: 920,
    location: 'Апшерон / Сумгаит',
  },
  {
    id: 'proj-06-water-purify',
    name: 'Каспийская био-фильтрация и очистка стоков',
    category: 'WATER',
    annualYieldPercentage: 10.5,
    totalCapNur: 210000,
    activeInvestmentsNur: 185000,
    contractType: 'Mudarabah',
    isZeroRiba: true,
    co2SavedTonsPerYear: 410,
    location: 'Баку / Бухта',
  },
  {
    id: 'proj-07-seed-bank',
    name: 'Автономный банк эндемичных семян Карабаха',
    category: 'AGRO',
    annualYieldPercentage: 13.2,
    totalCapNur: 190000,
    activeInvestmentsNur: 175000,
    contractType: 'Mudarabah',
    isZeroRiba: true,
    co2SavedTonsPerYear: 140,
    location: 'Шуша / Агдам',
  },
  {
    id: 'proj-08-waqf-schools',
    name: 'Цифровые школы и медресе будущего (Вакф)',
    category: 'COMMUNITY',
    annualYieldPercentage: 0.0,
    totalCapNur: 250000,
    activeInvestmentsNur: 240000,
    contractType: 'Waqf',
    isZeroRiba: true,
    co2SavedTonsPerYear: 65,
    location: 'Баку / Гянджа / Ленкорань',
  },
  {
    id: 'proj-09-drip-irrigation',
    name: 'Капельное орошение оливковых садов Апшерона',
    category: 'AGRO',
    annualYieldPercentage: 12.9,
    totalCapNur: 180000,
    activeInvestmentsNur: 165000,
    contractType: 'Musharakah',
    isZeroRiba: true,
    co2SavedTonsPerYear: 230,
    location: 'Зиря / Говсан',
  },
  {
    id: 'proj-10-microgrid',
    name: 'Солнечный микро-грид поселка Нардаран',
    category: 'ENERGY',
    annualYieldPercentage: 12.1,
    totalCapNur: 140000,
    activeInvestmentsNur: 132000,
    contractType: 'Mudarabah',
    isZeroRiba: true,
    co2SavedTonsPerYear: 310,
    location: 'Баку / Нардаран',
  },
  {
    id: 'proj-11-clean-springs',
    name: 'Реставрация горных родников Шахдага',
    category: 'WATER',
    annualYieldPercentage: 9.8,
    totalCapNur: 160000,
    activeInvestmentsNur: 145000,
    contractType: 'Musharakah',
    isZeroRiba: true,
    co2SavedTonsPerYear: 110,
    location: 'Губа / Гусар',
  },
  {
    id: 'proj-12-orphan-care',
    name: 'Попечительский центр поддержки сирот (Амана)',
    category: 'COMMUNITY',
    annualYieldPercentage: 0.0,
    totalCapNur: 300000,
    activeInvestmentsNur: 295000,
    contractType: 'Waqf',
    isZeroRiba: true,
    co2SavedTonsPerYear: 40,
    location: 'Баку / Ясамал',
  },
  {
    id: 'proj-13-geothermal',
    name: 'Геотермальное отопление теплиц Масаллы',
    category: 'ENERGY',
    annualYieldPercentage: 14.1,
    totalCapNur: 220000,
    activeInvestmentsNur: 195000,
    contractType: 'Mudarabah',
    isZeroRiba: true,
    co2SavedTonsPerYear: 580,
    location: 'Масаллы / Истису',
  },
  {
    id: 'proj-14-honey-mesh',
    name: 'Горный пчеловодческий кооператив Закатала',
    category: 'AGRO',
    annualYieldPercentage: 13.5,
    totalCapNur: 120000,
    activeInvestmentsNur: 112000,
    contractType: 'Mudarabah',
    isZeroRiba: true,
    co2SavedTonsPerYear: 90,
    location: 'Закатала / Гах',
  },
  {
    id: 'proj-15-rainwater-harvest',
    name: 'Сбор дождевой воды для мечетей Апшерона',
    category: 'WATER',
    annualYieldPercentage: 8.9,
    totalCapNur: 110000,
    activeInvestmentsNur: 98000,
    contractType: 'Musharakah',
    isZeroRiba: true,
    co2SavedTonsPerYear: 140,
    location: 'Баку / Сураханы',
  },
  {
    id: 'proj-16-craft-guild',
    name: 'Гильдия ремесленников ковроткачества (Ихсан)',
    category: 'COMMUNITY',
    annualYieldPercentage: 11.0,
    totalCapNur: 130000,
    activeInvestmentsNur: 120000,
    contractType: 'Mudarabah',
    isZeroRiba: true,
    co2SavedTonsPerYear: 50,
    location: 'Исмаиллы / Лагич',
  },
  {
    id: 'proj-17-biogas-energy',
    name: 'Биогазовый реактор фермерских хозяйств Ширвана',
    category: 'ENERGY',
    annualYieldPercentage: 12.7,
    totalCapNur: 240000,
    activeInvestmentsNur: 215000,
    contractType: 'Musharakah',
    isZeroRiba: true,
    co2SavedTonsPerYear: 690,
    location: 'Кюрдамир / Ширван',
  },
  {
    id: 'proj-18-hydro-small',
    name: 'Микро-ГЭС на реке Тертер (Чистая энергия)',
    category: 'ENERGY',
    annualYieldPercentage: 13.0,
    totalCapNur: 380000,
    activeInvestmentsNur: 350000,
    contractType: 'Mudarabah',
    isZeroRiba: true,
    co2SavedTonsPerYear: 890,
    location: 'Кельбаджар / Тертер',
  },
  {
    id: 'proj-19-eco-transport',
    name: 'Электрический логистический флот (Халяль курьер)',
    category: 'COMMUNITY',
    annualYieldPercentage: 12.3,
    totalCapNur: 175000,
    activeInvestmentsNur: 160000,
    contractType: 'Musharakah',
    isZeroRiba: true,
    co2SavedTonsPerYear: 420,
    location: 'Баку / Агломерация',
  },
  {
    id: 'proj-20-caspian-sturgeon',
    name: 'Восстановление популяции осетровых рыб Каспия',
    category: 'WATER',
    annualYieldPercentage: 10.2,
    totalCapNur: 290000,
    activeInvestmentsNur: 260000,
    contractType: 'Mudarabah',
    isZeroRiba: true,
    co2SavedTonsPerYear: 280,
    location: 'Нефтчала / Устье Куры',
  },
  {
    id: 'proj-21-pomegranate-agro',
    name: 'Органические гранатовые рощи Гёйчая',
    category: 'AGRO',
    annualYieldPercentage: 13.4,
    totalCapNur: 210000,
    activeInvestmentsNur: 195000,
    contractType: 'Mudarabah',
    isZeroRiba: true,
    co2SavedTonsPerYear: 160,
    location: 'Гёйчай / Уджар',
  },
  {
    id: 'proj-22-solar-desal-south',
    name: 'Солнечная опреснительная установка Ленкорани',
    category: 'WATER',
    annualYieldPercentage: 11.5,
    totalCapNur: 270000,
    activeInvestmentsNur: 245000,
    contractType: 'Musharakah',
    isZeroRiba: true,
    co2SavedTonsPerYear: 390,
    location: 'Астара / Ленкорань',
  },
  {
    id: 'proj-23-free-clinic',
    name: 'Мобильная диагностическая клиника (Шифа)',
    category: 'COMMUNITY',
    annualYieldPercentage: 0.0,
    totalCapNur: 320000,
    activeInvestmentsNur: 310000,
    contractType: 'Waqf',
    isZeroRiba: true,
    co2SavedTonsPerYear: 30,
    location: 'Горные районы Азербайджана',
  },
  {
    id: 'proj-24-tea-farms',
    name: 'Террасные высокогорные чайные плантации',
    category: 'AGRO',
    annualYieldPercentage: 12.8,
    totalCapNur: 160000,
    activeInvestmentsNur: 152000,
    contractType: 'Mudarabah',
    isZeroRiba: true,
    co2SavedTonsPerYear: 125,
    location: 'Лерик / Ярдымлы',
  },
];

export const ProjectsPage: React.FC = () => {
  const { setNurWalletModalOpen, language, addLog } = useOSStore();
  const t = TRANSLATIONS[language];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filtered = ALL_24_PROJECTS.filter((p) => {
    const matchesCat = selectedCategory === 'ALL' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div id="page-projects" className="space-y-4 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#07132b]/90 via-[#0a1b3a]/70 to-[#040a17]/90 border border-cyan-800/40 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <span>M10 ECONOMIC LAYER</span>
            <span>•</span>
            <span>24 ZERO-RIBA REAL IMPACT INITIATIVES</span>
            <span>•</span>
            <EvidenceBadge level={5} compact />
          </div>
          <h1 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <FolderKanban className="w-6 h-6 text-orange-400" />
            Проекты реального воздействия (24 проекта)
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Экологические, водные и социальные проекты на основе исламских договоров Мудараба, Мушарака и Вакф
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="projects-search-input"
            type="text"
            placeholder="Поиск проектов, локаций..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900/80 border border-cyan-800/40 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
        {[
          { id: 'ALL', label: `Все проекты (${ALL_24_PROJECTS.length})` },
          { id: 'ENERGY', label: 'Чистая энергия' },
          { id: 'WATER', label: 'Вода и Каспий' },
          { id: 'AGRO', label: 'Агро и Продовольствие' },
          { id: 'COMMUNITY', label: 'Сообщество и Вакф' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium font-mono whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40 shadow-[0_0_10px_rgba(249,115,22,0.2)]'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-transparent'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((proj) => {
          const fundingPct = Math.round((proj.activeInvestmentsNur / proj.totalCapNur) * 100);
          return (
            <div
              key={proj.id}
              className="p-4 rounded-2xl bg-gradient-to-b from-[#09152e]/80 to-[#040816]/90 border border-cyan-900/40 hover:border-cyan-500/50 shadow-lg transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-cyan-300">
                    {proj.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {proj.contractType}
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                      0% RIBA
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-200 transition-colors">
                    {proj.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{proj.location}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Доходность</span>
                    <span className="text-sm font-bold font-mono text-emerald-300">
                      {proj.annualYieldPercentage > 0 ? `+${proj.annualYieldPercentage}%` : 'Благотворит.'}
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">CO2 сбережение</span>
                    <span className="text-sm font-bold font-mono text-cyan-300">
                      {proj.co2SavedTonsPerYear} т/год
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-slate-400">Собрано:</span>
                    <span className="text-cyan-300">
                      {proj.activeInvestmentsNur.toLocaleString()} / {proj.totalCapNur.toLocaleString()} NUR ({fundingPct}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full"
                      style={{ width: `${fundingPct}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-cyan-900/30 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">ID: {proj.id}</span>
                <button
                  onClick={() => {
                    setNurWalletModalOpen(true);
                    addLog('NUR', `Открыт кошелек для инвестиций в проект [${proj.name}]`, 'info');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 hover:text-cyan-200 border border-cyan-700/40 text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Coins className="w-3.5 h-3.5" />
                  Участвовать в пуле
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
