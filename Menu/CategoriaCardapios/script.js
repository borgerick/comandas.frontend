function abrirAdicionar() {
    window.location.href = './Adicionar_Categoria/index.html';
}

function abrirEditar(id) {
    if (id === undefined) {
        window.location.href = './Editar_Categoria/index.html';
    } else {
        window.location.href = `./Editar_Categoria/index.html?id=${id}`;
    }
}

function abrirExcluir(id) {
    if (id === undefined) {
        window.location.href = './Excluir_Categoria/index.html';
    } else {
        window.location.href = `./Excluir_Categoria/index.html?id=${id}`;
    }
}

// Render list from API
document.addEventListener('DOMContentLoaded', async function () {
    const container = document.getElementById('tabela-area');
    container.innerHTML = '<p>Carregando categorias...</p>';
    try {
        const categorias = await Api.getCategorias();
        if (!Array.isArray(categorias) || categorias.length === 0) {
            container.innerHTML = '<p>Nenhuma categoria encontrada.</p>';
            return;
        }
        const table = document.createElement('table');
        table.className = 'table';
        table.innerHTML = `
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;
        const tbody = table.querySelector('tbody');
        categorias.forEach(c => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${c.id ?? '-'}</td>
                <td>${c.nome ?? '-'}</td>
                <td>${c.descricao ?? '-'}</td>
                <td>
                    <button class="btn small" onclick="abrirEditar(${c.id})">Editar</button>
                    <button class="btn small btn-excluir" onclick="abrirExcluir(${c.id})">Excluir</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
        container.innerHTML = '';
        container.appendChild(table);
    } catch (err) {
        container.innerHTML = '<p class="error">Erro: ' + err.message + '</p>';
        console.error(err);
    }
});
