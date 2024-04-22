import createCustomEvent from "./event.js";
import { toggleModalPrivacy, toggleModalTerms } from "../../scripts/modalTerms.js";
import { toggleModalSac } from "../../scripts/modalSac.js";
import { toggleModalAccount } from "../../scripts/modalConta.js";

export function Profile() {
    const div = document.createElement("div");

    div.innerHTML=`
    <header>
        <div>
            <div class="logo" id="logo">
                <a href="">
                    <img src="../img/logo.svg" alt="NutriTrack" />
                </a>
            </div>
        </div>
        <nav class="header_nav">
        <div id="navHome">Home</div>
        <div id="navHistory">Histórico</div>
        </nav>
    </header>
    <div class="profile_form">
        <div class="profile_picture">
            <img src="../img/camera.png" alt="Imagem do usuario" />
        </div>
        <div class="profile_info">
            <div class="info_item" id="name">
                <span>Nome: </span>
                <input type="text" value="user_name" readonly />
            </div>
            <div class="info_item" id="email">
                <span>Email: </span>
                <input type="email" value="email@example" readonly />
            </div>
            <div class="info_item" id="password">
                <span>Senha: </span>
                <input type="password" value="********" readonly />
            </div>
            <div class="info_item" id="peso">
                <span>Pseo: </span>
                <input type="number" value="KG" readonly />
            </div>
            <div class="info_item" id="altura">
                <span>Altura: </span>
                <input type="number" value="CM" readonly />
            </div>
            <div class="info_item" id="age">
                <span>Idade: </span>
                <input type="number" value="DD/MM/AAAA" readonly />
            </div>
            <div class="info_item" id="gender">
                <span>Sexo Biológico: </span>
                <input type="text" value="masculino" readonly />
            </div>
            <div class="info_item" id="birth">
                <span>Nascimento: </span>
                <input type="date" value="DD/MM/AAAA" readonly />
            </div>
            <div class="info_item" id="activity">
                <span>Nivel de Atividade: </span>
                <input type="text" value="Ativo" readonly />
            </div>
            <div class="info_item" id="plan">
                <span>Plano: </span>
                <input type="text" value="plano 1" readonly />
            </div>
            <div>
                <img src="../img/editar.png" alt="Editar" class="edit_btn" onclick="toggleAllEdits()" />
            </div>
        </div>
    </div>
    <div>
        <button id="profile_exit" class="btn_stroke">DESCONECTAR</button>
        <button class="btn_stroke">APAGAR CONTA</button>
    </div>
    <!-- Tags para o modal -->
        <section>
            <div id="fade-privacy" class="hide"></div>
            <div id="modal-privacy" class="hide">
                <div class="modal-header">
                    <h2>política de privacidade</h2>
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
                    <p>Vocẽ concorda em usar o site apenas para fins legais e de maneira que não infrinja os direitos ou restrinja ou iniba o uso e aproveitamento do site por qualquer terceiro.</p>
                    <p>O conteúdo deste site, incluindo texto, gráficos, imagens e outros materiais, são protegidos por direitos autorais. Vocẽ não pode reproduzir, distribuir, modificar ou republicar materiais contidos neste site sem a permissão prévia por escrito do(s) responsável(is) legal(is) pelo Nutri Track.</p>
                    <p>O site e seu conteúdo são fornecidos "como estão". Nós não oferecemos garantias ou representações de qualquer tipo, expressas ou implícitas, sobre a integridade, precisão confiabilidade, adequação ou disponibilidade do site ou seu conteúdo.</p>
                    <p>Podemos alterar estes Termos de Uso periodicamente. Se fizermos alterações, notificaremos você.</p>
                    <p>Se você tiver alguma dúvida sobre este Termo de Uso, entre em contato conosco em contato@email.com ou (11) 0800 1234-5678</p>
                </div>
            </div>
        </section>
        <!-- Tags para o modal sac -->
        <section>
            <div id="fade-sac" class="hide"></div>
            <div id="modal-sac" class="hide">
                <div class="modal-header">
                    <h2>política de privacidade</h2>
                    <img src="../img/botao-excluir.png" alt="botão fechar" id="close-modal-sac"> 
                </div>
                <div class="modal-body">
                    <h3>Bem vindo a central de atendimento!</h3>
                    <h4>Como podemos ajudá-lo?</h4>
                    <img src="../img/whatsapp.png" alt="whatsapp" />
                    <p>WhatsApp: (11) 91234-5678</p>
                    <img src="../img/o-email.png" alt="email" />
                    <p>Email: contato@email.com</p>
                </div>
            </div>
        </section>
        <!-- Tags para o modal excluir -->
        <section>
            <div id="fade-account" class="hide"></div>
            <div id="modal-account" class="hide">
                <div class="modal-header">
                    <h2>política de privacidade</h2>
                    <img src="../img/botao-excluir.png" alt="botão fechar" id="close-modal-account"> 
                </div>
                <div id="body1" class="modal-body">
                    <h1>ATENÇÂO!</h1>
                    <h3>Tem certeza que deseja apagar sua conta?</h3>
                    <p>Esta ação é irreversível e você perderá todos os seus dados e histórico de uso. Por favor, tenha em mente que uma vez que sua  for apagada, não poderemos recuperar suas informações.</p>
                    <button class="btn_stroke">Cancelar</button>
                    <button id="deleteAccount" class="btn_stroke">Confirmar</button>
                </div>
            </div>
        </section>
    <footer>
        <div class="footer_history">
            <span>all rights reserved</span>
            <span id="open-modal-terms">termos de uso</span>
            <span id="open-modal-privacy">política de privacidade</span>
            <span id="open-modal-sac">Precisa de ajuda?</span>
        </div>
    </footer>
  `;

  document.getElementById("root").innerHTML = '';
    document.getElementById("root").appendChild(div);
  registerBtns();
    return div
}

