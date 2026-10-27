import React from 'react';
import { History, Trash2, ArrowUpRight, Calculator as CalcIcon } from 'lucide-react';
import { CalculationItem } from '../types';

interface HistoryDrawerProps {
  history: CalculationItem[];
  onSelectCalculation: (item: CalculationItem) => void;
  onClearHistory: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  history,
  onSelectCalculation,
  onClearHistory,
}) => {
  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-sky-400" />
          <h3 className="text-sm font-bold text-white tracking-tight">
            Histórico da Sessão
          </h3>
          <span className="text-xs text-slate-500 font-mono">({history.length})</span>
        </div>

        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors cursor-pointer"
            title="Limpar todo o histórico"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Limpar</span>
          </button>
        )}
      </div>

      {/* History List or Empty State */}
      {history.length === 0 ? (
        <div className="py-8 px-4 text-center flex flex-col items-center justify-center gap-2 text-slate-500">
          <CalcIcon className="w-8 h-8 stroke-1 text-slate-600 mb-1" />
          <p className="text-xs font-medium text-slate-400">Nenhum cálculo registrado ainda</p>
          <p className="text-[11px] text-slate-500 max-w-xs">
            Experimente realizar uma adição, subtração, multiplicação ou divisão na calculadora acima para acompanhar o histórico!
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2 max-h-56 overflow-y-auto pr-1">
          {history.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectCalculation(item)}
              className="group p-3 rounded-xl bg-slate-950/70 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 transition-all cursor-pointer flex items-center justify-between"
              title="Clique para resgatar este resultado na calculadora"
            >
              <div className="flex flex-col">
                <span className="text-xs font-mono text-slate-400">{item.expression}</span>
                <span
                  className={`text-sm font-mono font-bold ${
                    item.isError ? 'text-rose-400' : 'text-emerald-400'
                  }`}
                >
                  = {item.result}
                </span>
              </div>

              <div className="flex items-center gap-1 text-xs text-slate-500 group-hover:text-sky-400 transition-colors">
                <span className="text-[10px] hidden sm:inline">Usar valor</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
