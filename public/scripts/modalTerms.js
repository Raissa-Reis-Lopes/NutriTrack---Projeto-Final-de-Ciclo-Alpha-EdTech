const openModalPrivacy = document.getElementById("open-modal-privacy");
const openModalTerms = document.getElementById("open-modal-terms");
const closeModalPrivacy = document.getElementById("close-modal-privacy");
const closeModalTerms = document.getElementById("close-modal-terms");
const modalPrivacy = document.querySelector("#modal-privacy");
const modalTerms = document.querySelector("#modal-terms");
const fadePrivacy = document.querySelector("#fade-privacy");
const fadeTerms = document.querySelector("#fade-terms");

// adiciona ou remove a classe "hide"
export const toggleModalPrivacy = () => {
    modalPrivacy.classList.toggle("hide");
    fadePrivacy.classList.toggle("hide");
}

export const toggleModalTerms= () => {
    modalTerms.classList.toggle("hide");
    fadeTerms.classList.toggle("hide");
}

// Para cada variável cria um EventListener de click e chama a função
[openModalPrivacy, closeModalPrivacy, fadePrivacy].forEach((el) => {
    el.addEventListener("click", () => toggleModalPrivacy());
});

[openModalTerms, closeModalTerms, fadeTerms].forEach((el) => {
    el.addEventListener("click", () => toggleModalTerms());
});