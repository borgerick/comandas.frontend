const PEDIDOS_KEY = "pedidos";
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

let pedidos = JSON.parse(localStorage.getItem(PEDIDOS_KEY)) || [];

if (id === null || !pedidos[id]) {
    alert("Pedido inválido.");
    window.location.href = "../index.html";
}

document.addEventListener("DOMContentLoaded", () => {
    const p = pedidos[id];

    document.getElementById("mesa").value = p.mesa;
    document.getElementById("cliente").value = p.cliente;
    document.getElementById("itens").value = p.itens;
    document.getElementById("total").value = p.total;
});

function excluir() {
    if (!confirm("Tem certeza que deseja excluir este pedido?")) return;

    pedidos.splice(id, 1);
    localStorage.setItem(PEDIDOS_KEY, JSON.stringify(pedidos));

    alert("Pedido excluído!");
    window.location.href = "../index.html";
}

function voltar() {
    window.location.href = "../index.html";
}
