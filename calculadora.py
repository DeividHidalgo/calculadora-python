# =====================================================================
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
    Exemplo: somar(5, 3) retorna 8.
    """
    return a + b


def subtrair(a, b):
    """
    Função de Subtração.
    Recebe 'a' e 'b' e subtrai o segundo número do primeiro.
    Exemplo: subtrair(10, 4) retorna 6.
    """
    return a - b


def multiplicar(a, b):
    """
    Função de Multiplicação.
    Recebe 'a' e 'b' e retorna o produto da multiplicação entre eles.
    Exemplo: multiplicar(6, 7) retorna 42.
    """
    return a * b


def dividir(a, b):
    """
    Função de Divisão com Proteção.
    Na matemática não existe divisão por zero.
    Usamos o comando 'if' para verificar se 'b' é igual a 0.
    Exemplo: dividir(10, 2) retorna 5.0.
    """
    if b == 0:
        return "Erro: não é possível dividir por zero!"
    return a / b


# ---------------------------------------------------------------------
# PARTE 2: PROGRAMA PRINCIPAL INTERATIVO (EXECUTADO NO TERMINAL)
# ---------------------------------------------------------------------

def menu_calculadora():
    """Exibe o cabeçalho e as opções disponíveis no terminal."""
    print("\n" + "=" * 45)
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
    """
    Função principal que gerencia o loop interativo do programa.
    Permite fazer vários cálculos sucessivos até que o usuário decida sair.
    """
    while True:
        menu_calculadora()
        opcao = input("Digite sua opção (1-5): ").strip()

        # Opção 5: Encerrar o programa
        if opcao == "5":
            print("\nObrigado por usar a calculadora! Bons estudos em Python! 🐍")
            break

        # Se for uma das 4 operações válidas
        if opcao in ["1", "2", "3", "4"]:
            try:
                # float() converte o texto digitado pelo usuário em número decimal
                num1 = float(input("Digite o primeiro número: "))
                num2 = float(input("Digite o segundo número: "))

                if opcao == "1":
                    resultado = somar(num1, num2)
                    print(f"\n✅ Resultado: {num1} + {num2} = {resultado}")

                elif opcao == "2":
                    resultado = subtrair(num1, num2)
                    print(f"\n✅ Resultado: {num1} - {num2} = {resultado}")

                elif opcao == "3":
                    resultado = multiplicar(num1, num2)
                    print(f"\n✅ Resultado: {num1} * {num2} = {resultado}")

                elif opcao == "4":
                    resultado = dividir(num1, num2)
                    print(f"\n✅ Resultado: {num1} / {num2} = {resultado}")

            except ValueError:
                # Captura erros caso o usuário digite letras ou símbolos ao invés de números
                print("\n⚠️ Entrada inválida! Por favor, digite apenas números válidos.")
        else:
            print("\n⚠️ Opção inválida! Escolha um número de 1 a 5.")

        input("\nPressione Enter para continuar...")


# Este bloco garante que o programa só rode quando executado diretamente
if __name__ == "__main__":
    executar()
