import React, { useState } from 'react';
import {
  Clock,
  Bell,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Sun,
  Sunset,
  Sunrise,
  Moon,
  Sparkles
} from 'lucide-react';
import { useOSStore } from '../../store/osStore';
import { TRANSLATIONS } from '../../data/translations';
import { EvidenceBadge } from '../common/EvidenceBadge';
import { LOCALIZED_PRAYER_WIDGET_UI, getPrayerDisplayName } from '../../data/localizedContent';

export const PrayerTimesAdapter: React.FC = () => {
  const { prayerSchedule, coordinates, language, addLog } = useOSStore();
  const t = TRANSLATIONS[language] || TRANSLATIONS.EN;
  const pw = LOCALIZED_PRAYER_WIDGET_UI[language] || LOCALIZED_PRAYER_WIDGET_UI.EN;
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [showFullScheduleModal, setShowFullScheduleModal] = useState(false);

  const getPrayerIcon = (name: string) => {
    if (name.includes('Фаджр') || name.includes('Fajr') || name.includes('فجر') || name.includes('Sübh')) return Sunrise;
    if (name.includes('Восход') || name.includes('Sunrise') || name.includes('شروق') || name.includes('Günəş')) return Sun;
    if (name.includes('Зухр') || name.includes('Dhuhr') || name.includes('ظهر') || name.includes('Zöhr')) return Sun;
    if (name.includes('Аср') || name.includes('Asr') || name.includes('عصر') || name.includes('Əsr')) return Sun;
    if (name.includes('Магриб') || name.includes('Maghrib') || name.includes('مغرب') || name.includes('Məğrib')) return Sunset;
    return Moon;
  };

  const toggleNotifications = () => {
    const nextState = !notificationsEnabled;
    setNotificationsEnabled(nextState);
    addLog(
      'PRAYER',
      nextState ? pw.notifLogOn : pw.notifLogOff,
      'info'
    );
  };

  return (
    <div className="relative flex flex-col justify-between h-full rounded-2xl bg-gradient-to-b from-[#09152e]/90 via-[#071024]/90 to-[#040915]/95 border border-cyan-800/40 p-4 shadow-[0_4px_25px_rgba(0,0,0,0.5)] backdrop-blur-md">
      {/* Glow Corner Accents */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div>
        <div className="flex items-center justify-between gap-2 border-b border-cyan-900/40 pb-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide uppercase font-['Plus_Jakarta_Sans']">
                {pw.title}
              </h3>
              <p className="text-[10px] text-cyan-300/80 font-mono flex items-center gap-1">
                <span>📍 {coordinates.locationName}</span>
              </p>
            </div>
          </div>
          <EvidenceBadge level={5} compact />
        </div>

        {/* Date line */}
        <div className="flex items-center justify-between text-[11px] text-slate-300 mb-3 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
          <div className="flex items-center gap-1.5 font-medium">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span>{prayerSchedule.dateString}</span>
          </div>
          <div className="text-[10px] text-amber-300/90 font-mono tracking-wider font-semibold">
            {prayerSchedule.hijriDate}
          </div>
        </div>

        {/* Prayers list */}
        <div className="space-y-1.5">
          {prayerSchedule.prayers.map((prayer) => {
            const Icon = getPrayerIcon(prayer.name);
            const isNext = prayer.isNext;
            const localizedPrayerName = getPrayerDisplayName(prayer.name, language);

            return (
              <div
                key={prayer.name}
                className={`flex items-center justify-between px-3 py-2 rounded-xl border transition-all ${
                  isNext
                    ? 'bg-gradient-to-r from-amber-950/60 via-amber-900/40 to-slate-900/80 border-amber-500/60 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.2)] scale-[1.01]'
                    : prayer.passed
                    ? 'bg-slate-900/40 border-slate-800/80 text-slate-400'
                    : 'bg-slate-900/60 border-cyan-900/30 text-slate-200 hover:border-cyan-700/50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`p-1 rounded-md ${
                      isNext ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold flex items-center gap-1.5">
                      <span>{localizedPrayerName}</span>
                      <span className="text-[10px] text-slate-400 font-normal">({prayer.arabicName})</span>
                    </div>
                    {isNext && (
                      <div className="text-[9px] text-amber-400/90 font-mono flex items-center gap-1">
                        <span>{pw.nextPrayer}:</span>
                        <span dir="ltr" className="font-bold">{prayerSchedule.nextPrayer.formattedCountdown}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div dir="ltr" className="flex items-center gap-2">
                  <span
                    className={`font-mono text-xs font-bold tracking-wider ${
                      isNext ? 'text-amber-300 text-sm' : 'text-slate-200'
                    }`}
                  >
                    {prayer.time}
                  </span>
                  {prayer.passed ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  ) : (
                    <span className="text-xs text-slate-600">—</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-3 pt-2 border-t border-cyan-900/30 flex items-center gap-2">
        <button
          onClick={() => setShowFullScheduleModal(true)}
          className="flex-1 py-1.5 px-2.5 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-300 hover:text-cyan-200 border border-cyan-800/40 text-[11px] font-medium transition-colors text-center truncate"
        >
          {pw.fullSchedule}
        </button>
        <button
          onClick={toggleNotifications}
          className={`p-1.5 rounded-lg border transition-colors flex items-center gap-1 text-[11px] ${
            notificationsEnabled
              ? 'bg-amber-500/20 border-amber-500/60 text-amber-300'
              : 'bg-slate-900/70 border-slate-700 text-slate-400 hover:text-slate-200'
          }`}
          title={pw.notifyTooltip}
        >
          <Bell className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-[10px]">
            {notificationsEnabled ? pw.notifyOn : pw.notifyOff}
          </span>
        </button>
      </div>

      {/* Full Schedule Modal */}
      {showFullScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#081226] border border-cyan-700/60 rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-cyan-900/40 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                {pw.modalTitle} — {coordinates.locationName}
              </h3>
              <button
                onClick={() => setShowFullScheduleModal(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {pw.modalDesc}
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">{pw.latLabel}</span>
                <span className="text-cyan-300 font-bold">{coordinates.latitude}° N</span>
              </div>
              <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">{pw.lngLabel}</span>
                <span className="text-cyan-300 font-bold">{coordinates.longitude}° E</span>
              </div>
            </div>
            <button
              onClick={() => setShowFullScheduleModal(false)}
              className="w-full py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-colors"
            >
              {pw.closeBtn}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
