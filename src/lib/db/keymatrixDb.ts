import Dexie, { Table } from 'dexie';

export interface DbIntent {
  id: string;
  text: string;
  role: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXECUTED';
  timestamp: string;
  porScore: number;
  proofHash?: string;
  evidenceLevel: number;
  peopleAffected?: number;
  co2Impact?: number;
  nurAmount?: number;
}

export interface DbAction {
  id: string;
  intentId: string;
  domain: string;
  actionType: string;
  parameters: Record<string, any>;
  status: 'COMPLETED' | 'FAILED' | 'BLOCKED';
  timestamp: string;
}

export interface DbImpact {
  id: string;
  intentId: string;
  nurDistributed: number;
  co2Saved: number;
  peopleBenefited: number;
  verified: boolean;
  timestamp: string;
}

export interface DbComposition {
  id: string;
  name: string;
  selectedNode: string;
  executionMode: string;
  evidenceLevel: string;
  nodes: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DbEvidenceRecord {
  id: string;
  proofHash: string;
  evidenceLevel: number | string;
  intentText: string;
  authorityApprover: string;
  mathCoherence: number;
  porScore: number;
  timestamp: string;
  verified: boolean;
}

export interface DbNurTransaction {
  id: string;
  type: 'IMPACT_PROFIT_SHARE' | 'ZAKAT_ALLOCATION' | 'QARD_HASAN' | 'PROJECT_INVESTMENT';
  amount: number;
  from: string;
  to: string;
  project: string;
  isZeroRiba: boolean;
  timestamp: string;
  description: string;
}

export interface DbSecureKey {
  did: string;
  encryptedCipher: string;
  iv: string;
  algorithm: string;
  salt: string;
  storedAt: string;
}

export interface DbSetting {
  key: string;
  value: any;
  updatedAt: string;
}

class KeyMatrixDatabase extends Dexie {
  intents!: Table<DbIntent, string>;
  actions!: Table<DbAction, string>;
  impacts!: Table<DbImpact, string>;
  compositions!: Table<DbComposition, string>;
  evidenceRecords!: Table<DbEvidenceRecord, string>;
  nurTransactions!: Table<DbNurTransaction, string>;
  secureKeys!: Table<DbSecureKey, string>;
  settings!: Table<DbSetting, string>;

  constructor() {
    super('KeyMatrixOS_v02_Antigravity');
    this.version(1).stores({
      intents: 'id, role, status, timestamp, porScore',
      actions: 'id, intentId, domain, status, timestamp',
      impacts: 'id, intentId, timestamp',
      compositions: 'id, name, selectedNode, updatedAt',
      evidenceRecords: 'id, proofHash, evidenceLevel, timestamp',
      nurTransactions: 'id, type, timestamp, project',
    });
    this.version(2).stores({
      intents: 'id, role, status, timestamp, porScore',
      actions: 'id, intentId, domain, status, timestamp',
      impacts: 'id, intentId, timestamp',
      compositions: 'id, name, selectedNode, updatedAt',
      evidenceRecords: 'id, proofHash, evidenceLevel, timestamp',
      nurTransactions: 'id, type, timestamp, project',
      secureKeys: 'did, storedAt',
    });
    this.version(3).stores({
      intents: 'id, role, status, timestamp, porScore',
      actions: 'id, intentId, domain, status, timestamp',
      impacts: 'id, intentId, timestamp',
      compositions: 'id, name, selectedNode, updatedAt',
      evidenceRecords: 'id, proofHash, evidenceLevel, timestamp',
      nurTransactions: 'id, type, timestamp, project',
      secureKeys: 'did, storedAt',
      settings: 'key, updatedAt',
    });
  }
}

export const db = new KeyMatrixDatabase();

/**
 * Persists active section in IndexedDB with localStorage fallback
 */
export async function persistActiveSection(section: string): Promise<void> {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem('km_active_section', section);
  }
  try {
    if (db.settings) {
      await db.settings.put({
        key: 'activeSection',
        value: section,
        updatedAt: new Date().toISOString(),
      });
    }
  } catch (e) {
    console.warn('Could not persist activeSection to IndexedDB:', e);
  }
}

/**
 * Persists active user role in IndexedDB with localStorage fallback
 */
export async function persistUserRole(role: string): Promise<void> {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem('km_active_role', role);
  }
  try {
    if (db.settings) {
      await db.settings.put({
        key: 'activeRole',
        value: role,
        updatedAt: new Date().toISOString(),
      });
    }
  } catch (e) {
    console.warn('Could not persist activeRole to IndexedDB:', e);
  }
}

