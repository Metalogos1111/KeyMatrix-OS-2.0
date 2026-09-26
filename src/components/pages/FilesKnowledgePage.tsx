import React, { useState } from 'react';
import {
  FileText,
  Search,
  CheckCircle2,
  ShieldCheck,
  Hash,
  Download,
  Eye,
  FileCode,
  Lock,
  Upload,
  Sparkles,
} from 'lucide-react';
import { useOSStore } from '../../store/osStore';
import { EvidenceBadge } from '../common/EvidenceBadge';
import { TRANSLATIONS } from '../../data/translations';
import { EvidenceLevel } from '../../types';

interface VaultFile {
  id: string;
  name: string;
  category: 'SHARIAH' | 'MATH' | 'ARCHITECTURE' | 'ECOLOGY' | 'LEGAL';
  size: string;
  sha256: string;
  evidenceLevel: EvidenceLevel;
  updatedAt: string;
  description: string;
  contentSnippet: string;
}

const VAULT_FILES: VaultFile[] = [
  {
    id: 'f-01',
    name: 'Shura_Rule_42_Ethical_Guardrails.spec',
    category: 'SHARIAH',
    size: '142 KB',
    sha256: '9f83a4b2c1d0e5f6...7a8b9c0d',
    evidenceLevel: 'OBSERVED',
    updatedAt: '2026-09-17 10:14',
    description: 'Официальный канонический протокол Shura Rule #42. Защита человеческого достоинства, запрет ростовщичества и манипуляций.',
    contentSnippet: '// SHURA RULE #42 SPECIFICATION\n// Article 1: Autonomous agents must submit to human-first oversight.\n// Article 2: Riba-based transactions are strictly rejected at kernel level.\n// Verification: Council quorum of 5 independent signers.',
  },
  {
    id: 'f-02',
    name: 'Proof_of_Resonance_Mathematical_Foundations.pdf',
    category: 'MATH',
    size: '2.4 MB',
    sha256: '3d4e5f6a7b8c9d0e...1a2b3c4d',
    evidenceLevel: 'OBSERVED',
    updatedAt: '2026-09-16 18:30',
    description: 'Математическое доказательство когерентности гармонических волн и золотого сечения φ = 1.618033 для алгоритмов PoR.',
    contentSnippet: 'Theorem 4.1: If resonance amplitude exceeds 1/phi (0.618033) under stationary conditions, semantic entropy approaches zero.',
  },
  {
    id: 'f-03',
    name: 'Civilization_M00_M16_Architectural_Blueprint.json',
    category: 'ARCHITECTURE',
    size: '89 KB',
    sha256: '1b2c3d4e5f6a7b8c...9d0e1f2a',
    evidenceLevel: 'RUNNING',
    updatedAt: '2026-09-17 08:22',
    description: 'Полный граф модулей от M01 (Интерфейс) до M16 (Сингулярность), спецификация API и междоменных шин данных.',
    contentSnippet: '{\n  "version": "2.0.0",\n  "layers": ["M01_UI", "M02_Identity", "M03_Authority", "M04_Policy", "M05_Evidence", "M06_Resonance", "M10_NUR"],\n  "kernel": "Antigravity_TEE"\n}',
  },
  {
    id: 'f-04',
    name: 'AAOIFI_Mudarabah_Zero_Riba_Standard_44.docx',
    category: 'LEGAL',
    size: '480 KB',
    sha256: '5a6b7c8d9e0f1a2b...3c4d5e6f',
    evidenceLevel: 'OBSERVED',
    updatedAt: '2026-09-15 14:00',
    description: 'Исламский финансовый стандарт AAOIFI №44 по инвестиционным договорам Мудараба и распределению чистой прибыли.',
    contentSnippet: 'Стандарт регулирует разделение прибыли между инвестором (Рабб аль-Маль) и управляющим (Мудариб) в пропорциях 60/40 без гарантированного дохода.',
  },
  {
    id: 'f-05',
    name: 'Caspian_Eco_Sensors_Telemetry_Log_2026.csv',
    category: 'ECOLOGY',
    size: '5.1 MB',
    sha256: '8c9d0e1f2a3b4c5d...6e7f8a9b',
    evidenceLevel: 'IMPLEMENTED',
    updatedAt: '2026-09-17 11:45',
    description: 'Посекундный лог содержания кислорода, солености и температуры воды с 24 микростанций вокруг Апшеронского полуострова.',
    contentSnippet: 'timestamp,station_id,lat,lon,o2_mg_l,temp_c,salinity_ppt\n2026-09-17T11:45:00,ST_GOVSAN_01,40.352,49.982,8.42,21.8,12.8',
  },
  {
    id: 'f-06',
    name: 'Hadith_Sahih_Al_Bukhari_Ethical_Deeds_Index.dat',
    category: 'SHARIAH',
    size: '3.8 MB',
    sha256: '2e3f4a5b6c7d8e9f...0a1b2c3d',
    evidenceLevel: 'OBSERVED',
    updatedAt: '2026-09-14 09:12',
    description: 'Индексированная база хадисов по теме взаимопомощи, торговой честности, уважения к труду и защите природы.',
    contentSnippet: '«Продавцы имеют право на выбор, пока не разошлись. Если они были правдивы и разъяснили качества товара, их сделка будет благословенна».',
  },
];

