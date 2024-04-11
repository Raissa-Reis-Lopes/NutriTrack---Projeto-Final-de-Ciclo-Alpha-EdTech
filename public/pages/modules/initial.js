import stateChange from "./event.js";

export function Initial() {
    const div = document.createElement("div");

    div.innerHTML=`
    <div class="back_initial"></div>
    <div class="back_initial_2"></div>

        <header>
            <div class="logo" id="logo">
                <a href="">
                    <img src="../img/logo.svg" alt="NutriTrack">
                </a>
            </div>
        </header>
        <main class="container_left">
            <div class="welcome">
                <h1 class="title_initial">Seja bem vindo!</h1>
                <div class="text">
                    No NutriTrack, entendemos que cada pessoa é única, 
                    e suas necessidades nutricionais também são. 
                    Com nossa abordagem personalizada, você pode definir metas específicas, 
                    receber recomendações adaptadas ao seu perfil e monitorar 
                    seu progresso de forma individualizada. 
                    Esteja no controle de sua saúde e estilo de vida com o NutriTrack, 
                    a plataforma que coloca você no comando de sua jornada nutricional.
                </div>
            </div>

            <div class="btns">
                <button id="btn_login" class="btn_colorLinear">Login</button>
                <button id="btn_register" class="btn_stroke">Cadastro</button>

            </div>
        </main>
        <footer class="footer_withoutBack">
            <span>all rights reserved</span>
        </footer>
 
    `;

    return div
}

// export function 