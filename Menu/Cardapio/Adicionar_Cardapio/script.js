let cardapio = JSON.parse(localStorage.getItem("cardapio")) || [];

function adicionarItem() {
    const nome = document.getElementById("nome").value;
    const preco = document.getElementById("preco").value;
    const preparo = document.getElementById("preparo").value;
    const categoria = document.getElementById("categoria").value;

    if (!nome || !preco || !preparo || !categoria) {
        alert("Preencha todos os campos!");
        return;
    }

    cardapio.push({ nome, preco, preparo, categoria });
    localStorage.setItem("cardapio", JSON.stringify(cardapio));

    alert("Item adicionado com sucesso!");
    window.location.href = "../index.html";
}
