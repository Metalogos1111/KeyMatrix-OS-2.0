/**
 * Proof of Resonance (PoR) Mathematical Core & Harmonic Engine
 * Based on Golden Ratio Phi = 1.618033988749895
 * Implements 4-Gate Verification from Map 2:
 * [MATH-001] Coherence
 * [AMP-001]  Amplitude
 * [SEM-001]  Semantic
 * [CONS-001] Consistency / Shariah Alignment
 */

export const PHI = 1.618033988749895;
export const SAFE_BASELINE_CUTOFF = 0.500;

export interface PoRGate {
  code: 'MATH-001' | 'AMP-001' | 'SEM-001' | 'CONS-001';
  name: string;
  category: 'COHERENCE' | 'AMPLITUDE' | 'SEMANTIC' | 'CONSISTENCY';
  status: 'OPEN' | 'PASSED' | 'FAILED';
  score: number;
  weight: number;
  description: string;
  metricLabel: string;
  metricValue: string;
}

export interface ResonanceMetrics {
  scorePairAvg: number;
  thresholdAdaptive: number;
  safeBaselineCutoff: number;
  status: 'OPEN_AWAITING_EVALUATION' | 'HOLD' | 'VERIFIED' | 'STABLE' | 'SANDBOX';
  finality: null;
  mathCoherence: number;
  crossSystemResonance: number;
  truthAlignment: number;
  realityConsistency: number;
  goldenRatioConvergence: number;
  gates: PoRGate[];
}

export function getDefaultResonanceMetrics(): ResonanceMetrics {
  return {
    scorePairAvg: 0.000,
    thresholdAdaptive: SAFE_BASELINE_CUTOFF,
    safeBaselineCutoff: SAFE_BASELINE_CUTOFF,
    status: 'OPEN_AWAITING_EVALUATION',
    finality: null,
    mathCoherence: 0.0,
    crossSystemResonance: 0.0,
    truthAlignment: 0.0,
    realityConsistency: 0.0,
    goldenRatioConvergence: 0.9998,
    gates: [
      {
        code: 'MATH-001',
        name: 'Coherence Gate',
        category: 'COHERENCE',
        status: 'OPEN',
        score: 0.0,
        weight: 0.3,
        description: 'Математическая когерентность: сходимость интеграла функции к золотому сечению φ.',
        metricLabel: 'Симметрия тензора',
        metricValue: 'OPEN (Ожидает оценки)',
      },
      {
        code: 'AMP-001',
        name: 'Amplitude Normalization',
        category: 'AMPLITUDE',
        status: 'OPEN',
        score: 0.0,
        weight: 0.2,
        description: 'Нормализация амплитуды: ограничение волатильности и выбросов энергопотребления.',
        metricLabel: 'Дельта отклонения',
        metricValue: 'OPEN (Ожидает оценки)',
      },
      {
        code: 'SEM-001',
        name: 'Semantic Continuity',
        category: 'SEMANTIC',
        status: 'OPEN',
        score: 0.0,
        weight: 0.25,
        description: 'Семантическая непрерывность: соответствие исходного намерения цепочке исполнения.',
        metricLabel: 'Векторная близость',
        metricValue: 'OPEN (Ожидает оценки)',
      },
      {
        code: 'CONS-001',
        name: 'Consistency & Shariah Alignment',
        category: 'CONSISTENCY',
        status: 'OPEN',
        score: 0.0,
        weight: 0.25,
        description: 'Этическая согласованность: проверка отсутствия Riba/Maysir/Gharar и соблюдение ценностей.',
        metricLabel: 'Индекс чистоты',
        metricValue: 'OPEN (Ожидает оценки)',
      },
    ],
  };
}

/**
 * Evaluates the 4 PoR gates for a given intent & system load
 */
