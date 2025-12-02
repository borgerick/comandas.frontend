let mesas = JSON.parse(localStorage.getItem("mesas")) || [];

function salvarMesa() {
    const numero = document.getElementById("numero").value;
    const lugares = document.getElementById("lugares").value;

    if (!numero || !lugares) {
        alert("Preencha todos os campos!");
        return;
    }

    mesas.push({ numero, lugares });
    localStorage.setItem("mesas", JSON.stringify(mesas));

    window.location.href = "../index.html";
}
