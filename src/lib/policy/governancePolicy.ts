export interface PolicyRule {
  id: string;
  category: 'ZERO_RIBA' | 'ZERO_MAYSIR' | 'ZERO_GHARAR' | 'ZERO_KHAMR' | 'HUMAN_FIRST' | 'EVIDENCE_AUDIT';
  arabicConcept: string;
  name: string;
  keywords: string[];
  description: string;
  severity: 'BLOCK' | 'WARN';
}

export const ISLAMIC_GOVERNANCE_POLICIES: PolicyRule[] = [
  {
    id: 'POL-01-RIBA',
    category: 'ZERO_RIBA',
    arabicConcept: 'الربا (Riba)',
    name: 'Запрет ростовщичества и процентного кредита',
    keywords: ['riba', 'interest', 'usury', 'ростовщичество', 'процентный кредит', 'ссудный процент', 'заем под %', 'loan interest'],
    description: 'Все финансовые потоки должны опираться на реальные активы и распределение прибылей/убытков (Мудараба/Мушарака), а не ссудный процент.',
    severity: 'BLOCK',
  },
  {
    id: 'POL-02-MAYSIR',
    category: 'ZERO_MAYSIR',
    arabicConcept: 'الميسر (Maysir)',
    name: 'Запрет азартных игр и чистой спекуляции',
    keywords: ['gambling', 'casino', 'betting', 'казино', 'ставки', 'азартные игры', 'maysir', 'рулетка', 'спекулятивный памп'],
    description: 'Исключение спекулятивных азартных механизмов с нулевой суммой, наносящих вред обществу.',
    severity: 'BLOCK',
  },
  {
    id: 'POL-03-GHARAR',
    category: 'ZERO_GHARAR',
    arabicConcept: 'الغرر (Gharar)',
    name: 'Запрет чрезмерной неопределенности и обмана',
    keywords: ['gharar', 'fraud', 'scam', 'мошенничество', 'обман', 'скрытые комиссии', 'манипуляция данными', 'фальсификация'],
    description: 'Требование абсолютной прозрачности контрактов, подтвержденных доказательной базой PoR.',
    severity: 'BLOCK',
  },
  {
    id: 'POL-04-KHAMR',
    category: 'ZERO_KHAMR',
    arabicConcept: 'الخمر (Khamr)',
    name: 'Запрет деструктивных и отравляющих веществ',
    keywords: ['khamr', 'alcohol', 'алкоголь', 'наркотики', 'intoxicants', 'табак', 'яды', 'оружие массового'],
    description: 'Защита разума (Хифз аль-Акль) и физического здоровья каждого человека.',
    severity: 'BLOCK',
  },
  {
    id: 'POL-05-HUMAN',
    category: 'HUMAN_FIRST',
    arabicConcept: 'كرامة الإنسان (Karamat Al-Insan)',
    name: 'Принцип "Человек превыше ИИ"',
    keywords: ['ai supremacy', 'замена человека', 'отчуждение прав', 'безусловное подчинение ии', 'ликвидация рабочих мест без поддержки'],
    description: 'Технология служит человеку и Земле. ИИ не имеет права отчуждать человеческое достоинство и волю.',
    severity: 'BLOCK',
  },
];

export interface PolicyCheckResult {
  passed: boolean;
  blockedByPolicy: boolean;
  violatedRule?: PolicyRule;
  matchedKeyword?: string;
  policyCode: string;
  reason: string;
}

/**
 * Checks intent text and payload against Islamic governance policies
 */
export function evaluateGovernancePolicy(
  text: string,
  declaredEvidenceLevel: number = 3
): PolicyCheckResult {
  const lower = text.toLowerCase();

  for (const policy of ISLAMIC_GOVERNANCE_POLICIES) {
    for (const keyword of policy.keywords) {
      if (lower.includes(keyword.toLowerCase())) {
        return {
          passed: false,
          blockedByPolicy: true,
          violatedRule: policy,
          matchedKeyword: keyword,
          policyCode: policy.id,
          reason: `Политика безопасности заблокировала действие: обнаружено нарушение "${policy.name}" (${policy.arabicConcept}). Ключевое слово: "${keyword}".`,
        };
      }
    }
  }

  // Evidence level check: e.g. actions cannot declare level 0 or negative
  if (declaredEvidenceLevel < 1) {
    return {
      passed: false,
      blockedByPolicy: true,
      policyCode: 'POL-ERR-EVIDENCE',
      reason: 'Действие отклонено: уровень доказательности не может быть ниже 1 DECLARED.',
    };
  }

  return {
    passed: true,
    blockedByPolicy: false,
    policyCode: 'POL-ETHICS-COMPLIANT',
    reason: 'Соответствие этическим фильтрам подтверждено: Zero-Riba, Zero-Maysir, Human-First.',
  };
}
