// Navegação entre telas
function abrirAdicionar() {
    window.location.href = "./Adicionar_Pedido/index.html";
}

function abrirEditar() {
    window.location.href = "./Editar_Pedido/index.html";
}

function abrirExcluir() {
    window.location.href = "./Excluir_Pedido/index.html";
}

// Fetch orders from the API and render
document.addEventListener("DOMContentLoaded", async function () {
    const container = document.getElementById("tabela-area");
    container.innerHTML = '<p>Carregando pedidos...</p>';
    try {
        const pedidos = await Api.getPedidosCozinha();
        if (!Array.isArray(pedidos) || pedidos.length === 0) {
            container.innerHTML = '<p>Não há pedidos cadastrados.</p>';
            return;
        }

        const table = document.createElement("table");
        table.className = "table";
        table.innerHTML = `
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Comanda</th>
                    <th>Itens</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;

        const tbody = table.querySelector('tbody');
        pedidos.forEach(p => {
            const itensTexto = Array.isArray(p.itens) ? p.itens.map(i => i.comandaItemId || i.id || '-').join(', ') : '-';
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${p.id ?? '-'}</td>
                <td>${p.comandaId ?? '-'}</td>
                <td>${itensTexto}</td>
                <td>
                    <button class="btn small" onclick="window.location.href='./Editar_Pedido/index.html?id=${p.id}'">Editar</button>
                    <button class="btn small btn-excluir" onclick="window.location.href='./Excluir_Pedido/index.html?id=${p.id}'">Excluir</button>
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
