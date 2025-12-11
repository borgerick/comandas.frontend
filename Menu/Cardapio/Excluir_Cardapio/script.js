// Pega o ID enviado pela URL (ex: .../index.html?id=1)
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function loadItem() {
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
}

async function excluir() {
    if (!confirm("Tem certeza que deseja excluir este item?")) return;
    try {
        await Api.deleteCardapioItem(id);
        alert("Item excluído com sucesso!");
        window.location.href = "../index.html";
    } catch (err) {
        console.error(err);
        alert("Erro ao excluir: " + err.message);
    }
}

document.addEventListener('DOMContentLoaded', loadItem);
