// key localStorage
const USUARIOS_KEY = "usuarios";

function salvarUsuario() {
  const nome = document.getElementById("nome").value.trim();
  const login = document.getElementById("login").value.trim();
  const cargo = document.getElementById("cargo").value.trim();
  const senha = document.getElementById("senha").value;

  if (!nome || !login || !cargo || !senha) {
    alert("Preencha todos os campos!");
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem(USUARIOS_KEY)) || [];

  // opcional: checar login duplicado
  const existe = usuarios.some(u => u.login === login);
  if (existe) {
    if (!confirm("Já existe um usuário com esse login. Deseja continuar e salvar mesmo assim?")) return;
  }

  usuarios.push({ nome, login, cargo, senha });
  localStorage.setItem(USUARIOS_KEY, JSON.stringify(usuarios));

  alert("Usuário adicionado com sucesso!");
  window.location.href = "../index.html";
}

function voltar() {
  window.location.href = "../index.html";
}
