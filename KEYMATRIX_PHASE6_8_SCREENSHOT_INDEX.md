# KEYMATRIX OS v2.1 — PHASE 6.8 SCREENSHOT & SURFACE INDEX
**Date:** 2026-09-22  
**Phase:** 6.8 MetaLogos + Core Interaction / Agent Workspace UX  
**Runtime Mode:** SIMULATION-FIRST / TARGET-REFERENCE  

---

### Key UI Surfaces & Landmark Selectors:

1. **MetaLogos Primary Workspace:**
   - Anchor / Container: `#page-metalogos`
   - Workspace Region: `#agent-interaction-workspace`
   - Route: `/metalogos` (Accessible via main navigation and tab selector)

2. **Core Fabric Bar & Inspector:**
   - Core Cards: `metalogos`, `metaforge`, `primecore`, `mindstate`, `archivarius`, `singularity`, `nurcore`
   - Invariant Badges: `NO AUTONOMOUS AUTHORITY`, `CAPABILITY != AUTHORITY`

3. **Persistent MetaLogos Interactive Channel:**
   - Message container with role badges (`HUMAN INTENT`, `METALOGOS ENGINE`)
   - Tool execution summary badges and linked evidence references

4. **Tool Gateway & Activity Trace:**
   - 6 standard tool cards (`Web Search`, `Files`, `Terminal`, `Compute`, `API Gateway`, `PoR Diagnostic`)
   - Sequential step timeline with status badges (`COMPLETED`, `RUNNING`, `FAILED`)

5. **Terminal Sandbox (`role="region"` / `aria-label="Terminal Sandbox"`):**
   - Toggle button with live logs, exit code, execution duration, and sandbox prompt `$`.

6. **Evidence & Provenance Vault (`role="dialog"` / `aria-label="Evidence Drawer"`):**
   - Slide-over drawer with Level 1–5 ladder, Merkle hash provenance, and RFC-KM-05 compliance notice.

7. **Shura Permission Modal (`role="dialog"` / `aria-labelledby="perm-title"`):**
   - High-visibility amber dialog enforcing human approval before privileged actions.
