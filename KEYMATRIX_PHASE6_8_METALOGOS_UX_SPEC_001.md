# KEYMATRIX OS v2.1 — PHASE 6.8 SPECIFICATION
## Document ID: KEYMATRIX_PHASE6_8_METALOGOS_UX_SPEC_001
**Version:** 0.1  
**Status:** CONCEPTUAL / TARGET-REFERENCE UX PROTOTYPE  
**Authority:** NONE (Simulation Only)  
**Production Promotion:** NOT GRANTED  

---

### 1. Overview & North Star
Phase 6.8 establishes the single interactive **MetaLogos** conversational gateway and the 7-Core Intelligence Fabric interaction prototype. In accordance with the KeyMatrix Master System Model (KM-CORE-MASTER-SYSTEM-MODEL-002):
- **MetaLogos is NOT a supreme authority over the Core.**
- **The Core are NOT 7 separate chatbots.** There is ONE persistent conversation with specialized Core participants operating behind the scenes.
- Key Matrix Invariants strictly maintained:
  - `Identity != Authority`
  - `Capability != Authority`
  - `Profile != Identity`
  - `Wallet != Identity`
  - `PoR != Finality`
  - `NUR Value != NUR Reward != NUR Digital Cash`

---

### 2. Architecture & UX Topology
The runtime layout exposes:
1. **Top Bar & Navigation:** Session state, role simulation indicator, and active runtime mode (`SIMULATION GATE PASS`).
2. **7 Cores Fabric:**
   - `MetaLogos` (Reasoning, Intent Decomposition & Shura Orchestration)
   - `MetaForge` (Creation, Code Synthesis & Pipeline Compilation)
   - `PrimeCore` (Security Arbiter, TEE Attestation & Shariah Guardrails)
   - `MindState` (Context Continuity, Dynamic Presence & Telemetry)
   - `Archivarius` (Memory Vault, Merkle Proofs & Provenance Registry)
   - `Singularity` (Civilizational Synthesis, Multi-Horizon Global Simulation)
   - `NUR Core` (Ethical Economic Invariants & Impact Work Accounting)
3. **Interactive Channel:** Chat stream displaying human intent, MetaLogos decomposition, active participating cores, tool invocations, and evidence references.
4. **Tool Gateway (6 Tools):**
   - Web Search (Net search simulation)
   - Files Vault (Read/Write simulation)
   - Terminal Sandbox (Controlled sandbox execution)
   - Deterministic Compute (Math, solar angles, hashing)
   - API Gateway (Domain allowlist, currently disabled)
   - PoR Resonance Diagnostic (Diagnostic-only harmonic curve)
5. **Terminal Sandbox:** Execution panel with copyable outputs, exit codes, and timestamps.
6. **Evidence & Provenance Vault:** Drawer showing verification levels (1–5, HOLD, SANDBOX) and SHA-256 provenance traces.
7. **Shura Permission Modal (Rule #42):** Intercepts high-risk tool operations requiring explicit human authorization.
