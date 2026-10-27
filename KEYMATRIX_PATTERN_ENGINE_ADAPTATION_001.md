# KeyMatrix Pattern Engine Adaptation 001

**Disposition:** DRAFT / HOLD  
**Mode:** EVIDENCE_FIRST / SANDBOX_ONLY / READ_ONLY  
**Authority:** NONE · **Canonical SOT:** READ_ONLY · **Promotion:** HUMAN_APPROVAL_REQUIRED

## Goal

Connect the observed KM-PATTERN-ENGINE-001 v0.1.3 acceptance snapshot to the existing KeyMatrix OS research/experiments surface without confusing benchmark metrics with Proof of Resonance, runtime health, or authority.

## Repository changes in this candidate

- src/lib/evidence/patternQualityGate.ts — pure fail-closed evaluator for a pinned evidence snapshot.
- src/data/patternEngineAcceptanceSnapshot.ts — snapshot values and SHA-256 provenance references.
- src/components/experiments/PatternEngineEvidencePanel.tsx — static evidence presentation mounted under the existing Experiments page.
- src/lib/__tests__/patternQualityGate.test.ts — tests for expected HOLD state, falsified FPR bound, malformed hashes, and the no-real-anomaly-label boundary.
- KEYMATRIX_PATTERN_ENGINE_ADAPTATION_001.json — project manifest and cross-layer mapping.

## Architectural adaptation

| KeyMatrix concern | Adaptation | Boundary |
|---|---|---|
| M01 / UX | Fourth tab in the existing Experiments workspace | Presentation only; it is explicitly a persisted snapshot |
| M05 / Evidence Ladder | Hash-bound candidate, results, and dataset snapshot | SHA-256 establishes byte identity, not truth |
| M06 / Proof of Resonance | No score, threshold, or finality changes | Pattern detection is an independent research domain |
| M08 / orchestration | Derived report may be consumed later as research evidence | No authority or action permission is inferred |
| M09 / adapters | Dataset provenance contract prepared for future source adapters | No network connector is added here |
| Runtime Event Model | Proposed event PATTERN_BENCHMARK_SNAPSHOT_ATTACHED | Not wired to the event bus; no runtime receipt exists |

## Recorded results

- Exploratory acceptance record: 20/20 pre-registered checks passed.
- Null calibration: 1,000 families per synthetic distribution (Gaussian, uniform, heavy-tailed), with 3 hypotheses per family and Holm familywise rates of 3.5%, 2.7%, and 2.2%.
- Permutation tests used 99 permutations per test. This is too coarse for the confirmatory target; the next gate requires at least 999.
- K-means purity >=0.90 rate: 100% on well-separated clusters, 87.8% with moderate overlap, 0% with heavy overlap.
- Synthetic outlier recall: 100% in the recorded controlled scenarios. This is not real-world anomaly recall.
- UCI Wine: 178 records / 13 features; stratified 124/54 train/holdout split. Held-out cluster transfer was 94.44% for one split, versus 38.89% majority-class baseline.
- UCI identity and CC BY 4.0 licence metadata are recorded; the tested file came from the installed scikit-learn bundle, not a fresh UCI download. The CSV SHA-256 is pinned in the manifest.
- The real dataset has no verified anomaly labels, so no real-data anomaly precision/recall is claimed.

## Fail-closed gate behavior

The evidence panel remains HOLD unless the metrics are complete and all declared bounds are met. Even then, it only becomes eligible for human review; the function never authorizes promotion. The current snapshot remains HOLD because:
1. Confirmatory permutations are 99, below the required 999.
2. External independent implementation/review is not observed.
3. A second independent licensed real dataset is not observed.
4. KeyMatrix runtime integration is not observed.

## Verification boundary

This patch records source code and a pinned evidence snapshot. It does not claim that the UI was deployed, that runtime events were emitted, or that the current host loaded the module. A repository-level merge must still be followed by CI, a local app build, runtime observation, and independent replication. The canonical source repository is intentionally untouched.
