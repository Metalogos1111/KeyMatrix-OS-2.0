/**
 * KM-PATTERN-ENGINE-001 confirmatory-depth follow-up 003.
 * Static evidence snapshot; not runtime telemetry or external independent replication.
 */
export const PATTERN_ENGINE_CONFIRMATORY_003 = {
  benchmarkId: 'KM-PATTERN-ENGINE-001-CONFIRMATORY-BENCHMARK-003',
  candidateVersion: '0.1.4-confirmatory-candidate',
  planSha256: 'ea1f1be09eb21ce67d5e34232373d71c603fb45fd392e87a4879356cd1ffcdee',
  resultsSha256: '7a8f4ae5211fb5546febc82f66381f8b32663a7c892a10c042f732a5fa3f97fa',
  seed: 20261028,
  permutationsPerTest: 999,
  familiesPerDistribution: 1000,
  totalHypothesisTests: 9000,
  totalPermutationDraws: 8991000,
  acceptanceChecksPassed: 19,
  acceptanceChecksTotal: 20,
  allPass: false,
  failedCriterion: {
    id: 'heavy_tailed_holm_familywise_ci_upper',
    observed: 0.07536090277145915,
    maximum: 0.075,
  },
  nullResults: [
    {
      distribution: 'gaussian',
      rawFpr: 0.04566666666666667,
      rawFprWilson95: [0.03875960781167959, 0.0537357727300666] as [number, number],
      familywiseAnyRejectionRate: 0.04,
      familywiseWilson95: [0.02951097368545276, 0.05400964412125796] as [number, number],
    },
    {
      distribution: 'uniform',
      rawFpr: 0.049,
      rawFprWilson95: [0.041835590014624356, 0.05731793153561967] as [number, number],
      familywiseAnyRejectionRate: 0.051,
      familywiseWilson95: [0.03900094277526684, 0.06643548634476165] as [number, number],
    },
    {
      distribution: 'heavy_tailed',
      rawFpr: 0.050666666666666665,
      rawFprWilson95: [0.04337731140028998, 0.05910528065420295] as [number, number],
      familywiseAnyRejectionRate: 0.059,
      familywiseWilson95: [0.04601429821280047, 0.07536090277145915] as [number, number],
    },
  ],
  permutationImplementation: 'Independent vectorized NumPy RNG implementation for permutation sampling and Pearson permutation statistic.',
  originalEngineRngStreamReproduced: false,
  externalIndependentReplicationObserved: false,
  independentSecondRealDatasetObserved: false,
  runtimeIntegrationObserved: false,
  promotionAllowed: false,
} as const;
