const openModalAccount = document.getElementById("open-modal-account");
const closeModalAccount = document.getElementById("close-modal-account");
const modalAccount = document.querySelector("#modal-account");
const fadeAccount = document.querySelector("#fade-account");

// adiciona ou remove a classe "hide"
export const toggleModalAccount = () => {
    modalAccount.classList.toggle("hide");
    fadeAccount.classList.toggle("hide");
}

// Para cada variável cria um EventListener de click e chama a função
[openModalAccount, closeModalAccount, fadeAccount].forEach((el) => {
    el.addEventListener("click", () => toggleModalAccount());
});