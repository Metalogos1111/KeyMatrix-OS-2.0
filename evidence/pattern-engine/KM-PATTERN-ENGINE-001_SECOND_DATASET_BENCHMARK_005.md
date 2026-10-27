# KM-PATTERN-ENGINE-001 — Second real dataset 005

**Disposition:** EXECUTED WITH SCOPE LIMITATIONS · GLOBAL GATE REMAINS HOLD  
**Mode:** EVIDENCE_FIRST / SANDBOX_ONLY / READ_ONLY  
**Authority:** NONE · **Canonical SOT:** READ_ONLY · **Promotion:** HUMAN_APPROVAL_REQUIRED

## Preregistered dataset and method

- Dataset: Breast Cancer Wisconsin (Diagnostic), UCI dataset 17, DOI 10.24432/C5DW2B.
- UCI catalogue states CC BY 4.0: https://archive.ics.uci.edu/dataset/17/breast-cancer
- Plan SHA-256: `988aac8c7c66042bb178154b7252529729ed7a7114df54d952d03abf68f8e5e1`
- Seed: 20261030; stratified 70/30 split; 398 training rows / 171 holdout rows.
- Dataset: 569 rows, 30 features, 212 malignant / 357 benign labels.
- Scaling was fit on training rows only. K-means was fit on training features only. Cluster-to-class mapping was fit on training labels only. Holdout labels were used only for scoring.
- The tested copy was loaded from the local scikit-learn bundle, not freshly downloaded from UCI. UCI source metadata and license were checked; the exact bundled copy's provenance was not independently reproduced from a fresh source download.

## Results

- Holdout cluster-transfer accuracy: **88.89%**
- Holdout balanced accuracy: **87.04%**
- Majority-class baseline: **62.57%**
- Confusion matrix, labels 0=malignant and 1=benign: `[[51, 13], [6, 101]]`
- K-means converged in 6 iterations.
- Dataset snapshot: 279,745 bytes; 569 data rows; 31 columns including target; 0 empty cells.
- Dataset snapshot SHA-256: `2bf6b0159b91984c11cdb63ad23d133325d588df850e64c3bdbe1caa252dac89`
- Full results JSON SHA-256: `e5eff6bdad3edde65dfb3fb65e275ad64a937d95ad9c8c1e3bce1b5aff156040`

## Interpretation boundary

This is a second distinct real dataset and a new held-out run, which adds evidence about cross-dataset transfer. It is not an external independent replication: the engine and experiment were run in the same local research environment. The dataset is medical in subject matter, but this is not a diagnostic or clinical performance claim. Diagnosis labels are not anomaly ground truth; no anomaly precision/recall is claimed.

The second-dataset execution is observed, but exact tested-copy provenance is not fully independently verified. External independent replication and runtime integration remain NOT_OBSERVED. **Global status remains HOLD; no promotion is authorized.**
