import React from 'react';

/**
 * PassportShell - Zero-Data Visual Scaffolding
 *
 * PURE STRUCTURAL CONTAINER (Stage 1 Skeleton):
 * - Does NOT assert fake DID, Role or Authority data.
 * - Does NOT render untrusted runtime balance.
 * - Provides responsive grid tokens, provenance strip slot, and skeleton shimmers.
 * - Data slots remain inactive until KM-UX-GATE-001 opens (Identity Runtime Birth >= 4/5).
 */
export interface PassportShellProps {
  className?: string;
  isUnlocked?: boolean;
  children?: React.ReactNode;
}

export const PassportShell: React.FC<PassportShellProps> = ({
  className = '',
  isUnlocked = false,
  children,
}) => {
  return (
    <section
      role="region"
      aria-label="Sovereign Identity Passport Shell"
      aria-busy={!isUnlocked}
      data-testid="passport-shell-container"
      className={`relative rounded-2xl border border-white/10 bg-[#070e1c]/80 backdrop-blur-xl p-6 overflow-hidden shadow-2xl focus-within:ring-2 focus-within:ring-cyan-500/50 transition-all ${className}`}
    >
      {/* Top Gradient Accent Strip */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-500 opacity-80 pointer-events-none" />

      {/* Header Slot / State Indicator */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 motion-safe:animate-pulse motion-reduce:animate-none" />
          <h2 className="font-mono text-xs uppercase tracking-widest text-zinc-300 font-semibold">
            KeyMatrix Sovereign Passport
          </h2>
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/10 bg-white/5 font-mono text-[10px] text-zinc-400">
          <span>STATUS:</span>
          <span className={isUnlocked ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
            {isUnlocked ? 'LOCKED_BY_GATE' : 'SKELETON_ONLY'}
          </span>
        </div>
      </div>

      {/* Main Body */}
      {isUnlocked && children ? (
        <div className="space-y-4">{children}</div>
      ) : (
        /* Pure Skeleton Shimmer View - No unproven data */
        <div className="space-y-4 motion-safe:animate-pulse motion-reduce:animate-none" data-testid="passport-skeleton-view">
          {/* Identity & DID Row Placeholder */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-white/10 shrink-0 border border-white/5" />
            <div className="space-y-2 flex-1">
              <div className="h-4 w-40 bg-white/10 rounded" />
              <div className="h-3 w-56 bg-white/5 rounded" />
            </div>
          </div>

          {/* Role Claim & Capability Slots Placeholder */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="h-16 rounded-xl border border-white/5 bg-white/[0.02] p-3 space-y-1.5">
              <div className="h-2.5 w-16 bg-white/10 rounded" />
              <div className="h-4 w-24 bg-white/5 rounded" />
            </div>
            <div className="h-16 rounded-xl border border-white/5 bg-white/[0.02] p-3 space-y-1.5">
              <div className="h-2.5 w-20 bg-white/10 rounded" />
              <div className="h-4 w-28 bg-white/5 rounded" />
            </div>
          </div>

          {/* Provenance Strip Slot Placeholder */}
          <div className="mt-4 rounded-xl border border-dashed border-white/15 bg-black/30 p-3 flex items-center justify-between">
            <div className="space-y-1">
              <div className="h-2 w-28 bg-cyan-500/20 rounded" />
              <div className="h-3 w-48 bg-white/5 rounded" />
            </div>
            <div className="h-5 w-20 bg-white/10 rounded-full" />
          </div>

          {/* Footer Notice */}
          <div className="pt-2 flex justify-between items-center text-[10px] font-mono text-zinc-500">
            <span>Awaiting Identity Runtime Birth &ge; 4/5</span>
            <span>KM-UX-GATE-001</span>
          </div>
        </div>
      )}
    </section>
  );
};
