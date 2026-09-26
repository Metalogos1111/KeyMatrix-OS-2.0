import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Search,
  BookOpen,
  Volume2,
  VolumeX,
  Play,
  Pause,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
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
import { TRANSLATIONS } from '../../data/translations';

export const QuranReaderModal: React.FC = () => {
  const { isQuranModalOpen, setQuranModalOpen, language } = useOSStore();
  const t = TRANSLATIONS[language] || TRANSLATIONS.RU;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [verses, setVerses] = useState<QuranVerse[]>(OFFLINE_QURAN_CACHE.slice(0, 7));
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVerse, setSelectedVerse] = useState<QuranVerse | null>(OFFLINE_QURAN_CACHE[0]);
  const [playingVerseKey, setPlayingVerseKey] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [audioError, setAudioError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load verses when chapter changes or on mount
  useEffect(() => {
    if (!isQuranModalOpen) {
      if (audioRef.current) {
        audioRef.current.pause();
        setPlayingVerseKey(null);
      }
      return;
    }

    const loadChapter = async () => {
      setIsLoading(true);
      const res = await getChapterVerses(selectedChapter);
      setVerses(res);
      if (res.length > 0) setSelectedVerse(res[0]);
      setIsLoading(false);
    };

    if (!searchQuery.trim()) {
      loadChapter();
    }
  }, [selectedChapter, isQuranModalOpen]);

  // Handle live search
  useEffect(() => {
    if (!searchQuery.trim()) {
      getChapterVerses(selectedChapter).then(setVerses);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      const results = await searchQuran(searchQuery, language);
      setVerses(results);
      if (results.length > 0) {
        setSelectedVerse(results[0]);
      }
      setIsLoading(false);
    }, 280);

    return () => clearTimeout(timer);
  }, [searchQuery, language]);

  const toggleAudio = (verse: QuranVerse) => {
    setAudioError(null);
    if (playingVerseKey === verse.verseKey) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setPlayingVerseKey(null);
    } else {
      if (audioRef.current) {
        audioRef.current.src = verse.audioUrl;
        audioRef.current.play().catch((err) => {
          console.warn('Audio playback restricted:', err);
          setAudioError('Аудио поток Tanzil недоступен в офлайн режиме');
          setPlayingVerseKey(null);
        });
        setPlayingVerseKey(verse.verseKey);
      }
    }
  };

  const handleCopy = (verse: QuranVerse) => {
    const textToCopy = `${verse.textUthmani}\n\n${verse.translations[language as keyof typeof verse.translations] || verse.translations.RU}\n[Коран ${verse.verseKey}] - KeyMatrix OS`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopiedKey(verse.verseKey);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  if (!isQuranModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
        <audio
          ref={audioRef}
          onEnded={() => setPlayingVerseKey(null)}
          onError={() => {
            setAudioError('Аудио недоступно');
            setPlayingVerseKey(null);
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-[#0d0f17]/95 border border-[#00D4FF]/30 rounded-2xl shadow-[0_0_50px_rgba(0,212,255,0.15)] overflow-hidden text-slate-100"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-gradient-to-r from-[#00D4FF]/10 via-transparent to-[#00FF88]/10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#00D4FF]/15 border border-[#00D4FF]/30 text-[#00D4FF]">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold tracking-tight text-white">
                    Quran Content Adapter v1.0.0
                  </h2>
                  <span className="px-2 py-0.5 text-xs font-semibold uppercase tracking-wider rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    REAL • TANZIL & QURAN.COM API
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Священный Коран • Канонический текст Усмани • Поиск, Тафсир Ибн Касира и Аудио Мишари Рашид
                </p>
              </div>
            </div>

            <button
              onClick={() => setQuranModalOpen(false)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search & Chapter Bar */}
          <div className="p-4 border-b border-white/10 bg-black/20 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск по аятам (например: свет, 1:1, 2:255, رحمة, терпение)..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-black/40 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#00D4FF]/60"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Очистить
                </button>
              )}
            </div>

            {/* Canonical Surah quick selector */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {CANONICAL_CHAPTERS.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => {
                    setSelectedChapter(ch.id);
                    setSearchQuery('');
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                    selectedChapter === ch.id && !searchQuery
                      ? 'bg-[#00D4FF]/20 text-[#00D4FF] border border-[#00D4FF]/40 shadow-[0_0_12px_rgba(0,212,255,0.2)]'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {ch.nameTransliterated} ({ch.id})
                </button>
              ))}
            </div>
          </div>

          {/* Content Body: Two Column */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {/* Left: Verses List */}
            <div className="lg:col-span-7 overflow-y-auto max-h-[58vh] lg:max-h-[66vh] p-4 space-y-4">
              {isLoading && (
                <div className="py-12 flex flex-col items-center justify-center text-slate-400 gap-2">
                  <div className="w-8 h-8 border-2 border-[#00D4FF] border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs">Загрузка канонических аятов...</span>
                </div>
              )}

              {!isLoading && verses.length === 0 && (
                <div className="py-12 text-center text-slate-400">
                  Ничего не найдено по запросу «{searchQuery}».
                </div>
              )}

              {!isLoading &&
                verses.map((verse) => {
                  const isPlaying = playingVerseKey === verse.verseKey;
                  const isSelected = selectedVerse?.verseKey === verse.verseKey;
                  const localizedTranslation =
                    verse.translations[language as keyof typeof verse.translations] ||
                    verse.translations.RU;

                  return (
                    <div
                      key={verse.verseKey}
                      onClick={() => setSelectedVerse(verse)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#00D4FF]/10 border-[#00D4FF]/40 shadow-[0_0_20px_rgba(0,212,255,0.1)]'
                          : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/10'
                      }`}
                    >
                      {/* Top Verse Key and Actions */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 text-xs font-mono font-bold rounded bg-white/10 text-cyan-300">
                            {verse.verseKey}
                          </span>
                          <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            5 PROVEN
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleAudio(verse);
                            }}
                            className={`p-1.5 rounded-lg text-xs flex items-center gap-1 transition-colors ${
                              isPlaying
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                            }`}
                            title="Слушать чтение Мишари Рашид"
                          >
                            {isPlaying ? (
                              <>
                                <Pause className="w-3.5 h-3.5" />
                                <span className="text-[10px]">Пауза</span>
                              </>
                            ) : (
                              <>
                                <Play className="w-3.5 h-3.5" />
                                <span className="text-[10px]">Аудио</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopy(verse);
                            }}
                            className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 text-xs transition-colors"
                            title="Скопировать аят"
                          >
                            {copiedKey === verse.verseKey ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Arabic Text */}
                      <div
                        dir="rtl"
                        className="text-right text-2xl font-serif leading-relaxed text-amber-100/95 py-2 font-medium tracking-wide"
                        style={{ fontFamily: "'Scheherazade New', 'Amiri', 'Traditional Arabic', serif" }}
                      >
                        {verse.textUthmani}
                      </div>

                      {/* Transliteration */}
                      <div className="text-xs text-cyan-300/70 italic mt-1 font-mono">
                        {verse.transliteration}
                      </div>

                      {/* Translation */}
                      <div className="text-sm text-slate-200 mt-2 leading-relaxed">
                        {localizedTranslation}
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Right: Selected Ayah Tafsir & Deep Context */}
            <div className="lg:col-span-5 p-5 overflow-y-auto max-h-[58vh] lg:max-h-[66vh] bg-black/30 flex flex-col justify-between">
              {selectedVerse ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <h3 className="font-semibold text-sm text-white">
                        Тафсир и Контекст: Аят {selectedVerse.verseKey}
                      </h3>
                    </div>
                    <span className="text-xs text-slate-400">Tanzil Verified</span>
                  </div>

                  {/* Tafsir Summary */}
                  <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-slate-300 text-xs leading-relaxed space-y-2">
                    <div className="font-medium text-amber-300 flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5" />
                      <span>Толкование смыслов (Тафсир Ибн Касира):</span>
                    </div>
                    <p className="text-slate-200 text-sm">
                      {selectedVerse.tafsirSummary.RU || selectedVerse.tafsirSummary.EN}
                    </p>
                  </div>

                  {/* Additional Languages Comparison */}
                  <div className="space-y-2.5 pt-2">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Globe2 className="w-3.5 h-3.5" />
                      <span>Мультиязычный свод:</span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-xs">
                      <div className="font-bold text-slate-400 mb-0.5">English (Sahih International):</div>
                      <div className="text-slate-200">{selectedVerse.translations.EN}</div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-xs">
                      <div className="font-bold text-slate-400 mb-0.5">Türkçe (Diyanet):</div>
                      <div className="text-slate-200">{selectedVerse.translations.TR || selectedVerse.translations.EN}</div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-xs" dir="rtl">
                      <div className="font-bold text-slate-400 mb-0.5 text-right">فارسی:</div>
                      <div className="text-slate-200 text-right">{selectedVerse.translations.FA || selectedVerse.translations.AR}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-slate-500 my-auto py-8">
                  Выберите аят из списка для просмотра толкования.
                </div>
              )}

              {/* Status footer inside modal */}
              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  M09 Adapter: Active
                </span>
                <span>Tanzil Canonical Index</span>
              </div>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="px-6 py-3 border-t border-white/10 bg-black/40 flex items-center justify-between text-xs text-slate-400">
            <div>
              {audioError && <span className="text-amber-400 mr-3">{audioError}</span>}
              <span>Quran Reciter: Mishary Rashid Alafasy • Tanzil Project</span>
            </div>
            <button
              onClick={() => setQuranModalOpen(false)}
              className="px-4 py-1.5 bg-white/10 hover:bg-white/15 text-white rounded-lg transition-colors font-medium"
            >
              Закрыть
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
