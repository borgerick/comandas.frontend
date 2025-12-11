const params = new URLSearchParams(window.location.search);
const id = params.get('id');

if (!id) {
    alert('ID inválido');
    window.location.href = '../index.html';
}

async function load() {
    try {
        const r = await Api.getReserva(id);
        document.getElementById('numeroMesa').value = r.numeroMesa || '';
        document.getElementById('nomeCliente').value = r.nomeCliente || '';
        document.getElementById('telefone').value = r.telefone || '';
        const d = r.dataHoraReserva ? new Date(r.dataHoraReserva).toISOString().slice(0, 16) : '';
        document.getElementById('dataHoraReserva').value = d;
    } catch (err) {
        console.error(err);
        alert('Erro ao carregar reserva: ' + err.message);
    }
}

async function excluir() {
    if (!confirm('Confirma exclusão?')) return;
    try {
        await Api.deleteReserva(id);
        alert('Reserva excluída');
        window.location.href = '../index.html';
    } catch (err) {
        console.error(err);
        alert('Erro ao excluir: ' + err.message);
    }
}

document.addEventListener('DOMContentLoaded', load);
