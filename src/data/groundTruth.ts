export type ClaimTaxonomyCategory = 
  | 'REFERENCE_TERM'
  | 'SIMULATION'
  | 'LOCAL_OBSERVED'
  | 'EXTERNAL_VERIFIED'
  | 'PRODUCTION_CLAIM';

export interface GroundTruthCoreState {
  id: string;
  name: string;
  code: string;
  status: 'LOCAL_OBSERVED' | 'DESIGN_LEVEL' | 'SIMULATION';
  evidenceLevel: string;
  description: string;
  deterministicSurfaceAvailable: boolean;
}

export interface EvidenceBoundaryInfo {
  m03AuthorityStatus: string;
  sevenCoreState: string;
  porMathState: string;
  nurLedgerStatus: string;
  drCrossSystemStatus: string;
  lastAuditedDate: string;
}

export const GROUND_TRUTH_EVIDENCE_BOUNDARY: EvidenceBoundaryInfo = {
  m03AuthorityStatus: 'LOCAL_OBSERVED_SURFACE_NOT_INSTITUTIONAL_PRODUCTION',
  sevenCoreState: 'PRIMECORE_LOCAL_OBSERVED_OTHER_SIX_DESIGN_LEVEL',
  porMathState: 'OPEN_HARD_MATH_GAP_NORMALIZATION_UNRESOLVED',
  nurLedgerStatus: 'TARGET_EXECUTION_MODEL_SANDBOX_NOT_LIVE_MONEY',
  drCrossSystemStatus: 'CONTRADICTORY_CURRENT_STATE_HOLD_REMEDIATION_IN_PROGRESS',
  lastAuditedDate: '2026-09-22',
};

export const GROUND_TRUTH_CORE_STATES: GroundTruthCoreState[] = [
  {
    id: 'core-meta',
    name: 'MetaCore',
    code: 'M00',
    status: 'DESIGN_LEVEL',
    evidenceLevel: 'SANDBOX',
    description: 'Cryptographic evidence mesh & HASH-001 canonicalization spec.',
    deterministicSurfaceAvailable: false,
  },
  {
    id: 'core-forge',
    name: 'MetaForge',
    code: 'M01',
    status: 'DESIGN_LEVEL',
    evidenceLevel: 'SANDBOX',
    description: 'Autonomous software synthesis framework.',
    deterministicSurfaceAvailable: false,
  },
  {
    id: 'core-logos',
    name: 'MetaLogos',
    code: 'M02',
    status: 'DESIGN_LEVEL',
    evidenceLevel: 'SANDBOX',
    description: 'Trusted media & semantic knowledge translation.',
    deterministicSurfaceAvailable: false,
  },
  {
    id: 'core-mind',
    name: 'MindState',
    code: 'M03',
    status: 'LOCAL_OBSERVED',
    evidenceLevel: 'LEVEL_3',
    description: 'Local human identity & environmental context observation.',
    deterministicSurfaceAvailable: true,
  },
  {
    id: 'core-prime',
    name: 'PrimeCore',
    code: 'M04',
    status: 'LOCAL_OBSERVED',
    evidenceLevel: 'LEVEL_4',
    description: 'Deterministic local double-entry ledger & 4-vault isolation surface.',
    deterministicSurfaceAvailable: true,
  },
  {
    id: 'core-archivarius',
    name: 'Archivarius',
    code: 'M06',
    status: 'DESIGN_LEVEL',
    evidenceLevel: 'SANDBOX',
    description: 'Immutable historical record storage architecture.',
    deterministicSurfaceAvailable: false,
  },
  {
    id: 'core-singularity',
    name: 'Singularity',
    code: 'M07',
    status: 'DESIGN_LEVEL',
    evidenceLevel: 'SANDBOX',
    description: 'AI agent orchestration & Shura governance engine design.',
    deterministicSurfaceAvailable: false,
  },
];

export const GROUND_TRUTH_GAP_MATRIX_ROWS = [
  { code: 'M00', name: 'MetaCore Evidence Mesh', category: 'Platform', status: 'DESIGN_LEVEL', evidenceLevel: 'SANDBOX' },
  { code: 'M01', name: 'MetaForge Synthesis Engine', category: 'Platform', status: 'DESIGN_LEVEL', evidenceLevel: 'SANDBOX' },
  { code: 'M02', name: 'MetaLogos Semantic Plane', category: 'Platform', status: 'DESIGN_LEVEL', evidenceLevel: 'SANDBOX' },
  { code: 'M03', name: 'MindState Identity Context', category: 'Authority', status: 'LOCAL_OBSERVED', evidenceLevel: 'LEVEL_3' },
  { code: 'M04', name: 'PrimeCore Double-Entry Ledger', category: 'Economic', status: 'LOCAL_OBSERVED', evidenceLevel: 'LEVEL_4' },
  { code: 'M05', name: 'Adapters Gateway', category: 'Interoperability', status: 'LOCAL_OBSERVED', evidenceLevel: 'LEVEL_3' },
  { code: 'M06', name: 'Archivarius Storage Plane', category: 'Provenance', status: 'DESIGN_LEVEL', evidenceLevel: 'SANDBOX' },
  { code: 'M07', name: 'Singularity AI Agent Engine', category: 'Execution', status: 'DESIGN_LEVEL', evidenceLevel: 'SANDBOX' },
  { code: 'M08', name: 'Global Federation Plane', category: 'Globalization', status: 'DESIGN_LEVEL', evidenceLevel: 'SANDBOX' },
  { code: 'M09', name: 'Privacy Graph', category: 'Privacy', status: 'DESIGN_LEVEL', evidenceLevel: 'SANDBOX' },
  { code: 'M10', name: 'Education & Skill Mesh', category: 'Civilization', status: 'DESIGN_LEVEL', evidenceLevel: 'SANDBOX' },
  { code: 'M11', name: 'Trusted Media & Moderation', category: 'Civilization', status: 'DESIGN_LEVEL', evidenceLevel: 'SANDBOX' },
  { code: 'M12', name: 'Shura Governance Engine', category: 'Governance', status: 'DESIGN_LEVEL', evidenceLevel: 'SANDBOX' },
  { code: 'M13', name: 'Commerce & Settlement Rails', category: 'Economic', status: 'DESIGN_LEVEL', evidenceLevel: 'SANDBOX' },
  { code: 'M14', name: 'Human Life Graph & Family', category: 'Social', status: 'DESIGN_LEVEL', evidenceLevel: 'SANDBOX' },
  { code: 'M15', name: 'Universal Transfer Fabric', category: 'Transfer', status: 'DESIGN_LEVEL', evidenceLevel: 'SANDBOX' },
  { code: 'M16', name: 'Edge & Offline Node Fabric', category: 'Infrastructure', status: 'LOCAL_OBSERVED', evidenceLevel: 'LEVEL_3' },
  { code: 'M∞', name: 'KeyMatrix Singularity Infinity', category: 'Civilization Core', status: 'DESIGN_LEVEL', evidenceLevel: 'SANDBOX' },
];
