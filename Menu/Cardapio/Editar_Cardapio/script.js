let cardapio = JSON.parse(localStorage.getItem("cardapio")) || [];

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Preenche os campos ao abrir a tela
if (id !== null && cardapio[id]) {
    document.getElementById("nome").value = cardapio[id].nome;
    document.getElementById("preco").value = cardapio[id].preco;
    document.getElementById("preparo").value = cardapio[id].preparo;
    document.getElementById("categoria").value = cardapio[id].categoria;
}

function salvarEdicao() {
    const nome = document.getElementById("nome").value;
    const preco = document.getElementById("preco").value;
    const preparo = document.getElementById("preparo").value;
    const categoria = document.getElementById("categoria").value;

    if (!nome || !preco || !preparo || !categoria) {
        alert("Preencha todos os campos!");
        return;
    }

    cardapio[id] = { nome, preco, preparo, categoria };
    localStorage.setItem("cardapio", JSON.stringify(cardapio));

    alert("Item editado com sucesso!");
    window.location.href = "../index.html";
}
