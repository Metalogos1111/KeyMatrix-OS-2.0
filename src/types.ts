export type Language = 'EN' | 'RU' | 'AZ' | 'TR' | 'AR' | 'FA' | 'UR';
export type SupportedLanguage = Language;

export type ActiveSection =
  | 'home'
  | 'qibla'
  | 'prayer'
  | 'islam'
  | 'quran'
  | 'faq'
  | 'metalogos'
  | 'projects'
  | 'files'
  | 'nur'
  | 'map'
  | 'minfinity'
  | 'domains'
  | 'experiments'
  | 'world'
  | 'community'
  | 'security'
  | 'dr-consistency'
  | 'settings';

export type UserRole = 
  | 'Child'
  | 'Guardian'
  | 'Adult'
  | 'Teacher'
  | 'Instructor'
  | 'Researcher'
  | 'Developer'
  | 'Engineer'
  | 'Moderator'
  | 'Shura';

export type EvidenceLevel =
  | 'DECLARED'
  | 'DOCUMENTED'
  | 'IMPLEMENTED'
  | 'RUNNING'
  | 'OBSERVED'
  | 'VERIFIED'
  | 'REPRODUCED'
  | 'PROVEN'
  | null;

export type EvidenceLevelNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface EvidenceInfo {
  level: EvidenceLevel;
  code: string;
  label: string;
  description: string;
  badgeColor: string;
  bgGlow: string;
}

export type DomainStatus = 'OPERATIONAL' | 'SANDBOX' | 'DEGRADED';

export interface CoreDomain {
  id: string;
  name: string;
  tagline: string;
  category: string;
  status: DomainStatus;
  color: string;
  icon: string;
  inputs: string[];
  outputs: string[];
  dependencies: string[];
  authorityScope: string;
  evidenceScope: string;
  runtimeScope: string;
  activeLoad: number; // percentage
  metrics: { label: string; value: string }[];
  semanticLabel?: string;
  evidenceLevel?: EvidenceLevel;
  description?: string;
}

export interface MLayerItem {
  code: string;
  name: string;
  description: string;
  status: 'OPERATIONAL' | 'ACTIVE' | 'SANDBOX';
  evidenceLevel: EvidenceLevel;
  mission: string;
  spec: string;
}

export interface AdapterItem {
  id: string;
  name: string;
  version: string;
  status: 'REAL' | 'SIMULATED' | 'SANITIZED' | 'SANDBOX';
  source: string;
  requiredPermissions: string;
  fallback: string;
  description: string;
  type: 'CALCULATION' | 'KNOWLEDGE' | 'ECONOMIC' | 'DATA';
}

export interface ExecutionStep {
  step: number;
  id: string;
  name: string;
  semantic: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING' | 'SKIPPED';
  detail: string;
  evidenceLevel?: EvidenceLevel;
}

export interface PrayerTimeItem {
  name: string;
  arabicName: string;
  time: string;
  isNext?: boolean;
  passed?: boolean;
}

export interface IslamicTopic {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  category: string;
  content: string;
  evidenceLevel: EvidenceLevel;
  sources: string[];
}

export interface IslamicFAQ {
  id: string;
  question: string;
  shortAnswer: string;
  fullAnswer: string;
  category: string;
  evidenceLevel: EvidenceLevel;
}

export interface SystemLog {
  id: string;
  timestamp: string;
  tag: 'PRAYER' | 'INTENT' | 'AI' | 'EVIDENCE' | 'NUR' | 'SYSTEM' | 'SECURITY' | 'SHURA' | 'LEDGER' | 'DR';
  message: string;
  level: 'info' | 'success' | 'warning' | 'error';
}
