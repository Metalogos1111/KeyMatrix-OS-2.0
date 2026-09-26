import { Language } from '../types';

export interface LocaleMetadata {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
  dir: 'ltr' | 'rtl';
  script: string;
  numberFormat: string;
  dateFormat: string;
  prayerMethod: string;
  previewSentence: string; // "Знания. Действия. Доверие."
}

export const LOCALES_REGISTRY: Record<Language, LocaleMetadata> = {
  EN: {
    code: 'EN',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    dir: 'ltr',
    script: 'Latin',
    numberFormat: 'en-US (1,234.56)',
    dateFormat: 'YYYY-MM-DD',
    prayerMethod: 'Muslim World League (MWL)',
    previewSentence: 'Knowledge. Action. Trust.',
  },
  RU: {
    code: 'RU',
    name: 'Russian',
    nativeName: 'Русский',
    flag: '🇷🇺',
    dir: 'ltr',
    script: 'Cyrillic',
    numberFormat: 'ru-RU (1 234,56)',
    dateFormat: 'DD.MM.YYYY',
    prayerMethod: 'Muslim World League (MWL)',
    previewSentence: 'Знания. Действия. Доверие.',
  },
  AZ: {
    code: 'AZ',
    name: 'Azerbaijani',
    nativeName: 'Azərbaycan dili',
    flag: '🇦🇿',
    dir: 'ltr',
    script: 'Latin (Baku/Caspian)',
    numberFormat: 'az-AZ (1 234,56)',
    dateFormat: 'DD.MM.YYYY',
    prayerMethod: 'Qafqaz Müsəlmanları İdarəsi (QMİ) / MWL',
    previewSentence: 'Bilik. Əməl. Etibar.',
  },
  TR: {
    code: 'TR',
    name: 'Turkish',
    nativeName: 'Türkçe',
    flag: '🇹🇷',
    dir: 'ltr',
    script: 'Latin',
    numberFormat: 'tr-TR (1.234,56)',
    dateFormat: 'DD.MM.YYYY',
    prayerMethod: 'Diyanet İşleri Başkanlığı',
    previewSentence: 'Bilgi. Eylem. Güven.',
  },
  AR: {
    code: 'AR',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    dir: 'rtl',
    script: 'Arabic (Kufic / Naskh)',
    numberFormat: 'ar-SA / Latin Isolated (١٬٢٣٤٫٥٦)',
    dateFormat: 'DD/MM/YYYY (Hijri Co-calendar)',
    prayerMethod: 'Umm Al-Qura (Makkah)',
    previewSentence: 'المعرفة. العمل. الأمانة والثقة.',
  },
  FA: {
    code: 'FA',
    name: 'Persian',
    nativeName: 'فارسی',
    flag: '🇮🇷',
    dir: 'rtl',
    script: 'Perso-Arabic (Nastaliq)',
    numberFormat: 'fa-IR (۱٬۲۳۴٫۵۶)',
    dateFormat: 'YYYY/MM/DD (Solar Hijri)',
    prayerMethod: 'Institute of Geophysics, Univ of Tehran',
    previewSentence: 'دانش. عمل. اعتماد و امانت.',
  },
  UR: {
    code: 'UR',
    name: 'Urdu',
    nativeName: 'اردو',
    flag: '🇵🇰',
    dir: 'rtl',
    script: 'Perso-Arabic (Nastaliq)',
    numberFormat: 'ur-PK (1,234.56)',
    dateFormat: 'DD/MM/YYYY',
    prayerMethod: 'University of Islamic Sciences, Karachi',
    previewSentence: 'علم۔ عمل۔ اعتماد اور صداقت۔',
  },
};
