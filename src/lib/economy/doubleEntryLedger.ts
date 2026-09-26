import CryptoJS from 'crypto-js';

export type AccountCategory = 'ASSET' | 'LIABILITY' | 'EQUITY' | 'INCOME' | 'EXPENSE';

export interface LedgerAccount {
  code: string;
  name: string;
  category: AccountCategory;
  description: string;
  balance: number; // In NUR units
  isRestricted?: boolean;
  shariahRule?: string;
}

export interface JournalLeg {
  accountCode: string;
  debit: number;
  credit: number;
  memo?: string;
}

export interface JournalEntry {
  entryId: string;
  sequenceNumber: number;
  timestamp: string;
  operationType:
    | 'SEND_RECEIVE'
    | 'GIFT_DONATION'
    | 'ESCROW_LOCK'
    | 'ESCROW_RELEASE'
    | 'ESCROW_REFUND'
    | 'PAYROLL_SIMULATION'
    | 'TREASURY_ALLOCATION'
    | 'DISPUTE_FREEZE'
    | 'DISPUTE_SETTLED'
    | 'CONTRIBUTION_REWARD_MINT'
    | 'MUDARABA_YIELD_DISTRIBUTION'
    | 'ZAKAT_DISTRIBUTION_8_CATEGORIES';
  description: string;
  initiatorDid: string;
  shuraApproved: boolean;
  legs: JournalLeg[];
  totalAmount: number;
  entryHash: string;
  prevEntryHash: string;
}

export interface TrialBalanceItem {
  code: string;
  name: string;
  category: AccountCategory;
  totalDebits: number;
  totalCredits: number;
  netDebit: number;
  netCredit: number;
}

export interface ReconciliationReport {
  timestamp: string;
  totalEntries: number;
  sumTotalDebits: number;
  sumTotalCredits: number;
  netDiscrepancy: number;
  isBalanced: boolean;
  merkleRoot: string;
  trialBalance: TrialBalanceItem[];
  status: 'RECONCILED_BALANCED' | 'DISCREPANCY_DETECTED';
  verdict: 'PASS' | 'FAIL';
}

/**
 * Standard KeyMatrix N2 Chart of Accounts
 */
