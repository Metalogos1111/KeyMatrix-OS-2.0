import React, { useState } from 'react';
import {
  Users,
  ShieldCheck,
  Baby,
  Heart,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Coins,
  Sparkles,
  BookOpen,
  Sliders,
  Send,
  UserCheck,
  Clock,
  KeyRound,
  FileText,
  Calculator,
  Plus,
  Compass,
} from 'lucide-react';
import { EvidenceBadge } from '../common/EvidenceBadge';
import { useOSStore } from '../../store/osStore';
import {
  BurialMember,
  BurialClaim,
  BurialFundState,
  INITIAL_BURIAL_FUND,
  INITIAL_BURIAL_MEMBERS,
  INITIAL_BURIAL_CLAIMS,
  createBurialClaim,
} from '../../lib/family/burialSupport';
import {
  EstateInput,
  InheritanceResult,
  calculateIslamicInheritance,
} from '../../lib/family/inheritanceEngine';

export interface ChildAccount {
  id: string;
  name: string;
  did: string;
  age: number;
  safeBalance: number;
  dailyCap: number;
  spentToday: number;
  aiSafetyFilter: 'STRICT' | 'MODERATE' | 'STANDARD';
  rewardPoints: number;
}

export const FamilyCore: React.FC = () => {
  const { role, addLog } = useOSStore();

  const [activeTab, setActiveTab] = useState<'CHILDREN' | 'BURIAL' | 'INHERITANCE'>('CHILDREN');

  // --- TAB 1: CHILD ACCOUNTS STATE ---
  const [children, setChildren] = useState<ChildAccount[]>([
    {
      id: 'child-1',
      name: 'Юсуф (11 лет)',
      did: 'did:keymatrix:baku:child_yusuf_09',
      age: 11,
      safeBalance: 120,
      dailyCap: 25,
      spentToday: 10,
      aiSafetyFilter: 'STRICT',
      rewardPoints: 340,
    },
    {
      id: 'child-2',
      name: 'Марьям (14 лет)',
      did: 'did:keymatrix:baku:child_maryam_02',
      age: 14,
      safeBalance: 280,
      dailyCap: 50,
      spentToday: 15,
      aiSafetyFilter: 'STRICT',
      rewardPoints: 780,
    },
  ]);

  const [selectedChildId, setSelectedChildId] = useState<string>('child-1');
  const [pendingApproval, setPendingApproval] = useState<{
    id: string;
    childName: string;
    amount: number;
    target: string;
    purpose: string;
  } | null>({
    id: 'req-881',
    childName: 'Юсуф',
    amount: 45,
    target: 'Интерактивный курс робототехники Баку Вакф',
    purpose: 'Покупка учебного комплекта',
  });
  const [approvalStatus, setApprovalStatus] = useState<string | null>(null);

  // --- TAB 2: BURIAL SUPPORT STATE ---
  const [burialFund, setBurialFund] = useState<BurialFundState>(INITIAL_BURIAL_FUND);
  const [burialMembers, setBurialMembers] = useState<BurialMember[]>(INITIAL_BURIAL_MEMBERS);
  const [burialClaims, setBurialClaims] = useState<BurialClaim[]>(INITIAL_BURIAL_CLAIMS);
  const [showNewClaimModal, setShowNewClaimModal] = useState(false);
  const [newClaimName, setNewClaimName] = useState('');
  const [newClaimLocation, setNewClaimLocation] = useState('Мечеть Тезепир, Баку');
  const [newClaimRel, setNewClaimRel] = useState('Близкий родственник');

  // --- TAB 3: INHERITANCE (FARAID) CALCULATOR STATE ---
  const [estateInput, setEstateInput] = useState<EstateInput>({
    grossEstateNur: 120000,
    funeralExpensesNur: 1200,
    debtsNur: 3800,
    wasiyyahBequestNur: 15000,
    deceasedGender: 'MALE',
    hasHusband: false,
    wivesCount: 1,
    fatherAlive: true,
    motherAlive: true,
    sonsCount: 2,
    daughtersCount: 1,
    paternalGrandfatherAlive: false,
    paternalGrandmotherAlive: false,
    maternalGrandmotherAlive: false,
    fullBrothersCount: 1,
    fullSistersCount: 0,
  });

  const [inheritanceResult, setInheritanceResult] = useState<InheritanceResult>(() =>
    calculateIslamicInheritance(estateInput)
  );

  const selectedChild = children.find((c) => c.id === selectedChildId) || children[0];

  const handleUpdateDailyCap = (newCap: number) => {
    setChildren((prev) =>
      prev.map((c) => (c.id === selectedChild.id ? { ...c, dailyCap: newCap } : c))
    );
    addLog('SHURA', `Обновлен дневной лимит Safe Balance для ${selectedChild.name}: ${newCap} NUR/день`, 'info');
  };

  const handleApproveRequest = (approved: boolean) => {
    if (!pendingApproval) return;
    if (approved) {
      setApprovalStatus('APPROVED');
      addLog('SHURA', `Опекун одобрил транзакцию ${pendingApproval.amount} NUR для ${pendingApproval.childName}`, 'success');
    } else {
      setApprovalStatus('REJECTED');
      addLog('SHURA', `Опекун отклонил запрос ${pendingApproval.amount} NUR от ${pendingApproval.childName}`, 'warning');
    }
    setTimeout(() => {
      setPendingApproval(null);
      setApprovalStatus(null);
    }, 2000);
  };

  const handleCreateClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClaimName.trim()) return;

    const claim = createBurialClaim({
      deceasedName: `${newClaimName} (рахимахуллах)`,
      deceasedDid: `did:key:km_deceased_${Math.random().toString(36).substring(2, 8)}`,
      applicantDid: 'did:key:km_applicant_verified_guardian',
      relationship: newClaimRel,
      requestedAmountNur: 1200,
      janazahLocation: newClaimLocation,
      deathDocId: `doc_death_cert_${Date.now()}`,
    });

    setBurialClaims((prev) => [claim, ...prev]);
    setBurialFund((prev) => ({
      ...prev,
      totalReserveNur: Math.max(0, prev.totalReserveNur - 1200),
      totalClaimsDisbursedCount: prev.totalClaimsDisbursedCount + 1,
      totalDisbursedNur: prev.totalDisbursedNur + 1200,
    }));

    addLog('SHURA', `Выплачена компенсация на погребение (Джаназа Тадамун): 1,200 NUR для «${newClaimName}»`, 'success');
    setShowNewClaimModal(false);
    setNewClaimName('');
  };

  const handleCalculateInheritance = (updated: Partial<EstateInput>) => {
    const nextInput = { ...estateInput, ...updated };
    setEstateInput(nextInput);
    setInheritanceResult(calculateIslamicInheritance(nextInput));
  };

  return (
    <div className="space-y-4 animate-fade-in text-slate-100">
      {/* Header Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#121c33]/90 via-[#182847]/80 to-[#0c1324]/95 border border-cyan-800/40 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cyan-900/50 pb-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-pink-500/20 text-pink-300 border border-pink-500/40">
              <Heart className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">
                Family & Life Layer • Полный Цикл Жизни (M10/M11)
              </h2>
              <span className="text-xs text-cyan-400 font-mono">
                Master Model 002: Опека (Wilayah), Тадамун Джаназа (Погребение) и Наследство (Фараид)
              </span>
            </div>
          </div>
          <EvidenceBadge level={5} compact />
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 pt-1">
          <button
            onClick={() => setActiveTab('CHILDREN')}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'CHILDREN'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(0,212,255,0.4)]'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Baby className="w-3.5 h-3.5" />
            1. Опека и Дети (Wilayah)
          </button>
          <button
            onClick={() => setActiveTab('BURIAL')}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'BURIAL'
                ? 'bg-emerald-500 text-slate-950 shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            2. Фонд Погребения (Тадамун Джаназа)
          </button>
          <button
            onClick={() => setActiveTab('INHERITANCE')}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'INHERITANCE'
                ? 'bg-amber-500 text-slate-950 shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            3. Наследство по Шариату (Фараид)
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: CHILD ACCOUNTS & WILAYAH */}
      {/* ========================================================================= */}
      {activeTab === 'CHILDREN' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left: Child Profiles & Safe Balance (Col 4) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="p-4 rounded-2xl bg-slate-900/70 border border-cyan-900/40 space-y-3">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                Подопечные дети (Child Nodes)
              </span>

              <div className="space-y-2">
                {children.map((ch) => {
                  const isSelected = ch.id === selectedChild.id;
                  return (
                    <div
                      key={ch.id}
                      onClick={() => setSelectedChildId(ch.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-950/70 border-cyan-400 shadow-[0_0_12px_rgba(0,212,255,0.2)]'
                          : 'bg-slate-950/60 border-slate-800 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Baby className="w-4 h-4 text-pink-400" />
                          <strong className="text-xs text-white">{ch.name}</strong>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded">
                          Safe Mode
                        </span>
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 truncate mb-2">{ch.did}</div>

                      <div className="grid grid-cols-2 gap-2 text-[10px] font-mono border-t border-slate-800/80 pt-2">
                        <div>
                          <span className="text-slate-500 block">Safe Balance:</span>
                          <strong className="text-cyan-300 text-xs">{ch.safeBalance} NUR</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Лимит в день:</span>
                          <strong className="text-amber-300 text-xs">{ch.dailyCap} NUR</strong>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pending Multi-Sig Approval Alert */}
            {pendingApproval && (
              <div className="p-4 rounded-2xl bg-gradient-to-b from-amber-950/50 to-slate-950/80 border border-amber-500/50 shadow-lg space-y-2.5 animate-pulse">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold">
                  <AlertTriangle className="w-4 h-4" />
                  <span>ТРЕБУЕТСЯ ОДОБРЕНИЕ ОПЕКУНА</span>
                </div>
                <div className="text-xs text-slate-200">
                  <strong className="text-white">{pendingApproval.childName}</strong> запросил перевод{' '}
                  <strong className="text-amber-300 font-mono">{pendingApproval.amount} NUR</strong>:
                  <p className="text-[11px] text-slate-300 mt-1 italic">
                    «{pendingApproval.target}» ({pendingApproval.purpose})
                  </p>
                </div>

                {approvalStatus ? (
                  <div className="p-2 rounded-lg bg-black/60 font-mono text-xs text-center text-emerald-400">
                    {approvalStatus === 'APPROVED' ? 'ТРАНЗАКЦИЯ ОДОБРЕНА И ПОДПИСАНА' : 'ЗАПРОС ОТКЛОНЕН'}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => handleApproveRequest(true)}
                      className="py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold font-mono text-xs transition-all flex items-center justify-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Одобрить
                    </button>
                    <button
                      onClick={() => handleApproveRequest(false)}
                      className="py-1.5 rounded-lg bg-rose-900/60 hover:bg-rose-800 text-rose-200 border border-rose-700 font-mono text-xs transition-all"
                    >
                      Отклонить
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right: Policy Limits & Child AI Safety Controls (Col 8) */}
          <div className="lg:col-span-8 space-y-3">
            <div className="p-5 rounded-2xl bg-gradient-to-b from-[#091836]/90 to-[#040b19]/95 border border-cyan-700/40 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-cyan-900/50 pb-3">
                <div className="flex items-center gap-2.5">
                  <Sliders className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-sm font-bold text-white">
                    Настройки безопасности для {selectedChild.name}
                  </h3>
                </div>
                <span className="text-xs font-mono text-pink-300 bg-pink-950/60 px-2 py-0.5 rounded border border-pink-500/30">
                  Wilayah Enclave v2.4
                </span>
              </div>

              {/* Daily Spending Limit Slider */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-950 space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-300">Дневной лимит самостоятельных трат (Safe Cap):</span>
                  <span className="text-amber-300 font-bold text-sm">{selectedChild.dailyCap} NUR / день</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={selectedChild.dailyCap}
                  onChange={(e) => handleUpdateDailyCap(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>Израсходовано сегодня: {selectedChild.spentToday} NUR</span>
                  <span>Траты свыше лимита требуют 2-факторной подписи опекуна</span>
                </div>
              </div>

              {/* Cognitive AI & Content Protection */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-950 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-cyan-400 font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Когнитивный фильтр и ИИ-безопасность
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    SHARIAH-VERIFIED AI ONLY
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-emerald-500/40 text-slate-300">
                    <strong className="text-emerald-300 block mb-0.5">Строгий фильтр (Strict)</strong>
                    <span className="text-[10px] text-slate-400">
                      Блокировка манипулятивного контента, запретных тем и рекламы.
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400">
                    <strong className="text-slate-300 block mb-0.5">Квоты экранного времени</strong>
                    <span className="text-[10px] text-slate-500">2 часа в день для обучения и исламских наук.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400">
                    <strong className="text-slate-300 block mb-0.5">Reward Engine</strong>
                    <span className="text-[10px] text-slate-500">Автоначисление бонусов за прочитанные книги и тесты.</span>
                  </div>
                </div>
              </div>

              {/* Invariant Note */}
              <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-800/30 text-[11px] font-mono text-cyan-300 flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>
                  Все правила фиксируются в локальном криптографическом анклаве. Сервер не может изменить опекунский мандат без подписи ключа опекуна.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: BURIAL SUPPORT (TADAMUN JANAZAH) */}
      {/* ========================================================================= */}
      {activeTab === 'BURIAL' && (
        <div className="space-y-4">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-emerald-500/30">
              <span className="text-slate-400 text-[11px] block">Резерв фонда погребения:</span>
              <div className="text-lg font-bold text-emerald-400 mt-1">
                {burialFund.totalReserveNur.toLocaleString()} NUR
              </div>
              <span className="text-[10px] text-emerald-500/80">Готовность к 70+ выплатам</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-cyan-500/30">
              <span className="text-slate-400 text-[11px] block">Активные участники (Семьи):</span>
              <div className="text-lg font-bold text-cyan-300 mt-1">
                {burialFund.activeMembersCount.toLocaleString()}
              </div>
              <span className="text-[10px] text-slate-400">Взнос: 5 NUR / месяц</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-amber-500/30">
              <span className="text-slate-400 text-[11px] block">Покрытых расходов (Джаназа):</span>
              <div className="text-lg font-bold text-amber-300 mt-1">
                {burialFund.totalDisbursedNur.toLocaleString()} NUR
              </div>
              <span className="text-[10px] text-amber-400/80">{burialFund.totalClaimsDisbursedCount} выплат</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-purple-500/30">
              <span className="text-slate-400 text-[11px] block">Комиссия сервиса:</span>
              <div className="text-lg font-bold text-purple-300 mt-1">0.00% (Halal)</div>
              <span className="text-[10px] text-purple-400/80">Чистая солидарность (Тадамун)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Claims History */}
            <div className="lg:col-span-8 space-y-3">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-xs font-mono font-bold text-white uppercase">
                      Реестр выплат взаимопомощи на погребение (Janazah Disbursements)
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowNewClaimModal(true)}
                    className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-xs transition-all flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Подать заявку на помощь
                  </button>
                </div>

                <div className="space-y-2.5">
                  {burialClaims.map((claim) => (
                    <div
                      key={claim.id}
                      className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2 hover:border-emerald-500/40 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div>
                          <strong className="text-xs text-white block">{claim.deceasedName}</strong>
                          <span className="text-[11px] text-slate-400 font-mono">
                            Заявитель: {claim.relationship} • Место: {claim.janazahLocation}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                            ВЫПЛАЧЕНО: {claim.disbursedAmountNur} NUR
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[10px] font-mono text-slate-500 border-t border-slate-900 pt-1.5">
                        <div className="truncate">Хеш свидетельства: {claim.deathCertificateHash}</div>
                        <div className="truncate sm:text-right">Подпись: {claim.guardianSignature}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Solidarity Pool Contributors & Rules */}
            <div className="lg:col-span-4 space-y-3">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                  Активные участники братского фонда
                </span>

                <div className="space-y-2">
                  {burialMembers.map((m) => (
                    <div key={m.id} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                      <div className="flex justify-between items-center mb-1">
                        <strong className="text-white">{m.name}</strong>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded">
                          {m.monthlyContributionNur} NUR/мес
                        </span>
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 truncate">{m.did}</div>
                      <div className="text-[10px] text-slate-500 mt-1">
                        Покрыто членов семьи: <span className="text-cyan-300">{m.familyMembersCovered}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-[11px] font-mono text-emerald-300 space-y-1">
                  <strong>Правило достоинства (Dignity Assurance):</strong>
                  <p className="text-[10px] text-emerald-400/90 leading-relaxed">
                    Ни одна семья не должна брать процентные кредиты или оставаться в бедственном положении в момент утраты. Фонд распределяется мгновенно.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* New Claim Modal */}
          {showNewClaimModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <div className="p-5 rounded-2xl bg-slate-900 border border-emerald-500/50 shadow-2xl max-w-md w-full space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h3 className="text-sm font-bold text-white">Заявка на покрытие расходов погребения</h3>
                  <button
                    onClick={() => setShowNewClaimModal(false)}
                    className="text-slate-400 hover:text-white font-mono text-xs"
                  >
                    Закрыть
                  </button>
                </div>

                <form onSubmit={handleCreateClaim} className="space-y-3 font-mono text-xs">
                  <div>
                    <label className="text-slate-300 block mb-1">ФИО усопшего (рахимахуллах):</label>
                    <input
                      type="text"
                      required
                      placeholder="Имя Фамилия"
                      value={newClaimName}
                      onChange={(e) => setNewClaimName(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1">Степень родства:</label>
                    <select
                      value={newClaimRel}
                      onChange={(e) => setNewClaimRel(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-400 focus:outline-none"
                    >
                      <option value="Сын / Дочь">Сын / Дочь</option>
                      <option value="Муж / Жена">Муж / Жена</option>
                      <option value="Отец / Мать">Отец / Мать</option>
                      <option value="Брат / Сестра">Брат / Сестра</option>
                      <option value="Официальный представитель джамаата">Представитель джамаата</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1">Мечеть / Локация погребения:</label>
                    <input
                      type="text"
                      value={newClaimLocation}
                      onChange={(e) => setNewClaimLocation(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-400 focus:outline-none"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
                    Фиксированная сумма экстренной выплаты: <strong className="text-emerald-400">1,200 NUR</strong>.
                    Выплата поступит на подтвержденный кошелек организатора похорон немедленно.
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono transition-all"
                    >
                      Подписать и выплатить
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowNewClaimModal(false)}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono transition-all"
                    >
                      Отмена
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: ISLAMIC INHERITANCE (ILM AL-FARAID / MIRATH) */}
      {/* ========================================================================= */}
      {activeTab === 'INHERITANCE' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left Column: Estate Input & Legal Heirs (Col 5) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                    Параметры наследственной массы (Тарка)
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Сура Ан-Ниса 4:11-12</span>
                </div>

                <div className="space-y-2.5 text-xs font-mono">
                  <div>
                    <label className="text-slate-400 block mb-1">1. Общая стоимость имущества (Тарка):</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={estateInput.grossEstateNur}
                        onChange={(e) =>
                          handleCalculateInheritance({ grossEstateNur: Math.max(0, Number(e.target.value)) })
                        }
                        className="w-full p-2 rounded-xl bg-slate-950 border border-slate-700 text-amber-300 font-bold pr-12 focus:outline-none focus:border-amber-400"
                      />
                      <span className="absolute right-3 top-2 text-slate-500">NUR</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-slate-400 block mb-1">Расходы на похороны:</label>
                      <input
                        type="number"
                        value={estateInput.funeralExpensesNur}
                        onChange={(e) =>
                          handleCalculateInheritance({ funeralExpensesNur: Math.max(0, Number(e.target.value)) })
                        }
                        className="w-full p-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">Долги усопшего (Дуюун):</label>
                      <input
                        type="number"
                        value={estateInput.debtsNur}
                        onChange={(e) =>
                          handleCalculateInheritance({ debtsNur: Math.max(0, Number(e.target.value)) })
                        }
                        className="w-full p-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">
                      Завещание (Васыйя, макс. 1/3):
                    </label>
                    <input
                      type="number"
                      value={estateInput.wasiyyahBequestNur}
                      onChange={(e) =>
                        handleCalculateInheritance({ wasiyyahBequestNur: Math.max(0, Number(e.target.value)) })
                      }
                      className="w-full p-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none"
                    />
                    <span className="text-[10px] text-slate-500 mt-0.5 block">
                      Допустимый лимит 1/3: {inheritanceResult.wasiyyahCapNur} NUR
                    </span>
                  </div>

                  {/* Gender Selector */}
                  <div className="pt-2 border-t border-slate-800">
                    <label className="text-slate-400 block mb-1">Пол усопшего:</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleCalculateInheritance({ deceasedGender: 'MALE' })}
                        className={`py-1.5 rounded-lg border font-mono text-xs transition-all ${
                          estateInput.deceasedGender === 'MALE'
                            ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        Мужчина
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCalculateInheritance({ deceasedGender: 'FEMALE' })}
                        className={`py-1.5 rounded-lg border font-mono text-xs transition-all ${
                          estateInput.deceasedGender === 'FEMALE'
                            ? 'bg-pink-500/20 border-pink-400 text-pink-300 font-bold'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        Женщина
                      </button>
                    </div>
                  </div>

                  {/* Primary Heirs Selector */}
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <span className="text-slate-300 font-bold block">Живые прямые наследники:</span>

                    {estateInput.deceasedGender === 'MALE' ? (
                      <div className="flex items-center justify-between">
                        <span>Количество жен (0-4):</span>
                        <div className="flex items-center gap-1.5">
                          {[0, 1, 2, 3, 4].map((num) => (
                            <button
                              key={num}
                              type="button"
                              onClick={() => handleCalculateInheritance({ wivesCount: num })}
                              className={`w-6 h-6 rounded text-[11px] font-bold ${
                                estateInput.wivesCount === num
                                  ? 'bg-amber-400 text-slate-950'
                                  : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              {num}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span>Муж жив:</span>
                        <input
                          type="checkbox"
                          checked={estateInput.hasHusband}
                          onChange={(e) => handleCalculateInheritance({ hasHusband: e.target.checked })}
                          className="w-4 h-4 accent-amber-400 cursor-pointer"
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span>Отец жив:</span>
                      <input
                        type="checkbox"
                        checked={estateInput.fatherAlive}
                        onChange={(e) => handleCalculateInheritance({ fatherAlive: e.target.checked })}
                        className="w-4 h-4 accent-amber-400 cursor-pointer"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span>Мать жива:</span>
                      <input
                        type="checkbox"
                        checked={estateInput.motherAlive}
                        onChange={(e) => handleCalculateInheritance({ motherAlive: e.target.checked })}
                        className="w-4 h-4 accent-amber-400 cursor-pointer"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div>
                        <label className="text-slate-400 block mb-1">Сыновья:</label>
                        <input
                          type="number"
                          min="0"
                          max="10"
                          value={estateInput.sonsCount}
                          onChange={(e) =>
                            handleCalculateInheritance({ sonsCount: Math.max(0, Number(e.target.value)) })
                          }
                          className="w-full p-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">Дочери:</label>
                        <input
                          type="number"
                          min="0"
                          max="10"
                          value={estateInput.daughtersCount}
                          onChange={(e) =>
                            handleCalculateInheritance({ daughtersCount: Math.max(0, Number(e.target.value)) })
                          }
                          className="w-full p-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Calculated Shariah Faraid Breakdown (Col 7) */}
            <div className="lg:col-span-7 space-y-3">
              <div className="p-5 rounded-2xl bg-gradient-to-b from-[#182315]/80 to-[#0c1409]/95 border border-emerald-700/40 shadow-xl space-y-4 font-mono">
                <div className="flex items-center justify-between border-b border-emerald-900/50 pb-2">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-sm font-bold text-white">
                      Правовой расчет долей наследства (Фараид)
                    </h3>
                  </div>
                  <span className="text-xs text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-600/30">
                    Net: {inheritanceResult.netDistributableNur.toLocaleString()} NUR
                  </span>
                </div>

                {/* Heir shares breakdown */}
                <div className="space-y-2.5">
                  {inheritanceResult.heirShares.map((share, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-950/80 border border-emerald-900/40 text-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <strong className="text-emerald-300 text-sm">{share.heirType}</strong>
                        <div className="text-right">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                            {share.quranicFraction}
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-slate-300">
                        <span className="text-[11px] text-slate-400">{share.explanation}</span>
                        <div className="text-right">
                          <strong className="text-amber-300 text-sm">{share.totalAmountNur.toLocaleString()} NUR</strong>
                          {share.count > 1 && (
                            <span className="block text-[10px] text-slate-400">
                              ({share.individualAmountNur.toLocaleString()} NUR / чел)
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-[10px] text-emerald-500/80 border-t border-slate-900 pt-1">
                        Основание: {share.quranVerseRef}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Awl / Radd indicators */}
                {inheritanceResult.hasAwl && (
                  <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-xs text-amber-300">
                    <strong>Применено правило Аул (العول):</strong> Сумма долей превысила 1.0, доли пропорционально уменьшены согласно прецеденту праведного халифа Умара (р.а.).
                  </div>
                )}

                {/* Summary & Verification Hash */}
                <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                  <div className="flex justify-between">
                    <span>Всего распределено:</span>
                    <strong className="text-white">{inheritanceResult.totalDistributedNur.toLocaleString()} NUR</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Криптографический хеш акта:</span>
                    <span className="text-cyan-400 truncate">{inheritanceResult.verificationHash}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
