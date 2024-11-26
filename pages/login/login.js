document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Simulação de verificação de login (isso pode ser substituído por uma API real)
    if (email === "acesso@cupcakebr.com" && senha === "1234") {
        // Salvar o estado de login no localStorage
        localStorage.setItem('usuarioLogado', JSON.stringify({ email: email }));

        window.location.href = "../produtos/produtos.html"; // Redireciona para a página de produtos após login
    } else {
        alert("E-mail ou senha inválidos.");
    }
});
