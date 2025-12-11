async function adicionarItem() {
    const nome = document.getElementById("nome").value;
    const preco = document.getElementById("preco").value;
    const preparo = document.getElementById("preparo").value;
    const categoria = document.getElementById("categoria").value;

    if (!nome || !preco) {
        alert("Preencha os campos obrigatórios: Nome e Preço!");
        return;
    }

    const payload = {
        titulo: nome,
        descricao: preparo || null,
        preco: Number(preco),
        possuiPreparo: !!(preparo && preparo.trim().length > 0),
        categoriaCardapioId: categoria ? Number(categoria) : null
    };

    try {
        await Api.createCardapioItem(payload);
        alert("Item adicionado com sucesso!");
        window.location.href = "../index.html";
    } catch (err) {
        console.error(err);
        alert('Erro ao adicionar item: ' + err.message);
    }
}
