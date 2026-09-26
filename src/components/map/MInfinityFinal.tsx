import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Network,
  Info,
  CheckCircle2,
  ShieldCheck,
  RotateCcw,
  FileCheck,
  Compass,
  ArrowRight,
  BookOpen,
  Scale,
  Heart,
  Users,
  TrendingUp,
  Globe2,
  Search,
  ExternalLink,
  ChevronRight,
  Shield,
  Zap,
} from 'lucide-react';
import { MAP_REGISTRY_V12, MapRegistryItem, FLOW_STAGES } from '../../data/mapRegistry';
import { RemediationResults } from './RemediationResults';
import { InvariantsPanel } from './InvariantsPanel';
import { CORE_DOMAINS } from '../../data/mockData';
import { CoreDomain } from '../../types';
import { EvidenceBadge } from '../common/EvidenceBadge';

export const MInfinityFinal: React.FC = () => {
  const [selectedMapId, setSelectedMapId] = useState<string>('M00');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const selectedMap =
    MAP_REGISTRY_V12.find((m) => m.id === selectedMapId) || MAP_REGISTRY_V12[0];

  const filteredRegistry = MAP_REGISTRY_V12.filter((m) => {
    const matchesSearch =
      m.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.nativeTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.scope.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'ALL' || m.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Calculate coordinates for SVG nodes on a 500x500 canvas
  const centerX = 250;
  const centerY = 250;
  const orbitRadius = 185;

  const getStatusColor = (status: MapRegistryItem['status']) => {
    switch (status) {
      case 'Canonical':
        return '#00D4FF';
      case 'Clarified':
        return '#38BDF8';
      case 'Rewritten':
        return '#F59E0B';
      case 'Validated':
        return '#10B981';
      case 'Index Only':
        return '#EAB308';
      default:
        return '#94A3B8';
    }
  };

  return (
    <div id="page-minfinity-final" className="space-y-4 animate-fade-in text-slate-100 pb-8">
      {/* 1. Header Banner matching reference diagram */}
      <div className="rounded-2xl bg-gradient-to-r from-[#03132e] via-[#051a3d] to-[#020b1c] border border-cyan-500/50 p-4 shadow-[0_0_25px_rgba(0,212,255,0.2)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-cyan-800/40 pb-3">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono font-bold tracking-wider">
            <span className="text-cyan-300">MAP SEMANTIC REMEDIATION v1 COMPLETE</span>
            <span className="text-slate-500">•</span>
            <span className="text-emerald-400">CROSS-MAP CONSISTENCY PASS 100%</span>
            <span className="text-slate-500">•</span>
            <span className="text-amber-400">18/18 MAPS ALIGNED</span>
            <span className="text-slate-500">•</span>
            <span className="text-teal-300">READY AS VERIFIED INDEX</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono px-3 py-1 rounded-xl bg-cyan-950/80 border border-cyan-600/40 text-cyan-200">
            <span>REV:</span>
            <span className="font-bold text-amber-300">M∞-FINAL</span>
            <span className="text-slate-500">|</span>
            <span>REGISTRY:</span>
            <span className="font-bold text-white">v1.2</span>
          </div>
        </div>

        <div className="mt-3 flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <h1 className="text-lg md:text-xl font-extrabold text-white tracking-wide font-['Plus_Jakarta_Sans'] flex items-center gap-2">
              <span className="text-amber-400 font-serif">M-infinity</span>
              <span className="text-cyan-400">FINAL MAP</span>
              <span className="text-slate-400 font-normal text-sm md:text-base">— Pure Topology Index</span>
            </h1>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">
              LAYERS: 17 (M00–M16) • CONNECTIONS: 17 RADIAL LINKS TO CENTRAL M∞ TOPOLOGY • STYLE: MINIMAL BLUEPRINT • NO METRICS
            </p>
          </div>

          <div className="text-[10px] font-mono px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-300 text-right">
            <div>DOC-ID: <span className="text-cyan-300 font-bold">KM-OS-M∞-FINAL-001</span></div>
            <div>CLASS: <span className="text-amber-400 font-bold">TOPOLOGY REFERENCE ONLY</span></div>
          </div>
        </div>
      </div>

      {/* 2. Main 3-Column Grid: Left (Remediation & Invariants) | Center (Golden Icosahedron SVG) | Right (7 Cores & Registry) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
        {/* Left Column (Col 3.5): Remediation Results + System Invariants */}
        <div className="xl:col-span-4 space-y-4">
          <RemediationResults />
          <InvariantsPanel />
        </div>

        {/* Center Column (Col 5): Central Golden Icosahedron SVG Topology */}
        <div className="xl:col-span-5 space-y-4">
          <div className="rounded-2xl bg-gradient-to-b from-[#061126]/95 via-[#030917]/98 to-[#01040d] border border-cyan-800/50 p-4 shadow-2xl relative overflow-hidden flex flex-col items-center">
            {/* Top Bar of Topology Box */}
            <div className="w-full flex items-center justify-between border-b border-cyan-900/40 pb-2 mb-2 text-[10px] font-mono">
              <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                <Network className="w-3.5 h-3.5" />
                RADIAL TOPOLOGY SCHEMATIC (17 LINKS)
              </span>
              <span className="text-amber-300">CENTRAL SOT M∞</span>
            </div>

            {/* Outer Ring Flow Banner */}
            <div className="w-full py-1 px-2.5 rounded-lg bg-cyan-950/40 border border-cyan-800/30 text-[9px] font-mono text-cyan-300 mb-2 overflow-x-auto whitespace-nowrap text-center">
              <span className="text-slate-400">FLOW: </span>
              SOT → IDENTITY & TRUST → POLICY & GOVERNANCE → EXECUTION & RUNTIME → DATA & INTEGRATIONS → AI & INTELLIGENCE → OBSERVABILITY → SECURITY → ECONOMY → GLOBAL TOPOLOGY (M∞)
            </div>

            {/* Interactive SVG Diagram */}
            <div className="relative w-full max-w-[480px] aspect-square flex items-center justify-center select-none">
              <svg
                viewBox="0 0 500 500"
                className="w-full h-full filter drop-shadow-[0_0_20px_rgba(0,212,255,0.15)]"
              >
                <defs>
                  {/* Radial Gradients */}
                  <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
                    <stop offset="70%" stopColor="#00D4FF" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                  </radialGradient>

                  <linearGradient id="goldLattice" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FDE68A" />
                    <stop offset="50%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#B45309" />
                  </linearGradient>

                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Background Ambient Circles */}
                <circle cx={centerX} cy={centerY} r={orbitRadius + 28} fill="none" stroke="#0e244d" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx={centerX} cy={centerY} r={orbitRadius} fill="none" stroke="#164e63" strokeWidth="1.5" />
                <circle cx={centerX} cy={centerY} r={orbitRadius - 30} fill="none" stroke="#083344" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx={centerX} cy={centerY} r="85" fill="url(#centerGlow)" />

                {/* 17 Radial Links connecting Central Icosahedron to M00-M16 */}
                {MAP_REGISTRY_V12.filter((m) => m.id !== 'M∞').map((node) => {
                  const rad = ((node.angle - 90) * Math.PI) / 180;
                  const nx = centerX + orbitRadius * Math.cos(rad);
                  const ny = centerY + orbitRadius * Math.sin(rad);
                  const isSelected = selectedMapId === node.id;
                  const isHovered = hoveredNodeId === node.id;

                  return (
                    <g key={`link-${node.id}`}>
                      <line
                        x1={centerX}
                        y1={centerY}
                        x2={nx}
                        y2={ny}
                        stroke={isSelected || isHovered ? '#F59E0B' : '#0891B2'}
                        strokeWidth={isSelected || isHovered ? '2' : '1'}
                        strokeOpacity={isSelected || isHovered ? 0.9 : 0.4}
                        strokeDasharray={node.status === 'Clarified' ? '4 2' : undefined}
                      />
                      {/* Interactive hover target on link */}
                      <line
                        x1={centerX}
                        y1={centerY}
                        x2={nx}
                        y2={ny}
                        stroke="transparent"
                        strokeWidth="12"
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredNodeId(node.id)}
                        onMouseLeave={() => setHoveredNodeId(null)}
                        onClick={() => setSelectedMapId(node.id)}
                      />
                    </g>
                  );
                })}

                {/* Outer Ring Flow Arrow Arcs */}
                <path
                  d="M 250 35 A 215 215 0 1 1 249 35"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="1"
                  strokeOpacity="0.3"
                  strokeDasharray="6 6"
                />

                {/* Central Golden Icosahedron Geometry (M∞) */}
                <g
                  className="cursor-pointer transition-transform hover:scale-105"
                  onClick={() => setSelectedMapId('M∞')}
                >
                  {/* Outer Hexagon of Icosahedron */}
                  <polygon
                    points="250,195 295,220 295,280 250,305 205,280 205,220"
                    fill="#1e1b10"
                    stroke="url(#goldLattice)"
                    strokeWidth="2"
                    filter="url(#glow)"
                  />
                  {/* Inner Lattice Lines */}
                  <line x1="250" y1="195" x2="250" y2="305" stroke="#F59E0B" strokeWidth="1.2" strokeOpacity="0.8" />
                  <line x1="205" y1="220" x2="295" y2="280" stroke="#F59E0B" strokeWidth="1.2" strokeOpacity="0.8" />
                  <line x1="205" y1="280" x2="295" y2="220" stroke="#F59E0B" strokeWidth="1.2" strokeOpacity="0.8" />
                  <polygon
                    points="250,225 275,250 250,275 225,250"
                    fill="#3d2806"
                    fillOpacity="0.6"
                    stroke="#FDE68A"
                    strokeWidth="1.5"
                  />
                  {/* Central Hub Core Symbol */}
                  <circle cx={centerX} cy={centerY} r="18" fill="#0f0c05" stroke="#F59E0B" strokeWidth="2" />
                  <text
                    x={centerX}
                    y={centerY + 5}
                    textAnchor="middle"
                    fill="#FDE68A"
                    fontSize="14"
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    ∞
                  </text>
                  <text
                    x={centerX}
                    y={centerY + 34}
                    textAnchor="middle"
                    fill="#F59E0B"
                    fontSize="8"
                    fontWeight="bold"
                    fontFamily="monospace"
                    letterSpacing="1"
                  >
                    M∞ TOPOLOGY
                  </text>
                </g>

                {/* 17 Orbital Nodes (M00 to M16) */}
                {MAP_REGISTRY_V12.filter((m) => m.id !== 'M∞').map((node) => {
                  const rad = ((node.angle - 90) * Math.PI) / 180;
                  const nx = centerX + orbitRadius * Math.cos(rad);
                  const ny = centerY + orbitRadius * Math.sin(rad);
                  const isSelected = selectedMapId === node.id;
                  const isHovered = hoveredNodeId === node.id;
                  const nodeColor = getStatusColor(node.status);

                  return (
                    <g
                      key={node.id}
                      className="cursor-pointer transition-all duration-200"
                      onClick={() => setSelectedMapId(node.id)}
                      onMouseEnter={() => setHoveredNodeId(node.id)}
                      onMouseLeave={() => setHoveredNodeId(null)}
                    >
                      {/* Node Glow/Halo if selected */}
                      {(isSelected || isHovered) && (
                        <circle
                          cx={nx}
                          cy={ny}
                          r="16"
                          fill={nodeColor}
                          fillOpacity="0.3"
                          filter="url(#glow)"
                        />
                      )}

                      {/* Main Node Circle */}
                      <circle
                        cx={nx}
                        cy={ny}
                        r={isSelected ? '11' : '8.5'}
                        fill="#030816"
                        stroke={nodeColor}
                        strokeWidth={isSelected ? '2.5' : '1.5'}
                        strokeDasharray={node.status === 'Clarified' ? '3 1' : undefined}
                      />

                      {/* Internal Status Dot */}
                      <circle
                        cx={nx}
                        cy={ny}
                        r={isSelected ? '4' : '2.5'}
                        fill={nodeColor}
                      />

                      {/* Node Code Label */}
                      <text
                        x={nx}
                        y={ny > centerY ? ny + 17 : ny - 12}
                        textAnchor="middle"
                        fill={isSelected ? '#FFFFFF' : '#94A3B8'}
                        fontSize={isSelected ? '10' : '8.5'}
                        fontWeight="bold"
                        fontFamily="monospace"
                      >
                        {node.id}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Hover / Quick Tooltip overlay */}
              {hoveredNodeId && (
                <div className="absolute top-2 right-2 p-2 rounded-lg bg-slate-950/95 border border-amber-500/60 text-[10px] font-mono shadow-xl z-20 pointer-events-none">
                  <div className="text-amber-300 font-bold">{hoveredNodeId}</div>
                  <div className="text-white">
                    {MAP_REGISTRY_V12.find((m) => m.id === hoveredNodeId)?.title}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Legend Bar within Topology Area */}
            <div className="w-full mt-2 pt-2 border-t border-cyan-900/40 flex flex-wrap items-center justify-center gap-3 text-[10px] font-mono text-slate-400">
              <span className="text-white font-bold">LEGEND:</span>
              <span className="flex items-center gap-1 text-cyan-300">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                Canonical
              </span>
              <span className="flex items-center gap-1 text-sky-300">
                <span className="w-2.5 h-2.5 rounded-full border border-dashed border-sky-400" />
                Clarified
              </span>
              <span className="flex items-center gap-1 text-amber-400">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                Rewritten
              </span>
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                Validated
              </span>
              <span className="flex items-center gap-1 text-yellow-300">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                Index Only
              </span>
            </div>
          </div>

          {/* Selected Layer In-Depth Inspection Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-b from-[#071328]/95 to-[#030816]/98 border border-cyan-700/50 space-y-2.5 shadow-xl">
            <div className="flex items-center justify-between border-b border-cyan-900/40 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold font-mono px-2.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  {selectedMap.id}
                </span>
                <div>
                  <h3 className="text-xs font-bold text-white">{selectedMap.title}</h3>
                  <div className="text-[10px] text-slate-400 font-mono">{selectedMap.nativeTitle}</div>
                </div>
              </div>

              <div className="text-[10px] font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-amber-300 font-bold">
                {selectedMap.statusLabel}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-cyan-400 font-bold block">
                  ОБЛАСТЬ (SCOPE):
                </span>
                <p className="text-[11px] text-slate-300 leading-relaxed">{selectedMap.scope}</p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-rose-400 font-bold block">
                  ГРАНИЦА (BOUNDARY):
                </span>
                <p className="text-[11px] text-slate-300 leading-relaxed">{selectedMap.boundary}</p>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-cyan-950 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">Требуемые доказательства:</span>
                <span className="text-emerald-400 font-bold">{selectedMap.evidenceRequired}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">Категория потока:</span>
                <span className="text-cyan-300 font-bold">{selectedMap.flowCategory}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Col 3.5): 7 Core Domains & Map Registry Inspector */}
        <div className="xl:col-span-3 space-y-4">
          {/* 7 Core Domains Card matching image */}
          <div className="rounded-2xl bg-gradient-to-b from-[#071328]/95 to-[#030816]/98 border border-cyan-800/40 p-4 shadow-xl space-y-3">
            <div className="border-b border-cyan-900/40 pb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  <Zap className="w-3.5 h-3.5" />
                </span>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  7 Core Domains
                </h3>
              </div>
              <span className="text-[10px] font-mono text-purple-300 px-2 py-0.5 rounded bg-purple-950/60 border border-purple-500/40">
                ACTIVE 7/7
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {CORE_DOMAINS.map((dom: CoreDomain) => (
                <div
                  key={dom.id}
                  className="p-2 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold font-mono text-white truncate">
                      {dom.name}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_5px_#10B981]" />
                  </div>
                  <div className="text-[9px] font-mono text-slate-400 truncate">{dom.tagline}</div>
                </div>
              ))}
            </div>

            <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-[9px] font-mono text-slate-400 text-center">
              DOMAIN STATUS: <span className="text-emerald-400 font-bold">7/7 ACTIVE</span> | CLASS:{' '}
              <span className="text-cyan-300 font-bold">CORE OPERATIONAL</span>
            </div>
          </div>

          {/* Map Registry v1.2 Quick List */}
          <div className="rounded-2xl bg-gradient-to-b from-[#071328]/95 to-[#030816]/98 border border-cyan-800/40 p-4 shadow-xl space-y-3">
            <div className="border-b border-cyan-900/40 pb-2 flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                Map Registry v1.2
              </h3>
              <span className="text-[10px] font-mono text-cyan-400">18 Maps</span>
            </div>

            {/* Search Filter */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск слоя M00-M16..."
                className="w-full pl-7 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-white placeholder-slate-500 font-mono focus:outline-none focus:border-cyan-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2 top-2.5" />
            </div>

            {/* Scrollable list of 18 maps */}
            <div className="space-y-1.5 max-h-[360px] overflow-y-auto pr-1 custom-scrollbar">
              {filteredRegistry.map((mapItem) => {
                const isSelected = selectedMapId === mapItem.id;
                return (
                  <button
                    key={mapItem.id}
                    onClick={() => setSelectedMapId(mapItem.id)}
                    className={`w-full p-2 rounded-xl text-left transition-all flex items-center justify-between border ${
                      isSelected
                        ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-[0_0_10px_rgba(0,212,255,0.2)]'
                        : 'bg-slate-950/50 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-900/50'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-xs font-bold font-mono text-amber-400 shrink-0">
                        {mapItem.id}
                      </span>
                      <div className="truncate">
                        <div className="text-[11px] font-semibold truncate">{mapItem.title}</div>
                        <div className="text-[9px] text-slate-400 truncate">{mapItem.nativeTitle}</div>
                      </div>
                    </div>

                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded border shrink-0 ${
                        mapItem.status === 'Canonical'
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                          : mapItem.status === 'Validated'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : mapItem.status === 'Rewritten'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      {mapItem.status}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Block: Evidence Ladder + Goals of Humanity + Confidence Metrics + 786 Key Seal */}
      <div className="rounded-2xl bg-gradient-to-b from-[#061229]/95 via-[#030817]/98 to-[#020510] border border-cyan-800/40 p-5 shadow-2xl space-y-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          {/* Evidence Ladder (Col 6) */}
          <div className="lg:col-span-6 space-y-2">
            <div className="flex items-center justify-between border-b border-cyan-900/40 pb-1.5">
              <span className="text-xs font-bold font-mono uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                <EvidenceBadge level={5} compact />
                EVIDENCE LADDER • ЛЕСТНИЦА ДОКАЗАТЕЛЬСТВ
              </span>
              <span className="text-[10px] font-mono text-emerald-400">FULLY TRACEABLE</span>
            </div>

            <div className="grid grid-cols-5 gap-1.5 text-center font-mono">
              <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-center">
                <span className="text-[10px] text-cyan-400 font-bold">DECLARED</span>
                <span className="text-[8px] text-slate-400 mt-0.5">Заявлено</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-center">
                <span className="text-[10px] text-sky-400 font-bold">OBSERVED</span>
                <span className="text-[8px] text-slate-400 mt-0.5">Наблюдаемо</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-center">
                <span className="text-[10px] text-teal-400 font-bold">VERIFIED</span>
                <span className="text-[8px] text-slate-400 mt-0.5">Проверено</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-center">
                <span className="text-[10px] text-emerald-400 font-bold">REPRODUCED</span>
                <span className="text-[8px] text-slate-400 mt-0.5">Воспроизведено</span>
              </div>
              <div className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.2)] flex flex-col justify-center">
                <span className="text-[10px] text-amber-300 font-bold">PROVEN</span>
                <span className="text-[8px] text-emerald-200 mt-0.5">Доказано</span>
              </div>
            </div>

            <div className="text-[9px] font-mono text-slate-400 flex items-center justify-between px-1">
              <span>EVIDENCE STATUS: FULLY TRACEABLE</span>
              <span className="text-cyan-300">AUDIT: COMPLETE</span>
            </div>
          </div>

          {/* Goals of Humanity (Col 6) */}
          <div className="lg:col-span-6 space-y-2">
            <div className="flex items-center justify-between border-b border-cyan-900/40 pb-1.5">
              <span className="text-xs font-bold font-mono uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-amber-400" />
                GOALS OF HUMANITY • ЦЕЛИ ЧЕЛОВЕЧЕСТВА
              </span>
              <span className="text-[10px] font-mono text-cyan-300">GOAL VECTOR: ALIGNED</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 text-center font-mono">
              <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col items-center">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400 mb-1" />
                <span className="text-[10px] text-white font-bold">Knowledge</span>
                <span className="text-[8px] text-slate-400">Знание</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col items-center">
                <Scale className="w-3.5 h-3.5 text-amber-400 mb-1" />
                <span className="text-[10px] text-white font-bold">Justice</span>
                <span className="text-[8px] text-slate-400">Справедливость</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col items-center">
                <Heart className="w-3.5 h-3.5 text-rose-400 mb-1" />
                <span className="text-[10px] text-white font-bold">Mercy</span>
                <span className="text-[8px] text-slate-400">Милосердие</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col items-center">
                <Users className="w-3.5 h-3.5 text-blue-400 mb-1" />
                <span className="text-[10px] text-white font-bold">Unity</span>
                <span className="text-[8px] text-slate-400">Единство</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col items-center">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400 mb-1" />
                <span className="text-[10px] text-white font-bold">Prosperity</span>
                <span className="text-[8px] text-slate-400">Процветание</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col items-center">
                <Globe2 className="w-3.5 h-3.5 text-teal-400 mb-1" />
                <span className="text-[10px] text-white font-bold">Harmony</span>
                <span className="text-[8px] text-slate-400">Гармония</span>
              </div>
            </div>

            <div className="text-[9px] font-mono text-amber-400 text-center">
              ONE HUMANITY • MANY POSSIBILITIES • ОДНО ЧЕЛОВЕЧЕСТВО • МНОЖЕСТВО ВОЗМОЖНОСТЕЙ
            </div>
          </div>
        </div>

        {/* 4. Confidence Metrics Bar & 786 Key Seal */}
        <div className="pt-3 border-t border-cyan-900/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-xs font-mono font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              CONFIDENCE METRICS (PASS 100%):
            </div>
            <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-slate-300">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                100% Structural Consistency
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                100% Terminology Alignment
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                100% Boundary Clarity
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                18/18 Maps Covered
              </span>
            </div>
          </div>

          {/* 786 Key Seal Hexagon Badge */}
          <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-gradient-to-r from-amber-950/60 to-yellow-950/40 border border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center font-bold text-amber-300 font-mono text-sm shadow-inner">
              786
            </div>
            <div className="font-mono text-left">
              <div className="text-xs font-bold text-amber-300 tracking-wider">786 • KEY SEAL</div>
              <div className="text-[9px] text-amber-400/80">CANONICAL TOPOLOGY APPROVED</div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Philosophical Footer Signature as mandated in user prompt */}
      <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-1.5">
        <p className="text-xs text-slate-300 font-serif italic leading-relaxed">
          «Maps are not the territory. M∞ shows the way, but the truth is proven in reality.»
        </p>
        <p className="text-[11px] text-amber-400/90 font-serif italic">
          «A system is not complete when it has no more to add, but when it has nothing left to mislead.»
        </p>
      </div>
    </div>
  );
};
