async function salvarPedido() {
    const mesa = document.getElementById("mesa").value.trim();
    const cliente = document.getElementById("cliente").value.trim();
    const itens = document.getElementById("itens").value.trim();
    const total = document.getElementById("total").value.trim();

    if (!mesa || !cliente || !itens) {
        alert("Preencha os campos obrigatórios!");
        return;
    }

    // convierta itens separated by commas into array of comandaItemId
    const itensArray = itens.split(',').map(s => Number(s.trim())).filter(n => !isNaN(n));
    const payload = {
        // using 'mesa' as ComandaId for lack of explicit form mapping
        comandaId: Number(mesa),
        itens: itensArray.map(id => ({ comandaItemId: id }))
    };
    try {
        await Api.createPedidoCozinha(payload);
        alert("Pedido adicionado com sucesso!");
        window.location.href = "../index.html";
    } catch (err) {
        console.error(err);
        alert('Erro ao adicionar pedido: ' + err.message);
    }
}

function voltar() {
    window.location.href = "../index.html";
}
