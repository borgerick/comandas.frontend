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

async function confirmarExclusao() {
    if (!confirm('Confirma exclusão da mesa?')) return;
    try {
        await Api.deleteMesa(id);
        window.location.href = '../index.html';
    } catch (err) {
        console.error(err);
        alert('Erro ao excluir mesa: ' + err.message);
    }
}
