export type AdapterMode = 'ONLINE_LIVE' | 'OFFLINE_CACHE' | 'OFFLINE_CALC';

export interface AdapterAutonomySpec<T = any> {
  adapterId: 'qibla' | 'prayer' | 'quran' | 'nur' | 'webSearch';
  adapterName: string;
  onlineFn: () => Promise<T>;
  offlineFallback: () => Promise<T>;
  autoDetectMode: () => AdapterMode;
  retryPolicy: {
    attempts: number;
    backoffMs: number;
  };
}

export interface AdapterStatus {
  adapterId: 'qibla' | 'prayer' | 'quran' | 'nur' | 'webSearch';
  mode: AdapterMode;
  isOnline: boolean;
  lastSyncTimestamp: string;
  latencyMs: number;
  cacheHit: boolean;
}

/**
 * Calculates Qibla direction offline using spherical trigonometry
 * Formula: atan2(sin(Δλ), cos(φ1)*tan(φ2) - sin(φ1)*cos(Δλ))
 */
export function calculateQiblaOffline(lat: number, lng: number): number {
  const KAABA_LAT = 21.422487 * (Math.PI / 180);
  const KAABA_LNG = 39.826206 * (Math.PI / 180);
  const phi1 = lat * (Math.PI / 180);
  const lambda1 = lng * (Math.PI / 180);

  const dLambda = KAABA_LNG - lambda1;
  const y = Math.sin(dLambda);
  const x = Math.cos(phi1) * Math.tan(KAABA_LAT) - Math.sin(phi1) * Math.cos(dLambda);

  let qibla = Math.atan2(y, x) * (180 / Math.PI);
  return (qibla + 360) % 360;
}

/**
 * Offline calculation helper for Prayer Times based on MWL standard
 */
export function calculatePrayerOffline(lat: number, lng: number, dateStr?: string) {
  const date = dateStr ? new Date(dateStr) : new Date();
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);

  // Approximate solar declination
  const declination = 23.45 * Math.sin(((284 + dayOfYear) / 365) * 2 * Math.PI) * (Math.PI / 180);
  const phi = lat * (Math.PI / 180);

  // Hour angle helper
  const hourAngle = (angleDeg: number) => {
    const rad = angleDeg * (Math.PI / 180);
    const cosHA = (Math.sin(-rad) - Math.sin(phi) * Math.sin(declination)) / (Math.cos(phi) * Math.cos(declination));
    const clamped = Math.max(-1, Math.min(1, cosHA));
    return Math.acos(clamped) * (180 / Math.PI) / 15;
  };

  const solarNoon = 12 + (4 * (0 - lng)) / 60; // Approximate transit
  const fajrHA = hourAngle(18); // 18 deg MWL
  const ishaHA = hourAngle(17); // 17 deg MWL

  const formatTime = (hours: number) => {
    const h = Math.floor((hours + 24) % 24);
    const m = Math.floor((hours * 60) % 60);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  return {
    Fajr: formatTime(solarNoon - fajrHA),
    Sunrise: formatTime(solarNoon - hourAngle(0.833)),
    Dhuhr: formatTime(solarNoon + 0.05),
    Asr: formatTime(solarNoon + hourAngle(15)),
    Maghrib: formatTime(solarNoon + hourAngle(0.833)),
    Isha: formatTime(solarNoon + ishaHA),
    calculationMethod: 'MWL_OFFLINE_TRIGONOMETRY',
  };
}

/**
 * Executes adapter call with transparent online/offline mode switching and exponential backoff
 */
export async function executeAdapterAutonomy<T>(spec: AdapterAutonomySpec<T>): Promise<{ data: T; mode: AdapterMode; latencyMs: number }> {
  const start = performance.now();
  const isOnline = navigator.onLine;

  if (!isOnline) {
    const fallbackData = await spec.offlineFallback();
    return {
      data: fallbackData,
      mode: 'OFFLINE_CALC',
      latencyMs: Math.round(performance.now() - start),
    };
  }

  let attempt = 0;
  while (attempt < spec.retryPolicy.attempts) {
    try {
      const data = await spec.onlineFn();
      return {
        data,
        mode: 'ONLINE_LIVE',
        latencyMs: Math.round(performance.now() - start),
      };
    } catch (err) {
      attempt++;
      if (attempt >= spec.retryPolicy.attempts) break;
      await new Promise((r) => setTimeout(r, spec.retryPolicy.backoffMs * Math.pow(2, attempt - 1)));
    }
  }

  // If online attempts failed, fallback to offline cache/calculation
  const fallbackData = await spec.offlineFallback();
  return {
    data: fallbackData,
    mode: 'OFFLINE_CACHE',
    latencyMs: Math.round(performance.now() - start),
  };
}
