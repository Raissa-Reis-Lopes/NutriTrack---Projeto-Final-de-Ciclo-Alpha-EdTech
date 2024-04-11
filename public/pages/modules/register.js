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
                <button class="btn_stroke">Voltar</button>
                <button class="btn_colorLinear">Próximo</button>
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
