import { UserRole } from '../../types';

export interface ShuraSigner {
  id: string;
  name: string;
  title: string;
  avatar: string;
  did: string;
  signed: boolean;
  signatureHash?: string;
}

export interface AuthorityThresholds {
  maxPeopleWithoutShura: number;
  maxCo2WithoutShura: number;
  maxNurWithoutShura: number;
}

export const SHURA_RULE_42 = {
  id: 'SHURA-RULE-42',
  title: 'Shura Rule #42: High-Impact Consensus Safeguard',
  mandate:
    'Any action affecting >1000 people, >500t CO2, or involving >1000 NUR requires 3-of-5 Shura council cryptographic signatures.',
  requiredSignatures: 3,
  totalCouncilMembers: 5,
  thresholds: {
    maxPeopleWithoutShura: 1000,
    maxCo2WithoutShura: 500,
    maxNurWithoutShura: 1000,
  },
};

export interface RolePermissions {
  role: UserRole;
  maxNurLimit: number;
  maxCo2Limit: number;
  maxPeopleLimit: number;
  canApproveShura: boolean;
  canAccessSandbox: boolean;
  canDeployAdapters: boolean;
  allowedEvidenceLevels: number[];
  label: string;
  description: string;
}

export const ROLE_PERMISSIONS_MATRIX: Record<UserRole, RolePermissions> = {
  Child: {
    role: 'Child',
    maxNurLimit: 10,
    maxCo2Limit: 0,
    maxPeopleLimit: 1,
    canApproveShura: false,
    canAccessSandbox: false,
    canDeployAdapters: false,
    allowedEvidenceLevels: [1, 2],
    label: 'Ребенок (Защищенный)',
    description: 'Строгая фильтрация контента, отсутствие финансовых и системных полномочий.',
  },
  Guardian: {
    role: 'Guardian',
    maxNurLimit: 100,
    maxCo2Limit: 10,
    maxPeopleLimit: 10,
    canApproveShura: false,
    canAccessSandbox: false,
    canDeployAdapters: false,
    allowedEvidenceLevels: [1, 2, 3],
    label: 'Опекун / Родитель',
    description: 'Надзор за детскими аккаунтами, семейный бюджет, безопасное просвещение.',
  },
  Adult: {
    role: 'Adult',
    maxNurLimit: 250,
    maxCo2Limit: 50,
    maxPeopleLimit: 100,
    canApproveShura: false,
    canAccessSandbox: false,
    canDeployAdapters: false,
    allowedEvidenceLevels: [1, 2, 3, 4, 5],
    label: 'Взрослый гражданин',
    description: 'Базовый участник: генерация намерений, пожертвования, участие в проектах.',
  },
  Teacher: {
    role: 'Teacher',
    maxNurLimit: 500,
    maxCo2Limit: 100,
    maxPeopleLimit: 300,
    canApproveShura: false,
    canAccessSandbox: true,
    canDeployAdapters: false,
    allowedEvidenceLevels: [1, 2, 3, 4, 5],
    label: 'Преподаватель',
    description: 'Курирование образовательных материалов, групповые инициативы.',
  },
  Instructor: {
    role: 'Instructor',
    maxNurLimit: 600,
    maxCo2Limit: 150,
    maxPeopleLimit: 400,
    canApproveShura: false,
    canAccessSandbox: true,
    canDeployAdapters: false,
    allowedEvidenceLevels: [1, 2, 3, 4, 5],
    label: 'Инструктор',
    description: 'Практические руководства по этике, технологиям и наставничество.',
  },
  Researcher: {
    role: 'Researcher',
    maxNurLimit: 750,
    maxCo2Limit: 250,
    maxPeopleLimit: 500,
    canApproveShura: false,
    canAccessSandbox: true,
    canDeployAdapters: false,
    allowedEvidenceLevels: [1, 2, 3, 4, 5],
    label: 'Исследователь',
    description: 'Анализ PoR гармоник, доступ к историческим архивам и симуляциям.',
  },
  Developer: {
    role: 'Developer',
    maxNurLimit: 1000,
    maxCo2Limit: 300,
    maxPeopleLimit: 500,
    canApproveShura: false,
    canAccessSandbox: true,
    canDeployAdapters: true,
    allowedEvidenceLevels: [1, 2, 3, 4, 5],
    label: 'Разработчик',
    description: 'Создание адаптеров, работа в песочнице TEE, написание политик.',
  },
  Engineer: {
    role: 'Engineer',
    maxNurLimit: 1000,
    maxCo2Limit: 500,
    maxPeopleLimit: 800,
    canApproveShura: false,
    canAccessSandbox: true,
    canDeployAdapters: true,
    allowedEvidenceLevels: [1, 2, 3, 4, 5],
    label: 'Инженер систем',
    description: 'Управление аппаратными шлюзами, мониторинг стабильности и энергосистем.',
  },
  Moderator: {
    role: 'Moderator',
    maxNurLimit: 500,
    maxCo2Limit: 100,
    maxPeopleLimit: 1000,
    canApproveShura: false,
    canAccessSandbox: true,
    canDeployAdapters: false,
    allowedEvidenceLevels: [1, 2, 3, 4, 5],
    label: 'Модератор этики',
    description: 'Проверка соответствия халяль-политикам и эскалация в Совет Шуры.',
  },
  Shura: {
    role: 'Shura',
    maxNurLimit: 1000000,
    maxCo2Limit: 100000,
    maxPeopleLimit: 1000000,
    canApproveShura: true,
    canAccessSandbox: true,
    canDeployAdapters: true,
    allowedEvidenceLevels: [1, 2, 3, 4, 5],
    label: 'Совет Шуры (Shura Council)',
    description: 'Высший надзорный орган: утверждение решений масштаба цивилизации (Правило #42).',
  },
};

