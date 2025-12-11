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

  try {
    const payload = {
      nome,
      email: login,
      senha
    };
    await Api.createUsuario(payload);
    alert("Usuário adicionado com sucesso!");
    window.location.href = "../index.html";
  } catch (err) {
    console.error(err);
    alert('Erro ao adicionar usuário: ' + err.message);
  }
}

function voltar() {
  window.location.href = "../index.html";
}
