import React, { useState } from 'react';
import { Copy, Check, Terminal, Play, BookOpen, HelpCircle, Code2, ArrowRight, ShieldAlert } from 'lucide-react';
import { CalculationItem } from '../types';
import { FULL_PYTHON_SCRIPT, PROGRAMMING_CONCEPTS, OPERATIONS_INFO } from '../data/pythonData';

interface PythonLearningPanelProps {
  latestCalculation: CalculationItem | null;
  activeView: 'calc' | 'script' | 'concepts';
  onChangeView: (view: 'calc' | 'script' | 'concepts') => void;
}

export const PythonLearningPanel: React.FC<PythonLearningPanelProps> = ({
  latestCalculation,
  activeView,
  onChangeView,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedConceptId, setSelectedConceptId] = useState<string>('def');

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(FULL_PYTHON_SCRIPT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  // Default calculation fallback if user hasn't calculated yet
  const defaultCalculation: CalculationItem = {
    id: 'demo',
    num1: 15,
    operator: '+',
    num2: 7,
    result: 22,
    expression: '15 + 7',
    functionName: 'somar',
    codeCall: 'resultado = somar(15, 7)\nprint(resultado)  # Saída: 22',
    timestamp: new Date(),
    explanation:
      "A função 'somar' recebeu a=15 e b=7. A expressão interna '15 + 7' foi calculada e a instrução 'return' devolveu o valor 22.",
    pythonSnippet: OPERATIONS_INFO['+'].pythonCode,
  };

  const currentCalc = latestCalculation || defaultCalculation;
  const isDefault = !latestCalculation;

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
      {/* Top Tab Bar inside the panel */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/60 px-4 py-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => onChangeView('calc')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeView === 'calc'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Execução em Tempo Real</span>
          </button>
          <button
            onClick={() => onChangeView('script')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeView === 'script'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Código Completo (.py)</span>
          </button>
          <button
            onClick={() => onChangeView('concepts')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeView === 'concepts'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Guia para Iniciantes</span>
          </button>
        </div>

        {activeView === 'script' && (
          <button
            onClick={handleCopyCode}
            className="px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar Script</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* View 1: Real-time calculation step-by-step */}
      {activeView === 'calc' && (
        <div className="p-6 flex flex-col gap-6">
          {/* Header indicator */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-sky-400 font-bold">
                  Laboratório Didático
                </span>
                {isDefault && (
                  <span className="text-xs text-slate-500 font-normal">
                    (Exemplo inicial — faça um cálculo na calculadora ao lado!)
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight mt-0.5">
                Como o Python processou {currentCalc.expression}?
              </h3>
            </div>
            <div className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700/80 text-xs font-mono text-sky-300">
              def {currentCalc.functionName}(a, b)
            </div>
          </div>

          {/* Interactive Code Breakdown Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left: The Python Function Definition */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-2 mb-3">
                  <span className="font-semibold text-slate-300">1. Função Declarada</span>
                  <span className="font-mono text-sky-400">código limpo</span>
                </div>
                <pre className="font-mono text-xs text-slate-200 leading-relaxed overflow-x-auto p-1">
                  <code>{currentCalc.pythonSnippet}</code>
                </pre>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-800/70 text-xs text-slate-400">
                💡 <span className="text-slate-300 font-medium">Conceito:</span> A instrução{' '}
                <code className="text-sky-300">def</code> ensina ao computador como executar a
                operação toda vez que ela for chamada.
              </div>
            </div>

            {/* Right: The Actual Call with User Data */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-2 mb-3">
                  <span className="font-semibold text-slate-300">2. Chamada com Seus Valores</span>
                  <span className="font-mono text-emerald-400">em execução</span>
                </div>
                <pre className="font-mono text-xs text-emerald-300 leading-relaxed overflow-x-auto p-1">
                  <code>{currentCalc.codeCall}</code>
                </pre>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-800/70 text-xs text-slate-400">
                {currentCalc.isError ? (
                  <div className="flex items-center gap-1.5 text-rose-400 font-medium">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>A condição de segurança 'if b == 0' evitou um erro fatal!</span>
                  </div>
                ) : (
                  <div>
                    🎯 <span className="text-slate-300 font-medium">Retorno:</span> A função
                    concluiu o cálculo e entregou o valor{' '}
                    <span className="text-emerald-400 font-bold">{currentCalc.result}</span>.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 3 Step Decomposition in Plain Portuguese */}
          <div className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-5 flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-sky-400" />
              <span>Passo a Passo em Linguagem Humana</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-3.5 flex flex-col gap-1.5">
                <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">
                  Etapa 1 · Parâmetros
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  O Python colocou <strong className="text-white">{currentCalc.num1}</strong> na
                  variável <code className="text-sky-300">a</code> e o número{' '}
                  <strong className="text-white">{currentCalc.num2}</strong> na variável{' '}
                  <code className="text-sky-300">b</code>.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-lg p-3.5 flex flex-col gap-1.5">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  Etapa 2 · Processamento
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentCalc.operator === '/' && currentCalc.num2 === 0 ? (
                    <span>
                      O teste <code className="text-amber-300">b == 0</code> deu{' '}
                      <strong>Verdadeiro</strong>, ativando a mensagem de proteção contra divisão por zero.
                    </span>
                  ) : (
                    <span>
                      O operador aritmético calculou{' '}
                      <strong className="text-white">
                        {currentCalc.num1} {currentCalc.operator} {currentCalc.num2}
                      </strong>{' '}
                      diretamente no processador.
                    </span>
                  )}
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-lg p-3.5 flex flex-col gap-1.5">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                  Etapa 3 · Retorno (return)
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  O comando <code className="text-emerald-300 font-bold">return</code> enviou o
                  resultado final (<strong className="text-emerald-400">{currentCalc.result}</strong>) de
                  volta para o visor da sua calculadora.
                </p>
              </div>
            </div>
          </div>

          {/* Quick link to concepts */}
          <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-800/40 border border-slate-800 rounded-lg p-3">
            <span>Quer entender a fundo como funcionam funções, variáveis e o comando return?</span>
            <button
              onClick={() => onChangeView('concepts')}
              className="text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Ver Guia de Conceitos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* View 2: Full Python Script */}
      {activeView === 'script' && (
        <div className="p-6 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Arquivo calculadora.py (Código Completo)
              </h3>
              <p className="text-xs text-slate-400">
                Você pode copiar e colar este script no seu editor (VS Code, Thonny ou Replit) e executá-lo no terminal!
              </p>
            </div>
            <button
              onClick={handleCopyCode}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Copiado com Sucesso!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Código</span>
                </>
              )}
            </button>
          </div>

          {/* Code Viewer Container */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 max-h-[460px] overflow-y-auto">
            <pre className="font-mono text-xs text-slate-300 leading-relaxed select-all">
              <code>{FULL_PYTHON_SCRIPT}</code>
            </pre>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 text-xs text-slate-400 flex flex-col gap-2">
            <span className="font-semibold text-slate-200">Como rodar esse arquivo no seu computador:</span>
            <ol className="list-decimal list-inside space-y-1 text-slate-400">
              <li>Instale o Python em seu computador pelo site oficial (<code className="text-sky-300">python.org</code>).</li>
              <li>Salve o código acima num arquivo com o nome <code className="text-sky-300">calculadora.py</code>.</li>
              <li>Abra o terminal ou prompt de comando na pasta do arquivo e digite: <code className="text-emerald-400 font-mono">python calculadora.py</code>.</li>
            </ol>
          </div>
        </div>
      )}

      {/* View 3: Beginner Programming Concepts Guide */}
      {activeView === 'concepts' && (
        <div className="p-6 flex flex-col gap-6">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Componentes Principais do Código Explicados
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Clique nos cartões abaixo para entender o papel de cada estrutura no programa em linguagem simples.
            </p>
          </div>

          {/* Concept Tabs */}
          <div className="flex flex-wrap gap-2">
            {PROGRAMMING_CONCEPTS.map((concept) => (
              <button
                key={concept.id}
                onClick={() => setSelectedConceptId(concept.id)}
                className={`px-3 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer text-left border ${
                  selectedConceptId === concept.id
                    ? 'bg-sky-600/20 text-sky-300 border-sky-500/50 shadow-sm'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {concept.title}
              </button>
            ))}
          </div>

          {/* Active Concept Explanation Card */}
          {(() => {
            const current =
              PROGRAMMING_CONCEPTS.find((c) => c.id === selectedConceptId) ||
              PROGRAMMING_CONCEPTS[0];

            return (
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col gap-4">
                <div>
                  <h4 className="text-base font-bold text-white">{current.title}</h4>
                  <p className="text-xs text-sky-400 mt-0.5">{current.shortDesc}</p>
                </div>

                {/* Real-life analogy */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3.5 flex items-start gap-3">
                  <div className="p-1.5 rounded-md bg-amber-400/10 text-amber-400 shrink-0 mt-0.5">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wide block mb-0.5">
                      Analogia da Vida Real
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">{current.analogy}</p>
                  </div>
                </div>

                {/* Example code snippet */}
                <div>
                  <span className="text-xs font-semibold text-slate-400 block mb-1.5">
                    Exemplo no Código:
                  </span>
                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-3">
                    <pre className="font-mono text-xs text-sky-300 leading-relaxed overflow-x-auto">
                      <code>{current.pythonExample}</code>
                    </pre>
                  </div>
                </div>

                {/* Detailed breakdown list */}
                <div>
                  <span className="text-xs font-semibold text-slate-400 block mb-2">
                    O que você precisa lembrar:
                  </span>
                  <ul className="space-y-2">
                    {current.breakdown.map((item, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};
