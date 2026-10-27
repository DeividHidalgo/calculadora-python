# 🐍 Calculadora Didática em Python

> Uma calculadora desenvolvida especialmente para quem está começando a aprender programação, unindo um **script Python puro comentado** e uma **interface web interativa com laboratório de aprendizagem em tempo real**.

---

## 📌 Visão Geral

Este projeto foi criado com fins didáticos para desmistificar a lógica de programação. Ele ensina como estruturar um programa limpo e modular a partir das 4 operações aritméticas básicas da matemática:

- ➕ **Adição** (`somar`)
- ➖ **Subtração** (`subtrair`)
- ✖️ **Multiplicação** (`multiplicar`)
- ➗ **Divisão** (`dividir`, com proteção contra divisão por zero)

O repositório contém duas formas de uso:
1. **Script de Terminal (`calculadora.py`):** Código Python 3 puro, sem dependências externas, pronto para rodar em qualquer terminal ou editor (VS Code, Thonny, PyCharm, Replit).
2. **Aplicação Web Interativa (`React + Vite + Tailwind CSS`):** Uma calculadora com tema escuro de alto contraste que ilustra a chamada de cada função Python em tempo real e fornece cartões explicativos sobre os conceitos de programação.

---

## 🚀 Como Executar o Projeto

### Opção 1: Rodar o Script Python no Terminal (Recomendado para Iniciantes)

Certifique-se de ter o **Python 3** instalado em sua máquina ([Download no python.org](https://www.python.org/downloads/)).

1. Abra o seu terminal ou prompt de comando na pasta do projeto.
2. Execute o comando:
   ```bash
   python calculadora.py
   ```
   *(Em alguns sistemas operacionais como Linux/macOS, use `python3 calculadora.py`)*

3. Siga as instruções do menu interativo no terminal!

---

### Opção 2: Rodar a Interface Web Interativa

Se você quiser explorar o laboratório visual interativo no seu navegador:

1. Instale o [Node.js](https://nodejs.org/) (versão 18 ou superior).
2. Na raiz do projeto, instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Abra o link gerado no terminal (normalmente `http://localhost:3000` ou `http://localhost:5173`).

---

## 🧠 Principais Componentes do Código Explicados

Se você é iniciante em programação, aqui está o que cada parte do arquivo `calculadora.py` faz:

### 1. A Palavra-Chave `def` (Definição de Funções)
```python
def somar(a, b):
    return a + b
```
- **O que é:** Uma função é um bloco de instruções com um nome próprio que pode ser executado várias vezes sem precisar reescrever o código.
- **`def`:** Avisa ao interpretador Python: *"aqui começa a definição de uma nova função"*.
- **`somar`:** É o nome que escolhemos para a função.

### 2. Parâmetros e Argumentos `(a, b)`
- **Parâmetros (`a, b`):** São as "portas de entrada" da função. Quando a função é chamada, ela espera receber dois valores para colocar nessas variáveis temporárias.
- **Argumentos:** São os números reais que você envia ao chamar a função (exemplo: ao chamar `somar(10, 5)`, `a` se torna `10` e `b` se torna `5`).

### 3. O Comando `return`
- O `return` entrega a resposta calculada de volta para quem chamou a função. Sem o `return`, o cálculo seria feito na memória mas o resultado seria perdido.

### 4. Proteção contra Divisão por Zero (`if b == 0:`)
```python
def dividir(a, b):
    if b == 0:
        return "Erro: não é possível dividir por zero!"
    return a / b
```
- Na matemática não existe divisão por zero. Em Python, se tentarmos fazer `10 / 0`, o programa trava com o erro `ZeroDivisionError`.
- Usando o teste condicional `if b == 0:`, verificamos o divisor antes de realizar o cálculo, garantindo que o programa continue estável e mostre uma mensagem amigável.

### 5. Conversão para Decimal (`float()`)
```python
num1 = float(input("Digite o primeiro número: "))
```
- O comando `input()` sempre lê o que o usuário digita como **texto** (`string`).
- A função `float()` converte esse texto em um número com casas decimais (exemplo: `4.5`), permitindo que a calculadora aceite números inteiros e fracionários.

### 6. Tratamento de Erros com `try ... except`
```python
try:
    num1 = float(input("Digite o primeiro número: "))
except ValueError:
    print("Entrada inválida! Digite apenas números.")
```
- Se o usuário digitar letras (como `"abc"`) em vez de números, a conversão `float()` falharia.
- O bloco `try ... except ValueError` "captura" essa falha e avisa o usuário sem fechar o programa.

### 7. O que significa `if __name__ == "__main__":`?
```python
if __name__ == "__main__":
    executar()
```
- Essa linha garante que a função `executar()` só comece a rodar se o arquivo for executado diretamente pelo usuário (`python calculadora.py`), e não se ele for apenas importado como módulo por outro script.

---

## 📂 Estrutura de Arquivos

```text
├── calculadora.py          # Script Python puro educativo para terminal
├── index.html              # Ponto de entrada da aplicação Web
├── package.json            # Dependências e scripts do projeto Web
├── README.md               # Este arquivo de documentação completa
├── src/
│   ├── App.tsx             # Componente central e layout de 2 colunas
│   ├── components/
│   │   ├── Calculator.tsx  # Teclado visual com suporte a atalhos
│   │   ├── Header.tsx      # Barra de navegação e download do script
│   │   ├── HistoryDrawer.tsx # Histórico de cálculos da sessão
│   │   └── PythonLearningPanel.tsx # Painel de código e guia conceitual
│   ├── data/
│   │   └── pythonData.ts   # Snippets, explicações e conceitos didáticos
│   ├── index.css           # Estilização com Tailwind CSS e fontes mono
│   └── main.tsx            # Inicialização do React 19
└── tsconfig.json           # Configuração do TypeScript
```

---

## 📤 Como Publicar no seu GitHub

Se você deseja subir este projeto para a sua própria conta do GitHub:

### Passo 1: Crie um Repositório Vazio no GitHub
1. Acesse [github.com/new](https://github.com/new).
2. Dê um nome ao repositório (por exemplo: `calculadora-python-didatica`).
3. Deixe o repositório como **Público** e **NÃO** marque a opção de adicionar README (já temos um pronto aqui).
4. Clique em **Create repository**.

### Passo 2: Inicialize e Conecte no Terminal
No terminal da pasta deste projeto, execute a seguinte sequência de comandos:

```bash
# 1. Inicia o repositório Git local
git init

# 2. Adiciona todos os arquivos ao controle de versão
git add .

# 3. Cria o primeiro commit
git commit -m "feat: calculadora didatica em python e interface web interativa"

# 4. Define o branch principal como main
git branch -M main

# 5. Conecte ao seu repositório no GitHub (substitua SEU-USUARIO e SEU-REPOSITORIO pela sua URL)
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git

# 6. Envie os arquivos para o GitHub!
git push -u origin main
```

Pronto! Seu projeto estará publicado com toda a documentação, o código Python formatado e a aplicação pronta para ser compartilhada no seu portfólio.

---

## 📄 Licença

Este projeto é de código aberto e está licenciado sob a licença [Apache 2.0](LICENSE) — sinta-se à vontade para estudar, modificar e compartilhar!
