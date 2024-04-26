import createCustomEvent from "./event.js";
import {  emailValid, passwordValid } from "./validation.js";
import { showMessage } from "../utils/message.js";


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
                    <div class="align_row_register">  <label for="email">E-mail</label>
                    <input class="input_register"  type="email" name="email" id="email">
                    </div>
                    <div class="align_row_register">  <label for="password">Senha</label>
                    <input  class="input_register"  type="password" name="password" id="password"></div>
                    <div class="align_row_register">    <label for="password">Repetir Senha</label>
                    <input class="input_register"  type="password" name="password" id="confirm_password"></div>
                    <div class="align_row">
                    <input type="checkbox" name="terms" id="terms" class="connect">
                    <label for="terms">Li e concordo com a <span id="open-modal-privacy" class="regsiter_conditons">política de privacidade</span> e <span id="open-modal-terms" class="regsiter_conditons">termos de uso</span></label>
                </div>
                <div id="message" class="message-container hidden">
                <div id="message-content" class="message-content hidden"></div>
                </div>
                <section>
                    <div id="fade-privacy" class="hide"></div>
                    <div id="modal-privacy" class="hide">
                        <div class="modal-header">
                            <h2>Política de privacidade</h2>
                            <img src="../img/botao-excluir.png" alt="botão fechar" id="close-modal-privacy"> 
                        </div>
                        <div class="modal-body">
                            <p>Bem vindo ao Nutri Track. Nós respeitamos sua privacidade e queremos proteger suas informações pessoais.</p>
                            <p>Podemos coletar informações pessoais, como nome, e-mail, peso, altura, data de nascimento, sexo biológico e nível de atividade. Enquanto você usa nosso site podemos coletar informações sobre suas atividades online.</p>
                            <p>Usamos suas informações para fornecer os serviços solicitados, para melhorar nosso site e para nos comunicarmos com vocẽ.</p>
                            <p>Não vendemos ou alugamos suas informações pessoais com terceiros. Podemos compartilhar suas informações com parceiros de negócios ou fornecedores que nos ajudam a operar o site.</p>
                            <p>Implementamos medidas de segurança para proteger suas informações pessoais.</p>
                            <p>Podemos atualizar esta política de privacidade periodicamente. Se fizermos alterações significativas, notificaremos você.</p>
                            <p>Se você tiver alguma dúvida sobre esta política de privacidade, entre em contato conosco em contato@email.com ou (11) 0800 1234-5678</p>
                        </div>
                    </div>
                </section>
                <section>
                    <div id="fade-terms" class="hide"></div>
                    <div id="modal-terms" class="hide">
                        <div class="modal-header">
                            <h2>Termos de uso</h2>
                            <img src="../img/botao-excluir.png" alt="botão fechar" id="close-modal-terms">
                        </div>
                        <div class="modal-body">
                            <p>Ao acessar e usar o site Nutri Track, você aceita e concorda em estar vinculado por estes Termos de uso.</p>
                            <p>Você concorda em usar o site apenas para fins legais e de maneira que não infrinja os direitos ou restrinja ou iniba o uso e aproveitamento do site por qualquer terceiro.</p>
                            <p>O conteúdo deste site, incluindo texto, gráficos, imagens e outros materiais, são protegidos por direitos autorais. Vocẽ não pode reproduzir, distribuir, modificar ou republicar materiais contidos neste site sem a permissão prévia por escrito do(s) responsável(is) legal(is) pelo Nutri Track.</p>
                            <p>O site e seu conteúdo são fornecidos "como estão". Nós não oferecemos garantias ou representações de qualquer tipo, expressas ou implícitas, sobre a integridade, precisão confiabilidade, adequação ou disponibilidade do site ou seu conteúdo.</p>
                            <p>Podemos alterar estes Termos de Uso periodicamente. Se fizermos alterações, notificaremos você.</p>
                            <p>Se você tiver alguma dúvida sobre este Termo de Uso, entre em contato conosco em contato@email.com ou (11) 0800 1234-5678</p>
                        </div>
                    </div>
                </section>
            </section>
            </div>
            <div class="btns_index">
                <button id="btn_back" class="btn_stroke">Voltar</button>
                <button id="btn_next" class="btn_colorLinear">Próximo</button>
                </div>
        </div>
    </main>
    <footer class="footer footer_full">
        <span>all rights reserved</span>
    </footer>
    `;
    
    document.getElementById("root").innerHTML = '';
    document.getElementById("root").appendChild(div);
    registerBtns();
    
    const openModalPrivacy = document.getElementById("open-modal-privacy");
    const openModalTerms = document.getElementById("open-modal-terms");
    const closeModalPrivacy = document.getElementById("close-modal-privacy");
    const closeModalTerms = document.getElementById("close-modal-terms");
    const modalPrivacy = document.querySelector("#modal-privacy");
    const modalTerms = document.querySelector("#modal-terms");
    const fadePrivacy = document.querySelector("#fade-privacy");
    const fadeTerms = document.querySelector("#fade-terms");
    // adiciona ou remove a classe "hide"
    function toggleModalPrivacy () {
        modalPrivacy.classList.toggle("hide");
        fadePrivacy.classList.toggle("hide");
    }
    
    function toggleModalTerms() {
        modalTerms.classList.toggle("hide");
        fadeTerms.classList.toggle("hide");
    }
    
    // Para cada variável cria um EventListener de click e chama a função
    [openModalPrivacy, closeModalPrivacy, fadePrivacy].forEach((el) => {
        el.addEventListener("click", () => toggleModalPrivacy());
    });
    
    [openModalTerms, closeModalTerms, fadeTerms].forEach((el) => {
        el.addEventListener("click", () => toggleModalTerms());
    });
    
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
            showMessage('fail',"O nome não pode ser vazio!","30%","58%");
            return;
        }
    
    
        if (!emailValid(email)) {
            showMessage('fail',"Por favor, insira um email válido!","35%","58%");
            return;
        }
            
        if (!passwordValid(password)) {
            showMessage('fail',`Insira uma senha válida:
            - mín 8 caracteres
            - máx 15 caracteres
            - pelo menos uma letra maiúscula
            - pelo menos uma letra minúscula
            - pelo menos um número 
            - pelo menos um caractere especial`,"30%","58%");
            return;
        }
    
        if (password !== confirmPassword){
            showMessage('fail',"As senhas precisam ser iguais", "40%","58%");
            return;
        }

        if(!terms){
            showMessage('fail',"É necessário ler e concordar com os termos de uso e privacidade");
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

             
        
                if (!response.ok) {
                    throw new Error("Erro ao realizar o registro");
                }

                
        
                try {
                   
                    const response = await fetch('/api/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email, password }),
                    });        
                    
                    showMessage("success", "Parabéns, você começou a sua jornada de transformação!");


                } catch (error) {
                    console.error('Erro ao solicitar o token jwt:', error);
                }

                const customEvent = createCustomEvent('/config');
                window.dispatchEvent(customEvent); 
                btnNext.disabled = false;
            }
            catch (error) {
                console.error("Erro ao realizar o registro:", error);
                showMessage("fail", "Erro ao realizar o registro. Tente novamente")
            }
        })
}
