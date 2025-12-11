// Navegação para as telas específicas da Mesa
function abrirAdicionar() {
    window.location.href = "./Adicionar_Mesa/index.html";
}

function abrirEditar() {
    window.location.href = "./Editar_Mesa/index.html";
}

function abrirExcluir() {
    window.location.href = "./Excluir_Mesa/index.html";
}

// (Opcional) Função para exibir lista de mesas no placeholder.
// Se você quiser que a tabela já mostre dados do localStorage, descomente e adapte.
// Fetch list from API and render table
document.addEventListener("DOMContentLoaded", async function () {
    const container = document.getElementById("tabela-area");
    container.innerHTML = '<p>Carregando mesas...</p>';
    try {
        const mesas = await Api.getMesas();
        if (!Array.isArray(mesas) || mesas.length === 0) {
            container.innerHTML = '<p>Não há mesas cadastradas.</p>';
            return;
        }

        const table = document.createElement("table");
        table.className = "table";
        table.innerHTML = `
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Numero</th>
                    <th>Situação</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;

        const tbody = table.querySelector("tbody");
        mesas.forEach(m => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${m.id ?? '-'}</td>
                <td>${m.numeroMesa ?? '-'}</td>
                <td>${m.situacaoMesa ?? '-'}</td>
                <td>
                    <button class="btn small" onclick="window.location.href='./Editar_Mesa/index.html?id=${m.id}'">Editar</button>
                    <button class="btn small btn-excluir" onclick="window.location.href='./Excluir_Mesa/index.html?id=${m.id}'">Excluir</button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        container.innerHTML = "";
        container.appendChild(table);
    } catch (err) {
        container.innerHTML = `<p class='error'>Erro ao carregar mesas: ${err.message}</p>`;
        console.error(err);
    }
});
