/**
 * KeyMatrix OS v2.1 — Phase 6.9 Connector Contract Types
 * Schema-only contract for future backend integrations.
 * INVARIANT: All connectors in Phase 6.9 are status = DISABLED | HOLD, simulationOnly = true.
 * NO OAuth, external backend APIs, or live remote tokens are implemented in this phase.
 */

export type ConnectorStatus = 'DISABLED' | 'HOLD';

export interface ConnectorManifest {
  id: string;
  name: string;
  provider: string; // e.g. 'github', 'google-drive', 'vercel', 'linear', 'canva'
  capabilities: string[];
  scopes: string[];
  identityRequirement: string;
  authorizationRequirement: string;
  status: ConnectorStatus;
  simulationOnly: boolean;
}

export const INITIAL_CONNECTOR_MANIFESTS: ConnectorManifest[] = [
  {
    id: 'conn-github',
    name: 'GitHub Repository Adapter',
    provider: 'github',
    capabilities: ['repo:read', 'repo:write', 'pull_request:create'],
    scopes: ['repo', 'workflow'],
    identityRequirement: 'did:key:github_oauth_user',
    authorizationRequirement: 'Shura Mandate / OAuth Scope Verification',
    status: 'DISABLED',
    simulationOnly: true,
  },
  {
    id: 'conn-google-drive',
    name: 'Google Workspace Drive Adapter',
    provider: 'google-drive',
    capabilities: ['drive.readonly', 'drive.file'],
    scopes: ['https://www.googleapis.com/auth/drive.file'],
    identityRequirement: 'did:key:gsuite_oauth_user',
    authorizationRequirement: 'OAuth 2.0 PKCE Flow',
    status: 'DISABLED',
    simulationOnly: true,
  },
  {
    id: 'conn-vercel',
    name: 'Vercel Deployment Adapter',
    provider: 'vercel',
    capabilities: ['deploy:create', 'project:read'],
    scopes: ['deployments'],
    identityRequirement: 'did:key:vercel_deployer',
    authorizationRequirement: 'Vercel Personal Access Token / OAuth',
    status: 'HOLD',
    simulationOnly: true,
  },
  {
    id: 'conn-linear',
    name: 'Linear Issue Tracking Adapter',
    provider: 'linear',
    capabilities: ['issue:create', 'issue:read'],
    scopes: ['read', 'write'],
    identityRequirement: 'did:key:linear_user',
    authorizationRequirement: 'Linear API Token',
    status: 'DISABLED',
    simulationOnly: true,
  },
];
