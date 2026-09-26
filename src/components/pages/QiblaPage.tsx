import React, { useState, useEffect } from 'react';
import { Compass, MapPin, Navigation2, RefreshCw, Globe, ShieldCheck, Sun, Info } from 'lucide-react';
import { useOSStore } from '../../store/osStore';
import { EvidenceBadge } from '../common/EvidenceBadge';
import { TRANSLATIONS } from '../../data/translations';
import { formatNumber } from '../../lib/i18n/localeRuntime';
import { LOCALIZED_QIBLA_UI } from '../../data/localizedContent';

export const QiblaPage: React.FC = () => {
  const {
    qiblaBearing,
    distanceToKaabaKm,
    compassHeading,
    coordinates,
    requestGeolocation,
    updateCompassHeading,
    language,
    addLog,
  } = useOSStore();
  const t = TRANSLATIONS[language];
  const ui = LOCALIZED_QIBLA_UI[language] || LOCALIZED_QIBLA_UI.EN;

  const [simulatedHeading, setSimulatedHeading] = useState(compassHeading);
  const [isCalibrating, setIsCalibrating] = useState(false);

  // Device orientation listener if available
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.alpha !== null) {
        const heading = Math.round(e.alpha);
        setSimulatedHeading(heading);
        updateCompassHeading(heading);
      }
    };

    if (typeof window !== 'undefined') {
      const win = window as any;
      if ('ondeviceorientationabsolute' in win) {
        win.addEventListener('deviceorientationabsolute', handleOrientation);
      } else if ('DeviceOrientationEvent' in win) {
        win.addEventListener('deviceorientation', handleOrientation);
      }
    }

    return () => {
      if (typeof window !== 'undefined') {
        const win = window as any;
        win.removeEventListener('deviceorientationabsolute', handleOrientation);
        win.removeEventListener('deviceorientation', handleOrientation);
      }
    };
  }, [updateCompassHeading]);

  const handleRecalibrate = async () => {
    setIsCalibrating(true);
    addLog('PRAYER', `${ui.calibratingBtn}`, 'info');
    await requestGeolocation();
    setTimeout(() => {
      setIsCalibrating(false);
      addLog('PRAYER', `Bearing: ${qiblaBearing}° verified`, 'success');
    }, 800);
  };

  // Difference between current heading and Qibla
  const relativeAngle = (qiblaBearing - simulatedHeading + 360) % 360;
  const isAligned = Math.abs(relativeAngle) < 3 || Math.abs(relativeAngle - 360) < 3;

  return (
    <div id="page-qibla" className="space-y-4 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#07132b]/90 via-[#0a1b3a]/70 to-[#040a17]/90 border border-cyan-800/40 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <span>M09 ADAPTER</span>
            <span>•</span>
            <span>REAL-TIME GEODESY</span>
            <span>•</span>
            <EvidenceBadge level={5} compact />
          </div>
          <h1 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <Compass className="w-6 h-6 text-cyan-400" />
            {t.qiblaCompass.title}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {ui.pageSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="qibla-recalibrate-btn"
            onClick={handleRecalibrate}
            disabled={isCalibrating}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-700/50 text-xs font-medium transition-all shadow-[0_0_12px_rgba(0,212,255,0.15)] disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isCalibrating ? 'animate-spin' : ''}`} />
            {isCalibrating ? ui.calibratingBtn : ui.recalibrateBtn}
          </button>
        </div>
      </div>

      {/* Main Geodesy Visualizer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Compass Ring Visualizer (Col 7) */}
        <div className="lg:col-span-7 rounded-2xl bg-gradient-to-b from-[#09152e]/80 to-[#040816]/90 border border-cyan-900/40 p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-xl min-h-[460px]">
          {/* Subtle Islamic Geometric Watermark */}
          <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
            <div className="w-96 h-96 rounded-full border-4 border-dashed border-cyan-400 animate-spin-slow" />
          </div>

          {/* Alignment Status Badge */}
          <div
            className={`mb-4 px-3 py-1 rounded-full text-xs font-mono font-semibold border flex items-center gap-2 transition-colors ${
              isAligned
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                : 'bg-cyan-950/50 text-cyan-300 border-cyan-800/40'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isAligned ? 'bg-emerald-400 animate-ping' : 'bg-cyan-400'}`} />
            {isAligned ? ui.exactMatch : `${ui.deviation} ${Math.round(relativeAngle)}°`}
          </div>

          {/* Interactive Rotating Compass Dial */}
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
            {/* Outer Dial Degrees */}
            <div
              className="absolute inset-0 rounded-full border-2 border-cyan-500/30 transition-transform duration-500 shadow-[0_0_30px_rgba(0,212,255,0.15)]"
              style={{ transform: `rotate(${-simulatedHeading}deg)` }}
            >
              {/* Cardinal Points */}
              <span className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-bold text-rose-400 font-mono">N</span>
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-400 font-mono">S</span>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 font-mono">E</span>
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 font-mono">W</span>

              {/* Minor Tick Marks */}
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                <div
                  key={deg}
                  className="absolute w-full h-full flex justify-center"
                  style={{ transform: `rotate(${deg}deg)` }}
                >
                  <div className="w-0.5 h-2 bg-cyan-400/40" />
                </div>
              ))}
            </div>

            {/* Inner Glowing Kaaba Arrow Needle */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-transform duration-500"
              style={{ transform: `rotate(${qiblaBearing - simulatedHeading}deg)` }}
            >
              {/* Green/Gold Qibla Needle pointing towards Kaaba */}
              <div className="flex flex-col items-center -translate-y-16">
                <div className="px-2 py-0.5 rounded bg-emerald-500/30 border border-emerald-400/50 text-[10px] font-mono text-emerald-300 font-bold mb-1 shadow-[0_0_10px_rgba(16,185,129,0.4)]">
                  {ui.kaabaLabel} {qiblaBearing}°
                </div>
                <Navigation2 className="w-10 h-10 text-emerald-400 fill-emerald-400 filter drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              </div>
            </div>

            {/* Compass Center Core */}
            <div className="w-20 h-20 rounded-full bg-slate-950 border-2 border-cyan-500/60 shadow-[0_0_20px_rgba(0,212,255,0.4)] flex flex-col items-center justify-center z-10 text-center">
              <span className="text-sm font-black font-mono text-white leading-none">
                {qiblaBearing}°
              </span>
              <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-wider mt-0.5">
                {ui.southWest}
              </span>
            </div>
          </div>

          {/* Heading Slider for Testing / Manual Override */}
          <div className="mt-6 w-full max-w-sm flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-900/60 border border-cyan-900/40">
            <span className="text-[11px] text-slate-400 font-mono shrink-0">{ui.compassTestLabel}</span>
            <input
              type="range"
              min="0"
              max="359"
              value={simulatedHeading}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                setSimulatedHeading(val);
                updateCompassHeading(val);
              }}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <span className="text-xs font-mono text-cyan-300 w-10 text-right">{simulatedHeading}°</span>
          </div>
        </div>

        {/* Right: Geodesy & Kaaba Telemetry (Col 5) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Destination Specs Card */}
          <div className="rounded-2xl bg-gradient-to-b from-[#09152e]/80 to-[#040816]/90 border border-cyan-900/40 p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-cyan-900/40 pb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  {ui.targetKaabaTitle}
                </h3>
              </div>
              <EvidenceBadge level={3} compact />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-cyan-900/30">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">{ui.bearingLabel}</span>
                <span className="text-lg font-bold font-mono text-cyan-300">{qiblaBearing}°</span>
                <span className="text-[10px] text-slate-500 block">SW ({ui.southWest})</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-cyan-900/30">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">{ui.orthodromicDistLabel}</span>
                <span className="text-lg font-bold font-mono text-emerald-300">
                  {formatNumber(distanceToKaabaKm, language)} km
                </span>
                <span className="text-[10px] text-slate-500 block">{ui.greatCircleDesc}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/40 border border-cyan-900/20 space-y-1.5 text-xs text-slate-300">
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-slate-400">{ui.kaabaCoordsLabel}</span>
                <span className="text-amber-300">21.4225° N, 39.8262° E</span>
              </div>
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-slate-400">{ui.yourLocationLabel}</span>
                <span className="text-cyan-300">
                  {coordinates.latitude}° N, {coordinates.longitude}° E
                </span>
              </div>
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-slate-400">{ui.nodeNameLabel}</span>
                <span className="text-white">{coordinates.locationName}</span>
              </div>
            </div>
          </div>

          {/* Mathematical Formula Card */}
          <div className="rounded-2xl bg-gradient-to-b from-[#09152e]/80 to-[#040816]/90 border border-cyan-900/40 p-5 shadow-xl space-y-3">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                {ui.mathFormulaTitle}
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {ui.mathFormulaDesc}
            </p>
            <div className="p-3 rounded-xl bg-black/50 border border-cyan-900/40 font-mono text-[11px] text-cyan-300 overflow-x-auto">
              θ = atan2(sin(Δλ) · cos(φ₂), cos(φ₁) · sin(φ₂) - sin(φ₁) · cos(φ₂) · cos(Δλ))
            </div>
            <p className="text-[11px] text-slate-400">
              {ui.mathFormulaWhere}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
