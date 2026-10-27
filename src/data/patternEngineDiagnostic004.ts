/**
 * Targeted heavy-tailed diagnostic 004, selected after follow-up 003.
 * Diagnostic only; it does not replace the recorded 003 failure or authorize promotion.
 */
export const PATTERN_ENGINE_HEAVY_TAIL_DIAGNOSTIC_004 = {
  benchmarkId: 'KM-PATTERN-ENGINE-001-HEAVY-TAIL-DIAGNOSTIC-004',
  seed: 20261029,
  families: 5000,
  hypothesesPerFamily: 3,
  totalHypothesisTests: 15000,
  permutationsPerTest: 999,
  totalPermutations: 14985000,
  rawFpr: 0.049466666666666666,
  rawFprWilson95: [0.046110441054878916, 0.05305359389605017] as [number, number],
  familywiseAnyRejectionRate: 0.044,
  familywiseWilson95: [0.038656640337733486, 0.05004350383615862] as [number, number],
  planSha256: 'bbb6c6287ffe1d63efd851371afe1a65494a83569abdda0c043dca13cdf039dc',
  resultsSha256: 'ae7a49d8605569b392d41b2a29c73ccfb1182f988e0e877e84a8f1ea4e1e5a08',
  status: 'EXECUTED_DIAGNOSTIC_NOT_REPLACEMENT_ACCEPTANCE',
  selectedAfterFollowUp003Failure: true,
  original003FailureErased: false,
  externalIndependentReplicationObserved: false,
  runtimeIntegrationObserved: false,
  promotionAllowed: false,
} as const;
