import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  Search,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Copy,
  Check,
  CheckCircle2,
  Globe2,
  Sparkles,
  Info,
} from 'lucide-react';
import { useOSStore } from '../../store/osStore';
import {
  searchQuran,
  getChapterVerses,
  CANONICAL_CHAPTERS,
  QuranVerse,
  OFFLINE_QURAN_CACHE,
} from '../../lib/adapters/quranAdapter';
import { EvidenceBadge } from '../common/EvidenceBadge';
import { LOCALIZED_QURAN_UI } from '../../data/localizedContent';
import { Language } from '../../types';

export const QuranPage: React.FC = () => {
  const { language, addLog } = useOSStore();
  const ui = LOCALIZED_QURAN_UI[language] || LOCALIZED_QURAN_UI.EN;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [verses, setVerses] = useState<QuranVerse[]>(OFFLINE_QURAN_CACHE.slice(0, 7));
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVerse, setSelectedVerse] = useState<QuranVerse | null>(OFFLINE_QURAN_CACHE[0]);
  const [playingVerseKey, setPlayingVerseKey] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [audioError, setAudioError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load verses when chapter changes
  useEffect(() => {
    const loadChapter = async () => {
      setIsLoading(true);
      const res = await getChapterVerses(selectedChapter);
      setVerses(res);
      if (res.length > 0) setSelectedVerse(res[0]);
      setIsLoading(false);
    };
    loadChapter();
  }, [selectedChapter]);

  const getVerseTranslation = (verse: QuranVerse, lang: Language): string => {
    if (lang === 'AZ' && verse.translations.AZ) return verse.translations.AZ;
    if (lang === 'TR' && verse.translations.TR) return verse.translations.TR;
    if (lang === 'AR') return verse.translations.AR;
    if (lang === 'FA' && verse.translations.FA) return verse.translations.FA;
    if (lang === 'UR' && verse.translations.UR) return verse.translations.UR;
    if (lang === 'EN') return verse.translations.EN;
    return verse.translations.RU || verse.translations.EN;
  };

  const getTafsirText = (verse: QuranVerse, lang: Language): string => {
    if (lang === 'AZ' && verse.tafsirSummary.AZ) return verse.tafsirSummary.AZ;
    if (lang === 'AR') return verse.tafsirSummary.AR;
    if (lang === 'EN') return verse.tafsirSummary.EN;
    return verse.tafsirSummary.RU || verse.tafsirSummary.EN;
  };

  // Audio Playback
  const handlePlayAudio = (verse: QuranVerse) => {
    setAudioError(null);
    if (playingVerseKey === verse.verseKey && audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play().catch(() => setAudioError('Audio error'));
      } else {
        audioRef.current.pause();
        setPlayingVerseKey(null);
      }
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(verse.audioUrl);
    audioRef.current = audio;
    setPlayingVerseKey(verse.verseKey);

    audio.play().catch(() => {
      setAudioError('Audio stream offline');
      setPlayingVerseKey(null);
    });

    audio.onended = () => {
      setPlayingVerseKey(null);
    };
  };

  const handleCopy = (verse: QuranVerse) => {
    const transText = getVerseTranslation(verse, language);
    const textToCopy = `${verse.textUthmani}\n\n${transText}\n\n[Surah ${verse.verseKey}]`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopiedKey(verse.verseKey);
      addLog('AI', `Ayah ${verse.verseKey} copied to clipboard`, 'info');
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      const res = await getChapterVerses(selectedChapter);
      setVerses(res);
      return;
    }

    setIsLoading(true);
    const results = await searchQuran(query, language);
    setVerses(results);
    if (results.length > 0) setSelectedVerse(results[0]);
    setIsLoading(false);
  };

  const currentSurahMeta =
    CANONICAL_CHAPTERS.find((c) => c.id === selectedChapter) || CANONICAL_CHAPTERS[0];

  return (
    <div id="page-quran" className="space-y-4 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#07132b]/90 via-[#0a1b3a]/70 to-[#040a17]/90 border border-cyan-800/40 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <span>M09 ADAPTER</span>
            <span>•</span>
            <span>CANONICAL TANZIL CORPUS</span>
            <span>•</span>
            <EvidenceBadge level={5} compact />
          </div>
          <h1 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-emerald-400" />
            {ui.pageTitle}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {ui.pageSubtitle}
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="quran-search-input"
            type="text"
            placeholder={ui.searchAyahPlaceholder}
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900/80 border border-cyan-800/40 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans"
          />
        </div>
      </div>

      {/* Main Reader View: Left Surahs, Center Verses, Right Tafsir */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Surahs Index (Col 3) */}
        <div className="lg:col-span-3 rounded-2xl bg-gradient-to-b from-[#09152e]/80 to-[#040816]/90 border border-cyan-900/40 p-3 shadow-xl max-h-[600px] overflow-y-auto custom-scrollbar space-y-1">
          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider px-2 py-1 block">
            {ui.surahsTitle} ({CANONICAL_CHAPTERS.length})
          </span>
          {CANONICAL_CHAPTERS.map((ch) => {
            const isSelected = selectedChapter === ch.id;
            return (
              <button
                key={ch.id}
                id={`quran-surah-btn-${ch.id}`}
                onClick={() => {
                  setSelectedChapter(ch.id);
                  setSearchQuery('');
                  addLog('AI', `Selected Surah: ${ch.nameTransliterated}`, 'info');
                }}
                className={`w-full text-left px-3 py-2 rounded-xl border transition-all flex items-center justify-between group ${
                  isSelected
                    ? 'bg-cyan-950/80 border-cyan-500/50 text-white shadow-[0_0_10px_rgba(0,212,255,0.2)]'
                    : 'bg-slate-900/40 border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-6 h-6 rounded-lg bg-slate-900 border border-cyan-900/40 text-[10px] font-mono font-bold flex items-center justify-center text-cyan-300">
                    {ch.id}
                  </span>
                  <div className="truncate">
                    <div className="text-xs font-semibold text-slate-200 group-hover:text-white truncate">
                      {ch.nameTransliterated}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">
                      {ch.versesCount} {ui.versesLabel} • {ch.revelationPlace === 'makkah' ? ui.makkah : ui.madinah}
                    </div>
                  </div>
                </div>
                <span className="font-arabic text-sm text-amber-400/90 font-serif shrink-0">
                  {ch.nameArabic}
                </span>
              </button>
            );
          })}
        </div>

        {/* Center: Verses List (Col 6) */}
        <div className="lg:col-span-6 rounded-2xl bg-gradient-to-b from-[#09152e]/80 to-[#040816]/90 border border-cyan-900/40 p-4 shadow-xl max-h-[600px] overflow-y-auto custom-scrollbar space-y-3">
          <div className="flex items-center justify-between border-b border-cyan-900/40 pb-2 mb-2">
            <div>
              <h2 className="text-sm font-bold text-white">
                {currentSurahMeta.id}. {currentSurahMeta.nameTransliterated} ({currentSurahMeta.nameEnglish})
              </h2>
              <span className="text-[10px] text-slate-400 font-mono">
                {ui.totalVersesLabel} {currentSurahMeta.versesCount} • {ui.revealedInLabel} {currentSurahMeta.revelationPlace === 'makkah' ? ui.makkah : ui.madinah}
              </span>
            </div>
            <span className="font-arabic text-lg text-amber-400 font-serif">
              {currentSurahMeta.nameArabic}
            </span>
          </div>

          {verses.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              {ui.noVersesFound}
            </div>
          ) : (
            verses.map((verse) => {
              const isSelected = selectedVerse?.verseKey === verse.verseKey;
              const isPlaying = playingVerseKey === verse.verseKey;
              const primaryTranslation = getVerseTranslation(verse, language);
              const showSecondaryEn = language !== 'EN' && verse.translations.EN;

              return (
                <div
                  key={verse.verseKey}
                  onClick={() => setSelectedVerse(verse)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer space-y-3 ${
                    isSelected
                      ? 'bg-slate-900/90 border-cyan-400/60 shadow-[0_0_12px_rgba(0,212,255,0.15)]'
                      : 'bg-slate-950/50 border-cyan-900/20 hover:border-cyan-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
                    <span className="px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/50 text-[10px] font-mono font-bold">
                      {verse.verseKey}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayAudio(verse);
                        }}
                        className={`p-1.5 rounded-lg border text-xs transition-colors ${
                          isPlaying
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 animate-pulse'
                            : 'bg-slate-900 text-slate-400 hover:text-cyan-300 border-slate-700'
                        }`}
                        title={ui.listenTooltip}
                      >
                        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(verse);
                        }}
                        className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-cyan-300 border border-slate-700 text-xs transition-colors"
                        title={copiedKey === verse.verseKey ? ui.copiedTooltip : ui.copyTooltip}
                      >
                        {copiedKey === verse.verseKey ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Uthmani Text */}
                  <div className="text-right font-arabic text-xl sm:text-2xl text-amber-300/95 leading-loose tracking-wide dir-rtl py-1">
                    {verse.textUthmani}
                  </div>

                  {/* Primary Localized Translation */}
                  <div className="text-xs text-slate-200 leading-relaxed font-sans">
                    {primaryTranslation}
                  </div>

                  {/* Secondary English Translation if different */}
                  {showSecondaryEn && (
                    <div className="text-[11px] text-slate-400 italic font-sans">
                      "{verse.translations.EN}"
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Right: Tafsir & Context Panel (Col 3) */}
        <div className="lg:col-span-3 rounded-2xl bg-gradient-to-b from-[#09152e]/80 to-[#040816]/90 border border-cyan-900/40 p-4 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-cyan-900/40 pb-3">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                {ui.tafsirTitle}
              </h3>
            </div>
            <EvidenceBadge level={5} compact />
          </div>

          {selectedVerse ? (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-cyan-900/30">
                <span className="text-[10px] text-cyan-400 font-mono block mb-1">
                  {ui.ayahLabel} {selectedVerse.verseKey}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {getTafsirText(selectedVerse, language)}
                </p>
              </div>

              {language !== 'EN' && selectedVerse.tafsirSummary.EN && (
                <div className="p-3 rounded-xl bg-slate-900/40 border border-cyan-900/20 text-[11px] text-slate-400 leading-relaxed font-sans">
                  <strong className="text-slate-300 block mb-1">English Commentary:</strong>
                  {selectedVerse.tafsirSummary.EN}
                </div>
              )}
            </div>
          ) : (
            <div className="text-xs text-slate-500 text-center py-6">
              {ui.selectAyahPrompt}
            </div>
          )}

          <div className="p-3 rounded-xl bg-black/40 border border-cyan-900/30 text-[10px] text-slate-500 font-mono">
            {ui.corpusFooterNote}
          </div>
        </div>
      </div>
    </div>
  );
};
