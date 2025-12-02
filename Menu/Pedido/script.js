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

// Carregar pedidos armazenados no localStorage
document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("tabela-area");
    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

    if (pedidos.length === 0) {
        container.innerHTML = '<p>Não há pedidos cadastrados.</p>';
        return;
    }

    const table = document.createElement("table");
    table.className = "table";

    table.innerHTML = `
        <thead>
            <tr>
                <th>Nº Pedido</th>
                <th>Mesa</th>
                <th>Cliente</th>
                <th>Itens</th>
                <th>Total</th>
                <th>Status</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

    const tbody = table.querySelector("tbody");

    pedidos.forEach((p, index) => {
        const tr = document.createElement("tr");

        const itensTexto = Array.isArray(p.itens)
            ? p.itens.map(i => i.nome || i).join(", ")
            : "-";

        tr.innerHTML = `
            <td>${p.numeroPedido ?? index}</td>
            <td>${p.mesa ?? "—"}</td>
            <td>${p.cliente ?? "—"}</td>
            <td>${itensTexto}</td>
            <td>R$ ${(p.total ?? 0).toFixed(2)}</td>
            <td>${p.status ?? "pendente"}</td>
            <td>
                <button class="btn small" onclick="window.location.href='./Editar_Pedido/index.html?id=${index}'">Editar</button>
                <button class="btn small btn-excluir" onclick="window.location.href='./Excluir_Pedido/index.html?id=${index}'">Excluir</button>
            </td>
        `;

        tbody.appendChild(tr);
    });

    container.innerHTML = "";
    container.appendChild(table);
});
