// Navegação entre telas
function abrirAdicionar() {
    window.location.href = "./Adicionar_Usuario/index.html";
}

function abrirEditar() {
    window.location.href = "./Editar_Usuario/index.html";
}

function abrirExcluir() {
    window.location.href = "./Excluir_Usuario/index.html";
}

// Carrega usuários armazenados no localStorage
document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("tabela-area");
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (usuarios.length === 0) {
        container.innerHTML = '<p>Não há usuários cadastrados.</p>';
        return;
    }

    const table = document.createElement("table");
    table.className = "table";

    table.innerHTML = `
        <thead>
            <tr>
                <th>Nome</th>
                <th>Cargo</th>
                <th>Usuário</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

    const tbody = table.querySelector("tbody");

    usuarios.forEach((u, index) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${u.nome}</td>
            <td>${u.cargo}</td>
            <td>${u.login}</td>
            <td>
                <button class="btn small" onclick="window.location.href='./Editar_Usuario/index.html?id=${index}'">Editar</button>
                <button class="btn small btn-excluir" onclick="window.location.href='./Excluir_Usuario/index.html?id=${index}'">Excluir</button>
            </td>
        `;

        tbody.appendChild(tr);
    });

    container.innerHTML = "";
    container.appendChild(table);
});
