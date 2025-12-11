const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
    alert("Mesa inválida");
    window.location.href = "../index.html";
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const mesa = await Api.getMesa(id);
        document.getElementById("numero").value = mesa.numeroMesa ?? '';
        document.getElementById("lugares").value = mesa.situacaoMesa ?? '';
    } catch (err) {
        console.error(err);
        alert('Erro ao carregar mesa: ' + err.message);
    }
});

async function salvarEdicao() {
    const payload = {
        numeroMesa: Number(document.getElementById("numero").value),
        situacaoMesa: Number(document.getElementById("lugares").value)
    };
    try {
        await Api.updateMesa(id, payload);
        window.location.href = '../index.html';
    } catch (err) {
        console.error(err);
        alert('Erro ao atualizar mesa: ' + err.message);
    }
}
