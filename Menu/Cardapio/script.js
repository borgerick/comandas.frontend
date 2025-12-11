function abrirAdicionar() {
    window.location.href = "./Adicionar_Cardapio/index.html";
}

function abrirEditar(id) {
    // If invoked without id, go to editing list page; otherwise pass id
    if (id === undefined) {
        window.location.href = "./Editar_Cardapio/index.html";
    } else {
        window.location.href = `./Editar_Cardapio/index.html?id=${id}`;
    }
}

function abrirExcluir(id) {
    if (id === undefined) {
        window.location.href = "./Excluir_Cardapio/index.html";
    } else {
        window.location.href = `./Excluir_Cardapio/index.html?id=${id}`;
    }
}

// Fill listing table by fetching from API
document.addEventListener('DOMContentLoaded', async function () {
    const container = document.getElementById('tabela-area');
    container.innerHTML = '<p>Carregando listagem...</p>';
    try {
        const items = await Api.getCardapioItems();
        if (!Array.isArray(items) || items.length === 0) {
            container.innerHTML = '<p>Nenhum item encontrado.</p>';
            return;
        }

        const table = document.createElement('table');
        table.className = 'table';
        table.innerHTML = `
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Descrição</th>
                    <th>Preço</th>
                    <th>Preparo</th>
                    <th>Categoria</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;

        const tbody = table.querySelector('tbody');
        items.forEach(item => {
            const tr = document.createElement('tr');
            const preco = item.preco !== undefined ? `R$ ${Number(item.preco).toFixed(2)}` : '-';
            tr.innerHTML = `
                <td>${item.id ?? '-'}</td>
                <td>${item.titulo ?? '-'}</td>
                <td>${item.descricao ?? '-'}</td>
                <td>${preco}</td>
                <td>${item.possuiPreparo ? 'Sim' : 'Não'}</td>
                <td>${item.categoriaCardapioId ?? '-'}</td>
                <td>
                    <button class="btn small" onclick="abrirEditar(${item.id})">Editar</button>
                    <button class="btn small btn-excluir" onclick="abrirExcluir(${item.id})">Excluir</button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        container.innerHTML = '';
        container.appendChild(table);
    } catch (err) {
        container.innerHTML = `<p class='error'>Erro ao carregar: ${err.message}</p>`;
        console.error(err);
    }
});
