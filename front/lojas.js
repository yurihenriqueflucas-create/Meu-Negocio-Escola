const API_URL = "/api/lojas";

async function carregarLojas() {
  const lista = document.getElementById("lojasList");
  const empty = document.getElementById("emptyMessage");

  lista.innerHTML = "";
  empty.textContent = "";

  try {
    const resposta = await fetch(API_URL);

    if (!resposta.ok) {
      throw new Error("Erro na resposta do servidor");
    }

    const lojas = await resposta.json();

    if (lojas.length === 0) {
      empty.textContent = "Nenhuma loja cadastrada.";
      return;
    }

    lojas.forEach((loja) => {
      const card = document.createElement("div");
      card.classList.add("loja-card");

      const urlFoto = loja.foto_logo
        ? `http://localhost:3000${loja.foto_logo}`
        : null;

      card.innerHTML = `
                ${urlFoto ? `<img src="${urlFoto}" alt="${loja.nome}" style="max-width:100px;">` : ""}
                <h3>${loja.nome}</h3>
                <p>${loja.descricao ?? ""}</p>
                <p>${loja.horario_funcionamento ?? ""}</p>
            `;

      lista.appendChild(card);
    });
  } catch (erro) {
    console.error("Erro ao carregar lojas:", erro);
    empty.textContent = "Erro ao carregar lojas. Tente novamente.";
  }
}

async function criarLoja() {
  const nome = document.getElementById("nomeLoja").value;
  const descricao = document.getElementById("descricaoLoja").value;
  const hor_func = document.getElementById("hor_func").value;
  const foto_logo = document.getElementById("foto_logo").value;

  if (!nome || !descricao || !hor_func) {
    alert("Preencha todos os campos.");
    return;
  }

  try {
    const resposta = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome,
        descricao,
        horario_funcionamento: hor_func,
        foto_logo,
        ativa: "true",
      }),
    });

    if (!resposta.ok) {
      throw new Error("Erro ao criar loja");
    }

    document.getElementById("nomeLoja").value = "";
    document.getElementById("descricaoLoja").value = "";
    document.getElementById("hor_func").value = "";
    document.getElementById("foto_logo").value = "";

    await carregarLojas();
  } catch (erro) {
    console.error("Erro ao criar loja:", erro);
    alert("Erro ao cadastrar loja. Tente novamente.");
  }
}

carregarLojas();
