const params = new URLSearchParams(window.location.search);
const idFromQuery = params.get('id');

document.addEventListener('DOMContentLoaded', async () => {
    if (!idFromQuery) {
        alert('ID da comanda não informado.');
        window.location.href = '../index.html';
        return;
    }
    try {
        const comanda = await Api.getComanda(idFromQuery);
        document.getElementById('idComanda').value = comanda.id ?? idFromQuery;
        document.getElementById('numeroMesa').value = comanda.numeroMesa ?? '';
        document.getElementById('nomeCliente').value = comanda.nomeCliente ?? '';

        // load cardapio items and map names
        const allItems = await Api.getCardapioItems();
        const itemMap = {};
        if (Array.isArray(allItems)) allItems.forEach(i => { if (i.id !== undefined) itemMap[i.id] = i; });
        const ids = comanda.cardapioItemIds || [];
        const tbody = document.querySelector('#itensTable tbody');
        tbody.innerHTML = '';
        for (const itemId of ids) {
            const it = itemMap[itemId] || { id: itemId, titulo: '(nome não disponível)', preco: '' };
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${it.id}</td><td>${it.titulo ?? '-'}</td><td>${it.preco ?? '-'}</td>`;
            tbody.appendChild(tr);
        }
    } catch (err) {
        console.error(err);
        alert('Erro ao carregar comanda: ' + err.message);
        window.location.href = '../index.html';
    }
});

async function excluir() {
    const id = document.getElementById('idComanda').value || idFromQuery;
    if (!id) {
        alert('Informe o ID da comanda');
        return;
    }
    if (!confirm('Confirma exclusão da comanda (ID: ' + id + ')?')) return;
    const btn = document.querySelector('button.btn');
    if (btn) btn.disabled = true;
    try {
        await Api.deleteComanda(id);
        alert('Comanda excluída com sucesso!');
        window.location.href = '../index.html';
    } catch (err) {
        console.error(err);
        alert('Erro ao excluir comanda: ' + err.message);
        if (btn) btn.disabled = false;
    }
}
