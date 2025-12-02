const USUARIOS_KEY = "usuarios";
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

let usuarios = JSON.parse(localStorage.getItem(USUARIOS_KEY)) || [];

if (id === null || !usuarios[id]) {
  alert("Usuário inválido ou não encontrado.");
  window.location.href = "../index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const u = usuarios[id];
  document.getElementById("nome").value = u.nome || "";
  document.getElementById("login").value = u.login || "";
  document.getElementById("cargo").value = u.cargo || "";
});

function confirmarExclusao() {
  if (!confirm("Tem certeza que deseja excluir este usuário?")) return;
  usuarios.splice(id, 1);
  localStorage.setItem(USUARIOS_KEY, JSON.stringify(usuarios));
  alert("Usuário excluído!");
  window.location.href = "../index.html";
}

function voltar() {
  window.location.href = "../index.html";
}