/**
 * Loads persisted active user role from IndexedDB or localStorage
 */
export async function getPersistedUserRole(): Promise<string | null> {
  try {
    if (db.settings) {
      const record = await db.settings.get('activeRole');
      if (record && record.value) {
        return record.value;
      }
    }
  } catch (e) {
    console.warn('Could not read activeRole from IndexedDB, trying fallback:', e);
  }

  if (typeof window !== 'undefined' && window.localStorage) {
    return localStorage.getItem('km_active_role');
  }
  return null;
}

/**
 * Loads persisted active section from IndexedDB or localStorage
 */
export async function getPersistedActiveSection(): Promise<string | null> {
  try {
    if (db.settings) {
      const record = await db.settings.get('activeSection');
      if (record && record.value) {
        return record.value;
      }
    }
  } catch (e) {
    console.warn('Could not read activeSection from IndexedDB, trying fallback:', e);
  }

  if (typeof window !== 'undefined' && window.localStorage) {
    return localStorage.getItem('km_active_section');
  }
  return null;
}

/**
 * Seeds initial data into IndexedDB if empty
 */
export async function seedInitialDatabase() {
  const count = await db.nurTransactions.count();
  if (count === 0) {
    await db.nurTransactions.bulkAdd([
      {
        id: 'tx-001',
        type: 'IMPACT_PROFIT_SHARE',
        amount: 14500,
        from: 'Caspian Solar Cluster #3',
        to: 'NUR Impact Pool',
        project: 'Baku Agro-Photovoltaics',
        isZeroRiba: true,
        timestamp: '2026-09-17 10:14:00',
        description: 'Mudarabah quarterly profit distribution (12.4% APR equivalent)',
      },
      {
        id: 'tx-002',
        type: 'ZAKAT_ALLOCATION',
        amount: 3200,
        from: 'NUR Foundation',
        to: 'Community Welfare Desk',
        project: 'Needy Families Clean Water',
        isZeroRiba: true,
        timestamp: '2026-09-17 12:30:15',
        description: 'Direct Zakat distribution for municipal reverse-osmosis filtration',
      },
      {
        id: 'tx-003',
        type: 'QARD_HASAN',
        amount: 5000,
        from: 'NUR Zero-Riba Reserve',
        to: 'DID:key:km_88e4... (Green Bakery)',
        project: 'Zero-Emission Bread Oven',
        isZeroRiba: true,
        timestamp: '2026-09-17 14:05:40',
        description: 'Interest-free benevolent loan for eco-friendly ovens',
      },
      {
        id: 'tx-004',
        type: 'PROJECT_INVESTMENT',
        amount: 50000,
        from: 'NUR Community Fund',
        to: 'Absheron Wind Cooperative',
        project: 'Offshore Micro-Turbines',
        isZeroRiba: true,
        timestamp: '2026-09-17 16:45:10',
        description: 'Musharakah equity partnership in renewable wind harvesting',
      },
    ]);

    await db.compositions.bulkAdd([
      {
        id: 'comp-default',
        name: 'Harmonic Civilization Orchestration',
        selectedNode: 'MindState',
        executionMode: 'Hybrid',
        evidenceLevel: '5 PROVEN',
        nodes: ['PrimeCore', 'MindState', 'MetaLogos', 'Archivarius', 'NUR Core'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'comp-eco-grid',
        name: 'Energy Grid Coherence & Shura Protocol',
        selectedNode: 'PrimeCore',
        executionMode: 'Strict TEE',
        evidenceLevel: '4 REPRODUCED',
        nodes: ['PrimeCore', 'MetaForge', 'MetaLogos'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]);

    await db.evidenceRecords.bulkAdd([
      {
        id: 'ev-001',
        proofHash: 'pos_f7Bu928acb341e899201fa',
        evidenceLevel: 5,
        intentText: 'Harmonic resonance calibration with Golden Ratio Phi',
        authorityApprover: 'Shura Council #42',
        mathCoherence: 99.8,
        porScore: 0.482,
        timestamp: '2026-09-17 20:44:21',
        verified: true,
      },
      {
        id: 'ev-002',
        proofHash: 'pos_f7Bu41a80c98f5532d1e7c',
        evidenceLevel: 4,
        intentText: 'Baku Qibla vector determination and spherical trigonometry proof',
        authorityApprover: 'Qibla Adapter v1.2.0',
        mathCoherence: 100.0,
        porScore: 0.495,
        timestamp: '2026-09-17 20:45:00',
        verified: true,
      },
    ]);
  }
}
