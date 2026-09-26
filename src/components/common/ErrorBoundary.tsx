import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('KeyMatrix OS ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[300px] p-6 rounded-2xl bg-[#091122] border border-amber-500/40 text-white flex flex-col items-center justify-center text-center space-y-4">
          <div className="p-3 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-wide">
              {this.props.fallbackTitle || 'Сбой визуализации компонента'}
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-md">
              В изолированном домене интерфейса произошла ошибка. Изоляция инвариантов предотвратила падение всей операционной системы.
            </p>
            {this.state.error && (
              <pre className="mt-3 p-2.5 rounded-lg bg-black/50 text-[11px] font-mono text-rose-300 max-w-lg overflow-x-auto text-left border border-rose-950">
                {this.state.error.message}
              </pre>
            )}
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={this.handleReset}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Перезапустить блок</span>
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors flex items-center gap-1.5 border border-slate-700"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Обновить сессию</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
