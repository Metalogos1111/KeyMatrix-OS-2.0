import React, { useState } from 'react';
import {
  Vote,
  PlusCircle,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Users,
  Leaf,
  Coins,
  ShieldCheck,
  ShieldAlert,
  ThumbsUp,
  ThumbsDown,
  Scale,
  Sparkles,
  Lock,
  Eye,
  FileText,
  Filter,
} from 'lucide-react';
import { EvidenceBadge } from '../common/EvidenceBadge';
import { useOSStore } from '../../store/osStore';

export type ProposalStatus =
  | 'SHARIAH_VERIFIED'
  | 'SHARIAH_REVIEW_REQUIRED'
  | 'SCHOLARLY_DISAGREEMENT'
  | 'REJECTED_HARAM';

export interface GovernanceProposal {
  id: string;
  title: string;
  proposer: string;
  category: string;
  evidenceLevel: 1 | 2 | 3 | 4 | 5;
  peopleImpact: number;
  co2Offset: number;
  nurBudget: number;
  ethicalScore: number;
  status: ProposalStatus;
  votesFor: number;
  votesAgainst: number;
  weightedScorePct: number;
  summary: string;
  tawhidVerdict: string;
}

const INITIAL_PROPOSALS: GovernanceProposal[] = [
  {
    id: 'PROP-2026-001',
    title: 'Выделение 25,000 NUR на установку 12 сенсорных буев экомониторинга о. Наргин (Каспий)',
    proposer: 'did:keymatrix:baku:caspian-ecologist-09',
    category: 'Экология & Вакф (M13)',
    evidenceLevel: 5,
    peopleImpact: 85000,
    co2Offset: 1200,
    nurBudget: 25000,
    ethicalScore: 99.4,
    status: 'SHARIAH_VERIFIED',
    votesFor: 88.5,
    votesAgainst: 1.5,
    weightedScorePct: 88.5,
    summary: 'Автономные сенсоры контроля популяции осетровых и микропластика. Полная прозрачность данных в сетке Caspian Mesh.',
    tawhidVerdict: 'Одобрено советом ученых Баку: соответствует принципу сохранения творений (Hifz al-Bi’ah).',
  },
  {
    id: 'PROP-2026-002',
    title: 'Принятие поправки Shura Rule #43: Защита когнитивного суверенитета и Safe Balance детей',
    proposer: 'did:keymatrix:ist:dr_amina_family',
    category: 'Семья & ИИ-Этика (M04)',
    evidenceLevel: 5,
    peopleImpact: 350000,
    co2Offset: 0,
    nurBudget: 0,
    ethicalScore: 99.8,
    status: 'SHARIAH_VERIFIED',
    votesFor: 96.2,
    votesAgainst: 0.8,
    weightedScorePct: 96.2,
    summary: 'Установление автоматического родительского контроля над генеративным контентом и изолированного крипто-кошелька ребенка.',
    tawhidVerdict: 'Одобрено: защита потомства (Hifz an-Nasl) и ума (Hifz al-Aql).',
  },
  {
    id: 'PROP-2026-003',
    title: 'Создание пула децентрализованных исламских Sukuk облигаций для дата-центра в Говсане',
    proposer: 'did:keymatrix:baku:sukuk-syndicate-01',
    category: 'Финансы Zero-Riba (M10)',
    evidenceLevel: 4,
    peopleImpact: 45000,
    co2Offset: 340,
    nurBudget: 75000,
    ethicalScore: 84.5,
    status: 'SHARIAH_REVIEW_REQUIRED',
    votesFor: 72.0,
    votesAgainst: 14.0,
    weightedScorePct: 72.0,
    summary: 'Токенизация реальных вычислительных мощностей серверов с распределением прибыли от аренды без долгового процента.',
    tawhidVerdict: 'На рассмотрении: требуется дополнительный аудит механизма выкупа долей Мудараба.',
  },
  {
    id: 'PROP-2026-004',
    title: 'Голосовой клонированный ИИ-муфтий для автоматической генерации фатв в реальном времени',
    proposer: 'did:keymatrix:global:ai-synthetic-lab',
    category: 'Медиа & ИИ (M06)',
    evidenceLevel: 2,
    peopleImpact: 12000,
    co2Offset: 0,
    nurBudget: 15000,
    ethicalScore: 42.0,
    status: 'REJECTED_HARAM',
    votesFor: 5.0,
    votesAgainst: 95.0,
    weightedScorePct: 5.0,
    summary: 'Автономный генератор религиозных постановлений без проверки коллегией ученых-людей.',
    tawhidVerdict: 'ВЕТО TAWHIDCORE: ИИ может быть только советником, право вынесения суждений принадлежит человеку (Rule #12).',
  },
  {
    id: 'PROP-2026-005',
    title: 'Межцивилизационный фонд переводов классических рукописей Института Востоковедения',
    proposer: 'did:keymatrix:baku:oriental-manuscript-chair',
    category: 'Культура & Знания (M08)',
    evidenceLevel: 4,
    peopleImpact: 120000,
    co2Offset: 0,
    nurBudget: 18000,
    ethicalScore: 97.0,
    status: 'SCHOLARLY_DISAGREEMENT',
    votesFor: 68.0,
    votesAgainst: 12.0,
    weightedScorePct: 68.0,
    summary: 'Оцифровка и перевод персидских, арабских и тюркских трактатов по астрономии и суфийской философии XIV-XVII веков.',
    tawhidVerdict: 'Дискуссия: разногласия по методологии комментариев к аллегорическим текстам.',
  },
];

