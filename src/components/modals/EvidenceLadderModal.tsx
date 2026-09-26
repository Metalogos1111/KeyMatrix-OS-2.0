import React, { useState } from 'react';
import { useOSStore } from '../../store/osStore';
import {
  X,
  Layers,
  ShieldCheck,
  Award,
  Clock,
  Sparkles,
  Cpu,
  Key,
  Database,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';

export const EvidenceLadderModal: React.FC = () => {
  const { isEvidenceModalOpen, setEvidenceModalOpen } = useOSStore();
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  if (!isEvidenceModalOpen) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(text);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const canonicalLadder = [
    {
      level: 8,
      code: 'PROVEN',
      color: 'border-emerald-500 bg-emerald-950/40 text-emerald-300',
      dot: 'bg-emerald-400 shadow-[0_0_8px_#10B981]',
      title: '8 PROVEN',
      desc: 'Строго доказано независимыми источниками, внешним консенсусом доказательств и математической валидацией (Sha256 hash locked).',
    },
    {
      level: 7,
      code: 'REPRODUCED',
      color: 'border-cyan-500 bg-cyan-950/40 text-cyan-300',
      dot: 'bg-cyan-400 shadow-[0_0_8px_#06B6D4]',
      title: '7 REPRODUCED',
      desc: 'Воспроизведено множественными независимыми прогонами в изолированных TEE средах.',
    },
    {
      level: 6,
      code: 'VERIFIED',
      color: 'border-blue-500 bg-blue-950/40 text-blue-300',
      dot: 'bg-blue-400 shadow-[0_0_8px_#3B82F6]',
      title: '6 VERIFIED',
      desc: 'Технически верифицировано внутренними автоматическими тестами и статическим анализатором.',
    },
    {
      level: 5,
      code: 'OBSERVED',
      color: 'border-amber-500 bg-amber-950/40 text-amber-300',
      dot: 'bg-amber-400 shadow-[0_0_8px_#F59E0B]',
      title: '5 OBSERVED',
      desc: 'Эмпирически наблюдаемо в пользовательской среде без формального криптографического доказательства.',
    },
    {
      level: 4,
      code: 'RUNNING',
      color: 'border-teal-500 bg-teal-950/40 text-teal-300',
      dot: 'bg-teal-400 shadow-[0_0_8px_#14B8A6]',
      title: '4 RUNNING',
      desc: 'Исполняется в активной рантайм-среде, регистрируя поток телеметрии и событийные логи.',
    },
    {
      level: 3,
      code: 'IMPLEMENTED',
      color: 'border-indigo-500 bg-indigo-950/40 text-indigo-300',
      dot: 'bg-indigo-400 shadow-[0_0_8px_#6366F1]',
      title: '3 IMPLEMENTED',
      desc: 'Синтезировано и внедрено в кодовую базу или изолированную песочницу (MetaForge Sandbox).',
    },
    {
      level: 2,
      code: 'DOCUMENTED',
      color: 'border-slate-500 bg-slate-900/60 text-slate-300',
      dot: 'bg-slate-400 shadow-[0_0_6px_#94A3B8]',
      title: '2 DOCUMENTED',
      desc: 'Специфицировано в архитектурных манифестах, интерфейсных контрактах или документации.',
    },
    {
      level: 1,
      code: 'DECLARED',
      color: 'border-zinc-700 bg-zinc-900/60 text-zinc-400',
      dot: 'bg-zinc-500',
      title: '1 DECLARED',
      desc: 'Первичное намерение или гипотеза (заявлено системой или пользователем, доказательств пока нет).',
    },
  ];

  const orthogonalConcepts = [
    {
      title: 'Core Status: HOLD / PENDING',
      icon: Clock,
      color: 'border-amber-500/60 bg-amber-950/30 text-amber-300',
      desc: 'Операционный статус процесса валидации. Не является уровнем доказательства (evidenceLevel = null / pending).',
    },
    {
      title: 'Execution Mode: SANDBOX',
      icon: Sparkles,
      color: 'border-purple-500/60 bg-purple-950/30 text-purple-300',
      desc: 'Изолированный режим выполнения (LOCAL_SANDBOX_SIMULATED / Non-Settlement). Не заменяет канонический уровень доказательства.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-3xl max-h-[90vh] bg-[#070f23] border border-cyan-700/60 rounded-3xl p-6 shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cyan-900/50 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-wide">
                CANONICAL EVIDENCE LADDER (8 УРОВНЕЙ)
              </h2>
              <p className="text-xs text-cyan-300/80 font-mono">
                KeyMatrix OS v2.1 RFC-KM-05 — Human Intent to Empirical Proof
              </p>
            </div>
          </div>
          <button
            onClick={() => setEvidenceModalOpen(false)}
            className="p-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto space-y-4 pr-1 custom-scrollbar text-sm">
          {/* Main 8 Levels */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
              Каноническая шкала доказательности (Canonical Ladder):
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {canonicalLadder.map((l) => (
                <div
                  key={l.code}
                  className={`p-3 rounded-2xl border ${l.color} flex items-start gap-2.5 transition-all hover:scale-[1.01]`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${l.dot} shrink-0 mt-1`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs font-mono">{l.title}</span>
                      <span className="text-[10px] font-mono text-slate-400">RFC-05</span>
                    </div>
                    <p className="text-[11px] text-slate-300/90 mt-1 leading-snug">{l.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Orthogonal Semantics */}
          <div className="space-y-2 pt-2 border-t border-cyan-950">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
              Ортогональные концепции (Разделение сущностей):
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {orthogonalConcepts.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border ${s.color} flex items-start gap-2.5`}
                  >
                    <Icon className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-xs font-mono">{s.title}</span>
                      <p className="text-[11px] text-slate-300/80 mt-0.5 leading-snug">{s.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Proof Signature Anchor */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-cyan-950/30 to-blue-950/40 border border-emerald-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300 font-mono">
                <ShieldCheck className="w-4 h-4" />
                <span>SHA-256 Merkle Proof Anchor</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-900/60 text-emerald-200 border border-emerald-500/40 font-mono">
                8 PROVEN
              </span>
            </div>
            <div className="flex items-center justify-between bg-black/60 p-2 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300">
              <code className="text-emerald-400 break-all select-all">
                pos_f7Bu94kLa82NmQp19xZ4w0vErTyU7q9c3A5dF6gH8jK0
              </code>
              <button
                onClick={() => handleCopy('pos_f7Bu94kLa82NmQp19xZ4w0vErTyU7q9c3A5dF6gH8jK0')}
                className="ml-2 p-1 text-slate-400 hover:text-white rounded"
                title="Копировать хэш"
              >
                {copiedHash === 'pos_f7Bu94kLa82NmQp19xZ4w0vErTyU7q9c3A5dF6gH8jK0' ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-cyan-900/40 flex items-center justify-between text-xs text-slate-400">
          <span>KeyMatrix OS • Archivarius Merkle Ledger Proof Chain</span>
          <button
            onClick={() => setEvidenceModalOpen(false)}
            className="px-4 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-colors shadow-[0_0_15px_rgba(6,182,212,0.4)]"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
