/**
 * Pinned snapshot from KM-PATTERN-ENGINE-001 candidate v0.1.3.
 * Static evidence only; not a live benchmark, telemetry stream, or runtime status feed.
 */
import type { PatternQualitySnapshot } from '../lib/evidence/patternQualityGate';

export const PATTERN_ENGINE_ACCEPTANCE_SNAPSHOT: PatternQualitySnapshot = {
  benchmarkId: 'KM-PATTERN-ENGINE-001-ACCEPTANCE-BENCHMARK-002',
  candidateVersion: '0.1.3-candidate',
  benchmarkZipSha256: '5ee0fe0d148ac216547dcfa903458b85c12914513acb2d2608360d4789c25e28',
  resultsJsonSha256: '8100eb75e8e8494b96ab337110b0d9feb1a660abe94524db582571a960c2de45',
  hashVerificationMode: 'RECORDED_REFERENCE_ONLY',
  dataset: {
    name: 'Wine recognition',
    sourceUrl: 'https://archive.ics.uci.edu/dataset/109/wine',
    doi: '10.24432/C5PC7J',
    license: 'CC BY 4.0',
    licenseMetadataRecorded: true,
    testedCopyLicenseVerified: false,
    loadedFromLocalBundle: true,
    freshlyDownloadedFromSource: false,
    rows: 178,
    features: 13,
    trainRows: 124,
    holdoutRows: 54,
    holdoutLabelsUsedForFit: false,
    holdoutAccuracy: 0.9444444444444444,
    majorityClassBaseline: 0.3888888888888889,
    csvSha256: '56642dccc99b96b03b662d49fcb4da8773dcf64e1532d2de9ef2460c77670032',
    realOutlierLabelsAvailable: false,
  },
  exploratoryAcceptance: { checksPassed: 20, checksTotal: 20, allPass: true },
  criteria: {
    alpha: 0.05,
    minNullFamiliesPerDistribution: 1000,
    maxRawFpr: 0.06,
    maxRawFprWilson95Upper: 0.075,
    maxFamilywiseAnyRejectionRate: 0.06,
    maxFamilywiseWilson95Upper: 0.075,
    minSeparatedClusterSuccessRate: 0.95,
    minOutlierRecallAtSd05To2: 0.9,
    minConfirmatoryPermutationsPerTest: 999,
  },
  nullCalibration: [
    {
      distribution: 'gaussian', families: 1000, testsPerFamily: 3, permutationsPerTest: 99,
      rawFpr: 0.03866666666666667, rawFprWilson95: [0.03233675293648952, 0.04617653148741124],
      familywiseAnyRejectionRate: 0.035, familywiseAnyRejectionWilson95: [0.02527226301711295, 0.04828662237445333],
    },
    {
      distribution: 'uniform', families: 1000, testsPerFamily: 3, permutationsPerTest: 99,
      rawFpr: 0.04, rawFprWilson95: [0.0335559270537099, 0.04762061377358999],
      familywiseAnyRejectionRate: 0.027, familywiseAnyRejectionWilson95: [0.018621382774294995, 0.03899873075304015],
    },
    {
      distribution: 'heavy_tailed', families: 1000, testsPerFamily: 3, permutationsPerTest: 99,
      rawFpr: 0.031, rawFprWilson95: [0.02537281666935177, 0.03782674343500397],
      familywiseAnyRejectionRate: 0.022, familywiseAnyRejectionWilson95: [0.014572707764791058, 0.03308567334739963],
    },
  ],
  clustering: [
    {
      scenario: 'well_separated', replicates: 1000, meanClusterPurity: 0.999975,
      purityAtLeast90Rate: 1, purityAtLeast90Wilson95: [0.996173241514445, 1],
    },
    {
      scenario: 'moderate_overlap', replicates: 1000, meanClusterPurity: 0.9274875,
      purityAtLeast90Rate: 0.878, purityAtLeast90Wilson95: [0.8562557152982502, 0.8968512552866701],
    },
    {
      scenario: 'heavy_overlap', replicates: 1000, meanClusterPurity: 0.6401249999999999,
      purityAtLeast90Rate: 0, purityAtLeast90Wilson95: [0, 0.0038267584855551234],
    },
  ],
  outliers: [
    { backgroundSd: 0.5, replicates: 1000, precision: 0.9930486593843099, recall: 1 },
    { backgroundSd: 1, replicates: 1000, precision: 0.9930486593843099, recall: 1 },
    { backgroundSd: 2, replicates: 1000, precision: 0.9960159362549801, recall: 1 },
    { backgroundSd: 4, replicates: 1000, precision: 0.9920634920634921, recall: 1 },
  ],
  confirmatoryPermutationsPerTest: 99,
  externalIndependentReplicationObserved: false,
  independentSecondRealDatasetObserved: false,
  runtimeIntegrationObserved: false,
};
