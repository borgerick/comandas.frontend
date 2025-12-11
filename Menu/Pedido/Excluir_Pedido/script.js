const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
    alert("Pedido inválido.");
    window.location.href = "../index.html";
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const p = await Api.getPedidoCozinha(id);
        document.getElementById("mesa").value = p.comandaId ?? '';
        document.getElementById("cliente").value = '';
        document.getElementById("itens").value = Array.isArray(p.itens) ? p.itens.map(i => i.comandaItemId ?? i.id ?? '').join(',') : '';
        document.getElementById("total").value = '';
    } catch (err) {
        console.error(err);
        alert('Erro ao carregar pedido: ' + err.message);
    }
});

async function excluir() {
    if (!confirm("Tem certeza que deseja excluir este pedido?")) return;
    try {
        await Api.deletePedidoCozinha(id);
        alert('Pedido excluído!');
        window.location.href = '../index.html';
    } catch (err) {
        console.error(err);
        alert('Erro ao excluir pedido: ' + err.message);
    }
}

function voltar() {
    window.location.href = "../index.html";
}
