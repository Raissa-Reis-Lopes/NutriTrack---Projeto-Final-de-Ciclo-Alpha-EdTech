const openModalSac = document.getElementById("open-modal-sac");
const closeModalSac = document.getElementById("close-modal-sac");
const modalSac = document.querySelector("#modal-sac");
const fadeSac = document.querySelector("#fade-sac");

// adiciona ou remove a classe "hide"
export const toggleModalSac = () => {
    modalSac.classList.toggle("hide");
    fadeSac.classList.toggle("hide");
}

// Para cada variável cria um EventListener de click e chama a função
[openModalSac, closeModalSac, fadeSac].forEach((el) => {
    el.addEventListener("click", () => toggleModalSac());
});