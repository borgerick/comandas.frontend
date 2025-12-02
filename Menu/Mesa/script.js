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
document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById("tabela-area");
    const mesas = JSON.parse(localStorage.getItem("mesas")) || [];

    if (mesas.length === 0) {
        container.innerHTML = '<p>Não há mesas cadastradas. Clique em "Adicionar Mesa" para criar.</p>';
        return;
    }

    // Cria uma tabela simples com Número / Capacidade / Status / Ações
    const table = document.createElement("table");
    table.className = "table";
    table.innerHTML = `
        <thead>
            <tr>
                <th>Nº Mesa</th>
                <th>Capacidade</th>
                <th>Status</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    `;

    const tbody = table.querySelector("tbody");
    mesas.forEach((m, index) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${m.numeroMesa ?? index}</td>
            <td>${m.capacidade ?? "-"}</td>
            <td>${m.status ?? "livre"}</td>
            <td>
                <button class="btn small" onclick="window.location.href='./Editar_Mesa/index.html?id=${index}'">Editar</button>
                <button class="btn small btn-excluir" onclick="window.location.href='./Excluir_Mesa/index.html?id=${index}'">Excluir</button>
            </td>
        `;

        tbody.appendChild(tr);
    });

    container.innerHTML = "";
    container.appendChild(table);
});
