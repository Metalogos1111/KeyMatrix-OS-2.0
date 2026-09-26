import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Wallet,
  Coins,
  ArrowUpRight,
  ArrowDownLeft,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  TrendingUp,
  HeartHandshake,
  QrCode,
  Lock,
  Leaf,
  Check,
  Zap,
} from 'lucide-react';
import { useOSStore } from '../../store/osStore';
import {
  NUR_REAL_PROJECTS,
  recordNurTransaction,
  calculateZakat,
  NurProject,
} from '../../lib/economy/nurEngine';
import { db, DbNurTransaction } from '../../lib/db/keymatrixDb';

export const NURWalletModal: React.FC = () => {
  const { isNurWalletModalOpen, setNurWalletModalOpen, role } = useOSStore();

  const [activeTab, setActiveTab] = useState<'balance' | 'invest' | 'history' | 'zakat'>('balance');
  const [isConnected, setIsConnected] = useState(true);
  const [walletAddress, setWalletAddress] = useState('0x71C8392B9a5240E853bE7c8A...f92A');
  const [totalBalance, setTotalBalance] = useState(1250000);
  const [liquidBalance, setLiquidBalance] = useState(245000);
  const [transactions, setTransactions] = useState<DbNurTransaction[]>([]);
  const [isWalletConnectModalOpen, setIsWalletConnectModalOpen] = useState(false);
  const [txSuccessMessage, setTxSuccessMessage] = useState<string | null>(null);

  // Send transfer state
  const [recipient, setRecipient] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferMemo, setTransferMemo] = useState('');
  const [isTransferring, setIsTransferring] = useState(false);

  // Load transactions from IndexedDB
  const reloadTransactions = async () => {
    try {
      const txs = await db.nurTransactions.toArray();
      if (txs.length > 0) {
        setTransactions(txs.reverse());
      } else {
        // Provide initial realistic history
        setTransactions([
          {
            id: 'tx-init-01',
            type: 'IMPACT_PROFIT_SHARE',
            amount: 14200,
            from: 'Caspian Agro-Solar Pool',
            to: '0x71C...f92A',
            project: 'Агро-солнечный кластер Каспия',
            isZeroRiba: true,
            timestamp: '17.09.2025 18:30:12',
            description: 'Квартальное распределение прибыли Mudarabah (12.4% APR)',
          },
          {
            id: 'tx-init-02',
            type: 'ZAKAT_ALLOCATION',
            amount: 8500,
            from: '0x71C...f92A',
            to: 'Waqf Clean Water Foundation',
            project: 'Опреснительные микро-станции Каспия',
            isZeroRiba: true,
            timestamp: '16.09.2025 11:15:00',
            description: 'Ежегодная выплата закята (2.5% очищение активов)',
          },
        ]);
      }
    } catch (e) {
      console.warn('Could not read transactions:', e);
    }
  };

  useEffect(() => {
    if (isNurWalletModalOpen) {
      reloadTransactions();
    }
  }, [isNurWalletModalOpen]);

  const handleSendTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(transferAmount);
    if (!amountNum || amountNum <= 0 || amountNum > liquidBalance) {
      alert('Недостаточно ликвидных NUR или неверная сумма');
      return;
    }

    setIsTransferring(true);
    await new Promise((res) => setTimeout(res, 600));

    const newTx = await recordNurTransaction({
      type: 'PROJECT_INVESTMENT',
      amount: amountNum,
      from: walletAddress,
      to: recipient || '0xWaqf...EcoCluster',
      project: transferMemo || 'Zero-Riba Transfer',
      description: transferMemo || 'Прямой перевод NUR с нулевой процентной ставкой',
    });

    setLiquidBalance((prev) => prev - amountNum);
    setTotalBalance((prev) => prev - amountNum);
    setTransferAmount('');
    setRecipient('');
    setTransferMemo('');
    setIsTransferring(false);
    setTxSuccessMessage(`Успешно переведено ${amountNum.toLocaleString()} NUR (Zero-Riba)`);
    reloadTransactions();
    setTimeout(() => setTxSuccessMessage(null), 3500);
  };

  const handleInvestProject = async (proj: NurProject) => {
    const investAmount = 25000;
    if (liquidBalance < investAmount) {
      alert('Недостаточно ликвидных NUR для инвестиции');
      return;
    }

    await recordNurTransaction({
      type: 'PROJECT_INVESTMENT',
      amount: investAmount,
      from: walletAddress,
      to: proj.name,
      project: proj.name,
      description: `Участие в договоре ${proj.contractType} (${proj.annualYieldPercentage}% годовых, без ссудного процента)`,
    });

    setLiquidBalance((prev) => prev - investAmount);
    setTxSuccessMessage(`Инвестиция ${investAmount.toLocaleString()} NUR успешно зафиксирована в проекте «${proj.name}»!`);
    reloadTransactions();
    setTimeout(() => setTxSuccessMessage(null), 3500);
  };

  const zakatInfo = calculateZakat(totalBalance);

  if (!isNurWalletModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#0b0c14]/95 border border-[#FFD700]/30 rounded-2xl shadow-[0_0_50px_rgba(255,215,0,0.15)] overflow-hidden text-slate-100"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-gradient-to-r from-[#FFD700]/15 via-transparent to-[#00FF88]/10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#FFD700]/20 border border-[#FFD700]/40 text-[#FFD700]">
                <Wallet className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold tracking-tight text-white">
                    NUR Economic Wallet
                  </h2>
                  <span className="px-2 py-0.5 text-xs font-semibold uppercase tracking-wider rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    REAL ADAPTER • ZERO-RIBA
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Беспроцентная экономика • Мудараба и Мушарака • Доказательство полезного воздействия (PoR)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsWalletConnectModalOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-mono flex items-center gap-2 text-slate-300 transition-colors"
              >
                <QrCode className="w-3.5 h-3.5 text-amber-400" />
                <span>WalletConnect</span>
              </button>

              <button
                onClick={() => setNurWalletModalOpen(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 px-6 pt-3 border-b border-white/10 bg-black/30">
            <button
              onClick={() => setActiveTab('balance')}
              className={`px-4 py-2 text-sm font-semibold border-b-2 transition-all ${
                activeTab === 'balance'
                  ? 'border-[#FFD700] text-[#FFD700]'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Баланс и Переводы
            </button>
            <button
              onClick={() => setActiveTab('invest')}
              className={`px-4 py-2 text-sm font-semibold border-b-2 transition-all ${
                activeTab === 'invest'
                  ? 'border-[#FFD700] text-[#FFD700]'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Инвестиции Mudarabah ({NUR_REAL_PROJECTS.length})
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 text-sm font-semibold border-b-2 transition-all ${
                activeTab === 'history'
                  ? 'border-[#FFD700] text-[#FFD700]'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              История транзакций ({transactions.length})
            </button>
            <button
              onClick={() => setActiveTab('zakat')}
              className={`px-4 py-2 text-sm font-semibold border-b-2 transition-all ${
                activeTab === 'zakat'
                  ? 'border-[#FFD700] text-[#FFD700]'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Калькулятор Закята
            </button>
          </div>

          {/* Success Toast */}
          {txSuccessMessage && (
            <div className="mx-6 mt-3 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>{txSuccessMessage}</span>
            </div>
          )}

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 max-h-[64vh]">
            {activeTab === 'balance' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Balance Card */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#FFD700]/10 via-black/40 to-black/60 border border-[#FFD700]/30 relative overflow-hidden">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="uppercase tracking-wider font-semibold">Общий баланс активов</span>
                    <span className="flex items-center gap-1 text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" /> 100% Backed
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-extrabold font-mono tracking-tight text-white">
                      {totalBalance.toLocaleString()}
                    </span>
                    <span className="text-xl font-bold text-[#FFD700]">NUR</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 text-xs">
                    <div>
                      <span className="text-slate-400 block mb-0.5">Ликвидные NUR:</span>
                      <span className="font-mono font-bold text-white text-base">
                        {liquidBalance.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block mb-0.5">В проектах (Staked):</span>
                      <span className="font-mono font-bold text-amber-300 text-base">
                        {(totalBalance - liquidBalance).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Годовая доходность: <strong className="text-emerald-400">+12.4%</strong></span>
                    <span>Без процентов (Zero Riba)</span>
                  </div>
                </div>

                {/* Send / Transfer Form */}
                <form onSubmit={handleSendTransaction} className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <ArrowUpRight className="w-4 h-4 text-[#FFD700]" />
                      <span>Отправить NUR (Zero-Riba Transfer)</span>
                    </h3>
                    <span className="text-xs text-slate-400">Комиссия сети: 0.00 NUR</span>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">DID Получателя или адрес кошелька:</label>
                    <input
                      type="text"
                      placeholder="did:key:km_... или 0x..."
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-mono bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#FFD700]/50"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span>Сумма NUR:</span>
                      <button
                        type="button"
                        onClick={() => setTransferAmount(liquidBalance.toString())}
                        className="text-[#FFD700] hover:underline"
                      >
                        Макс ({liquidBalance.toLocaleString()})
                      </button>
                    </div>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={transferAmount}
                      onChange={(e) => setTransferAmount(e.target.value)}
                      className="w-full px-3 py-2 text-sm font-mono bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#FFD700]/50"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Назначение платежа (Договор / Проект):</label>
                    <input
                      type="text"
                      placeholder="Например: Целевой грант на опреснение воды"
                      value={transferMemo}
                      onChange={(e) => setTransferMemo(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#FFD700]/50"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isTransferring}
                    className="w-full py-2.5 rounded-xl bg-[#FFD700] hover:bg-[#ffe135] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                  >
                    {isTransferring ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Генерация Zero-Riba подписи...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5" />
                        <span>Подписать и Отправить</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'invest' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Реальные эколого-экономические проекты Апшерона и Каспия с распределением прибыли:</span>
                  <span className="text-emerald-400 font-semibold">100% Халяль Соответствие</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {NUR_REAL_PROJECTS.map((proj) => (
                    <div
                      key={proj.id}
                      className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#FFD700]/30 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="px-2 py-0.5 text-[10px] font-bold rounded uppercase bg-amber-500/10 text-amber-300 border border-amber-500/20">
                            {proj.contractType} • {proj.category}
                          </span>
                          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                            <TrendingUp className="w-3.5 h-3.5" />
                            {proj.annualYieldPercentage}% APR
                          </span>
                        </div>

                        <h4 className="font-bold text-sm text-white mb-1">{proj.name}</h4>
                        <p className="text-xs text-slate-400 mb-3">{proj.location}</p>

                        <div className="space-y-1.5 text-xs text-slate-300 bg-black/30 p-3 rounded-xl mb-4">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Экологический эффект:</span>
                            <span className="text-emerald-300 flex items-center gap-1">
                              <Leaf className="w-3 h-3" /> -{proj.co2SavedTonsPerYear} т CO2/год
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Капитализация проекта:</span>
                            <span className="font-mono text-white">{proj.totalCapNur.toLocaleString()} NUR</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleInvestProject(proj)}
                        className="w-full py-2 bg-[#FFD700]/20 hover:bg-[#FFD700]/30 border border-[#FFD700]/40 text-[#FFD700] rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>Инвестировать 25,000 NUR</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-white/10">
                  <span>Реестр транзакций Zero-Riba (Хранится в IndexedDB):</span>
                  <button onClick={reloadTransactions} className="flex items-center gap-1 hover:text-white">
                    <RefreshCw className="w-3 h-3" /> Обновить
                  </button>
                </div>

                {transactions.length === 0 ? (
                  <div className="py-10 text-center text-slate-500 text-xs">
                    Транзакций пока нет.
                  </div>
                ) : (
                  transactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-4 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          tx.type === 'IMPACT_PROFIT_SHARE'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {tx.type === 'IMPACT_PROFIT_SHARE' ? (
                            <ArrowDownLeft className="w-4 h-4" />
                          ) : (
                            <ArrowUpRight className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-white text-sm">{tx.description}</div>
                          <div className="text-[11px] text-slate-400 font-mono">
                            {tx.timestamp} • Проект: {tx.project}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className={`font-mono font-bold text-sm ${
                          tx.type === 'IMPACT_PROFIT_SHARE' ? 'text-emerald-400' : 'text-slate-200'
                        }`}>
                          {tx.type === 'IMPACT_PROFIT_SHARE' ? '+' : '-'}
                          {tx.amount.toLocaleString()} NUR
                        </div>
                        <span className="text-[10px] text-amber-400/80 font-semibold">Zero-Riba Proof</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'zakat' && (
              <div className="max-w-xl mx-auto space-y-5 p-6 rounded-2xl bg-white/[0.02] border border-white/10 text-center">
                <div className="p-3 w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <HeartHandshake className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white">Калькулятор Закята (2.5%)</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Очищение имущества в соответствии с нормами Шариата. Нисаб составляет 8,500 NUR (эквивалент 85 грамм золота).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-left space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Общие активы, подлежащие Закяту:</span>
                    <span className="font-mono font-bold text-white">{totalBalance.toLocaleString()} NUR</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Порог Нисаба:</span>
                    <span className="font-mono text-slate-300">{zakatInfo.nisabThreshold.toLocaleString()} NUR</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/10 font-bold text-sm">
                    <span className="text-emerald-400">Сумма Закята к выплате (2.5%):</span>
                    <span className="font-mono text-emerald-300">{zakatInfo.zakatDue.toLocaleString()} NUR</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    handleInvestProject(NUR_REAL_PROJECTS[3]); // Qard Hasan / Waqf fund
                  }}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Выплатить Закят в Фонд Вакуфа ({zakatInfo.zakatDue.toLocaleString()} NUR)</span>
                </button>
              </div>
            )}
          </div>

          {/* WalletConnect QR Overlay */}
          {isWalletConnectModalOpen && (
            <div className="absolute inset-0 bg-black/90 z-20 flex flex-col items-center justify-center p-6 text-center">
              <div className="p-4 bg-white rounded-2xl mb-4 shadow-2xl">
                {/* Simulated QR Pattern */}
                <div className="w-48 h-48 bg-slate-900 rounded-xl p-2 flex flex-col items-center justify-center text-white">
                  <QrCode className="w-32 h-32 text-[#00D4FF]" />
                  <span className="text-[10px] font-mono mt-1 text-slate-400">wc:keymatrix_v2@caspian</span>
                </div>
              </div>

              <h4 className="text-sm font-bold text-white mb-1">Подключите кошелек через WalletConnect</h4>
              <p className="text-xs text-slate-400 max-w-sm mb-4">
                Отсканируйте QR-код мобильным приложением (MetaMask, Trust, KM Sovereign Identity) для безопасной подписи.
              </p>

              <button
                onClick={() => setIsWalletConnectModalOpen(false)}
                className="px-6 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white"
              >
                Закрыть
              </button>
            </div>
          )}

          {/* Footer */}
          <div className="px-6 py-3 border-t border-white/10 bg-black/40 flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono">DID: {walletAddress}</span>
            <button
              onClick={() => setNurWalletModalOpen(false)}
              className="px-4 py-1.5 bg-white/10 hover:bg-white/15 text-white rounded-lg transition-colors font-medium"
            >
              Закрыть
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
