# KeyMatrix OS v2.1 — Phase 6.9 Visual & Runtime Verification Index

## Overview
Phase 6.9 provides user-visible, inspectable activity traces for bounded agent loop steps across Desktop (1440x900) and Mobile (390x844) viewports.

## Verification Surfaces Index

1. **Desktop 1440x900 3-Pane Viewport**:
   - **Left Pane**: MetaLogos chat context & task plan step visualizer (`PLAN → TOOL_REQUEST → POLICY → EXECUTE → OBSERVE → EVIDENCE → CONTINUE/FINAL`).
   - **Center Pane**: Terminal view with live streaming stdout/stderr output and quick action execution buttons.
   - **Right Pane**: Filesystem explorer, local web preview iframe (`http://localhost:3000`), and Evidence Ladder drawer (`OBSERVED`).

2. **Mobile 390x844 Viewport**:
   - Bottom 4-tab navigation (`CHAT`, `TERMINAL`, `FILES`, `PREVIEW`).
   - Touch targets $\ge 44\text{px}$.
   - Auto-scrolling terminal logs and touch-friendly modal controls.

3. **Multilingual & RTL Viewports**:
   - **RTL Support**: Arabic (AR) & Farsi (FA) layout direction flipping.
   - **LTR Support**: English (EN), Russian (RU), Azerbaijani (AZ), Turkish (TR).

4. **Local UX Permission Checkpoint (`PermissionModal`)**:
   - High-risk command prompts displaying explicit disclaimer:  
     `User Approval != Authority Decision != Cryptographic Quorum` ("This is a local UX checkpoint only").
