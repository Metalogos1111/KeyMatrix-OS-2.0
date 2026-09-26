import React, { useState } from 'react';
import {
  Brain,
  ShieldCheck,
  GraduationCap,
  HeartHandshake,
  Users,
  Bot,
  Sparkles,
  KeyRound,
  CheckCircle2,
  Shield,
  Layers,
  Scale,
  Award,
  Fingerprint,
} from 'lucide-react';
import { EvidenceBadge } from '../common/EvidenceBadge';

export type CouncilCategory =
  | 'MetaLogos'
  | 'TawhidCore'
  | 'MentorCircle'
  | 'GuardianLayer'
  | 'CommunityLayer'
  | 'AICouncil';

interface CouncilMember {
  name: string;
  title: string;
  did: string;
  location: string;
  weight: number;
  status: 'ACTIVE' | 'STANDBY' | 'DELEGATED';
  specialty: string;
}

interface CouncilInfo {
  id: CouncilCategory;
  name: string;
  arabicName: string;
  icon: React.ElementType;
  mandate: string;
  weightPct: number;
  quorumReq: string;
  invariant: string;
  members: CouncilMember[];
}

export const COUNCILS_DATA: Record<CouncilCategory, CouncilInfo> = {
  MetaLogos: {
    id: 'MetaLogos',
    name: 'MetaLogos Council',
    arabicName: 'مجلس العقل والمنطق',
    icon: Brain,
    mandate: 'Формальная семантическая декомпозиция намерений, проверка логических инвариантов и математическая когерентность.',
    weightPct: 25,
    quorumReq: '4 из 5 подписей DID (80%)',
    invariant: 'Semantic Integrity & Truth Coherence (Haqq)',
    members: [
      {
        name: 'Dr. Rustam Aliyev',
        title: 'Chief Semantic Architect',
        did: 'did:keymatrix:baku:metalogos-chair-01',
        location: 'Baku Node (Caspian Hub)',
        weight: 6.25,
        status: 'ACTIVE',
        specialty: 'Formal Logic & Intent Compilers',
      },
      {
        name: 'Dr. Leyla Mammadova',
        title: 'Cognitive Model Lead',
        did: 'did:keymatrix:baku:metalogos-sec-02',
        location: 'Baku Node',
        weight: 6.25,
        status: 'ACTIVE',
        specialty: 'Resonance VAE & Epistemics',
      },
      {
        name: 'Prof. Farhad Huseynov',
        title: 'Knowledge Graph Principal',
        did: 'did:keymatrix:ist:metalogos-kg-03',
        location: 'Istanbul Hub',
        weight: 6.25,
        status: 'ACTIVE',
        specialty: 'Ontology Verification',
      },
      {
        name: 'Sara Tabatabaei',
        title: 'Formal Verification Fellow',
        did: 'did:keymatrix:teh:metalogos-ver-04',
        location: 'Tehran Node',
        weight: 6.25,
        status: 'ACTIVE',
        specialty: 'BFT Invariants',
      },
    ],
  },
  TawhidCore: {
    id: 'TawhidCore',
    name: 'TawhidCore Fiqh & Ethics',
    arabicName: 'مجلس التوحيد والفقه الأخلاقي',
    icon: Scale,
    mandate: 'Этическая валидация по 5 столпам (Haqq, Adl, Hikmah, Rahmah, Ilkmah Trust). Блокировка Риба, Гарар, Майсир.',
    weightPct: 30,
    quorumReq: 'Единогласный консенсус (100%) по вето',
    invariant: 'Absolute Prohibition of Riba & Exploitation (Adl & Tawhid)',
    members: [
      {
        name: 'Sheikh Dr. Ibrahim Gasimov',
        title: 'Senior Shariah Mufti & Scholar',
        did: 'did:keymatrix:baku:tawhid-mufti-01',
        location: 'Baku Central Waqf',
        weight: 10.0,
        status: 'ACTIVE',
        specialty: 'Islamic Finance & AAOIFI Standards',
      },
      {
        name: 'Dr. Fatima Al-Zahra',
        title: 'Maqasid al-Shariah Ethicist',
        did: 'did:keymatrix:doha:tawhid-ethic-02',
        location: 'Doha Research Hub',
        weight: 10.0,
        status: 'ACTIVE',
        specialty: 'Algorithmic Justice & Fiqh of AI',
      },
      {
        name: 'Ustadh Mansur Khan',
        title: 'Zero-Riba Auditor General',
        did: 'did:keymatrix:khi:tawhid-audit-03',
        location: 'Karachi Node',
        weight: 10.0,
        status: 'ACTIVE',
        specialty: 'Smart Contract Shariah Compliance',
      },
    ],
  },
  MentorCircle: {
    id: 'MentorCircle',
    name: 'Mentor & Wisdom Circle',
    arabicName: 'مجلس الحكماء والمربين',
    icon: GraduationCap,
    mandate: 'Оценка долгосрочного цивилизационного влияния, образовательных траекторий и сохранения культурного наследия.',
    weightPct: 15,
    quorumReq: '3 из 4 голосов старейшин (75%)',
    invariant: 'Civilizational Sustainability & Wisdom (Hikmah)',
    members: [
      {
        name: 'Prof. Anar Gurbanov',
        title: 'Civilizational Studies Chair',
        did: 'did:keymatrix:baku:mentor-chair-01',
        location: 'Baku State Univ',
        weight: 5.0,
        status: 'ACTIVE',
        specialty: 'History & Ethics of Knowledge',
      },
      {
        name: 'Dr. Zaynab Qureshi',
        title: 'Educational Pedagogy Director',
        did: 'did:keymatrix:lhr:mentor-edu-02',
        location: 'Lahore Hub',
        weight: 5.0,
        status: 'ACTIVE',
        specialty: 'Talent & Virtue Formation',
      },
      {
        name: 'Dr. Eldar Mahmudov',
        title: 'Inter-Civilizational Dialogue Fellow',
        did: 'did:keymatrix:ank:mentor-civ-03',
        location: 'Ankara Node',
        weight: 5.0,
        status: 'ACTIVE',
        specialty: 'Epistemic Pluralism',
      },
    ],
  },
  GuardianLayer: {
    id: 'GuardianLayer',
    name: 'Guardian & Wilayah Layer',
    arabicName: 'طبقة الولاية وحماية الأسرة',
    icon: HeartHandshake,
    mandate: 'Защита семьи, опекунский надзор за несовершеннолетними, когнитивный суверенитет и защита приватности.',
    weightPct: 15,
    quorumReq: 'Простое большинство опекунов (66%)',
    invariant: 'Protection of Vulnerable & Child Sovereignty (Rahmah)',
    members: [
      {
        name: 'Amina Karimova',
        title: 'Family Council President',
        did: 'did:keymatrix:baku:guardian-pres-01',
        location: 'Baku Family Mesh',
        weight: 5.0,
        status: 'ACTIVE',
        specialty: 'Child Cognitive Safety Policies',
      },
      {
        name: 'Murad Baghirov',
        title: 'Parental Privacy Custodian',
        did: 'did:keymatrix:baku:guardian-priv-02',
        location: 'Baku Node',
        weight: 5.0,
        status: 'ACTIVE',
        specialty: 'ZK Family Enclaves & Safe Balance',
      },
      {
        name: 'Dr. Maryam Jamil',
        title: 'Child Psychology Advisor',
        did: 'did:keymatrix:dub:guardian-psy-03',
        location: 'Dubai Hub',
        weight: 5.0,
        status: 'ACTIVE',
        specialty: 'Digital Wellness & AI Guidance',
      },
    ],
  },
  CommunityLayer: {
    id: 'CommunityLayer',
    name: 'Community Assembly (Ummah Voice)',
    arabicName: 'مجلس الأمة والمشاركة العامة',
    icon: Users,
    mandate: 'Прямой демократический голос участников, волеизъявление местных сообществ и приоритизация общественных благ (Вакф).',
    weightPct: 10,
    quorumReq: 'Кворум 60% от всех активных DID участников',
    invariant: 'Popular Sovereignty & Public Consultation (Shura)',
    members: [
      {
        name: 'Caspian Citizen Assembly',
        title: 'Decentralized Civic Delegators',
        did: 'did:keymatrix:baku:community-caspian-pool',
        location: '14,280 Verified Citizens',
        weight: 3.5,
        status: 'ACTIVE',
        specialty: 'Local Eco & Infrastructure Proposals',
      },
      {
        name: 'Global KeyMatrix Waqf Guild',
        title: 'Endowment Delegators',
        did: 'did:keymatrix:global:waqf-guild-pool',
        location: '8,450 Global Benefactors',
        weight: 3.5,
        status: 'ACTIVE',
        specialty: 'Social Grants & Community Initiatives',
      },
      {
        name: 'Youth Innovators Circle',
        title: 'Next-Gen Builders Council',
        did: 'did:keymatrix:global:youth-builders-pool',
        location: '6,120 Young Innovators',
        weight: 3.0,
        status: 'ACTIVE',
        specialty: 'Education & Creative Labs',
      },
    ],
  },
  AICouncil: {
    id: 'AICouncil',
    name: 'AI & Algorithmic Council',
    arabicName: 'مجلس الذكاء الاصطناعي الاستشاري',
    icon: Bot,
    mandate: 'Машинный аудит, прогноз устойчивости системы, мониторинг аномалий и консультативное моделирование (AI Advisory only, no unassisted authority).',
    weightPct: 5,
    quorumReq: 'Автономная телеметрия + Верификация TEE Enclave',
    invariant: 'AI Assists Analysis, Never Holds Autonomous Authority (Rule #12)',
    members: [
      {
        name: 'MetaLogos Reasoning Agent v3.4',
        title: 'Autonomous Logic Auditor',
        did: 'did:keymatrix:bot:metalogos-eval-agent',
        location: 'TEE Secure Enclave #01',
        weight: 2.0,
        status: 'ACTIVE',
        specialty: 'Bayesian Impact Modeling & DAG Validation',
      },
      {
        name: 'PrimeCore Security Sentinel',
        title: 'Cryptographic Guard Agent',
        did: 'did:keymatrix:bot:primecore-sentinel',
        location: 'TEE Secure Enclave #02',
        weight: 1.5,
        status: 'ACTIVE',
        specialty: 'Anomaly Detection & Zero-Day Defense',
      },
      {
        name: 'Caspian Telemetry Oracle',
        title: 'Environmental Sensing Agent',
        did: 'did:keymatrix:bot:caspian-oracle',
        location: 'Baku Sensor Grid (Hovsan/Nargin)',
        weight: 1.5,
        status: 'ACTIVE',
        specialty: 'Ecological Data Feed Verification',
      },
    ],
  },
};

