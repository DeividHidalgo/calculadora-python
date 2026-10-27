import { useState } from 'react';
import { Header } from './components/Header';
import { Calculator } from './components/Calculator';
import { PythonLearningPanel } from './components/PythonLearningPanel';
import { HistoryDrawer } from './components/HistoryDrawer';
import { CalculationItem } from './types';
import { Code, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [history, setHistory] = useState<CalculationItem[]>([]);
  const [latestCalculation, setLatestCalculation] = useState<CalculationItem | null>(null);
  const [restoredValue, setRestoredValue] = useState<number | null>(null);
  const [activeView, setActiveView] = useState<'calc' | 'script' | 'concepts'>('calc');

  const handleCalculationComplete = (item: CalculationItem) => {
    setLatestCalculation(item);
    setHistory((prev) => [item, ...prev].slice(0, 30));
    // If the user was viewing another tab, bring attention to the real-time execution tab
    if (activeView === 'concepts') {
      setActiveView('calc');
    }
  };

  const handleSelectFromHistory = (item: CalculationItem) => {
    if (typeof item.result === 'number') {
      setRestoredValue(item.result);
      setLatestCalculation(item);
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-sky-500/30 selection:text-sky-200">
      {/* Top Bar following Top Bar Contract */}
      <Header activeView={activeView} onSelectView={setActiveView} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        {/* Intro / Welcome Hero for Beginners */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 mb-1">
              <Code className="w-4 h-4" />
              <span>Ambiente Didático de Programação</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Calculadora & Laboratório Python
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Use a calculadora visual para executar contas e observe como o Python traduz cada
              operação aritmética em funções reais (<code className="text-sky-300 font-mono">def</code>),
              parâmetros e retornos.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-2.5 self-start md:self-auto">
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
              <span>4 Operações Básicas</span>
            </span>
            <span className="text-slate-600">·</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
              <span>Proteção if b == 0</span>
            </span>
            <span className="text-slate-600">·</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
              <span>Suporte a Decimais</span>
            </span>
          </div>
        </div>

        {/* 2-Column Responsive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Calculator + History */}
          <div className="lg:col-span-5 flex flex-col gap-6 w-full max-w-sm mx-auto lg:max-w-none">
            <Calculator
              onCalculationComplete={handleCalculationComplete}
              restoredValue={restoredValue}
              onClearRestoredValue={() => setRestoredValue(null)}
            />

            <HistoryDrawer
              history={history}
              onSelectCalculation={handleSelectFromHistory}
              onClearHistory={handleClearHistory}
            />
          </div>

          {/* Right Column: Python Learning & Code Panel */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <PythonLearningPanel
              latestCalculation={latestCalculation}
              activeView={activeView}
              onChangeView={setActiveView}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 px-4 text-center text-xs text-slate-500 bg-slate-950">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>Criado para o aprendizado prático de Python · Adição, Subtração, Multiplicação e Divisão</span>
          <span className="font-mono text-[11px] text-slate-600">Python 3 · Código Aberto Didático</span>
        </div>
      </footer>
    </div>
  );
}
