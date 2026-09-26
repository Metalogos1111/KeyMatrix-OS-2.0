import React from 'react';
import { EvidenceLevel } from '../../types';

export type LegacyOrNumericLevel = EvidenceLevel | number | string | null | undefined;

interface EvidenceBadgeProps {
  level: LegacyOrNumericLevel;
  compact?: boolean;
  onClick?: () => void;
}

export function normalizeEvidenceLevel(raw: LegacyOrNumericLevel): EvidenceLevel {
  if (raw === null || raw === undefined) return null;
  if (typeof raw === 'string') {
    const upper = raw.trim().toUpperCase();
    if (upper === 'DECLARED' || upper === '1' || upper === 'L1') return 'DECLARED';
    if (upper === 'DOCUMENTED' || upper === '2' || upper === 'L2') return 'DOCUMENTED';
    if (upper === 'IMPLEMENTED' || upper === '3' || upper === 'L3') return 'IMPLEMENTED';
    if (upper === 'RUNNING' || upper === '4' || upper === 'L4') return 'RUNNING';
    if (upper === 'OBSERVED' || upper === '5' || upper === 'L5') return 'OBSERVED';
    if (upper === 'VERIFIED' || upper === '6' || upper === 'L6') return 'VERIFIED';
    if (upper === 'REPRODUCED' || upper === '7' || upper === 'L7') return 'REPRODUCED';
    if (upper === 'PROVEN' || upper === '8' || upper === 'L8') return 'PROVEN';
    // Reject non-canonical HOLD / NULL / SANDBOX strings as evidence levels
    return null;
  }
  if (typeof raw === 'number') {
    switch (raw) {
      case 1: return 'DECLARED';
      case 2: return 'DOCUMENTED';
      case 3: return 'IMPLEMENTED';
      case 4: return 'RUNNING';
      case 5: return 'OBSERVED';
      case 6: return 'VERIFIED';
      case 7: return 'REPRODUCED';
      case 8: return 'PROVEN';
      default: return null;
    }
  }
  return null;
}

export const EvidenceBadge: React.FC<EvidenceBadgeProps> = ({ level, compact = false, onClick }) => {
  const normLevel = normalizeEvidenceLevel(level);

  const getBadgeConfig = () => {
    switch (normLevel) {
      case 'PROVEN':
        return {
          label: '8 PROVEN',
          color: 'text-emerald-300 border-emerald-500/40 bg-emerald-950/50',
          dot: 'bg-emerald-400 shadow-[0_0_8px_#10B981]',
          short: 'L8',
        };
      case 'REPRODUCED':
        return {
          label: '7 REPRODUCED',
          color: 'text-cyan-300 border-cyan-500/40 bg-cyan-950/50',
          dot: 'bg-cyan-400 shadow-[0_0_8px_#06B6D4]',
          short: 'L7',
        };
      case 'VERIFIED':
        return {
          label: '6 VERIFIED',
          color: 'text-blue-300 border-blue-500/40 bg-blue-950/50',
          dot: 'bg-blue-400 shadow-[0_0_8px_#3B82F6]',
          short: 'L6',
        };
      case 'OBSERVED':
        return {
          label: '5 OBSERVED',
          color: 'text-amber-300 border-amber-500/40 bg-amber-950/50',
          dot: 'bg-amber-400 shadow-[0_0_8px_#F59E0B]',
          short: 'L5',
        };
      case 'RUNNING':
        return {
          label: '4 RUNNING',
          color: 'text-teal-300 border-teal-500/40 bg-teal-950/50',
          dot: 'bg-teal-400 shadow-[0_0_8px_#14B8A6]',
          short: 'L4',
        };
      case 'IMPLEMENTED':
        return {
          label: '3 IMPLEMENTED',
          color: 'text-indigo-300 border-indigo-500/40 bg-indigo-950/50',
          dot: 'bg-indigo-400 shadow-[0_0_8px_#6366F1]',
          short: 'L3',
        };
      case 'DOCUMENTED':
        return {
          label: '2 DOCUMENTED',
          color: 'text-slate-300 border-slate-500/40 bg-slate-900/60',
          dot: 'bg-slate-400 shadow-[0_0_6px_#94A3B8]',
          short: 'L2',
        };
      case 'DECLARED':
        return {
          label: '1 DECLARED',
          color: 'text-zinc-400 border-zinc-700 bg-zinc-900/60',
          dot: 'bg-zinc-500',
          short: 'L1',
        };
      case null:
      default:
        return {
          label: 'UNAVAILABLE',
          color: 'text-slate-500 border-slate-800 bg-slate-950/80',
          dot: 'bg-slate-600',
          short: 'N/A',
        };
    }
  };

  const config = getBadgeConfig();

  const badgeContent = (
    <>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      <span>{compact ? config.short : config.label}</span>
    </>
  );

  const className = `inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wider uppercase rounded-full border px-2 py-0.5 transition-all ${
    onClick ? 'cursor-pointer hover:scale-105' : 'cursor-default'
  } ${config.color}`;

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={className}
        title={`Evidence Level: ${config.label}`}
      >
        {badgeContent}
      </button>
    );
  }

  return (
    <span
      className={className}
      title={`Evidence Level: ${config.label}`}
    >
      {badgeContent}
    </span>
  );
};
