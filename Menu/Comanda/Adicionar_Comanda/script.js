let cardapioItemsMap = {};
let selectedItemIds = [];

async function loadCardapioOptions() {
    const select = document.getElementById('cardapioSelect');
    select.innerHTML = '<option value="">Carregando...</option>';
    try {
        const items = await Api.getCardapioItems();
        select.innerHTML = '<option value="">-- Selecione um item --</option>';
        if (!Array.isArray(items) || items.length === 0) return;
        items.forEach(i => {
            // Only include items with a proper id
            if (i.id === undefined || i.id === null) return;
            const id = i.id;
            cardapioItemsMap[id] = i;
            const option = document.createElement('option');
            option.value = id;
            option.text = `${id} - ${i.titulo ?? i.descricao ?? 'Item'}`;
            select.appendChild(option);
        });
    } catch (err) {
        console.error(err);
        select.innerHTML = '<option value="">Erro carregando</option>';
    }
}

function renderSelectedItems() {
    const tbody = document.querySelector('#itensTable tbody');
    tbody.innerHTML = '';
    selectedItemIds.forEach((id, idx) => {
        const item = cardapioItemsMap[id] || { id, titulo: id };
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.id ?? id}</td>
            <td>${item.titulo ?? item.descricao ?? '-'}</td>
            <td><button class="btn small" onclick="removerItem(${idx})">Remover</button></td>
        `;
        tbody.appendChild(tr);
    });
}

function adicionarItemCardapio() {
    const select = document.getElementById('cardapioSelect');
    const id = select.value;
    if (!id) {
        alert('Selecione um item para adicionar');
        return;
    }
    // allow duplicates to represent multiple adds
    selectedItemIds.push(Number(id));
    renderSelectedItems();
}

function removerItem(index) {
    selectedItemIds.splice(index, 1);
    renderSelectedItems();
}

async function salvar() {
    const numero = document.getElementById('numeroMesa').value;
    const nomeCliente = document.getElementById('nomeCliente').value;

    if (!numero) {
        alert('Número da comanda é obrigatório');
        return;
    }
    if (selectedItemIds.length === 0) {
        if (!confirm('Nenhum item do cardápio foi adicionado. Deseja salvar mesmo assim?')) return;
    }
    try {
        const payload = {
            numeroMesa: Number(numero),
            nomeCliente: nomeCliente || null,
            cardapioItemIds: selectedItemIds
        };
        await Api.createComanda(payload);
        alert('Comanda adicionada com sucesso!');
        window.location.href = '../index.html';
    } catch (err) {
        console.error(err);
        alert('Erro ao salvar comanda: ' + err.message);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadCardapioOptions();
    renderSelectedItems();
});
