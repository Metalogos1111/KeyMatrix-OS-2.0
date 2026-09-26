import React, { useState } from 'react';
import {
  GitPullRequest,
  CheckCircle2,
  ShieldCheck,
  Scale,
  Sliders,
  Vote,
  FileCheck2,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Fingerprint,
  Users,
  Leaf,
  Coins,
  Cpu,
  Lock,
} from 'lucide-react';
import { EvidenceBadge } from '../common/EvidenceBadge';
import { useOSStore } from '../../store/osStore';

export interface DecisionStep {
  stepNumber: number;
  id: 'REQUEST' | 'VERIFY' | 'ASSESS' | 'ALIGN' | 'DECIDE' | 'EXECUTE';
  name: string;
  subName: string;
  desc: string;
  icon: React.ElementType;
}

const FLOW_STEPS: DecisionStep[] = [
  {
    stepNumber: 1,
    id: 'REQUEST',
    name: '1. REQUEST',
    subName: 'Подача намерения (Intent Ingress)',
    desc: 'Регистрация предложения инициатором с указанием цели, категории и предварительного обоснования.',
    icon: GitPullRequest,
  },
  {
    stepNumber: 2,
    id: 'VERIFY',
    name: '2. VERIFY (PoR Gate)',
    subName: 'Верификация Evidence + DID',
    desc: 'Проверка криптографического DID ключа, валидация уровня лестницы доказательств (Ladder ≥ L3) и PoR фильтра.',
    icon: Fingerprint,
  },
  {
    stepNumber: 3,
    id: 'ASSESS',
    name: '3. ASSESS',
    subName: 'Оценка Рисков и Влияния',
    desc: 'Калькуляция эффекта по людям (People Impact), декарбонизации (CO2 offset) и требуемому бюджету NUR.',
    icon: Sliders,
  },
  {
    stepNumber: 4,
    id: 'ALIGN',
    name: '4. ALIGN',
    subName: 'TawhidCore Этический Чек',
    desc: 'Формальный аудит по 5 ценностям: Haqq (Истина), Adl (Справедливость), Hikmah (Мудрость), Rahmah (Милосердие), Ilkmah (Доверие).',
    icon: Scale,
  },
  {
    stepNumber: 5,
    id: 'DECIDE',
    name: '5. DECIDE',
    subName: 'Голосование Совета НУР',
    desc: 'Взвешенное голосование 6 Палат (30% / 25% / 20% / 15% / 10%). Требуется Супер-большинство ≥ 75.0%.',
    icon: Vote,
  },
  {
    stepNumber: 6,
    id: 'EXECUTE',
    name: '6. EXECUTE',
    subName: 'Исполнение и Аудит-Лог',
    desc: 'Атомарное исполнение смарт-контракта, запись в неизменяемый криптографический реестр (Immutable Audit Logs).',
    icon: FileCheck2,
  },
];