export const INITIAL_SHURA_COUNCIL: ShuraSigner[] = [
  {
    id: 'shura-1',
    name: 'Имам аль-Багир (Imam Al-Baqir)',
    title: 'Хранитель Этики и Шариата',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    did: 'did:key:km_shura_baqir_01',
    signed: true,
    signatureHash: 'sig_ed25519_99f01bc4a',
  },
  {
    id: 'shura-2',
    name: 'Шейх Заид (Sheikh Zaid)',
    title: 'Цивилизационное Правосудие (Фикх)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    did: 'did:key:km_shura_zaid_02',
    signed: true,
    signatureHash: 'sig_ed25519_44b12aa9e',
  },
  {
    id: 'shura-3',
    name: 'Д-р Наср (Dr. Seyyed Nasr)',
    title: 'Философия Науки и Космологии',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    did: 'did:key:km_shura_nasr_03',
    signed: true,
    signatureHash: 'sig_ed25519_18c5e0091',
  },
  {
    id: 'shura-4',
    name: 'Инж. Фарух Бакинский (Eng. Farooq)',
    title: 'Инфраструктурная и Энергетическая Безопасность',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
    did: 'did:key:km_shura_farooq_04',
    signed: false,
  },
  {
    id: 'shura-5',
    name: 'Марьям ас-Сабах (Sis. Maryam)',
    title: 'Гуманитарный Импакт и Благосостояние (Вакуф)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    did: 'did:key:km_shura_maryam_05',
    signed: false,
  },
];

export interface AuthorityCheckResult {
  passed: boolean;
  violatesRule42: boolean;
  exceedsRoleLimits: boolean;
  requiresShuraCouncil: boolean;
  shuraQuorumMet: boolean;
  ruleCode: string;
  reason: string;
  activeSignersCount: number;
  requiredSignatures: number;
  details: {
    peopleAffected: number;
    co2Tons: number;
    nurAmount: number;
    userRole: UserRole;
  };
}

/**
 * Validates authority against role limits and Shura Rule #42
 */
