import React, { useState, useEffect, useCallback } from 'react';
import { Delete, RotateCcw, Percent } from 'lucide-react';
import { CalculationItem, Operator } from '../types';
import { OPERATIONS_INFO } from '../data/pythonData';

interface CalculatorProps {
  onCalculationComplete: (item: CalculationItem) => void;
  restoredValue: number | null;
  onClearRestoredValue: () => void;
}

export const Calculator: React.FC<CalculatorProps> = ({
  onCalculationComplete,
  restoredValue,
  onClearRestoredValue,
}) => {
  const [display, setDisplay] = useState<string>('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);
  const [expression, setExpression] = useState<string>('');
  const [lastActionWasEqual, setLastActionWasEqual] = useState<boolean>(false);

  // If a value was restored from history, put it into display
  useEffect(() => {
    if (restoredValue !== null) {
      setDisplay(String(restoredValue));
      setPrevValue(null);
      setOperator(null);
      setWaitingForOperand(false);
      setExpression(`Valor resgatado: ${restoredValue}`);
      onClearRestoredValue();
    }
  }, [restoredValue, onClearRestoredValue]);

  // Clean floating point issues (e.g., 0.1 + 0.2 = 0.3)
  const formatResult = (num: number): number => {
    return Math.round(num * 1e10) / 1e10;
  };

  const handleDigit = useCallback(
    (digit: string) => {
      if (lastActionWasEqual) {
        setDisplay(digit);
        setExpression('');
        setLastActionWasEqual(false);
        return;
      }

      if (waitingForOperand) {
        setDisplay(digit);
        setWaitingForOperand(false);
      } else {
        if (display === '0') {
          setDisplay(digit);
        } else if (display.length < 14) {
          setDisplay((prev) => prev + digit);
        }
      }
    },
    [display, waitingForOperand, lastActionWasEqual]
  );

  const handleDecimal = useCallback(() => {
    if (lastActionWasEqual) {
      setDisplay('0.');
      setExpression('');
      setLastActionWasEqual(false);
      return;
    }

    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay((prev) => prev + '.');
    }
  }, [display, waitingForOperand, lastActionWasEqual]);

  const handleBackspace = useCallback(() => {
    if (lastActionWasEqual) {
      setDisplay('0');
      setExpression('');
      setLastActionWasEqual(false);
      return;
    }

    if (display.length > 1) {
      setDisplay((prev) => prev.slice(0, -1));
    } else {
      setDisplay('0');
    }
  }, [display, lastActionWasEqual]);

  const handleClear = useCallback(() => {
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
    setExpression('');
    setLastActionWasEqual(false);
  }, []);

  const handleToggleSign = useCallback(() => {
    if (display === '0' || display.includes('Erro')) return;
    const val = parseFloat(display);
    setDisplay(String(-val));
  }, [display]);

  const handlePercentage = useCallback(() => {
    if (display.includes('Erro')) return;
    const val = parseFloat(display);
    const result = formatResult(val / 100);
    setDisplay(String(result));
    setExpression(`${val} % =`);
  }, [display]);

  const executeCalculation = useCallback(
    (num1: number, op: Operator, num2: number) => {
      const opInfo = OPERATIONS_INFO[op];
      let res: number | string;
      let isError = false;

      switch (op) {
        case '+':
          res = formatResult(num1 + num2);
          break;
        case '-':
          res = formatResult(num1 - num2);
          break;
        case '*':
          res = formatResult(num1 * num2);
          break;
        case '/':
          if (num2 === 0) {
            res = 'Erro: Divisão por Zero';
            isError = true;
          } else {
            res = formatResult(num1 / num2);
          }
          break;
      }

      const explanation = opInfo.explanation(num1, num2, res);
      const codeCall = isError
        ? `# Chamada que ativou a proteção:\nresultado = ${opInfo.functionName}(${num1}, ${num2})`
        : `resultado = ${opInfo.functionName}(${num1}, ${num2})\nprint(resultado)  # Saída: ${res}`;

      const historyItem: CalculationItem = {
        id: `${Date.now()}-${Math.random()}`,
        num1,
        operator: op,
        num2,
        result: res,
        isError,
        expression: `${num1} ${opInfo.symbol} ${num2}`,
        functionName: opInfo.functionName,
        codeCall,
        timestamp: new Date(),
        explanation,
        pythonSnippet: opInfo.pythonCode,
      };

      onCalculationComplete(historyItem);
      return res;
    },
    [onCalculationComplete]
  );

  const handleOperator = useCallback(
    (nextOp: Operator) => {
      const inputValue = parseFloat(display);

      if (display.includes('Erro')) {
        handleClear();
        return;
      }

      if (prevValue === null) {
        setPrevValue(inputValue);
        setOperator(nextOp);
        setWaitingForOperand(true);
        setExpression(`${inputValue} ${OPERATIONS_INFO[nextOp].symbol}`);
      } else if (operator && !waitingForOperand) {
        const result = executeCalculation(prevValue, operator, inputValue);
        if (typeof result === 'string') {
          setDisplay(result);
          setPrevValue(null);
          setOperator(null);
          setWaitingForOperand(false);
          setExpression(`${prevValue} ${OPERATIONS_INFO[operator].symbol} ${inputValue} =`);
          setLastActionWasEqual(true);
          return;
        }

        setDisplay(String(result));
        setPrevValue(result);
        setOperator(nextOp);
        setWaitingForOperand(true);
        setExpression(`${result} ${OPERATIONS_INFO[nextOp].symbol}`);
      } else {
        // Just changing the operator
        setOperator(nextOp);
        setExpression(`${prevValue} ${OPERATIONS_INFO[nextOp].symbol}`);
      }
      setLastActionWasEqual(false);
    },
    [display, prevValue, operator, waitingForOperand, executeCalculation, handleClear]
  );

  const handleEquals = useCallback(() => {
    if (prevValue === null || operator === null) {
      return;
    }

    const inputValue = parseFloat(display);
    const result = executeCalculation(prevValue, operator, inputValue);

    setExpression(`${prevValue} ${OPERATIONS_INFO[operator].symbol} ${inputValue} =`);
    setDisplay(String(result));
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
    setLastActionWasEqual(true);
  }, [prevValue, operator, display, executeCalculation]);

  // Physical keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is inside an input/textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        handleDigit(e.key);
      } else if (e.key === '.' || e.key === ',') {
        e.preventDefault();
        handleDecimal();
      } else if (e.key === '+') {
        e.preventDefault();
        handleOperator('+');
      } else if (e.key === '-') {
        e.preventDefault();
        handleOperator('-');
      } else if (e.key === '*') {
        e.preventDefault();
        handleOperator('*');
      } else if (e.key === '/') {
        e.preventDefault();
        handleOperator('/');
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        handleEquals();
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDigit, handleDecimal, handleOperator, handleEquals, handleBackspace, handleClear]);

  // Font size adjustment based on digit length
  const getDisplayFontSize = () => {
    if (display.length > 12) return 'text-2xl';
    if (display.length > 9) return 'text-3xl';
    return 'text-4xl';
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 flex flex-col gap-4">
      {/* Top Header of the Calculator Device */}
      <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-2">
        <span className="font-semibold text-slate-300">Terminal Aritmético</span>
        <span className="font-mono text-slate-500">Python 3 Core</span>
      </div>

      {/* Calculator Screen / Visor */}
      <div className="bg-slate-950 border border-slate-800/90 rounded-xl p-4 flex flex-col justify-end min-h-[110px] shadow-inner text-right relative overflow-hidden">
        {/* Expression line */}
        <div className="text-xs font-mono text-slate-400 h-5 overflow-hidden text-ellipsis whitespace-nowrap">
          {expression || ' '}
        </div>

        {/* Current display value */}
        <div
          className={`font-mono font-bold tracking-tight text-white ${getDisplayFontSize()} tabular-nums transition-all select-all ${
            display.includes('Erro') ? 'text-rose-400 text-xl' : ''
          }`}
        >
          {display}
        </div>
      </div>

      {/* Keypad Grid (4 columns) */}
      <div className="grid grid-cols-4 gap-2.5">
        {/* Row 1: AC, ⌫, %, ÷ */}
        <button
          onClick={handleClear}
          className="h-12 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-amber-400 font-semibold text-sm transition-all active:scale-95 flex items-center justify-center gap-1 cursor-pointer"
          title="Limpar tudo (Esc)"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>AC</span>
        </button>
        <button
          onClick={handleBackspace}
          className="h-12 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-slate-300 font-semibold text-sm transition-all active:scale-95 flex items-center justify-center cursor-pointer"
          title="Apagar dígito (Backspace)"
        >
          <Delete className="w-4 h-4" />
        </button>
        <button
          onClick={handlePercentage}
          className="h-12 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-slate-300 font-semibold text-sm transition-all active:scale-95 flex items-center justify-center cursor-pointer"
          title="Porcentagem"
        >
          <Percent className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleOperator('/')}
          className={`h-12 rounded-xl text-lg font-bold transition-all active:scale-95 flex items-center justify-center cursor-pointer ${
            operator === '/' && waitingForOperand
              ? 'bg-sky-500 text-white ring-2 ring-sky-300'
              : 'bg-sky-600 hover:bg-sky-500 text-white'
          }`}
          title="Divisão (/)"
        >
          ÷
        </button>

        {/* Row 2: 7, 8, 9, × */}
        <button
          onClick={() => handleDigit('7')}
          className="h-12 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-lg transition-all active:scale-95 cursor-pointer font-mono"
        >
          7
        </button>
        <button
          onClick={() => handleDigit('8')}
          className="h-12 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-lg transition-all active:scale-95 cursor-pointer font-mono"
        >
          8
        </button>
        <button
          onClick={() => handleDigit('9')}
          className="h-12 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-lg transition-all active:scale-95 cursor-pointer font-mono"
        >
          9
        </button>
        <button
          onClick={() => handleOperator('*')}
          className={`h-12 rounded-xl text-lg font-bold transition-all active:scale-95 flex items-center justify-center cursor-pointer ${
            operator === '*' && waitingForOperand
              ? 'bg-sky-500 text-white ring-2 ring-sky-300'
              : 'bg-sky-600 hover:bg-sky-500 text-white'
          }`}
          title="Multiplicação (*)"
        >
          ×
        </button>

        {/* Row 3: 4, 5, 6, - */}
        <button
          onClick={() => handleDigit('4')}
          className="h-12 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-lg transition-all active:scale-95 cursor-pointer font-mono"
        >
          4
        </button>
        <button
          onClick={() => handleDigit('5')}
          className="h-12 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-lg transition-all active:scale-95 cursor-pointer font-mono"
        >
          5
        </button>
        <button
          onClick={() => handleDigit('6')}
          className="h-12 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-lg transition-all active:scale-95 cursor-pointer font-mono"
        >
          6
        </button>
        <button
          onClick={() => handleOperator('-')}
          className={`h-12 rounded-xl text-lg font-bold transition-all active:scale-95 flex items-center justify-center cursor-pointer ${
            operator === '-' && waitingForOperand
              ? 'bg-sky-500 text-white ring-2 ring-sky-300'
              : 'bg-sky-600 hover:bg-sky-500 text-white'
          }`}
          title="Subtração (-)"
        >
          -
        </button>

        {/* Row 4: 1, 2, 3, + */}
        <button
          onClick={() => handleDigit('1')}
          className="h-12 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-lg transition-all active:scale-95 cursor-pointer font-mono"
        >
          1
        </button>
        <button
          onClick={() => handleDigit('2')}
          className="h-12 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-lg transition-all active:scale-95 cursor-pointer font-mono"
        >
          2
        </button>
        <button
          onClick={() => handleDigit('3')}
          className="h-12 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-lg transition-all active:scale-95 cursor-pointer font-mono"
        >
          3
        </button>
        <button
          onClick={() => handleOperator('+')}
          className={`h-12 rounded-xl text-lg font-bold transition-all active:scale-95 flex items-center justify-center cursor-pointer ${
            operator === '+' && waitingForOperand
              ? 'bg-sky-500 text-white ring-2 ring-sky-300'
              : 'bg-sky-600 hover:bg-sky-500 text-white'
          }`}
          title="Adição (+)"
        >
          +
        </button>

        {/* Row 5: ±, 0, ., = */}
        <button
          onClick={handleToggleSign}
          className="h-12 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-base transition-all active:scale-95 cursor-pointer font-mono"
          title="Inverter sinal (±)"
        >
          ±
        </button>
        <button
          onClick={() => handleDigit('0')}
          className="h-12 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-lg transition-all active:scale-95 cursor-pointer font-mono"
        >
          0
        </button>
        <button
          onClick={handleDecimal}
          className="h-12 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-lg transition-all active:scale-95 cursor-pointer font-mono"
          title="Ponto decimal (.)"
        >
          .
        </button>
        <button
          onClick={handleEquals}
          className="h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xl transition-all active:scale-95 shadow-lg shadow-emerald-600/30 flex items-center justify-center cursor-pointer"
          title="Calcular resultado (= ou Enter)"
        >
          =
        </button>
      </div>

      {/* Helpful keyboard shortcut guide */}
      <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center justify-between">
        <span>Teclas: 0-9 · + - * / · Enter</span>
        <span>Backspace: ⌫</span>
      </div>
    </div>
  );
};
