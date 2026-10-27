# KM-PATTERN-ENGINE-001 — Confirmatory-depth follow-up 003

**Disposition:** HOLD  
**Mode:** EVIDENCE_FIRST / SANDBOX_ONLY / READ_ONLY  
**Authority:** NONE · **Canonical SOT:** READ_ONLY · **Promotion:** HUMAN_APPROVAL_REQUIRED

## Run identity

- Benchmark: `KM-PATTERN-ENGINE-001-CONFIRMATORY-BENCHMARK-003`
- Candidate: `0.1.4-confirmatory-candidate`
- Seed: `20261028`
- Permutations: **999 per test**
- Null families: **1,000 per distribution**
- Hypotheses: 3 per family; 9,000 total tests; 8,991,000 permutation draws
- Pre-run plan SHA-256: `ea1f1be09eb21ce67d5e34232373d71c603fb45fd392e87a4879356cd1ffcdee`

## Source artifact integrity

The following source hashes were recomputed from the actual local files and matched their recorded references:

- Candidate ZIP (63,856 bytes): `5ee0fe0d148ac216547dcfa903458b85c12914513acb2d2608360d4789c25e28`
- Original acceptance JSON (12,696 bytes): `8100eb75e8e8494b96ab337110b0d9feb1a660abe94524db582571a960c2de45`
- Dataset CSV (30,143 bytes): `56642dccc99b96b03b662d49fcb4da8773dcf64e1532d2de9ef2460c77670032`

The ZIP archive passed its CRC integrity check. These checks establish byte identity/integrity, not semantic truth.

## Results

| Null distribution | Raw FPR | Raw FPR 95% Wilson CI | Holm familywise rate | FWER 95% Wilson CI |
|---|---:|---:|---:|---:|
| Gaussian | 4.57% | 3.88–5.37% | 4.00% | 2.95–5.40% |
| Uniform | 4.90% | 4.18–5.73% | 5.10% | 3.90–6.64% |
| Heavy-tailed | 5.07% | 4.34–5.91% | 5.90% | 4.60–7.54% |

**Acceptance: 19/20 checks passed.** The pre-registered heavy-tailed Holm familywise 95% Wilson upper bound is **7.5361%**, slightly above the maximum allowed **7.5%**. This criterion fails. The threshold was not relaxed. The point estimate remains below 6%, but the predeclared interval rule is binding.

The permutation p-value calculation used a separate vectorized NumPy implementation and RNG stream to make the follow-up computationally tractable. The run is therefore a distinct implementation of the permutation calculation, but it is not a third-party audit or external independent replication. Clustering and outlier helper functions remain from the candidate engine.

## Real-data scope

The run re-evaluated the same UCI Wine dataset (178 rows, 13 features) using a new seed and a 124/54 train/holdout split. The recorded holdout cluster-transfer score was 94.44% versus a 38.89% majority baseline. This is one dataset and one split, not external generalization. No verified real anomaly labels are available; no real-world anomaly precision/recall is claimed. The data were loaded from the local scikit-learn bundle, not freshly downloaded from UCI.

## Decision and next gate

- **HOLD** — one declared statistical acceptance criterion failed.
- Confirmatory permutation depth has been increased to 999.
- External independent replication remains not observed.
- A second independent real dataset remains not observed.
- KeyMatrix runtime integration remains not observed.
- No canonical source files, PoR thresholds, or promotion authority were changed.

The next useful step is a separately preregistered larger-family diagnostic for the heavy-tailed null stratum, followed by external independent reproduction. A larger follow-up must not replace or erase this failed result.
