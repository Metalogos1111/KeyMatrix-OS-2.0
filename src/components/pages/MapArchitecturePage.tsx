import React, { useState } from 'react';
import { Network, Layers, ShieldCheck, CheckCircle2, ChevronRight, Cpu, Sparkles, Terminal, Info, Grid } from 'lucide-react';
import { useOSStore } from '../../store/osStore';
import { M_LAYERS, MLayerItem } from '../../data/mockData';
import { EvidenceBadge } from '../common/EvidenceBadge';
import { TRANSLATIONS } from '../../data/translations';
import { GapMatrix } from '../map/GapMatrix';

export const MapArchitecturePage: React.FC = () => {
  const { language, addLog } = useOSStore();
  const t = TRANSLATIONS[language];

  const [activeTab, setActiveTab] = useState<'layers' | 'gap_matrix'>('layers');
  const [selectedLayer, setSelectedLayer] = useState<MLayerItem>(M_LAYERS[0]);

  const handleSelect = (layer: MLayerItem) => {
    setSelectedLayer(layer);
    addLog('SYSTEM', `Просмотр архитектурного слоя: [${layer.code}] ${layer.name}`, 'info');
  };

  return (
    <div id="page-map" className="space-y-4 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#07132b]/90 via-[#0a1b3a]/70 to-[#040a17]/90 border border-cyan-800/40 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <span>KEYMATRIX OS v2.0</span>
            <span>•</span>
            <span>CIVILIZATION ARCHITECTURE BLUEPRINT</span>
            <span>•</span>
            <EvidenceBadge level={5} compact />
          </div>
          <h1 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <Network className="w-6 h-6 text-cyan-400" />
            Карта M00–M16 & Gap Matrix
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Сквозная 17-уровневая архитектура и 12-мерная матрица соответствия целевой модели 002
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Tab Selector */}
          <div className="flex items-center p-1 rounded-xl bg-slate-900/90 border border-cyan-900/50">
            <button
              onClick={() => setActiveTab('layers')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeTab === 'layers'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-[0_0_10px_rgba(0,212,255,0.2)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              17 Слоев M00–M16
            </button>
            <button
              onClick={() => setActiveTab('gap_matrix')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeTab === 'gap_matrix'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-[0_0_10px_rgba(0,212,255,0.2)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5 text-amber-400" />
              Gap Matrix (Model 002)
            </button>
          </div>
        </div>
      </div>

      {/* Render selected view */}
      {activeTab === 'gap_matrix' ? (
        <GapMatrix />
      ) : (
        /* Grid: Left layers ladder (M00-M16), Right detailed layer inspector */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Layers List (Col 6) */}
          <div className="lg:col-span-6 space-y-2 max-h-[640px] overflow-y-auto custom-scrollbar pr-1">
            {M_LAYERS.map((layer) => {
              const isSelected = selectedLayer.code === layer.code;
              return (
                <button
                  key={layer.code}
                  onClick={() => handleSelect(layer)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between group ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-950/90 to-blue-950/70 border-cyan-400 shadow-[0_0_12px_rgba(0,212,255,0.2)] text-white'
                      : 'bg-[#09152e]/60 border-cyan-900/30 text-slate-300 hover:bg-slate-900/80 hover:border-cyan-800/40'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-10 h-7 rounded-lg text-xs font-mono font-black flex items-center justify-center shrink-0 border ${
                        isSelected
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-[0_0_10px_rgba(0,212,255,0.3)]'
                          : 'bg-slate-950 text-slate-400 border-slate-800 group-hover:text-cyan-300'
                      }`}
                    >
                      {layer.code}
                    </span>

                    <div className="truncate">
                      <div className="text-xs font-bold truncate group-hover:text-white">
                        {layer.name}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {layer.description}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded border ${
                        layer.status === 'OPERATIONAL'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : layer.status === 'ACTIVE'
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      }`}
                    >
                      {layer.status}
                    </span>
                    <ChevronRight
                      className={`w-3.5 h-3.5 transition-transform ${
                        isSelected ? 'text-cyan-400 translate-x-0.5' : 'text-slate-600 group-hover:text-cyan-400'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Layer Inspector (Col 6) */}
          <div className="lg:col-span-6 rounded-2xl bg-gradient-to-b from-[#09152e]/90 to-[#040816]/95 border border-cyan-800/40 p-6 shadow-xl flex flex-col justify-between min-h-[500px]">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-cyan-900/40 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-12 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 text-sm font-mono font-black flex items-center justify-center shadow-[0_0_15px_rgba(0,212,255,0.3)]">
                    {selectedLayer.code}
                  </span>
                  <div>
                    <h2 className="text-base font-bold text-white tracking-wide">
                      {selectedLayer.name}
                    </h2>
                    <span className="text-xs font-mono text-cyan-400">
                      Статус: {selectedLayer.status}
                    </span>
                  </div>
                </div>
                <EvidenceBadge level={selectedLayer.evidenceLevel} />
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-cyan-900/30 space-y-2">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                  Назначение и функционал слоя
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {selectedLayer.description}
                </p>
              </div>

              {/* Submodules Specification */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  Внутренние подсистемы и интерфейсы
                </span>
                <div className="p-3 rounded-xl bg-black/60 border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
                  <div>• Interface Bus: gRPC / WebSockets / Merkle Tree State</div>
                  <div>• Security Gate: PrimeCore Enclave v2.4 (Fail-Closed)</div>
                  <div>• Shura Approval: Rule #42 Mandatory Validation</div>
                  <div>• Proof of Resonance: Threshold &ge; 0.450</div>
                </div>
              </div>

              {/* Civilization Impact Note */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/30 to-blue-950/30 border border-cyan-800/30 space-y-1.5">
                <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Цивилизационный принцип
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  «От Намерения — к Воздействию. От Доказательств — к лучшему миру». Каждый слой архитектуры M00-M16
                  подчинен сохранению человеческой свободы воли и гармонии с биосферой Земли.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-cyan-900/40 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>ARCHITECTURAL MATRIX v2.0</span>
              <span>ONE HUMANITY • MANY POSSIBILITIES</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
