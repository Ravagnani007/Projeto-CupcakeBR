// Função que será chamada quando o formulário for enviado
document.getElementById('checkoutForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Impede o envio do formulário padrão

    // Recupera os dados do formulário
    const banco = document.getElementById('banco').value;
    const agencia = document.getElementById('agencia').value;
    const conta = document.getElementById('conta').value;
    const titular = document.getElementById('titular').value;
    const cpf = document.getElementById('cpf').value;

    // Novos dados de recebimento
    const endereco = document.getElementById('endereco').value;
    const numeroCasa = document.getElementById('numeroCasa').value;
    const cidade = document.getElementById('cidade').value;

    // Verifica se o carrinho tem itens
    const carrinho = JSON.parse(localStorage.getItem("carrinho"));

    if (!carrinho || carrinho.length === 0) {
        alert("Carrinho vazio! Adicione produtos antes de finalizar a compra.");
        return;
    }

    // Salva os dados do pedido no LocalStorage (pode ser útil na página de confirmação)
    localStorage.setItem("pedido", JSON.stringify({
        banco: banco,
        agencia: agencia,
        conta: conta,
        titular: titular,
        cpf: cpf,
        endereco: endereco,
        numeroCasa: numeroCasa,
        cidade: cidade,
        itens: carrinho,
        data: new Date().toLocaleDateString(),
        valorTotal: calcularTotal(carrinho)  // Calcula o valor total
    }));

    // Redireciona para a página de confirmação de compra
    window.location.href = "../confirmacao/compra-confirmada.html";
});

// Função que calcula o valor total do carrinho
function calcularTotal(carrinho) {
    let total = 0;
    carrinho.forEach(produto => {
        total += produto.preco * produto.quantidade;
    });
    return total.toFixed(2);  // Retorna o valor com 2 casas decimais
}
