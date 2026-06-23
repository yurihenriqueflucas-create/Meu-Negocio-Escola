const pausar = document.getElementById("pause");
 
if (pausar) {
  pausar.addEventListener("click", function () {
    if (pausar.innerText === "⏸ Pausar Loja") {
      pausar.innerText = "▶ Loja Pausada";
      alert("Você pausou a loja.");
    } else {
      pausar.innerText = "⏸ Pausar Loja";
      alert("Loja retomada.");
    }
  });
}
 
const config = document.getElementById("configurar");
 
if (config) {
  config.addEventListener("click", function () {
    window.location.href = "configurar.html";
  });
}
 
const botao = document.getElementById("btnEntrar");
 
if (botao) {
  botao.addEventListener("click", async function () {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const erro = document.getElementById("erro");
 
    erro.innerText = "";
 
    if (!email || !senha) {
      erro.innerText = "Preencha todos os campos!";
      return;
    }
 
    try {
      const resposta = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });
 
      const dados = await resposta.json();
 
      if (dados.usuario) {
        localStorage.setItem("logado", "true");
        localStorage.setItem("usuarioId", dados.usuario.id);
        localStorage.setItem("usuarioNome", dados.usuario.nome);
        localStorage.setItem("tipo", dados.usuario.tipo);
 
        // Guarda o id_empreendedor também, se o usuário for um empreendedor
        if (dados.usuario.id_empreendedor) {
          localStorage.setItem("idEmpreendedor", dados.usuario.id_empreendedor);
        }
 
        window.location.href = "index.html";
      } else {
        erro.innerText = dados.erro || "Email ou senha inválidos!";
      }
    } catch (err) {
      console.log(err);
      erro.innerText = "Erro no servidor.";
    }
  });
}