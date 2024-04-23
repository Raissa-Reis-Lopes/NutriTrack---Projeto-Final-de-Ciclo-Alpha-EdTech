import { showMessage } from "../utils/message.js";
import createCustomEvent from "./event.js";
import { limitDate } from"../utils/limitDates.js"
import { logout } from "../utils/logout.js";
import {  emailValid, passwordValid, heightValid, weightValid } from "./validation.js";
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
        <button id="btnExit" class="btn_stroke btn_exit">Sair</button>
    </nav>
    </header>
    <div id="message" class="message-container">
    <div id="message-content" class="message-content hidden"></div>
</div>
    <div class="profile_form">
        <div class="profile_picture">
            <input type="file" id="input-image" accept="image/*" style="display:none;" />
            <label for="input-image">
                <img src="../img/camera.png" alt="Imagem do usuario" />
            </label>
        </div>
        <div class="profile_info">
            <div class="info_item" id="name">
                <span>Nome: </span>
                <input id="input-name" type="text" value="" placeholder="Nome" readonly />
            </div>
            <div class="info_item" id="email">
                <span>Email: </span>
                <input id="input-email" type="email" value="" placeholder="email@example.com" readonly />
            </div>
            <div class="info_item" id="password">
                <span>Senha Atual: </span>
                <input id="input-password" type="password" value="" placeholder="*******" readonly />
            </div>
            <div class="info_item" id="new-password">
                <span>Nova Senha: </span>
                <input id="input-new-password" type="password" value="" placeholder="Nova Senha" readonly />
            </div>
            <div class="info_item" id="repeat-password">
                <span>Repetir Senha: </span>
                <input id="input-repeat-password" type="password" value="" placeholder="Repetir Senha" readonly />
            </div>
            <div class="info_item" id="weight">
                <span>Peso (KG): </span>
                <input id="input-weight" type="number" value="" placeholder="KG" readonly />
            </div>
            <div class="info_item" id="height">
                <span>Altura (CM): </span>
                <input id="input-height" type="number" value="" placeholder="CM" readonly />
            </div>
              <div class="info_item" id="birth">
                <span>Nascimento: </span>
                <input id="input-birth" type="date" value="" placeholder="" readonly />
            </div>
            <div class="info_item select_profile" id="gender">
                <label for="gender">Sexo biológico</label>
                <select name="gender" id="select-gender">
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                </select>
            </div>
            <div class="info_item select_profile" id="activity">
               <label for="activity">Nível de atividade</label>
                <select name="activity" id="select-activity">
                    <option value="sedentary">Sedentário</option>
                    <option value="lightlyActive">Leve</option>
                    <option value="moderatelyActive">Moderado</option>
                    <option value="veryActive">Ativo</option>
                    <option value="extraActive">Muito Ativo</option>
                </select>
            </div>
            <div class="info_item select_profile" id="plan">
                <label for="plan">Plano Alimentar</label>
                <select name="plan" id="select-plan">
                    <option value="1">Perder Peso</option>
                    <option value="2">Manter o peso</option>
                    <option value="3">Ganhar massa</option>
                </select>
            </div>
        </div>
    </div>
    <div>
        <button id="btn-save-changes" class="btn_stroke">Salvar Alterações</button>
        <button class="btn_stroke" id="btn-delete">APAGAR CONTA</button>
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
    fillProfileData();
    navProfile();
    limitDate("input-birth");
//   registerBtns();
    return div
}


