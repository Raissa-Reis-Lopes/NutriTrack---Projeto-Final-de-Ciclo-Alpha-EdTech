import createCustomEvent from "./event.js";
export function Login() {
    const div = document.createElement("div");

    div.innerHTML=`
    <div class="back_general"></div>
    <header>
        <div class="logo" id="logo">
            <a href="">
                <img src="../img/logo.svg" alt="NutriTrack">
            </a>
        </div>
    </header>
    <main class="container_left">
        <div class="welcome">
            <h1>Bem-vindo de volta! Faça login para prosseguir com sua jornada saudável.</h1>
            <div class="div_input">
                <label for="email">E-mail</label>
                <input type="email" name="email" id="email">
                <label for="password">Senha</label>
                <input type="password" name="password" id="password">
                <span><a href="">Esqueceu a senha?</a></span>
                <label for="connect">Me manter conectado</label>
                <input type="checkbox" name="connect" id="connect">

                <div class="btns_index">
                    <button class="btn_stroke">Voltar</button>
                    <button class="btn_colorLinear">Entrar</button>
                </div>
            </div>
            <span><a href="">Não tem conta? Cadastre-se</a></span>
        </div>


    </main>
    <footer class="footer">
        <span>all rights reserved</span>
    </footer>`;

    return div
}

// aqui autenticar as infos do usuario