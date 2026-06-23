// Este script ajusta os links do menu de navegação de acordo com o
// estado de login salvo no localStorage. Deve ser incluído em TODAS
// as páginas que têm a <nav class="navbar">.
//
// Regras:
// - Não logado: mostra "Login", "Cadastre-se" e "Seja um Empreendedor!"; esconde "Minha loja"
// - Logado, mas não é empreendedor: esconde "Login" e "Cadastre-se", mostra "Sair";
//   mantém "Seja um Empreendedor!" visível; esconde "Minha loja"
// - Logado E é empreendedor: esconde "Login", "Cadastre-se" e "Seja um Empreendedor!";
//   mostra "Minha loja" (apontando para imdequis.html) e "Sair"

document.addEventListener("DOMContentLoaded", function () {
    const logado = localStorage.getItem("logado") === "true";
    const tipo = localStorage.getItem("tipo");
    const idEmpreendedor = localStorage.getItem("idEmpreendedor");
    const ehEmpreendedor = tipo === "empreendedor" && idEmpreendedor;

    const navbar = document.querySelector(".navbar");
    if (!navbar) return; // página sem menu, não faz nada

    const linkLogin = navbar.querySelector('a[href="login.html"]');
    const linkCadastroAluno = navbar.querySelector('a[href="cadastroaluno.html"]');
    const linkCadastroEmpreendedor = navbar.querySelector(
        'a[href="cadastroempreendedor.html"]'
    );
    // O botão "Minha loja" pode estar dentro de um <button>, então
    // buscamos o elemento que contém o link (button ou o próprio <a>)
    const linkMinhaLojaInterno = navbar.querySelector('a[href="imdequis.html"], a[href="create.html"]');
    const botaoMinhaLoja = linkMinhaLojaInterno
        ? linkMinhaLojaInterno.closest("button") || linkMinhaLojaInterno
        : null;

    // Estado padrão (não logado): esconde "Minha loja", se existir nesta página
    if (botaoMinhaLoja) botaoMinhaLoja.style.display = "none";

    if (logado) {
        // Esconde Login e Cadastre-se, já que a pessoa já está logada
        if (linkLogin) linkLogin.style.display = "none";
        if (linkCadastroAluno) linkCadastroAluno.style.display = "none";

        // Mostra a saudação "Bem vindo, {nome}!" se a página tiver esse elemento
        const saudacao = document.getElementById("saudacaoUsuario");
        if (saudacao) {
            const nomeUsuario = localStorage.getItem("usuarioNome");
            saudacao.innerHTML = `Bem vindo, <b>${nomeUsuario || "visitante"}</b>!`;
        }

        if (ehEmpreendedor) {
            // Já é empreendedor: esconde o convite, mostra "Minha loja"
            if (linkCadastroEmpreendedor) {
                linkCadastroEmpreendedor.style.display = "none";
            }

            if (botaoMinhaLoja) {
                botaoMinhaLoja.style.display = "";
                if (linkMinhaLojaInterno) {
                    linkMinhaLojaInterno.href = "imdequis.html";
                }
            }
        }

        // Adiciona o link de Sair, se ainda não existir
        if (!document.getElementById("linkSair")) {
            const linkSair = document.createElement("a");
            linkSair.href = "#";
            linkSair.id = "linkSair";
            linkSair.textContent = "Sair";
            linkSair.addEventListener("click", function (evento) {
                evento.preventDefault();
                localStorage.clear(); // remove todos os dados de sessão
                window.location.href = "index.html";
            });
            navbar.appendChild(linkSair);
        }
    }
    // Se não estiver logado, Login e Seja um Empreendedor já aparecem
    // normalmente, pois é o estado padrão do HTML.
});