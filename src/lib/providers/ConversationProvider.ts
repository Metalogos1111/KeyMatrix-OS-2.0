/**
 * KeyMatrix OS v2.1 — Phase 6.9.1 Conversation Provider Interface & MetaLogos Provider
 * Provider-agnostic model abstraction layer for AgentLoop.
 * Decouples reasoning and turn generation from hardcoded string matching.
 */

import { ToolResult } from '../../types/toolRuntimeTypes';

export interface ToolRequestSpec {
  toolId: string;
  command: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  skillId?: string;
}

export interface ConversationTurnInput {
  userPrompt: string;
  history?: any[];
  context?: Record<string, any>;
}

export interface AgentTurnOutput {
  turnId: string;
  status: 'CONTINUE' | 'FINAL' | 'FAILED';
  replyMessage: string;
  toolRequests: ToolRequestSpec[];
  summary?: string;
}

export interface ConversationProvider {
  id: string;
  name: string;
  generateTurn(
    input: ConversationTurnInput,
    previousToolResults?: ToolResult[]
  ): Promise<AgentTurnOutput>;
}

/**
 * Mock MetaLogos Orchestrator Provider.
 * Generates structured AgentTurnOutput specs based on intent decomposition and feedback observation loops.
 */
export class MockMetaLogosProvider implements ConversationProvider {
  id = 'provider-mock-metalogos';
  name = 'MetaLogos Local Orchestrator Provider';

  async generateTurn(
    input: ConversationTurnInput,
    previousToolResults?: ToolResult[]
  ): Promise<AgentTurnOutput> {
    const turnId = `turn-${Date.now().toString(16)}`;

    // If previous tool results exist, observe their execution feedback
    if (previousToolResults && previousToolResults.length > 0) {
      const lastResult = previousToolResults[previousToolResults.length - 1];

      if (lastResult.status === 'SUCCESS') {
        // If we ran lint and succeeded, next turn can request build or finalize
        if (lastResult.output.includes('tsc --noEmit') || lastResult.output.includes('clean')) {
          return {
            turnId,
            status: 'CONTINUE',
            replyMessage: 'Linting passed cleanly. Proceeding to project build step.',
            toolRequests: [
              { toolId: 'tool-terminal', command: 'npm run build', riskLevel: 'MEDIUM', skillId: 'skill-frontend' },
            ],
          };
        }

        // If build succeeded, finalize task
        return {
          turnId,
          status: 'FINAL',
          replyMessage: 'Task executed successfully across all plan steps.',
          toolRequests: [],
          summary: 'All execution steps completed and verified with OBSERVED local evidence.',
        };
      } else {
        // Handle failure observation
        return {
          turnId,
          status: 'FAILED',
          replyMessage: `Tool execution failed: ${lastResult.error || 'Execution error'}`,
          toolRequests: [],
        };
      }
    }

    // Initial Turn Plan based on prompt intent
    const lower = input.userPrompt.toLowerCase();

    if (lower.includes('lint') || lower.includes('check')) {
      return {
        turnId,
        status: 'CONTINUE',
        replyMessage: 'Decomposed intent into project verification steps: lint then build.',
        toolRequests: [
          { toolId: 'tool-terminal', command: 'npm run lint', riskLevel: 'LOW', skillId: 'skill-testing' },
        ],
      };
    }

    if (lower.includes('test') || lower.includes('vitest')) {
      return {
        turnId,
        status: 'CONTINUE',
        replyMessage: 'Decomposed intent into unit testing workflow.',
        toolRequests: [
          { toolId: 'tool-terminal', command: 'npm test', riskLevel: 'LOW', skillId: 'skill-testing' },
        ],
      };
    }

    if (lower.includes('repair') || lower.includes('fix') || lower.includes('build')) {
      return {
        turnId,
        status: 'CONTINUE',
        replyMessage: 'Decomposed intent into verification, repair, and build sequence.',
        toolRequests: [
          { toolId: 'tool-terminal', command: 'npm run lint', riskLevel: 'LOW', skillId: 'skill-testing' },
        ],
      };
    }

    // Default 2-step verification plan
    return {
      turnId,
      status: 'CONTINUE',
      replyMessage: 'Decomposed intent into standard verification workflow.',
      toolRequests: [
        { toolId: 'tool-terminal', command: 'npm run lint', riskLevel: 'LOW', skillId: 'skill-testing' },
      ],
    };
  }
}

export class ConversationProviderRegistry {
  private providers: Map<string, ConversationProvider> = new Map();
  private defaultProviderId = 'provider-mock-metalogos';

  constructor() {
    this.registerProvider(new MockMetaLogosProvider());
  }

  registerProvider(provider: ConversationProvider) {
    this.providers.set(provider.id, provider);
  }

  getProvider(id: string): ConversationProvider | undefined {
    return this.providers.get(id);
  }

  getDefaultProvider(): ConversationProvider {
    return this.providers.get(this.defaultProviderId) || new MockMetaLogosProvider();
  }
}

export const conversationProviderRegistry = new ConversationProviderRegistry();
export const defaultConversationProvider = conversationProviderRegistry.getDefaultProvider();
