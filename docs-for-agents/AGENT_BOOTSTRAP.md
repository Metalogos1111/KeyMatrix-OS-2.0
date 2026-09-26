# KeyMatrix OS v0.6.1 Agent Bootstrap Guide

Welcome to **KeyMatrix OS v0.6.1 PRE-ZIP HARDENED EDITION**.
This document is designed for AI Agents (Antigravity, Gemini, Anthropic, Claude) and developers to immediately understand the runtime layout, architecture, and current execution state.

---

## 1. Quick Start & Execution

```bash
# 1. Install dependencies
npm install

# 2. Run local development server (port 3000)
npm run dev

# 3. Type-check & lint
npm run lint

# 4. Production build test
npm run build
```

---

## 2. Core Architectural Map

The system is organized into two primary axes:
1. **Platform Axis (`M00` - `M16`)**: Platform infrastructure and civilization service planes.
2. **Capability Axis (7 Core Fabric Nodes)**:
   - `MetaCore` — Cryptographic evidence mesh & HASH-001 canonicalization
   - `MetaForge` — Autonomous software & system code synthesis
   - `MetaLogos` — Trusted media, knowledge & semantic translation
   - `MindState` — Human identity, location & environmental context
   - `PrimeCore` — Economic double-entry ledger & Vaults (Zakat / Waqf / Treasury / Private)
   - `Archivarius` — Immutable historical record storage & audit logs
   - `Singularity` — Autonomous AI Agent coordination & Shura governance engine

---

## 3. Key Files & Entry Points

| File Path | Description |
| :--- | :--- |
| `/src/lib/dr/canonicalHash.ts` | **HASH-001 Engine**: Alphabetical sorting, UTF-8 NFC normalization, fixed float precision. |
| `/src/lib/dr/baselineProvenance.ts` | **Baseline Provenance**: Merkle root capture, independent state snapshots, historical audits. |
| `/src/lib/dr/evidenceConsistency.ts` | **Cross-System Evidence Engine**: Resolves Primary vs DR discrepancies. |
| `/src/lib/dr/observerProbe.ts` | **DR Observer Probe (`km-pa3-dr-probe v3`)**: JWT-authenticated cross-region validation. |
| `/src/lib/authority/dbBinding.ts` | **Authority DB Binding**: RPC Security Definer guards & hash recomputation across 11 surfaces. |
| `/src/lib/economy/doubleEntryLedger.ts` | **Double-Entry Ledger**: Full balance sheet reconciliation (Assets = Liabilities + Equity). |
| `/src/lib/nur/ledgerSandbox.ts` | **NUR Sandbox**: 7 contribution categories, role isolation (`PROPOSE != APPROVE != EXECUTE != AUDIT`). |
| `/src/lib/adapters/autonomySpec.ts` | **Adapter Autonomy**: Online live vs offline calculation fallbacks (Qibla, Prayer, Quran, NUR). |
| `/src/lib/composer/autoWiring.ts` | **Composer Auto-Wiring**: Intent auto-discovery and 7-node cross-core connection resolution. |

---

## 4. Current Audit & Gate Status

- **v0.6 Decision Gate Verdict**: `PASS` (All HOLD defects closed).
- **Primary Node**: Baku (`ap-northeast-1`) — State Hash: `cb118293954bdf367f469da...`
- **DR Replica Node**: Frankfurt (`eu-central-1`) — State Hash: `cb118293954bdf367f469da...`
- **Canonical Sample Test Hash**: `517c116cebb201101113ec99ca135ba8dd506d9a1d90ec57ef3705984113a338`

---

## 5. Offline & PWA Autonomy

KeyMatrix OS operates seamlessly in offline environments:
- **Qibla**: Spherical trigonometry calculation (`calculateQiblaOffline`).
- **Prayer Times**: Astronomical zenith calculation (`calculatePrayerOffline`).
- **Quran**: Local Tanzil text cache in IndexedDB.
- **NUR Ledger**: Offline double-entry sandbox ledger.
- **PWA Service Worker**: Pre-caches assets, 7 translations, and offline tables via `/public/sw.js`.
