async function salvarMesa() {
    const numero = document.getElementById("numero").value;
    const lugares = document.getElementById("lugares").value;

    if (!numero || !lugares) {
        alert("Preencha todos os campos!");
        return;
    }

    const payload = {
        numeroMesa: Number(numero),
        situacaoMesa: Number(lugares)
    };

    try {
        await Api.createMesa(payload);
        window.location.href = '../index.html';
    } catch (err) {
        console.error(err);
        alert('Erro ao salvar mesa: ' + err.message);
    }
}
