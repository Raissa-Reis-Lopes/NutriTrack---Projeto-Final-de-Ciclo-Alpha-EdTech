import createCustomEvent from "./event.js";

export function About() {
    const div = document.createElement("div");

    div.innerHTML=`
    <body>
    <div class="logo_initial" id="logo">
        <img src="../img/logo.svg" alt="NutriTrack">
    </div>
    <div class="back_initial"></div>
    <div class="back_initial_2"></div>
    <div class="container_left">
        <div class="welcome">
            <h1 class="title_initial">Sobre Nós!</h1>
            <div class="text">
                Nossa plataforma foi desenvolvida para ajudá-lo a monitorar e controlar sua alimentação diária de uma forma simples e eficaz. Seja qual for seu objetivo, estamos aqui para apoiá-lo em sua jornada de saúde e bem-estar!
                Nosso sistema calculará as calorias e os nutrientes presentes em sua dieta.
                Com nossa plataforma intuitiva e recursos abrangentes, você terá acesso a:
                Registro fácil e rápido de alimentos consumidos;
                Análise detalhada de calorias e nutrientes;
                Recomendações de plano alimentar personalizado e
                Acompanhamento do progresso em direção aos seus objetivos de saúde
                Estamos comprometidos em fornecer a você as ferramentas e informações necessárias para alcançar e manter seu estilo de vida saudável. Não importa qual seja o objetivo, estamos aqui para ajudá-lo a alcançar o sucesso!
                Comece agora mesmo e embarque em uma jornada de saúde e bem-estar com a <span class="label-text">NutriTrack</span>.
            </div>
        </div>

        <div class="btns">
            <button id="btn_back" class="btn_stroke">Voltar</button>
        </div>
    </div>
    <footer class="footer_withoutBack">
        <span>Todos os direitos reservados</span>
    </footer>
    </body>
    `;

    document.getElementById("root").appendChild(div);
    initialBtns();
    return div
}

export function initialBtns(){
    const btnBack = document.getElementById("btn_back");

    btnLogin.addEventListener ("click",()=>{
        const customEvent = createCustomEvent('/home');
        window.dispatchEvent(customEvent); 
    })
}