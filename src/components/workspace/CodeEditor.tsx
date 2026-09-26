import React, { useEffect, useState } from 'react';
import { useWorkspaceStore } from '../../store/workspaceStore';
import { useAgentStore } from '../../store/agentStore';
import {
  Save,
  RotateCcw,
  Sparkles,
  X,
  FileCode,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export const CodeEditor: React.FC = () => {
  const {
    activeFilePath,
    openFiles,
    closeFile,
    fileContents,
    updateFileContent,
    saveFile,
    openFile,
  } = useWorkspaceStore();

  const { sendMessage } = useAgentStore();
  const [isSaved, setIsSaved] = useState(false);

  const activeContent = activeFilePath ? fileContents[activeFilePath] || '' : '';

  useEffect(() => {
    setIsSaved(false);
  }, [activeContent, activeFilePath]);

  if (!activeFilePath) {
    return (
      <div className="flex-1 bg-slate-950 flex flex-col items-center justify-center text-slate-500 font-mono text-xs">
        <FileCode className="w-10 h-10 mb-2 opacity-30 text-cyan-400" />
        <span>Выберите файл в левой панели для редактирования</span>
      </div>
    );
  }

  const handleSave = async () => {
    await saveFile(activeFilePath);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleAskMetaForgePatch = () => {
    sendMessage(
      `Предложи патч или оптимизацию для файла ${activeFilePath}:\n\`\`\`\n${activeContent.slice(0, 500)}\n\`\`\``,
      'Developer',
      'RU'
    );
  };

  const lines = activeContent.split('\n');

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 font-mono text-xs border-r border-cyan-900/40">
      {/* Tab bar */}
      <div className="flex items-center bg-slate-900/90 border-b border-cyan-900/40 overflow-x-auto no-scrollbar">
        {openFiles.map((path) => {
          const isActive = path === activeFilePath;
          const fileName = path.split('/').pop() || path;

          return (
            <div
              key={path}
              onClick={() => openFile(path)}
              className={`flex items-center gap-2 px-3 py-2 border-r border-cyan-900/40 cursor-pointer transition-all shrink-0 ${
                isActive
                  ? 'bg-slate-950 text-cyan-300 border-t-2 border-t-cyan-400 font-bold'
                  : 'text-slate-400 hover:bg-slate-950/50 hover:text-white'
              }`}
            >
              <FileCode className="w-3.5 h-3.5 text-cyan-400" />
              <span>{fileName}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeFile(path);
                }}
                className="p-0.5 rounded hover:bg-slate-800 text-slate-500 hover:text-white ml-1"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Editor Breadcrumb Toolbar */}
      <div className="p-2 bg-slate-950 border-b border-cyan-900/30 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-1">
          <span className="text-cyan-500">workspace</span>
          <span>/</span>
          <span className="text-white font-bold">{activeFilePath}</span>
          <span className="ml-2 text-[10px] px-1.5 py-0.2 rounded bg-slate-900 text-slate-400 border border-slate-800">
            {lines.length} lines
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isSaved && (
            <span className="flex items-center gap-1 text-emerald-400 text-[10px]">
              <CheckCircle2 className="w-3 h-3" />
              Сохранено
            </span>
          )}

          <button
            onClick={handleAskMetaForgePatch}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all font-bold"
          >
            <Sparkles className="w-3 h-3" />
            MetaForge Patch
          </button>

          <button
            onClick={handleSave}
            className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-bold transition-all"
          >
            <Save className="w-3 h-3" />
            Сохранить
          </button>
        </div>
      </div>

      {/* Code Area with Line Numbers */}
      <div className="flex-1 flex overflow-auto bg-[#030712] p-2 text-slate-200">
        <div className="select-none pr-3 text-right text-slate-600 border-r border-slate-800 shrink-0 font-mono text-[11px] space-y-0.5">
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        <textarea
          value={activeContent}
          onChange={(e) => updateFileContent(activeFilePath, e.target.value)}
          onKeyDown={(e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
              e.preventDefault();
              handleSave();
            }
          }}
          spellCheck={false}
          className="flex-1 bg-transparent pl-3 focus:outline-none resize-none font-mono text-xs leading-relaxed text-cyan-100 placeholder-slate-600"
        />
      </div>
    </div>
  );
};
