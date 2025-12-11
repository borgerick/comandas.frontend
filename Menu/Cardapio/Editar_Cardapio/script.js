const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Preenche os campos ao abrir a tela
document.addEventListener('DOMContentLoaded', async function () {
    if (!id) return;
    try {
        const item = await Api.getCardapioItem(id);
        document.getElementById("nome").value = item.titulo || '';
        document.getElementById("preco").value = item.preco ?? '';
        document.getElementById("preparo").value = item.descricao || '';
        document.getElementById("categoria").value = item.categoriaCardapioId ?? '';
    } catch (err) {
        console.error(err);
        alert('Erro ao carregar item: ' + err.message);
    }
});

async function salvarEdicao() {
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
        await Api.updateCardapioItem(id, payload);
        alert('Item atualizado com sucesso!');
        window.location.href = '../index.html';
    } catch (err) {
        console.error(err);
        alert('Erro ao atualizar: ' + err.message);
    }
}
