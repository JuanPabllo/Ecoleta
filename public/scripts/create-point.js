//Formulario de dados (cidades e estados)
//função para apresentar os 27 estados brasileiros
function populateUFs() {

    //variavel que recebe o id do estado selecionada pelo usuario
    const ufSelect = document.querySelector("select[name=uf]")

    //busca na API do IBGE pelos 27 estados brasileiros
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json())
    .then( states => {

        //adiciona a opção de cada estado para a seleção
        for( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

//chamada da função dos estados
populateUFs()

//função para apresentar as cidades do estado selecionado
function getCities(event){

    //variavel que recebe o nome da cidade selecionada pelo usuario
    const citySelect = document.querySelector("select[name=city]")

    //variavel que recebe o nome do estado selecionado
    const stateInput = document.querySelector("input[name=state]")

    //variavel que recebe o id do estado selecionado para a busca das cidades
    const ufValue = event.target.value

    //variavel que faz a conversão do id para o nome do estado selecionado
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    //url dinamica que se altera com base no estado selecionado para a busca das cidades
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    //processo de reset das cidades no caso da mudança de estados
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    //desabilita as cidades ate que o estado seja selecionado (faz parte do reset)
    citySelect.disabled = true

    //busca na API do IBGE pelas cidades do estado selecionado com base na url dinamica
    fetch(url)
    .then( res => res.json())
    .then( cities => {
          
        //adiciona a opção de cada cidade do respectivo estado para a seleção
        for( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        //reabilitação da escolha das cidades
        citySelect.disabled = false
    })
}

//checa a seleção de estados para chamar a função das cidades com base na mudança
document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//Itens de Coleta
//variavel que contem todos os itens de coleta
const itemsToCollect = document.querySelectorAll(".items-grid li")

//teste para cada item, se é selecionado ou nao
for (const item of itemsToCollect)
{
    //chamada da função que determina se o item foi selecionado ou não ao clicar
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items")

//vetor dos itens selecionados
let selectedItems = []

//função que altera a classe de seleção e anota quais os itens foram selecionados/deselecionados
function handleSelectedItem(event){
    
    //variavel que recebe o item que foi clicado
    const itemLi = event.target

    //troca da classe: selecionado ou nao (ao clicar)
    itemLi.classList.toggle("selected")

    //variavel do ID, recebe o id do item que foi clicado
    const itemId = itemLi.dataset.id

    //console.log('ITEM ID: ', itemId)

    //variavel dos itens ja selecionados, analisa se o vetor dos itens selecionados possui itens ou não e, caso tenha,
    //compara o valor do id atual (itemID) com cada item do veor (selectedItems)
    //caso o ID seja igual a algum item, retorna a posição do mesmo no vetor, caso não, retorna -1
    const alreadySelected = selectedItems.findIndex( function(item) {
        const itemFound = item == itemId
        return itemFound
    })

    //entra se a variavel dos itens ja selecionados retornar um valor 'true' (diferente de -1, isto é, a posição do item clicado (itemId)
    // no vetor de itens selecionados (selectedItems))
    if(alreadySelected >= 0) {
        
        //vetor dos itens que devem permanecer na seleção, analisa cada item do vetor de itens selecionados (selectedItems) e descobre qual item
        //é igual ao item clicado (itemId) para remove-lo da nova seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
    
    //o resultado do vetor de itens que permanecem (filteredItems) é o novo valor do vetor de seleção (selectedItems)
    selectedItems = filteredItems
    } else {

        //caso o item clicado (itemId) não estivesse no vetor de seleção ele é adicionado
        selectedItems.push(itemId)
    }

    //console.log('selectedItems: ', selectedItems)

    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
}document.querySelector("imput[name=items")