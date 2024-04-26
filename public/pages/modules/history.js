import createCustomEvent from "./event.js";

export function History() {
    const div = document.createElement("div");

    div.innerHTML=`
    <header>
        <div class="back_general"></div>
        <div class="logo" id="logo">
            <a>
                <img src="../img/logo.svg" alt="NutriTrack">
            </a>
        </div>
        <nav class="header_nav">
            <a href="/home" class="btn_home">Home</a>
            <a href="/profile" class="btn_profile">Perfil</a>
            <a href="/chalenge">Desafios</a>
            <button class="btn_exit">Sair</button>
        </nav>
    </header>
    <main>
        <div class="titles">
            <h1>Histórico</h1>
            <h5>Calorias consumidas:</h5>
            <h5>Meta de calorias:</h5>
        </div>
        <div class="period">
            <label for="period">Periódo:</label>
            <input type="date" id="period" name="period" />
        </div>
        <div class="chart"></div>
    </main>
    <footer>
        <div class="footer_history">
            <span>all rights reserved</span>
            <span id="open-modal-terms">termos de uso</span>
            <span id="open-modal-privacy">política de privacidade</span>
        </div>
    </footer>
  `;
  
    document.getElementById("root").innerHTML = '';
    document.getElementById("root").appendChild(div);
    registerBtns();
  
    const openModalPrivacy = document.getElementById("open-modal-privacy");
    const openModalTerms = document.getElementById("open-modal-terms");
    const closeModalPrivacy = document.getElementById("close-modal-privacy");
    const closeModalTerms = document.getElementById("close-modal-terms");
    const modalPrivacy = document.querySelector("#modal-privacy");
    const modalTerms = document.querySelector("#modal-terms");
    const fadePrivacy = document.querySelector("#fade-privacy");
    const fadeTerms = document.querySelector("#fade-terms");
    const openModalSac = document.getElementById("open-modal-sac");
    const closeModalSac = document.getElementById("close-modal-sac");
    const modalSac = document.querySelector("#modal-sac");
    const fadeSac = document.querySelector("#fade-sac");
    
    // adiciona ou remove a classe "hide"
    function toggleModalPrivacy () {
        modalPrivacy.classList.toggle("hide");
        fadePrivacy.classList.toggle("hide");
    }
    
    function toggleModalTerms() {
        modalTerms.classList.toggle("hide");
        fadeTerms.classList.toggle("hide");
    }

    function toggleModalSac() {
        modalSac.classList.toggle("hide");
        fadeSac.classList.toggle("hide");
    }
    
    // Para cada variável cria um EventListener de click e chama a função
    [openModalPrivacy, closeModalPrivacy, fadePrivacy].forEach((el) => {
        el.addEventListener("click", () => toggleModalPrivacy());
    });
    
    [openModalTerms, closeModalTerms, fadeTerms].forEach((el) => {
        el.addEventListener("click", () => toggleModalTerms());
    });

    [openModalSac, closeModalSac, fadeSac].forEach((el) => {
        el.addEventListener("click", () => toggleModalSac());
    });

    return div
}

export function registerBtns() {
    const btnHome = document.getElementById("btn_home");
    const btnProfile = document.getElementById("btn_profile");

    if(btnHome){
        register.addEventListener ("click",function(e){
            e.preventDefault();
            const customEvent = createCustomEvent('/home');
            window.dispatchEvent(customEvent); 
        });
    }

    if (btnProfile) {
        btnBack.addEventListener("click", () => {
            const customEvent = createCustomEvent('/profile');
            window.dispatchEvent(customEvent);
        });
    }
}