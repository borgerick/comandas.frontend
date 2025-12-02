let cardapio = JSON.parse(localStorage.getItem("cardapio")) || [];

function adicionarItem() {
  const nome = document.getElementById("nome").value;
  const preco = document.getElementById("preco").value;
  const preparo = document.getElementById("preparo").value;
  const categoria = document.getElementById("categoria").value;

  if (!nome || !preco || !preparo || !categoria) {
    alert("Preencha todos os campos!");
    return;
  }

  cardapio.push({ nome, preco, preparo, categoria });
  localStorage.setItem("cardapio", JSON.stringify(cardapio));

  document.getElementById("nome").value = "";
  document.getElementById("preco").value = "";
  document.getElementById("preparo").value = "";
  document.getElementById("categoria").value = "";

  mostrarItens();
}

function mostrarItens() {
  const tbody = document.querySelector("#tabela tbody");
  tbody.innerHTML = "";
  cardapio.forEach(item => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.nome}</td>
      <td>R$ ${item.preco}</td>
      <td>${item.preparo}</td>
      <td>${item.categoria}</td>
    `;
    tbody.appendChild(tr);
  });
}

mostrarItens();