export const CHART_OF_ACCOUNTS: Record<string, LedgerAccount> = {
  // ASSETS (1000 - 1999) - Normal Debit balance
  '1010': {
    code: '1010',
    name: 'Reserve Backing Vault (Solar / Water / Gold)',
    category: 'ASSET',
    description: '100% реальное обеспечение эмиссии экологическими и материальными активами',
    balance: 50000000,
    shariahRule: 'Mal Mutaqawwim (Дозволенное осязаемое имущество)',
  },
  '1020': {
    code: '1020',
    name: 'NUR Digital Cash Vault Float',
    category: 'ASSET',
    description: 'Центральный оборотный пул цифровой наличности NUR',
    balance: 15000000,
  },
  '1030': {
    code: '1030',
    name: 'Escrow Smart Holding Vault',
    category: 'ASSET',
    description: 'Изолированный эскроу-пул до исполнения контрактных обязательств',
    balance: 850000,
    isRestricted: true,
  },

  // LIABILITIES (2000 - 2999) - Normal Credit balance
  '2010': {
    code: '2010',
    name: 'User Sovereign Balances (Liquid Wallets)',
    category: 'LIABILITY',
    description: 'Суверенные текущие балансы участников и граждан KeyMatrix',
    balance: 14200000,
  },
  '2020': {
    code: '2020',
    name: 'Merchant & Node Settlement Accounts',
    category: 'LIABILITY',
    description: 'Обязательства перед торговыми шлюзами и операторами узлов',
    balance: 800000,
  },
  '2030': {
    code: '2030',
    name: 'Disputed Claims Holding Account',
    category: 'LIABILITY',
    description: 'Замороженные спорные средства до решения Арбитража Шуры',
    balance: 0,
    isRestricted: true,
  },

  // EQUITY / ENDOWMENTS (3000 - 3999) - Normal Credit balance
  '3010': {
    code: '3010',
    name: 'Asl al-Waqf (Inalienable Endowment Capital)',
    category: 'EQUITY',
    description: 'Неприкосновенное тело Вакфа. Расходованию не подлежит ни при каких условиях',
    balance: 35000000,
    isRestricted: true,
    shariahRule: 'Неприкосновенность Вакфа (Асль аль-Вакф ля йуба’ ва ля йувхаб)',
  },
  '3020': {
    code: '3020',
    name: 'Bayt al-Mal Public Treasury Reserve',
    category: 'EQUITY',
    description: 'Общественная казна для поддержания инфраструктуры и устойчивости',
    balance: 12000000,
  },
  '3030': {
    code: '3030',
    name: 'Zakat Fund Pool (8 Categories)',
    category: 'EQUITY',
    description: 'Целевой фонд Закята strictly по Ат-Тауба 9:60 с условием Тамлик',
    balance: 3850000,
    isRestricted: true,
    shariahRule: 'Surah At-Tawbah 9:60 + Tamlik',
  },

  // INCOME (4000 - 4999) - Normal Credit balance
  '4010': {
    code: '4010',
    name: 'Proven Contribution Value Minting',
    category: 'INCOME',
    description: 'Доход от подтвержденного вклада в образование, код и экологию',
    balance: 450000,
  },
  '4020': {
    code: '4020',
    name: 'Mudaraba Green Energy Project Yield',
    category: 'INCOME',
    description: 'Чистая доходность солнечных и ветряных парков Каспия',
    balance: 620000,
  },

  // EXPENSES (5000 - 5999) - Normal Debit balance
  '5010': {
    code: '5010',
    name: 'Zakat & Sadaqah Distribution (8 Categories)',
    category: 'EXPENSE',
    description: 'Прямые безвозмездные выплаты нуждающимся по 8 категориям',
    balance: 180000,
    shariahRule: '8 Категорий + Тамлик',
  },
  '5020': {
    code: '5020',
    name: 'Public Infrastructure Development Grants',
    category: 'EXPENSE',
    description: 'Гранты на развитие открытого протокола KeyMatrix M00-M16',
    balance: 240000,
  },
  '5030': {
    code: '5030',
    name: 'Emergency Relief & Family Burial Support',
    category: 'EXPENSE',
    description: 'Экстренная помощь семьям и покрытие расходов джаназа',
    balance: 50000,
  },
};

/**
 * Initial historical balanced journal entries
 */
