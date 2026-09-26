# KeyMatrix OS v2.1 — Phase 6.8.5 Local Engineering Workspace Specification

## 1. Executive Overview
Phase 6.8.5 upgrades MetaLogos from a simulated agent interface into a fully functional local browser-based engineering workspace powered by WebContainer architecture. It enables interactive local build loops (`PLAN → EXECUTE → OBSERVE → ANALYZE → PATCH → RE-RUN → VERIFY RESULT → COMPLETE`), terminal streaming, virtual file system operations, and live local previews inside the browser without exposing or claiming production backend execution.

## 2. Architectural Boundaries
- **Phase Status**: Phase 6.8.5 = Local Engineering Runtime Only.
- **Backend**: NOT CONNECTED (`backendConnected: false`).
- **Runtime Type**: `WEBCONTAINER`.
- **Availability**: `AVAILABLE_LOCAL`.
- **Explicit Label**: `LOCAL BROWSER RUNTIME`.
- **ADR Status**: ADR-001..ADR-013 remain UNCHANGED / OPEN.
- **Invariants Preserved**:
  1. `Capability != Authority`
  2. `EvidenceLevel` local executions are capped at `OBSERVED`.
  3. `PoR.finality === null`.
  4. Command safety disclaimer: `User Approval != Authority Decision != Cryptographic Quorum`.

## 3. Core Modes
1. **ASK**: Conversational orchestration and reasoning interface.
2. **BUILD**: Multi-pane local engineering workspace with 3 desktop panels (Left: MetaLogos/Plan, Center: WebContainer Terminal, Right: Virtual Files/Editor/Preview) and mobile tab navigation (`CHAT`, `TERMINAL`, `FILES`, `PREVIEW`).

## 4. Execution Provider Abstraction
The `LocalExecutionProvider` interface decouples the execution engine from the conversation provider. It provides normalized requests (`ExecutionRequest`), streaming events (`ExecutionEvent`), results (`ExecutionResult`), and workspace snapshots (`WorkspaceSnapshot`).

## 5. File System Operations
Supported operations: READ, WRITE, CREATE, RENAME, DELETE, SEARCH across virtual project files with instant Merkle hash computation.

## 6. Terminal & Command Safety
Terminal execution handles safe project commands (`npm run build`, `npm test`, `npm run dev`, `npm run lint`). Non-sandboxed arbitrary shell commands are rejected. High-risk actions trigger a confirmation modal with explicit authority disclaimers.

## 7. Bounded MetaForge Repair Loop
MetaForge executes a bounded repair loop (max 3 attempts, `maxRuntimeMs: 30000`, `maxOutputBytes: 100000`) when build or test errors occur. If a build fails, MetaForge analyzes the stderr output, generates a patch, applies it, and re-runs compilation to verify fix results.
