import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Fingerprint,
  Key,
  ShieldCheck,
  RefreshCw,
  Copy,
  Check,
  FileCode,
  Award,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Lock,
} from 'lucide-react';
import { useOSStore } from '../../store/osStore';
import { generateDidKey, resolveDidDocument, signPayloadWithDid, verifyDidSignature, issueRoleCredential } from '../../lib/identity/did';

interface IdentityCoreProps {
  onClose?: () => void;
  isModal?: boolean;
}

export const IdentityCore: React.FC<IdentityCoreProps> = ({ onClose, isModal = false }) => {
  const { user, role, setRole, addLog } = useOSStore();
  const [copied, setCopied] = useState(false);
  const [signMessage, setSignMessage] = useState('Intent: Zero-Riba Ecological Regeneration in Caucasus');
  const [signature, setSignature] = useState('');
  const [verifyStatus, setVerifyStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  const [showDidDoc, setShowDidDoc] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const didDoc = resolveDidDocument(user.did);
  const credential = issueRoleCredential(user.did, role);

  const handleCopyDid = () => {
    navigator.clipboard.writeText(user.did);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateNewDid = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newKey = generateDidKey();
      useOSStore.setState((state) => ({
        user: {
          ...state.user,
          did: newKey.did,
        },
      }));
      addLog('SECURITY', `Сгенерирован новый DID:key [${newKey.did}] (Ed25519 Multicodec)`, 'success');
      setIsGenerating(false);
      setSignature('');
      setVerifyStatus('idle');
    }, 400);
  };

  const handleSign = () => {
    if (!signMessage.trim()) return;
    const sig = signPayloadWithDid(user.did, signMessage);
    setSignature(sig);
    setVerifyStatus('idle');
    addLog('SECURITY', `Сообщение подписано ключом ${user.did.substring(0, 18)}...`, 'info');
  };

  const handleVerify = () => {
    if (!signature) return;
    const isValid = verifyDidSignature(user.did, signMessage, signature);
    setVerifyStatus(isValid ? 'valid' : 'invalid');
    addLog(
      'SECURITY',
      `Верификация подписи: ${isValid ? 'ПОДТВЕРЖДЕНО (Valid Ed25519)' : 'ОШИБКА (Invalid Signature)'}`,
      isValid ? 'success' : 'error'
    );
  };

  const containerContent = (
    <div className="space-y-6 text-slate-200">
      {/* Header Banner */}
      <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Fingerprint className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold tracking-wide text-white">M02 IDENTITY CORE</h2>
              <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                DID:KEY v2.0
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Децентрализованная суверенная идентичность (W3C DID Standard) с привязкой к Shura Shariah Matrix
            </p>
          </div>
        </div>

        {isModal && onClose && (
          <button
            onClick={onClose}
            className="px-3 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          >
            Закрыть
          </button>
        )}
      </div>

      {/* DID Banner & Controls */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30 relative overflow-hidden backdrop-blur-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              <span>ACTIVE SOVEREIGN IDENTIFIER (DID)</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <div className="flex items-center gap-2 font-mono text-sm sm:text-base text-cyan-300 font-semibold bg-slate-950/80 px-3 py-2 rounded-lg border border-cyan-500/20 select-all overflow-x-auto">
              <span>{user.did}</span>
              <button
                onClick={handleCopyDid}
                className="ml-auto p-1.5 rounded hover:bg-cyan-500/20 text-cyan-400 transition-colors"
                title="Скопировать DID"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            onClick={handleGenerateNewDid}
            disabled={isGenerating}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs shadow-lg shadow-cyan-600/20 transition-all active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>Сгенерировать новый DID</span>
          </button>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
          <div>
            Спецификация: <span className="text-slate-200">Ed25519 Multicodec</span>
          </div>
          <div>
            Шлюз: <span className="text-emerald-400">TEE Local Enclave</span>
          </div>
          <div>
            Роль субъекта: <span className="text-amber-300 font-bold">{role}</span>
          </div>
        </div>
      </div>

      {/* Role-Bound Verifiable Credential */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Верифицированный мандат роли (Verifiable Credential)</span>
          </div>
          <span className="px-2 py-0.5 text-[11px] font-mono rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
            {role === 'Shura' ? 'COUNCIL SIGNATORY #42' : 'COMMUNITY TIER'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
            <div className="text-slate-400">Эмитент (Issuer)</div>
            <div className="font-mono text-slate-200 mt-1 truncate">did:key:km_genesis_shura</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
            <div className="text-slate-400">Уровень доверия (Trust Score)</div>
            <div className="font-mono text-emerald-400 font-bold mt-1">
              {credential.credentialSubject.trustScore}%
            </div>
          </div>
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
            <div className="text-slate-400">Статус Совета Шуры</div>
            <div className="font-mono mt-1">
              {role === 'Shura' ? (
                <span className="text-amber-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 1 из 5 Ключей
                </span>
              ) : (
                <span className="text-slate-400">Не состоит в Совете</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cryptographic Signature Playground */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <Key className="w-4 h-4 text-cyan-400" />
          <span>Криптографическая подпись и доказательство подлинности</span>
        </div>

        <div className="space-y-2">
          <label className="text-xs text-slate-400">Текст намерения / полезная нагрузка (Payload):</label>
          <input
            type="text"
            value={signMessage}
            onChange={(e) => setSignMessage(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs font-mono focus:border-cyan-500 focus:outline-none"
            placeholder="Введите текст для подписи..."
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSign}
            className="px-3.5 py-1.5 rounded-lg bg-cyan-600/80 hover:bg-cyan-600 text-white text-xs font-medium transition-colors"
          >
            Подписать ключом DID
          </button>

          {signature && (
            <button
              onClick={handleVerify}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 text-xs font-medium transition-colors"
            >
              Верифицировать подпись
            </button>
          )}
        </div>

        {signature && (
          <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 font-mono text-xs space-y-1">
            <div className="text-slate-400 flex items-center justify-between">
              <span>Сгенерированная подпись:</span>
              {verifyStatus === 'valid' && (
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> ВЕРИФИЦИРОВАНО
                </span>
              )}
              {verifyStatus === 'invalid' && (
                <span className="text-rose-400 font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> ПОДПИСЬ НЕДЕЙСТВИТЕЛЬНА
                </span>
              )}
            </div>
            <div className="text-cyan-300 break-all select-all">{signature}</div>
          </div>
        )}
      </div>

      {/* DID Document Collapsible */}
      <div className="border border-slate-800 rounded-xl overflow-hidden">
        <button
          onClick={() => setShowDidDoc(!showDidDoc)}
          className="w-full px-4 py-3 bg-slate-900/40 hover:bg-slate-900/80 flex items-center justify-between text-xs font-mono text-slate-300 transition-colors"
        >
          <span className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-cyan-400" />
            <span>Просмотр W3C DID Document ({user.did})</span>
          </span>
          {showDidDoc ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        <AnimatePresence>
          {showDidDoc && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="p-4 bg-slate-950/90 border-t border-slate-800 text-[11px] font-mono text-cyan-200/90 overflow-x-auto"
            >
              <pre>{JSON.stringify(didDoc, null, 2)}</pre>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-950 border border-cyan-500/40 rounded-2xl p-6 shadow-2xl shadow-cyan-500/10 custom-scrollbar"
        >
          {containerContent}
        </motion.div>
      </div>
    );
  }

  return <div className="p-6 rounded-2xl bg-slate-950/80 border border-cyan-500/30 backdrop-blur-xl">{containerContent}</div>;
};
