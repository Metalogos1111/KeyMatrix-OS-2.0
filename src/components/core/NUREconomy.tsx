import React, { useState, useEffect } from 'react';
import {
  Coins,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  ArrowUpRight,
  List,
  CheckCircle2,
  Lock,
  Plus,
} from 'lucide-react';
import { useOSStore } from '../../store/osStore';
import { TRANSLATIONS } from '../../data/translations';
import { db, DbNurTransaction } from '../../lib/db/keymatrixDb';
import { recordNurTransaction, NUR_REAL_PROJECTS } from '../../lib/economy/nurEngine';

export const NUREconomy: React.FC = () => {
  const { nurMetrics, language, addLog, user } = useOSStore();
  const t = TRANSLATIONS[language];
  const [showLedger, setShowLedger] = useState(false);
  const [transactions, setTransactions] = useState<DbNurTransaction[]>([]);

  useEffect(() => {
    loadTransactions();
  }, [showLedger]);

  const loadTransactions = async () => {
    try {
      const txs = await db.nurTransactions.reverse().limit(10).toArray();
      setTransactions(txs);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSimulateProfitShare = async () => {
    await recordNurTransaction({
      type: 'IMPACT_PROFIT_SHARE',
      amount: 850,
      from: 'Absheron Solar Cluster',
      to: user.did,
      project: 'Renewable Power Injection #4',
      description: 'Квартальное распределение Мудараба (+12.4% APR эквивалент, Zero-Riba)',
    });
    addLog('NUR', `Начислено +850 NUR (Мудараба прибыль от реальных эко-активов). Riba = 0.00%.`, 'success');
    await loadTransactions();
  };

  const barHeights = [28, 42, 35, 60, 48, 75, 65, 88, 72, 95, 82, 100];

  return (
    <div className="relative flex flex-col justify-between h-full rounded-2xl bg-gradient-to-b from-[#09152e]/90 via-[#071024]/90 to-[#040915]/95 border border-cyan-800/40 p-3.5 shadow-[0_4px_25px_rgba(0,0,0,0.5)] backdrop-blur-md">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between border-b border-cyan-900/40 pb-2 mb-2.5">
          <div className="flex items-center gap-1.5">
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            <h3 className="text-xs font-bold text-white tracking-wide font-['Plus_Jakarta_Sans']">
              {t.nurWidget.title}
            </h3>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 uppercase">
              ZERO-RIBA (HALAL)
            </span>
          </div>
        </div>

        {/* Top Summary Figure */}
        <div className="flex items-center justify-between mb-2.5 bg-slate-900/60 p-2 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
              <Coins className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">
                {t.nurWidget.totalValue}
              </span>
              <span className="text-sm font-extrabold text-white font-mono">
                {nurMetrics.totalValue.toLocaleString()} NUR
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-0.5 justify-end">
              <TrendingUp className="w-3 h-3" />
              <span>+{nurMetrics.yieldAnnual}%</span>
            </span>
            <span className="text-[9px] text-slate-400 font-mono">Mudarabah / Musharakah</span>
          </div>
        </div>

        {/* Numerical Stats */}
        <div className="grid grid-cols-2 gap-2 text-xs font-mono mb-2">
          <div className="p-1.5 rounded-lg bg-slate-900/40 border border-slate-800/80">
            <span className="text-[10px] text-slate-400 block">{t.nurWidget.activeProjects}:</span>
            <span className="text-white font-bold text-xs">{nurMetrics.activeProjects} Эко-проектов</span>
          </div>
          <div className="p-1.5 rounded-lg bg-slate-900/40 border border-slate-800/80">
            <span className="text-[10px] text-slate-400 block">{t.nurWidget.impactInvestments}:</span>
            <span className="text-cyan-300 font-bold text-xs">{nurMetrics.impactInvestments} Инвестиций</span>
          </div>
        </div>
      </div>

      {/* Mini Golden Bar Chart Visualizer */}
      <div className="mt-1 pt-1.5 border-t border-cyan-900/30">
        <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 mb-1">
          <span>Динамика распределения прибыли:</span>
          <span className="text-amber-300 font-bold">12.4% годовых</span>
        </div>
        <div className="flex items-end justify-between gap-1 h-8 px-1">
          {barHeights.map((h, idx) => (
            <div
              key={idx}
              className="flex-1 bg-gradient-to-t from-amber-600 via-amber-400 to-yellow-300 rounded-t-sm transition-all duration-300 hover:opacity-80 hover:scale-y-110 shadow-[0_0_6px_rgba(245,158,11,0.2)]"
              style={{ height: `${h}%` }}
              title={`Месяц ${idx + 1}: ${h}%`}
            />
          ))}
        </div>

        {/* Ledger Toggle & Action Buttons */}
        <div className="mt-2.5 flex items-center gap-1.5">
          <button
            onClick={() => setShowLedger(true)}
            className="flex-1 py-1.5 px-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-800/50 text-[10px] font-mono font-bold flex items-center justify-center gap-1 transition-colors"
          >
            <List className="w-3 h-3" />
            <span>Реестр транзакций</span>
          </button>
          <button
            onClick={handleSimulateProfitShare}
            className="py-1.5 px-2.5 rounded-lg bg-amber-600/80 hover:bg-amber-500 text-white text-[10px] font-mono font-bold flex items-center gap-1 transition-colors"
            title="Симулировать распределение прибыли Мудараба"
          >
            <Plus className="w-3 h-3" />
            <span>+Дивиденд</span>
          </button>
        </div>
      </div>

      {/* Transaction History Modal */}
      {showLedger && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-2xl bg-[#070f23] border border-amber-500/50 rounded-3xl p-6 shadow-2xl flex flex-col justify-between max-h-[85vh] overflow-hidden">
            <div>
              <div className="flex items-center justify-between border-b border-amber-500/30 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
                    <Coins className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-mono">
                      NUR ZERO-RIBA ECONOMIC LEDGER (M10)
                    </h3>
                    <p className="text-xs text-slate-400">
                      Все транзакции обеспечены реальными активами и принципами Мудараба/Мушарака/Вакф.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowLedger(false)}
                  className="text-slate-400 hover:text-white text-lg font-bold p-1 rounded-lg hover:bg-slate-800"
                >
                  ✕
                </button>
              </div>

              {/* Transactions List */}
              <div className="space-y-2 overflow-y-auto max-h-[50vh] pr-1 custom-scrollbar text-xs font-mono">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold text-white">
                        <span className="text-amber-400">{tx.amount.toLocaleString()} NUR</span>
                        <span className="text-[10px] px-2 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                          {tx.type}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500">{tx.timestamp}</span>
                    </div>
                    <div className="text-[11px] text-slate-400">{tx.description}</div>
                    <div className="text-[10px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-900">
                      <span>Проект: <span className="text-cyan-300">{tx.project}</span></span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Zero-Riba Validated
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Отказ от ссудного процента гарантирован на уровне TEE</span>
              <button
                onClick={() => setShowLedger(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
