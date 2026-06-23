const botao5 = document.getElementById("botao5");
const botao6 = document.getElementById("botao6");
const botao7 = document.getElementById("botao7");
const botao8 = document.getElementById("botao8");
const botao9 = document.getElementById("botao9");
const botao0 = document.getElementById("botao0");
const lista = document.getElementById("listaCarrinho2");

function addcarrinho(nome, preco) {
  const item = document.createElement("li");
  item.textContent = nome + " - R$" + preco;
  lista.appendChild(item);
}

botao5.addEventListener("click", function () {
  addcarrinho("Coxinha", 5);
});

botao6.addEventListener("click", function () {
  addcarrinho("Bolo de Coco", 4.5);
});

botao7.addEventListener("click", function () {
  addcarrinho("Trufa Sortida", 3);
});

botao8.addEventListener("click", function () {
  addcarrinho("Coca-Cola", 3.5);
});

botao9.addEventListener("click", function () {
  addcarrinho("Suco de Laranja", 7);
});

botao0.addEventListener("click", function () {
  addcarrinho("Pastel", 6);
});

const carrinho = document.getElementById("carrinho2");
const btn = document.getElementById("btnCarrinho2");

btn.addEventListener("click", function () {
  carrinho.classList.toggle("ativar");
});

