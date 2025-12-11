const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
    alert("Pedido não encontrado.");
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

async function salvarEdicao() {
    const mesa = document.getElementById("mesa").value.trim();
    const itens = document.getElementById("itens").value.trim();

    const itensArray = itens.split(',').map(s => Number(s.trim())).filter(n => !isNaN(n));
    const payload = { comandaId: Number(mesa), itens: itensArray.map(id => ({ comandaItemId: id })) };
    try {
        await Api.updatePedidoCozinha(id, payload);
        alert("Pedido atualizado!");
        window.location.href = "../index.html";
    } catch (err) {
        console.error(err);
        alert('Erro ao atualizar pedido: ' + err.message);
    }
}

function voltar() {
    window.location.href = "../index.html";
}