const INITIAL_JOURNAL_ENTRIES: JournalEntry[] = [
  {
    entryId: 'JRNL-001',
    sequenceNumber: 1,
    timestamp: '2026-08-29T10:00:00.000Z',
    operationType: 'TREASURY_ALLOCATION',
    description: 'Капитализация Резервного фонда чистой энергии и Вакфа',
    initiatorDid: 'did:key:z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK',
    shuraApproved: true,
    totalAmount: 50000000,
    legs: [
      { accountCode: '1010', debit: 50000000, credit: 0, memo: 'Дебет резервного хранилища активов' },
      { accountCode: '3010', debit: 0, credit: 35000000, memo: 'Кредит капитала Вакф (Неприкосновенен)' },
      { accountCode: '3020', debit: 0, credit: 15000000, memo: 'Кредит Общественной Казны Байт аль-Мал' },
    ],
    prevEntryHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
    entryHash: '0x8f19da34c0e817bc8401e921d7b10293481230ab92138ef9120391ab10293847',
  },
  {
    entryId: 'JRNL-002',
    sequenceNumber: 2,
    timestamp: '2026-08-29T12:00:00.000Z',
    operationType: 'CONTRIBUTION_REWARD_MINT',
    description: 'Эмиссия NUR Reward за подтвержденное создание образовательного курса M14',
    initiatorDid: 'did:key:z6MkjTgpK3b98U8vQ7oP3Vq2E9L4hN1cM5gZ7rX3yW8aD6F',
    shuraApproved: true,
    totalAmount: 450000,
    legs: [
      { accountCode: '2010', debit: 0, credit: 450000, memo: 'Зачисление на кошельки контрибьюторов' },
      { accountCode: '4010', debit: 450000, credit: 0, memo: 'Признание ценности создания знаний' },
    ],
    prevEntryHash: '0x8f19da34c0e817bc8401e921d7b10293481230ab92138ef9120391ab10293847',
    entryHash: '0x99238ebc1092384a8b712394019284ba91283749019283749018239049182304',
  },
  {
    entryId: 'JRNL-003',
    sequenceNumber: 3,
    timestamp: '2026-08-29T14:30:00.000Z',
    operationType: 'ZAKAT_DISTRIBUTION_8_CATEGORIES',
    description: 'Выплата Закята по категории Аль-Фукара (Бедняки) с передачей права собственности (Тамлик)',
    initiatorDid: 'did:key:z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK',
    shuraApproved: true,
    totalAmount: 180000,
    legs: [
      { accountCode: '5010', debit: 180000, credit: 0, memo: 'Распределение Закята (Категория 1 - Фукара)' },
      { accountCode: '3030', debit: 0, credit: 180000, memo: 'Списание из пула Закята' },
    ],
    prevEntryHash: '0x99238ebc1092384a8b712394019284ba91283749019283749018239049182304',
    entryHash: '0x33918aef81923049102938475610293847561029384756102938475610293847',
  },
];

class ClosedLoopDoubleEntryLedger {
  private accounts: Record<string, LedgerAccount>;
  private journal: JournalEntry[];

  constructor() {
    this.accounts = JSON.parse(JSON.stringify(CHART_OF_ACCOUNTS));
    this.journal = [...INITIAL_JOURNAL_ENTRIES];
  }

  public getAccounts(): Record<string, LedgerAccount> {
    return this.accounts;
  }

  public getJournal(): JournalEntry[] {
    return this.journal;
  }

  /**
   * Adds and executes a balanced double-entry journal batch with strict validation
   */
  public createEntry(
    opType: JournalEntry['operationType'],
    description: string,
    legs: JournalLeg[],
    initiatorDid: string = 'did:key:z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK',
    shuraApproved: boolean = true
  ): JournalEntry {
    const totalDebits = legs.reduce((acc, l) => acc + (l.debit || 0), 0);
    const totalCredits = legs.reduce((acc, l) => acc + (l.credit || 0), 0);

    // 1. Strict invariant: Total Debits == Total Credits (to within micro-units)
    if (Math.abs(totalDebits - totalCredits) > 0.00001) {
      throw new Error(
        `[DOUBLE_ENTRY_VIOLATION] Несбалансированная проводка! Дебет=${totalDebits}, Кредит=${totalCredits}, Разница=${totalDebits - totalCredits}`
      );
    }

    if (totalDebits <= 0) {
      throw new Error('[DOUBLE_ENTRY_VIOLATION] Сумма проводки должна быть строго больше нуля.');
    }

    // 2. Shariah Invariant: Waqf capital cannot be debited for expenses
    for (const leg of legs) {
      if (leg.accountCode === '3010' && leg.debit > 0) {
        throw new Error(
          '[SHARIAH_VIOLATION] Запрещено уменьшать Асль аль-Вакф (Неприкосновенный капитал). Допустимо только распределение дохода.'
        );
      }
    }

    // 3. Update account balances according to standard accounting rules
    for (const leg of legs) {
      const acc = this.accounts[leg.accountCode];
      if (!acc) {
        throw new Error(`[UNKNOWN_ACCOUNT] Неизвестный код счета: ${leg.accountCode}`);
      }

      if (acc.category === 'ASSET' || acc.category === 'EXPENSE') {
        acc.balance += (leg.debit || 0) - (leg.credit || 0);
      } else {
        // LIABILITY, EQUITY, INCOME increase on Credit, decrease on Debit
        acc.balance += (leg.credit || 0) - (leg.debit || 0);
      }
    }

    const prevEntry = this.journal[this.journal.length - 1];
    const prevEntryHash = prevEntry ? prevEntry.entryHash : '0x0000000000000000000000000000000000000000000000000000000000000000';
    const sequenceNumber = this.journal.length + 1;

    const rawPayload = JSON.stringify({
      sequenceNumber,
      opType,
      description,
      initiatorDid,
      shuraApproved,
      legs,
      totalAmount: totalDebits,
      prevEntryHash,
    });

    const entryHash = `0x${CryptoJS.SHA256(rawPayload).toString(CryptoJS.enc.Hex)}`;

    const entry: JournalEntry = {
      entryId: `JRNL-${sequenceNumber.toString().padStart(3, '0')}`,
      sequenceNumber,
      timestamp: new Date().toISOString(),
      operationType: opType,
      description,
      initiatorDid,
      shuraApproved,
      legs,
      totalAmount: totalDebits,
      entryHash,
      prevEntryHash,
    };

    this.journal.push(entry);
    return entry;
  }

