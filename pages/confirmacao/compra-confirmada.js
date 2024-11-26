// Função para carregar os dados do pedido
function carregarDadosCompra() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    if (carrinho.length === 0) {
        // Se o carrinho estiver vazio, redireciona para a página de produtos
        window.location.href = "../produtos/produtos.html";
        return;
    }

    // Calcula o valor total da compra
    let total = 0;

    // Cria o ID do pedido (simulando um valor único)
    const idPedido = `#${Math.floor(Math.random() * 100000000)}`;

    // Exibe os detalhes do pedido
    const pedidoInfo = document.getElementById("pedido-info");
    pedidoInfo.innerHTML = `
        <p><strong>ID do Pedido:</strong> ${idPedido}</p>
        <p><strong>Data:</strong> ${new Date().toLocaleDateString()}</p>
    `;

    // Cria um container para listar os itens do carrinho
    const listaItens = document.createElement('div');
    listaItens.classList.add('itens-carrinho');
    
    // Exibe os itens do carrinho
    carrinho.forEach(produto => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.innerHTML = `
            <p><strong>Produto:</strong> ${produto.nome}</p>
            <p><strong>Quantidade:</strong> ${produto.quantidade}</p>
            <p><strong>Preço:</strong> R$ ${produto.preco.toFixed(2)}</p>
        `;
        listaItens.appendChild(itemElement);

        // Calcula o valor total da compra
        total += produto.preco * produto.quantidade;
    });

    // Adiciona a lista de itens ao container do pedido
    pedidoInfo.appendChild(listaItens);

    // Exibe o valor total
    const totalElement = document.createElement('p');
    totalElement.innerHTML = `<strong>Valor Total:</strong> R$ ${total.toFixed(2)}`;
    pedidoInfo.appendChild(totalElement);
}

// Chama a função ao carregar a página
carregarDadosCompra();

// Função para limpar o carrinho e voltar à página de produtos
function voltarLoja() {
    localStorage.removeItem("carrinho");  // Limpa o carrinho
    window.location.href = "../produtos/produtos.html";  // Redireciona para a página de produtos
}

// Adiciona o evento de clique ao botão "Voltar à Loja"
document.getElementById("voltar-loja").addEventListener("click", voltarLoja);
