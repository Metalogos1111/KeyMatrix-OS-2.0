# KEYMATRIX OS v2.1 — PHASE 6.8 CHAT TOOLS SPECIFICATION
**Document ID:** `KEYMATRIX_PHASE6_8_CHAT_TOOLS_SPEC_001`  
**Version:** `1.0.0`  
**Status:** `CANONICAL SPECIFICATION (PHASE 6.8 LOCAL ORCHESTRATION)`  
**Scope:** Composer-level Meta-Tools Interaction Layer, Slash Commands & High-Risk Confirmation Gate  

---

### 1. Architectural Philosophy & Non-Negotiable Boundaries

1. **Frontend Simulation Boundary:**
   * Chat Tools operate strictly within the client-side local orchestration engine.
   * Tool invocation generates simulated execution steps, Merkle-linked evidence references, and state transitions.
   * **Zero Mock Illusion:** No claim is made to production cloud infrastructure, hardware TEE attestation, live external network bypass, or real monetary settlement.

2. **Single Orchestration Hub (MetaLogos):**
   * Tools are **never invoked in isolation** or outside a task context.
   * Every tool invocation is governed by a unified `taskId`, parsed intent, Shura Rule #42 safety verification, and an Activity Trace.

3. **Fail-Closed by Default:**
   * If a capability is unavailable, unauthorized, or disabled (e.g. `tool-api`), execution halts immediately.
   * Failure reasons are logged to the task record and reflected with Evidence Level `NULL` (`EvidenceState = UNAVAILABLE`, Level `null`/`NULL`; pseudo-levels such as "Level 0" are non-canonical and prohibited).

---

### 2. The 6 Canonical Chat Tools

| Tool ID | Display Name | Category | Capability Required | Mode | Risk Level | Gateway Status |
|---|---|---|---|---|---|---|
| `tool-web-search` | Web Search | `WEB_SEARCH` | `net.search` | `SIMULATED` | `LOW` | `AVAILABLE` |
| `tool-files` | Files & Artifact Vault | `FILES` | `files.readwrite` | `LOCAL SANDBOX` | `LOW` | `AVAILABLE` |
| `tool-terminal` | Terminal Sandbox | `TERMINAL` | `terminal.execute` | `LOCAL SANDBOX` | `HIGH` | `AVAILABLE` |
| `tool-compute` | Deterministic Compute | `COMPUTE` | `compute.math` | `LOCAL` | `LOW` | `AVAILABLE` |
| `tool-api` | External API Gateway | `API` | `api.outbound` | `DISABLED` | `CRITICAL` | `DISABLED` |
| `tool-por-sandbox` | PoR Resonance Diagnostic | `SANDBOX` | `por.diagnose` | `DIAGNOSTIC ONLY` | `MEDIUM` | `AVAILABLE` |

---

### 3. Composer UX & Interaction Model

1. **Trigger Button (`[ + Инструменты ]`):**
   * Located adjacent to the chat input field in the composer.
   * Displays the count of currently attached tools as an active badge.
   * On click, opens the compact `ChatToolPalette` (popover on desktop, bottom sheet on mobile).

2. **Tool Selection Chips:**
   * Selecting tools mounts visual chips directly above the composer input.
   * Each chip shows the tool icon, name, and a dismiss button (`✕`).
   * An "Очистить" button allows instant clearing of all attached tools.

3. **Slash Commands:**
   Direct invocation via the input box:
   * `/search <query>` → Routes to `tool-web-search`
   * `/files <path/command>` → Routes to `tool-files` (Archivarius)
   * `/terminal <command>` → Routes to `tool-terminal` (MetaForge) with High-Risk Confirmation Gate
   * `/compute <expression>` → Routes to `tool-compute`
   * `/por` → Routes to `tool-por-sandbox` (PrimeCore)
   * `/status`, `/tools`, `/task`, `/evidence` → System state and gateway diagnostics

4. **Multi-Tool Task Composition:**
   * Users can select multiple tools concurrently (e.g., Files + Terminal).
   * Engine orchestrates a multi-step task plan under a single `taskId`, generating step-by-step execution traces and evidence records.

5. **High-Risk Confirmation Gate (Shura Rule #42 Simulation):**
   * High-risk tools (e.g., Terminal execution) trigger the `ToolInvocationPreviewModal`.
   * Options:
     * `ALLOW ONCE`: Executes the tool for the immediate command only.
     * `ALLOW FOR TASK`: Grants execution for the duration of the current task.
     * `DENY`: Rejects execution, logs Fail-Closed denial, and issues Evidence Level `NULL`.
   * **Explicit Invariant Notice:** Human confirmation in UI is an operational gate simulation and does NOT confer cryptographic quorum or real administrative privilege.

---

### 4. Evidence Ladder Mapping

* **Simulated/Diagnostic Executions:** Levels `4 (REPRODUCED)` to `3 (VERIFIED)`
* **Proof of Resonance:** Level `HOLD` (ADR-010 Finality: NULL)
* **NUR Core Operations:** Level `SANDBOX` (ADR-009 Non-Settlement)
* **Fail-Closed / Blocked Invocations:** Level `NULL` (Level 0 - Invalidated)
