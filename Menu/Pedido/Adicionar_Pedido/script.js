const PEDIDOS_KEY = "pedidos";

function salvarPedido() {
    const mesa = document.getElementById("mesa").value.trim();
    const cliente = document.getElementById("cliente").value.trim();
    const itens = document.getElementById("itens").value.trim();
    const total = document.getElementById("total").value.trim();

    if (!mesa || !cliente || !itens || !total) {
        alert("Preencha todos os campos!");
        return;
    }

    let pedidos = JSON.parse(localStorage.getItem(PEDIDOS_KEY)) || [];

    pedidos.push({ mesa, cliente, itens, total });

    localStorage.setItem(PEDIDOS_KEY, JSON.stringify(pedidos));

    alert("Pedido adicionado com sucesso!");
    window.location.href = "../index.html";
}

function voltar() {
    window.location.href = "../index.html";
}
