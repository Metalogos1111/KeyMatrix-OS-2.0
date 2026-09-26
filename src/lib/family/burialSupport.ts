import { db } from '../db/keymatrixDb';
import { signPayloadWithDid } from '../identity/did';

export interface BurialMember {
  id: string;
  name: string;
  did: string;
  joinedDate: string;
  monthlyContributionNur: number;
  status: 'ACTIVE' | 'EXEMPT_ELIGIBLE' | 'SUSPENDED';
  familyMembersCovered: number;
}

export interface BurialClaim {
  id: string;
  deceasedName: string;
  deceasedDid: string;
  applicantDid: string;
  relationship: string;
  requestedAmountNur: number;
  disbursedAmountNur: number;
  janazahLocation: string;
  deathCertificateHash: string;
  guardianSignature: string;
  status: 'SUBMITTED' | 'VERIFIED' | 'DISBURSED' | 'REJECTED';
  timestamp: string;
  evidenceLevel: 5;
}

export interface BurialFundState {
  totalReserveNur: number;
  activeMembersCount: number;
  totalClaimsDisbursedCount: number;
  totalDisbursedNur: number;
  zeroFeeGuarantee: true;
  dignityAssurance: string;
}

export const INITIAL_BURIAL_FUND: BurialFundState = {
  totalReserveNur: 85000,
  activeMembersCount: 1420,
  totalClaimsDisbursedCount: 38,
  totalDisbursedNur: 45600,
  zeroFeeGuarantee: true,
  dignityAssurance: '100% покрытие ритуальных расходов (Тахджиз и Такфин) в течение 2 часов без бюрократии',
};

export const INITIAL_BURIAL_MEMBERS: BurialMember[] = [
  {
    id: 'bm-01',
    name: 'Али Мамедов',
    did: 'did:key:km_mammadov_ali_99',
    joinedDate: '2025-01-15',
    monthlyContributionNur: 5,
    status: 'ACTIVE',
    familyMembersCovered: 4,
  },
  {
    id: 'bm-02',
    name: 'Фатима Джафарова',
    did: 'did:key:km_jafarova_fatima_12',
    joinedDate: '2025-03-10',
    monthlyContributionNur: 5,
    status: 'ACTIVE',
    familyMembersCovered: 3,
  },
  {
    id: 'bm-03',
    name: 'Гаджи Ибрагим',
    did: 'did:key:km_ibrahim_baku_88',
    joinedDate: '2024-11-01',
    monthlyContributionNur: 10,
    status: 'ACTIVE',
    familyMembersCovered: 6,
  },
];

export const INITIAL_BURIAL_CLAIMS: BurialClaim[] = [
  {
    id: 'claim-089',
    deceasedName: 'Рашид Гусейнов (рахимахуллах)',
    deceasedDid: 'did:key:km_huseynov_r_44',
    applicantDid: 'did:key:km_huseynov_son_01',
    relationship: 'Сын',
    requestedAmountNur: 1200,
    disbursedAmountNur: 1200,
    janazahLocation: 'Мечеть Тезепир, Баку',
    deathCertificateHash: 'sha256:e8f33190b2408c5c7d6d376c9e9921e428df13b28489c79',
    guardianSignature: 'sig_ed25519_8f3b29c011e4a9',
    status: 'DISBURSED',
    timestamp: '2026-09-14 11:20:00',
    evidenceLevel: 5,
  },
  {
    id: 'claim-088',
    deceasedName: 'Зейнаб Ахмедова (рахимахаллах)',
    deceasedDid: 'did:key:km_ahmedova_z_77',
    applicantDid: 'did:key:km_ahmedov_husband_92',
    relationship: 'Муж',
    requestedAmountNur: 1200,
    disbursedAmountNur: 1200,
    janazahLocation: 'Мечеть Гейдара, Баку',
    deathCertificateHash: 'sha256:d172089b2756a84d412e84c98a3b50c0274e0d720b66c4a',
    guardianSignature: 'sig_ed25519_2984bc19dfa430',
    status: 'DISBURSED',
    timestamp: '2026-09-08 16:45:00',
    evidenceLevel: 5,
  },
];

/**
 * Creates and registers a new burial claim
 */
export function createBurialClaim(params: {
  deceasedName: string;
  deceasedDid: string;
  applicantDid: string;
  relationship: string;
  requestedAmountNur?: number;
  janazahLocation: string;
  deathDocId: string;
}): BurialClaim {
  const amount = params.requestedAmountNur || 1200;
  const hash = `sha256:${Math.random().toString(36).substring(2)}${Date.now().toString(16)}`;
  const sigPayload = JSON.stringify({
    deceased: params.deceasedDid,
    applicant: params.applicantDid,
    doc: params.deathDocId,
    amount,
  });
  const sig = signPayloadWithDid(params.applicantDid, sigPayload);

  return {
    id: `claim-${Date.now().toString().slice(-4)}`,
    deceasedName: params.deceasedName,
    deceasedDid: params.deceasedDid,
    applicantDid: params.applicantDid,
    relationship: params.relationship,
    requestedAmountNur: amount,
    disbursedAmountNur: amount,
    janazahLocation: params.janazahLocation,
    deathCertificateHash: hash,
    guardianSignature: sig,
    status: 'DISBURSED',
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    evidenceLevel: 5,
  };
}