export const ProposalSystem: React.FC = () => {
  const { addLog } = useOSStore();
  const [proposals, setProposals] = useState<GovernanceProposal[]>(INITIAL_PROPOSALS);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userVoted, setUserVoted] = useState<Record<string, 'FOR' | 'AGAINST' | 'VETO'>>({});

  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Экология & Вакф (M13)');
  const [newProposer, setNewProposer] = useState('did:keymatrix:baku:om_user');
  const [newEvidenceLevel, setNewEvidenceLevel] = useState<1 | 2 | 3 | 4 | 5>(4);
  const [newPeopleImpact, setNewPeopleImpact] = useState(25000);
  const [newCo2Offset, setNewCo2Offset] = useState(500);
  const [newNurBudget, setNewNurBudget] = useState(15000);
  const [newSummary, setNewSummary] = useState('');

  const filteredProposals = proposals.filter((p) => {
    if (statusFilter === 'ALL') return true;
    return p.status === statusFilter;
  });

  const handleVote = (propId: string, type: 'FOR' | 'AGAINST' | 'VETO') => {
    setUserVoted((prev) => ({ ...prev, [propId]: type }));
    setProposals((prev) =>
      prev.map((p) => {
        if (p.id === propId) {
          if (type === 'FOR') {
            const newScore = Math.min(100, p.weightedScorePct + 2.5);
            return { ...p, votesFor: p.votesFor + 1, weightedScorePct: newScore };
          } else if (type === 'AGAINST') {
            const newScore = Math.max(0, p.weightedScorePct - 2.5);
            return { ...p, votesAgainst: p.votesAgainst + 1, weightedScorePct: newScore };
          } else {
            return { ...p, status: 'REJECTED_HARAM', weightedScorePct: 0 };
          }
        }
        return p;
      })
    );
    addLog(
      'SHURA',
      `Голос [${type}] зафиксирован с ZK-доказательством для инициативы [${propId}].`,
      type === 'VETO' ? 'error' : 'success'
    );
  };

  const handleCreateProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newProp: GovernanceProposal = {
      id: `PROP-2026-00${proposals.length + 1}`,
      title: newTitle,
      proposer: newProposer,
      category: newCategory,
      evidenceLevel: newEvidenceLevel,
      peopleImpact: newPeopleImpact,
      co2Offset: newCo2Offset,
      nurBudget: newNurBudget,
      ethicalScore: 95.0,
      status: 'SHARIAH_REVIEW_REQUIRED',
      votesFor: 1,
      votesAgainst: 0,
      weightedScorePct: 30.0,
      summary: newSummary || 'Новое предложение зарегистрировано в реестре Шуры.',
      tawhidVerdict: 'Зарегистрировано в очереди на аудит коллегией ученых и палат.',
    };

    setProposals((prev) => [newProp, ...prev]);
    setIsModalOpen(false);
    setNewTitle('');
    setNewSummary('');
    addLog('SHURA', `Создана новая инициатива Шуры [${newProp.id}]: ${newTitle}`, 'success');
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Top Header */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0b1736]/90 via-[#071026]/85 to-[#040816]/95 border border-cyan-800/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <span>M10 PROPOSAL SYSTEM</span>
            <span>•</span>
            <span>WEIGHTED DAO & ZK-PROOF GOVERNANCE</span>
            <span>•</span>
            <EvidenceBadge level={5} compact />
          </div>
          <h2 className="text-base font-bold text-white tracking-wide flex items-center gap-2">
            <Vote className="w-5 h-5 text-cyan-400" />
            Реестр Инициатив и Голосования Шуры
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Прямое волеизъявление сообщества с ZK-анонимизацией и взвешенными голосами палат
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs font-mono flex items-center gap-2 shadow-[0_0_15px_rgba(0,212,255,0.3)] shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          Создать Инициативу
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5 text-cyan-400" /> Статус:
        </span>
        {[
          { id: 'ALL', label: 'Все инициативы' },
          { id: 'SHARIAH_VERIFIED', label: '✓ Shariah Verified' },
          { id: 'SHARIAH_REVIEW_REQUIRED', label: '⏳ Review Required' },
          { id: 'SCHOLARLY_DISAGREEMENT', label: '⚖ Scholarly Debate' },
          { id: 'REJECTED_HARAM', label: '⛔ Vetoed / Haram' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setStatusFilter(f.id)}
            className={`px-3 py-1 rounded-xl text-xs font-mono transition-all ${
              statusFilter === f.id
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(0,212,255,0.2)]'
                : 'bg-slate-950/60 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Proposals List */}
      <div className="space-y-4">
        {filteredProposals.map((p) => {
          const userVote = userVoted[p.id];
          const isPassed = p.weightedScorePct >= 75.0 && p.status === 'SHARIAH_VERIFIED';

          return (
            <div
              key={p.id}
              className={`p-5 rounded-2xl bg-gradient-to-b from-[#09152e]/80 to-[#040816]/90 border shadow-xl space-y-3 transition-all ${
                p.status === 'REJECTED_HARAM'
                  ? 'border-rose-900/40 opacity-75'
                  : isPassed
                  ? 'border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                  : 'border-cyan-900/40'
              }`}
            >
              {/* Top Row: Meta and Badges */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-cyan-300 font-bold">
                      {p.id}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                      {p.category}
                    </span>
                    <EvidenceBadge level={p.evidenceLevel} compact />
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded border font-bold ${
                        p.status === 'SHARIAH_VERIFIED'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : p.status === 'REJECTED_HARAM'
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white tracking-wide">{p.title}</h3>
                  <div className="text-[10px] font-mono text-slate-400">
                    Инициатор: <span className="text-cyan-300">{p.proposer}</span>
                  </div>
                </div>

                {/* Right Nur Allocation */}
                {p.nurBudget > 0 && (
                  <div className="text-right shrink-0">
                    <div className="text-sm font-mono font-bold text-amber-400">
                      {p.nurBudget.toLocaleString()} NUR
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">Запрос Казны</span>
                  </div>
                )}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{p.summary}</p>

              {/* Shariah Verdict Banner */}
              <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-900 text-[11px] font-mono flex items-start gap-2">
                <Scale className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">{p.tawhidVerdict}</span>
              </div>

              {/* Impact Metrics Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-xs">
                <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-cyan-400" />
                  <div>
                    <span className="text-[9px] text-slate-500 block">Охват людей</span>
                    <strong className="text-white">{p.peopleImpact.toLocaleString()}</strong>
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center gap-2">
                  <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                  <div>
                    <span className="text-[9px] text-slate-500 block">CO2 Снижение</span>
                    <strong className="text-emerald-300">-{p.co2Offset} т</strong>
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <div>
                    <span className="text-[9px] text-slate-500 block">Этика 786</span>
                    <strong className="text-amber-300">{p.ethicalScore}%</strong>
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center gap-2">
                  <Coins className="w-3.5 h-3.5 text-yellow-400" />
                  <div>
                    <span className="text-[9px] text-slate-500 block">Бюджет</span>
                    <strong className="text-yellow-300">{p.nurBudget.toLocaleString()}</strong>
                  </div>
                </div>
              </div>

              {/* Weighted Vote Progress Bar */}
              <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">
                    Взвешенная поддержка: <strong className="text-cyan-300">{p.weightedScorePct.toFixed(1)}%</strong>
                  </span>
                  <span className="text-slate-400 text-[10px]">
                    Супер-большинство: <strong className="text-amber-400">75.0%</strong>
                  </span>
                </div>

                <div className="relative w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full transition-all duration-500 ${
                      p.weightedScorePct >= 75
                        ? 'bg-gradient-to-r from-cyan-500 to-emerald-400'
                        : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                    }`}
                    style={{ width: `${p.weightedScorePct}%` }}
                  />
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-rose-400 z-10"
                    style={{ left: '75%' }}
                  />
                </div>

                {/* Vote Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                  <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                    <span>
                      За: <strong className="text-emerald-400">{p.votesFor}</strong>
                    </span>
                    <span>
                      Против: <strong className="text-rose-400">{p.votesAgainst}</strong>
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Веса: Людей 30% • Истина 25% • Стабильность 20%
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleVote(p.id, 'FOR')}
                      disabled={userVote === 'FOR'}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                        userVote === 'FOR'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border-cyan-500/40'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      {userVote === 'FOR' ? 'Голос учтен' : 'Голосовать ЗА'}
                    </button>

                    <button
                      onClick={() => handleVote(p.id, 'AGAINST')}
                      disabled={userVote === 'AGAINST'}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                        userVote === 'AGAINST'
                          ? 'bg-slate-800 text-slate-300 border-slate-700'
                          : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      <ThumbsDown className="w-3.5 h-3.5" />
                      Против
                    </button>

                    <button
                      onClick={() => handleVote(p.id, 'VETO')}
                      disabled={p.status === 'REJECTED_HARAM'}
                      className="px-2.5 py-1.5 rounded-xl bg-rose-950/40 hover:bg-rose-950/60 border border-rose-900/60 text-rose-400 text-xs font-mono transition-all"
                      title="Заявить о нарушении шариата/этики (TawhidCore Veto)"
                    >
                      <ShieldAlert className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Proposal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg p-6 rounded-2xl bg-[#09152e] border border-cyan-500/50 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-cyan-900/50 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-cyan-400" />
                Создать Инициативу Совета Шуры
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white font-mono text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProposal} className="space-y-3 font-mono text-xs">
              <div className="space-y-1">
                <label className="text-slate-300">Название предложения:</label>
                <input
                  type="text"
                  required
                  placeholder="Например: Модернизация фильтров очистки вод в бухте Говсан..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-slate-400">Категория:</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  >
                    <option>Экология & Вакф (M13)</option>
                    <option>Финансы Zero-Riba (M10)</option>
                    <option>Семья & ИИ-Этика (M04)</option>
                    <option>Культура & Знания (M08)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">Уровень доказательств:</label>
                  <select
                    value={newEvidenceLevel}
                    onChange={(e) => setNewEvidenceLevel(Number(e.target.value) as any)}
                    className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-bold"
                  >
                    <option value={3}>Level 3 (Verified)</option>
                    <option value={4}>Level 4 (Reproduced)</option>
                    <option value={5}>Level 5 (Proven)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <label className="text-slate-400">Охват (людей):</label>
                  <input
                    type="number"
                    value={newPeopleImpact}
                    onChange={(e) => setNewPeopleImpact(Number(e.target.value))}
                    className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">CO2 (тонн):</label>
                  <input
                    type="number"
                    value={newCo2Offset}
                    onChange={(e) => setNewCo2Offset(Number(e.target.value))}
                    className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-emerald-300"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">Бюджет (NUR):</label>
                  <input
                    type="number"
                    value={newNurBudget}
                    onChange={(e) => setNewNurBudget(Number(e.target.value))}
                    className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-amber-300"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">Краткое резюме:</label>
                <textarea
                  rows={2}
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  placeholder="Опишите ценность для сообщества и подтверждение доказательств..."
                  className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="pt-3 border-t border-cyan-900/40 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-slate-950 shadow-[0_0_12px_rgba(0,212,255,0.3)]"
                >
                  Зарегистрировать в Шуре
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
