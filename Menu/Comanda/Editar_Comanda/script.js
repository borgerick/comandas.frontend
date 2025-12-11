async function editar() {
    const id = document.getElementById('idComanda').value;
    const novoNome = document.getElementById('novoNome').value;
    if (!id) {
        alert('Informe o ID da comanda.');
        return;
    }
    try {
        await Api.updateComanda(id, { nomeCliente: novoNome });
        alert('Comanda editada com sucesso!');
        window.location.href = '../index.html';
    } catch (err) {
        console.error(err);
        alert('Erro ao editar comanda: ' + err.message);
    }
}
