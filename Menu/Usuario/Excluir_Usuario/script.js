const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
  alert("Usuário inválido ou não encontrado.");
  window.location.href = "../index.html";
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const u = await Api.getUsuario(id);
    document.getElementById("nome").value = u.nome || "";
    document.getElementById("login").value = u.email || "";
    document.getElementById("cargo").value = "";
  } catch (err) {
    console.error(err);
    alert('Erro ao carregar usuário: ' + err.message);
  }
});

async function confirmarExclusao() {
  if (!confirm("Tem certeza que deseja excluir este usuário?")) return;
  try {
    await Api.deleteUsuario(id);
    alert("Usuário excluído!");
    window.location.href = "../index.html";
  } catch (err) {
    console.error(err);
    alert('Erro ao excluir: ' + err.message);
  }
}

function voltar() {
  window.location.href = "../index.html";
}
