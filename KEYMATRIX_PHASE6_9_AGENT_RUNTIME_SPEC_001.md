# KeyMatrix OS v2.1 — Phase 6.9 Provider-Agnostic Agent Runtime & Tool Loop Specification

## Official Phase Status
`PHASE 6.9 — CONTRACT ACCEPTED`

## Architectural Scope
Phase 6.9 evolves the MetaLogos orchestration layer into a provider-agnostic, observable, multi-step agent loop. It connects local policy checkpoints, tool execution gateways, skills, and connector manifests without introducing any production backend or remote authority dependencies.

---

## Runtime Loop Architecture

```
USER
  ↓
META LOGOS
  ↓
INTENT
  ↓
PLAN
  ↓
TOOL REQUEST
  ↓
LOCAL POLICY / UX CHECKPOINT
  ↓
TOOL GATEWAY
  ↓
TOOL ADAPTER
  ↓
EXECUTION PROVIDER (LocalExecutionProvider)
  ↓
OBSERVATION
  ↓
RESULT
  ↓
EVIDENCE (Hard Cap: OBSERVED)
  ↓
MODEL / ORCHESTRATOR CONTINUES
  ↓
NEXT TOOL REQUEST
  ↓
FINAL RESPONSE
```

---

## Conceptual Layers Implemented

### A. AgentLoop (`src/lib/agent/AgentLoop.ts`)
- **Loop Cycle**: `PLAN → REQUEST_TOOL → POLICY_CHECK → EXECUTE → OBSERVE → CAPTURE_EVIDENCE → CONTINUE_OR_FINALIZE`
- **Execution Bounds**:
  - `maxSteps`: 8
  - `maxAttemptsPerStep`: 3
  - `maxRuntimeMs`: 30,000 ms
  - `maxOutputBytes`: 100,000 bytes
- **Termination Conditions**: `COMPLETED`, `FAILED`, `CANCELLED`, `MAX_STEPS`, `TIMEOUT`, `USER_STOP`.

### B. ToolGateway (`src/lib/agent/ToolGateway.ts`)
- **Responsibilities**: Resolves tool capabilities, validates arguments, triggers local UX permission checkpoints (`PermissionModal`), routes commands to `LocalExecutionProvider`, normalizes results, and attaches `OBSERVED` evidence records.
- **Invariants**: ToolGateway does NOT grant production authority or Shura quorum. Evidence level is hard-capped strictly at `OBSERVED`.

### C. SkillLoader (`src/lib/skills/SkillLoader.ts`)
- **Registry**: Local skill manifests (`frontend`, `testing`, `keymatrix-ui`, `pdf`, `document`).
- **Critical Invariant**: `Skill != Tool`, `Skill != Authority`, `Skill != Authentication`, `Skill != Core`. A skill provides guidance/workflow instructions, but does NOT grant execution authority. The agent must still issue a `ToolCall`.

### D. Connector Contracts (`src/types/connectorTypes.ts`)
- **Schema-Only**: `ConnectorManifest` definitions for future backend adapters (`github`, `google-drive`, `vercel`, `linear`).
- **Phase 6.9 Boundary**: All connectors remain `status = 'DISABLED'` or `'HOLD'`, `simulationOnly = true`. No OAuth or remote API calls are executed.

### E. Execution Provider Reuse
- Reuses `LocalExecutionProviderImpl` (`src/lib/runtime/LocalExecutionProvider.ts`).
- Preserves explicit modes:
  - `NATIVE_WEBCONTAINER`: Real `@webcontainer/api` boot, mount, spawn, stdout/stderr streams, exit code, and `server-ready`.
  - `VIRTUAL_FILESYSTEM_FALLBACK`: Browser-local simulation/analysis fallback when Cross-Origin Isolation is unavailable.

### F. Evidence Ladder Invariants
- Hard cap: `OBSERVED`.
- Neither execution mode automatically promotes results to `VERIFIED`, `REPRODUCED`, or `PROVEN`.
