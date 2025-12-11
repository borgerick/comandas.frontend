async function salvar() {
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
        await Api.createReserva(payload);
        alert('Reserva adicionada com sucesso!');
        window.location.href = '../index.html';
    } catch (err) {
        console.error(err);
        alert('Erro ao adicionar reserva: ' + err.message);
    }
}
