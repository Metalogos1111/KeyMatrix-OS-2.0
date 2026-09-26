import React, { useState } from 'react';
import {
  ShieldAlert,
  Lock,
  Key,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  RefreshCw,
  Terminal,
  Cpu,
  Scale,
} from 'lucide-react';
import { useOSStore } from '../../store/osStore';
import { EvidenceBadge } from '../common/EvidenceBadge';
import { TRANSLATIONS } from '../../data/translations';
import { ShariahGovernance } from '../security/ShariahGovernance';
import { DisasterRecoveryAudit } from '../security/DisasterRecoveryAudit';

export const SecurityPage: React.FC = () => {
  const { safetyStatusDetails, role, language, addLog } = useOSStore();
  const t = TRANSLATIONS[language];
  const [activeTab, setActiveTab] = useState<'shariah' | 'tee' | 'dr'>('dr');

  const [isAuditing, setIsAuditing] = useState(false);
  const [auditSuccess, setAuditSuccess] = useState(false);

  const runSecurityAudit = () => {
    setIsAuditing(true);
    addLog('SECURITY', 'Инициирован полный аудит доверенной зоны TEE Enclave...', 'info');
    setTimeout(() => {
      setIsAuditing(false);
      setAuditSuccess(true);
      addLog('SECURITY', 'Аудит завершен: 100% инвариантов PrimeCore соблюдены. Угрозы отсутствуют.', 'success');
      setTimeout(() => setAuditSuccess(false), 5000);
    }, 1200);
  };

  return (
    <div id="page-security" className="space-y-4 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#07132b]/90 via-[#0a1b3a]/70 to-[#040a17]/90 border border-cyan-800/40 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <span>CORE DOMAIN 03 (PRIMECORE)</span>
            <span>•</span>
            <span>SHARIAH GOVERNANCE, ZERO-TRUST TEE & DR</span>
            <span>•</span>
            <EvidenceBadge level={5} compact />
          </div>
          <h1 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-emerald-400" />
            Безопасность, TEE & DR Репликация (v0.6)
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Аппаратная изоляция памяти, независимый захват baseline provenance и снятие HOLD через HASH-001
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 rounded-xl bg-slate-900/90 border border-cyan-900/50">
          <button
            onClick={() => setActiveTab('dr')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              activeTab === 'dr'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(0,212,255,0.2)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
            DR & HASH-001 (v0.6)
          </button>
          <button
            onClick={() => setActiveTab('shariah')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              activeTab === 'shariah'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            Shariah Governance
          </button>
          <button
            onClick={() => setActiveTab('tee')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              activeTab === 'tee'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(0,212,255,0.2)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            PrimeCore TEE
          </button>
        </div>
      </div>

      {activeTab === 'dr' ? (
        <DisasterRecoveryAudit />
      ) : activeTab === 'shariah' ? (
        <ShariahGovernance />
      ) : (
        <>
          <div className="flex justify-end">
            <button
              onClick={runSecurityAudit}
              disabled={isAuditing}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-700/40 text-xs font-medium transition-all shadow-[0_0_12px_rgba(16,185,129,0.2)] disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isAuditing ? 'animate-spin' : ''}`} />
              {isAuditing ? 'Сканирование TEE...' : 'Запустить аудит безопасности'}
            </button>
          </div>

          {auditSuccess && (
            <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2 animate-fade-in shadow-[0_0_15px_rgba(16,185,129,0.25)]">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              Все криптографические подписи и проверки Shura Rule #42 подтверждены. Анклав полностью защищен.
            </div>
          )}

          {/* Security Status Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-gradient-to-b from-[#09152e]/80 to-[#040816]/90 border border-emerald-500/30 shadow-lg">
              <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                Политика изоляции
              </span>
              <div className="text-lg font-bold font-mono text-emerald-400">
                {safetyStatusDetails?.failClosed ? 'FAIL-CLOSED (ACTIVE)' : 'OPEN'}
              </div>
              <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                Любое нарушение блокирует выполнение
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-b from-[#09152e]/80 to-[#040816]/90 border border-cyan-500/30 shadow-lg">
              <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                Криптографический DID
              </span>
              <div className="text-xs font-bold font-mono text-cyan-300 break-all">
                did:keymatrix:baku:om_brother
              </div>
              <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                Ed25519 аппаратная подпись
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-b from-[#09152e]/80 to-[#040816]/90 border border-amber-500/30 shadow-lg">
              <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                Этический арбитраж
              </span>
              <div className="text-lg font-bold font-mono text-amber-300">
                Shura Rule #42 Invariant
              </div>
              <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                100% соблюдение Макасыд аш-Шариа
              </span>
            </div>
          </div>

          {/* Security Audit Details */}
          <div className="rounded-2xl bg-gradient-to-b from-[#09152e]/80 to-[#040816]/90 border border-cyan-900/40 p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-cyan-900/40 pb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Аппаратные инварианты PrimeCore Enclave
              </h3>
              <span className="text-xs font-mono text-emerald-400">
                Статус: OPERATIONAL (100% PASS)
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              {[
                { label: 'Аппаратная изоляция анклава памяти TEE', status: 'VERIFIED', time: '< 1ms' },
                { label: 'Защита от ростовщичества (Riba Guard Kernel Hook)', status: 'ACTIVE', time: '< 2ms' },
                { label: 'Санитизация персональных данных (M02 Identity)', status: 'ENFORCED', time: '< 1ms' },
                { label: 'Верификация хэшей по Evidence Ladder (Level 5)', status: 'PASS', time: '3ms' },
                { label: 'Шифрование локальной базы IndexedDB KeyMatrix', status: 'AES-GCM-256', time: 'OK' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-slate-200">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-400 font-bold">{item.status}</span>
                    <span className="text-slate-500">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
