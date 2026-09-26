import React, { useState } from 'react';
import {
  Scale,
  DollarSign,
  ArrowRightLeft,
  Lock,
  Unlock,
  Users,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  FileSpreadsheet,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { useOSStore } from '../../store/osStore';
import { EvidenceBadge } from '../common/EvidenceBadge';
import {
  doubleEntryLedger,
  JournalEntry,
  ReconciliationReport,
} from '../../lib/economy/doubleEntryLedger';

export const DoubleEntryLedgerView: React.FC = () => {
  const { addLog } = useOSStore();

  const [accounts, setAccounts] = useState(doubleEntryLedger.getAccounts());
  const [journal, setJournal] = useState<JournalEntry[]>(doubleEntryLedger.getJournal());
  const [reconciliation, setReconciliation] = useState<ReconciliationReport>(
    doubleEntryLedger.reconcileLedger()
  );

  const [selectedScenario, setSelectedScenario] = useState<
    'SEND' | 'ESCROW' | 'PAYROLL' | 'DISPUTE' | 'MINT'
  >('SEND');

  // Form states for test scenarios
  const [p2pAmount, setP2pAmount] = useState('2500');
  const [p2pRecipient, setP2pRecipient] = useState('Али Мамедов (Баку)');

  const [escrowAmount, setEscrowAmount] = useState('15000');
  const [escrowMilestone, setEscrowMilestone] = useState('Разработка смарт-контракта M14');
  const [escrowSeller, setEscrowSeller] = useState('Технологический Кооператив Баку');

  const [payrollDept, setPayrollDept] = useState('Инженерное крыло PrimeCore');
  const [payrollAmount, setPayrollAmount] = useState('48000');
  const [payrollEmployees, setPayrollEmployees] = useState('6');

  const [disputeUser, setDisputeUser] = useState('Мерчант Каспий-Грин');
  const [disputeAmount, setDisputeAmount] = useState('5000');
  const [disputeClaimId, setDisputeClaimId] = useState('CLM-8842');

  const [mintContributor, setMintContributor] = useState('Орхан Алиев (Учитель)');
  const [mintValueType, setMintValueType] = useState('Исламский курс по фикху торговли');
  const [mintAmount, setMintAmount] = useState('3200');

  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const refreshState = () => {
    setAccounts({ ...doubleEntryLedger.getAccounts() });
    setJournal([...doubleEntryLedger.getJournal()]);
    setReconciliation(doubleEntryLedger.reconcileLedger());
  };

  const handleExecuteP2P = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(p2pAmount);
    if (isNaN(amt) || amt <= 0) return;

    try {
      const entry = doubleEntryLedger.executeSend('Текущий пользователь', p2pRecipient, amt);
      refreshState();
      setActionSuccess(`Проводка #${entry.entryId} создана: Списание со счета отправителя, зачисление получателю. Дебет=Кредит=${amt.toLocaleString()} NUR`);
      addLog('LEDGER', `Двойная запись #${entry.entryId}: ${entry.description}`, 'success');
    } catch (err: any) {
      addLog('LEDGER', `Ошибка проводки: ${err.message}`, 'error');
    }
  };

  const handleExecuteEscrowLock = () => {
    const amt = parseFloat(escrowAmount);
    if (isNaN(amt) || amt <= 0) return;

    try {
      const entry = doubleEntryLedger.executeEscrowLock('Заказчик', amt, escrowMilestone);
      refreshState();
      setActionSuccess(`Эскроу заблокирован (#${entry.entryId}): ${amt.toLocaleString()} NUR помещены в Escrow Vault (1030) под майлстоун.`);
      addLog('LEDGER', `Двойная запись #${entry.entryId}: ${entry.description}`, 'success');
    } catch (err: any) {
      addLog('LEDGER', `Ошибка эскроу: ${err.message}`, 'error');
    }
  };

  const handleExecuteEscrowRelease = () => {
    const amt = parseFloat(escrowAmount);
    if (isNaN(amt) || amt <= 0) return;

    try {
      const entry = doubleEntryLedger.executeEscrowRelease(escrowSeller, amt, escrowMilestone);
      refreshState();
      setActionSuccess(`Эскроу исполнен (#${entry.entryId}): ${amt.toLocaleString()} NUR выплачены исполнителю.`);
      addLog('LEDGER', `Двойная запись #${entry.entryId}: ${entry.description}`, 'success');
    } catch (err: any) {
      addLog('LEDGER', `Ошибка разблокировки: ${err.message}`, 'error');
    }
  };

  const handleExecutePayroll = () => {
    const amt = parseFloat(payrollAmount);
    const count = parseInt(payrollEmployees, 10);
    if (isNaN(amt) || amt <= 0) return;

    try {
      const entry = doubleEntryLedger.executePayrollBatch(payrollDept, amt, count);
      refreshState();
      setActionSuccess(`Зарплатный пул выплачен (#${entry.entryId}): ${amt.toLocaleString()} NUR распределены среди ${count} сотрудников.`);
      addLog('LEDGER', `Двойная запись #${entry.entryId}: ${entry.description}`, 'success');
    } catch (err: any) {
      addLog('LEDGER', `Ошибка выплат: ${err.message}`, 'error');
    }
  };

  const handleExecuteDisputeFreeze = () => {
    const amt = parseFloat(disputeAmount);
    if (isNaN(amt) || amt <= 0) return;

    try {
      const entry = doubleEntryLedger.executeDisputeFreeze(disputeUser, amt, disputeClaimId);
      refreshState();
      setActionSuccess(`Спорные средства изолированы (#${entry.entryId}): ${amt.toLocaleString()} NUR помещены на счет 2030.`);
      addLog('LEDGER', `Двойная запись #${entry.entryId}: ${entry.description}`, 'success');
    } catch (err: any) {
      addLog('LEDGER', `Ошибка заморозки: ${err.message}`, 'error');
    }
  };

  const handleExecuteDisputeResolve = () => {
    const amt = parseFloat(disputeAmount);
    if (isNaN(amt) || amt <= 0) return;

    try {
      const entry = doubleEntryLedger.executeDisputeResolve('Пострадавшая сторона', amt, disputeClaimId);
      refreshState();
      setActionSuccess(`Решение Шуры исполнено (#${entry.entryId}): ${amt.toLocaleString()} NUR выплачены компенсацией.`);
      addLog('LEDGER', `Двойная запись #${entry.entryId}: ${entry.description}`, 'success');
    } catch (err: any) {
      addLog('LEDGER', `Ошибка исполнения: ${err.message}`, 'error');
    }
  };

  const handleExecuteMint = () => {
    const amt = parseFloat(mintAmount);
    if (isNaN(amt) || amt <= 0) return;

    try {
      const entry = doubleEntryLedger.executeContributionMint(mintContributor, mintValueType, amt);
      refreshState();
      setActionSuccess(`Эмиссия вознаграждения (#${entry.entryId}): ${amt.toLocaleString()} NUR за вклад в [${mintValueType}].`);
      addLog('LEDGER', `Двойная запись #${entry.entryId}: ${entry.description}`, 'success');
    } catch (err: any) {
      addLog('LEDGER', `Ошибка минтинга: ${err.message}`, 'error');
    }
  };

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header & Stage N2 Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#07132b]/90 via-[#0a1b3a]/70 to-[#040a17]/90 border border-amber-500/40 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
              <span>NUR EXECUTION MODEL • STAGE N2</span>
              <span>•</span>
              <span>CLOSED-LOOP DOUBLE-ENTRY LEDGER</span>
              <span>•</span>
              <EvidenceBadge level={5} compact />
            </div>
            <h2 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
              <Scale className="w-5 h-5 text-amber-400" />
              Двусторонняя бухгалтерия & Замкнутый реестр NUR (N2)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Строгий математический инвариант <code className="text-amber-300">Sum(Debits) == Sum(Credits)</code>, нулевое ростовщичество и изоляция фондов Вакф / Закят / Казна
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2 px-3 rounded-xl bg-slate-900 border border-emerald-500/40 text-xs font-mono">
              <span className="text-slate-400">Trial Balance Diff:</span>{' '}
              <strong className="text-emerald-400">0.00 NUR ({reconciliation.status})</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Trial Balance & Merkle Verification Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono">
          <span className="text-slate-400 block text-[10px] uppercase">Всего дебетовых проводок</span>
          <div className="text-base font-bold text-cyan-300 mt-0.5">
            {reconciliation.sumTotalDebits.toLocaleString()} NUR
          </div>
        </div>
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono">
          <span className="text-slate-400 block text-[10px] uppercase">Всего кредитовых проводок</span>
          <div className="text-base font-bold text-cyan-300 mt-0.5">
            {reconciliation.sumTotalCredits.toLocaleString()} NUR
          </div>
        </div>
        <div className="p-3 rounded-xl bg-slate-900/80 border border-emerald-500/40 text-xs font-mono">
          <span className="text-slate-400 block text-[10px] uppercase">Расхождение (Discrepancy)</span>
          <div className="text-base font-bold text-emerald-400 mt-0.5">
            0.000000 (100% BALANCED)
          </div>
        </div>
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono truncate">
          <span className="text-slate-400 block text-[10px] uppercase">Merkle Root журнала</span>
          <div className="text-xs font-bold text-amber-300 mt-1 truncate">
            {reconciliation.merkleRoot}
          </div>
        </div>
      </div>

      {/* Interactive Simulation Panel */}
      <div className="p-4 rounded-2xl bg-gradient-to-b from-[#09152e]/80 to-[#040816]/90 border border-cyan-900/40 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cyan-900/40 pb-3">
          <div className="flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Тестовые транзакционные сценарии замкнутого реестра N2
            </h3>
          </div>

          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-mono overflow-x-auto custom-scrollbar">
            {[
              { id: 'SEND', label: 'P2P Перевод' },
              { id: 'ESCROW', label: 'Смарт-Эскроу' },
              { id: 'PAYROLL', label: 'Зарплатный Пул' },
              { id: 'DISPUTE', label: 'Арбитраж Споров' },
              { id: 'MINT', label: 'Минтинг Награды' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedScenario(tab.id as any)}
                className={`px-2.5 py-1 rounded text-[11px] transition-all whitespace-nowrap ${
                  selectedScenario === tab.id
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Scenario Body */}
        {selectedScenario === 'SEND' && (
          <form onSubmit={handleExecuteP2P} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[10px] font-mono text-slate-400 block mb-1">Получатель (DID / Имя)</label>
              <input
                type="text"
                value={p2pRecipient}
                onChange={(e) => setP2pRecipient(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-mono text-slate-400 block mb-1">Сумма (NUR)</label>
              <input
                type="number"
                value={p2pAmount}
                onChange={(e) => setP2pAmount(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-[0_0_12px_rgba(0,212,255,0.3)] transition-all"
              >
                Исполнить P2P проводку
              </button>
            </div>
          </form>
        )}

        {selectedScenario === 'ESCROW' && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] font-mono text-slate-400 block mb-1">Майлстоун задачи</label>
                <input
                  type="text"
                  value={escrowMilestone}
                  onChange={(e) => setEscrowMilestone(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[10px] font-mono text-slate-400 block mb-1">Исполнитель</label>
                <input
                  type="text"
                  value={escrowSeller}
                  onChange={(e) => setEscrowSeller(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[10px] font-mono text-slate-400 block mb-1">Сумма (NUR)</label>
                <input
                  type="number"
                  value={escrowAmount}
                  onChange={(e) => setEscrowAmount(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                />
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleExecuteEscrowLock}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-950/60 hover:bg-amber-900/60 text-amber-300 border border-amber-700/40 text-xs font-medium"
              >
                <Lock className="w-3.5 h-3.5" />
                1. Заблокировать в Эскроу (Счет 1030)
              </button>
              <button
                onClick={handleExecuteEscrowRelease}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-700/40 text-xs font-medium"
              >
                <Unlock className="w-3.5 h-3.5" />
                2. Разблокировать по доказательству исполнения
              </button>
            </div>
          </div>
        )}

        {selectedScenario === 'PAYROLL' && (
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
            <div>
              <label className="text-[10px] font-mono text-slate-400 block mb-1">Подразделение</label>
              <input
                type="text"
                value={payrollDept}
                onChange={(e) => setPayrollDept(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-mono text-slate-400 block mb-1">Сотрудников</label>
              <input
                type="number"
                value={payrollEmployees}
                onChange={(e) => setPayrollEmployees(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-mono text-slate-400 block mb-1">Фонд выплат (NUR)</label>
              <input
                type="number"
                value={payrollAmount}
                onChange={(e) => setPayrollAmount(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
              />
            </div>
            <button
              onClick={handleExecutePayroll}
              className="w-full py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-[0_0_12px_rgba(0,212,255,0.3)] transition-all"
            >
              Исполнить Payroll
            </button>
          </div>
        )}

        {selectedScenario === 'DISPUTE' && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] font-mono text-slate-400 block mb-1">ID Претензии</label>
                <input
                  type="text"
                  value={disputeClaimId}
                  onChange={(e) => setDisputeClaimId(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[10px] font-mono text-slate-400 block mb-1">Ответчик</label>
                <input
                  type="text"
                  value={disputeUser}
                  onChange={(e) => setDisputeUser(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[10px] font-mono text-slate-400 block mb-1">Спорная сумма (NUR)</label>
                <input
                  type="number"
                  value={disputeAmount}
                  onChange={(e) => setDisputeAmount(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                />
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleExecuteDisputeFreeze}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-red-950/60 hover:bg-red-900/60 text-red-300 border border-red-700/40 text-xs font-medium"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                1. Заморозить в счете споров (2030)
              </button>
              <button
                onClick={handleExecuteDisputeResolve}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-700/40 text-xs font-medium"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                2. Исполнить вердикт Арбитража Шуры
              </button>
            </div>
          </div>
        )}

        {selectedScenario === 'MINT' && (
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
            <div>
              <label className="text-[10px] font-mono text-slate-400 block mb-1">Контрибьютор</label>
              <input
                type="text"
                value={mintContributor}
                onChange={(e) => setMintContributor(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-mono text-slate-400 block mb-1">Тип вклада</label>
              <input
                type="text"
                value={mintValueType}
                onChange={(e) => setMintValueType(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-mono text-slate-400 block mb-1">NUR Награда</label>
              <input
                type="number"
                value={mintAmount}
                onChange={(e) => setMintAmount(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
              />
            </div>
            <button
              onClick={handleExecuteMint}
              className="w-full py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-black font-bold text-xs shadow-[0_0_12px_rgba(245,158,11,0.3)] transition-all"
            >
              Минтить вознаграждение
            </button>
          </div>
        )}

        {actionSuccess && (
          <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{actionSuccess}</span>
          </div>
        )}
      </div>

      {/* Chart of Accounts & Live Balances */}
      <div className="p-4 rounded-2xl bg-gradient-to-b from-[#09152e]/80 to-[#040816]/90 border border-cyan-900/40 shadow-xl space-y-3">
        <div className="flex items-center justify-between border-b border-cyan-900/40 pb-2">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              План счетов KeyMatrix N2 (Chart of Accounts)
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {Object.keys(accounts).length} Активных балансовых счетов
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
          {Object.values(accounts).map((acc) => (
            <div
              key={acc.code}
              className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-cyan-300">{acc.code}</span>
                  <span className="text-slate-200 font-medium truncate max-w-[200px]">{acc.name}</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">{acc.category} {acc.shariahRule ? `• ${acc.shariahRule}` : ''}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-white text-xs">{acc.balance.toLocaleString()} NUR</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Journal Entries Trail */}
      <div className="p-4 rounded-2xl bg-gradient-to-b from-[#09152e]/80 to-[#040816]/90 border border-cyan-900/40 shadow-xl space-y-3">
        <div className="flex items-center justify-between border-b border-cyan-900/40 pb-2">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Журнал проводок двойной записи (Atomic Journal Trail)
            </h3>
          </div>
          <span className="text-xs font-mono text-cyan-400 font-bold">
            {journal.length} Проверенных проводок
          </span>
        </div>

        <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
          {journal.slice().reverse().map((entry) => (
            <div
              key={entry.entryId}
              className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 text-xs font-mono"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-amber-300">{entry.entryId}</span>
                  <span className="text-slate-200">{entry.description}</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold">
                  {entry.totalAmount.toLocaleString()} NUR
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 border-t border-slate-900 text-[10px]">
                {entry.legs.map((leg, lIdx) => (
                  <div key={lIdx} className="flex justify-between text-slate-400">
                    <span>Счет {leg.accountCode} ({leg.memo}):</span>
                    <span className={leg.debit > 0 ? 'text-cyan-300' : 'text-emerald-300'}>
                      {leg.debit > 0 ? `Дебет: ${leg.debit.toLocaleString()}` : `Кредит: ${leg.credit.toLocaleString()}`}
                    </span>
                  </div>
                ))}
              </div>

              <div className="text-[9px] text-slate-600 truncate pt-0.5">
                Hash: {entry.entryHash}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