//Função para resgatar os dados dos usuários e preencher os campos dos fomulários para mostrar ao usuário
export async function fillProfileData(){

    try {
        const userInfo = await fetch("/api/login/", {
            method: "GET",
          });

          if(!userInfo){
            throw new Error("Falha ao tentar localizar o id do usuário")
          }

          const userData = await userInfo.json();
          const userId = userData.user;

           // Obter dados do usuário com base no ID para o form 1
           const userMainInfo = await fetch(`/api/users/${userId}`,{
            method: "GET"
           });

           if(!userMainInfo){
            throw new Error("Falha ao buscar as informações do usuário")
           }

           const user = await userMainInfo.json();

           const userConfigInfo = await fetch(`/api/config/${userId}`,{
            method: 'GET',
            });

            if(!userConfigInfo){
                throw new Error("Falha ao buscar as informações de configuração do usuário")
            }

            const userConfig = await userConfigInfo.json();
        
            // Formatando a data no formato "yyyy-MM-dd"
            const birthDate = new Date(userConfig.birth_date);
            const formattedBirthDate = birthDate.toISOString().split('T')[0];
            

            
           // Preencher os campos do formulário com os dados do usuário e de configuração
           document.getElementById("input-name").value = user.username;
           document.getElementById("input-email").value = user.email;
            document.getElementById("input-weight").value = userConfig.weight;
            document.getElementById("input-height").value = userConfig.height;
            document.getElementById("input-birth").value = formattedBirthDate;
            document.getElementById("select-gender").value = userConfig.gender;
            document.getElementById("select-activity").value = userConfig.activity_level;
            document.getElementById("select-plan").value = userConfig.food_plan_id;

            } catch (error) {
                console.error(`Falha ao buscar os dados do usuário pelo id: `, error)
            }


            //Aqui eu vou pegar todos os inputs para colocar esse ouvinte de envento que ao clicar no input permite que ele seja editado
            const inputs = document.querySelectorAll(".info_item input");
            inputs.forEach(input => {
                input.addEventListener('click', enableEdit);
            });

}


function enableEdit(event) {
    const input = event.target;

    // Verifica o tipo de elemento
    if (input.tagName === 'SELECT') {
        input.disabled = false;
        input.addEventListener('change', handleInputChange);
    } else if (input.tagName === 'INPUT') {
        input.removeAttribute('readonly');
        input.addEventListener('blur', handleInputChange);
    }

    input.addEventListener('blur', disableEdit)
}

//Aqui, eu vou fazer as validações para ver se os novos valores que o usuário está colocando passam nas regras de negócio
function handleInputChange(event) {
    const input = event.target;
    const inputId = input.id;
    const inputValue = input.value;

    let isValid = true;

    const newPassword = document.getElementById("input-new-password").value;
    const repeatPassword = document.getElementById("input-repeat-password").value;

    switch (inputId) {
        case 'input-new-password':
            isValid = passwordValid(inputValue);
            if (!isValid) {
                showMessage("fail","A senha deve ter entre 8 e 15 caracteres, contendo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.");
            }
            break;
        case 'input-repeat-password':
            isValid = passwordValid(inputValue) && (newPassword === repeatPassword);

            if(!isValid){
                if(newPassword !== repeatPassword){
                    showMessage("fail","A nova senha não confere com a confirmação");
                } else {
                    showMessage("fail","A senha deve ter entre 8 e 15 caracteres, contendo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.");
                }
            }
            break;
        case 'input-email':
            isValid = emailValid(inputValue);
            if (!isValid) {
                showMessage("fail","Formato de e-mail inválido");
            }
            break;
        case 'input-weight':
            isValid = weightValid(inputValue);
            if (!isValid) {
                showMessage("fail","Peso inválido");
            }
            break; 
        case 'input-height':
            isValid = heightValid(inputValue);
            if (!isValid) {
                showMessage("fail","Altura inválida");
            }
            break;       
        default:
            break;
    }

    if(isValid){
        const btnSave = document.getElementById("btn-save-changes");
        btnSave.addEventListener("click", saveChanges);
    }
}

function disableEdit(event) {
    const input = event.target;

    // Verifica o tipo de elemento
    if (input.tagName === 'SELECT') {
        input.disabled = true;
        input.removeEventListener('change', handleInputChange);
    } else if (input.tagName === 'INPUT') {
        input.setAttribute('readonly', 'true');
        input.removeEventListener('blur', handleInputChange);
    }

    input.removeEventListener('blur', disableEdit);
}


