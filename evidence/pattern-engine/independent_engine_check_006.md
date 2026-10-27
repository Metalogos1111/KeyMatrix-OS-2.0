# KM-PATTERN-ENGINE-001 — Independent local differential check 006

**Result:** PASS · **Checks:** 2,500 · **Mismatches:** 0  
**Mode:** EVIDENCE_FIRST / SANDBOX_ONLY / READ_ONLY  
**Authority:** NONE · **Canonical SOT:** READ_ONLY · **Promotion:** HUMAN_APPROVAL_REQUIRED

## Coverage

- 1,000 randomized Pearson-correlation comparisons.
- 1,000 randomized z-score outlier-index comparisons, with varying vector lengths, thresholds, and injected extremes.
- 500 randomized k-means comparisons covering discrete point clouds, duplicate points, ties, multiple dimensions, and possible empty clusters.

The check uses separate standard-library implementations and compares outputs to the candidate engine. The runner is stored in this directory as independent_engine_check_006.py. To rerun it, unpack the candidate ZIP and set PATTERN_ENGINE_SOURCE_DIR to the extracted KM-PATTERN-ENGINE-001 directory before invoking the script.

## Integrity and limitations

- Runner SHA-256: `f582e1836dd2ad41d420c6af970ea6f118c1c3b5394d85a8ded7913e62732886`
- Local result SHA-256: `92291b920924d9f4e01ecc2b5b99efac80a1bae652b7b34fe879c231cae33e31`

This is a local differential check, not an external independent replication or third-party audit. It does not establish real-world generalization, runtime integration, or promotion eligibility. The global evidence gate remains HOLD.
