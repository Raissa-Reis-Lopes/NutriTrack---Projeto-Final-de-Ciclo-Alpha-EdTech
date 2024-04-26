import createCustomEvent from "./event.js";

export function Initial() {
    const div = document.createElement("div");

    div.innerHTML=`  
    <div class="logo_initial" id="logo">
    <img src="../../img/logo.svg" alt="NutriTrack">
</div>
    <div class="back_initial"></div>
    <div class="back_initial_2">
    <div class="container_left">
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
    <footer class="footer_withoutBack">
        <span>all rights reserved</span>
    </footer>
    </div>
</div>    
    `;
    document.getElementById("root").appendChild(div);
    initialBtns();
    return div
}

export function initialBtns(){
    const btnLogin = document.getElementById("btn_login");
    const btnRegister = document.getElementById("btn_register");

    btnLogin.addEventListener ("click",()=>{
        const customEvent = createCustomEvent('/login');
        window.dispatchEvent(customEvent); 
    })

    btnRegister.addEventListener ("click",()=>{
        const customEvent = createCustomEvent('/register');
        window.dispatchEvent(customEvent); 
    })
}


