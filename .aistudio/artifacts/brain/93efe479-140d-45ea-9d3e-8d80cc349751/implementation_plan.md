# Calculadora Python Didática para Iniciantes

Uma aplicação web com design moderno em tema escuro e foco pedagógico, projetada para quem está começando a aprender programação. Une a facilidade de uso de uma calculadora visual intuitiva a um painel educativo que desmistifica o código Python linha por linha com comentários claros e explicações dos principais conceitos fundamentais.

### Decisões Confirmadas e Revisão Pedagógica

> [!IMPORTANT]
> **Ajuste Didático (Solicitado pelo Usuário):**
> - **Foco em Iniciantes:** O código Python será extremamente limpo, legível e organizado, evitando truques complexos ou sintaxes avançadas.
> - **Explicações dos Componentes Chave:** Cada bloco essencial do código (definição de função `def`, parâmetros `(a, b)`, palavra-chave `return`, condicionais `if/else` para divisão por zero e laço de repetição) terá explicações visuais e didáticas em português acessível.
> - **Script Python Completo Pronto para Estudo:** A interface incluirá um botão para copiar o script Python completo (`calculadora.py`), 100% comentado e formatado para execução no terminal (VS Code, Thonny, Replit ou IDLE).

---

### 1. Visão Geral e Conceito Central

- **O que faz:**
  - **Calculadora Visual Funcional:** Permite realizar as 4 operações básicas (adição, subtração, multiplicação e divisão) com suporte a decimais, tecla de apagar dígito (`⌫`), limpar (`AC`) e histórico de cálculos.
  - **Painel Educativo de Python:** Ao clicar em qualquer operação, o painel ao lado destaca a função Python correspondente em execução, mostrando exatamente quais valores foram passados como parâmetros e qual foi o retorno.
  - **Guia Interativo de Conceitos:** Seção expansível com cartões explicativos sobre os 4 pilares do programa:
    1. **O que é uma Função (`def`)**: Como agrupamos blocos de código reutilizáveis.
    2. **Parâmetros e Argumentos**: Como enviamos os números para dentro da função.
    3. **O Comando `return`**: Como a função entrega o resultado de volta.
    4. **Tratamento de Exceções (`if b == 0`)**: Por que não podemos dividir por zero e como o código previne erros.

- **Público-Alvo:** Iniciantes absolutos em programação e estudantes de introdução à ciência da computação.
- **Valor Principal:** Eliminar o medo de programar tornando o código visual, tangível e conectado a uma ferramenta do cotidiano.

---

### 2. Experiência do Usuário e Design Visual

- **Layout de Duas Colunas Balanceadas (Tema Escuro de Alto Contraste):**
  - **Coluna 1 (Calculadora):** Corpo ergonômico em ardósia profunda (`bg-slate-900`), visor digital de dupla linha (expressão e valor atual em fonte monoespaçada tabular de alta legibilidade), botões numéricos com contraste claro e operadores em azul Python (`sky-600`) e verde de execução (`emerald-600`).
  - **Coluna 2 (Laboratório de Código Python):**
    - **Aba 1: "Como o Python Calculou Isso?"**: Mostra a chamada da função em tempo real com destaque de sintaxe e balão explicativo em linguagem simples.
    - **Aba 2: "Código Completo Comentado"**: Visualizador do arquivo `calculadora.py` completo com explicações passo a passo e botão de 1-clique para copiar.
    - **Aba 3: "Aprenda os Conceitos"**: Cartões didáticos interativos clicáveis que explicam termos de programação de forma descomplicada.
  - **Gaveta / Seção de Histórico:** Lista clara dos cálculos feitos na sessão com atalho para reutilizar o valor anterior.

- **Identidade Visual e Cores:**
  - **Canvas (60%):** Fundo limpo em `bg-slate-950` com sutis linhas divisórias em `border-slate-800`.
  - **Superfícies (30%):** Cartões em `bg-slate-900` com cantos suaves (`rounded-xl`) e espaçamento generoso.
  - **Acentos (10%):** Cores semânticas com significado didático (Azul para funções, Laranja/Âmbar para alertas/limpar, Verde para resultados e retornos).

---

### 3. Estrutura do Código Python Educativo

O código gerado para estudo do usuário seguirá rigorosamente as boas práticas de simplicidade:

```python
# ==========================================
#  CALCULADORA BÁSICA EM PYTHON (DIDÁTICA)
# ==========================================

# 1. FUNÇÃO DE ADIÇÃO
# Uma função é um bloco que recebe valores (a e b) e devolve a soma deles.
def somar(a, b):
    return a + b

# 2. FUNÇÃO DE SUBTRAÇÃO
# Subtrai o segundo número do primeiro.
def subtrair(a, b):
    return a - b

# 3. FUNÇÃO DE MULTIPLICAÇÃO
# Multiplica o primeiro número pelo segundo.
def multiplicar(a, b):
    return a * b

# 4. FUNÇÃO DE DIVISÃO (Com proteção)
# Na matemática não é possível dividir por zero, por isso usamos uma condição 'if'.
def dividir(a, b):
    if b == 0:
        return "Erro: não é possível dividir por zero!"
    return a / b
```

---

### 4. Arquitetura Técnica e Mapeamento de Estados

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             App Container                                   │
│  ┌─────────────────────────────────┐  ┌──────────────────────────────────┐  │
│  │       Calculadora Visual        │  │   Painel de Aprendizado Python   │  │
│  │ ┌─────────────────────────────┐ │  │ ┌──────────────────────────────┐ │  │
│  │ │ Visor (Expressão + Display) │ │  │ │ Abas: Chamada Atual |        │ │  │
│  │ └─────────────────────────────┘ │  │ │       Código Completo |       │ │  │
│  │ ┌─────────────────────────────┐ │  │ │       Conceitos Chave         │ │  │
│  │ │ Botões:                     │ │  │ └──────────────────────────────┘ │  │
│  │ │ [AC] [⌫] [ % ] [ ÷ ]        │ │  │ ┌──────────────────────────────┐ │  │
│  │ │ [ 7] [ 8] [ 9] [ × ]        │ │  │ │ Explicação Didática da        │ │  │
│  │ │ [ 4] [ 5] [ 6] [ - ]        │ │  │ │ Operação Realizada no Momento │ │  │
│  │ │ [ 1] [ 2] [ 3] [ + ]        │ │  │ └──────────────────────────────┘ │  │
│  │ │ [ 0] [ .] [   =   ]         │ │  │ ┌──────────────────────────────┐ │  │
│  │ └─────────────────────────────┘ │  │ │ Botão "Copiar Código Python" │ │  │
│  └─────────────────────────────────┘  │ └──────────────────────────────┘ │  │
│  ┌─────────────────────────────────┐  └──────────────────────────────────┘  │
│  │ Histórico de Cálculos           │                                        │
│  └─────────────────────────────────┘                                        │
└─────────────────────────────────────────────────────────────────────────────┘
```

- **Mapeamento de Estados:**
  - `display`: String do número atual na tela.
  - `expression`: String da expressão completa (ex: `10 + 5 =`).
  - `currentExplanation`: Objeto contendo o nome da função chamada, os valores de entrada e o significado pedagógico de cada parte.
  - `history`: Lista de operações anteriores na sessão com opção de reutilização.
  - `activeTab`: `'live' | 'fullCode' | 'concepts'` para guiar o aprendizado progressivo.
