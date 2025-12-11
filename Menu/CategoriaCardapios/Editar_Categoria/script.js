const params = new URLSearchParams(window.location.search);
const id = params.get('id');

document.addEventListener('DOMContentLoaded', async () => {
    if (!id) return;
    try {
        const cat = await Api.getCategoria(id);
        document.getElementById('nome').value = cat.nome || '';
        document.getElementById('descricao').value = cat.descricao || '';
    } catch (err) {
        console.error(err);
        alert('Erro ao carregar categoria: ' + err.message);
    }
});

async function salvarEdicao() {
    const nome = document.getElementById('nome').value.trim();
    const descricao = document.getElementById('descricao').value.trim();
    if (!id) return alert('ID ausente');
    if (!nome) return alert('Nome é obrigatório');
    try {
        await Api.updateCategoria(id, { nome, descricao: descricao || null });
        alert('Categoria atualizada com sucesso!');
        window.location.href = '../index.html';
    } catch (err) {
        console.error(err);
        alert('Erro ao atualizar: ' + err.message);
    }
}
