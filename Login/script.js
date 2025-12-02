function fazerLogin() {
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;
    const erro = document.getElementById("erro");

    if (usuario === "admin" && senha === "admin") {
        window.location.href = "../Menu/index.html";
    } else {
        erro.textContent = "Usuário ou senha incorretos!";
    }
}
