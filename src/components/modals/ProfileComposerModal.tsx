import React, { useState, useEffect } from 'react';
import {
  Sliders,
  Play,
  Save,
  PlusCircle,
  FolderOpen,
  Share2,
  FileCode,
  Brain,
  ShieldCheck,
  Activity,
  Cpu,
  Database,
  Infinity as InfinityIcon,
  Sparkles,
  CheckCircle2,
  Trash2,
} from 'lucide-react';
import { useOSStore } from '../../store/osStore';
import { db, DbComposition } from '../../lib/db/keymatrixDb';

export const ProfileComposerModal: React.FC = () => {
  const { isComposerModalOpen, setComposerModalOpen, runExecutionSimulation, addLog } = useOSStore();
  const [selectedNodeName, setSelectedNodeName] = useState('MindState');
  const [compositionName, setCompositionName] = useState('My Custom Architecture');
  const [executionMode, setExecutionMode] = useState('Hybrid');
  const [evidenceLevel, setEvidenceLevel] = useState('5 PROVEN');
  const [isSaved, setIsSaved] = useState(false);
  const [savedProfiles, setSavedProfiles] = useState<DbComposition[]>([]);
  const [activeTab, setActiveTab] = useState<'GRAPH' | 'PROFILES'>('GRAPH');

  useEffect(() => {
    if (isComposerModalOpen) {
      loadProfiles();
    }
  }, [isComposerModalOpen]);

  const loadProfiles = async () => {
    try {
      const list = await db.compositions.toArray();
      setSavedProfiles(list);
    } catch (e) {
      console.error(e);
    }
  };

  if (!isComposerModalOpen) return null;

  const composerNodes = [
    { name: 'PrimeCore', icon: ShieldCheck, color: '#00FF88', x: 220, y: 70 },
    { name: 'MindState', icon: Activity, color: '#A855F7', x: 340, y: 120 },
    { name: 'Singularity', icon: InfinityIcon, color: '#818CF8', x: 340, y: 250 },
    { name: 'Archivarius', icon: Database, color: '#06B6D4', x: 280, y: 330 },
    { name: 'MetaForge', icon: Cpu, color: '#FF6B00', x: 160, y: 330 },
    { name: 'MetaLogos', icon: Brain, color: '#00D4FF', x: 220, y: 250 },
  ];

  const handleSave = async () => {
    const id = `comp-${Date.now()}`;
    const newComp: DbComposition = {
      id,
      name: compositionName,
      selectedNode: selectedNodeName,
      executionMode,
      evidenceLevel,
      nodes: ['PrimeCore', selectedNodeName, 'MetaLogos'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await db.compositions.put(newComp);
      await loadProfiles();
      setIsSaved(true);
      addLog('SYSTEM', `Профиль композиции сохранен в IndexedDB: [${compositionName}] (${selectedNodeName})`, 'success');
      setTimeout(() => setIsSaved(false), 2000);
    } catch (e) {
      addLog('SYSTEM', 'Ошибка при сохранении профиля в IndexedDB', 'error');
    }
  };

  const handleSelectSaved = (comp: DbComposition) => {
    setCompositionName(comp.name);
    setSelectedNodeName(comp.selectedNode);
    setExecutionMode(comp.executionMode);
    setEvidenceLevel(comp.evidenceLevel);
    setActiveTab('GRAPH');
  };

  const handleDeleteSaved = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await db.compositions.delete(id);
      await loadProfiles();
      addLog('SYSTEM', 'Профиль композиции удален из IndexedDB', 'info');
    } catch (e) {
      console.error(e);
    }
  };

  const handleRun = () => {
    setComposerModalOpen(false);
    runExecutionSimulation(`Интеллектуальная композиция: "${compositionName}" с ядром ${selectedNodeName} (${executionMode})`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-5xl max-h-[90vh] bg-[#070f23] border border-cyan-700/60 rounded-3xl p-6 shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cyan-900/50 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white uppercase font-mono tracking-wider">
                07 PROFILE &amp; COMPOSER (INDEXEDDB BACKED)
              </h2>
              <p className="text-xs text-slate-400">
                Конструирование композиций доменов интеллекта с сохранением в локальный реестр M07.
              </p>
            </div>
          </div>

          <button
            onClick={() => setComposerModalOpen(false)}
            className="text-slate-400 hover:text-white text-lg font-bold p-1 rounded-lg hover:bg-slate-800"
          >
            ✕
          </button>
        </div>

        {/* 3-Column Studio Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-1 overflow-hidden">
          {/* Left: Sidebar presets (Col 3) */}
          <div className="md:col-span-3 bg-[#050b18] rounded-2xl border border-cyan-950 p-3 space-y-1.5 text-xs font-mono flex flex-col justify-between">
            <div className="space-y-1.5">
              <button
                onClick={() => {
                  setActiveTab('GRAPH');
                  setCompositionName(`Composition #${savedProfiles.length + 1}`);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left font-bold transition-colors ${
                  activeTab === 'GRAPH'
                    ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-800/60'
                    : 'hover:bg-slate-900 text-slate-300'
                }`}
              >
                <PlusCircle className="w-4 h-4 text-cyan-400" />
                <span>Конструктор графа</span>
              </button>

              <button
                onClick={() => setActiveTab('PROFILES')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left font-bold transition-colors ${
                  activeTab === 'PROFILES'
                    ? 'bg-purple-950/60 text-purple-300 border border-purple-800/60'
                    : 'hover:bg-slate-900 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <FolderOpen className="w-4 h-4 text-purple-400" />
                  <span>Сохраненные профили</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                  {savedProfiles.length}
                </span>
              </button>
            </div>

            {/* Quick stats on saved items */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[10px] space-y-1 text-slate-400">
              <div className="font-bold text-slate-300 uppercase">Локальное хранилище M07:</div>
              <div>База: IndexedDB (Dexie)</div>
              <div>Профилей: {savedProfiles.length}</div>
              <div className="text-emerald-400">Статус: Персистентный OK</div>
            </div>
          </div>

          {/* Center: Visual Node Graph or Saved Profiles List (Col 6) */}
          <div className="md:col-span-6 bg-[#040813] rounded-2xl border border-cyan-900/40 relative flex items-center justify-center min-h-[360px] p-4 overflow-hidden">
            {activeTab === 'GRAPH' ? (
              <>
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#091428_1px,transparent_1px),linear-gradient(to_bottom,#091428_1px,transparent_1px)] bg-[size:24px_24px] opacity-40 pointer-events-none" />

                {/* Connecting SVG lines to center Intent */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {composerNodes.map((n) => (
                    <line
                      key={n.name}
                      x1="50%"
                      y1="50%"
                      x2={n.x}
                      y2={n.y}
                      stroke={n.color}
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      opacity="0.4"
                    />
                  ))}
                </svg>

                {/* Center Intent Node */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-950 border-2 border-cyan-400 flex flex-col items-center justify-center p-2 shadow-[0_0_25px_rgba(0,212,255,0.4)] z-10 cursor-pointer">
                  <Sparkles className="w-5 h-5 text-cyan-300 animate-pulse" />
                  <span className="text-[11px] font-bold text-white font-mono mt-1">Intent</span>
                </div>

                {/* Orbiting Nodes */}
                {composerNodes.map((node) => {
                  const Icon = node.icon;
                  const isSelected = selectedNodeName === node.name;

                  return (
                    <button
                      key={node.name}
                      onClick={() => setSelectedNodeName(node.name)}
                      style={{ left: `${node.x}px`, top: `${node.y}px` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-transform duration-200 z-20 ${
                        isSelected
                          ? 'scale-110 shadow-[0_0_20px_rgba(255,255,255,0.3)] bg-slate-900 border-white'
                          : 'hover:scale-105 bg-slate-950/80 border-slate-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" style={{ color: node.color }} />
                      <span className="text-xs font-mono font-bold text-slate-200">{node.name}</span>
                    </button>
                  );
                })}
              </>
            ) : (
              /* Saved Profiles List */
              <div className="w-full h-full overflow-y-auto custom-scrollbar p-2 space-y-2 z-10">
                <div className="text-xs font-bold text-slate-300 font-mono mb-2 flex items-center justify-between">
                  <span>Сохраненные в IndexedDB архитектуры:</span>
                  <span className="text-cyan-400">{savedProfiles.length} записей</span>
                </div>

                {savedProfiles.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleSelectSaved(p)}
                    className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500 cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span>{p.name}</span>
                        <span className="text-[10px] px-2 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-500/40">
                          {p.selectedNode}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-1">
                        Режим: {p.executionMode} · Уровень: {p.evidenceLevel}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleDeleteSaved(p.id, e)}
                        className="p-1 rounded hover:bg-rose-950 text-slate-500 hover:text-rose-400 transition-colors"
                        title="Удалить профиль"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Parameter Inspector (Col 3) */}
          <div className="md:col-span-3 bg-[#050b18] rounded-2xl border border-cyan-950 p-4 space-y-3 text-xs font-mono flex flex-col justify-between">
            <div className="space-y-3">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase mb-1">Название профиля:</span>
                <input
                  type="text"
                  value={compositionName}
                  onChange={(e) => setCompositionName(e.target.value)}
                  className="w-full bg-slate-900 text-white rounded border border-slate-800 px-2 py-1 text-xs focus:border-cyan-500 focus:outline-none font-bold"
                />
              </div>

              <div className="border-b border-cyan-900/40 pb-2">
                <span className="text-[10px] text-slate-400 block uppercase">Активное ядро:</span>
                <span className="text-sm font-bold text-cyan-300">{selectedNodeName}</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 block uppercase mb-1">Execution Mode:</span>
                <select
                  value={executionMode}
                  onChange={(e) => setExecutionMode(e.target.value)}
                  className="w-full bg-slate-900 text-white rounded border border-slate-800 p-1 text-xs"
                >
                  <option value="Hybrid">Hybrid (Local + TEE)</option>
                  <option value="Strict TEE">Strict TEE (Hardware Proof)</option>
                  <option value="Edge Local">Edge Local (Zero Latency)</option>
                </select>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 block uppercase mb-1">Evidence Level:</span>
                <span className="text-xs text-emerald-400 bg-emerald-950/50 px-2 py-1 rounded border border-emerald-500/40 block font-bold">
                  {evidenceLevel}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 block uppercase mb-1">Status:</span>
                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Ready to orchestrate
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-800">
              <button
                onClick={handleSave}
                className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSaved ? 'Сохранено в IndexedDB!' : 'Save Profile'}</span>
              </button>

              <button
                onClick={handleRun}
                className="w-full py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] flex items-center justify-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run in Sandbox</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
