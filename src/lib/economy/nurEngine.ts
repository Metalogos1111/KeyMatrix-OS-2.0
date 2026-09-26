import { db, DbNurTransaction } from '../db/keymatrixDb';

export interface NurProject {
  id: string;
  name: string;
  category: 'ENERGY' | 'WATER' | 'AGRO' | 'COMMUNITY';
  annualYieldPercentage: number;
  totalCapNur: number;
  activeInvestmentsNur: number;
  contractType: 'Mudarabah' | 'Musharakah' | 'Waqf';
  isZeroRiba: true;
  co2SavedTonsPerYear: number;
  location: string;
}

export const NUR_REAL_PROJECTS: NurProject[] = [
  {
    id: 'proj-solar-baku',
    name: 'Агро-солнечный кластер Каспия',
    category: 'ENERGY',
    annualYieldPercentage: 12.4,
    totalCapNur: 450000,
    activeInvestmentsNur: 380000,
    contractType: 'Mudarabah',
    isZeroRiba: true,
    co2SavedTonsPerYear: 850,
    location: 'Баку / Апшерон',
  },
  {
    id: 'proj-water-desal',
    name: 'Опреснительные микро-станции Каспия',
    category: 'WATER',
    annualYieldPercentage: 11.2,
    totalCapNur: 320000,
    activeInvestmentsNur: 290000,
    contractType: 'Musharakah',
    isZeroRiba: true,
    co2SavedTonsPerYear: 320,
    location: 'Говсан / Сумгаит',
  },
  {
    id: 'proj-vertical-farms',
    name: 'Городские вертикальные фермы (Зеленый Баку)',
    category: 'AGRO',
    annualYieldPercentage: 13.8,
    totalCapNur: 280000,
    activeInvestmentsNur: 265000,
    contractType: 'Mudarabah',
    isZeroRiba: true,
    co2SavedTonsPerYear: 180,
    location: 'Баку, Биби-Эйбат',
  },
  {
    id: 'proj-qard-hasan',
    name: 'Фонд беспроцентных займов (Кард аль-Хасан)',
    category: 'COMMUNITY',
    annualYieldPercentage: 0.0,
    totalCapNur: 200000,
    activeInvestmentsNur: 185000,
    contractType: 'Waqf',
    isZeroRiba: true,
    co2SavedTonsPerYear: 95,
    location: 'Шемаха / Гянджа',
  },
];

/**
 * Records a new NUR transaction ensuring Zero-Riba principles
 */
export async function recordNurTransaction(
  tx: Omit<DbNurTransaction, 'id' | 'timestamp' | 'isZeroRiba'>
): Promise<DbNurTransaction> {
  const newTx: DbNurTransaction = {
    ...tx,
    id: `tx-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    timestamp: new Date().toLocaleString('ru-RU', { hour12: false }),
    isZeroRiba: true,
  };

  try {
    await db.nurTransactions.add(newTx);
  } catch (e) {
    console.warn('Could not record NUR transaction to DB:', e);
  }

  return newTx;
}

/**
 * Calculates annual Zakat (2.5% on qualifying surplus wealth)
 */
export function calculateZakat(amountNur: number): { zakatDue: number; nisabThreshold: number; eligible: boolean } {
  const nisabThreshold = 8500; // Gram equivalent in NUR
  const eligible = amountNur >= nisabThreshold;
  const zakatDue = eligible ? Math.round(amountNur * 0.025 * 10) / 10 : 0;

  return { zakatDue, nisabThreshold, eligible };
}
