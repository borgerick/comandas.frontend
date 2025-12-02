let cardapio = JSON.parse(localStorage.getItem("cardapio")) || [];

function mostrarItens() {
  const tbody = document.querySelector("#tabela tbody");
  tbody.innerHTML = "";
  cardapio.forEach((item, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.nome}</td>
      <td>R$ ${item.preco}</td>
      <td>${item.preparo}</td>
      <td>${item.categoria}</td>
      <td><button onclick="excluir(${i})">Excluir</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function excluir(i) {
  if (confirm("Tem certeza que deseja excluir este item?")) {
    cardapio.splice(i, 1);
    localStorage.setItem("cardapio", JSON.stringify(cardapio));
    mostrarItens();
  }
}

mostrarItens();