export const DecisionFlow: React.FC = () => {
  const { addLog } = useOSStore();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Proposal State for the Decision Flow Workbench
  const [proposalTitle, setProposalTitle] = useState(
    'Развертывание 12 сенсорных буев экомониторинга Каспийского бассейна (Остров Наргин)'
  );
  const [proposerDID, setProposerDID] = useState('did:keymatrix:baku:caspian-ecologist-09');
  const [evidenceLevel, setEvidenceLevel] = useState<1 | 2 | 3 | 4 | 5>(4);
  
  // Impact Sliders
  const [peopleImpact, setPeopleImpact] = useState<number>(45000); // 45,000 residents
  const [co2Offset, setCo2Offset] = useState<number>(850); // 850 metric tons
  const [nurBudget, setNurBudget] = useState<number>(25000); // 25,000 NUR

  // Ethical checks
  const [isEthicalViolation, setIsEthicalViolation] = useState<boolean>(false);
  const [blockReason, setBlockReason] = useState<string>('');

  // Council Votes Simulation
  const [councilVotes, setCouncilVotes] = useState({
    tawhidCore: 30, // weight 30%
    metalogos: 25, // weight 25%
    mentorCircle: 15, // weight 15%
    guardianLayer: 12, // out of 15%
    communityLayer: 8, // out of 10%
    aiCouncil: 5, // out of 5%
  });

  const totalVotePct =
    councilVotes.tawhidCore +
    councilVotes.metalogos +
    councilVotes.mentorCircle +
    councilVotes.guardianLayer +
    councilVotes.communityLayer +
    councilVotes.aiCouncil;

  const handleNextStep = () => {
    if (currentStep === 4 && isEthicalViolation) {
      setBlockReason(
        'TawhidCore ВЕТО: Обнаружено нарушение принципа Справедливости (Adl) или запрет ссудного процента (Riba). Процесс заморожен.'
      );
      addLog(
        'SHURA',
        'TawhidCore заблокировал предложение: нарушение этического инварианта!',
        'error'
      );
      return;
    }
    setBlockReason('');
    if (currentStep < 6) {
      setCurrentStep((prev) => prev + 1);
      addLog('SHURA', `Переход на шаг ${currentStep + 1}: ${FLOW_STEPS[currentStep].name}`, 'info');
    } else {
      addLog(
        'SHURA',
        `Решение [${proposalTitle}] успешно исполнено и записано в Immutable Audit Log (SHA-256: 0x9f8e...4a12)`,
        'success'
      );
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setIsEthicalViolation(false);
    setBlockReason('');
    addLog('SHURA', 'Сброс потока принятия решений', 'info');
  };

  const toggleTestViolation = () => {
    const next = !isEthicalViolation;
    setIsEthicalViolation(next);
    if (next) {
      setProposalTitle('Тестовое предложение с скрытым скрытым ссудным процентом (Riba Yield Test)');
    } else {
      setProposalTitle('Развертывание 12 сенсорных буев экомониторинга Каспийского бассейна (Остров Наргин)');
      setBlockReason('');
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header Info */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0b1736]/90 via-[#071026]/85 to-[#040816]/95 border border-cyan-800/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <span>M10 DECISION PIPELINE</span>
            <span>•</span>
            <span>6-STEP POR & ETHICAL GATEWAY</span>
            <span>•</span>
            <EvidenceBadge level={5} compact />
          </div>
          <h2 className="text-base font-bold text-white tracking-wide flex items-center gap-2">
            <GitPullRequest className="w-5 h-5 text-cyan-400" />
            Поток Принятия Решений Шуры (Governance Decision Flow)
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Строгая 6-ступенчатая цепочка с фильтром резонанса PoR, валидацией TawhidCore и взвешенным голосованием палат
          </p>
        </div>

        {/* Step Indicator and Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={toggleTestViolation}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all border flex items-center gap-1.5 ${
              isEthicalViolation
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/50'
                : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            {isEthicalViolation ? 'Этический сбой (Haram ON)' : 'Тест: Симулировать сбой'}
          </button>
          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white"
            title="Сбросить поток"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 6 Steps Visual Horizontal Bar */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {FLOW_STEPS.map((s) => {
          const isCurrent = currentStep === s.stepNumber;
          const isPassed = currentStep > s.stepNumber;
          const StepIcon = s.icon;
          return (
            <button
              key={s.id}
              onClick={() => setCurrentStep(s.stepNumber)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                isCurrent
                  ? 'bg-cyan-950/80 border-cyan-400 ring-2 ring-cyan-400/50 shadow-[0_0_15px_rgba(0,212,255,0.25)]'
                  : isPassed
                  ? 'bg-emerald-950/30 border-emerald-500/40 text-slate-300'
                  : 'bg-slate-950/50 border-slate-800/80 opacity-70 hover:opacity-100'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono text-cyan-400 font-bold">
                    ШАГ {s.stepNumber}
                  </span>
                  {isPassed ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <StepIcon
                      className={`w-3.5 h-3.5 ${isCurrent ? 'text-cyan-300' : 'text-slate-500'}`}
                    />
                  )}
                </div>
                <div
                  className={`text-xs font-bold leading-tight ${
                    isCurrent ? 'text-white' : 'text-slate-300'
                  }`}
                >
                  {s.name.split('. ')[1]}
                </div>
              </div>

              <div className="mt-2 text-[9px] font-mono text-slate-500 truncate">
                {isPassed ? '✓ Пройдено' : isCurrent ? '● В работе' : 'Ожидание'}
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Current Step Detail Workbench */}
      <div className="p-5 rounded-2xl bg-gradient-to-b from-[#09152e]/80 to-[#040816]/90 border border-cyan-900/40 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-cyan-900/40 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              {FLOW_STEPS[currentStep - 1].name}: {FLOW_STEPS[currentStep - 1].subName}
            </h3>
          </div>
          <span className="text-xs font-mono text-cyan-300">
            Фаза {currentStep} из 6 • {FLOW_STEPS[currentStep - 1].id}
          </span>
        </div>

        {/* Dynamic Step Content */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-300 block">Название и цель предложения:</label>
              <input
                type="text"
                value={proposalTitle}
                onChange={(e) => setProposalTitle(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-950/90 border border-cyan-800/40 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400">DID Инициатора:</label>
                <input
                  type="text"
                  value={proposerDID}
                  onChange={(e) => setProposerDID(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-cyan-300 font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400">Категория:</label>
                <select className="w-full p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-white font-mono">
                  <option>Экология и Сохранение Ресурсов (M13)</option>
                  <option>Финансовая Архитектура Zero-Riba (M10)</option>
                  <option>Образование и Развитие Талантов (M08)</option>
                  <option>Защита Семейного Пространства (M04)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-800/40 space-y-2">
                <span className="text-[10px] font-mono text-cyan-400 font-bold block uppercase">
                  1. Cryptographic Identity
                </span>
                <div className="text-xs text-white font-mono truncate">{proposerDID}</div>
                <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3 h-3" /> DID Signature Verified (Ed25519)
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-800/40 space-y-2">
                <span className="text-[10px] font-mono text-cyan-400 font-bold block uppercase">
                  2. Evidence Ladder
                </span>
                <div className="flex items-center gap-2">
                  <EvidenceBadge level={evidenceLevel} />
                  <span className="text-xs text-white font-mono">Level {evidenceLevel} (Verified)</span>
                </div>
                <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3 h-3" /> Minimum L3 Satisfied
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-800/40 space-y-2">
                <span className="text-[10px] font-mono text-cyan-400 font-bold block uppercase">
                  3. Proof of Resonance (PoR) Pre-Filter
                </span>
                <div className="text-xs text-amber-300 font-mono font-bold">
                  Score: 0.998 (Threshold: 0.500)
                </div>
                <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3 h-3" /> Semantic Resonance PASSED
                </div>
              </div>
            </div>
            <p className="text-[11px] font-mono text-slate-400 bg-slate-950/60 p-2.5 rounded-xl border border-slate-900">
              Эпистемический инвариант: PoR используется как строгий pre-filter, окончательное решение принадлежит Шуре (Identity ≠ Authority).
            </p>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <span className="text-xs font-mono text-cyan-400 block uppercase font-bold">
              Интерактивные параметры оценки эффекта:
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* People Impact */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-900/40 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-cyan-400" />
                    Охват жителей:
                  </span>
                  <strong className="text-cyan-300 font-bold text-sm">
                    {peopleImpact.toLocaleString()} чел.
                  </strong>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="250000"
                  step="1000"
                  value={peopleImpact}
                  onChange={(e) => setPeopleImpact(Number(e.target.value))}
                  className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
                <span className="text-[10px] text-slate-500 font-mono block">
                  Вес влияния на людей: 30% в общей модели
                </span>
              </div>

              {/* CO2 Offset */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-900/40 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <Leaf className="w-4 h-4 text-emerald-400" />
                    CO2 декарбонизация:
                  </span>
                  <strong className="text-emerald-300 font-bold text-sm">
                    -{co2Offset.toLocaleString()} тонн
                  </strong>
                </div>
                <input
                  type="range"
                  min="50"
                  max="5000"
                  step="50"
                  value={co2Offset}
                  onChange={(e) => setCo2Offset(Number(e.target.value))}
                  className="w-full accent-emerald-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
                <span className="text-[10px] text-slate-500 font-mono block">
                  Экологический вклад (Waqf Ecology)
                </span>
              </div>

              {/* NUR Budget */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-900/40 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <Coins className="w-4 h-4 text-amber-400" />
                    Бюджет NUR:
                  </span>
                  <strong className="text-amber-300 font-bold text-sm">
                    {nurBudget.toLocaleString()} NUR
                  </strong>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="1000"
                  value={nurBudget}
                  onChange={(e) => setNurBudget(Number(e.target.value))}
                  className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
                <span className="text-[10px] text-slate-500 font-mono block">
                  Zero-Riba Treasury Grant
                </span>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-900/40 space-y-3">
              <span className="text-xs font-mono text-cyan-400 block uppercase font-bold">
                TawhidCore 5-Столповой Этический Аудит:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center font-mono">
                <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40">
                  <span className="text-xs font-bold text-emerald-300 block">Haqq (Истина)</span>
                  <span className="text-[10px] text-slate-400">99.8%</span>
                </div>
                <div
                  className={`p-3 rounded-lg border ${
                    isEthicalViolation
                      ? 'bg-rose-950/60 border-rose-500 text-rose-300 animate-pulse'
                      : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  }`}
                >
                  <span className="text-xs font-bold block">Adl (Справедливость)</span>
                  <span className="text-[10px]">{isEthicalViolation ? '0.0% (VIOLATION)' : '100%'}</span>
                </div>
                <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40">
                  <span className="text-xs font-bold text-emerald-300 block">Hikmah (Мудрость)</span>
                  <span className="text-[10px] text-slate-400">98.5%</span>
                </div>
                <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40">
                  <span className="text-xs font-bold text-emerald-300 block">Rahmah (Милосердие)</span>
                  <span className="text-[10px] text-slate-400">99.0%</span>
                </div>
                <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40">
                  <span className="text-xs font-bold text-emerald-300 block">Ilkmah (Доверие)</span>
                  <span className="text-[10px] text-slate-400">99.5%</span>
                </div>
              </div>

              {blockReason && (
                <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/60 text-rose-200 text-xs font-mono flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
                  <span>{blockReason}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-900/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400 uppercase font-bold">
                  Результаты Голосования 6 Палат Совета НУР:
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  Итоговый вес: {totalVotePct.toFixed(1)}% / 100% (Супер-большинство ≥ 75%)
                </span>
              </div>

              {/* Progress Bar */}
              <div className="relative w-full h-4 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 via-emerald-500 to-amber-400 transition-all duration-500"
                  style={{ width: `${totalVotePct}%` }}
                />
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-rose-400 z-10"
                  style={{ left: '75%' }}
                  title="Порог Супер-большинства 75%"
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>0%</span>
                <span className="text-rose-400 font-bold">Порог 75%</span>
                <span>100%</span>
              </div>

              {/* Chambers Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono pt-2">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">TawhidCore (30%):</span>
                  <span className="text-emerald-400 font-bold">30.0% ЗА</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">MetaLogos (25%):</span>
                  <span className="text-emerald-400 font-bold">25.0% ЗА</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">MentorCircle (15%):</span>
                  <span className="text-emerald-400 font-bold">15.0% ЗА</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">GuardianLayer (15%):</span>
                  <span className="text-emerald-400 font-bold">12.0% ЗА</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">CommunityLayer (10%):</span>
                  <span className="text-emerald-400 font-bold">8.0% ЗА</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">AI Advisory (5%):</span>
                  <span className="text-cyan-400 font-bold">5.0% ЗА</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 6 && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/50 space-y-3">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs font-mono">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>РЕШЕНИЕ ОДОБРЕНО И ЗАФИКСИРОВАНО В IMMUTABLE AUDIT LOG</span>
              </div>
              <div className="space-y-1.5 text-xs font-mono text-slate-300">
                <div>Транзакция исполнения: <strong className="text-white">0x7f1a8c9b3e0256d...f418</strong></div>
                <div>Выделение из Казны: <strong className="text-amber-400">{nurBudget.toLocaleString()} NUR</strong></div>
                <div>Бенефициар: <strong className="text-cyan-300">Waqf Eco-Caspian Station #12</strong></div>
                <div>Криптографический хэш аудита: <strong className="text-slate-400">SHA-256: 0x9f8e4a12c8b07e...</strong></div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Action Buttons */}
        <div className="pt-3 border-t border-cyan-900/40 flex items-center justify-between">
          <button
            onClick={() => setCurrentStep((p) => Math.max(1, p - 1))}
            disabled={currentStep === 1}
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-slate-400 hover:text-white disabled:opacity-40"
          >
            ← Предыдущий шаг
          </button>

          <button
            onClick={handleNextStep}
            disabled={currentStep === 6 && !isEthicalViolation}
            className={`px-5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
              currentStep === 6
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-[0_0_15px_rgba(0,212,255,0.3)]'
            }`}
          >
            {currentStep === 6 ? 'Исполнено ✓' : 'Подтвердить и продолжить →'}
          </button>
        </div>
      </div>
    </div>
  );
};
