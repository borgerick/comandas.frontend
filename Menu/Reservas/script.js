function abrirAdicionar() {
    window.location.href = './Adicionar_Reserva/index.html';
}

function abrirEditar(id) {
    if (id === undefined) {
        window.location.href = './Editar_Reserva/index.html';
    } else {
        window.location.href = `./Editar_Reserva/index.html?id=${id}`;
    }
}

function abrirExcluir(id) {
    if (id === undefined) {
        window.location.href = './Excluir_Reserva/index.html';
    } else {
        window.location.href = `./Excluir_Reserva/index.html?id=${id}`;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('tabela-area');
    container.innerHTML = '<p>Carregando reservas...</p>';
    try {
        const reservas = await Api.getReservas();
        if (!Array.isArray(reservas) || reservas.length === 0) {
            container.innerHTML = '<p>Nenhuma reserva encontrada.</p>';
            return;
        }
        const table = document.createElement('table');
        table.className = 'table';
        table.innerHTML = `
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nº Mesa</th>
                    <th>Cliente</th>
                    <th>Telefone</th>
                    <th>Data</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;
        const tbody = table.querySelector('tbody');
        reservas.forEach(r => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${r.id ?? '-'}</td>
                <td>${r.numeroMesa ?? '-'}</td>
                <td>${r.nomeCliente ?? '-'}</td>
                <td>${r.telefone ?? '-'}</td>
                <td>${r.dataHoraReserva ?? '-'}</td>
                <td>
                    <button class="btn small" onclick="abrirEditar(${r.id})">Editar</button>
                    <button class="btn small btn-excluir" onclick="abrirExcluir(${r.id})">Excluir</button>
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
