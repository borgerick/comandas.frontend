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
  document.getElementById("senha").value = u.senha || "";
});

function salvarEdicao() {
  const nome = document.getElementById("nome").value.trim();
  const login = document.getElementById("login").value.trim();
  const cargo = document.getElementById("cargo").value.trim();
  const senha = document.getElementById("senha").value;

  if (!nome || !login || !cargo) {
    alert("Preencha os campos obrigatórios (Nome, Login, Cargo).");
    return;
  }

  usuarios[id] = { nome, login, cargo, senha };
  localStorage.setItem(USUARIOS_KEY, JSON.stringify(usuarios));
  alert("Usuário atualizado!");
  window.location.href = "../index.html";
}

function voltar() {
  window.location.href = "../index.html";
}
