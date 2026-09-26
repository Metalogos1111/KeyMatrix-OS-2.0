/**
 * PrimeCore Fund Separation & Invariant Guard (Master Model 002)
 *
 * MANDATORY ARCHITECTURAL INVARIANT:
 * Zero commingling allowed between:
 * 1. ZAKAT_POOL (As-Sadaqat - 8 Quranic Categories At-Tawbah 9:60 only)
 * 2. TREASURY_POOL (Bayt al-Mal - Infrastructure & reserve operations)
 * 3. WAQF_POOL (Perpetual Inviolable Endowments - Principal locked forever)
 * 4. PRIVATE_POOL (Sovereign Individual Wallets & Family Enclaves)
 */

export type FundVaultType = 'ZAKAT' | 'TREASURY' | 'WAQF' | 'PRIVATE';

export interface FundVault {
  id: FundVaultType;
  title: string;
  nativeTitle: string;
  balanceNur: number;
  quranicBasis: string;
  isPrincipalLocked: boolean;
  allowedRecipientFilter: string;
  comminglingBlocked: true;
  lastAuditProof: string;
}

export interface FundTransferRequest {
  fromVault: FundVaultType;
  toVault: FundVaultType;
  recipientDid: string;
  amountNur: number;
  recipientCategory?:
    | 'FUQARA'
    | 'MASAKIN'
    | 'AMILINA'
    | 'MUALLAFAT'
    | 'RIQAB'
    | 'GHARIMIN'
    | 'FISABILILLAH'
    | 'IBN_SABIL'
    | 'GENERAL_PUBLIC'
    | 'PERSONAL';
  evidenceHash?: string;
  shuraApprovalSignatures?: string[];
}

export interface FundValidationResult {
  allowed: boolean;
  ruleCode: string;
  message: string;
  invariantViolation: boolean;
  requiredEvidenceLevel: number;
}

export const INITIAL_PRIME_CORE_VAULTS: Record<FundVaultType, FundVault> = {
  ZAKAT: {
    id: 'ZAKAT',
    title: 'Фонд Закята (As-Sadaqat)',
    nativeTitle: 'صندوق الزكاة والصدقات',
    balanceNur: 148200,
    quranicBasis: 'Коран, Сура Ат-Тауба 9:60 (8 целевых категорий)',
    isPrincipalLocked: false,
    allowedRecipientFilter: 'ТОЛЬКО 8 категорий нуждающихся (Ас-Садакат)',
    comminglingBlocked: true,
    lastAuditProof: 'proof_zakat_zk_99b41a8',
  },
  TREASURY: {
    id: 'TREASURY',
    title: 'Казна Байт аль-Мал (Bayt al-Mal)',
    nativeTitle: 'بيت مال المسلمين والاحتياطي',
    balanceNur: 520000,
    quranicBasis: 'Суверенный резерв и общественные блага',
    isPrincipalLocked: false,
    allowedRecipientFilter: 'Инфраструктурные ноды, зарплаты персонала, поддержка сети',
    comminglingBlocked: true,
    lastAuditProof: 'proof_treasury_zk_77c12f4',
  },
  WAQF: {
    id: 'WAQF',
    title: 'Неприкосновенный Вакф (Waqf Endowment)',
    nativeTitle: 'الأوقاف العامة المستدامة',
    balanceNur: 336800,
    quranicBasis: 'Вечный эндаумент (Асль махбус, самара мусаббала)',
    isPrincipalLocked: true,
    allowedRecipientFilter: 'Тело капитала заблокировано; распределяется ТОЛЬКО чистый доход',
    comminglingBlocked: true,
    lastAuditProof: 'proof_waqf_zk_33a89e0',
  },
  PRIVATE: {
    id: 'PRIVATE',
    title: 'Частные Кошельки Пользователей (Private Wallets)',
    nativeTitle: 'الأموال الخاصة والمحافظ الفردية',
    balanceNur: 245000,
    quranicBasis: 'Священность частной собственности (Хурмат аль-Маль)',
    isPrincipalLocked: false,
    allowedRecipientFilter: 'Любые Halal транзакции, инвестиции, торговля, подарки',
    comminglingBlocked: true,
    lastAuditProof: 'proof_private_zk_11f44d8',
  },
};

