async function salvar() {
    const nome = document.getElementById('nome').value.trim();
    const descricao = document.getElementById('descricao').value.trim();

    if (!nome) {
        alert('Nome é obrigatório');
        return;
    }

    const payload = { nome, descricao: descricao || null };
    try {
        await Api.createCategoria(payload);
        alert('Categoria adicionada com sucesso!');
        window.location.href = '../index.html';
    } catch (err) {
        console.error(err);
        alert('Erro ao adicionar categoria: ' + err.message);
    }
}
