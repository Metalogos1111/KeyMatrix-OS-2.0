import React, { useEffect, useRef, useState } from 'react';
import { Activity, Sparkles, ChevronRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useOSStore } from '../../store/osStore';
import { TRANSLATIONS } from '../../data/translations';
import { PHI, generateHarmonicWavePoints } from '../../lib/resonance';

export const ProofOfResonance: React.FC = () => {
  const { porMetrics, language, setEvidenceModalOpen, addLog } = useOSStore();
  const t = TRANSLATIONS[language];
  const [timeOffset, setTimeOffset] = useState(0);

  // Tick harmonic wave animation
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeOffset((prev) => prev + 1);
    }, 80);
    return () => clearInterval(timer);
  }, []);

  const wavePoints = generateHarmonicWavePoints(50, timeOffset, porMetrics.scorePairAvg);
  const width = 240;
  const height = 48;
  const pathD = wavePoints
    .map((pt, i) => {
      const x = (i / (wavePoints.length - 1)) * width;
      const y = height / 2 + pt * 14;
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <div className="relative flex flex-col justify-between h-full rounded-2xl bg-gradient-to-b from-[#09152e]/90 via-[#071024]/90 to-[#040915]/95 border border-cyan-800/40 p-3.5 shadow-[0_4px_25px_rgba(0,0,0,0.5)] backdrop-blur-md">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between border-b border-cyan-900/40 pb-2 mb-2.5">
          <div className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <h3 className="text-xs font-bold text-white tracking-wide font-['Plus_Jakarta_Sans']">
              {t.porWidget.title}
            </h3>
            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-purple-950/60 text-purple-300 border border-purple-700/40">
              SANDBOX &gt;
            </span>
          </div>

          <button
            onClick={() => {
              setEvidenceModalOpen(true);
              addLog('EVIDENCE', 'Открыт реестр доказательств PoR (Ledger v1.6)', 'info');
            }}
            className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-0.5"
          >
            <span>{t.porWidget.details}</span>
          </button>
        </div>

        {/* Live Harmonic Wave Canvas / SVG */}
        <div className="relative w-full h-12 bg-[#050b17] rounded-xl border border-cyan-900/40 overflow-hidden flex items-center justify-center p-1 mb-2.5">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.08),transparent_70%)] pointer-events-none" />

          {/* Golden Ratio Indicator in corner */}
          <span className="absolute top-1 left-2 text-[9px] font-mono text-amber-400/80 font-bold z-10">
            Φ = {PHI.toFixed(6)}
          </span>

          <svg className="w-full h-full" viewBox={`0 0 ${width} ${height}`}>
            <defs>
              <linearGradient id="porWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00D4FF" />
                <stop offset="50%" stopColor="#00FF88" />
                <stop offset="100%" stopColor="#FFD700" />
              </linearGradient>
            </defs>
            <path d={pathD} fill="none" stroke="url(#porWaveGrad)" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>

        {/* Metrics Grid */}
        <div className="space-y-1 text-xs font-mono">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-[11px]">{t.porWidget.score}:</span>
            <span className="font-bold text-white text-xs">{porMetrics.scorePairAvg.toFixed(3)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-[11px]">{t.porWidget.threshold}:</span>
            <span className="font-bold text-cyan-300 text-xs">{porMetrics.thresholdAdaptive.toFixed(3)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-[11px]">{t.porWidget.status}:</span>
            <span className="font-bold text-amber-400 text-xs tracking-wider px-1.5 py-0.5 rounded bg-amber-950/40 border border-amber-500/40">
              {porMetrics.status}
            </span>
          </div>
        </div>
      </div>

      {/* 4 Gates Footer */}
      <div className="mt-2 pt-2 border-t border-cyan-900/30 grid grid-cols-2 gap-1 text-[9px] font-mono">
        {porMetrics.gates.map((g) => (
          <div
            key={g.code}
            className="flex items-center justify-between px-1.5 py-0.5 rounded bg-slate-900/70 border border-slate-800"
          >
            <span className="text-slate-400">{g.code}</span>
            <span className="text-emerald-400 font-bold">{g.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