  /**
   * Scenario: Peer-to-Peer Zero-Riba Transfer
   */
  public executeSend(fromName: string, toName: string, amount: number): JournalEntry {
    return this.createEntry(
      'SEND_RECEIVE',
      `Прямой перевод ${amount.toLocaleString()} NUR: [${fromName}] -> [${toName}]`,
      [
        { accountCode: '2010', debit: amount, credit: 0, memo: `Списание со счета ${fromName}` },
        { accountCode: '2010', debit: 0, credit: amount, memo: `Зачисление на счет ${toName}` },
      ]
    );
  }

  /**
   * Scenario: Escrow Lock for Verified Milestone
   */
  public executeEscrowLock(buyerName: string, amount: number, milestoneName: string): JournalEntry {
    return this.createEntry(
      'ESCROW_LOCK',
      `Блокировка в Эскроу ${amount.toLocaleString()} NUR под майлстоун [${milestoneName}]`,
      [
        { accountCode: '2010', debit: amount, credit: 0, memo: `Списание со счета покупателя ${buyerName}` },
        { accountCode: '1030', debit: amount, credit: 0, memo: `Поступление в смарт-эскроу сейф` },
        { accountCode: '2010', debit: 0, credit: 0, memo: `Фиксация условного обязательства` },
      ].filter((l) => l.debit > 0 || l.credit > 0)
    );
  }

  /**
   * Scenario: Escrow Release upon Shura-verified proof
   */
  public executeEscrowRelease(sellerName: string, amount: number, milestoneName: string): JournalEntry {
    return this.createEntry(
      'ESCROW_RELEASE',
      `Исполнение майлстоуна [${milestoneName}]: Выплата ${amount.toLocaleString()} NUR исполнителю [${sellerName}]`,
      [
        { accountCode: '1030', debit: 0, credit: amount, memo: `Списание из смарт-эскроу сейфа` },
        { accountCode: '2010', debit: 0, credit: amount, memo: `Зачисление на счет исполнителя ${sellerName}` },
      ]
    );
  }

  /**
   * Scenario: Payroll Run with Proof-of-Contribution Evidence
   */
  public executePayrollBatch(department: string, totalAmount: number, employeeCount: number): JournalEntry {
    return this.createEntry(
      'PAYROLL_SIMULATION',
      `Выплата вознаграждения по верифицированным работам [${department}] (${employeeCount} инженеров/учителей)`,
      [
        { accountCode: '5020', debit: totalAmount, credit: 0, memo: `Грант на зарплатный фонд ${department}` },
        { accountCode: '2010', debit: 0, credit: totalAmount, memo: `Начисление на суверенные кошельки сотрудников` },
      ]
    );
  }