export function checkAuthority(
  role: UserRole,
  params: {
    peopleAffected?: number;
    co2Tons?: number;
    nurAmount?: number;
    signers?: ShuraSigner[];
  }
): AuthorityCheckResult {
  const people = params.peopleAffected ?? 50;
  const co2 = params.co2Tons ?? 10;
  const nur = params.nurAmount ?? 100;
  const signers = params.signers ?? INITIAL_SHURA_COUNCIL;

  const rolePerm = ROLE_PERMISSIONS_MATRIX[role];
  const activeSignatures = signers.filter((s) => s.signed).length;
  const shuraQuorumMet = activeSignatures >= SHURA_RULE_42.requiredSignatures;

  // Check if exceeds threshold requiring Rule 42
  const requiresShuraCouncil =
    people > SHURA_RULE_42.thresholds.maxPeopleWithoutShura ||
    co2 > SHURA_RULE_42.thresholds.maxCo2WithoutShura ||
    nur > SHURA_RULE_42.thresholds.maxNurWithoutShura;

  // Does it exceed role limits?
  const exceedsRoleLimits =
    people > rolePerm.maxPeopleLimit ||
    co2 > rolePerm.maxCo2Limit ||
    nur > rolePerm.maxNurLimit;

  if (requiresShuraCouncil) {
    if (role !== 'Shura') {
      return {
        passed: false,
        violatesRule42: true,
        exceedsRoleLimits: true,
        requiresShuraCouncil: true,
        shuraQuorumMet: false,
        ruleCode: 'SHURA_RULE_42_VIOLATION',
        reason: `Отказ по Shura Rule #42: Масштаб действия (>1000 людей, >500т CO2 или >1000 NUR) требует роли "Shura" и 3-из-5 подписей Совета. Текущая роль: [${role}].`,
        activeSignersCount: activeSignatures,
        requiredSignatures: SHURA_RULE_42.requiredSignatures,
        details: { peopleAffected: people, co2Tons: co2, nurAmount: nur, userRole: role },
      };
    }

    // Role is Shura, verify quorum
    if (!shuraQuorumMet) {
      return {
        passed: false,
        violatesRule42: true,
        exceedsRoleLimits: false,
        requiresShuraCouncil: true,
        shuraQuorumMet: false,
        ruleCode: 'SHURA_RULE_42_QUORUM_PENDING',
        reason: `Shura Rule #42 требует кворума: собрано ${activeSignatures} из ${SHURA_RULE_42.requiredSignatures} необходимых подписей членов Совета.`,
        activeSignersCount: activeSignatures,
        requiredSignatures: SHURA_RULE_42.requiredSignatures,
        details: { peopleAffected: people, co2Tons: co2, nurAmount: nur, userRole: role },
      };
    }

    return {
      passed: true,
      violatesRule42: false,
      exceedsRoleLimits: false,
      requiresShuraCouncil: true,
      shuraQuorumMet: true,
      ruleCode: 'SHURA_RULE_42_APPROVED',
      reason: `Shura Rule #42 соблюдено: Кворум Совета (${activeSignatures}/5 подписей) подтвержден криптографическими ключами.`,
      activeSignersCount: activeSignatures,
      requiredSignatures: SHURA_RULE_42.requiredSignatures,
      details: { peopleAffected: people, co2Tons: co2, nurAmount: nur, userRole: role },
    };
  }

  // Not requiring Shura council, check normal role permissions
  if (exceedsRoleLimits) {
    return {
      passed: false,
      violatesRule42: false,
      exceedsRoleLimits: true,
      requiresShuraCouncil: false,
      shuraQuorumMet,
      ruleCode: 'ROLE_LIMIT_EXCEEDED',
      reason: `Действие превышает лимит текущей роли [${role}]: Лимит NUR: ${rolePerm.maxNurLimit}, CO2: ${rolePerm.maxCo2Limit}т, Люди: ${rolePerm.maxPeopleLimit}.`,
      activeSignersCount: activeSignatures,
      requiredSignatures: 0,
      details: { peopleAffected: people, co2Tons: co2, nurAmount: nur, userRole: role },
    };
  }

  return {
    passed: true,
    violatesRule42: false,
    exceedsRoleLimits: false,
    requiresShuraCouncil: false,
    shuraQuorumMet,
    ruleCode: 'AUTHORITY_PASSED',
    reason: `Авторизация успешна. Параметры в пределах полномочий роли [${role}].`,
    activeSignersCount: activeSignatures,
    requiredSignatures: 0,
    details: { peopleAffected: people, co2Tons: co2, nurAmount: nur, userRole: role },
  };
}
