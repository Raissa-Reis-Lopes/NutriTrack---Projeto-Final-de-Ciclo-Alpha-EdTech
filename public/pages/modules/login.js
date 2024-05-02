import createCustomEvent from "./event.js";
import { showMessage } from "../utils/message.js";
import { messageError } from "../utils/messageError.js";


export function Login() {
    const div = document.createElement("div");
    div.classList.add('login_wrapper');

    div.innerHTML=`
    <div class="back_general"></div>
    <header>
        <div class="logo" id="logo">
                <img src="../img/logo.svg" alt="NutriTrack">
        </div>
    </header>
    <main class="container_left container_login">
        <div class="welcome">
            <h1 class="title_login">Faça login para prosseguir com sua jornada saudável.</h1>
            <div class="div_input">
                <div class="form-control">
                    <input type="text" required id="email" />
                    <label>Email</label>
                    <div id="icon_email"></div>
                </div>
                <div id="message_email"></div>
                <div class="form-control">
                <input type="text" required id="password"/>
                <label>Password</label>
                <div id="icon"></div>
                </div>
                <div id="message_password"></div>
                <div class="align_row"> 
                <label class="label_checkbox">
                <div class="toggle">
                    <input class="toggle-state" type="checkbox" name="check" value="check" id="connect" />
                    <div class="indicator"></div>
                </div>
                <div class="label-text">Me manter conectado</div>
                </label>
                </div>
                <div id="message_error_login"></div>
            </div>
            <div class="btns_index">
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
    document.getElementById("icon").addEventListener("click", showPassword)
    loginBtns();
    logoNav();
    waveInput();
    return div
}


function waveInput(){
const inputs = document.querySelectorAll('.form-control input');
const labels = document.querySelectorAll('.form-control label');

labels.forEach(label => {
	label.innerHTML = label.innerText
		.split('')
		.map((letter, idx) => `<span style="
				transition-delay: ${idx * 50}ms
			">${letter}</span>`)
		.join('');
});
}

function showPassword(){
    const password = document.getElementById("password");
    const icon = document.getElementById("icon");

    if(password.type ==="password"){
        password.setAttribute("type","text");
        icon.classList.add("hide");
    } else {
        password.setAttribute("type","password");
        icon.classList.remove("hide");
    }

}

export function logoNav(){
    const logo = document.getElementById("logo");
 

    logo.addEventListener("click", ()=>{
        const customEvent = createCustomEvent('/');
        window.dispatchEvent(customEvent); 
    })
}

// aqui autenticar as infos do usuario
export function loginBtns(){
    const btnBack = document.getElementById("btn_back");
    const btnEnter = document.getElementById("btn_enter");
    const register = document.getElementById("register");
    const connectCheckbox = document.getElementById("connect");

    if(register){
        register.addEventListener ("click",function(e){
            e.preventDefault();
            const customEvent = createCustomEvent('/register');
            window.dispatchEvent(customEvent); 
        });
    }

    if (btnBack) {
        btnBack.addEventListener("click", () => {
            const customEvent = createCustomEvent('/');
            window.dispatchEvent(customEvent);
        });
    }

    btnEnter.addEventListener("click", async () => {
            // Desativar o botão p/ não forçar vários logins
             btnEnter.disabled = true;

             const rememberMe = connectCheckbox.checked; 
             console.log(rememberMe)


        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if(!email){
            messageError("message_email","O email é obrigatório");
            btnEnter.disabled = false;
            return;
        }

        if(!password){
            messageError("message_password","A senha é obrigatória");
            btnEnter.disabled = false;
            return;
        }

        if(email && password){
            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password, rememberMe }),
                });
            
                if (!response.ok) { 
                    messageError("message_error_login", "Usuário e/ou senha inválidos!")         
                    btnEnter.disabled = false;
                    throw new Error('Erro ao fazer login, usuário não localizado');
                }    
    
    
                const checkConfig = await fetch(`/api/config/lastConfig`, {
                    method: "GET",
                });
    
                if(!checkConfig.ok){
                   
                    const customEvent = createCustomEvent('/config');
                    window.dispatchEvent(customEvent); 
    
                    setTimeout(() => { 
                        showMessage("success","Bem-vindo de volta! Precisamos apenas completar o seu cadastro!","-8%")                  
                    }, 0);
    
                    return;
                } else {
                    const customEvent = createCustomEvent('/home');
                    window.dispatchEvent(customEvent); 
                }
                
            
            } catch (error) {
                console.error('Erro ao fazer login:', error);
            } 
        }
        
    });
}