const openModalAccount = document.getElementById("open-modal-account");
const closeModalAccount = document.getElementById("close-modal-account");
const modalAccount = document.querySelector("#modal-account");
const fadeAccount = document.querySelector("#fade-account");
const exclude = document.getElementById("exclude");
const cancel = document.querySelector(".close-modal-account");

// adiciona ou remove a classe "hide"
const toggleModalAccount = () => {
    modalAccount.classList.toggle("hide");
    fadeAccount.classList.toggle("hide");
}

document.addEventListener("DOMContentLoaded", function() {
    // Para cada variável cria um EventListener de click e chama a função
    [openModalAccount, closeModalAccount, cancel, fadeAccount].forEach((el) => {
        el.addEventListener("click", () => toggleModalAccount());
    });
})

exclude.addEventListener("click", function() {
    document.getElementById("body1").style.display = "none";
    document.getElementById("body2").style.display = "block";
})