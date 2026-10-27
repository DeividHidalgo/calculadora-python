import { ProgrammingConcept, Operator } from '../types';

export const FULL_PYTHON_SCRIPT = `# =====================================================================
#             CALCULADORA DIDÁTICA BÁSICA EM PYTHON
#       Criada especialmente para quem está começando a programar!
# =====================================================================

# ---------------------------------------------------------------------
# PARTE 1: AS QUATRO OPERAÇÕES MATEMÁTICAS BÁSICAS (FUNÇÕES)
# ---------------------------------------------------------------------

def somar(a, b):
    """
    Função de Adição.
    Recebe dois números 'a' e 'b' e retorna a soma deles.
    """
    return a + b


def subtrair(a, b):
    """
    Função de Subtração.
    Recebe 'a' e 'b' e subtrai o segundo número do primeiro.
    """
    return a - b


def multiplicar(a, b):
    """
    Função de Multiplicação.
    Recebe 'a' e 'b' e retorna o produto da multiplicação entre eles.
    """
    return a * b


def dividir(a, b):
    """
    Função de Divisão com Proteção.
    Na matemática não existe divisão por zero.
    Usamos o comando 'if' para verificar se 'b' é igual a 0.
    """
    if b == 0:
        return "Erro: não é possível dividir por zero!"
    return a / b


# ---------------------------------------------------------------------
# PARTE 2: PROGRAMA PRINCIPAL INTERATIVO (EXECUTADO NO TERMINAL)
# ---------------------------------------------------------------------

def menu_calculadora():
    print("=" * 45)
    print("        BEM-VINDO À CALCULADORA EM PYTHON")
    print("=" * 45)
    print("Escolha a operação desejada:")
    print("1 - Adição (+)")
    print("2 - Subtração (-)")
    print("3 - Multiplicação (*)")
    print("4 - Divisão (/)")
    print("5 - Sair")
    print("=" * 45)


def executar():
    while True:
        menu_calculadora()
        opcao = input("Digite sua opção (1-5): ")

        if opcao == "5":
            print("\\nObrigado por usar a calculadora! Bons estudos em Python! 🐍")
            break

        if opcao in ["1", "2", "3", "4"]:
            try:
                # float() permite que o usuário digite números com ponto decimal (ex: 4.5)
                num1 = float(input("Digite o primeiro número: "))
                num2 = float(input("Digite o segundo número: "))

                if opcao == "1":
                    resultado = somar(num1, num2)
                    print(f"\\n✅ Resultado: {num1} + {num2} = {resultado}")

                elif opcao == "2":
                    resultado = subtrair(num1, num2)
                    print(f"\\n✅ Resultado: {num1} - {num2} = {resultado}")

                elif opcao == "3":
                    resultado = multiplicar(num1, num2)
                    print(f"\\n✅ Resultado: {num1} * {num2} = {resultado}")

                elif opcao == "4":
                    resultado = dividir(num1, num2)
                    print(f"\\n✅ Resultado: {num1} / {num2} = {resultado}")

            except ValueError:
                print("\\n⚠️ Entrada inválida! Por favor, digite apenas números válidos.")
        else:
            print("\\n⚠️ Opção inválida! Escolha um número de 1 a 5.")

        print("\\n" + "-" * 45)


# Este comando garante que o programa só execute quando chamado diretamente
if __name__ == "__main__":
    executar()
`;

export interface OperationDetail {
  name: string;
  symbol: string;
  functionName: string;
  pythonCode: string;
  explanation: (a: number, b: number, res: number | string) => string;
}

export const OPERATIONS_INFO: Record<Operator, OperationDetail> = {
  '+': {
    name: 'Adição',
    symbol: '+',
    functionName: 'somar',
    pythonCode: `def somar(a, b):
    # O operador '+' junta ou soma os dois valores
    return a + b`,
    explanation: (a, b, res) =>
      `A função 'somar' recebeu a=${a} e b=${b}. A expressão interna '${a} + ${b}' foi calculada e a instrução 'return' devolveu o valor ${res}.`,
  },
  '-': {
    name: 'Subtração',
    symbol: '-',
    functionName: 'subtrair',
    pythonCode: `def subtrair(a, b):
    # O operador '-' diminui o valor de 'b' do total de 'a'
    return a - b`,
    explanation: (a, b, res) =>
      `A função 'subtrair' recebeu a=${a} e b=${b}. O Python calculou '${a} - ${b}' e retornou o valor ${res}.`,
  },
  '*': {
    name: 'Multiplicação',
    symbol: '×',
    functionName: 'multiplicar',
    pythonCode: `def multiplicar(a, b):
    # Em Python, o asterisco '*' representa a multiplicação
    return a * b`,
    explanation: (a, b, res) =>
      `A função 'multiplicar' recebeu a=${a} e b=${b}. O asterisco '*' realizou a multiplicação e retornou ${res}.`,
  },
  '/': {
    name: 'Divisão',
    symbol: '÷',
    functionName: 'dividir',
    pythonCode: `def dividir(a, b):
    # Proteção: verificar se o divisor é zero
    if b == 0:
        return "Erro: não é possível dividir por zero!"
    # A barra '/' realiza a divisão decimal
    return a / b`,
    explanation: (a, b, res) => {
      if (b === 0) {
        return `Atenção: b foi igual a 0! A condição 'if b == 0:' foi verdadeira, impedindo que o programa travasse e retornando a mensagem de aviso.`;
      }
      return `A função 'dividir' recebeu o dividendo a=${a} e o divisor b=${b}. A barra '/' dividiu os números e o 'return' devolveu ${res}.`;
    },
  },
};

