import createCustomEvent from "./event.js";
export function Register() {
    const div = document.createElement("div");

    div.innerHTML=`
    <header>
    <div class="logo" id="logo">
        <a href="">
            <img src="" alt="NutriTrack">
        </a>
    </div>
</header>
<main class="welcome"> 
    <div>
        <h1>Para começar, precisamos te conhecer um pouco melhor!</h1>
        <div class="div_input">
            <label for="name">Nome</label>
            <input type="text" name="name" id="name">
            <label for="email">E-mail</label>
            <input type="email" name="email" id="email">
            <label for="password">Senha</label>
            <input type="password" name="password" id="password">

          
            <label for="terms">Li e concordo com a <span>política de privacidade</span> e <span>termos de uso</span></label>
            <input type="checkbox" name="terms" id="terms">

            <div class="btns_index">
                <button id="btn_back" class="btn_stroke">Voltar</button>
                <button id="btn_next" class="btn_colorLinear">Próximo</button>
            </div>
        </div>
        <span><a href="">Não tem conta? Cadastre-se</a></span>
    </div>


</main>
<footer>
    <span>all rights reserved</span>
</footer>
  `;

    return div
}

// precisa ver se não tem informação repetida e adicionar informações no banco de dados

export function registerBtns (){
    const btnBack = document.getElementById("btn_back");
    const btnNext = document.getElementById("btn_next");

    btnBack.addEventListener ("click",()=>{
        const customEvent = createCustomEvent('/');
        history.pushState({}, '', '/');
        window.dispatchEvent(customEvent); 
    })

    btnNext.addEventListener ("click",()=>{
        const customEvent = createCustomEvent('/forms');
        history.pushState({}, '', '/forms');
        window.dispatchEvent(customEvent); 
    })
}
