/**
 * KeyMatrix OS v2.1 — Phase 6.9.1 Skill Loader Registry & SKILL.md Parser
 * Manages local skill manifests parsed from SKILL.md specifications.
 *
 * CRITICAL INVARIANT:
 * Skill != Tool
 * Skill != Authority
 * Skill != Authentication
 * Skill != Core
 *
 * A skill describes a workflow or guidance. A skill may NOT directly grant permission
 * to execute a consequential action. The agent must still request a ToolCall via ToolGateway.
 */

import { SkillManifest } from '../../types/skillTypes';
import { GatewayToolStatus } from '../../types/toolRuntimeTypes';

export const RAW_SKILL_FILES: Record<string, string> = {
  'frontend/SKILL.md': `---
id: skill-frontend
name: Frontend Design & Engineering Skill
version: 2.1.0
allowedTools:
  - tool-terminal
  - tool-files
  - tool-editor
requiredCapabilities:
  - cap:ui:build
  - cap:files:write
simulationOnly: true
status: AVAILABLE_LOCAL
---
# Frontend Design & Engineering Skill
1. Ensure WCAG AA contrast (4.5:1 text, 3:1 large).
2. Maintain zero-pill discipline for metadata.
3. Keep desktop layouts centered at 1440px wide with resizable panes.
4. Support RTL and mobile 390x844 viewports.`,

  'testing/SKILL.md': `---
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
4. Execute npm test to verify results.`,

  'keymatrix-ui/SKILL.md': `---
id: skill-keymatrix-ui
name: KeyMatrix OS Domain Aesthetic Skill
version: 2.1.0
allowedTools:
  - tool-files
  - tool-editor
requiredCapabilities:
  - cap:ui:style
  - cap:evidence:badge
simulationOnly: true
status: AVAILABLE_LOCAL
---
# KeyMatrix OS Domain Aesthetic Skill
1. Use neon accent borders (#00D4FF blue, #FF6B00 orange, #00FF88 green, #A855F7 purple, #FFD700 gold).
2. Display evidence badges using canonical 8-level Evidence Ladder vocabulary:
   - 1 DECLARED, 2 DOCUMENTED, 3 IMPLEMENTED, 4 RUNNING, 5 OBSERVED (Hard cap for local execution), 6 VERIFIED, 7 REPRODUCED, 8 PROVEN.
3. Always show footer: "Designed for People, Guided by Values, Built for Tomorrow."`,

  'pdf/SKILL.md': `---
id: skill-pdf
name: PDF Export & Analysis Skill
version: 1.0.0-schema
allowedTools:
  - tool-files
requiredCapabilities:
  - cap:doc:export
simulationOnly: true
status: SIMULATED
---
# PDF Export & Analysis Skill
1. Format report structure with title, summary, table of contents, and evidence refs.
2. Render client-side HTML print templates or markdown exports.`,

  'document/SKILL.md': `---
id: skill-document
name: Document Analysis & Extraction Skill
version: 1.0.0-schema
allowedTools:
  - tool-files
  - tool-editor
requiredCapabilities:
  - cap:doc:parse
simulationOnly: true
status: AVAILABLE_LOCAL
---
# Document Analysis & Extraction Skill
1. Extract YAML frontmatter and structured JSON specs from markdown files.
2. Validate spec hash matching and Merkle SHA-256 tree consistency.`,
};

/**
 * Lightweight frontmatter parser for SKILL.md files.
 */
export function parseSkillMarkdown(rawMarkdown: string): SkillManifest {
  const frontmatterMatch = rawMarkdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!frontmatterMatch) {
    throw new Error('Invalid SKILL.md format: Missing frontmatter delimiters (---).');
  }

  const yamlBlock = frontmatterMatch[1];
  const instructions = frontmatterMatch[2].trim();

  const metadata: Record<string, any> = {};
  let currentArrayKey: string | null = null;

  for (const line of yamlBlock.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    if (trimmed.startsWith('- ') && currentArrayKey) {
      if (!Array.isArray(metadata[currentArrayKey])) {
        metadata[currentArrayKey] = [];
      }
      metadata[currentArrayKey].push(trimmed.slice(2).trim());
      continue;
    }

    const colonIdx = trimmed.indexOf(':');
    if (colonIdx !== -1) {
      const key = trimmed.slice(0, colonIdx).trim();
      const val = trimmed.slice(colonIdx + 1).trim();

      if (!val) {
        currentArrayKey = key;
        metadata[key] = [];
      } else {
        currentArrayKey = null;
        if (val === 'true') metadata[key] = true;
        else if (val === 'false') metadata[key] = false;
        else metadata[key] = val;
      }
    }
  }

  return {
    id: metadata.id || 'skill-unknown',
    name: metadata.name || 'Unknown Skill',
    version: metadata.version || '1.0.0',
    description: instructions.split('\n')[0]?.replace(/^#\s*/, '') || metadata.name,
    allowedTools: Array.isArray(metadata.allowedTools) ? metadata.allowedTools : [],
    requiredCapabilities: Array.isArray(metadata.requiredCapabilities) ? metadata.requiredCapabilities : [],
    instructions,
    simulationOnly: metadata.simulationOnly !== undefined ? metadata.simulationOnly : true,
    status: (metadata.status as GatewayToolStatus) || 'AVAILABLE_LOCAL',
  };
}

export class SkillLoader {
  private skills: Map<string, SkillManifest> = new Map();

  constructor() {
    this.loadSkillsFromFiles();
  }

  loadSkillsFromFiles() {
    this.skills.clear();
    for (const [path, content] of Object.entries(RAW_SKILL_FILES)) {
      try {
        const manifest = parseSkillMarkdown(content);
        this.skills.set(manifest.id, manifest);
      } catch (err: any) {
        console.error(`Failed to parse skill markdown '${path}':`, err?.message);
      }
    }
  }

  getSkill(skillId: string): SkillManifest | undefined {
    return this.skills.get(skillId);
  }

  listSkills(): SkillManifest[] {
    return Array.from(this.skills.values());
  }

  /**
   * Enforces that skills describe workflows but do NOT grant execution authority.
   */
  validateSkillUsage(skillId: string, requestedToolId: string): { allowed: boolean; reason: string } {
    const skill = this.skills.get(skillId);
    if (!skill) {
      return { allowed: false, reason: `Skill '${skillId}' not found.` };
    }

    if (!skill.allowedTools.includes(requestedToolId)) {
      return {
        allowed: false,
        reason: `Skill '${skill.name}' does not allow requested tool '${requestedToolId}'. ToolCall must be authorized separately via ToolGateway.`,
      };
    }

    return {
      allowed: true,
      reason: `Skill '${skill.name}' provides guidance for tool '${requestedToolId}'. ToolCall permission checkpoint must still be evaluated.`,
    };
  }
}

export const skillLoader = new SkillLoader();
