import createCustomEvent from "./event.js";

export function History() {
    const div = document.createElement("div");

    div.innerHTML=`
    <header>
        <div class="back_general"></div>
        <div class="logo" id="logo">
            <a href="">
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
            <select name="period" id="period">
                <option value="this_week">Esta semana</option>
                <option value="last_week">Semana passada</option>
                <option value="today">hoje</option>
                <option value="yesterday">Ontem</option>
            </select>
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
    return div
}

export function registerBtns() {
    const btnHome = document.getElementById("btn_home");
    const btnProfile = document.getElementById("btn_profile");

    if(btnHome){
        register.addEventListener ("click",function(e){
            e.preventDefault();
            const customEvent = createCustomEvent('/home');
            history.pushState({}, '', '/home');
            window.dispatchEvent(customEvent); 
        });
    }

    if (btnProfile) {
        btnBack.addEventListener("click", () => {
            const customEvent = createCustomEvent('/profile');
            history.pushState({}, '', '/profile');
            window.dispatchEvent(customEvent);
        });
    }
}