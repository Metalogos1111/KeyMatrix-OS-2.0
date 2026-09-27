import { UserRole, ActiveSection } from '../../types';

export interface RoleCapabilityConfig {
  role: UserRole;
  title: string;
  nativeTitle: string;
  badgeColor: string;
  description: string;
  // Accessible sections in the left sidebar
  allowedSections: ActiveSection[];
  // Permissions & Limits
  safeBalanceLimitNUR: number;
  canTransferNUR: boolean;
  canCreateProposal: boolean;
  canApproveShura: boolean;
  policyLimitsEnforced: boolean;
  guardianApprovalRequired: boolean;
  canAccessExperiments: boolean;
  canDeployAdapters: boolean;
  canAccessSystemRecovery: boolean;
  canEnforceModeration: boolean;
  allowedEvidenceLevels: number[];
  thresholds: {
    maxPeople: number;
    maxCo2Tons: number;
    maxNUR: number;
  };
}

export const ROLE_CAPABILITIES: Record<UserRole, RoleCapabilityConfig> = {
  Child: {
    role: 'Child',
    title: 'Child (Safe Mode)',
    nativeTitle: 'Ребенок (Безопасный режим)',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    description: 'Ограниченный защищенный режим: Главная, Компас, Время намаза, Коран и основы Ислама. Без финансовых переводов, баланс до 100 NUR под надзором.',
    allowedSections: ['home', 'qibla', 'prayer', 'islam', 'quran', 'faq'],
    safeBalanceLimitNUR: 100,
    canTransferNUR: false,
    canCreateProposal: false,
    canApproveShura: false,
    policyLimitsEnforced: true,
    guardianApprovalRequired: true,
    canAccessExperiments: false,
    canDeployAdapters: false,
    canAccessSystemRecovery: false,
    canEnforceModeration: false,
    allowedEvidenceLevels: [1, 2],
    thresholds: {
      maxPeople: 1,
      maxCo2Tons: 0,
      maxNUR: 0,
    },
  },
  Guardian: {
    role: 'Guardian',
    title: 'Guardian (Parent & Family)',
    nativeTitle: 'Опекун / Родитель',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    description: 'Надзор за детскими аккаунтами, одобрение транзакций детей, семейный образовательный контур и распределение бюджета.',
    allowedSections: ['home', 'qibla', 'prayer', 'islam', 'quran', 'faq', 'files', 'nur', 'community', 'settings'],
    safeBalanceLimitNUR: 5000,
    canTransferNUR: true,
    canCreateProposal: false,
    canApproveShura: false,
    policyLimitsEnforced: true,
    guardianApprovalRequired: false,
    canAccessExperiments: false,
    canDeployAdapters: false,
    canAccessSystemRecovery: false,
    canEnforceModeration: false,
    allowedEvidenceLevels: [1, 2, 3],
    thresholds: {
      maxPeople: 25,
      maxCo2Tons: 10,
      maxNUR: 500,
    },
  },
  Adult: {
    role: 'Adult',
    title: 'Adult (OM_Brother)',
    nativeTitle: 'Взрослый (OM_Brother)',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    description: 'Полноправный участник экосистемы: доступ ко всем модулям, запуск намерений до 1000 NUR, создание инициатив. Утверждение >1000 NUR эскалируется в Шуру.',
    allowedSections: [
      'home', 'qibla', 'prayer', 'islam', 'quran', 'faq', 'metalogos', 'projects',
      'files', 'nur', 'map', 'minfinity', 'domains', 'experiments', 'world', 'community', 'security', 'settings'
    ],
    safeBalanceLimitNUR: 50000,
    canTransferNUR: true,
    canCreateProposal: true,
    canApproveShura: false,
    policyLimitsEnforced: true,
    guardianApprovalRequired: false,
    canAccessExperiments: true,
    canDeployAdapters: false,
    canAccessSystemRecovery: false,
    canEnforceModeration: false,
    allowedEvidenceLevels: [1, 2, 3, 4, 5],
    thresholds: {
      maxPeople: 1000,
      maxCo2Tons: 500,
      maxNUR: 1000,
    },
  },
  Teacher: {
    role: 'Teacher',
    title: 'Teacher / Educator',
    nativeTitle: 'Учитель / Наставник',
    badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
    description: 'Все права Adult + управление образовательными траекториями, создание канонических знаний, оценка навыков и верификация студентов.',
    allowedSections: [
      'home', 'qibla', 'prayer', 'islam', 'quran', 'faq', 'metalogos', 'projects',
      'files', 'nur', 'map', 'minfinity', 'domains', 'experiments', 'world', 'community', 'security', 'settings'
    ],
    safeBalanceLimitNUR: 100000,
    canTransferNUR: true,
    canCreateProposal: true,
    canApproveShura: false,
    policyLimitsEnforced: true,
    guardianApprovalRequired: false,
    canAccessExperiments: true,
    canDeployAdapters: false,
    canAccessSystemRecovery: false,
    canEnforceModeration: false,
    allowedEvidenceLevels: [1, 2, 3, 4, 5],
    thresholds: {
      maxPeople: 1000,
      maxCo2Tons: 500,
      maxNUR: 1000,
    },
  },
  Instructor: {
    role: 'Instructor',
    title: 'Instructor / Mentor',
    nativeTitle: 'Инструктор / Ментор',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
    description: 'Практические мастер-классы по исламской этике технологий, валидация прикладных навыков и кураторство команд.',
    allowedSections: [
      'home', 'qibla', 'prayer', 'islam', 'quran', 'faq', 'metalogos', 'projects',
      'files', 'nur', 'map', 'minfinity', 'domains', 'experiments', 'world', 'community', 'security', 'settings'
    ],
    safeBalanceLimitNUR: 100000,
    canTransferNUR: true,
    canCreateProposal: true,
    canApproveShura: false,
    policyLimitsEnforced: true,
    guardianApprovalRequired: false,
    canAccessExperiments: true,
    canDeployAdapters: false,
    canAccessSystemRecovery: false,
    canEnforceModeration: false,
    allowedEvidenceLevels: [1, 2, 3, 4, 5],
    thresholds: {
      maxPeople: 1000,
      maxCo2Tons: 500,
      maxNUR: 1000,
    },
  },
  Researcher: {
    role: 'Researcher',
    title: 'Researcher / Scientist',
    nativeTitle: 'Исследователь / Ученый',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    description: 'Teacher + углубленные эксперименты PoR (Proof of Resonance), научный режим верификации, воспроизводимость расчетов.',
    allowedSections: [
      'home', 'qibla', 'prayer', 'islam', 'quran', 'faq', 'metalogos', 'projects',
      'files', 'nur', 'map', 'minfinity', 'domains', 'experiments', 'world', 'community', 'security', 'settings'
    ],
    safeBalanceLimitNUR: 150000,
    canTransferNUR: true,
    canCreateProposal: true,
    canApproveShura: false,
    policyLimitsEnforced: true,
    guardianApprovalRequired: false,
    canAccessExperiments: true,
    canDeployAdapters: false,
    canAccessSystemRecovery: false,
    canEnforceModeration: false,
    allowedEvidenceLevels: [1, 2, 3, 4, 5],
    thresholds: {
      maxPeople: 1000,
      maxCo2Tons: 500,
      maxNUR: 1000,
    },
  },
  Developer: {
    role: 'Developer',
    title: 'Core Developer',
    nativeTitle: 'Разработчик систем',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    description: 'Researcher + создание и регистрация адаптеров, Composer связок, генерация криптографических доказательств Evidence Ladder (1-5).',
    allowedSections: [
      'home', 'qibla', 'prayer', 'islam', 'quran', 'faq', 'metalogos', 'projects',
      'files', 'nur', 'map', 'minfinity', 'domains', 'experiments', 'world', 'community', 'security', 'settings'
    ],
    safeBalanceLimitNUR: 250000,
    canTransferNUR: true,
    canCreateProposal: true,
    canApproveShura: false,
    policyLimitsEnforced: true,
    guardianApprovalRequired: false,
    canAccessExperiments: true,
    canDeployAdapters: true,
    canAccessSystemRecovery: false,
    canEnforceModeration: false,
    allowedEvidenceLevels: [1, 2, 3, 4, 5],
    thresholds: {
      maxPeople: 1000,
      maxCo2Tons: 500,
      maxNUR: 1000,
    },
  },
  Engineer: {
    role: 'Engineer',
    title: 'Systems & Infrastructure Engineer',
    nativeTitle: 'Инженер инфраструктуры',
    badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
    description: 'Developer + управление runtime контурами, протоколами восстановления M12/M13, целостностью сенсоров и базой данных IndexedDB.',
    allowedSections: [
      'home', 'qibla', 'prayer', 'islam', 'quran', 'faq', 'metalogos', 'projects',
      'files', 'nur', 'map', 'minfinity', 'domains', 'experiments', 'world', 'community', 'security', 'settings'
    ],
    safeBalanceLimitNUR: 500000,
    canTransferNUR: true,
    canCreateProposal: true,
    canApproveShura: false,
    policyLimitsEnforced: true,
    guardianApprovalRequired: false,
    canAccessExperiments: true,
    canDeployAdapters: true,
    canAccessSystemRecovery: true,
    canEnforceModeration: false,
    allowedEvidenceLevels: [1, 2, 3, 4, 5],
    thresholds: {
      maxPeople: 1000,
      maxCo2Tons: 500,
      maxNUR: 1000,
    },
  },
  Moderator: {
    role: 'Moderator',
    title: 'Ethical & Community Moderator',
    nativeTitle: 'Модератор сообщества',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    description: 'Engineer + модерация контента сообщества, принудительное применение этических политик (TawhidCore), защита от фишинга и спама.',
    allowedSections: [
      'home', 'qibla', 'prayer', 'islam', 'quran', 'faq', 'metalogos', 'projects',
      'files', 'nur', 'map', 'minfinity', 'domains', 'experiments', 'world', 'community', 'security', 'settings'
    ],
    safeBalanceLimitNUR: 250000,
    canTransferNUR: true,
    canCreateProposal: true,
    canApproveShura: false,
    policyLimitsEnforced: true,
    guardianApprovalRequired: false,
    canAccessExperiments: true,
    canDeployAdapters: true,
    canAccessSystemRecovery: true,
    canEnforceModeration: true,
    allowedEvidenceLevels: [1, 2, 3, 4, 5],
    thresholds: {
      maxPeople: 1000,
      maxCo2Tons: 500,
      maxNUR: 1000,
    },
  },
  Shura: {
    role: 'Shura',
    title: 'Shura High Council Member',
    nativeTitle: 'Член Совета Шуры (M10)',
    badgeColor: 'bg-amber-400/20 text-amber-300 border-amber-400/50 shadow-[0_0_12px_rgba(251,191,36,0.3)]',
    description: 'Полное управление M10 Governance: Propose ≠ Approve ≠ Execute ≠ Audit. Утверждение действий >1000 людей, >500т CO2, >1000 NUR по кворуму 3-из-5 с вето TawhidCore.',
    allowedSections: [
      'home', 'qibla', 'prayer', 'islam', 'quran', 'faq', 'metalogos', 'projects',
      'files', 'nur', 'map', 'minfinity', 'domains', 'experiments', 'world', 'community', 'security', 'settings'
    ],
    safeBalanceLimitNUR: 10000000,
    canTransferNUR: true,
    canCreateProposal: true,
    canApproveShura: true,
    policyLimitsEnforced: true,
    guardianApprovalRequired: false,
    canAccessExperiments: true,
    canDeployAdapters: true,
    canAccessSystemRecovery: true,
    canEnforceModeration: true,
    allowedEvidenceLevels: [1, 2, 3, 4, 5],
    thresholds: {
      maxPeople: 10000000,
      maxCo2Tons: 1000000,
      maxNUR: 10000000,
    },
  },
};

export function isSectionAllowedForRole(role: UserRole, section: ActiveSection): boolean {
  if (section === 'dr-consistency') {
    return role !== 'Child';
  }
  const config = ROLE_CAPABILITIES[role];
  if (!config) return false;
  return config.allowedSections.includes(section);
}