export const FilesKnowledgePage: React.FC = () => {
  const { language, addLog } = useOSStore();
  const t = TRANSLATIONS[language];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeFile, setActiveFile] = useState<VaultFile>(VAULT_FILES[0]);
  const [verifiedMap, setVerifiedMap] = useState<Record<string, boolean>>({});

  const filteredFiles = VAULT_FILES.filter((f) => {
    const matchesCat = selectedCategory === 'ALL' || f.category === selectedCategory;
    const matchesSearch =
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleVerifyHash = (file: VaultFile) => {
    setVerifiedMap((prev) => ({ ...prev, [file.id]: true }));
    addLog('EVIDENCE', `Хэш файла [${file.name}] успешно верифицирован в Archivarius (SHA256 OK)`, 'success');
  };

  return (
    <div id="page-files" className="space-y-4 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#07132b]/90 via-[#0a1b3a]/70 to-[#040a17]/90 border border-cyan-800/40 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <span>CORE DOMAIN 05 (ARCHIVARIUS)</span>
            <span>•</span>
            <span>IMMUTABLE KNOWLEDGE VAULT</span>
            <span>•</span>
            <EvidenceBadge level={5} compact />
          </div>
          <h1 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <FileText className="w-6 h-6 text-cyan-400" />
            Файлы и Знания — Хранилище доказательств
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Канонические тексты, спецификации Shura #42, математика PoR и экологические реестры
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="files-search-input"
            type="text"
            placeholder="Поиск по документам и спецификациям..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900/80 border border-cyan-800/40 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans"
          />
        </div>
      </div>

      {/* Categories Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
        {[
          { id: 'ALL', label: 'Все документы' },
          { id: 'SHARIAH', label: 'Шариат и Этика' },
          { id: 'MATH', label: 'Математика PoR' },
          { id: 'ARCHITECTURE', label: 'Архитектура M00-M16' },
          { id: 'LEGAL', label: 'AAOIFI и Право' },
          { id: 'ECOLOGY', label: 'Экология и Каспий' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium font-mono whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(0,212,255,0.2)]'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-transparent'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Grid: Left File List, Right Preview Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Files List (Col 7) */}
        <div className="lg:col-span-7 space-y-2.5">
          {filteredFiles.map((file) => {
            const isSelected = activeFile.id === file.id;
            const isVerified = verifiedMap[file.id];
            return (
              <div
                key={file.id}
                onClick={() => setActiveFile(file)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-950/90 to-blue-950/70 border-cyan-400/80 shadow-[0_0_15px_rgba(0,212,255,0.2)]'
                    : 'bg-[#09152e]/60 border-cyan-900/30 hover:bg-slate-900/70 hover:border-cyan-800/40'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-xl bg-slate-900 border border-cyan-900/40 text-cyan-400 shrink-0">
                      <FileCode className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <h4 className="text-xs font-bold text-white truncate font-mono">
                        {file.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {file.description}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <EvidenceBadge level={file.evidenceLevel} compact />
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <div className="flex items-center gap-3">
                    <span>{file.size}</span>
                    <span>•</span>
                    <span>{file.updatedAt}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isVerified ? (
                      <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="w-3 h-3" /> Хэш проверен
                      </span>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVerifyHash(file);
                        }}
                        className="px-2 py-0.5 rounded bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-700/40 transition-colors"
                      >
                        Верифицировать SHA-256
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Preview Drawer (Col 5) */}
        <div className="lg:col-span-5 rounded-2xl bg-gradient-to-b from-[#09152e]/90 to-[#040816]/95 border border-cyan-800/40 p-5 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-cyan-900/40 pb-3">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Предпросмотр документа
                </h3>
              </div>
              <EvidenceBadge level={activeFile.evidenceLevel} />
            </div>

            <div>
              <h3 className="text-sm font-bold font-mono text-cyan-200">
                {activeFile.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {activeFile.description}
              </p>
            </div>

            {/* Cryptographic Proof Hash */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-cyan-900/30 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">
                SHA-256 Merkle Proof:
              </span>
              <span className="text-xs font-mono text-cyan-300 break-all">
                {activeFile.sha256}
              </span>
            </div>

            {/* File Snippet Box */}
            <div className="p-3 rounded-xl bg-black/60 border border-slate-800 font-mono text-[11px] text-slate-300 whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto custom-scrollbar">
              {activeFile.contentSnippet}
            </div>
          </div>

          <div className="pt-3 border-t border-cyan-900/40 flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-500">
              IMMUTABLE VAULT • ARCHIVARIUS GATE
            </span>
            <button
              onClick={() => {
                addLog('EVIDENCE', `Загрузка цифровой копии: [${activeFile.name}]`, 'info');
              }}
              className="px-3 py-1.5 rounded-xl bg-cyan-950/60 hover:bg-cyan-900 text-cyan-300 border border-cyan-700/50 text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              Экспорт артефакта
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
