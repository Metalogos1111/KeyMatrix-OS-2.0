import { describe, it, expect } from 'vitest';
import {
  CANONICAL_CHAPTERS,
  OFFLINE_QURAN_CACHE,
  getChapterVerses,
  searchQuran,
} from '../adapters/quranAdapter';

describe('Quran Content Adapter (v0.3 Civilization)', () => {
  it('should load canonical chapter catalog with correct metadata', () => {
    expect(CANONICAL_CHAPTERS.length).toBeGreaterThanOrEqual(10);

    const alFatiha = CANONICAL_CHAPTERS.find((c) => c.id === 1);
    expect(alFatiha).toBeDefined();
    expect(alFatiha?.nameArabic).toBe('الفاتحة');
    expect(alFatiha?.versesCount).toBe(7);
  });

  it('should retrieve verses with arabic, translation, and audio from cache/api', async () => {
    const verses = await getChapterVerses(1);
    expect(verses.length).toBe(7);
    expect(verses[0].verseNumber).toBe(1);
    expect(verses[0].textUthmani).toContain('بِسْمِ ٱللَّهِ');
    expect(verses[0].audioUrl).toBeDefined();
  });

  it('should search Quran verses by keyword across translations', async () => {
    const results = await searchQuran('Милостивый', 'RU');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].translations.RU).toBeDefined();
  });

  it('should provide offline fallback for Ayat al-Kursi (2:255)', () => {
    const ayatAlKursi = OFFLINE_QURAN_CACHE.find((v) => v.verseKey === '2:255');
    expect(ayatAlKursi).toBeDefined();
    expect(ayatAlKursi?.evidenceLevel).toBe(5);
    expect(ayatAlKursi?.textUthmani).toContain('ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ');
  });
});
