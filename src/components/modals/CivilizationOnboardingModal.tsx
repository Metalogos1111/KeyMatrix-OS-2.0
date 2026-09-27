import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Globe2,
  X,
  HeartHandshake,
  Scale,
  BookOpen,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useOSStore } from '../../store/osStore';

export const CivilizationOnboardingModal: React.FC = () => {
  const { isCivilizationModalOpen, setCivilizationModalOpen, addLog, setActiveSection } = useOSStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCivilizationModalOpen) {
        setCivilizationModalOpen(false);
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isCivilizationModalOpen, setCivilizationModalOpen]);

  if (!isCivilizationModalOpen) return null;

  const handleContinue = () => {
    setCivilizationModalOpen(false);
    setActiveSection('community');
    addLog('SYSTEM', 'Онбординг M15 Civilization Layer завершен: переход в сообщество.', 'success');
  };

  const principles = [
    {
      icon: HeartHandshake,
      title: 'Human First (Человек превыше системы)',
      desc: 'Технологии служат достоинству, благополучию и развитию человека, а не удержанию внимания.',
      accent: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    },
    {
      icon: Scale,
      title: 'Justice & Shura (Справедливость и Совет)',
      desc: 'Разделение властей (Propose ≠ Approve ≠ Execute ≠ Audit) и защита от финансовых манипуляций.',
      accent: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    },
    {
      icon: BookOpen,
      title: 'Knowledge & Truth (Знание и Свидетельство)',
      desc: 'Каждое утверждение требует доказательства (Evidence Ladder). Декларация ≠ Рантайм-факт.',
      accent: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    },
    {
      icon: ShieldCheck,
      title: 'Local Privacy (Суверенная приватность)',
      desc: 'Локальная сессия на вашем устройстве. Никакой скрытой телеметрии или утечек ключей.',
      accent: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
    },
  ];

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="civilization-modal-title"
        data-testid="civilization-onboarding-modal"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-[#091122]/95 border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.2)] overflow-hidden text-slate-100 flex flex-col"
        >
          {/* Top Gradient Accent */}
          <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400" />

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-gradient-to-r from-cyan-950/40 via-transparent to-transparent">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-400">
                <Globe2 className="w-5 h-5" />
              </div>
              <div>
                <h2 id="civilization-modal-title" className="text-base font-bold text-white font-mono tracking-wide">
                  M15 Civilization Layer
                </h2>
                <p className="text-xs text-cyan-300/80 font-mono">
                  Гуманитарный слой & Сообщество KeyMatrix
                </p>
              </div>
            </div>
            <button
              onClick={() => setCivilizationModalOpen(false)}
              aria-label="Закрыть окно"
              data-testid="civilization-modal-close"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-5 overflow-y-auto max-h-[70vh]">
            {/* Intro text */}
            <div className="bg-cyan-950/30 rounded-xl p-4 border border-cyan-800/30">
              <div className="flex items-center gap-2 mb-1.5 text-cyan-300 text-xs font-mono font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Добро пожаловать в Цивилизационный Слой</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Вы присоединяетесь к децентрализованной среде созидания, где права, приватность и этические ценности защищены архитектурой системы.
              </p>
            </div>

            {/* Principles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {principles.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all flex flex-col justify-between space-y-2"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-lg border ${p.accent}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-xs font-bold text-white font-mono leading-snug">
                        {p.title}
                      </h3>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Runtime Boundary Notice */}
            <div className="p-3 rounded-xl border border-dashed border-cyan-500/20 bg-black/40 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Статус участия: Локальная защищенная сессия</span>
              <span className="text-cyan-400 font-bold">LOCAL_OBSERVED</span>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-white/10 bg-[#060b17] flex items-center justify-between">
            <button
              onClick={() => setCivilizationModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white font-mono transition-all cursor-pointer"
            >
              Отмена
            </button>
            <button
              onClick={handleContinue}
              data-testid="civilization-modal-continue"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white text-xs font-bold font-mono tracking-wider transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <span>Присоединиться к Сообществу</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
