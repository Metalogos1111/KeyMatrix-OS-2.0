import { Coordinates, CalculationMethod, PrayerTimes } from 'adhan';
import { PrayerTimeItem } from '../types';

export interface PrayerDaySchedule {
  dateString: string;
  hijriDate: string;
  prayers: PrayerTimeItem[];
  nextPrayer: {
    name: string;
    time: string;
    remainingSeconds: number;
    formattedCountdown: string;
  };
}

/**
 * Computes prayer times for coordinates and date
 */
export function calculatePrayerTimes(
  latitude: number,
  longitude: number,
  date: Date = new Date()
): PrayerDaySchedule {
  const coordinates = new Coordinates(latitude, longitude);
  // Muslim World League or custom params suitable for Caucasus / Azerbaijan
  const params = CalculationMethod.MuslimWorldLeague();
  params.fajrAngle = 18;
  params.ishaAngle = 17;

  const prayerTimes = new PrayerTimes(coordinates, date, params);

  const formatTime = (d: Date) => {
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const fajrTime = formatTime(prayerTimes.fajr);
  const sunriseTime = formatTime(prayerTimes.sunrise);
  const dhuhrTime = formatTime(prayerTimes.dhuhr);
  const asrTime = formatTime(prayerTimes.asr);
  const maghribTime = formatTime(prayerTimes.maghrib);
  const ishaTime = formatTime(prayerTimes.isha);

  const now = date.getTime();
  const timesList = [
    { name: 'Фаджр', arabicName: 'الفجر', dateObj: prayerTimes.fajr, time: fajrTime },
    { name: 'Восход', arabicName: 'الشروق', dateObj: prayerTimes.sunrise, time: sunriseTime },
    { name: 'Зухр', arabicName: 'الظهر', dateObj: prayerTimes.dhuhr, time: dhuhrTime },
    { name: 'Аср', arabicName: 'العصر', dateObj: prayerTimes.asr, time: asrTime },
    { name: 'Магриб', arabicName: 'المغرب', dateObj: prayerTimes.maghrib, time: maghribTime },
    { name: 'Иша', arabicName: 'العشاء', dateObj: prayerTimes.isha, time: ishaTime },
  ];

  // Determine next prayer
  let next = timesList.find((p) => p.dateObj.getTime() > now);
  let remainingMs = 0;

  if (!next) {
    // Tomorrow Fajr
    const tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomPrayers = new PrayerTimes(coordinates, tomorrow, params);
    next = {
      name: 'Фаджр',
      arabicName: 'الفجر',
      dateObj: tomPrayers.fajr,
      time: formatTime(tomPrayers.fajr),
    };
    remainingMs = tomPrayers.fajr.getTime() - now;
  } else {
    remainingMs = next.dateObj.getTime() - now;
  }

  const remainingSeconds = Math.max(0, Math.floor(remainingMs / 1000));
  const hours = Math.floor(remainingSeconds / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);
  const seconds = remainingSeconds % 60;
  const formattedCountdown = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const prayers: PrayerTimeItem[] = timesList.map((p) => ({
    name: p.name,
    arabicName: p.arabicName,
    time: p.time,
    isNext: next?.name === p.name,
    passed: p.dateObj.getTime() <= now,
  }));

  // Hijri estimation (15 Rabi' al-Awwal 1448 for mid-Sep 2026, or current)
  const hijriDate = '15 Rabi\' al-Awwal 1448';

  const dateString = date.toLocaleDateString('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return {
    dateString: dateString.charAt(0).toUpperCase() + dateString.slice(1),
    hijriDate,
    prayers,
    nextPrayer: {
      name: next.name,
      time: next.time,
      remainingSeconds,
      formattedCountdown,
    },
  };
}
