# KM-PATTERN-ENGINE-001 — Heavy-tailed diagnostic 004

**Disposition:** DIAGNOSTIC ONLY · GLOBAL GATE REMAINS HOLD  
**Mode:** EVIDENCE_FIRST / SANDBOX_ONLY / READ_ONLY  
**Authority:** NONE · **Canonical SOT:** READ_ONLY · **Promotion:** HUMAN_APPROVAL_REQUIRED

## Why this run exists

Follow-up 003 reported a heavy-tailed Holm familywise 95% Wilson upper bound of 7.5361%, slightly above the frozen 7.5% threshold. Before execution, this targeted diagnostic was recorded with a new seed, 5,000 families, and 999 permutations/test. It is selected after the prior result and therefore cannot replace or erase the recorded 003 failure.

Plan SHA-256: `bbb6c6287ffe1d63efd851371afe1a65494a83569abdda0c043dca13cdf039dc`  
Runner SHA-256: `041c902759d80f170cadafd3c6da5903d641f09723662fbdf85343874d65dd50`  
Results SHA-256: `ae7a49d8605569b392d41b2a29c73ccfb1182f988e0e877e84a8f1ea4e1e5a08`

## Results

- Families: **5,000**
- Hypotheses per family: **3**
- Total tests: **15,000**
- Permutations per test: **999**
- Total permutation draws: **14,985,000**
- Raw FPR: **4.9467%**; Wilson 95% CI **4.6110–5.3054%**
- Holm familywise rejection rate: **4.40%**; Wilson 95% CI **3.8657–5.0044%**
- Holm-adjusted individual-test false-positive rate: **1.52%**

The targeted heavy-tailed diagnostic is within the frozen point-estimate and confidence-interval bounds. This suggests the 003 interval breach may be sampling variation, but does not prove that conclusion or make the earlier failed criterion pass retroactively.

## Boundary

This result is not a replacement acceptance run and is not external independent replication. It does not add a second real dataset, establish real-world anomaly performance, or observe KeyMatrix runtime integration. **The global promotion gate remains HOLD.**