  /**
   * Scenario: Dispute Resolution Freeze
   */
  public executeDisputeFreeze(userName: string, amount: number, claimId: string): JournalEntry {
    return this.createEntry(
      'DISPUTE_FREEZE',
      `Заморозка спорной суммы ${amount.toLocaleString()} NUR по претензии #${claimId}`,
      [
        { accountCode: '2010', debit: amount, credit: 0, memo: `Временное удержание со счета ${userName}` },
        { accountCode: '2030', debit: 0, credit: amount, memo: `Помещение на счет спорных требований` },
      ]
    );
  }

  /**
   * Scenario: Dispute Arbitrated Resolution
   */
  public executeDisputeResolve(claimantName: string, amount: number, claimId: string): JournalEntry {
    return this.createEntry(
      'DISPUTE_SETTLED',
      `Решение Шуры по спору #${claimId}: Выплата компенсации ${amount.toLocaleString()} NUR стороне [${claimantName}]`,
      [
        { accountCode: '2030', debit: amount, credit: 0, memo: `Разблокировка из пула споров` },
        { accountCode: '2010', debit: 0, credit: amount, memo: `Зачисление правомерному владельцу ${claimantName}` },
      ]
    );
  }

  /**
   * Scenario: Minting Reward based on Proven Impact (NUR Engine)
   */
  public executeContributionMint(contributor: string, valueType: string, amount: number): JournalEntry {
    return this.createEntry(
      'CONTRIBUTION_REWARD_MINT',
      `Минтинг вознаграждения NUR за подтвержденный вклад [${valueType}] (${amount} NUR) для [${contributor}]`,
      [
        { accountCode: '4010', debit: amount, credit: 0, memo: `Признание ценности создания [${valueType}]` },
        { accountCode: '2010', debit: 0, credit: amount, memo: `Эмиссия NUR на кошелек контрибьютора ${contributor}` },
      ]
    );
  }

  /**
   * Calculates comprehensive Trial Balance and Merkle Reconciliation
   */
  public reconcileLedger(): ReconciliationReport {
    let sumTotalDebits = 0;
    let sumTotalCredits = 0;

    const trialBalance: TrialBalanceItem[] = Object.values(this.accounts).map((acc) => {
      // Calculate debits and credits for this account from journal
      let debits = 0;
      let credits = 0;

      for (const entry of this.journal) {
        for (const leg of entry.legs) {
          if (leg.accountCode === acc.code) {
            debits += leg.debit || 0;
            credits += leg.credit || 0;
          }
        }
      }

      sumTotalDebits += debits;
      sumTotalCredits += credits;

      const netDebit = debits > credits ? debits - credits : 0;
      const netCredit = credits > debits ? credits - debits : 0;

      return {
        code: acc.code,
        name: acc.name,
        category: acc.category,
        totalDebits: debits,
        totalCredits: credits,
        netDebit,
        netCredit,
      };
    });

    const netDiscrepancy = Math.abs(sumTotalDebits - sumTotalCredits);
    const isBalanced = netDiscrepancy < 0.0001;

    // Compute Merkle Root of all journal entry hashes
    const entryHashes = this.journal.map((e) => e.entryHash);
    const merkleRoot = `mrk_ledger_0x${CryptoJS.SHA256(entryHashes.join(':')).toString(CryptoJS.enc.Hex).substring(0, 32)}`;

    return {
      timestamp: new Date().toISOString(),
      totalEntries: this.journal.length,
      sumTotalDebits,
      sumTotalCredits,
      netDiscrepancy,
      isBalanced,
      merkleRoot,
      trialBalance,
      status: isBalanced ? 'RECONCILED_BALANCED' : 'DISCREPANCY_DETECTED',
      verdict: isBalanced ? 'PASS' : 'FAIL',
    };
  }
}

export const doubleEntryLedger = new ClosedLoopDoubleEntryLedger();
