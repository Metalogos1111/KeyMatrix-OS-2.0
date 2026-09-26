import React from 'react';
import {
  Sparkles,
  Heart,
  Globe2,
  Cpu,
  TreePine,
  Layers,
  Compass
} from 'lucide-react';
import { useOSStore } from '../../store/osStore';
import { TRANSLATIONS } from '../../data/translations';
import { LOCALIZED_CENTERPIECE_UI, LOCALIZED_CENTERPIECE_PILLARS } from '../../data/localizedContent';

export const KaabaCenterpiece: React.FC = () => {
  const { language, runExecutionSimulation, isSimulatingExecution } = useOSStore();
  const t = TRANSLATIONS[language] || TRANSLATIONS.EN;
  const cp = LOCALIZED_CENTERPIECE_UI[language] || LOCALIZED_CENTERPIECE_UI.EN;
  const pillarTrans = LOCALIZED_CENTERPIECE_PILLARS[language] || LOCALIZED_CENTERPIECE_PILLARS.EN;

  const pillars = [
    { key: 'FAITH', label: 'FAITH', icon: Sparkles, color: 'from-amber-400 to-yellow-500' },
    { key: 'KNOWLEDGE', label: 'KNOWLEDGE', icon: Layers, color: 'from-cyan-400 to-blue-500' },
    { key: 'PEOPLE', label: 'PEOPLE', icon: Heart, color: 'from-rose-400 to-pink-500' },
    { key: 'TECHNOLOGY', label: 'TECHNOLOGY', icon: Cpu, color: 'from-emerald-400 to-teal-500' },
    { key: 'EARTH', label: 'EARTH', icon: TreePine, color: 'from-green-400 to-emerald-600' },
    { key: 'HARMONY', label: 'HARMONY', icon: Globe2, color: 'from-purple-400 to-indigo-500' },
  ];

  return (
    <div className="relative flex flex-col items-center justify-between h-full rounded-2xl bg-gradient-to-b from-[#07132a]/95 via-[#040c1d]/95 to-[#020611]/98 border border-cyan-800/40 p-4 shadow-[0_4px_30px_rgba(0,0,0,0.6)] overflow-hidden backdrop-blur-md">
      {/* Background Cosmic Starfield & Celestial Aurora */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,212,255,0.12),transparent_70%)] pointer-events-none" />
      <div className="absolute top-4 left-6 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-4 right-6 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner Text */}
      <div className="w-full flex items-center justify-between text-[9px] uppercase tracking-[0.2em] font-mono text-slate-400 px-2 z-10">
        <span className="text-cyan-300 font-semibold">{t.motto1}</span>
        <span className="text-amber-300 font-semibold">{t.motto2}</span>
      </div>

      {/* Main Kaaba Artwork Center */}
      <div className="relative my-auto flex flex-col items-center justify-center group cursor-pointer" onClick={() => runExecutionSimulation()}>
        {/* Outer Halo Rings */}
        <div className="absolute -inset-10 rounded-full border border-cyan-500/20 animate-spin-slow pointer-events-none" />
        <div className="absolute -inset-6 rounded-full border border-dashed border-amber-400/30 animate-reverse-spin pointer-events-none" />

        {/* Glow behind Kaaba */}
        <div className="absolute w-36 h-36 rounded-full bg-gradient-to-tr from-amber-400/20 via-cyan-400/20 to-transparent blur-xl group-hover:scale-110 transition-transform duration-700" />

        {/* Kaaba Cubic Geometric Representation with Golden Kiswah Inscription */}
        <div className="relative w-28 h-28 flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
          {/* Isometric Cube Container */}
          <div className="relative w-24 h-24 bg-gradient-to-br from-[#12161f] via-[#090b10] to-[#040508] border border-amber-500/50 rounded-lg shadow-[0_0_35px_rgba(245,158,11,0.25)] flex flex-col justify-between p-2 overflow-hidden">
            {/* Kiswah Golden Belt (Hizam) */}
            <div className="w-full h-3.5 bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 rounded-sm flex items-center justify-center shadow-[0_0_8px_#f59e0b]">
              <span className="text-[6px] font-bold text-black tracking-widest uppercase font-mono">
                لا إله إلا الله
              </span>
            </div>

            {/* Sacred Door (Bab al-Ka'bah) in Gold */}
            <div className="mx-auto w-6 h-10 border border-amber-400/80 bg-gradient-to-b from-amber-500/40 via-amber-300/30 to-amber-600/50 rounded-t flex flex-col items-center justify-center p-0.5 shadow-[0_0_10px_rgba(245,158,11,0.4)]">
              <div className="w-full h-0.5 bg-amber-300/80 mb-1" />
              <span className="text-[5px] text-amber-200 font-mono">ALLAH</span>
            </div>

            {/* Corner Black Stone (Hajar al-Aswad) Glow */}
            <div className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-slate-900 border border-silver flex items-center justify-center shadow-[0_0_8px_#fff]">
              <span className="w-1 h-1 rounded-full bg-cyan-300 animate-ping" />
            </div>
          </div>
        </div>

        {/* Subtle prompt under Kaaba */}
        <div className="mt-2 text-center">
          <div className="text-[11px] font-bold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-amber-300 uppercase">
            ONE HUMANITY · MANY POSSIBILITIES
          </div>
          <div className="text-[9px] text-slate-400 font-mono mt-0.5">
            {isSimulatingExecution ? cp.simActive : cp.clickToLaunch}
          </div>
        </div>
      </div>

      {/* 6 Foundation Pillars Icons Bar */}
      <div className="w-full pt-2 border-t border-cyan-900/30 z-10">
        <div className="grid grid-cols-6 gap-1 text-center">
          {pillars.map((p) => {
            const Icon = p.icon;
            const localizedName = pillarTrans[p.key] || p.label;
            return (
              <div
                key={p.label}
                className="flex flex-col items-center justify-center p-1 rounded-lg hover:bg-cyan-950/40 transition-colors group cursor-default"
                title={localizedName}
              >
                <div className="p-1 rounded-md bg-slate-900/80 text-cyan-300 border border-cyan-800/40 group-hover:border-cyan-400 group-hover:text-amber-300 transition-colors">
                  <Icon className="w-3 h-3" />
                </div>
                <span className="text-[8px] tracking-wider text-slate-400 font-mono mt-1 group-hover:text-slate-200 uppercase truncate max-w-full">
                  {localizedName}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
