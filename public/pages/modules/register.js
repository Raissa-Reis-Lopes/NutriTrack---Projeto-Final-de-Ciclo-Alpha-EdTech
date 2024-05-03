import createCustomEvent from "./event.js";
import {  emailValid, passwordValid } from "./validation.js";
import { showMessage } from "../utils/message.js";
import { messageError } from "../utils/messageError.js";
import { privacyPolicyModal, termsModal, createModalEventsRegister } from "./modals.js";

export function Register() {
    const div = document.createElement("div");

    div.innerHTML=`
    <div class="back_general"></div>
    <header>
    <div class="logo" id="logo">
        <img src="../img/logo.svg" alt="NutriTrack">
    </div>
    </header>
    <main class="container_left container_login">
        <div class="welcome">
            <h1 class="title_register">Para começar, precisamos te conhecer um pouco melhor!</h1>
            <div class="div_input_register">
                <div class="align_row_register"> <label for="name">Nome</label>
                    <input  class="input_register" type="text" name="name" id="name"></div>
                    <div id="message_name"></div>
                    <div class="align_row_register">  <label for="email">E-mail</label>
                    <input class="input_register"  type="email" name="email" id="email">
                    </div>
                    <div id="message_email"></div>
                    <div class="align_row_register">  <label for="password">Senha</label>
                    <input  class="input_register"  type="password" name="password" id="password"></div>
                    <div id="message_password"></div>
                    <div class="align_row_register">    <label for="password">Repetir Senha</label>
                    <input class="input_register"  type="password" name="password" id="confirm_password"></div>
                    <div id="message_repeat_password"></div>
                    <div class="align_row">
                    <input type="checkbox" name="terms" id="terms" class="connect">
                    <label for="terms">Li e concordo com a <span id="open-modal-privacy" class="regsiter_conditons">política de privacidade</span> e <span id="open-modal-terms" class="regsiter_conditons">termos de uso</span></label>
                </div>
                    <div id="message_terms"></div>
                <div id="message" class="message-container hidden">
                    <div id="message-content" class="message-content hidden"></div>
                </div>
            </div>
            <div class="btns_index">
                <button id="btn_back" class="btn_stroke">Voltar</button>
                <button id="btn_next" class="btn_colorLinear">Próximo</button>
                </div>
        </div>
    </main>
    <!-- Tags para os modais -->
    <section id="privacy_policy_container"></section>
    <section id="terms_container"></section>

    <footer class="footer footer_full">
        <span>todos os direitos reservados</span>
    </footer>
    `;
    
    document.getElementById("root").innerHTML = '';
    document.getElementById("root").appendChild(div);
    registerBtns();

    const privacyModalContainer = document.getElementById('privacy_policy_container');
    const privacyModal = privacyPolicyModal();
    privacyModalContainer.appendChild(privacyModal);

    const termsContainer = document.getElementById("terms_container");
    const terms = termsModal();
    termsContainer.appendChild(terms);

    createModalEventsRegister();
    
    return div
}

export function registerBtns() {
    const btnBack = document.getElementById("btn_back");
    const btnNext = document.getElementById("btn_next");
    const logo = document.getElementById("logo");
 

    logo.addEventListener("click", ()=>{
        const customEvent = createCustomEvent('/');
        window.dispatchEvent(customEvent); 
    })

    btnBack.addEventListener("click", () => {
            const customEvent = createCustomEvent('/');
            window.dispatchEvent(customEvent);
    });

    //Para o primeiro forms do cadastro
        btnNext.addEventListener("click", async (event)=>{
        event.preventDefault()


        const username = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm_password").value;
        const terms = document.getElementById("terms").checked;

        if(!username){
            messageError("message_name","O nome não pode ser vazio")          
            return;
        }
    
    
        if (!emailValid(email)) {
            messageError("message_email","Por favor, insira um email válido") 
            return;
        }
            
        if (!passwordValid(password)) {
            messageError("message_password",
            `Insira uma senha válida:
            - mín. 4 e máx. 15 caracteres`,5000,"0.8rem") 
            return;
        }
    
        if (password !== confirmPassword){
            messageError("message_repeat_password","As senhas não conferem")
            return;
        }
        
        if(!terms){
            messageError("message_terms","É necessário ler e concordar com os termos de uso e privacidade")
            return;
        }

        
        const userData = {
            username,
            email,
            password
        };

          // Desativar o botão p/ inibir a tentativa de realizar vários envios antes de ter uma resposta
        //   btnNext.disabled = true;
      
            try {
              
                const response = await fetch("/api/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userData),
                });

                const data = await response.json();
             
        
                if (!response.ok) {
                    throw new Error(data.message);
                }

                try {
                   
                    const response = await fetch('/api/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email, password }),
                    });        
                    

                } catch (error) {
                    console.error('Erro ao solicitar o token jwt:', error);
                }

                const customEvent = createCustomEvent('/config');
                window.dispatchEvent(customEvent); 
                btnNext.disabled = false;
            }
            catch (error) {
                console.error("Erro ao realizar o registro:", error);
                showMessage("fail", `Falha ao realizar o registro: ${error.message} `,"-8%")
            }
        })
}
