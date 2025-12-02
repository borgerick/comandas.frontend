let mesas = JSON.parse(localStorage.getItem("mesas")) || [];

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (id === null) {
    alert("Mesa inválida");
    window.location.href = "../index.html";
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("numero").value = mesas[id].numero;
    document.getElementById("lugares").value = mesas[id].lugares;
});

function salvarEdicao() {
    mesas[id].numero = document.getElementById("numero").value;
    mesas[id].lugares = document.getElementById("lugares").value;

    localStorage.setItem("mesas", JSON.stringify(mesas));

    window.location.href = "../index.html";
}
