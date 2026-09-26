/**
 * KeyMatrix OS v2.1 — Phase 6.9 Skill Contract Types
 * Defines SkillManifest schema.
 * INVARIANT: Skill != Tool, Skill != Authority, Skill != Authentication, Skill != Core.
 * A skill describes a workflow/guidance, but does NOT grant execution authority.
 */

import { GatewayToolStatus } from './toolRuntimeTypes';

export interface SkillManifest {
  id: string;
  name: string;
  version: string;
  description: string;
  allowedTools: string[];
  requiredCapabilities: string[];
  instructions: string;
  simulationOnly: boolean;
  status: GatewayToolStatus;
}
