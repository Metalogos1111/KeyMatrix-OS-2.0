import React, { useState } from 'react';
import {
  Cpu,
  CheckCircle2,
  AlertTriangle,
  Play,
  Layers,
  Network,
  Shield,
  ExternalLink,
  ChevronRight,
  Terminal,
  BookOpen,
  Wallet,
} from 'lucide-react';
import { useOSStore } from '../../store/osStore';
import { SYSTEM_ADAPTERS } from '../../data/mockData';
import { AdapterItem } from '../../types';

export const AdapterRegistryModal: React.FC = () => {
  const {
    isAdaptersModalOpen,
    setAdaptersModalOpen,
    testAdapter,
    setQuranModalOpen,
    setNurWalletModalOpen,
  } = useOSStore();
  const [selectedAdapter, setSelectedAdapter] = useState<AdapterItem>(SYSTEM_ADAPTERS[0]);
  const [testingId, setTestingId] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<string | null>(null);

  if (!isAdaptersModalOpen) return null;

  const handleTest = async (adapter: AdapterItem) => {
    setTestingId(adapter.id);
    setTestResult(null);
    const result = await testAdapter(adapter.id);
    setTestResult(result);
    setTestingId(null);
  };

  const getStatusBadge = (status: AdapterItem['status']) => {
    switch (status) {
      case 'REAL':
        return 'bg-emerald-950/70 text-emerald-300 border-emerald-500/50';
      case 'SIMULATED':
        return 'bg-amber-950/70 text-amber-300 border-amber-500/50';
      case 'SANITIZED':
        return 'bg-cyan-950/70 text-cyan-300 border-cyan-500/50';
      case 'SANDBOX':
        return 'bg-purple-950/70 text-purple-300 border-purple-500/50';
      default:
        return 'bg-slate-900 text-slate-300 border-slate-700';
    }
  };

  const mLayers = [
    { code: 'M16', name: 'Civilization Layer', desc: 'Global Positive Impact & Planetary Health' },
    { code: 'M15', name: 'Planetary Equilibrium', desc: 'Carbon Sink Verification & Biosphere Protection' },
    { code: 'M10', name: 'Economic Layer (NUR)', desc: 'Zero Riba, Mudarabah/Musharakah, Real Assets' },
    { code: 'M09', name: 'External Adapters', desc: 'Qibla, Prayer Times (adhan.js), Web Grounding' },
    { code: 'M08', name: 'AI Orchestration', desc: 'MetaLogos, MetaForge, Distributed Multi-Agent TEE' },
    { code: 'M07', name: 'State & Data Plane', desc: 'IndexedDB Local Ledger, Zero-Knowledge State' },
    { code: 'M06', name: 'Resonance (PoR)', desc: 'Proof of Resonance, 4-Gate Math Engine with Phi' },
    { code: 'M05', name: 'Evidence Vault', desc: 'Cryptographic pos_f7Bu... Hashes & Merkle Root' },
    { code: 'M04', name: 'Policy & Governance', desc: 'Zero-Riba, Zero-Maysir, Shariah Ethics Compliance' },
    { code: 'M03', name: 'Authority', desc: 'Shura Rule #42, 3-of-5 Council Signatures' },
    { code: 'M02', name: 'Identity', desc: 'W3C DID:key Ed25519, Verifiable Role Mandate' },
    { code: 'M01', name: 'Interface & UX', desc: 'Antigravity Runtime UI, Islamic Geometrics, Multilingual' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-4xl max-h-[90vh] bg-[#070f23] border border-cyan-700/60 rounded-3xl p-6 shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cyan-900/50 pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                <Cpu className="w-5 h-5" />
              </div>
              <h2 className="text-base font-extrabold text-white uppercase font-mono tracking-wider">
                01 ADAPTER REGISTRY &amp; ARCHITECTURE M01–M16
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Реальные и симулированные адаптеры системы. Все адаптеры проверяются TEE-политиками и Shura Rule #42.
            </p>
          </div>

          <button
            onClick={() => setAdaptersModalOpen(false)}
            className="text-slate-400 hover:text-white text-lg font-bold p-1 rounded-lg hover:bg-slate-800"
          >
            ✕
          </button>
        </div>

        {/* Content Tabs / Split view */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto custom-scrollbar flex-1 pr-1">
          {/* Left: 01 Adapters list & inspector */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-cyan-300 uppercase font-mono tracking-wider flex items-center gap-1.5">
              <span>Adapter Registry</span>
              <span className="text-[10px] text-slate-400">({SYSTEM_ADAPTERS.length} Active)</span>
            </h3>

            <div className="space-y-2">
              {SYSTEM_ADAPTERS.map((adapter) => {
                const isSelected = selectedAdapter.id === adapter.id;

                return (
                  <button
                    key={adapter.id}
                    onClick={() => {
                      setSelectedAdapter(adapter);
                      setTestResult(null);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-cyan-950/60 border-cyan-400 shadow-[0_0_12px_rgba(0,212,255,0.2)]'
                        : 'bg-slate-900/60 border-slate-800 hover:border-cyan-800 hover:bg-slate-900/90'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{adapter.name}</span>
                        <span className="text-[10px] font-mono text-slate-400">{adapter.version}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                        {adapter.description}
                      </span>
                    </div>

                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded-full border uppercase shrink-0 ml-2 ${getStatusBadge(
                        adapter.status
                      )}`}
                    >
                      {adapter.status}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Detailed Inspector for Selected Adapter */}
            {selectedAdapter && (
              <div className="p-4 rounded-xl bg-slate-950 border border-cyan-900/60 font-mono text-xs space-y-2.5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-cyan-300 font-bold">{selectedAdapter.name}</span>
                  <span
                    className={`text-[9px] px-2 py-0.5 rounded-full border ${getStatusBadge(
                      selectedAdapter.status
                    )}`}
                  >
                    {selectedAdapter.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Source:</span>
                    <span className="text-white">{selectedAdapter.source}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Version:</span>
                    <span className="text-white">{selectedAdapter.version}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Required Permissions:</span>
                    <span className="text-amber-300">{selectedAdapter.requiredPermissions}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Fallback:</span>
                    <span className="text-cyan-300">{selectedAdapter.fallback}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between flex-wrap gap-2">
                  <span className="text-[10px] text-slate-500">
                    Исполнение: {selectedAdapter.status === 'REAL' ? 'Реальный модуль' : 'TEE Симуляция'}
                  </span>

                  <div className="flex items-center gap-2">
                    {selectedAdapter.id === 'quran-content-adapter' && (
                      <button
                        onClick={() => {
                          setAdaptersModalOpen(false);
                          setQuranModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,255,136,0.3)]"
                      >
                        <BookOpen className="w-3 h-3" />
                        <span>Открыть Коран</span>
                      </button>
                    )}

                    {selectedAdapter.id === 'nur-wallet-adapter' && (
                      <button
                        onClick={() => {
                          setAdaptersModalOpen(false);
                          setNurWalletModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-black text-xs font-bold transition-all flex items-center gap-1.5 shadow-[0_0_10px_rgba(255,215,0,0.3)]"
                      >
                        <Wallet className="w-3 h-3" />
                        <span>Открыть Кошелек</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleTest(selectedAdapter)}
                      disabled={testingId === selectedAdapter.id}
                      className="px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,212,255,0.3)] disabled:opacity-50"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>{testingId === selectedAdapter.id ? 'Вычисление...' : 'Test Adapter'}</span>
                    </button>
                  </div>
                </div>

                {/* Live Test Result Output Terminal */}
                {testResult && (
                  <div className="mt-2 p-3 rounded-lg bg-slate-900/90 border border-emerald-500/40 text-emerald-300 text-[11px] space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                      <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Результат выполнения (Live Test Output):</span>
                    </div>
                    <p className="leading-relaxed select-all text-slate-200">{testResult}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right: Live System Architecture M00-M16 */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-amber-300 uppercase font-mono tracking-wider flex items-center gap-1.5">
              <Network className="w-4 h-4 text-amber-400" />
              <span>LIVE SYSTEM ARCHITECTURE (M01–M16)</span>
            </h3>

            <div className="space-y-1.5">
              {mLayers.map((layer) => (
                <div
                  key={layer.code}
                  className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 font-mono text-[10px] font-bold">
                      {layer.code}
                    </span>
                    <div className="truncate">
                      <div className="text-xs font-bold text-white truncate">{layer.name}</div>
                      <div className="text-[10px] text-slate-400 truncate">{layer.desc}</div>
                    </div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 ml-2" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-cyan-900/40 flex justify-between items-center text-xs">
          <span className="text-slate-400 font-mono">
            Zero-Trust Sandbox Mode Active · Shura Governance Enforced
          </span>
          <button
            onClick={() => setAdaptersModalOpen(false)}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-colors"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
