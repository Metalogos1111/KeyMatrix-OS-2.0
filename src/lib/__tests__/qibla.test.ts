import { describe, it, expect } from 'vitest';
import {
  calculateQiblaBearing,
  calculateDistanceToKaabaKm,
  getCompassCardinal,
  DEFAULT_BAKU_COORDINATES,
  BAKU_CANONICAL_QIBLA,
} from '../qibla';

describe('M09 Islamic Geodesic Adapter - Qibla Bearing Tests', () => {
  it('calculates Baku Qibla azimuth to be 236.1° ±0.5° (Canonical QMİ Standard)', () => {
    const lat = 40.3648;
    const lng = 49.9567;
    const bearing = calculateQiblaBearing(lat, lng);

    expect(bearing).toBeCloseTo(236.1, 0.5);
    expect(Math.abs(bearing - 236.1)).toBeLessThanOrEqual(0.5);
  });

  it('matches default Baku coordinates constant azimuth with canonical value', () => {
    const bearing = calculateQiblaBearing(
      DEFAULT_BAKU_COORDINATES.latitude,
      DEFAULT_BAKU_COORDINATES.longitude
    );
    expect(bearing).toBe(BAKU_CANONICAL_QIBLA);
  });

  it('computes distance from Baku to Mecca accurately (~2280 km)', () => {
    const dist = calculateDistanceToKaabaKm(40.3648, 49.9567);
    // Great circle distance Baku to Mecca is approx 2280 km
    expect(dist).toBeGreaterThan(2100);
    expect(dist).toBeLessThan(2500);
  });

  it('returns South-West cardinal direction for 236.1°', () => {
    expect(getCompassCardinal(236.1, 'RU')).toBe('Юго-Запад');
    expect(getCompassCardinal(236.1, 'EN')).toBe('South-West');
    expect(getCompassCardinal(236.1, 'AR')).toBe('جنوب غرب');
  });
});