export const NurCouncil: React.FC = () => {
  const [selectedCouncil, setSelectedCouncil] = useState<CouncilCategory>('TawhidCore');
  const council = COUNCILS_DATA[selectedCouncil];
  const Icon = council.icon;

  const councilKeys = Object.keys(COUNCILS_DATA) as CouncilCategory[];

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Top Banner with 786 Resonance Quality HIGH */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0b1736]/90 via-[#071026]/85 to-[#040816]/95 border border-cyan-800/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-bold flex items-center gap-1.5 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              786 RESONANCE QUALITY: <strong className="text-white">HIGH (0.998)</strong>
            </span>
            <span>•</span>
            <span>M10 POLICY & SHURA GOVERNANCE</span>
            <span>•</span>
            <EvidenceBadge level={5} compact />
          </div>
          <h2 className="text-base font-bold text-white tracking-wide flex items-center gap-2">
            <Scale className="w-5 h-5 text-amber-400" />
            Совет НУР (NUR Council & Multi-Stakeholder Shura)
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            6 Палат принятия решений с дифференцированными весами, строгой криптографической проверкой DID и защитой инвариантов
          </p>
        </div>

        {/* Global Council Status Summary */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-900/50 text-right font-mono text-xs">
            <span className="text-[10px] text-slate-400 block">Совокупный вес палат</span>
            <span className="text-emerald-400 font-bold">100% (6 Палат Активны)</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-900/50 text-right font-mono text-xs">
            <span className="text-[10px] text-slate-400 block">Порог супер-большинства</span>
            <span className="text-cyan-300 font-bold">≥ 75.0%</span>
          </div>
        </div>
      </div>

      {/* 6 Tabs Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {councilKeys.map((cKey) => {
          const item = COUNCILS_DATA[cKey];
          const ItemIcon = item.icon;
          const isSelected = selectedCouncil === cKey;
          return (
            <button
              key={cKey}
              onClick={() => setSelectedCouncil(cKey)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-b from-cyan-950/80 to-blue-950/80 border-cyan-400 ring-2 ring-cyan-400/40 shadow-[0_0_15px_rgba(0,212,255,0.25)]'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <ItemIcon
                  className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`}
                />
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-amber-300 font-bold">
                  {item.weightPct}%
                </span>
              </div>
              <div>
                <span
                  className={`text-xs font-bold block truncate ${
                    isSelected ? 'text-white' : 'text-slate-300'
                  }`}
                >
                  {item.name.split(' ')[0]}
                </span>
                <span className="text-[9px] font-mono text-slate-500 block truncate">
                  {item.arabicName}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Council Detail Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-b from-[#09152e]/80 to-[#040816]/90 border border-cyan-900/40 shadow-xl space-y-4">
        {/* Council Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-cyan-900/40 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 shadow-[0_0_12px_rgba(0,212,255,0.2)]">
              <Icon className="w-6 h-6 text-cyan-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-wide">{council.name}</h3>
                <span className="text-xs font-mono text-amber-400 font-serif">
                  {council.arabicName}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">{council.mandate}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-right">
              <span className="text-[10px] text-slate-400 block">Голосовой вес</span>
              <strong className="text-cyan-400 text-sm">{council.weightPct}%</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-right">
              <span className="text-[10px] text-slate-400 block">Кворум принятия</span>
              <strong className="text-emerald-400">{council.quorumReq}</strong>
            </div>
          </div>
        </div>

        {/* Primary Invariant Banner */}
        <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/40 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-cyan-300">
            <Shield className="w-4 h-4 text-amber-400" />
            <span>
              Фундаментальный инвариант: <strong className="text-white">{council.invariant}</strong>
            </span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            GUARDED
          </span>
        </div>

        {/* Members and DID Keys List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">
              Члены Палаты и Криптографические DID Ключи ({council.members.length})
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              Identity ≠ Authority • Подпись Ed25519
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {council.members.map((m, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2 hover:border-cyan-800/60 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-xs font-bold text-white">{m.name}</div>
                    <div className="text-[11px] text-slate-400">{m.title}</div>
                  </div>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                    {m.status}
                  </span>
                </div>

                <div className="text-[10px] font-mono text-cyan-300 bg-black/50 p-1.5 rounded border border-cyan-950/60 flex items-center gap-1">
                  <Fingerprint className="w-3 h-3 text-cyan-400 shrink-0" />
                  <span className="truncate">{m.did}</span>
                </div>

                <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>{m.location}</span>
                  <span className="text-amber-400 font-bold">Вес: {m.weight}%</span>
                </div>

                <div className="text-[10px] text-slate-400 italic">
                  Специализация: {m.specialty}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
