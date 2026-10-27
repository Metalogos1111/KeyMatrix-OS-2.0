import { describe, expect, it } from 'vitest';
import { PATTERN_ENGINE_ACCEPTANCE_SNAPSHOT } from '../../data/patternEngineAcceptanceSnapshot';
import { evaluatePatternQualityGate, type PatternQualitySnapshot } from '../evidence/patternQualityGate';

describe('KM-PATTERN-ENGINE-001 KeyMatrix evidence adapter', () => {
  it('keeps promotion blocked when the bounded exploratory snapshot passes', () => {
    const result = evaluatePatternQualityGate(PATTERN_ENGINE_ACCEPTANCE_SNAPSHOT);
    expect(result.exploratoryCriteriaPass).toBe(true);
    expect(result.status).toBe('HOLD');
    expect(result.promotionAllowed).toBe(false);
    expect(result.authority).toBe('NONE');
    expect(result.canonicalSot).toBe('READ_ONLY');
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

  it('does not treat licence metadata as anomaly ground truth', () => {
    expect(PATTERN_ENGINE_ACCEPTANCE_SNAPSHOT.dataset.license).toBe('CC BY 4.0');
    expect(PATTERN_ENGINE_ACCEPTANCE_SNAPSHOT.dataset.realOutlierLabelsAvailable).toBe(false);
  });
});