export const PROGRAMMING_CONCEPTS: ProgrammingConcept[] = [
  {
    id: 'def',
    title: '1. O que é uma Função (def)?',
    shortDesc: 'Um bloco de código reutilizável com um nome próprio.',
    analogy:
      'Pense numa receita de bolo ou num eletrodoméstico (como uma batedeira). Você cria uma vez e pode acionar quantas vezes quiser sem precisar reescrever as instruções.',
    pythonExample: `def somar(a, b):
    return a + b

# Para usar, basta chamar pelo nome:
resultado = somar(10, 5)  # resultado será 15`,
    breakdown: [
      "'def' é uma palavra-chave do Python para dizer: 'estou definindo uma nova função'.",
      "'somar' é o nome que escolhemos para a função (procure dar nomes claros).",
      "Os parênteses '(a, b)' guardam as informações que a função precisa receber para trabalhar.",
      "Os dois pontos ':' no final indicam que o bloco de instruções começará na linha seguinte.",
    ],
  },
  {
    id: 'parameters',
    title: '2. Parâmetros e Argumentos (a, b)',
    shortDesc: 'As "portas de entrada" por onde os dados chegam à função.',
    analogy:
      'São como as entradas de ingredientes de um liquidificador. Para fazer uma vitamina, você precisa colocar frutas e leite.',
    pythonExample: `def multiplicar(a, b):
    return a * b

# Aqui, 4 e 7 são os 'argumentos' enviados para 'a' e 'b':
total = multiplicar(4, 7)  # a se torna 4, b se torna 7`,
    breakdown: [
      "'Parâmetros' são as variáveis listadas entre parênteses na definição da função (`a, b`).",
      "'Argumentos' são os valores reais que você passa ao chamar a função (ex: `12` e `3.5`).",
      "Eles existem apenas enquanto a função está executando e são limpos da memória depois.",
    ],
  },
  {
    id: 'return',
    title: '3. O Comando return',
    shortDesc: 'A resposta oficial que a função devolve para quem a chamou.',
    analogy:
      'Quando você pede uma pizza pelo aplicativo, o entregador traz a pizza de volta na sua porta. O `return` é a entrega do resultado.',
    pythonExample: `def subtrair(a, b):
    resultado = a - b
    return resultado  # Entrega o valor calculado de volta

# O valor retornado é guardado na variável 'saldo':
saldo = subtrair(100, 35)  # saldo recebe 65`,
    breakdown: [
      "Sem o 'return', a função faz o cálculo mas não devolve nada para ser guardado.",
      "Assim que o Python encontra o 'return', ele encerra a execução daquela função imediatamente.",
      "Você pode retornar números, textos, listas ou até avisos de erro.",
    ],
  },
  {
    id: 'conditionals',
    title: '4. Condicionais (if / else)',
    shortDesc: 'Tomada de decisões no código com base em condições verdadeiras ou falsas.',
    analogy:
      'Como um guarda de trânsito: "SE o sinal estiver vermelho (if), pare. SENÃO (else), pode passar".',
    pythonExample: `def dividir(a, b):
    # SE o divisor for zero, evitamos o erro matemático:
    if b == 0:
        return "Erro: divisão por zero não existe!"
    else:
        return a / b`,
    breakdown: [
      "'if' testa uma condição lógica (ex: `b == 0`). Note os dois sinais de igual `==` para comparação.",
      "Se a condição for verdadeira, o código indentado logo abaixo do 'if' é executado.",
      "Isso impede erros fatais como o `ZeroDivisionError`, tornando seu software seguro e confiável.",
    ],
  },
  {
    id: 'datatypes',
    title: '5. Tipos Numéricos: int vs float',
    shortDesc: 'A diferença entre números inteiros e números com casas decimais.',
    analogy:
      'Um "int" é como contar laranjas inteiras (1, 2, 3). Um "float" é como medir litros de água ou dinheiro (1.50, 9.99).',
    pythonExample: `# Número inteiro (int):
quantidade = 5

# Número decimal / ponto flutuante (float):
preco = 12.90

# A divisão sempre resulta em float em Python:
resultado = 10 / 2  # resultado será 5.0 (float)`,
    breakdown: [
      "'int' (integer) armazena números inteiros positivos ou negativos sem vírgula/ponto.",
      "'float' (ponto flutuante) armazena números com casas decimais (utiliza ponto '.' e não vírgula ',').",
      "Em Python moderno, a divisão com uma barra '/' sempre produz um número float.",
    ],
  },
];
