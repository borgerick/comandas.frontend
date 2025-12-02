let cardapio = JSON.parse(localStorage.getItem("cardapio")) || [];

function mostrarItens() {
  const tbody = document.querySelector("#tabela tbody");
  tbody.innerHTML = "";
  cardapio.forEach((item, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><input value="${item.nome}" id="nome-${i}"></td>
      <td><input type="number" value="${item.preco}" id="preco-${i}"></td>
      <td>
        <select id="preparo-${i}">
          <option ${item.preparo === "Sim" ? "selected" : ""}>Sim</option>
          <option ${item.preparo === "Não" ? "selected" : ""}>Não</option>
        </select>
      </td>
      <td><input value="${item.categoria}" id="categoria-${i}"></td>
      <td><button onclick="salvar(${i})">Salvar</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function salvar(i) {
  const nome = document.getElementById(`nome-${i}`).value;
  const preco = document.getElementById(`preco-${i}`).value;
  const preparo = document.getElementById(`preparo-${i}`).value;
  const categoria = document.getElementById(`categoria-${i}`).value;

  cardapio[i] = { nome, preco, preparo, categoria };
  localStorage.setItem("cardapio", JSON.stringify(cardapio));
  alert("Item atualizado com sucesso!");
}

mostrarItens();
