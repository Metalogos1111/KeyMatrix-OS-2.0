import React, { useState } from 'react';
import { Search, ShieldAlert, CheckCircle, Database, Filter, Info, AlertTriangle } from 'lucide-react';
import {
  GROUND_TRUTH_GAP_MATRIX_ROWS,
  GROUND_TRUTH_CORE_STATES,
  GROUND_TRUTH_EVIDENCE_BOUNDARY,
} from '../../data/groundTruth';

export const GapMatrix: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  const filteredRows = GROUND_TRUTH_GAP_MATRIX_ROWS.filter((row) => {
    const matchesSearch =
      row.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'ALL' || row.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Evidence Boundary Top Alert */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-cyan-800/50 shadow-xl space-y-2 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-cyan-900/50 pb-2">
          <div className="flex items-center gap-2 text-cyan-400 font-bold">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>KeyMatrix OS v2.1 Evidence Boundary Declaration</span>
          </div>
          <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px]">
            AUDITED: {GROUND_TRUTH_EVIDENCE_BOUNDARY.lastAuditedDate}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-[11px] pt-1">
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-400 block text-[10px]">M03 Authority Status:</span>
            <span className="text-amber-300 font-bold">Local Observed Surface (Not Institutional Production)</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-400 block text-[10px]">Seven Core State:</span>
            <span className="text-emerald-400 font-bold">PrimeCore Local Observed / 6 Core Design-Level</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-400 block text-[10px]">NUR Ledger Status:</span>
            <span className="text-cyan-300 font-bold">Target Execution Sandbox (Not Live Money)</span>
          </div>
        </div>
      </div>

      {/* Seven Core Surface Status Grid */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-2">
          <Database className="w-4 h-4 text-cyan-400" />
          Seven Core Execution Surface States
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {GROUND_TRUTH_CORE_STATES.map((core) => (
            <div
              key={core.id}
              className={`p-3.5 rounded-2xl border ${
                core.status === 'LOCAL_OBSERVED'
                  ? 'bg-gradient-to-b from-emerald-950/40 to-slate-950/90 border-emerald-500/40'
                  : 'bg-gradient-to-b from-slate-900/60 to-slate-950/90 border-slate-800'
              } space-y-2`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-cyan-300">{core.code} • {core.name}</span>
                <span
                  className={`text-[9px] px-2 py-0.5 rounded font-mono font-bold ${
                    core.status === 'LOCAL_OBSERVED'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {core.status}
                </span>
              </div>
              <p className="text-xs text-slate-400">{core.description}</p>
              <div className="flex items-center justify-between text-[10px] font-mono pt-1 text-slate-500 border-t border-slate-800/60">
                <span>Deterministic Surface:</span>
                <span className={core.deterministicSurfaceAvailable ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                  {core.deterministicSurfaceAvailable ? 'YES (LOCAL)' : 'DESIGN ONLY'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 18 M-Plane Gap Matrix Table */}
      <div className="p-4 rounded-2xl bg-gradient-to-b from-[#09152e]/80 to-[#040816]/90 border border-cyan-900/40 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyan-900/40 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              KeyMatrix 18 M-Plane Gap Matrix (M00 - M∞)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              18 Plane rows x 7 cross-domain dimensions gap classification
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search plane or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase">
                <th className="py-2.5 px-3">Plane Code</th>
                <th className="py-2.5 px-3">Plane Name</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Implementation Status</th>
                <th className="py-2.5 px-3">Evidence Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-[11px]">
              {filteredRows.map((row) => (
                <tr key={row.code} className="hover:bg-cyan-950/20 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-cyan-300">{row.code}</td>
                  <td className="py-2.5 px-3 text-slate-200">{row.name}</td>
                  <td className="py-2.5 px-3 text-slate-400">{row.category}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        row.status === 'LOCAL_OBSERVED'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-400">{row.evidenceLevel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
