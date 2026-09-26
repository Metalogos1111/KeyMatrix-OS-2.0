import React, { useState } from 'react';
import { useWorkspaceStore } from '../../store/workspaceStore';
import { useAgentStore } from '../../store/agentStore';
import {
  Folder,
  FileCode,
  FileText,
  Plus,
  Search,
  Trash2,
  Edit2,
  Sparkles,
  Bot,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';

export const FileExplorer: React.FC = () => {
  const {
    files,
    activeFilePath,
    openFile,
    createFile,
    deleteFile,
    renameFile,
    searchQuery,
    setSearchQuery,
  } = useWorkspaceStore();

  const { sendMessage } = useAgentStore();

  const [newFileName, setNewFileName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [renamingPath, setRenamingPath] = useState<string | null>(null);
  const [renamedValue, setRenamedValue] = useState('');

  const filteredFiles = searchQuery
    ? files.filter((f) => f.path.toLowerCase().includes(searchQuery.toLowerCase()))
    : files;

  const handleCreateFile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileName.trim()) return;
    let path = newFileName.trim();
    if (!path.startsWith('src/') && !path.includes('/')) {
      path = `src/${path}`;
    }
    await createFile(path, '// Created in Local Browser Workspace\n');
    setNewFileName('');
    setIsCreating(false);
  };

  const handleRename = async (path: string) => {
    if (!renamedValue.trim() || renamedValue === path) {
      setRenamingPath(null);
      return;
    }
    await renameFile(path, renamedValue.trim());
    setRenamingPath(null);
  };

  const handleSendFileToChat = (path: string, mode: 'analyze' | 'fix') => {
    const prompt =
      mode === 'analyze'
        ? `Проанализируй этот файл: ${path}`
        : `Исправь возможные ошибки в файле: ${path}`;
    sendMessage(prompt, 'Developer', 'RU');
  };

  return (
    <div className="flex flex-col h-full bg-slate-950/90 border-r border-cyan-900/40 text-xs font-mono">
      {/* File Explorer Header */}
      <div className="p-3 border-b border-cyan-900/40 flex items-center justify-between bg-slate-900/80">
        <div className="flex items-center gap-2">
          <Folder className="w-4 h-4 text-cyan-400" />
          <span className="font-bold text-white uppercase tracking-wider">Файлы проекта</span>
          <span className="px-1.5 py-0.5 rounded text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-700/50">
            {files.length}
          </span>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="p-1 rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 transition-all"
          title="Создать файл"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-2 border-b border-cyan-900/30 bg-slate-950">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по файлам..."
            className="w-full bg-slate-900 border border-cyan-900/50 rounded pl-8 pr-2 py-1 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs"
          />
        </div>
      </div>

      {/* New File Modal / Inline Input */}
      {isCreating && (
        <form onSubmit={handleCreateFile} className="p-2 bg-cyan-950/30 border-b border-cyan-800/40 space-y-1">
          <span className="text-[10px] text-cyan-400 font-bold uppercase">Имя нового файла:</span>
          <div className="flex items-center gap-1">
            <input
              type="text"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              placeholder="e.g. src/utils/helpers.ts"
              autoFocus
              className="flex-1 bg-slate-900 border border-cyan-500/50 rounded px-2 py-1 text-white text-xs focus:outline-none"
            />
            <button
              type="submit"
              className="px-2 py-1 rounded bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 text-xs"
            >
              ОК
            </button>
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-2 py-1 rounded bg-slate-800 text-slate-400 hover:text-white text-xs"
            >
              Отмена
            </button>
          </div>
        </form>
      )}

      {/* File Tree List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filteredFiles.map((file) => {
          const isActive = file.path === activeFilePath;
          const isRenaming = renamingPath === file.path;

          return (
            <div
              key={file.path}
              className={`group flex items-center justify-between p-1.5 rounded transition-all ${
                isActive
                  ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/50 shadow-[0_0_8px_rgba(0,212,255,0.15)] font-bold'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <div
                onClick={() => openFile(file.path)}
                className="flex items-center gap-2 cursor-pointer flex-1 min-w-0"
              >
                {file.name.endsWith('.tsx') || file.name.endsWith('.ts') ? (
                  <FileCode className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                ) : (
                  <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                )}

                {isRenaming ? (
                  <input
                    type="text"
                    value={renamedValue}
                    onChange={(e) => setRenamedValue(e.target.value)}
                    onBlur={() => handleRename(file.path)}
                    onKeyDown={(e) => e.key === 'Enter' && handleRename(file.path)}
                    autoFocus
                    className="bg-slate-900 border border-cyan-400 text-white px-1 py-0.5 rounded w-full"
                  />
                ) : (
                  <span className="truncate">{file.path}</span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity shrink-0">
                <button
                  onClick={() => handleSendFileToChat(file.path, 'analyze')}
                  className="p-1 rounded text-cyan-400 hover:bg-cyan-500/20"
                  title="Проанализировать в MetaLogos"
                >
                  <Bot className="w-3 h-3" />
                </button>
                <button
                  onClick={() => handleSendFileToChat(file.path, 'fix')}
                  className="p-1 rounded text-amber-400 hover:bg-amber-500/20"
                  title="Исправить через MetaForge"
                >
                  <Sparkles className="w-3 h-3" />
                </button>
                <button
                  onClick={() => {
                    setRenamingPath(file.path);
                    setRenamedValue(file.path);
                  }}
                  className="p-1 rounded text-slate-400 hover:bg-slate-800 hover:text-white"
                  title="Переименовать"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
                {!file.readOnly && (
                  <button
                    onClick={() => deleteFile(file.path)}
                    className="p-1 rounded text-rose-400 hover:bg-rose-500/20"
                    title="Удалить файл"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
