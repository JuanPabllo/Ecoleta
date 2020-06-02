function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        for(const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
     } )
}

populateUFs()

function getCities() {
    const citySelect = document.querySelector("select[name=city]")

    console.log(event.target)
}



document
    .querySelector("select[name=uf")
    .addEventListener("change", getCities)