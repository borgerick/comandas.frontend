// Carrega o cardápio salvo no navegador
let cardapio = JSON.parse(localStorage.getItem("cardapio")) || [];

// Pega o ID enviado pela URL (ex: .../index.html?id=1)
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Se existir um ID válido, preenche os campos
if (id !== null && cardapio[id]) {
    document.getElementById("nome").value = cardapio[id].nome;
    document.getElementById("preco").value = cardapio[id].preco;
    document.getElementById("preparo").value = cardapio[id].preparo;
    document.getElementById("categoria").value = cardapio[id].categoria;
}

function excluir() {
    if (!confirm("Tem certeza que deseja excluir este item?")) return;

    // Remove o item do array
    cardapio.splice(id, 1);

    // Atualiza o localStorage
    localStorage.setItem("cardapio", JSON.stringify(cardapio));

    alert("Item excluído com sucesso!");

    // Volta para o cardápio
    window.location.href = "../index.html";
}