async function toggleAllEdits() {
    const inputs = document.querySelectorAll(".info_item input")

    const userData = {};

    for (const input of inputs) {
        input.readOnly = !input.readOnly;

        const btn = input.parentElement.querySelector('.edit_btn');

        if (input.readOnly) {
            userData[input.id] = input.value;
            console.log(userData);
        }
    }

    if (inputs[0].readOnly) {
        try {
            const response = await fetch("/api/register", {
                method: "UPDATE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
    
            if (!response.ok) {
                throw new Error("Erro ao realizar o registro");
            }
    
            alert('Cadastro de usuário realizado com sucesso!');
        }
        catch (error) {
            console.error("Erro ao realizar o registro:", error);
            alert("Erro ao realizar o registro. Tente novamente");
        }
    }
}

export function navProfile(){
    const navHome = document.getElementById("navHome");
    const navHistory = document.getElementById("navHistory");
    const btnExit = document.getElementById("btnExit");


    navHome.addEventListener ("click",()=>{
        const customEvent = createCustomEvent('/home');
        window.dispatchEvent(customEvent); 
    })

    navHistory.addEventListener ("click",()=>{
        const customEvent = createCustomEvent('/history');
        window.dispatchEvent(customEvent); 
    })

    btnExit.addEventListener ("click",()=>{
        const customEvent = createCustomEvent('/');
        window.dispatchEvent(customEvent); 
        // falta limpar os cookies
    })
}

toggleModalPrivacy();
toggleModalTerms();
toggleModalSac();
toggleModalAccount();

const deleteAccount = document.getElementById("deleteAccount");

// deleteAccount.addEventListener("click", async function () {
//     try {
//         const response = await fetch("/api/register", {
//             method: "DELETE",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(userData),
//         });

//         if (!response.ok) {
//             throw new Error("Erro ao realizar o registro");
//         }

//         alert('Cadastro de usuário realizado com sucesso!');
//     }
//     catch (error) {
//         console.error("Erro ao realizar o registro:", error);
//         alert("Erro ao realizar o registro. Tente novamente");
//     }
// })