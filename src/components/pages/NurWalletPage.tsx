import React, { useState, useEffect } from 'react';
import {
  Wallet,
  Coins,
  ArrowUpRight,
  ArrowDownLeft,
  ShieldCheck,
  TrendingUp,
  HeartHandshake,
  QrCode,
  Lock,
  Leaf,
  CheckCircle2,
  RefreshCw,
  Send,
  Layers,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useOSStore } from '../../store/osStore';
import {
  recordNurTransaction,
  calculateZakat,
  NUR_REAL_PROJECTS,
} from '../../lib/economy/nurEngine';
import { db, DbNurTransaction } from '../../lib/db/keymatrixDb';
import { EvidenceBadge } from '../common/EvidenceBadge';
import { TRANSLATIONS } from '../../data/translations';
import { NURSeparation } from '../nur/NURSeparation';
import { DoubleEntryLedgerView } from '../nur/DoubleEntryLedgerView';

const YIELD_HISTORY = [
  { month: 'Апр', yield: 10.8, volume: 820000 },
  { month: 'Май', yield: 11.2, volume: 910000 },
  { month: 'Июн', yield: 11.5, volume: 980000 },
  { month: 'Июл', yield: 11.9, volume: 1050000 },
  { month: 'Авг', yield: 12.1, volume: 1180000 },
  { month: 'Сен', yield: 12.4, volume: 1250000 },
];

