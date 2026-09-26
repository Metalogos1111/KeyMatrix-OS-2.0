export interface IntentWiringRequirement {
  intentText: string;
  detectedDomain: 'ENERGY' | 'FINANCE' | 'RELIGION' | 'GOVERNANCE' | 'COMMUNITY' | 'SYSTEM';
  requiredNodes: {
    nodeId: string;
    nodeType: 'ADAPTER' | 'MINDSTATE' | 'PRIMECORE' | 'ARCHIVARIUS' | 'SHURA' | 'METACORE' | 'SINGULARITY';
    name: string;
    action: string;
    status: 'ACTIVE' | 'RESOLVING' | 'READY';
  }[];
  activeConnectionsCount: number;
  policyChecks: {
    ruleId: string;
    ruleDescription: string;
    requiredNurAmount?: number;
    passed: boolean;
  }[];
}

export function autoWireIntent(intentText: string): IntentWiringRequirement {
  const normalized = intentText.toLowerCase();

  if (normalized.includes('энерг') || normalized.includes('солнец') || normalized.includes('баку') || normalized.includes('solar')) {
    return {
      intentText,
      detectedDomain: 'ENERGY',
      activeConnectionsCount: 7,
      requiredNodes: [
        { nodeId: 'M05-ADAPTER-SOLAR', nodeType: 'ADAPTER', name: 'Baku Solar Grid Telemetry API', action: 'Fetch Solar Yield & Grid Load', status: 'ACTIVE' },
        { nodeId: 'M03-MINDSTATE-BAKU', nodeType: 'MINDSTATE', name: 'Baku Geo & Climate Context', action: 'Resolve Lat 40.4093, Lng 49.8671', status: 'ACTIVE' },
        { nodeId: 'M04-PRIMECORE-CO2', nodeType: 'PRIMECORE', name: 'PrimeCore CO2 & Energy Balance Engine', action: 'Calculate Carbon Displacement Rate', status: 'ACTIVE' },
        { nodeId: 'M06-ARCHIVARIUS-HIST', nodeType: 'ARCHIVARIUS', name: 'Archivarius Historical Grid Records', action: 'Fetch 30-day Solar Generation Logs', status: 'ACTIVE' },
        { nodeId: 'M12-SHURA-RULE42', nodeType: 'SHURA', name: 'Shura Ratification Rule #42', action: 'Enforce Governance Threshold (150 NUR)', status: 'ACTIVE' },
        { nodeId: 'M00-METACORE-EVIDENCE', nodeType: 'METACORE', name: 'MetaCore Cryptographic Proof Mesh', action: 'Sign Intent Execution Event', status: 'ACTIVE' },
        { nodeId: 'M07-SINGULARITY-AGENT', nodeType: 'SINGULARITY', name: 'Singularity Autonomous Optimizer', action: 'Execute Inverter Angle Adjustments', status: 'ACTIVE' },
      ],
      policyChecks: [
        { ruleId: 'SHURA-42', ruleDescription: 'Energy Optimization Governance Threshold (150 NUR Stake Verification)', requiredNurAmount: 150, passed: true },
        { ruleId: 'PRIMECORE-ECO-01', ruleDescription: 'Carbon Offset Double-Entry Verification', passed: true },
      ],
    };
  }

  if (normalized.includes('nur') || normalized.includes('закят') || normalized.includes('вакуф') || normalized.includes('финанс') || normalized.includes('деньги')) {
    return {
      intentText,
      detectedDomain: 'FINANCE',
      activeConnectionsCount: 7,
      requiredNodes: [
        { nodeId: 'M05-ADAPTER-NUR-LEDGER', nodeType: 'ADAPTER', name: 'NUR Ledger Sandbox Adapter', action: 'Access Double-Entry Ledger State', status: 'ACTIVE' },
        { nodeId: 'M03-MINDSTATE-IDENTITY', nodeType: 'MINDSTATE', name: 'User Identity & Sovereign DID', action: 'Verify KeyMatrix DID Authority', status: 'ACTIVE' },
        { nodeId: 'M04-PRIMECORE-VAULTS', nodeType: 'PRIMECORE', name: 'Zakat/Waqf/Treasury Isolation Vaults', action: 'Enforce Non-Infiltration Invariant', status: 'ACTIVE' },
        { nodeId: 'M06-ARCHIVARIUS-LEDGER-HIST', nodeType: 'ARCHIVARIUS', name: 'Archivarius Transaction Provenance', action: 'Fetch Journal Chain Records', status: 'ACTIVE' },
        { nodeId: 'M12-SHURA-FINANCE-RULE', nodeType: 'SHURA', name: 'Shura Financial Policy Engine', action: 'Check Propose != Approve != Execute', status: 'ACTIVE' },
        { nodeId: 'M00-METACORE-PROVENANCE', nodeType: 'METACORE', name: 'MetaCore HASH-001 Canonical Guard', action: 'Generate Recomputed Audit Hash', status: 'ACTIVE' },
        { nodeId: 'M07-SINGULARITY-ROUTER', nodeType: 'SINGULARITY', name: 'Singularity Financial Dispatcher', action: 'Dispatch Settlement Execution', status: 'ACTIVE' },
      ],
      policyChecks: [
        { ruleId: 'SHURA-FIN-01', ruleDescription: 'Strict Role Separation (PROPOSE != APPROVE != EXECUTE != AUDIT)', passed: true },
        { ruleId: 'VAULT-ISOLATION-01', ruleDescription: 'PrimeCore Vault Isolation (Zakat != Treasury != Waqf != Private)', passed: true },
      ],
    };
  }

  // Default Auto-Wiring fallback (7 active connections)
  return {
    intentText,
    detectedDomain: 'SYSTEM',
    activeConnectionsCount: 7,
    requiredNodes: [
      { nodeId: 'M05-ADAPTER-UNIVERSAL', nodeType: 'ADAPTER', name: 'Universal External Gateway', action: 'Fetch External Signals', status: 'ACTIVE' },
      { nodeId: 'M03-MINDSTATE-LOCAL', nodeType: 'MINDSTATE', name: 'MindState Environment Context', action: 'Resolve Local Device State', status: 'ACTIVE' },
      { nodeId: 'M04-PRIMECORE-CALC', nodeType: 'PRIMECORE', name: 'PrimeCore Rule Engine', action: 'Process Core Intent Invariants', status: 'ACTIVE' },
      { nodeId: 'M06-ARCHIVARIUS-STORE', nodeType: 'ARCHIVARIUS', name: 'Archivarius Immutable Store', action: 'Query Knowledge Mesh', status: 'ACTIVE' },
      { nodeId: 'M12-SHURA-GOVERN', nodeType: 'SHURA', name: 'Shura Deliberation Policy', action: 'Verify Action Authority', status: 'ACTIVE' },
      { nodeId: 'M00-METACORE-HASH', nodeType: 'METACORE', name: 'MetaCore HASH-001 Verification', action: 'Compute State Integrity Hash', status: 'ACTIVE' },
      { nodeId: 'M07-SINGULARITY-EXEC', nodeType: 'SINGULARITY', name: 'Singularity Autonomous Execution', action: 'Commit Final State Transition', status: 'ACTIVE' },
    ],
    policyChecks: [
      { ruleId: 'GENERIC-SAFETY-01', ruleDescription: 'MetaCore Intent Proof-of-Authority Check', passed: true },
    ],
  };
}
