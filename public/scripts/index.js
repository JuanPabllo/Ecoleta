//variavel que recebe botao de pesquisa
const buttonSearch = document.querySelector("#page-home main a")

//variavel que recebe o modal
const modal=document.querySelector("#modal")

//variavel que recebe o botao de fechar (x)
const close = document.querySelector ("#modal .header a")

//quando o botao de pesquisa for clicado chama a função que altera sua classe de 'hide' para normal
buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")
})

//quando o botao de fechar for clicado chama a função que altera sua classe de normal para 'hide'
close.addEventListener("click", () => {
    modal.classList.add("hide")
})