// Classe responsável por armazenar e exibir o valor inserido pelo usuário
class Caixa {
    #valorInserido; // Atributo privado (só pode ser acessado dentro da classe)

    constructor() {
        this.#valorInserido = 0;
    }

    // Define o valor inserido
    inserirValor(valor) {
        this.#valorInserido = valor;
    }

    // Retorna o valor atual inserido
    get valorInserido() {
        return this.#valorInserido;
    }

    // Atualiza o texto que mostra o valor inserido na interface
    mostrarValor() {
        document.getElementById("valorInseridoExibido").textContent =
            `Valor inserido: R$ ${this.#valorInserido.toFixed(2)}`;
    }

    // Limpa o valor inserido (para resetar após cada envio)
    limparValor() {
        this.#valorInserido = 0;
    }
}

// Classe responsável por calcular o tempo de estacionamento e o troco
class Estacionamento {
    // Define o tempo com base no valor inserido, de acordo com faixas fixas
    calcularTempo(valor) {
        if (valor < 1) return 0;               // Menos que R$1 não dá direito a tempo
        if (valor >= 3) return 120;            // R$3 ou mais dá o tempo máximo
        if (valor >= 1.75) return 60;          // Entre R$1,75 e R$3 dá 60 min
        if (valor >= 1.00) return 30;          // Entre R$1,00 e R$1,75 dá 30 min
        return 0;
    }

    // Calcula o troco com base na faixa de tempo comprada
    calcularTroco(valor) {
        if (valor < 1) return 0;

        let custo = 0;
        if (valor >= 3) custo = 3.00;
        else if (valor >= 1.75) custo = 1.75;
        else if (valor >= 1.00) custo = 1.00;

        // Garante precisão de 2 casas decimais no troco
        return +(valor - custo).toFixed(2);
    }
}

// Instancia das classes (objetos principais do sistema)
const caixa = new Caixa();
const estacionamento = new Estacionamento();

// Evento acionado ao enviar o formulário
document.getElementById("parquimetroForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Impede o recarregamento da página

    // Pega o valor digitado no input
    const valorInput = parseFloat(document.getElementById("valor").value);

    // Validação básica: verificar se o valor é válido e maior que 0
    if (isNaN(valorInput) || valorInput <= 0) {
        alert("Insira um valor válido maior que R$ 0,00!");
        return;
    }

    // Verifica se o valor é insuficiente (menos que R$1)
    if (valorInput < 1) {
        alert("Valor insuficiente! O valor deve ser no mínimo R$ 1,00.");
        document.getElementById("tempo").textContent = `Tempo: 0 minutos`;
        document.getElementById("troco").textContent = `Troco: R$ 0,00`;
        caixa.limparValor();
        document.getElementById("valor").value = ""; // Limpa o input
        return;
    }

    // Insere o valor no objeto caixa
    caixa.inserirValor(valorInput);
    caixa.mostrarValor();

    // Calcula tempo e troco com base no valor
    const tempo = estacionamento.calcularTempo(caixa.valorInserido);
    const troco = estacionamento.calcularTroco(caixa.valorInserido);

    // Atualiza os resultados na interface
    document.getElementById("tempo").textContent = `Tempo: ${tempo} minutos`;
    document.getElementById("troco").textContent = `Troco: R$ ${troco.toFixed(2)}`;

    // Limpa os dados para nova inserção
    caixa.limparValor();
    document.getElementById("valor").value = ""; // Limpa o campo de input
});
