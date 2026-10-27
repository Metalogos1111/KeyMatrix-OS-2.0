/**
 * Second distinct real dataset benchmark 005.
 * Research-only; no clinical claim, external replication, runtime integration, or promotion.
 */
export const PATTERN_ENGINE_SECOND_DATASET_005 = {
  benchmarkId: 'KM-PATTERN-ENGINE-001-SECOND-DATASET-BENCHMARK-005',
  datasetName: 'Breast Cancer Wisconsin (Diagnostic)',
  sourceUrl: 'https://archive.ics.uci.edu/dataset/17/breast-cancer',
  doi: '10.24432/C5DW2B',
  license: 'CC BY 4.0 according to UCI catalogue metadata',
  planSha256: '988aac8c7c66042bb178154b7252529729ed7a7114df54d952d03abf68f8e5e1',
  resultsSha256: 'e5eff6bdad3edde65dfb3fb65e275ad64a937d95ad9c8c1e3bce1b5aff156040',
  datasetSha256: '2bf6b0159b91984c11cdb63ad23d133325d588df850e64c3bdbe1caa252dac89',
  rows: 569,
  features: 30,
  trainRows: 398,
  holdoutRows: 171,
  seed: 20261030,
  k: 2,
  converged: true,
  iterations: 6,
  holdoutTransferAccuracy: 0.8888888888888888,
  holdoutBalancedAccuracy: 0.8704001168224299,
  majorityClassBaseline: 0.6257309941520468,
  confusionMatrix: [[51, 13], [6, 101]] as [[number, number], [number, number]],
  licenseMetadataVerifiedFromSource: true,
  loadedFromLocalBundle: true,
  freshDirectDownloadFromUci: false,
  testedCopyProvenanceFullyIndependentlyVerified: false,
  secondDistinctRealDatasetExecuted: true,
  externalIndependentReplicationObserved: false,
  runtimeIntegrationObserved: false,
  promotionAllowed: false,
} as const;
