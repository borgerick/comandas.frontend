const params = new URLSearchParams(window.location.search);
const id = params.get('id');

if (!id) {
    alert('ID inválido');
    window.location.href = '../index.html';
}

async function load() {
    try {
        const cat = await Api.getCategoria(id);
        document.getElementById('nome').value = cat.nome || '';
        document.getElementById('descricao').value = cat.descricao || '';
    } catch (err) {
        console.error(err);
        alert('Erro ao carregar: ' + err.message);
    }
}

async function excluir() {
    if (!confirm('Confirma exclusão?')) return;
    try {
        await Api.deleteCategoria(id);
        alert('Categoria excluída');
        window.location.href = '../index.html';
    } catch (err) {
        console.error(err);
        alert('Erro ao excluir: ' + err.message);
    }
}

document.addEventListener('DOMContentLoaded', load);
