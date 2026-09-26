import React from 'react';
import { useAgentStore } from '../../store/agentStore';
import { useWorkspaceStore } from '../../store/workspaceStore';
import { ShieldAlert, Terminal, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

export const PermissionModal: React.FC = () => {
  const { activePermissionRequest, resolvePermission } = useAgentStore();
  const { pendingPermissionRequest, respondToPermissionRequest } = useWorkspaceStore();

  const request = pendingPermissionRequest || activePermissionRequest;

  if (!request) return null;

  const handleAction = (decision: 'ALLOWED_ONCE' | 'ALLOWED_FOR_TASK' | 'DENIED') => {
    if (pendingPermissionRequest) {
      respondToPermissionRequest(decision);
    } else if (activePermissionRequest) {
      resolvePermission(activePermissionRequest.id, decision);
    }
  };

  return (
    <div
      role="dialog"
      aria-labelledby="perm-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in font-mono"
    >
      <div className="w-full max-w-lg rounded-2xl bg-[#09152e] border-2 border-amber-500/60 p-6 shadow-[0_0_35px_rgba(245,158,11,0.25)] text-white space-y-5">
        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-amber-500/30 pb-4">
          <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
              TOOL REQUEST • terminal.execute (LOCAL_WEBCONTAINER)
            </div>
            <h2 id="perm-title" className="text-base font-bold text-white tracking-wide">
              ПОДТВЕРЖДЕНИЕ ВЫПОЛНЕНИЯ КОМАНДЫ
            </h2>
          </div>
        </div>

        {/* Content Details */}
        <div className="space-y-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Инициатор:</span>
              <span className="font-mono text-cyan-400 font-bold">{request.requestedBy}</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Инструмент:</span>
              <span className="font-mono text-white">{request.toolName}</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Уровень риска:</span>
              <span className="font-mono text-amber-400 font-bold uppercase">{request.riskLevel}</span>
            </div>
          </div>

          <div>
            <span className="text-[11px] font-mono text-slate-400 block mb-1">
              Запрашиваемая команда:
            </span>
            <pre className="p-3 rounded-xl bg-black/80 border border-amber-900/50 font-mono text-xs text-amber-200 overflow-x-auto whitespace-pre-wrap">
              $ {request.commandOrArgs}
            </pre>
          </div>

          {/* Mandatory Disclaimer Box */}
          <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-600/40 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-[11px] text-amber-200 leading-relaxed font-mono">
              <p className="font-bold text-amber-300">
                User Approval != Authority Decision != Cryptographic Quorum
              </p>
              <p className="text-[10px] text-slate-300">
                This is a local UX checkpoint only. Local browser sandbox execution does not imply production TEE attestation, Shura quorum, or backend authority settlement.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
          <button
            onClick={() => handleAction('ALLOWED_ONCE')}
            className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-lg"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>ALLOW ONCE</span>
          </button>

          <button
            onClick={() => handleAction('ALLOWED_FOR_TASK')}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-lg"
          >
            <span>ALLOW FOR TASK</span>
          </button>

          <button
            onClick={() => handleAction('DENIED')}
            className="px-4 py-2.5 rounded-xl bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800/60 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <XCircle className="w-4 h-4" />
            <span>DENY</span>
          </button>
        </div>
      </div>
    </div>
  );
};
