import React, { useState } from 'react';
import {
  Globe2,
  Heart,
  Sparkles,
  X,
  Filter,
} from 'lucide-react';
import { useOSStore } from '../../store/osStore';
import { EvidenceBadge } from '../common/EvidenceBadge';
import { TRANSLATIONS, getNestedTranslation } from '../../data/translations';
import { HumanLifeGraph } from '../civilization/HumanLifeGraph';

export const WorldAnalyticsPage: React.FC = () => {
  const { language, civilizationFilter, setCivilizationFilter } = useOSStore();
  const dict = TRANSLATIONS[language] || TRANSLATIONS.EN;
  const t = (k: string) => getNestedTranslation(language, k);

  const [activeTab, setActiveTab] = useState<'planetary' | 'human_graph'>('planetary');

  const nodes = [
    { city: language === 'AZ' ? 'Bakı (Baş Düyün / Hub)' : 'Баку (Главный узел)', status: 'ACTIVE', ping: '2ms', load: '34%', energy: language === 'AZ' ? '100% Günəş/Külək' : '100% Солнце/Ветер' },
    { city: language === 'AZ' ? 'İstanbul (Boğaziçi)' : 'Стамбул (Босфор)', status: 'ACTIVE', ping: '18ms', load: '48%', energy: '92% Green' },
    { city: language === 'AZ' ? 'Daşkənd (İpək Yolu)' : 'Ташкент (Шелковый путь)', status: 'ACTIVE', ping: '32ms', load: '28%', energy: '88% Green' },
    { city: language === 'AZ' ? 'Qahirə (Əl-Əzhər)' : 'Каир (Аль-Азхар)', status: 'ACTIVE', ping: '45ms', load: '52%', energy: '85% Green' },
    { city: language === 'AZ' ? 'Kuala-Lumpur (ASEAN)' : 'Куала-Лумпур (ASEAN)', status: 'ACTIVE', ping: '84ms', load: '41%', energy: '90% Green' },
    { city: language === 'AZ' ? 'Doha (Körfəz)' : 'Доха (Залив)', status: 'ACTIVE', ping: '29ms', load: '38%', energy: '95% Green' },
  ];

  return (
    <div id="page-world" className="space-y-4 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#07132b]/90 via-[#0a1b3a]/70 to-[#040a17]/90 border border-cyan-800/40 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <span>M15 CIVILIZATION LAYER</span>
            <span>•</span>
            <span>PLANETARY OBSERVATORY & HUMAN GRAPH</span>
            <span>•</span>
            <EvidenceBadge level={5} compact />
          </div>
          <h1 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <Globe2 className="w-6 h-6 text-cyan-400" />
            {language === 'AZ' ? 'Dünya, Analitika və İnsan Həyatı Qrafı' : 'Мир, Аналитика & Human Life Graph'}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {language === 'AZ'
              ? 'Sivilizasiya şəbəkə düyünlərinin telemetriyası, təmiz enerji və insan həyat dövrü qrafı'
              : 'Телеметрия узлов цивилизационной сети, чистая энергетика и сквозной граф человеческого жизненного цикла'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 rounded-xl bg-slate-900/90 border border-cyan-900/50">
          <button
            onClick={() => setActiveTab('planetary')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              activeTab === 'planetary'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(0,212,255,0.2)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5" />
            {language === 'AZ' ? 'Planetar Şəbəkə' : 'Планетарная Сеть'}
          </button>
          <button
            onClick={() => setActiveTab('human_graph')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              activeTab === 'human_graph'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(0,212,255,0.2)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-pink-400" />
            Human Life Graph (M14)
          </button>
        </div>
      </div>

      {/* Active Civilization Filter Notification Banner */}
      {civilizationFilter && (
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#00D4FF]/10 border border-[#00D4FF]/40 shadow-[0_0_12px_rgba(0,212,255,0.2)]">
          <div className="flex items-center gap-2 text-xs font-mono">
            <Filter className="w-4 h-4 text-[#00D4FF]" />
            <span className="text-slate-300">
              {language === 'AZ' ? 'Aktiv Dəyər Filtri:' : 'Активный фильтр ценностей:'}
            </span>
            <span className="px-2.5 py-0.5 rounded bg-[#00D4FF]/20 text-[#00D4FF] font-bold uppercase tracking-wider">
              {t(`footer.${civilizationFilter}`)}
            </span>
          </div>
          <button
            onClick={() => setCivilizationFilter(null)}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white text-xs transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            <span>{language === 'AZ' ? 'Filtri təmizlə' : 'Сбросить'}</span>
          </button>
        </div>
      )}

      {activeTab === 'human_graph' ? (
        <HumanLifeGraph />
      ) : (
        <>
          {/* Global 4 Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-gradient-to-b from-[#09152e]/80 to-[#040816]/90 border border-cyan-500/30 shadow-lg">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                <span>{language === 'AZ' ? 'AKTİV DÜYÜNLƏR' : 'АКТИВНЫЕ УЗЛЫ'}</span>
                <span className="text-emerald-400 font-bold">+12%</span>
              </div>
              <div className="text-3xl font-black font-mono text-white">248</div>
              <span className="text-[10px] text-cyan-400 font-mono mt-1 block">
                {language === 'AZ' ? 'Bakı, İstanbul, Daşkənd, Doha' : 'Баку, Стамбул, Ташкент, Доха'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-b from-[#09152e]/80 to-[#040816]/90 border border-cyan-500/30 shadow-lg">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                <span>{language === 'AZ' ? 'ŞƏBƏKƏ DOĞRULAMALARI' : 'ВЕРИФИКАЦИЙ В СЕТИ'}</span>
                <span className="text-emerald-400 font-bold">+8.4%</span>
              </div>
              <div className="text-3xl font-black font-mono text-white">1,482,320</div>
              <span className="text-[10px] text-cyan-400 font-mono mt-1 block">
                {language === 'AZ' ? 'Ucdan-uca Şura Rule #42 sübutları' : 'Сквозные Shura Rule #42 пруфы'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-b from-[#09152e]/80 to-[#040816]/90 border border-amber-500/30 shadow-lg">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                <span>{language === 'AZ' ? 'VƏTƏNDAŞLAR VƏ ÜZVLƏR' : 'ГРАЖДАН И УЧАСТНИКОВ'}</span>
                <span className="text-emerald-400 font-bold">+19%</span>
              </div>
              <div className="text-3xl font-black font-mono text-amber-300">3,204</div>
              <span className="text-[10px] text-amber-400/80 font-mono mt-1 block">
                {language === 'AZ' ? 'Təsdiqlənmiş DID kimlikləri' : 'Подтвержденные DID идентичности'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-b from-[#09152e]/80 to-[#040816]/90 border border-emerald-500/30 shadow-lg">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                <span>{language === 'AZ' ? 'TƏMİZ ENERJİ MWh' : 'ЧИСТАЯ ЭНЕРГИЯ MWh'}</span>
                <span className="text-emerald-400 font-bold">+15.2%</span>
              </div>
              <div className="text-3xl font-black font-mono text-emerald-300">1,245.6</div>
              <span className="text-[10px] text-emerald-400/80 font-mono mt-1 block">
                {language === 'AZ' ? 'Xəzərin günəşi və küləyi' : 'Солнце и ветер Каспия'}
              </span>
            </div>
          </div>

          {/* Planetary Nodes Table */}
          <div className="rounded-2xl bg-gradient-to-b from-[#09152e]/80 to-[#040816]/90 border border-cyan-900/40 p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-cyan-900/40 pb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                {language === 'AZ' ? 'KeyMatrix Mesh Regional Düyünlərinin Statusu' : 'Статус региональных узлов KeyMatrix Mesh'}
              </h3>
              <span className="text-xs font-mono text-cyan-400">
                {language === 'AZ' ? '6 Aktiv Koordinasiya Mərkəzi' : '6 Активных центров координации'}
              </span>
            </div>

            <div className="space-y-2">
              {nodes.map((node, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="font-semibold text-white">{node.city}</span>
                  </div>

                  <div className="flex items-center gap-4 font-mono text-[11px]">
                    <span className="text-slate-400">
                      {language === 'AZ' ? 'Gecikmə:' : 'Задержка:'} <strong className="text-cyan-300">{node.ping}</strong>
                    </span>
                    <span className="text-slate-400">
                      {language === 'AZ' ? 'Yük:' : 'Нагрузка:'} <strong className="text-slate-200">{node.load}</strong>
                    </span>
                    <span className="text-emerald-400">{node.energy}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
