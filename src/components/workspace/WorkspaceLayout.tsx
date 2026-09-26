import React, { useEffect, useState } from 'react';
import { useWorkspaceStore } from '../../store/workspaceStore';
import { useOSStore } from '../../store/osStore';
import { FileExplorer } from './FileExplorer';
import { CodeEditor } from './CodeEditor';
import { TerminalView } from './TerminalView';
import { PreviewPanel } from './PreviewPanel';
import { TaskPlanPanel } from './TaskPlanPanel';
import { AgentInteractionWorkspace } from '../agent/AgentInteractionWorkspace';
import { PermissionModal } from '../agent/PermissionModal';
import {
  Brain,
  Bot,
  Terminal,
  FolderLock,
  Globe,
  Camera,
  Layers,
  ShieldCheck,
  PanelLeftClose,
  PanelLeftOpen,
  Monitor,
  Smartphone,
  Sparkles,
} from 'lucide-react';

export const WorkspaceLayout: React.FC = () => {
  const { isRTL } = useOSStore();
  const {
    mode,
    setMode,
    workspace,
    initWorkspace,
    createSnapshot,
    mobileTab,
    setMobileTab,
    snapshots,
  } = useWorkspaceStore();

  const [leftPaneOpen, setLeftPaneOpen] = useState(true);
  const [rightPaneTab, setRightPaneTab] = useState<'editor' | 'preview'>('editor');

  useEffect(() => {
    initWorkspace();
  }, [initWorkspace]);

  const handleTakeSnapshot = async () => {
    await createSnapshot('Manual User Workspace Snapshot');
  };

  return (
    <div
      className={`flex flex-col h-[calc(100vh-140px)] min-h-[600px] w-full bg-[#020617] rounded-2xl border border-cyan-900/50 shadow-2xl overflow-hidden font-mono ${
        isRTL ? 'rtl' : 'ltr'
      }`}
    >
      {/* Top Header & Mode Switcher */}
      <div className="p-3 bg-slate-900/90 border-b border-cyan-900/50 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-cyan-900/60">
            <button
              onClick={() => setMode('ASK')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                mode === 'ASK'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_10px_rgba(0,212,255,0.2)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              ASK (Оркестрация)
            </button>
            <button
              onClick={() => setMode('BUILD')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                mode === 'BUILD'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_10px_rgba(0,212,255,0.2)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              BUILD (Workspace)
            </button>
          </div>

          {/* PERMANENT MANDATORY RUNTIME BADGE */}
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-600/50 text-[11px] font-bold text-cyan-300 shadow-[0_0_10px_rgba(0,212,255,0.15)]">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>LOCAL BROWSER RUNTIME</span>
            <span className="text-[9px] text-slate-400 font-normal">
              (Type: WEBCONTAINER | Backend: disconnected)
            </span>
          </div>
        </div>

        {/* Right header tools */}
        <div className="flex items-center gap-2">
          {workspace && (
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              Workspace ID: <code className="text-cyan-300 font-bold">{workspace.workspaceId}</code>
            </span>
          )}

          <button
            onClick={handleTakeSnapshot}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-900/50 text-xs font-bold transition-all"
            title="Создать локальный снимок рабочей области"
          >
            <Camera className="w-3.5 h-3.5 text-cyan-400" />
            <span>Снимок ({snapshots.length})</span>
          </button>
        </div>
      </div>

      {/* Permission Confirmation Modal Checkpoint */}
      <PermissionModal />

      {mode === 'ASK' ? (
        <div className="flex-1 overflow-y-auto p-4 bg-slate-950">
          <AgentInteractionWorkspace />
        </div>
      ) : (
        <>
          {/* DESKTOP THREE-PANE LAYOUT (hidden on small screens) */}
          <div className="hidden lg:flex flex-1 overflow-hidden min-h-0">
            {/* LEFT PANE: MetaLogos Chat & Build Loop Plan */}
            <div
              className={`transition-all duration-300 flex flex-col border-r border-cyan-900/40 bg-slate-950 ${
                leftPaneOpen ? 'w-1/3 min-w-[320px]' : 'w-12 shrink-0'
              }`}
            >
              <div className="p-2 bg-slate-900 border-b border-cyan-900/40 flex items-center justify-between">
                {leftPaneOpen && (
                  <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Brain className="w-3.5 h-3.5 text-cyan-400" />
                    MetaLogos Agent & Plan
                  </span>
                )}
                <button
                  onClick={() => setLeftPaneOpen(!leftPaneOpen)}
                  className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
                  title={leftPaneOpen ? 'Свернуть панель' : 'Развернуть панель'}
                >
                  {leftPaneOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
                </button>
              </div>

              {leftPaneOpen && (
                <div className="flex-1 flex flex-col overflow-hidden">
                  <TaskPlanPanel />
                  <div className="flex-1 overflow-y-auto p-2">
                    <AgentInteractionWorkspace />
                  </div>
                </div>
              )}
            </div>

            {/* CENTER PANE: WebContainer Terminal */}
            <div className="flex-1 flex flex-col min-w-[360px]">
              <TerminalView />
            </div>

            {/* RIGHT PANE: Files & Code Editor / Preview */}
            <div className="w-1/3 min-w-[360px] flex flex-col bg-slate-950">
              <div className="p-2 bg-slate-900 border-b border-cyan-900/40 flex items-center justify-between">
                <div className="flex items-center gap-1 p-0.5 rounded bg-slate-950 border border-cyan-900/50">
                  <button
                    onClick={() => setRightPaneTab('editor')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold ${
                      rightPaneTab === 'editor'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <FolderLock className="w-3 h-3 text-cyan-400" />
                    Файлы & Редактор
                  </button>
                  <button
                    onClick={() => setRightPaneTab('preview')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold ${
                      rightPaneTab === 'preview'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Globe className="w-3 h-3 text-emerald-400" />
                    Предпросмотр
                  </button>
                </div>
              </div>

              <div className="flex-1 flex overflow-hidden">
                {rightPaneTab === 'editor' ? (
                  <>
                    <div className="w-1/3 min-w-[140px] border-r border-cyan-900/40">
                      <FileExplorer />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CodeEditor />
                    </div>
                  </>
                ) : (
                  <PreviewPanel />
                )}
              </div>
            </div>
          </div>

          {/* MOBILE VIEW (tabs bottom nav) */}
          <div className="flex lg:hidden flex-1 flex-col overflow-hidden min-h-0">
            <div className="flex-1 overflow-hidden">
              {mobileTab === 'CHAT' && (
                <div className="h-full flex flex-col p-2 overflow-y-auto">
                  <TaskPlanPanel />
                  <AgentInteractionWorkspace />
                </div>
              )}
              {mobileTab === 'TERMINAL' && <TerminalView />}
              {mobileTab === 'FILES' && (
                <div className="h-full flex flex-col">
                  <div className="h-1/2 border-b border-cyan-900/40">
                    <FileExplorer />
                  </div>
                  <div className="h-1/2">
                    <CodeEditor />
                  </div>
                </div>
              )}
              {mobileTab === 'PREVIEW' && <PreviewPanel />}
            </div>

            {/* Mobile Bottom Navigation Bar */}
            <div className="p-2 bg-slate-900 border-t border-cyan-900/50 grid grid-cols-4 gap-1 text-center font-bold text-xs">
              <button
                onClick={() => setMobileTab('CHAT')}
                className={`p-2 rounded-xl flex flex-col items-center gap-1 min-h-[44px] justify-center ${
                  mobileTab === 'CHAT' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50' : 'text-slate-400'
                }`}
              >
                <Bot className="w-4 h-4" />
                <span>CHAT</span>
              </button>
              <button
                onClick={() => setMobileTab('TERMINAL')}
                className={`p-2 rounded-xl flex flex-col items-center gap-1 min-h-[44px] justify-center ${
                  mobileTab === 'TERMINAL' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50' : 'text-slate-400'
                }`}
              >
                <Terminal className="w-4 h-4" />
                <span>TERM</span>
              </button>
              <button
                onClick={() => setMobileTab('FILES')}
                className={`p-2 rounded-xl flex flex-col items-center gap-1 min-h-[44px] justify-center ${
                  mobileTab === 'FILES' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50' : 'text-slate-400'
                }`}
              >
                <FolderLock className="w-4 h-4" />
                <span>FILES</span>
              </button>
              <button
                onClick={() => setMobileTab('PREVIEW')}
                className={`p-2 rounded-xl flex flex-col items-center gap-1 min-h-[44px] justify-center ${
                  mobileTab === 'PREVIEW' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50' : 'text-slate-400'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>PREVIEW</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
