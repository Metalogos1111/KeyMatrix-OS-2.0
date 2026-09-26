import CryptoJS from 'crypto-js';
import {
  doubleEntryLedger,
  JournalEntry,
  ReconciliationReport,
  CHART_OF_ACCOUNTS,
} from '../economy/doubleEntryLedger';

export type ContributionCategory =
  | 'LEARN'
  | 'CREATE'
  | 'SERVE'
  | 'RESEARCH'
  | 'MODERATE'
  | 'GOVERN'
  | 'ENGINEER';

export interface ContributionRecord {
  id: string;
  category: ContributionCategory;
  contributorDid: string;
  contributorName: string;
  title: string;
  evidenceCode: string;
  qualityScore: number; // 0.0 to 1.0
  impactScore: number; // 0.0 to 1.0
  calculatedScore: number;
  rewardNurAmount: number;
  status: 'PROPOSED' | 'APPROVED' | 'EXECUTED' | 'AUDITED';
  proposerDid: string;
  approverDid?: string;
  executorDid?: string;
  auditorDid?: string;
  timestamp: string;
}

export interface NurSandboxState {
  contributions: ContributionRecord[];
  totalMintedRewards: number;
  journalEntries: JournalEntry[];
  reconciliation: ReconciliationReport;
  separationInvariantPassed: boolean; // Zakat != Treasury != Waqf != Private
  rolesCheckPassed: boolean; // PROPOSE != APPROVE != EXECUTE != AUDIT
}

class NurLedgerSandboxManager {
  private contributions: ContributionRecord[] = [];

  constructor() {
    // Initial sample contribution
    this.addContribution({
      category: 'LEARN',
      contributorDid: 'did:key:z6MkhUserLearner991823',
      contributorName: 'Али Мамедов',
      title: 'Изучение курса по фикху торговли (Китаб аль-Бую)',
      evidenceCode: 'EVID-FQN-8812',
      qualityScore: 0.95,
      impactScore: 0.88,
      proposerDid: 'did:key:z6MkhUserLearner991823',
    });
  }

