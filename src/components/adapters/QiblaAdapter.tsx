import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  ExternalLink,
  Navigation,
  RotateCw,
  LocateFixed
} from 'lucide-react';
import { useOSStore } from '../../store/osStore';
import { TRANSLATIONS } from '../../data/translations';
import { EvidenceBadge } from '../common/EvidenceBadge';
import { getCompassCardinal } from '../../lib/qibla';

export const QiblaAdapter: React.FC = () => {
  const {
    qiblaBearing,
    distanceToKaabaKm,
    coordinates,
    language,
    requestGeolocation,
    addLog
  } = useOSStore();

  const [compassOffset, setCompassOffset] = useState(0);
  const [showMapModal, setShowMapModal] = useState(false);

  const t = TRANSLATIONS[language];
  const cardinalText = getCompassCardinal(qiblaBearing, language);

  const handleRotateSim = () => {
    const newOffset = (compassOffset + 45) % 360;
    setCompassOffset(newOffset);
    addLog('SYSTEM', `Калибровка компаса: поворот на ${newOffset}°`, 'info');
  };

  return (
    <div className="relative flex flex-col justify-between h-full rounded-2xl bg-gradient-to-b from-[#09152e]/90 via-[#071024]/90 to-[#040915]/95 border border-cyan-800/40 p-4 shadow-[0_4px_25px_rgba(0,0,0,0.5)] backdrop-blur-md">
      {/* Glow Corner Accent */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div>
        <div className="flex items-center justify-between gap-2 border-b border-cyan-900/40 pb-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide uppercase font-['Plus_Jakarta_Sans']">
                {t.qiblaCompass.title}
              </h3>
              <p className="text-[10px] text-cyan-300/80 font-mono flex items-center gap-1">
                <MapPin className="w-2.5 h-2.5 text-amber-400" />
                <span>{coordinates.locationName}</span>
              </p>
            </div>
          </div>
          <EvidenceBadge level={5} compact />
        </div>

        {/* Coordinates Readout */}
        <div dir="ltr" className="flex items-center justify-between text-[10px] text-slate-400 mb-2 font-mono bg-slate-900/60 px-2.5 py-1 rounded-lg border border-slate-800">
          <span>{coordinates.latitude}° N, {coordinates.longitude}° E</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {t.qiblaCompass.accuracy}
          </span>
        </div>

        {/* Compass Dial Visualizer (Strictly LTR) */}
        <div dir="ltr" className="relative my-2 flex flex-col items-center justify-center">
          {/* Compass Container */}
          <div
            className="relative w-36 h-36 rounded-full border-2 border-cyan-500/40 bg-gradient-to-br from-[#0a1733] via-[#070f21] to-[#040812] flex items-center justify-center shadow-[0_0_25px_rgba(0,212,255,0.2)] cursor-pointer group"
            onClick={handleRotateSim}
            title="Нажмите для имитации вращения компаса"
          >
            {/* Outer Tick Ring */}
            <div className="absolute inset-1 rounded-full border border-dashed border-cyan-800/60" />

            {/* Cardinals: N, E, S, W */}
            <span className="absolute top-1.5 text-[10px] font-mono font-bold text-amber-400">N</span>
            <span className="absolute right-2 text-[10px] font-mono font-bold text-slate-400">E</span>
            <span className="absolute bottom-1.5 text-[10px] font-mono font-bold text-slate-400">S</span>
            <span className="absolute left-2 text-[10px] font-mono font-bold text-slate-400">W</span>

            {/* Rotating Qibla Needle */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-out"
              style={{ transform: `rotate(${qiblaBearing + compassOffset}deg)` }}
            >
              {/* Kaaba Golden Needle Pointer */}
              <div className="relative flex flex-col items-center h-full justify-center">
                {/* Arrow Head towards Kaaba */}
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[38px] border-b-amber-400 drop-shadow-[0_0_8px_#f59e0b] -translate-y-4" />
                {/* Tail pointing opposite */}
                <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[30px] border-t-slate-600/70 translate-y-4" />
              </div>
            </div>

            {/* Center Pivot Point */}
            <div className="relative w-4 h-4 rounded-full bg-amber-400 border-2 border-[#09152e] shadow-[0_0_8px_#f59e0b] z-10 flex items-center justify-center">
              <span className="w-1 h-1 rounded-full bg-black" />
            </div>
          </div>

          {/* Numerical Angle & Direction Display */}
          <div className="mt-2.5 text-center">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">
              {t.qiblaCompass.directionToQibla}
            </div>
            <div className="text-xl font-mono font-extrabold text-white tracking-wider flex items-center justify-center gap-1.5">
              <span className="text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]">
                {qiblaBearing}°
              </span>
              <span className="text-xs text-amber-300 font-semibold">({cardinalText})</span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              {t.qiblaCompass.distance}:{' '}
              <span className="text-cyan-300 font-semibold">{distanceToKaabaKm.toLocaleString()} км</span>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons: Show on map / Refresh GPS */}
      <div className="mt-2 pt-2 border-t border-cyan-900/30 flex items-center gap-2">
        <button
          onClick={() => setShowMapModal(true)}
          className="flex-1 py-1.5 px-3 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 hover:text-emerald-200 border border-emerald-700/50 text-[11px] font-medium transition-colors flex items-center justify-center gap-1.5 truncate"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>{t.qiblaCompass.showOnMap}</span>
        </button>

        <button
          onClick={requestGeolocation}
          className="p-1.5 rounded-lg bg-slate-900/70 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors"
          title="Обновить координаты по GPS"
        >
          <LocateFixed className="w-3.5 h-3.5 text-cyan-400" />
        </button>
      </div>

      {/* Map Modal */}
      {showMapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-[#081226] border border-cyan-700/60 rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-cyan-900/40 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-400" />
                Вектор Кыблы: {coordinates.locationName} → Священная Мекка
              </h3>
              <button
                onClick={() => setShowMapModal(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-cyan-900/50 space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Исходная точка:</span>
                <span className="text-cyan-300 font-bold">{coordinates.locationName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Координаты Мекки (Кааба):</span>
                <span className="text-amber-300 font-bold">21.4225° N, 39.8262° E</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Точный азимут (Bearing):</span>
                <span className="text-emerald-400 font-bold text-sm">{qiblaBearing}° ({cardinalText})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Расстояние по ортодромии:</span>
                <span className="text-white font-bold">{distanceToKaabaKm.toLocaleString()} км</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 italic">
              Расчет реализован по формуле Хаверсина и сферической тригонометрии. Полная автономность без зависимости от внешних картографических серверов.
            </p>

            <button
              onClick={() => setShowMapModal(false)}
              className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
