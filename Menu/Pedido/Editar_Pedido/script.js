const PEDIDOS_KEY = "pedidos";
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

let pedidos = JSON.parse(localStorage.getItem(PEDIDOS_KEY)) || [];

if (id === null || !pedidos[id]) {
    alert("Pedido não encontrado.");
    window.location.href = "../index.html";
}

document.addEventListener("DOMContentLoaded", () => {
    const p = pedidos[id];

    document.getElementById("mesa").value = p.mesa;
    document.getElementById("cliente").value = p.cliente;
    document.getElementById("itens").value = p.itens;
    document.getElementById("total").value = p.total;
});

function salvarEdicao() {
    pedidos[id] = {
        mesa: document.getElementById("mesa").value.trim(),
        cliente: document.getElementById("cliente").value.trim(),
        itens: document.getElementById("itens").value.trim(),
        total: document.getElementById("total").value.trim()
    };

    localStorage.setItem(PEDIDOS_KEY, JSON.stringify(pedidos));

    alert("Pedido atualizado!");
    window.location.href = "../index.html";
}

function voltar() {
    window.location.href = "../index.html";
}