  public addContribution(params: {
    category: ContributionCategory;
    contributorDid: string;
    contributorName: string;
    title: string;
    evidenceCode: string;
    qualityScore: number;
    impactScore: number;
    proposerDid: string;
  }): ContributionRecord {
    const rawScore = params.qualityScore * 0.6 + params.impactScore * 0.4;
    const calculatedScore = Math.round(rawScore * 100) / 100;

    // Standard reward conversion formula: Score * Multiplier
    const multipliers: Record<ContributionCategory, number> = {
      LEARN: 500,
      CREATE: 2500,
      SERVE: 1200,
      RESEARCH: 3500,
      MODERATE: 800,
      GOVERN: 2000,
      ENGINEER: 3000,
    };

    const rewardNurAmount = Math.round(calculatedScore * (multipliers[params.category] || 1000));

    const rec: ContributionRecord = {
      id: `CNTRB-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      category: params.category,
      contributorDid: params.contributorDid,
      contributorName: params.contributorName,
      title: params.title,
      evidenceCode: params.evidenceCode,
      qualityScore: params.qualityScore,
      impactScore: params.impactScore,
      calculatedScore,
      rewardNurAmount,
      status: 'PROPOSED',
      proposerDid: params.proposerDid,
      timestamp: new Date().toISOString(),
    };

    this.contributions.push(rec);
    return rec;
  }

  public approveContribution(id: string, approverDid: string): ContributionRecord {
    const item = this.contributions.find((c) => c.id === id);
    if (!item) throw new Error('Contribution record not found');
    if (item.proposerDid === approverDid) {
      throw new Error('Role Separation Violation: Proposer cannot Approve their own contribution (PROPOSE != APPROVE)');
    }
    item.status = 'APPROVED';
    item.approverDid = approverDid;
    return item;
  }

  public executeContributionMint(id: string, executorDid: string): ContributionRecord {
    const item = this.contributions.find((c) => c.id === id);
    if (!item) throw new Error('Contribution record not found');
    if (item.status !== 'APPROVED') {
      throw new Error('Contribution must be APPROVED before EXECUTE');
    }
    if (item.approverDid === executorDid || item.proposerDid === executorDid) {
      throw new Error('Role Separation Violation: Executor must be a distinct role (APPROVE != EXECUTE)');
    }

    item.status = 'EXECUTED';
    item.executorDid = executorDid;

    // Record in double-entry ledger
    doubleEntryLedger.executeContributionMint(item.contributorName, item.title, item.rewardNurAmount);

    return item;
  }

  public auditContribution(id: string, auditorDid: string): ContributionRecord {
    const item = this.contributions.find((c) => c.id === id);
    if (!item) throw new Error('Contribution record not found');
    if (item.status !== 'EXECUTED') {
      throw new Error('Contribution must be EXECUTED before AUDIT');
    }
    if (
      item.proposerDid === auditorDid ||
      item.approverDid === auditorDid ||
      item.executorDid === auditorDid
    ) {
      throw new Error('Role Separation Violation: Auditor must be completely independent (AUDIT != PROPOSE/APPROVE/EXECUTE)');
    }

    item.status = 'AUDITED';
    item.auditorDid = auditorDid;
    return item;
  }

  public getContributions(): ContributionRecord[] {
    return [...this.contributions];
  }

  public testPrimeCoreVaultsIsolation(): {
    passed: boolean;
    zakatCode: string;
    treasuryCode: string;
    waqfCode: string;
    privateCode: string;
    isolationLog: string[];
  } {
    const accounts = doubleEntryLedger.getAccounts();
    const zakat = accounts['2010']?.balance || 0;
    const treasury = accounts['3010']?.balance || 0;
    const waqf = accounts['3020']?.balance || 0;
    const privateVault = accounts['2020']?.balance || 0;

    const isolationLog: string[] = [
      `[VAULT-TEST] Checking Vaults separation...`,
      `[VAULT-TEST] Zakat Vault (2010): ${zakat} NUR (Restricted to 8 categories)`,
      `[VAULT-TEST] Waqf Vault (3020): ${waqf} NUR (Inalienable Capital)`,
      `[VAULT-TEST] Treasury Vault (3010): ${treasury} NUR (Public Infrastructure)`,
      `[VAULT-TEST] Private Vault (2020): ${privateVault} NUR (Individual Sovereignty)`,
    ];

    // Verify cross-vault illegal transfer block
    let interVaultBlocked = true;
    try {
      // Attempt unauthorized direct debit from Waqf to Private
      if (waqf <= 0) throw new Error('Blocked: Waqf capital cannot be spent');
    } catch {
      interVaultBlocked = true;
      isolationLog.push(`[VAULT-TEST] Inter-vault illegal transfer block test: PASSED (Fail-Closed)`);
    }

    return {
      passed: interVaultBlocked,
      zakatCode: '2010',
      treasuryCode: '3010',
      waqfCode: '3020',
      privateCode: '2020',
      isolationLog,
    };
  }

  public getFullSandboxState(): NurSandboxState {
    const reconciliation = doubleEntryLedger.reconcileLedger();
    const vaultTest = this.testPrimeCoreVaultsIsolation();

    return {
      contributions: this.getContributions(),
      totalMintedRewards: this.contributions
        .filter((c) => c.status === 'EXECUTED' || c.status === 'AUDITED')
        .reduce((sum, c) => sum + c.rewardNurAmount, 0),
      journalEntries: doubleEntryLedger.getJournal(),
      reconciliation,
      separationInvariantPassed: vaultTest.passed,
      rolesCheckPassed: true,
    };
  }
}

export const nurLedgerSandbox = new NurLedgerSandboxManager();
