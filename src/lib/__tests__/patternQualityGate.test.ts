import { describe, expect, it } from 'vitest';
import { PATTERN_ENGINE_ACCEPTANCE_SNAPSHOT } from '../../data/patternEngineAcceptanceSnapshot';
import { PATTERN_ENGINE_CONFIRMATORY_003 } from '../../data/patternEngineConfirmatory003';
import { evaluatePatternQualityGate, type PatternQualitySnapshot } from '../evidence/patternQualityGate';

describe('KM-PATTERN-ENGINE-001 KeyMatrix evidence adapter', () => {
  it('keeps promotion blocked and flags unverified tested-copy licensing', () => {
    const result = evaluatePatternQualityGate(PATTERN_ENGINE_ACCEPTANCE_SNAPSHOT);
    expect(result.exploratoryCriteriaPass).toBe(false);
    expect(result.blockers).toContain('DATASET_PROVENANCE_OR_LICENSE_INCOMPLETE');
    expect(result.status).toBe('HOLD');
    expect(result.promotionAllowed).toBe(false);
    expect(result.authority).toBe('NONE');
    expect(result.canonicalSot).toBe('READ_ONLY');
    expect(PATTERN_ENGINE_ACCEPTANCE_SNAPSHOT.hashVerificationMode).toBe('RECORDED_REFERENCE_ONLY');
    expect(result.blockers).toContain('HOLD_CONFIRMATORY_PERMUTATION_DEPTH_INSUFFICIENT');
    expect(result.blockers).toContain('HOLD_EXTERNAL_INDEPENDENT_REPLICATION_NOT_OBSERVED');
    expect(result.blockers).toContain('HOLD_SECOND_REAL_DATASET_NOT_OBSERVED');
    expect(result.blockers).toContain('HOLD_KEYMATRIX_RUNTIME_INTEGRATION_NOT_OBSERVED');
  });

  it('fails closed when a null calibration stratum exceeds the registered FPR bound', () => {
    const altered: PatternQualitySnapshot = {
      ...PATTERN_ENGINE_ACCEPTANCE_SNAPSHOT,
      nullCalibration: PATTERN_ENGINE_ACCEPTANCE_SNAPSHOT.nullCalibration.map((item) =>
        item.distribution === 'uniform' ? { ...item, rawFpr: 0.2, rawFprWilson95: [0.1, 0.3] as [number, number] } : item,
      ),
    };
    const result = evaluatePatternQualityGate(altered);
    expect(result.status).toBe('HOLD');
    expect(result.exploratoryCriteriaPass).toBe(false);
    expect(result.promotionAllowed).toBe(false);
    expect(result.blockers).toContain('NULL_RAW_FPR_LIMIT_EXCEEDED:uniform');
  });

  it('rejects malformed provenance hashes', () => {
    const altered = {
      ...PATTERN_ENGINE_ACCEPTANCE_SNAPSHOT,
      resultsJsonSha256: 'not-a-hash',
    } as unknown as PatternQualitySnapshot;
    const result = evaluatePatternQualityGate(altered);
    expect(result.status).toBe('INVALID');
    expect(result.blockers).toContain('RESULTS_JSON_SHA256_INVALID');
  });

  it('rejects malformed confidence intervals instead of trusting only the upper bound', () => {
    const altered: PatternQualitySnapshot = {
      ...PATTERN_ENGINE_ACCEPTANCE_SNAPSHOT,
      nullCalibration: PATTERN_ENGINE_ACCEPTANCE_SNAPSHOT.nullCalibration.map((item) =>
        item.distribution === 'gaussian' ? { ...item, rawFprWilson95: [0.9, 0.2] as [number, number] } : item,
      ),
    };
    const result = evaluatePatternQualityGate(altered);
    expect(result.status).toBe('HOLD');
    expect(result.blockers).toContain('NULL_STRATUM_INVALID:gaussian');
  });

  it('preserves the confirmatory 003 failed threshold without authorizing promotion', () => {
    expect(PATTERN_ENGINE_CONFIRMATORY_003.permutationsPerTest).toBe(999);
    expect(PATTERN_ENGINE_CONFIRMATORY_003.acceptanceChecksPassed).toBe(19);
    expect(PATTERN_ENGINE_CONFIRMATORY_003.acceptanceChecksTotal).toBe(20);
    expect(PATTERN_ENGINE_CONFIRMATORY_003.allPass).toBe(false);
    expect(PATTERN_ENGINE_CONFIRMATORY_003.failedCriterion.id).toBe('heavy_tailed_holm_familywise_ci_upper');
    expect(PATTERN_ENGINE_CONFIRMATORY_003.failedCriterion.observed).toBeGreaterThan(
      PATTERN_ENGINE_CONFIRMATORY_003.failedCriterion.maximum,
    );
    expect(PATTERN_ENGINE_CONFIRMATORY_003.externalIndependentReplicationObserved).toBe(false);
    expect(PATTERN_ENGINE_CONFIRMATORY_003.runtimeIntegrationObserved).toBe(false);
    expect(PATTERN_ENGINE_CONFIRMATORY_003.promotionAllowed).toBe(false);
  });

  it('does not treat licence metadata as anomaly ground truth', () => {
    expect(PATTERN_ENGINE_ACCEPTANCE_SNAPSHOT.dataset.license).toBe('CC BY 4.0');
    expect(PATTERN_ENGINE_ACCEPTANCE_SNAPSHOT.dataset.testedCopyLicenseVerified).toBe(false);
    expect(PATTERN_ENGINE_ACCEPTANCE_SNAPSHOT.dataset.realOutlierLabelsAvailable).toBe(false);
  });
});
