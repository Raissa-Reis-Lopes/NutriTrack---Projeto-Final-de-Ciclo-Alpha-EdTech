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
            <a href="/profile">Perfil</a>
            <a href="/historic">Histórico</a>
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