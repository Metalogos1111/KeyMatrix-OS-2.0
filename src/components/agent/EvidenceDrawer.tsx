import React from 'react';
import { useAgentStore } from '../../store/agentStore';
import { X, ExternalLink, ShieldCheck, Database, FileCheck, Layers } from 'lucide-react';
import { EvidenceBadge } from '../common/EvidenceBadge';

export const EvidenceDrawer: React.FC = () => {
  const { evidenceRecords, isEvidenceDrawerOpen, selectedEvidenceId, toggleEvidenceDrawer } = useAgentStore();

  if (!isEvidenceDrawerOpen) return null;

  const selectedRecord = evidenceRecords.find((r) => r.id === selectedEvidenceId) || evidenceRecords[0];

  return (
    <div
      role="dialog"
      aria-label="Evidence Drawer"
      className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-[#070f22] border-l border-cyan-500/40 shadow-2xl p-6 flex flex-col justify-between animate-fade-in text-white"
    >
      <div className="space-y-6 overflow-y-auto pr-1 custom-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cyan-900/40 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">EVIDENCE & PROVENANCE VAULT</h2>
              <span className="text-xs text-slate-400">Archivarius Merkle Ledger Proof Chain</span>
            </div>
          </div>

          <button
            onClick={() => toggleEvidenceDrawer()}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close Evidence Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Record Selection Tabs if multiple */}
        {evidenceRecords.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
            {evidenceRecords.map((rec) => (
              <button
                key={rec.id}
                onClick={() => toggleEvidenceDrawer(rec.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono shrink-0 border transition-all ${
                  rec.id === selectedRecord?.id
                    ? 'bg-cyan-500 text-black font-bold border-cyan-400'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                {rec.id.slice(0, 12)}...
              </button>
            ))}
          </div>
        )}

        {/* Selected Record Detail */}
        {selectedRecord && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-cyan-950">
              <span className="text-xs font-mono text-slate-400">Уровень лестницы доказательств:</span>
              <EvidenceBadge level={selectedRecord.level} />
            </div>

            {/* Canonical 8-Level Backbone Visual Progress */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-900/30 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-mono text-cyan-400 font-semibold uppercase">Каноническая Лестница (8 Уровней):</span>
                <span className="text-[10px] font-mono text-slate-500">ADR-002 Backbone</span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-1 pt-1 text-[9px] font-mono text-center">
                {[
                  { name: 'DECLARED', label: '1.Decl' },
                  { name: 'DOCUMENTED', label: '2.Doc' },
                  { name: 'IMPLEMENTED', label: '3.Impl' },
                  { name: 'RUNNING', label: '4.Run' },
                  { name: 'OBSERVED', label: '5.Obs' },
                  { name: 'VERIFIED', label: '6.Ver' },
                  { name: 'REPRODUCED', label: '7.Repr' },
                  { name: 'PROVEN', label: '8.Prov' },
                ].map((st, i) => {
                  const ladderOrder = ['DECLARED', 'DOCUMENTED', 'IMPLEMENTED', 'RUNNING', 'OBSERVED', 'VERIFIED', 'REPRODUCED', 'PROVEN'];
                  const currentIdx = selectedRecord.level ? ladderOrder.indexOf(selectedRecord.level) : -1;
                  const isActive = currentIdx >= 0 && i <= currentIdx;

                  return (
                    <div
                      key={st.name}
                      className={`py-1 px-0.5 rounded border ${
                        isActive
                          ? 'bg-cyan-950/70 border-cyan-500/50 text-cyan-300 font-bold'
                          : 'bg-black/30 border-slate-900 text-slate-600'
                      }`}
                    >
                      {st.label}
                    </div>
                  );
                })}
              </div>
              <div className="text-[10px] text-amber-300/80 pt-1 flex items-center justify-between font-mono">
                <span>Инвариант: Simulation != Production Proof</span>
                <span className="text-slate-500">ADR-011 Gate</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-cyan-900/30 space-y-3 text-xs">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 block uppercase font-semibold">
                  Идентификатор записи (Evidence ID):
                </span>
                <span className="font-mono text-slate-200 break-all">{selectedRecord.id}</span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-cyan-400 block uppercase font-semibold">
                  Источник (Source Core / Mesh):
                </span>
                <span className="text-slate-200">{selectedRecord.source}</span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-cyan-400 block uppercase font-semibold">
                  Артефакт доказательства:
                </span>
                <span className="font-mono text-slate-300 break-all bg-black/40 p-2 rounded block mt-1 border border-cyan-950">
                  {selectedRecord.artifact}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-cyan-400 block uppercase font-semibold">
                  Провенанс / Цепочка происхождения:
                </span>
                <span className="text-slate-300">{selectedRecord.provenance}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-cyan-900/30 text-[11px]">
                <div>
                  <span className="text-slate-500 block">Статус верификации:</span>
                  <span className="font-mono text-emerald-400 font-bold">{selectedRecord.verificationStatus}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Воспроизводимость:</span>
                  <span className="font-mono text-amber-400 font-bold">{selectedRecord.reproductionStatus}</span>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="p-3.5 rounded-xl bg-blue-950/20 border border-cyan-900/40">
              <span className="text-xs font-semibold text-white block mb-1">Сводка доказательства:</span>
              <p className="text-xs text-slate-300 leading-relaxed">{selectedRecord.summary}</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Notice */}
      <div className="pt-4 border-t border-cyan-900/40 text-[11px] text-slate-400 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Хэши доказательств валидируются Archivarius в соответствии со стандартами RFC-KM-05.</span>
        </div>
        <div className="text-[10px] text-amber-300/80 font-mono">
          Статус: SIMULATION ONLY. Уровень PROVEN требует внешнего аттестатора и кворума Шуры (ADR-011).
        </div>
      </div>
    </div>
  );
};
