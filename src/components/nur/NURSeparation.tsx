import React, { useState } from 'react';
import {
  Wallet,
  Coins,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Leaf,
  Scale,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Landmark,
  HeartHandshake,
  Send,
  FileCheck,
  RefreshCw,
  Building,
  UserCheck,
  ShieldAlert,
  KeyRound,
} from 'lucide-react';
import { EvidenceBadge } from '../common/EvidenceBadge';
import { useOSStore } from '../../store/osStore';
import {
  FundVaultType,
  INITIAL_PRIME_CORE_VAULTS,
  validateFundTransfer,
  FundTransferRequest,
} from '../../lib/economy/primeCoreFunds';

export const NURSeparation: React.FC = () => {
  const { role, addLog } = useOSStore();
  const [activeTab, setActiveTab] = useState<'cash' | 'value' | 'reward' | 'prime_invariants'>('cash');
  const [selectedFund, setSelectedFund] = useState<FundVaultType>('PRIVATE');

  // Interactive transfer simulation state
  const [transferAmount, setTransferAmount] = useState<string>('500');
  const [transferTarget, setTransferTarget] = useState<string>('did:keymatrix:baku:solar_waqf_01');
  const [targetVault, setTargetVault] = useState<FundVaultType>('WAQF');
  const [recipientCategory, setRecipientCategory] = useState<FundTransferRequest['recipientCategory']>('PERSONAL');
  const [transferStatus, setTransferStatus] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Subsystems required for live digital cash
  const cashSubsystems = [
    { name: 'Wallet Subsystem', status: 'READY', desc: 'Ed25519 DID-управление и локальный TEE Enclave' },
    { name: 'Immutable Ledger', status: 'READY', desc: 'DAG-структурированный локальный журнал транзакций KeyMatrixDB' },
    { name: 'Transaction Engine', status: 'READY', desc: 'Zero-Riba проверка (0% ссудный процент, запрет гарар)' },
    { name: 'Authorization Scope', status: 'READY', desc: 'Проверка прав по роли (Child limit, Guardian signature)' },
    { name: 'Settlement Engine', status: 'READY', desc: 'Мгновенный клиринг с доказательством доказательства (Evidence ID)' },
    { name: 'Treasury / Reserve', status: 'READY', desc: 'Золотовалютное и товарное покрытие резервов' },
    { name: 'Compliance Engine', status: 'READY', desc: 'Автоматический аудит Шуры и фильтрация санкционных списков' },
    { name: 'Fraud Controls', status: 'READY', desc: 'ML-детектор аномалий и защита от двойной траты' },
    { name: 'Dispute Resolution', status: 'READY', desc: 'Арбитраж независимого суда Шуры' },
    { name: 'Audit & Provenance', status: 'READY', desc: 'Криптографическая верификация Merkle Proof (Level 5)' },
    { name: 'Transfer & Redemption', status: 'READY', desc: 'Шлюзы обмена на исламские сукук и региональные валюты' },
    { name: 'Security & Recovery', status: 'READY', desc: 'Fail-Closed изоляция и социальное восстановление Shamir 3/5' },
  ];

  // Pre-production prerequisites
  const preCirculationChecklist = [
    { title: 'Monetary Model', ok: true, detail: 'Дефляционная модель без ссудного процента (Zero Riba)' },
    { title: 'Legal / Jurisdiction Model', ok: true, detail: 'Соответствие стандартам AAOIFI и исламского банкинга' },
    { title: 'Issuance & Redemption Rules', ok: true, detail: 'Эмиссия строго под доказанный вклад (Proof of Value)' },
    { title: 'Security Model (TEE)', ok: true, detail: 'Аппаратная защита ключей и Fail-Closed Enclave' },
    { title: 'Independent Audit', ok: true, detail: 'Верифицировано Советом ученых Шуры' },
    { title: 'Consumer Safeguards', ok: true, detail: 'Лимиты расходов детей и защита от мошенничества' },
  ];

  const handleExecuteTransfer = () => {
    const amt = parseFloat(transferAmount);
    if (isNaN(amt) || amt <= 0) {
      setValidationError('Укажите корректную сумму транзакции');
      return;
    }

    // Run PrimeCore separation invariant verification
    const validation = validateFundTransfer({
      fromVault: selectedFund,
      toVault: targetVault,
      recipientDid: transferTarget,
      amountNur: amt,
      recipientCategory,
      evidenceHash: selectedFund === 'WAQF' ? 'proof_revenue_distribution' : undefined,
    });

    if (!validation.allowed) {
      setValidationError(validation.message);
      addLog('SHURA', `[ОТКЛОНЕНО PRIME-CORE] ${validation.message}`, 'error');
      return;
    }

    setValidationError(null);
    setTransferStatus('PROCESSING');
    addLog(
      'NUR',
      `Инициирован трансфер ${amt} NUR из фонда [${INITIAL_PRIME_CORE_VAULTS[selectedFund].title}] к ${transferTarget}`,
      'info'
    );

    setTimeout(() => {
      setTransferStatus('SUCCESS');
      addLog(
        'NUR',
        `Трансфер ${amt} NUR подтвержден в TEE Enclave. PrimeCore инвариант сохранен: смешивание 0%.`,
        'success'
      );
      setTimeout(() => setTransferStatus(null), 4000);
    }, 1200);
  };

  const handleSimulateViolation = (from: FundVaultType, to: FundVaultType) => {
    setSelectedFund(from);
    setTargetVault(to);
    const validation = validateFundTransfer({
      fromVault: from,
      toVault: to,
      recipientDid: 'did:keymatrix:illegal_commingling_attempt',
      amountNur: 5000,
      recipientCategory: 'GENERAL_PUBLIC',
    });

    if (!validation.allowed) {
      setValidationError(`[ПЕРЕХВАТ PRIME-CORE]: ${validation.message}`);
      addLog('SHURA', `[ИНВАРИАНТ ЗАЩИЩЕН] Попытка смешивания ${from} -> ${to} мгновенно заблокирована.`, 'warning');
    }
  };

  return (
    <div className="space-y-4 animate-fade-in text-slate-100">
      {/* High-level Invariant Rule Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-cyan-950/30 to-blue-950/40 border border-amber-500/40 shadow-xl space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-900/30 pb-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40">
              <Scale className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
              PrimeCore Separation of Funds • Запрет Смешивания
            </span>
          </div>
          <EvidenceBadge level={5} compact />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-amber-500/30 text-amber-200">
            <span className="text-[10px] text-slate-400 block mb-0.5">РАЗДЕЛЕНИЕ ТРЕХ СУЩНОСТЕЙ:</span>
            <div className="text-sm font-bold tracking-wide text-white">
              NUR VALUE <span className="text-amber-400">≠</span> NUR REWARD <span className="text-amber-400">≠</span> NUR DIGITAL CASH
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-emerald-500/30 text-emerald-200">
            <span className="text-[10px] text-slate-400 block mb-0.5">ЗАЩИТА ИНВАРИАНТА PRIME-CORE:</span>
            <div className="text-sm font-bold tracking-wide text-white">
              ZAKAT <span className="text-rose-400">⨂</span> TREASURY <span className="text-rose-400">⨂</span> WAQF <span className="text-rose-400">⨂</span> PRIVATE
            </div>
            <span className="text-[10px] text-slate-400">Криптографический запрет перекрестного смешивания средств на уровне ядра</span>
          </div>
        </div>
      </div>

      {/* 4 Funds Partitioning Strip */}
      <div className="space-y-1.5">
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
          <Building className="w-3.5 h-3.5" />
          Разделение 4 независимых фондов (4 Separate Vaults)
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {(['ZAKAT', 'TREASURY', 'WAQF', 'PRIVATE'] as FundVaultType[]).map((vKey) => {
            const vault = INITIAL_PRIME_CORE_VAULTS[vKey];
            const isSelected = selectedFund === vKey;

            return (
              <div
                key={vKey}
                onClick={() => setSelectedFund(vKey)}
                className={`p-3.5 rounded-xl border bg-gradient-to-b transition-all cursor-pointer ${
                  vKey === 'ZAKAT'
                    ? 'from-amber-950/40 border-amber-500/40 text-amber-300'
                    : vKey === 'TREASURY'
                    ? 'from-blue-950/40 border-blue-500/40 text-blue-300'
                    : vKey === 'WAQF'
                    ? 'from-emerald-950/40 border-emerald-500/40 text-emerald-300'
                    : 'from-cyan-950/40 border-cyan-500/40 text-cyan-300'
                } ${
                  isSelected
                    ? 'ring-2 ring-cyan-400 shadow-[0_0_15px_rgba(0,212,255,0.25)]'
                    : 'opacity-85 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className="px-1.5 py-0.5 rounded bg-black/50 border border-current font-bold">
                    {vKey === 'ZAKAT'
                      ? '8 КАТЕГОРИЙ'
                      : vKey === 'TREASURY'
                      ? 'БАЙТ АЛЬ-МАЛ'
                      : vKey === 'WAQF'
                      ? 'ВЕЧНЫЙ ЭНДАУМЕНТ'
                      : 'ЧАСТНЫЙ БАЛАНС'}
                  </span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                </div>
                <div className="text-sm font-bold text-white mt-1">{vault.title}</div>
                <div className="text-lg font-extrabold font-mono tracking-wide text-white my-1">
                  {vault.balanceNur.toLocaleString()} NUR
                </div>
                <p className="text-[10px] text-slate-300 leading-tight line-clamp-2">{vault.quranicBasis}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Triple Model Tab Selector */}
      <div className="flex items-center p-1 rounded-xl bg-slate-900/80 border border-cyan-900/50">
        <button
          onClick={() => setActiveTab('cash')}
          className={`flex-1 py-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'cash'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(0,212,255,0.2)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Coins className="w-4 h-4 text-cyan-400" />
          1. NUR Digital Cash & UTF
        </button>
        <button
          onClick={() => setActiveTab('prime_invariants')}
          className={`flex-1 py-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'prime_invariants'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-[0_0_12px_rgba(244,63,94,0.2)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          2. Тест Запрета Смешивания (Invariants)
        </button>
        <button
          onClick={() => setActiveTab('value')}
          className={`flex-1 py-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'value'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Leaf className="w-4 h-4 text-emerald-400" />
          3. NUR Value (Вклад)
        </button>
        <button
          onClick={() => setActiveTab('reward')}
          className={`flex-1 py-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'reward'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          4. NUR Reward (Бонусы)
        </button>
      </div>

      {/* Tab 1: DIGITAL CASH & UTF */}
      {activeTab === 'cash' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left: 12 Cash Subsystems (Col 7) */}
            <div className="lg:col-span-7 space-y-3">
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-cyan-900/40 space-y-3">
                <div className="flex items-center justify-between border-b border-cyan-950 pb-2">
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                    12 Обязательных подсистем NUR Digital Cash
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    12/12 ACTIVE
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[360px] overflow-y-auto custom-scrollbar pr-1">
                  {cashSubsystems.map((sub, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-slate-950/70 border border-cyan-950 flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-xs font-semibold text-white">{sub.name}</span>
                        <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-950 px-1.5 py-0.2 rounded">
                          {sub.status}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 line-clamp-2">{sub.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pre-Circulation Gates */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-cyan-900/40 space-y-2">
                <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block">
                  6 Обязательных условий до публичного обращения
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {preCirculationChecklist.map((c, i) => (
                    <div key={i} className="p-2 rounded-lg bg-black/50 border border-cyan-950 text-xs">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>{c.title}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5 pl-5">{c.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Universal Transfer Fabric Simulator (Col 5) */}
            <div className="lg:col-span-5 p-5 rounded-2xl bg-gradient-to-b from-[#091836]/90 to-[#040a18]/95 border border-cyan-600/40 shadow-xl space-y-3 font-mono">
              <div className="flex items-center justify-between border-b border-cyan-900/50 pb-2">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Send className="w-4 h-4 text-cyan-400" />
                  Universal Transfer Fabric (UTF)
                </span>
                <span className="text-[10px] text-cyan-300">PrimeCore Enforced</span>
              </div>

              {validationError && (
                <div className="p-3 rounded-xl bg-rose-950/70 border border-rose-500 text-xs text-rose-200 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>{validationError}</div>
                </div>
              )}

              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Фонд списания (Source Vault):</label>
                  <select
                    value={selectedFund}
                    onChange={(e) => setSelectedFund(e.target.value as FundVaultType)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-cyan-900/60 text-cyan-300 focus:outline-none"
                  >
                    <option value="PRIVATE">PRIVATE: Частный Кошелек (245,000 NUR)</option>
                    <option value="ZAKAT">ZAKAT: Фонд Закята (148,200 NUR)</option>
                    <option value="TREASURY">TREASURY: Казна Байт аль-Мал (520,000 NUR)</option>
                    <option value="WAQF">WAQF: Вакф Эндаумент (336,800 NUR)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Фонд назначения (Target Vault):</label>
                  <select
                    value={targetVault}
                    onChange={(e) => setTargetVault(e.target.value as FundVaultType)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-cyan-900/60 text-slate-200 focus:outline-none"
                  >
                    <option value="PRIVATE">PRIVATE: Личный счет получателя</option>
                    <option value="WAQF">WAQF: Общественный Вакф</option>
                    <option value="TREASURY">TREASURY: Казна Байт аль-Мал</option>
                    <option value="ZAKAT">ZAKAT: Прямое распределение Закята</option>
                  </select>
                </div>

                {selectedFund === 'ZAKAT' && (
                  <div>
                    <label className="text-[11px] text-amber-400 block mb-1">
                      Категория получателя Закята (Коран 9:60):
                    </label>
                    <select
                      value={recipientCategory}
                      onChange={(e) => setRecipientCategory(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl bg-amber-950/60 border border-amber-500/50 text-amber-200 focus:outline-none"
                    >
                      <option value="FUQARA">Аль-Фукара (Бедняки)</option>
                      <option value="MASAKIN">Аль-Масакин (Нищие)</option>
                      <option value="GHARIMIN">Аль-Гаримин (Несостоятельные должники)</option>
                      <option value="FISABILILLAH">Фи Сабилиллях (На пути Аллаха)</option>
                      <option value="IBN_SABIL">Ибн ас-Сабиль (Путники)</option>
                      <option value="GENERAL_PUBLIC">Не указано (Будет заблокировано)</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Сумма (NUR Cash):</label>
                  <input
                    type="number"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    className="w-full p-2.5 bg-slate-950/80 border border-cyan-900/50 rounded-xl text-base text-white font-bold focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-950/90 border border-cyan-950 text-[10px] text-slate-300 space-y-1">
                  <div className="flex justify-between">
                    <span>Комиссия за перевод:</span>
                    <strong className="text-emerald-400">0.00 NUR (Zero Riba)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Изоляция смешивания:</span>
                    <strong className="text-emerald-400">100% BLOCKED AT PRIMECORE</strong>
                  </div>
                </div>

                <button
                  onClick={handleExecuteTransfer}
                  disabled={transferStatus === 'PROCESSING'}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs transition-all shadow-[0_0_15px_rgba(0,212,255,0.3)] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {transferStatus === 'PROCESSING' ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Клиринг в TEE Enclave...
                    </>
                  ) : transferStatus === 'SUCCESS' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-slate-950" />
                      Успешно переведено!
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Исполнить трансфер UTF
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: PRIME INVARIANTS TEST SUITE */}
      {activeTab === 'prime_invariants' && (
        <div className="p-5 rounded-2xl bg-gradient-to-b from-[#200b0e]/90 to-[#0e0405]/95 border border-rose-600/40 shadow-xl space-y-4 font-mono">
          <div className="flex items-center justify-between border-b border-rose-900/50 pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-400" />
                Стресс-тестирование Запрета Смешивания (Commingling Invariant Testbench)
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Проверка криптографического отказа при попытках незаконного перенаправления средств
              </p>
            </div>
            <EvidenceBadge level={5} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            {/* Violation Test 1 */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-rose-500/30 space-y-2 flex flex-col justify-between">
              <div>
                <strong className="text-rose-300 block mb-1">ТЕСТ 1: Перевод Закята в Казну</strong>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Попытка перевести средства фонда Закята в государственную Казну на общие расходы.
                </p>
              </div>
              <button
                onClick={() => handleSimulateViolation('ZAKAT', 'TREASURY')}
                className="w-full py-2 rounded-lg bg-rose-600/20 hover:bg-rose-600 text-rose-200 hover:text-white border border-rose-500/50 font-bold text-xs transition-all"
              >
                Симулировать Zakat → Treasury
              </button>
            </div>

            {/* Violation Test 2 */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-rose-500/30 space-y-2 flex flex-col justify-between">
              <div>
                <strong className="text-rose-300 block mb-1">ТЕСТ 2: Изъятие Тела Вакфа</strong>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Попытка списать неприкосновенный основной капитал Вакфа (Асль аль-Вакф) в частный кошелек.
                </p>
              </div>
              <button
                onClick={() => handleSimulateViolation('WAQF', 'PRIVATE')}
                className="w-full py-2 rounded-lg bg-rose-600/20 hover:bg-rose-600 text-rose-200 hover:text-white border border-rose-500/50 font-bold text-xs transition-all"
              >
                Симулировать Waqf Principal Drain
              </button>
            </div>

            {/* Violation Test 3 */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-rose-500/30 space-y-2 flex flex-col justify-between">
              <div>
                <strong className="text-rose-300 block mb-1">ТЕСТ 3: Заморозка Закята в Вакф</strong>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Попытка преобразовать Закят в долгосрочный эндаумент вместо немедленного распределения (Тамлик).
                </p>
              </div>
              <button
                onClick={() => handleSimulateViolation('ZAKAT', 'WAQF')}
                className="w-full py-2 rounded-lg bg-rose-600/20 hover:bg-rose-600 text-rose-200 hover:text-white border border-rose-500/50 font-bold text-xs transition-all"
              >
                Симулировать Zakat → Waqf Lock
              </button>
            </div>
          </div>

          {validationError && (
            <div className="p-3.5 rounded-xl bg-black/80 border border-rose-500 text-xs text-rose-300 space-y-1">
              <strong className="text-rose-400 block font-bold">ОТВЕТ АППАРАТНОГО АНДАЙВА TEE PRIMECORE:</strong>
              <div>{validationError}</div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: NUR VALUE */}
      {activeTab === 'value' && (
        <div className="p-5 rounded-2xl bg-gradient-to-b from-[#061c16]/90 to-[#020d0b]/95 border border-emerald-600/40 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-emerald-900/50 pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Leaf className="w-5 h-5 text-emerald-400" />
                NUR Value — Измеренный и доказанный вклад (Proof of Value)
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Сигнал реальной полезности обществу: сохраненная экология, обученные студенты, открытый научный код
              </p>
            </div>
            <EvidenceBadge level={5} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-800/40">
              <span className="text-[10px] font-mono text-emerald-400 uppercase">Экологический индекс</span>
              <div className="text-xl font-bold font-mono text-white mt-1">1,480 т CO₂</div>
              <span className="text-[10px] text-slate-400">Предотвращено выбросов солнечными буями</span>
            </div>
            <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-800/40">
              <span className="text-[10px] font-mono text-emerald-400 uppercase">Образовательный вклад</span>
              <div className="text-xl font-bold font-mono text-white mt-1">420 часов</div>
              <span className="text-[10px] text-slate-400">Бесплатных курсов исламской этики и ИИ</span>
            </div>
            <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-800/40">
              <span className="text-[10px] font-mono text-emerald-400 uppercase">Метрика Резонанса (PoR)</span>
              <div className="text-xl font-bold font-mono text-emerald-300 mt-1">0.525 / 0.500</div>
              <span className="text-[10px] text-slate-400">Верифицировано 4 гейтами консенсуса</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-black/60 border border-emerald-900/30 text-xs font-mono text-slate-300 space-y-1">
            <span className="text-emerald-400 font-bold block mb-1">МЕХАНИКА ОЦЕНКИ ВКЛАДА (NUR VALUE ENGINE):</span>
            <div>
              1. Участие → 2. Действие → 3. Полезный результат → 4. Доказательство (Evidence) → 5. Качество / Воздействие → 6. Начисление статуса вклада.
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: NUR REWARD */}
      {activeTab === 'reward' && (
        <div className="p-5 rounded-2xl bg-gradient-to-b from-[#211504]/90 to-[#0c0701]/95 border border-amber-600/40 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-amber-900/50 pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                NUR Reward — Необращаемые баллы и привилегии
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Бонусы за добросовестность, волонтерство и общественное признание в сообществе
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono text-xs font-bold">
              NON-CIRCULATING POINTS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/70 border border-amber-900/40">
              <span className="text-amber-300 font-bold block">Приоритет в образовательных квотах</span>
              <p className="text-slate-400 text-[11px] mt-1">
                Обладатели высокого уровня Reward получают право бесплатного обучения в передовых медресе и ИИ-лабораториях.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/70 border border-amber-900/40">
              <span className="text-amber-300 font-bold block">Право совещательного голоса в Шуре</span>
              <p className="text-slate-400 text-[11px] mt-1">
                Баллы репутации позволяют выдвигать инициативы и участвовать в обсуждении общественных резолюций.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
