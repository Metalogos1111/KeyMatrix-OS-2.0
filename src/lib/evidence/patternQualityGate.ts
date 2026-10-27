/**
 * KM-PATTERN-ENGINE-001 — KeyMatrix evidence adapter.
 * Purely evaluates a persisted benchmark snapshot. No benchmark execution,
 * network I/O, canonical writes, or promotion authority are provided.
 */

export type PatternNullDistribution = 'gaussian' | 'uniform' | 'heavy_tailed';

export interface NullCalibrationStratum {
  distribution: PatternNullDistribution;
  families: number;
  testsPerFamily: number;
  permutationsPerTest: number;
  rawFpr: number;
  rawFprWilson95: [number, number];
  familywiseAnyRejectionRate: number;
  familywiseAnyRejectionWilson95: [number, number];
}

export interface PatternClusterScenario {
  scenario: 'well_separated' | 'moderate_overlap' | 'heavy_overlap';
  replicates: number;
  meanClusterPurity: number;
  purityAtLeast90Rate: number;
  purityAtLeast90Wilson95: [number, number];
}

export interface PatternOutlierScenario {
  backgroundSd: number;
  replicates: number;
  precision: number;
  recall: number;
}

export interface PatternQualitySnapshot {
  benchmarkId: string;
  candidateVersion: string;
  benchmarkZipSha256: string;
  resultsJsonSha256: string;
  hashVerificationMode: 'RECORDED_REFERENCE_ONLY';
  dataset: {
    name: string;
    sourceUrl: string;
    doi: string;
    license: string;
    licenseMetadataRecorded: boolean;
    loadedFromLocalBundle: boolean;
    freshlyDownloadedFromSource: boolean;
    rows: number;
    features: number;
    trainRows: number;
    holdoutRows: number;
    holdoutLabelsUsedForFit: boolean;
    holdoutAccuracy: number;
    majorityClassBaseline: number;
    csvSha256: string;
    realOutlierLabelsAvailable: boolean;
  };
  exploratoryAcceptance: { checksPassed: number; checksTotal: number; allPass: boolean };
  criteria: {
    alpha: number;
    minNullFamiliesPerDistribution: number;
    maxRawFpr: number;
    maxRawFprWilson95Upper: number;
    maxFamilywiseAnyRejectionRate: number;
    maxFamilywiseWilson95Upper: number;
    minSeparatedClusterSuccessRate: number;
    minOutlierRecallAtSd05To2: number;
    minConfirmatoryPermutationsPerTest: number;
  };
  nullCalibration: NullCalibrationStratum[];
  clustering: PatternClusterScenario[];
  outliers: PatternOutlierScenario[];
  confirmatoryPermutationsPerTest: number;
  externalIndependentReplicationObserved: boolean;
  independentSecondRealDatasetObserved: boolean;
  runtimeIntegrationObserved: boolean;
}

export type PatternQualityGateStatus = 'INVALID' | 'HOLD' | 'ELIGIBLE_FOR_HUMAN_REVIEW';

export interface PatternQualityGateEvaluation {
  status: PatternQualityGateStatus;
  exploratoryCriteriaPass: boolean;
  promotionAllowed: false;
  authority: 'NONE';
  canonicalSot: 'READ_ONLY';
  blockers: string[];
  checks: { id: string; passed: boolean; detail: string }[];
}

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value);
const isUnitInterval = (value: unknown): value is number =>
  isFiniteNumber(value) && value >= 0 && value <= 1;
const isSha256 = (value: unknown): value is string =>
  typeof value === 'string' && /^[a-f0-9]{64}$/i.test(value);

/**
 * Fail-closed evaluation of the pinned evidence snapshot.
 * The function can only return review eligibility; it can never authorize promotion.
 */
