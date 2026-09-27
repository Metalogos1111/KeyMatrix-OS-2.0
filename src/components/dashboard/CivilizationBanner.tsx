import React from 'react';
import { Globe2, Users, ArrowRight, Sparkles } from 'lucide-react';
import { useOSStore } from '../../store/osStore';
import { TRANSLATIONS } from '../../data/translations';

export const CivilizationBanner: React.FC = () => {
  const { language, addLog, setCivilizationModalOpen } = useOSStore();
  const t = TRANSLATIONS[language];

  const handleJoin = () => {
    addLog('SYSTEM', 'Открытие онбординга M15 Civilization Layer.', 'info');
    setCivilizationModalOpen(true);
  };

  return (
    <div className="relative flex flex-col justify-between h-full rounded-2xl bg-gradient-to-br from-[#09152e]/90 via-[#071024]/90 to-[#040915]/95 border border-cyan-800/40 p-4 shadow-[0_4px_25px_rgba(0,0,0,0.5)] backdrop-blur-md overflow-hidden focus-within:ring-2 focus-within:ring-cyan-500/40 transition-all">
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

      <div>
        <div className="flex items-center gap-2 mb-2">
          <Globe2 className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
            {t.worldPeopleFuture.title}
          </h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {t.worldPeopleFuture.desc}
        </p>
      </div>

      <div className="mt-3 pt-2 border-t border-cyan-900/30 flex items-center justify-between">
        <span className="text-[10px] text-slate-400 font-mono">M15 Civilization Layer</span>
        <button
          onClick={handleJoin}
          aria-label={t.worldPeopleFuture.joinBtn}
          className="py-1.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white text-xs font-bold transition-all shadow-[0_0_15px_rgba(0,212,255,0.3)] hover:shadow-[0_0_20px_rgba(0,212,255,0.5)] active:scale-95 flex items-center gap-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <span>{t.worldPeopleFuture.joinBtn}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
