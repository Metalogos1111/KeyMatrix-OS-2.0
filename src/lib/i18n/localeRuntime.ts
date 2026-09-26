import { Language } from '../../types';

export const LOCALE_TAGS: Record<Language, string> = {
  EN: 'en-US',
  RU: 'ru-RU',
  AZ: 'az-AZ',
  TR: 'tr-TR',
  AR: 'ar-SA',
  FA: 'fa-IR',
  UR: 'ur-PK',
};

export const IS_RTL_LOCALE: Record<Language, boolean> = {
  EN: false,
  RU: false,
  AZ: false,
  TR: false,
  AR: true,
  FA: true,
  UR: true,
};

/**
 * Format number based on current selected OS language
 */
export function formatNumber(val: number, lang: Language = 'EN', options?: Intl.NumberFormatOptions): string {
  const localeTag = LOCALE_TAGS[lang] || 'en-US';
  try {
    return new Intl.NumberFormat(localeTag, options).format(val);
  } catch {
    return val.toLocaleString('en-US');
  }
}

/**
 * Format date based on current selected OS language
 */
export function formatDate(date: Date | string | number, lang: Language = 'EN', options?: Intl.DateTimeFormatOptions): string {
  const localeTag = LOCALE_TAGS[lang] || 'en-US';
  const d = typeof date === 'object' ? date : new Date(date);
  const defaultOptions: Intl.DateTimeFormatOptions = options || {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  try {
    return new Intl.DateTimeFormat(localeTag, defaultOptions).format(d);
  } catch {
    return d.toDateString();
  }
}

/**
 * Format time based on current selected OS language
 */
export function formatTime(date: Date | string | number, lang: Language = 'EN'): string {
  const localeTag = LOCALE_TAGS[lang] || 'en-US';
  const d = typeof date === 'object' ? date : new Date(date);
  try {
    return new Intl.DateTimeFormat(localeTag, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(d);
  } catch {
    return d.toTimeString().split(' ')[0];
  }
}

/**
 * Bidi isolation helper for non-textual data (coordinates, hashes, degree angles) in RTL
 */
export function isolateBidi(content: string | number): string {
  return `\u2066${content}\u2069`;
}
