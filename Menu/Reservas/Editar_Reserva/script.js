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

async function salvarEdicao() {
    const numeroMesa = Number(document.getElementById('numeroMesa').value);
    const nomeCliente = document.getElementById('nomeCliente').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const dataHoraReserva = document.getElementById('dataHoraReserva').value;

    if (!numeroMesa || !nomeCliente || !dataHoraReserva) {
        alert('Preencha os campos obrigatórios');
        return;
    }

    try {
        const payload = { numeroMesa, nomeCliente, telefone: telefone || null, dataHoraReserva };
        await Api.updateReserva(id, payload);
        alert('Reserva atualizada com sucesso!');
        window.location.href = '../index.html';
    } catch (err) {
        console.error(err);
        alert('Erro ao atualizar reserva: ' + err.message);
    }
}

document.addEventListener('DOMContentLoaded', load);