export function evaluatePatternQualityGate(
  input: PatternQualitySnapshot | null | undefined,
): PatternQualityGateEvaluation {
  const invalid = (blockers: string[]): PatternQualityGateEvaluation => ({
    status: 'INVALID',
    exploratoryCriteriaPass: false,
    promotionAllowed: false,
    authority: 'NONE',
    canonicalSot: 'READ_ONLY',
    blockers,
    checks: [],
  });

  if (!input || typeof input !== 'object') return invalid(['SNAPSHOT_MISSING_OR_NOT_AN_OBJECT']);

  const shapeErrors: string[] = [];
  if (!input.benchmarkId || !input.candidateVersion) shapeErrors.push('IDENTITY_FIELDS_MISSING');
  if (!isSha256(input.benchmarkZipSha256)) shapeErrors.push('BENCHMARK_ZIP_SHA256_INVALID');
  if (!isSha256(input.resultsJsonSha256)) shapeErrors.push('RESULTS_JSON_SHA256_INVALID');
  if (input.hashVerificationMode !== 'RECORDED_REFERENCE_ONLY') shapeErrors.push('HASH_VERIFICATION_MODE_UNSUPPORTED');
  if (!input.dataset || !isSha256(input.dataset.csvSha256)) shapeErrors.push('DATASET_SNAPSHOT_SHA256_INVALID');
  if (!Array.isArray(input.nullCalibration) || input.nullCalibration.length === 0) shapeErrors.push('NULL_CALIBRATION_MISSING');
  if (!Array.isArray(input.clustering) || input.clustering.length === 0) shapeErrors.push('CLUSTERING_RESULTS_MISSING');
  if (!Array.isArray(input.outliers) || input.outliers.length === 0) shapeErrors.push('OUTLIER_RESULTS_MISSING');
  if (!input.criteria || !input.exploratoryAcceptance) shapeErrors.push('GATE_CRITERIA_MISSING');
  if (shapeErrors.length > 0) return invalid(shapeErrors);

  const checks: PatternQualityGateEvaluation['checks'] = [];
  const blockers: string[] = [];
  const addCheck = (id: string, passed: boolean, detail: string, blocker?: string) => {
    checks.push({ id, passed, detail });
    if (!passed && blocker) blockers.push(blocker);
  };

  const distributions: PatternNullDistribution[] = ['gaussian', 'uniform', 'heavy_tailed'];
  for (const distribution of distributions) {
    const stratum = input.nullCalibration.find((item) => item.distribution === distribution);
    const label = distribution.toUpperCase();
    if (!stratum) {
      addCheck('NULL_' + label + '_PRESENT', false, 'Stratum missing', 'NULL_STRATUM_MISSING:' + distribution);
      continue;
    }
    const valid = Number.isInteger(stratum.families) &&
      stratum.families >= input.criteria.minNullFamiliesPerDistribution &&
      isUnitInterval(stratum.rawFpr) &&
      isUnitInterval(stratum.rawFprWilson95?.[1]) &&
      isUnitInterval(stratum.familywiseAnyRejectionRate) &&
      isUnitInterval(stratum.familywiseAnyRejectionWilson95?.[1]);
    addCheck(
      'NULL_' + label + '_SAMPLE_AND_RATES_VALID',
      valid,
      'families=' + stratum.families + '; rawFPR=' + stratum.rawFpr + '; familywise=' + stratum.familywiseAnyRejectionRate,
      'NULL_STRATUM_INVALID:' + distribution,
    );
    if (!valid) continue;

    addCheck(
      'NULL_' + label + '_RAW_FPR',
      stratum.rawFpr <= input.criteria.maxRawFpr &&
        stratum.rawFprWilson95[1] <= input.criteria.maxRawFprWilson95Upper,
      'rawFPR=' + (stratum.rawFpr * 100).toFixed(2) + '%; Wilson upper=' + (stratum.rawFprWilson95[1] * 100).toFixed(2) + '%',
      'NULL_RAW_FPR_LIMIT_EXCEEDED:' + distribution,
    );
    addCheck(
      'NULL_' + label + '_HOLM_FWER',
      stratum.familywiseAnyRejectionRate <= input.criteria.maxFamilywiseAnyRejectionRate &&
        stratum.familywiseAnyRejectionWilson95[1] <= input.criteria.maxFamilywiseWilson95Upper,
      'Holm FWER=' + (stratum.familywiseAnyRejectionRate * 100).toFixed(2) +
        '%; Wilson upper=' + (stratum.familywiseAnyRejectionWilson95[1] * 100).toFixed(2) + '%',
      'NULL_HOLM_FWER_LIMIT_EXCEEDED:' + distribution,
    );
  }

  const separated = input.clustering.find((item) => item.scenario === 'well_separated');
  addCheck(
    'CLUSTER_WELL_SEPARATED',
    Boolean(separated) &&
      isUnitInterval(separated?.purityAtLeast90Rate) &&
      (separated?.replicates ?? 0) >= 1000 &&
      (separated?.purityAtLeast90Rate ?? -1) >= input.criteria.minSeparatedClusterSuccessRate,
    separated
      ? 'success=' + (separated.purityAtLeast90Rate * 100).toFixed(2) + '%; replicates=' + separated.replicates
      : 'well_separated scenario missing',
    'CLUSTER_WELL_SEPARATED_GATE_FAILED',
  );

  for (const requiredSd of [0.5, 1, 2]) {
    const scenario = input.outliers.find((item) => item.backgroundSd === requiredSd);
    addCheck(
      'OUTLIER_RECALL_SD_' + String(requiredSd).replace('.', '_'),
      Boolean(scenario) &&
        isUnitInterval(scenario?.recall) &&
        (scenario?.replicates ?? 0) >= 1000 &&
        (scenario?.recall ?? -1) >= input.criteria.minOutlierRecallAtSd05To2,
      scenario
        ? 'recall=' + (scenario.recall * 100).toFixed(2) + '%; replicates=' + scenario.replicates
        : 'outlier scenario missing',
      'OUTLIER_RECALL_GATE_FAILED:sd=' + requiredSd,
    );
  }

  const data = input.dataset;
  addCheck(
    'DATASET_LICENSE_AND_PROVENANCE',
    Boolean(data.name && data.sourceUrl && data.doi && data.license) &&
      data.licenseMetadataRecorded &&
      data.loadedFromLocalBundle &&
      !data.freshlyDownloadedFromSource,
    'UCI identity/licence metadata recorded; tested copy loaded from local scikit-learn bundle, not a fresh UCI download.',
    'DATASET_PROVENANCE_OR_LICENSE_INCOMPLETE',
  );
  addCheck(
    'DATASET_HOLDOUT_SEPARATION',
    Number.isInteger(data.trainRows) &&
      Number.isInteger(data.holdoutRows) &&
      data.trainRows > 0 &&
      data.holdoutRows > 0 &&
      data.trainRows + data.holdoutRows === data.rows &&
      !data.holdoutLabelsUsedForFit &&
      isUnitInterval(data.holdoutAccuracy) &&
      isUnitInterval(data.majorityClassBaseline),
    'train=' + data.trainRows + '; holdout=' + data.holdoutRows +
      '; holdout labels used in fit/mapping=' + data.holdoutLabelsUsedForFit,
    'DATASET_HOLDOUT_SEPARATION_INVALID',
  );

  addCheck(
    'EXPLORATORY_ACCEPTANCE_RECORD',
    input.exploratoryAcceptance.allPass &&
      input.exploratoryAcceptance.checksPassed === input.exploratoryAcceptance.checksTotal,
    String(input.exploratoryAcceptance.checksPassed) + '/' +
      String(input.exploratoryAcceptance.checksTotal) + ' declared exploratory checks passed',
    'EXPLORATORY_ACCEPTANCE_CHECKS_NOT_ALL_PASSED',
  );

  // These blockers are intentional even if the exploratory metrics pass.
  addCheck(
    'CONFIRMATORY_PERMUTATION_DEPTH',
    Number.isInteger(input.confirmatoryPermutationsPerTest) &&
      input.confirmatoryPermutationsPerTest >= input.criteria.minConfirmatoryPermutationsPerTest,
    'observed=' + input.confirmatoryPermutationsPerTest +
      '; required>=' + input.criteria.minConfirmatoryPermutationsPerTest,
    'HOLD_CONFIRMATORY_PERMUTATION_DEPTH_INSUFFICIENT',
  );
  addCheck(
    'EXTERNAL_INDEPENDENT_REPLICATION',
    input.externalIndependentReplicationObserved,
    'External independent implementation/reviewer reproduction is not attached.',
    'HOLD_EXTERNAL_INDEPENDENT_REPLICATION_NOT_OBSERVED',
  );
  addCheck(
    'SECOND_REAL_DATASET',
    input.independentSecondRealDatasetObserved,
    'Only one classic labelled real-world dataset is attached.',
    'HOLD_SECOND_REAL_DATASET_NOT_OBSERVED',
  );
  addCheck(
    'KEYMATRIX_RUNTIME_INTEGRATION',
    input.runtimeIntegrationObserved,
    'No host/runtime invocation or event-bus receipt is attached.',
    'HOLD_KEYMATRIX_RUNTIME_INTEGRATION_NOT_OBSERVED',
  );

  const exploratoryChecks = checks.filter((check) =>
    check.id.startsWith('NULL_') ||
    check.id.startsWith('CLUSTER_') ||
    check.id.startsWith('OUTLIER_') ||
    check.id.startsWith('DATASET_') ||
    check.id === 'EXPLORATORY_ACCEPTANCE_RECORD',
  );
  const exploratoryCriteriaPass = exploratoryChecks.length > 0 &&
    exploratoryChecks.every((check) => check.passed);

  return {
    status: blockers.length === 0 ? 'ELIGIBLE_FOR_HUMAN_REVIEW' : 'HOLD',
    exploratoryCriteriaPass,
    promotionAllowed: false,
    authority: 'NONE',
    canonicalSot: 'READ_ONLY',
    blockers,
    checks,
  };
}
