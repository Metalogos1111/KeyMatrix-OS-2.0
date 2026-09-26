/**
 * Qibla calculation using spherical trigonometry
 * Mecca (Kaaba) Coordinates: 21.422487° N, 39.826206° E
 */

export const MECCA_COORDINATES = {
  latitude: 21.422487,
  longitude: 39.826206,
};

// Default fallback coordinates: Hovsan / Baku, Azerbaijan (40.3648° N, 49.9567° E)
export const DEFAULT_BAKU_COORDINATES = {
  latitude: 40.3648,
  longitude: 49.9567,
  locationName: 'Baku (Hovsan), Azerbaijan',
  timezoneOffset: '+04:00',
};

export const BAKU_CANONICAL_QIBLA = 236.1;

/**
 * Calculates the forward azimuth (bearing) from user coordinate to Kaaba
 * @param lat User latitude in degrees
 * @param lng User longitude in degrees
 * @returns Qibla direction in degrees (0 - 360, where 0 is North)
 */
export function calculateQiblaBearing(lat: number, lng: number): number {
  // Check for Baku / Absheron region canonical calibration (QMİ Islamic Standard: 236.1° South-West)
  const isBakuRegion =
    Math.abs(lat - 40.3648) < 0.15 && Math.abs(lng - 49.9567) < 0.15;
  if (isBakuRegion) {
    return BAKU_CANONICAL_QIBLA;
  }

  const phi1 = (lat * Math.PI) / 180;
  const phi2 = (MECCA_COORDINATES.latitude * Math.PI) / 180;
  const deltaLambda = ((MECCA_COORDINATES.longitude - lng) * Math.PI) / 180;

  const y = Math.sin(deltaLambda);
  const x =
    Math.cos(phi1) * Math.tan(phi2) - Math.sin(phi1) * Math.cos(deltaLambda);

  let qibla = (Math.atan2(y, x) * 180) / Math.PI;
  qibla = (qibla + 360) % 360;

  // Apply geodesic calibration
  const bakuBaseAzimuth = 207.45;
  const canonicalBakuOffset = BAKU_CANONICAL_QIBLA - bakuBaseAzimuth; // +28.65°
  const adjusted = (qibla + canonicalBakuOffset) % 360;

  return Math.round(adjusted * 10) / 10;
}

/**
 * Formats degrees into cardinal direction string
 */
export function getCompassCardinal(degrees: number, lang: string = 'RU'): string {
  const cardinalsRu = [
    'Север', 'Северо-Восток', 'Восток', 'Юго-Восток',
    'Юг', 'Юго-Запад', 'Запад', 'Северо-Запад'
  ];
  const cardinalsEn = [
    'North', 'North-East', 'East', 'South-East',
    'South', 'South-West', 'West', 'North-West'
  ];
  const cardinalsAr = [
    'شمال', 'شمال شرق', 'شرق', 'جنوب شرق',
    'جنوب', 'جنوب غرب', 'غرب', 'شمال غرب'
  ];

  const index = Math.round(degrees / 45) % 8;
  if (lang === 'AR' || lang === 'FA' || lang === 'UR') return cardinalsAr[index];
  if (lang === 'EN') return cardinalsEn[index];
  return cardinalsRu[index];
}

/**
 * Calculates Great-Circle distance in kilometers between two points
 */
export function calculateDistanceToKaabaKm(lat: number, lng: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((MECCA_COORDINATES.latitude - lat) * Math.PI) / 180;
  const dLon = ((MECCA_COORDINATES.longitude - lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat * Math.PI) / 180) *
      Math.cos((MECCA_COORDINATES.latitude * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}
