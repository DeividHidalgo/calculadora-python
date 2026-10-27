import React from 'react';
import { Download, Code2, Sparkles, BookOpen } from 'lucide-react';
import { FULL_PYTHON_SCRIPT } from '../data/pythonData';

interface HeaderProps {
  activeView: 'calc' | 'script' | 'concepts';
  onSelectView: (view: 'calc' | 'script' | 'concepts') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeView, onSelectView }) => {
  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([FULL_PYTHON_SCRIPT], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'calculadora.py';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <header className="flex items-center justify-between gap-8 px-6 py-4 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/20">
          <Code2 className="w-5 h-5" />
        </div>
        <span className="text-lg font-bold tracking-tight text-white whitespace-nowrap">
          PyCalc Didática
        </span>
      </div>

      {/* Zone 2: 4 nav links with clean active indicators */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
        <button
          onClick={() => onSelectView('calc')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            activeView === 'calc' ? 'text-sky-400 font-semibold' : ''
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Calculadora</span>
        </button>
        <button
          onClick={() => onSelectView('script')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            activeView === 'script' ? 'text-sky-400 font-semibold' : ''
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>Código Python</span>
        </button>
        <button
          onClick={() => onSelectView('concepts')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            activeView === 'concepts' ? 'text-sky-400 font-semibold' : ''
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Conceitos Básicos</span>
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={handleDownload}
          className="px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 active:scale-95 rounded-lg transition-all shadow-md shadow-sky-600/25 flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
          title="Baixar arquivo calculadora.py para rodar no seu computador"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Baixar calculadora.py</span>
        </button>
      </div>
    </header>
  );
};