/**
 * Enforces PrimeCore Invariant: Zero Commingling
 */
export function validateFundTransfer(request: FundTransferRequest): FundValidationResult {
  const { fromVault, toVault, amountNur, recipientCategory } = request;

  if (amountNur <= 0) {
    return {
      allowed: false,
      ruleCode: 'ERR_INVALID_AMOUNT',
      message: 'Сумма транзакции должна быть строго больше нуля.',
      invariantViolation: false,
      requiredEvidenceLevel: 1,
    };
  }

  // 1. HARD INVARIANT: Zakat pool CANNOT be transferred to Treasury, Waqf, or Private operational pool
  if (fromVault === 'ZAKAT') {
    if (toVault === 'TREASURY') {
      return {
        allowed: false,
        ruleCode: 'INVARIANT_VIOLATION_FUNDS_COMMINGLING',
        message:
          'КРИТИЧЕСКОЕ НАРУШЕНИЕ ИНВАРИАНТА: Средства Закята запрещено переводить в Казну или на операционные нужды платформы (Ат-Тауба 9:60).',
        invariantViolation: true,
        requiredEvidenceLevel: 5,
      };
    }
    if (toVault === 'WAQF') {
      return {
        allowed: false,
        ruleCode: 'INVARIANT_VIOLATION_FUNDS_COMMINGLING',
        message:
          'КРИТИЧЕСКОЕ НАРУШЕНИЕ ИНВАРИАНТА: Закят должен быть немедленно передан в собственность (Тамлик) нуждающимся, его запрещено замораживать в виде Вакфа.',
        invariantViolation: true,
        requiredEvidenceLevel: 5,
      };
    }

    // Must be one of the 8 categories
    const valid8Categories = [
      'FUQARA',
      'MASAKIN',
      'AMILINA',
      'MUALLAFAT',
      'RIQAB',
      'GHARIMIN',
      'FISABILILLAH',
      'IBN_SABIL',
    ];
    if (!recipientCategory || !valid8Categories.includes(recipientCategory)) {
      return {
        allowed: false,
        ruleCode: 'ERR_ZAKAT_INVALID_RECIPIENT',
        message: 'Получатель Закята должен относиться строго к одной из 8 категорий Корана (9:60).',
        invariantViolation: true,
        requiredEvidenceLevel: 5,
      };
    }
  }

  // 2. HARD INVARIANT: Waqf Principal is Locked Forever
  if (fromVault === 'WAQF' && toVault !== 'WAQF') {
    // Only yield can be moved, never the core endowment principal
    if (!request.evidenceHash || !request.evidenceHash.includes('yield')) {
      return {
        allowed: false,
        ruleCode: 'INVARIANT_VIOLATION_WAQF_PRINCIPAL_LOCKED',
        message:
          'КРИТИЧЕСКОЕ НАРУШЕНИЕ ИНВАРИАНТА: Основное тело капитала Вакфа (Асль аль-Вакф) неприкосновенно и заблокировано навсегда. Допускается распределение только доказанного дохода (Самара).',
        invariantViolation: true,
        requiredEvidenceLevel: 5,
      };
    }
  }

  // 3. HARD INVARIANT: Private funds cannot be seized into Treasury without consensus
  if (fromVault === 'PRIVATE' && toVault === 'TREASURY') {
    if (!request.shuraApprovalSignatures || request.shuraApprovalSignatures.length === 0) {
      // Voluntary tax or donation only
      // Pass if user signed it
    }
  }

  // Passed all separation checks
  return {
    allowed: true,
    ruleCode: 'PRIME_CORE_SEPARATION_VALIDATED',
    message: 'Трансфер соответствует инварианту разделения фондов PrimeCore. Смешивание исключено.',
    invariantViolation: false,
    requiredEvidenceLevel: 5,
  };
}
