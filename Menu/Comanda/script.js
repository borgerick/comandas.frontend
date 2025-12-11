function abrirAdicionar() {
    window.location.href = "./Adicionar_Comanda/index.html";
}

function abrirEditar() {
    window.location.href = "./Editar_Comanda/index.html";
}

function abrirExcluir() {
    window.location.href = "./Excluir_Comanda/index.html";
}
// Build list using API
document.addEventListener('DOMContentLoaded', async function () {
    const container = document.getElementById('tabela-area');
    if (!container) return;
    container.innerHTML = '<p>Carregando comandas...</p>';
    try {
        const comandas = await Api.getComandas();
        if (!Array.isArray(comandas) || comandas.length === 0) {
            container.innerHTML = '<p>Nenhuma comanda encontrada.</p>';
            return;
        }
        const table = document.createElement('table');
        table.className = 'table';
        table.innerHTML = `
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Numero Mesa</th>
                    <th>Nome Cliente</th>
                    <th>Itens</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;
        const tbody = table.querySelector('tbody');
        comandas.forEach(c => {
            const itensTexto = Array.isArray(c.cardapioItemIds) ? c.cardapioItemIds.join(', ') : '-';
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${c.id ?? '-'}</td>
                <td>${c.numeroMesa ?? '-'}</td>
                <td>${c.nomeCliente ?? '-'}</td>
                <td>${itensTexto}</td>
                <td>
                    <button class="btn small" onclick="window.location.href='./Editar_Comanda/index.html?id=${c.id}'">Editar</button>
                    <button class="btn small btn-excluir" onclick="window.location.href='./Excluir_Comanda/index.html?id=${c.id}'">Excluir</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
        container.innerHTML = '';
        container.appendChild(table);
    } catch (err) {
        container.innerHTML = `<p class='error'>Erro ao carregar comandas: ${err.message}</p>`;
        console.error(err);
    }
});
