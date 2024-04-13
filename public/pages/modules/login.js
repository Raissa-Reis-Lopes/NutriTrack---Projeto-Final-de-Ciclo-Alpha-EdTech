import createCustomEvent from "./event.js";
export function Login() {
    const div = document.createElement("div");
    div.classList.add('login_wrapper');

    div.innerHTML=`
    <div class="back_general"></div>
    <header>
        <div class="logo" id="logo">
                <img src="./img/logo.svg" alt="NutriTrack">
        </div>
    </header>
    <main class="container_left container_login">
        <div class="welcome">
            <h1 class="title_login">Bem-vindo de volta! Faça login para prosseguir com sua jornada saudável.</h1>
            <div class="div_input">
                <label for="email">E-mail</label>
                <input type="email" name="email" id="email" class="input_email">
                <label for="password">Senha</label>
                <input type="password" name="password" id="password" class="input_pass">
                <span><a href="">Esqueceu a senha?</a></span>
                <div class="align_row">
                <input type="checkbox" name="connect" id="connect" class="connect">
                <label for="connect">Me manter conectado</label>
                </div>
            </div>
            <div class="btns_index btn_register">
                    <button id="btn_back" class="btn_stroke">Voltar</button>
                    <button id="btn_enter" class="btn_colorLinear">Entrar</button>
                </div>
            <span id="register" class="register"><a href="" >Não tem conta? Cadastre-se</a></span>
        </div>
    </main>
    <footer class="footer footer_full">
        <span>all rights reserved</span>
    </footer>`;

    document.getElementById("root").innerHTML = '';
    document.getElementById("root").appendChild(div);
    loginBtns();
    return div
}

// aqui autenticar as infos do usuario
export function loginBtns(){
    const btnBack = document.getElementById("btn_back");
    const btnEnter = document.getElementById("btn_enter");
    const register = document.getElementById("register");
   
    if(register){
        register.addEventListener("click", () => {
            const customEvent = createCustomEvent('/register');
            history.pushState({}, '', '/register');
            window.dispatchEvent(customEvent);
        });
    }

    if (btnBack) {
        btnBack.addEventListener("click", () => {
            const customEvent = createCustomEvent('/');
            history.pushState({}, '', '/');
            window.dispatchEvent(customEvent);
        });
    }

    // if (btnEnter) {
    //     btnEnter.addEventListener("click", () => {
    //         const customEvent = createCustomEvent('/home');
    //         history.pushState({}, '', '/home');
    //         window.dispatchEvent(customEvent);
    //     });
    // }

    btnEnter.addEventListener("click", async () => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Erro ao fazer login');
            }

            const customEvent = createCustomEvent('/home');
            history.pushState({}, '', '/home');
            window.dispatchEvent(customEvent); 

        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    });
}