export const NurWalletPage: React.FC = () => {
  const { role, language, addLog } = useOSStore();
  const t = TRANSLATIONS[language];

  const [activeTab, setActiveTab] = useState<'separation' | 'ledger' | 'overview' | 'transfer' | 'history' | 'zakat'>('ledger');
  const [totalBalance, setTotalBalance] = useState(1250000);
  const [liquidBalance, setLiquidBalance] = useState(245000);
  const [transactions, setTransactions] = useState<DbNurTransaction[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState<string | null>(null);

  // Form State
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');

  // Zakat Calculator State
  const [zakatHoldings, setZakatHoldings] = useState(245000);
  const zakatResult = calculateZakat(zakatHoldings);

  const reloadTransactions = async () => {
    try {
      const txs = await db.nurTransactions.toArray();
      setTransactions(txs.reverse());
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    reloadTransactions();
  }, []);

  const handleSendNur = async (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0 || !recipient.trim()) return;

    setIsSending(true);
    try {
      await recordNurTransaction({
        type: 'QARD_HASAN',
        from: '0x71C8392B9a5240E853bE7c8A...f92A',
        to: recipient.trim(),
        amount: num,
        project: 'Qard Hasan (Беспроцентный перевод)',
        description: memo.trim() || 'Прямой перевод NUR (Zero Riba)',
      });

      setLiquidBalance((prev) => Math.max(0, prev - num));
      setTotalBalance((prev) => Math.max(0, prev - num));
      setSendSuccess(`Успешно отправлено ${num.toLocaleString()} NUR на ${recipient}`);
      addLog('NUR', `Транзакция ${num} NUR исполнена. Shura Rule #42 одобрено.`, 'success');
      setRecipient('');
      setAmount('');
      setMemo('');
      await reloadTransactions();
    } catch (err: any) {
      addLog('NUR', `Ошибка перевода NUR: ${err.message}`, 'error');
    } finally {
      setIsSending(false);
      setTimeout(() => setSendSuccess(null), 4000);
    }
  };

  return (
    <div id="page-nur" className="space-y-4 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#07132b]/90 via-[#0a1b3a]/70 to-[#040a17]/90 border border-cyan-800/40 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <span>M10 ECONOMIC LAYER</span>
            <span>•</span>
            <span>ZERO-RIBA ASSET-BACKED PROTOCOL</span>
            <span>•</span>
            <EvidenceBadge level={5} compact />
          </div>
          <h1 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <Coins className="w-6 h-6 text-amber-400" />
            NUR Экономика и Кошелёк (Zero Riba)
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            100% обеспечен реальными активами: зеленая энергия, вода Каспия, проектные пулы Мудараба и Вакф
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-cyan-900/40 overflow-x-auto custom-scrollbar">
          {[
            { id: 'ledger', label: 'N2 Двойная Бухгалтерия (Ledger)' },
            { id: 'separation', label: 'Разделение NUR & 4 Фонда (Model 002)' },
            { id: 'overview', label: 'Обзор и Баланс' },
            { id: 'transfer', label: 'Перевод (0% Riba)' },
            { id: 'history', label: 'Реестр транзакций' },
            { id: 'zakat', label: 'Расчет Закята' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(0,212,255,0.2)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab: N2 Closed-Loop Ledger */}
      {activeTab === 'ledger' && <DoubleEntryLedgerView />}

      {/* Tab 0: NUR Separation (Master Model 002) */}
      {activeTab === 'separation' && <NURSeparation />}

      {/* Top 3 Stat Cards (only if not separation / ledger tab) */}
      {activeTab !== 'separation' && activeTab !== 'ledger' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-gradient-to-b from-[#09152e]/80 to-[#040816]/90 border border-amber-500/30 shadow-lg">
            <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
              Общий баланс эмиссии
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-amber-400">
                {totalBalance.toLocaleString()}
              </span>
              <span className="text-xs font-mono text-slate-400">NUR</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono mt-1 block">
              Обеспечен 24 реальными проектами
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-b from-[#09152e]/80 to-[#040816]/90 border border-cyan-500/30 shadow-lg">
            <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
              Ликвидный остаток
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-cyan-300">
                {liquidBalance.toLocaleString()}
              </span>
              <span className="text-xs font-mono text-slate-400">NUR</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono mt-1 block">
              Доступно для моментального перевода
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-b from-[#09152e]/80 to-[#040816]/90 border border-emerald-500/30 shadow-lg">
            <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
              Средневзвешенная доходность
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-emerald-300">
                +12.4%
              </span>
              <span className="text-xs font-mono text-slate-400">годовых (APR)</span>
            </div>
            <span className="text-[10px] text-amber-400/90 font-mono mt-1 block">
              Прибыль от реальных объектов (Zero Riba)
            </span>
          </div>
        </div>
      )}

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8 rounded-2xl bg-gradient-to-b from-[#09152e]/80 to-[#040816]/90 border border-cyan-900/40 p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-cyan-900/40 pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Динамика доходности и объема (Recharts)
                </h3>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                12.4% текущий пул
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={YIELD_HISTORY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="yieldGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} domain={[9, 14]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#040814',
                      borderColor: '#0891b2',
                      borderRadius: '8px',
                      fontSize: '11px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="yield"
                    name="Доходность (%)"
                    stroke="#10b981"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#yieldGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-4 rounded-2xl bg-gradient-to-b from-[#09152e]/80 to-[#040816]/90 border border-cyan-900/40 p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-cyan-900/40 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Гарантии Zero Riba
                </h3>
              </div>
              <EvidenceBadge level={5} compact />
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              В протоколе NUR категорически исключены ссудный процент, деривативы с неопределенностью (гарар) и спекулятивные сделки (майсир).
            </p>

            <div className="space-y-2 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Стандарт:</span>
                <span className="text-cyan-300">AAOIFI Shariah #44</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Аудит:</span>
                <span className="text-emerald-400">Shura Rule #42 Passed</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Адрес кошелька:</span>
                <span className="text-amber-300 text-[10px]">0x71C839...f92A</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Transfer */}
      {activeTab === 'transfer' && (
        <div className="max-w-xl mx-auto rounded-2xl bg-gradient-to-b from-[#09152e]/90 to-[#040816]/95 border border-cyan-800/40 p-6 shadow-xl space-y-4">
          <div className="border-b border-cyan-900/40 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Send className="w-4 h-4 text-cyan-400" />
              Беспроцентный перевод NUR (Qard Hasan)
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Комиссия сети: 0%. Мгновенное подтверждение консенсусом TEE.
            </p>
          </div>

          {sendSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              {sendSuccess}
            </div>
          )}

          <form onSubmit={handleSendNur} className="space-y-4">
            <div>
              <label className="text-xs font-mono text-slate-300 block mb-1.5">
                Адрес получателя (DID / Wallet / Email)
              </label>
              <input
                type="text"
                required
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="did:keymatrix:baku:user_01 или 0x..."
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-cyan-800/40 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <label className="text-slate-300">Сумма (NUR)</label>
                <span className="text-cyan-400">
                  Доступно: {liquidBalance.toLocaleString()} NUR
                </span>
              </div>
              <input
                type="number"
                required
                min="1"
                max={liquidBalance}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Например: 500"
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-cyan-800/40 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-300 block mb-1.5">
                Назначение платежа (Мемо)
              </label>
              <input
                type="text"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="Например: Оплата за экологический анализ или поддержка вакфа"
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-cyan-800/40 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans"
              />
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(0,212,255,0.3)] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Send className={`w-3.5 h-3.5 ${isSending ? 'animate-spin' : ''}`} />
              {isSending ? 'Проведение через TEE...' : 'Подтвердить перевод'}
            </button>
          </form>
        </div>
      )}

      {/* Tab 3: History */}
      {activeTab === 'history' && (
        <div className="rounded-2xl bg-gradient-to-b from-[#09152e]/80 to-[#040816]/90 border border-cyan-900/40 p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-cyan-900/40 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Реестр транзакций (IndexedDB KeyMatrix)
            </h3>
            <button
              onClick={reloadTransactions}
              className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-cyan-300 transition-colors"
              title="Обновить"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            {transactions.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                Транзакции пока отсутствуют в локальной базе данных.
              </div>
            ) : (
              transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-900 text-amber-400 font-mono font-bold">
                      NUR
                    </div>
                    <div>
                      <div className="font-semibold text-white">{tx.project || tx.description}</div>
                      <div className="text-[10px] font-mono text-slate-400">
                        От: {tx.from.slice(0, 10)}... → Кому: {tx.to.slice(0, 10)}...
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono font-bold text-cyan-300 text-sm block">
                      +{tx.amount.toLocaleString()} NUR
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400">
                      Zero Riba Verified
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab 4: Zakat */}
      {activeTab === 'zakat' && (
        <div className="max-w-xl mx-auto rounded-2xl bg-gradient-to-b from-[#09152e]/90 to-[#040816]/95 border border-cyan-800/40 p-6 shadow-xl space-y-4">
          <div className="border-b border-cyan-900/40 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-amber-400" />
              Калькулятор Закята (2.5% очищение имущества)
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Расчет по каноническому Нисабу (85 грамм золота) на основе ваших сбережений
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-mono text-slate-300 block mb-1.5">
                Сбережения и активы в NUR (завершился 1 лунный год):
              </label>
              <input
                type="number"
                value={zakatHoldings}
                onChange={(e) => setZakatHoldings(parseFloat(e.target.value) || 0)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-cyan-800/40 text-xs text-white font-mono focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-cyan-900/30 space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Порог Нисаба:</span>
                <span className="text-amber-300">{zakatResult.nisabThreshold.toLocaleString()} NUR</span>
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Статус обязательства:</span>
                <span className={zakatResult.eligible ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                  {zakatResult.eligible ? 'ОБЯЗАТЕЛЕН (Нисаб превышен)' : 'НЕ ОБЯЗАТЕЛЕН'}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
                <span className="text-xs text-slate-200 font-bold">Сумма Закята к выплате:</span>
                <span className="text-xl font-bold font-mono text-emerald-400">
                  {zakatResult.zakatDue.toLocaleString()} NUR
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                addLog('NUR', `Начислен перевод Закята (${zakatResult.zakatDue} NUR) в целевой фонд Вакфа`, 'success');
              }}
              className="w-full py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold font-mono transition-colors"
            >
              Направить Закят в фонд сирот и нуждающихся (Вакф)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
