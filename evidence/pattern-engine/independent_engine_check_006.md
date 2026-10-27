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

- Runner SHA-256: `70a67052403d48ce02eb624db8fec9652b8bc06e926e85f5d5b4f3ef97544828`
- Local result SHA-256: `b0cfaa16784dcc29ce83e98c8bd98b6aba9f27d0dad044f24f0ca0fe0c627f66`

This is a local differential check, not an external independent replication or third-party audit. It does not establish real-world generalization, runtime integration, or promotion eligibility. The global evidence gate remains HOLD.