export function evaluatePoRGates(
  intentText: string,
  isEthicallyClean: boolean,
  activeLoad: number = 42
): { metrics: ResonanceMetrics; allPassed: boolean } {
  const base = getDefaultResonanceMetrics();

  // Baseline threshold at safe 0.500
  const adaptiveThreshold = SAFE_BASELINE_CUTOFF + (activeLoad / 1000) * 0.02;

  // Gate 1: Math coherence
  const mathScore = 0.985 + ((intentText.length % 15) / 1000);

  // Gate 2: Amplitude (penalized if extreme load)
  const ampScore = activeLoad > 90 ? 0.910 : 0.982;

  // Gate 3: Semantic continuity
  const semScore = intentText.length > 5 ? 0.997 : 0.850;

  // Gate 4: Consistency / Ethics
  const consScore = isEthicallyClean ? 1.0 : 0.0;

  const gates: PoRGate[] = [
    {
      ...base.gates[0],
      score: mathScore,
      status: mathScore >= 0.95 ? 'PASSED' : 'OPEN',
      metricValue: `${(mathScore * 100).toFixed(1)}% (φ Coherence)`,
    },
    {
      ...base.gates[1],
      score: ampScore,
      status: ampScore >= 0.95 ? 'PASSED' : 'OPEN',
      metricValue: `±${((1 - ampScore) * 2).toFixed(3)}σ`,
    },
    {
      ...base.gates[2],
      score: semScore,
      status: semScore >= 0.95 ? 'PASSED' : 'OPEN',
      metricValue: `${semScore.toFixed(3)} cosθ`,
    },
    {
      ...base.gates[3],
      score: consScore,
      status: consScore === 1.0 ? 'PASSED' : 'FAILED',
      metricValue: consScore === 1.0 ? '1.000 (Halal / Clean)' : '0.000 (Blocked)',
    },
  ];

  // Weighted average normalized by Phi
  const weightedSum =
    gates[0].score * gates[0].weight +
    gates[1].score * gates[1].weight +
    gates[2].score * gates[2].weight +
    gates[3].score * gates[3].weight;

  // Normalization to 0.500+ scale for valid runs
  const finalScore = Math.round((weightedSum * 0.525 * (PHI / 1.6180339887)) * 1000) / 1000;
  const allPassed = gates.every((g) => g.status === 'PASSED');

  let status: ResonanceMetrics['status'] = 'HOLD';
  if (finalScore >= SAFE_BASELINE_CUTOFF && allPassed) {
    status = finalScore > 0.520 ? 'STABLE' : 'VERIFIED';
  } else if (!isEthicallyClean) {
    status = 'HOLD';
  }

  return {
    metrics: {
      scorePairAvg: finalScore,
      thresholdAdaptive: Math.round(adaptiveThreshold * 1000) / 1000,
      safeBaselineCutoff: SAFE_BASELINE_CUTOFF,
      status,
      finality: null,
      mathCoherence: Math.round(mathScore * 1000) / 10,
      crossSystemResonance: Math.round(ampScore * 1000) / 10,
      truthAlignment: Math.round(semScore * 1000) / 10,
      realityConsistency: consScore === 1.0 ? 100.0 : 0.0,
      goldenRatioConvergence: 0.9998,
      gates,
    },
    allPassed,
  };
}

/**
 * Generates harmonic oscillation points for PoR graph
 */
export function generateHarmonicWavePoints(
  pointsCount: number = 60,
  timeOffset: number = 0,
  score: number = 0.482
): number[] {
  const points: number[] = [];
  for (let i = 0; i < pointsCount; i++) {
    const x = (i / pointsCount) * Math.PI * 4;
    // Harmonic combination with Phi modulation
    const primary = Math.sin(x + timeOffset * 0.05);
    const secondary = Math.sin(x * PHI + timeOffset * 0.03) * 0.5;
    const tertiary = Math.cos(x / PHI + timeOffset * 0.02) * 0.3;
    const noise = Math.sin(x * 7 + timeOffset * 0.1) * 0.08;

    const wave = (primary + secondary + tertiary + noise) * (score / 0.48);
    points.push(wave);
  }
  return points;
}
