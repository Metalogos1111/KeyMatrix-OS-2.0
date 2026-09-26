import React, { useState } from 'react';
import { useWorkspaceStore } from '../../store/workspaceStore';
import {
  Globe,
  RotateCw,
  Square,
  ExternalLink,
  Smartphone,
  Tablet,
  Monitor,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';

export const PreviewPanel: React.FC = () => {
  const { previewStatus, stopPreviewServer, executeTerminalCommand } = useWorkspaceStore();

  const [deviceViewport, setDeviceViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [key, setKey] = useState(0);

  const handleStartDevServer = async () => {
    await executeTerminalCommand('npm run dev');
  };

  const handleReload = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 border-l border-cyan-900/40 font-mono text-xs">
      {/* Address Bar & Viewport Header */}
      <div className="p-2.5 bg-slate-900/90 border-b border-cyan-900/40 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
          <div className="flex-1 bg-slate-950 border border-cyan-900/50 rounded px-2.5 py-1 flex items-center justify-between text-slate-300 text-xs">
            <span className="truncate">{previewStatus.url || 'http://localhost:3000'}</span>
            <span className="px-1.5 py-0.2 rounded text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-700/50 font-bold ml-2">
              LOCAL PREVIEW
            </span>
          </div>
        </div>

        {/* Viewport controls & Reload */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => setDeviceViewport('desktop')}
            className={`p-1 rounded ${deviceViewport === 'desktop' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-500 hover:text-white'}`}
            title="Desktop Viewport"
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDeviceViewport('tablet')}
            className={`p-1 rounded ${deviceViewport === 'tablet' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-500 hover:text-white'}`}
            title="Tablet Viewport"
          >
            <Tablet className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDeviceViewport('mobile')}
            className={`p-1 rounded ${deviceViewport === 'mobile' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-500 hover:text-white'}`}
            title="Mobile Viewport"
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>

          {previewStatus.isListening && (
            <>
              <button
                onClick={handleReload}
                className="p-1.5 rounded bg-slate-800 text-cyan-300 hover:bg-slate-700"
                title="Обновить предпросмотр"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={stopPreviewServer}
                className="p-1.5 rounded bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/40"
                title="Остановить dev-сервер"
              >
                <Square className="w-3.5 h-3.5 fill-rose-300" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Preview Content Frame */}
      <div className="flex-1 bg-slate-900/50 p-4 flex items-center justify-center overflow-auto">
        {!previewStatus.isListening ? (
          <div className="max-w-md p-6 rounded-2xl bg-slate-900 border border-cyan-800/40 text-center space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Dev-сервер не запущен
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Запустите <code className="text-cyan-300 font-bold">npm run dev</code> для
                активации интерактивного предпросмотра внутри WebContainer.
              </p>
            </div>
            <button
              onClick={handleStartDevServer}
              className="w-full py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 shadow-[0_0_12px_rgba(0,212,255,0.3)] transition-all text-xs"
            >
              Запустить dev-сервер (Port 3000)
            </button>
          </div>
        ) : (
          <div
            className={`h-full bg-slate-950 border border-cyan-800/50 rounded-xl overflow-hidden shadow-2xl transition-all flex flex-col ${
              deviceViewport === 'mobile'
                ? 'w-[360px]'
                : deviceViewport === 'tablet'
                ? 'w-[640px]'
                : 'w-full'
            }`}
          >
            {/* Embedded Live Local WebContainer Preview Simulation */}
            <div className="p-3 bg-slate-900 border-b border-cyan-900/50 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[11px] text-cyan-300 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Vite Dev Server Active • Port 3000
              </div>
              <span className="text-[10px] text-slate-500 flex items-center gap-1 font-mono">
                <ShieldCheck className="w-3 h-3 text-cyan-400" />
                LOCAL BROWSER RUNTIME
              </span>
            </div>

            <div key={key} className="flex-1 p-6 bg-slate-950 text-white space-y-4 overflow-y-auto font-sans">
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/40">
                <h1 className="text-lg font-bold text-cyan-300">KeyMatrix OS v2.1 Local Engineering Runtime</h1>
                <p className="text-xs text-slate-300 mt-1">
                  Живой интерактивный предпросмотр сборки внутри локальной песочницы браузера.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block">Qibla Baku Azimuth:</span>
                  <span className="text-amber-400 font-bold text-sm">236.1° SW</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block">PoR Resonance Index:</span>
                  <span className="text-emerald-400 font-bold text-sm">0.942 φ</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/80 border border-cyan-900/40 text-xs font-mono text-slate-400 space-y-1">
                <div className="text-cyan-400 font-bold uppercase">Runtime Status</div>
                <div>Runtime Type: WEBCONTAINER</div>
                <div>Availability: AVAILABLE_LOCAL</div>
                <div>Backend Connected: false</div>
                <div>Persistence: LOCAL_SESSION</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
