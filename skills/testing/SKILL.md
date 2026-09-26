---
id: skill-testing
name: Vitest & Verification Engineering Skill
version: 2.1.0
allowedTools:
  - tool-terminal
  - tool-files
requiredCapabilities:
  - cap:test:run
  - cap:files:read
simulationOnly: true
status: AVAILABLE_LOCAL
---
# Vitest & Verification Engineering Skill
1. Write unit and integration tests in src/__tests__/ using Vitest.
2. Ensure PoR finality invariant checks remain null (PoR.finality === null).
3. Ensure evidence ladder level checks stay hard-capped at OBSERVED for local sandbox.
4. Execute npm test to verify results.