async function saveChanges(){

    //Para o user (username, email, currentPassword, newPassword)
    const username = document.getElementById("input-name").value;
    const email = document.getElementById("input-email").value;
    const password = document.getElementById("input-password").value;
    const newPassword = document.getElementById("input-new-password").value;
    const confirmPassword = document.getElementById("input-repeat-password").value;
    
    //Para o configHistory (user_id, food_plan_id, activity_level, weight, height, birth_date, gender, date)
    const weight = document.getElementById("input-weight").value;
    const height = document.getElementById("input-height").value;
    const birthDate = document.getElementById("input-birth").value ;
    const gender = document.getElementById("select-gender").value ;
    const activityLevel = document.getElementById("select-activity").value;
    const selectedPlanId = document.getElementById("select-plan").value;
    const date = new Date().toLocaleDateString({
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).split('/').reverse().join('-');

    if(!username){
        showMessage('fail',"O nome de usuário não pode ficar vazio!");
        return;
    }

    if (!emailValid(email)) {
        showMessage('fail',"Formato de email inválido!");
        return;
    }

    //Essa validação das novas senhas só vai acontecer SE o usuário tiver optado por colocar uma nova senha ali, senão, essa validação será ignorada:
    if(newPassword || confirmPassword){
        if(!password){
            showMessage('fail',"Informe a sua senha atual");
            return;
        }

        if (!passwordValid(newPassword) || !passwordValid(confirmPassword)) {
            showMessage('fail',"Insira uma senha válida com no mín. 8 e no máx 15 caracteres, sendo pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial)");
            return;
        }
    
        if (newPassword !== confirmPassword){
            showMessage('fail',"A nova senha informada não confere com a confirmação");
            return;
        }
    }
        

    if(!weightValid(weight)){
        showMessage('fail',"Insira um peso válido");
        return;
    }

    if(!heightValid(height)){
        showMessage('fail',"Insira uma altura válida, em centímetros");
        return;
    }

    if(!birthDate){
        showMessage('fail',"A data de nascimento é obrigatória");
        return;
    }

    if(!gender){
        showMessage("fail","Selecione o sexo biológico");
        return;
    }

    if(!activityLevel){
        showMessage("fail","Selecione o nível de atividade semanal");
        return;
    }

    try {
        const getUserId = await fetch("/api/login/", {
            method: "GET",
        });

        if(getUserId.ok){
        const userIdResponse = await getUserId.json();
        const userId = userIdResponse.user;

          //Aqui eu vou ter que construi 2 tipos diferentes de userData para fazer o fetch, um que tem a senha e outro que não tem
          let userData;

          if(password && newPassword && confirmPassword){
              userData = {
                  username,
                  email,
                  newPassword,
                  currentPassword: password
              };
          } else {
              userData = {
                  username,
                  email
              };
          }

          //Para fucnionar o id do plano tem que ser enviado como número inteiro
          const selectedPlanId = parseInt(document.getElementById("select-plan").value, 10);

  
          const configData = {
              user_id: userId, 
              food_plan_id: selectedPlanId, 
              activity_level: activityLevel, 
              weight, 
              height, 
              birth_date: birthDate, 
              gender, 
              date
          }
        
            const userUpdateResponse = await fetch(`/api/users/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
    
            if (!userUpdateResponse.ok) {
                showMessage('fail',"Falha ao atualizar os dados do usuário");
                throw new Error("Erro ao atualizar os dados do usuário");
            } 

            const configUpdateResponse = await fetch('/api/config', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(configData),
            }); 

            if (!configUpdateResponse.ok) {
                showMessage('fail',"Falha ao atualizar os dados do usuário");
                throw new Error("Erro ao atualizar o registro do usuário");         
            } 

            // Mostrar mensagem de sucesso se passar por todas as etapas acima
            showMessage('success', "Dados atualizados com sucesso");

        } else{
            throw new Error("Falha ao obter ID do usuário");
        }
        } catch (error) {
            console.log("Falha ao completar a atualização dos dados", error.message)
            throw new Error("Erro ao atualizar o registro");
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

    btnExit.addEventListener ("click", logout);
   
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