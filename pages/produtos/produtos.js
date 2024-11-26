console.log("Arquivo produtos.js carregado");  // Verifique se o script foi carregado

// Função para verificar se o usuário está logado
function verificarLogin() {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (usuario) {
        // Se o usuário estiver logado, exibe o botão de logout
        logoutBtn.style.display = 'block';
        // Adiciona o evento de logout
        logoutBtn.addEventListener('click', logout);

        // Atualiza o número de itens no carrinho
        atualizarCarrinho();
    } else {
        // Se não estiver logado, o botão de logout fica invisível
        logoutBtn.style.display = 'none';
    }
}

// Função de logout
function logout() {
    // Limpa os dados de login e redireciona para a página de login
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('carrinho');
    window.location.href = "../login/login.html";
}

// Chama a função para verificar login ao carregar a página
window.addEventListener('load', verificarLogin);

// Função para atualizar o número de itens no carrinho
function atualizarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const numeroCarrinho = document.getElementById('numeroCarrinho');
    
    // Calcula o total de itens no carrinho (somando as quantidades)
    const totalItens = carrinho.reduce((soma, produto) => soma + produto.quantidade, 0);
    
    if (totalItens > 0) {
        numeroCarrinho.style.display = 'inline';  // Exibe o número do carrinho
        numeroCarrinho.textContent = totalItens;  // Atualiza com o total de itens
    } else {
        numeroCarrinho.style.display = 'none';  // Esconde o número se o carrinho estiver vazio
    }
}

// Função para verificar se o usuário está logado antes de adicionar ao carrinho
function adicionarAoCarrinho(event) {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));

    if (!usuario) {
        // Exibe o alerta se o usuário não estiver logado
        const alertaLogin = document.getElementById('alertaLogin');
        alertaLogin.style.display = 'block';

        setTimeout(() => {
            alertaLogin.style.display = 'none';
        }, 2000);

        return;
    }

    console.log('Botão de adicionar clicado'); // Verificação de clique

    // Recupera os dados do produto, incluindo a URL da imagem
    const produto = {
        nome: event.target.parentElement.querySelector('h2').textContent,
        preco: parseFloat(event.target.parentElement.querySelector('p').textContent.replace('R$', '').trim()),
        imagem: event.target.parentElement.querySelector('img').src, // Captura a URL da imagem
        quantidade: 1 // Adiciona a quantidade inicial
    };

    // Recupera o carrinho do localStorage e garante que seja um array
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    console.log('Carrinho antes de adicionar o produto:', carrinho); // Verificação do estado do carrinho

    // Verifica se o produto já existe no carrinho
    const produtoExistente = carrinho.find(item => item.nome === produto.nome);
    if (produtoExistente) {
        produtoExistente.quantidade++; // Incrementa a quantidade
    } else {
        carrinho.push(produto); // Adiciona o novo produto
    }

    console.log('Carrinho após adicionar o produto:', carrinho); // Verificação após adição

    // Salva o carrinho atualizado no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Atualiza o número de itens no carrinho
    atualizarCarrinho();
}


// Adiciona evento de click nos botões de adicionar
document.querySelectorAll('.adicionar').forEach(button => {
    button.addEventListener('click', adicionarAoCarrinho);
});
