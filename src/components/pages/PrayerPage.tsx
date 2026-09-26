import React, { useState } from 'react';
import { Clock, Bell, BellOff, Calendar, Compass, ShieldCheck, CheckCircle2, ChevronRight, Plus, Minus } from 'lucide-react';
import { useOSStore } from '../../store/osStore';
import { EvidenceBadge } from '../common/EvidenceBadge';
import { LOCALIZED_PRAYER_UI } from '../../data/localizedContent';
import { Language } from '../../types';

export const PrayerPage: React.FC = () => {
  const { prayerSchedule, coordinates, language, addLog } = useOSStore();
  const ui = LOCALIZED_PRAYER_UI[language] || LOCALIZED_PRAYER_UI.EN;

  const [calcMethod, setCalcMethod] = useState<'MWL' | 'CMB' | 'MAKKAH'>('CMB');
  const [adhanNotification, setAdhanNotification] = useState(true);
  const [qazaCounts, setQazaCounts] = useState({
    fajr: 0,
    dhuhr: 0,
    asr: 0,
    maghrib: 0,
    isha: 0,
  });

  const getPrayerDisplayName = (name: string, lang: Language): string => {
    const isFajr = name.includes('Фаджр') || name.includes('Fajr') || name.includes('فجر') || name.includes('Sübh');
    const isSunrise = name.includes('Восход') || name.includes('Sunrise') || name.includes('شروق') || name.includes('Günəş');
    const isDhuhr = name.includes('Зухр') || name.includes('Dhuhr') || name.includes('ظهر') || name.includes('Zöhr');
    const isAsr = name.includes('Аср') || name.includes('Asr') || name.includes('عصر') || name.includes('Əsr');
    const isMaghrib = name.includes('Магриб') || name.includes('Maghrib') || name.includes('مغرب') || name.includes('Məğrib');
    const isIsha = name.includes('Иша') || name.includes('Isha') || name.includes('عشاء') || name.includes('İşa');

    if (lang === 'AZ') {
      if (isFajr) return 'Sübh';
      if (isSunrise) return 'Günəş';
      if (isDhuhr) return 'Zöhr';
      if (isAsr) return 'Əsr';
      if (isMaghrib) return 'Məğrib';
      if (isIsha) return 'İşa';
    } else if (lang === 'RU') {
      if (isFajr) return 'Фаджр';
      if (isSunrise) return 'Восход';
      if (isDhuhr) return 'Зухр';
      if (isAsr) return 'Аср';
      if (isMaghrib) return 'Магриб';
      if (isIsha) return 'Иша';
    } else if (lang === 'TR') {
      if (isFajr) return 'İmsak';
      if (isSunrise) return 'Güneş';
      if (isDhuhr) return 'Öğle';
      if (isAsr) return 'İkindi';
      if (isMaghrib) return 'Akşam';
      if (isIsha) return 'Yatsı';
    } else if (lang === 'AR') {
      if (isFajr) return 'الفجر';
      if (isSunrise) return 'الشروق';
      if (isDhuhr) return 'الظهر';
      if (isAsr) return 'العصر';
      if (isMaghrib) return 'المغرب';
      if (isIsha) return 'العشاء';
    } else if (lang === 'FA') {
      if (isFajr) return 'صبح';
      if (isSunrise) return 'طلوع';
      if (isDhuhr) return 'ظهر';
      if (isAsr) return 'عصر';
      if (isMaghrib) return 'مغرب';
      if (isIsha) return 'عشاء';
    } else if (lang === 'UR') {
      if (isFajr) return 'فجر';
      if (isSunrise) return 'طلوع';
      if (isDhuhr) return 'ظہر';
      if (isAsr) return 'عصر';
      if (isMaghrib) return 'مغرب';
      if (isIsha) return 'عشاء';
    }
    return name;
  };

  const toggleNotification = () => {
    const next = !adhanNotification;
    setAdhanNotification(next);
    addLog('PRAYER', next ? ui.notifyOn : ui.notifyOff, 'info');
  };

  const updateQaza = (prayer: keyof typeof qazaCounts, delta: number) => {
    setQazaCounts((prev) => {
      const next = Math.max(0, prev[prayer] + delta);
      addLog('PRAYER', `Qaza (${prayer}): ${next}`, 'info');
      return { ...prev, [prayer]: next };
    });
  };

  return (
    <div id="page-prayer" className="space-y-4 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#07132b]/90 via-[#0a1b3a]/70 to-[#040a17]/90 border border-cyan-800/40 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <span>M09 ADAPTER</span>
            <span>•</span>
            <span>ASTRONOMICAL SOLAR TIMETABLE</span>
            <span>•</span>
            <EvidenceBadge level={5} compact />
          </div>
          <h1 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <Clock className="w-6 h-6 text-cyan-400" />
            {ui.pageTitle}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {coordinates.locationName} — {ui.pageSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="prayer-notify-toggle"
            onClick={toggleNotification}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
              adhanNotification
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                : 'bg-slate-900/60 text-slate-400 border-slate-700'
            }`}
          >
            {adhanNotification ? <Bell className="w-3.5 h-3.5" /> : <BellOff className="w-3.5 h-3.5" />}
            {adhanNotification ? ui.notifyOn : ui.notifyOff}
          </button>
        </div>
      </div>

      {/* Grid: Daily Cards & Countdown */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        {prayerSchedule.prayers.map((prayer) => {
          const isNext = prayer.name === prayerSchedule.nextPrayer?.name;
          const displayName = getPrayerDisplayName(prayer.name, language);

          return (
            <div
              key={prayer.name}
              className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                isNext
                  ? 'bg-gradient-to-b from-cyan-950/90 to-blue-950/80 border-cyan-400 shadow-[0_0_18px_rgba(0,212,255,0.3)] scale-[1.02]'
                  : 'bg-[#09152e]/70 border-cyan-900/30'
              }`}
            >
              <div className="flex justify-between items-start">
                <span className={`text-[10px] uppercase font-mono ${isNext ? 'text-cyan-300 font-bold' : 'text-slate-400'}`}>
                  {displayName}
                </span>
                <span className="text-xs font-arabic text-amber-400/90 font-serif">
                  {prayer.arabicName}
                </span>
              </div>
              <div className="my-2">
                <span className={`text-xl font-bold font-mono tracking-tight ${isNext ? 'text-white' : 'text-slate-200'}`}>
                  {prayer.time}
                </span>
              </div>
              <div>
                {isNext ? (
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-cyan-500/30 text-cyan-200 border border-cyan-400/50 block text-center">
                    {ui.nextBadge}
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-500 font-mono block text-center">
                    {prayer.passed ? ui.completedBadge : ui.waitingBadge}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Countdown & Parameters Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Next Prayer Live Banner (Col 6) */}
        <div className="lg:col-span-6 rounded-2xl bg-gradient-to-b from-[#09152e]/80 to-[#040816]/90 border border-cyan-900/40 p-5 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-cyan-900/40 pb-3">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
              {ui.countdownTitle}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-700/40 text-[10px] font-mono">
              Live Sun Telemetry
            </span>
          </div>

          <div className="py-6 flex flex-col items-center justify-center text-center">
            <span className="text-xs text-slate-400 mb-1">
              {ui.untilPrayerLabel}{' '}
              <strong className="text-cyan-300">
                {prayerSchedule.nextPrayer ? getPrayerDisplayName(prayerSchedule.nextPrayer.name, language) : ''}
              </strong>
            </span>
            <span className="text-4xl sm:text-5xl font-extrabold font-mono tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-blue-200 drop-shadow-[0_0_20px_rgba(0,212,255,0.4)]">
              {prayerSchedule.nextPrayer?.formattedCountdown}
            </span>
            <span className="text-xs text-slate-500 mt-2 font-mono">
              {ui.nextTimeLabel} {prayerSchedule.nextPrayer?.time}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/40 border border-cyan-900/20 text-xs">
            <span className="text-slate-400">{ui.calcMethodLabel}</span>
            <div className="flex gap-2">
              <button
                onClick={() => setCalcMethod('CMB')}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                  calcMethod === 'CMB'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {ui.cmbMethod}
              </button>
              <button
                onClick={() => setCalcMethod('MWL')}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                  calcMethod === 'MWL'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {ui.mwlMethod}
              </button>
            </div>
          </div>
        </div>

        {/* Qaza (Missed Prayers Tracker) (Col 6) */}
        <div className="lg:col-span-6 rounded-2xl bg-gradient-to-b from-[#09152e]/80 to-[#040816]/90 border border-cyan-900/40 p-5 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-cyan-900/40 pb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                {ui.qazaTitle}
              </h3>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">
              {ui.qazaSubtitle}
            </span>
          </div>

          <div className="space-y-2.5 my-3">
            {(['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] as const).map((name) => (
              <div
                key={name}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/50 border border-cyan-900/30 text-xs"
              >
                <span className="font-medium text-slate-300">{ui.qazaPrayers[name]}</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQaza(name, -1)}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    title="Decrease"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center font-mono font-bold text-cyan-300 text-sm">
                    {qazaCounts[name]}
                  </span>
                  <button
                    onClick={() => updateQaza(name, 1)}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    title="Increase"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-400 text-center">
            {ui.qazaFooter}
          </p>
        </div>
      </div>
    </div>
  );
};
