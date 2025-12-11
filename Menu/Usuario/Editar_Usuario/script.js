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
    document.getElementById("cargo").value = ""; // cargo is not in API
    document.getElementById("senha").value = u.senha || "";
  } catch (err) {
    console.error(err);
    alert('Erro ao carregar usuário: ' + err.message);
  }
});

async function salvarEdicao() {
  const nome = document.getElementById("nome").value.trim();
  const login = document.getElementById("login").value.trim();
  const senha = document.getElementById("senha").value;

  if (!nome || !login) {
    alert("Preencha os campos obrigatórios (Nome, Email).");
    return;
  }
  try {
    const payload = { nome, email: login, senha };
    await Api.updateUsuario(id, payload);
    alert("Usuário atualizado!");
    window.location.href = "../index.html";
  } catch (err) {
    console.error(err);
    alert('Erro ao atualizar usuário: ' + err.message);
  }
}

function voltar() {
  window.location.href = "../index.html";
}
