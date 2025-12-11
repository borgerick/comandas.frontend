function fazerLogin() {
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;
    const erro = document.getElementById("erro");
    // Call the API login endpoint
    Api.loginUsuario({ email: usuario, senha }).then(() => {
        window.location.href = "../Menu/index.html";
    }).catch(err => {
        console.error(err);
        erro.textContent = 'Usuário ou senha incorretos!';
    });
}
