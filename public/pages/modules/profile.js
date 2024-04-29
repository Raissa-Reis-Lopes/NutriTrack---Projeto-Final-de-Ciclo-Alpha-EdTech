import { showMessage } from "../utils/message.js";
import createCustomEvent from "./event.js";
import { limitDate } from"../utils/limitDates.js"
import { logout } from "../utils/logout.js";
import {  emailValid, passwordValid, heightValid, weightValid, escapeHtml, validateImageFormat } from "./validation.js";
import { privacyPolicyModal, termsModal, sacModal, deleteAccountModal, createModalEventsProfile } from "./modals.js";
import { footerProfile } from "./footer.js";
import { messageError } from "../utils/messageError.js"

export function Profile() {
    const div = document.createElement("div");

    div.innerHTML=`
    <div class="back_profile"></div>
    <div class="logo_profile" id="logo"></div>
    <header class="header_profile">
        <nav class="header_nav">
        <div id="navHome">Home</div>
        <div id="navHistory">Histórico</div>
        <button id="btnExit" class="btn_stroke btn_exit">Sair</button>
    </nav>
    </header>
    <div id="message" class="message-container hidden">
    <div id="message-content" class="message-content hidden"></div>
</div>
    <div class="profile_form">
    <h1 class="profile_title">Perfil</h1>
        <div class="profile_picture">
            <input type="file" id="input-image" accept="image/*" style="display:none;" />
            <label for="input-image">
            <div class="image-profile" style="cursor:pointer;">
                <img id="img-user" src="" alt="Imagem do usuario" />
                <div id="change-image-overlay" class="change-image-overlay">Alterar imagem</div>
            </div>
            </label>
            </div>
        <div id="message_picture"></div>
        <div class="profile_info">
            <div class="info_item" id="name">
                <span>Nome: </span>
                <input id="input-name" type="text" value="" placeholder="Nome" readonly />
            </div>
            <div id="message_name"></div>
            <div class="info_item" id="email">
                <span>Email: </span>
                <input id="input-email" type="email" value="" placeholder="email@example.com" readonly />
            </div>
            <div id="message_email"></div>
            <div class="info_item" id="password">
                <span>Senha Atual: </span>
                <input id="input-password" type="password" value="" placeholder="*******" readonly />
            </div>
            <div id="message_old_password"></div>
            <div class="info_item" id="new-password">
                <span>Nova Senha: </span>
                <input id="input-new-password" type="password" value="" placeholder="Nova Senha" readonly />
            </div>
            <div id="message_new_password"></div>
            <div class="info_item" id="repeat-password">
                <span>Repetir Senha: </span>
                <input id="input-repeat-password" type="password" value="" placeholder="Repetir Senha" readonly />
            </div>
            <div id="message_repeat_password"></div>
            <div class="info_item" id="weight">
                <span>Peso (KG): </span>
                <input id="input-weight" type="number" value="" placeholder="KG" readonly />
            </div>
            <div id="message_weight"></div> 
            <div class="info_item" id="height">
                <span>Altura (CM): </span>
                <input id="input-height" type="number" value="" placeholder="CM" readonly />
            </div>
            <div id="message_height"></div>
              <div class="info_item" id="birth">
                <span>Data de Nascimento: </span>
                <input id="input-birth" type="date" value="" placeholder="" readonly />
            </div>
            <div id="message_birthdate"></div>
            <div class="info_item select_profile" id="gender">
                <label for="gender">Sexo biológico</label>
                <select name="gender" id="select-gender">
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                </select>
            </div>
            <div id="message_gender"></div>
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
            <div id="message_activity"></div>
            <div class="info_item select_profile" id="plan">
                <label for="plan">Plano Alimentar</label>
                <select name="plan" id="select-plan">
                    <option value="1">Perder Peso</option>
                    <option value="2">Manter o peso</option>
                    <option value="3">Ganhar massa</option>
                </select>
            </div>
            <div id="message_plan"></div>
        </div>
    </div>
    <div class="btns_profile">
        <button id="btn-save-changes" class="btn_stroke">Salvar Alterações</button>
        <button class="btn_stroke" id="btn-delete">APAGAR CONTA</button>
    </div>
    </section>
    <!-- Tags para o footer e modais -->
    <section id="privacy_policy_container"></section>
    <section id="terms_container"></section>
    <section id="sac_container"></section>
    <section id="delete_account_container"></section>
    <section id="footer_container"></section>
  `;
  
    document.getElementById("root").innerHTML = '';
    document.getElementById("root").appendChild(div);

    fillProfileData();
    navProfile();
    limitDate("input-birth");
    
    //Adicionar um ouvinte de evento no input do Image para fazer o upload da foto
    const inputImage = div.querySelector("#input-image");
    inputImage.addEventListener("change", uploadImage);
    
    
    // Para os modais: Pegar a seção onde ele fica, chamar a função para obter o modal e adicionar ao container:
    const privacyModalContainer = document.getElementById('privacy_policy_container');
    const privacyModal = privacyPolicyModal();
    privacyModalContainer.appendChild(privacyModal);

    const termsContainer = document.getElementById("terms_container");
    const terms = termsModal();
    termsContainer.appendChild(terms);

    const sacContainer = document.getElementById("sac_container");
    const sac = sacModal();
    sacContainer.appendChild(sac);

    const deleteAccountContainer = document.getElementById("delete_account_container");
    const deleteAccountFuntion = deleteAccountModal();
    deleteAccountContainer.appendChild(deleteAccountFuntion);

     //Adicionar um ouvinte de evento para deletar a conta do usuário
     const btnDelete = document.getElementById('deleteAccount');
     btnDelete.addEventListener('click', deleteAccount)

     const footerContainer = document.getElementById("footer_container");
     const footer = footerProfile();
     footerContainer.appendChild(footer);


    //OBSERVAÇÃO, ESSE FUNCÃO TEM QUE VIR SÓ DEPOIS QUE PEGAR TODOS OS MODAIS
    createModalEventsProfile();

    // const btnSave = document.getElementById("btn-save-changes");
    // btnSave.addEventListener("click", saveChanges);
    activateSaveBtn();
    changeImageOverlay();

    return div
}


function changeImageOverlay(){
    const imageProfile = div.querySelector(".image-profile");
    const changeImageOverlay = div.querySelector("#change-image-overlay");

    imageProfile.addEventListener("mouseenter", () => {
        changeImageOverlay.style.display = "flex";
    });

    imageProfile.addEventListener("mouseleave", () => {
        changeImageOverlay.style.display = "none";
    });
}


//Função para só ativar o botão quando houver uma mudança e desativar quando ele for clicado, para não pemritir o envio de múltiplas requisições
export function activateSaveBtn() {
    const inputFields = document.querySelectorAll('.info_item input, .info_item select');
    const btnSaveChanges = document.getElementById('btn-save-changes');

    // Adicionar ouvinte de evento para cada campo de entrada e seleção
    inputFields.forEach(function (input) {
        input.addEventListener('input', function () {
            // Quando houver uma alteração, ativa o botão de salvar alterações
            btnSaveChanges.disabled = false;
            btnSaveChanges.addEventListener("click", saveChanges);
        });
    });
    btnSaveChanges.addEventListener('click', function () {
        this.disabled = true;
    });
};

async function getUserId(){
    try {
        const getUserId = await fetch("/api/login/", {
            method: "GET",
        });

        if(!getUserId.ok){
            throw new Error("Falha ao localizar o id do usuáiro")
        }
        const userIdResponse = await getUserId.json();
        const userId = userIdResponse.user;
        return userId;

    } catch (error) {
        
    }
}

export async function uploadImage(){
        const inputImage = document.querySelector("#input-image");
        const imgProfile = document.querySelector("#img-user");         
        const userId = await getUserId();
        const formData = new FormData();

        
        if (inputImage.files.length === 0) {
            console.log('Por favor, selecione uma imagem.');
            return;
        }
    
        const imageFile = inputImage.files[0];
        const imageName = imageFile.name;
    
        if (!validateImageFormat(imageName)) {
            messageError("message_picture","Formato de imagem inválido. Por favor, selecione uma imagem com formato jpeg, jpg, png ou gif")
            console.log('Formato de imagem inválido. Por favor, selecione uma imagem com formato jpeg, jpg, png ou gif.');
            return;
        }
        

        formData.append('avatar', inputImage.files[0]);
        
        
        
        try {
            const response = await fetch(`/api/upload/${userId}`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            
            if (data.success) {
                imgProfile.src = `/assets/${data.new_avatar}`; // Atualizando o src da imagem
                showMessage('success','Imagem atualizada com sucesso!', "-5%");
            } else {
                console.log("Falha ao atualizar a imagem");
            }
          
        } catch (error) {
            throw new Error("Falha ao carregar a imagem do usuário")
        }
}



//Função para resgatar os dados dos usuários e preencher os campos dos fomulários para mostrar ao usuário
export async function fillProfileData(){

    try {
        const userId = await getUserId();

           // Obter dados do usuário com base no ID para o form 1
           const userMainInfo = await fetch(`/api/users/${userId}`,{
            method: "GET"
           });

           if(!userMainInfo){
            throw new Error("Falha ao buscar as informações do usuário")
           }

           const user = await userMainInfo.json();

           const userAvatar = user.avatar_img;

           const imgProfile = document.querySelector("#img-user");
           imgProfile.src = `/assets/${userAvatar}`;
           

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
           document.getElementById("input-name").value = escapeHtml(user.username);
           document.getElementById("input-email").value = escapeHtml(user.email);
            document.getElementById("input-weight").value = escapeHtml(userConfig.weight);
            document.getElementById("input-height").value = escapeHtml(userConfig.height);
            document.getElementById("input-birth").value = escapeHtml(formattedBirthDate);
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
    const username = document.getElementById("input-name").value;


    switch (inputId) {
        case 'input-name':
            if(!username){
                isValid =false;
                messageError("message_name",`O nome não pode ser vazio`);
            } else{
                isValid = true;
            }
        break;
        case 'input-new-password':
            isValid = passwordValid(inputValue);
            if (!isValid) {
                messageError("message_password",
                `Insira uma senha válida:
                - mín. 8 e máx. 15 caracteres
                - pelo menos um número, uma letra maiúscula e uma minúscula
                - pelo menos um caractere especial`,5000,"0.8rem");
            }
            break;
        case 'input-repeat-password':
            isValid = passwordValid(inputValue) && (newPassword === repeatPassword);

            if(!isValid){
                if(newPassword !== repeatPassword){
                    messageError("message_repeat_password","As senhas não conferem")
                } else {
                    messageError("message_repeat_password",
                    `Insira uma senha válida:
                    - mín. 8 e máx. 15 caracteres
                    - pelo menos um número, uma letra maiúscula e uma minúscula
                    - pelo menos um caractere especial`,5000,"0.8rem")
                }
            }
            break;
        case 'input-email':
            isValid = emailValid(inputValue);
            if (!isValid) {
                messageError("message_email","Por favor, insira um email válido") 
            }
            break;
        case 'input-weight':
            isValid = weightValid(inputValue);
            if (!isValid) {
                messageError("message_weight","Peso inválido, insira um valor entre 10kg e 500kg")
            }
            break; 
        case 'input-height':
            isValid = heightValid(inputValue);
            if (!isValid) {
                messageError("message_height","Insira uma altura válida, em centímetros");
            }      
        default:
            break;
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
        messageError("message_name","O nome não pode ser vazio") 
        return;
    }

    if (!emailValid(email)) {
        messageError("message_email","Por favor, insira um email válido") 
        return;
    }

    //Essa validação das novas senhas só vai acontecer SE o usuário tiver optado por colocar uma nova senha ali, senão, essa validação será ignorada:
    if(newPassword || confirmPassword){
        if(!password){
            messageError("message_old_password","Informe a sua senha atual")
            return;
        }

        if (!passwordValid(newPassword)) {
            messageError("message_new_password",
            `Insira uma senha válida:
            - mín. 8 e máx. 15 caracteres
            - pelo menos um número, uma letra maiúscula e uma minúscula
            - pelo menos um caractere especial`,5000,"0.8rem");
            return;
        }

        if (!passwordValid(confirmPassword)) {
            messageError("message_repeat_password",
            `Insira uma senha válida:
            - mín. 8 e máx. 15 caracteres
            - pelo menos um número, uma letra maiúscula e uma minúscula
            - pelo menos um caractere especial`,5000,"0.8rem");
            return;
        }

        if (newPassword !== confirmPassword){
            messageError("message_repeat_password","As senhas não conferem")
            return;
        }
    }
        

    if(!weightValid(weight)){
        messageError("message_weight","Peso inválido, insira um valor entre 10kg e 500kg");
        return;
    }

    if(!heightValid(height)){
        messageError("message_height","Insira uma altura válida, em centímetros");
        return;
    }

    if(!birthDate){
        messageError("message_birthdate","A data de nascimento não pode ser vazia");
        return;
    }

    if(!gender){
        messageError("message_gender","Selecione o sexo biológico");
        return;
    }

    if(!activityLevel){
        messageError("message_activity","Selecione o nível de atividade semanal");
        return;
    }

    if(!selectedPlanId){
        messageError("message_plan","Escolha um plano alimentar");
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
                showMessage('fail',"Falha ao atualizar os dados do usuário","50%","5%");
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
                showMessage('fail',"Falha ao atualizar os dados do usuário","50%","5%");
                throw new Error("Erro ao atualizar o registro do usuário");         
            } 

            // Mostrar mensagem de sucesso se passar por todas as etapas acima
            showMessage('success', "Dados atualizados com sucesso","80%","10%","2");

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
    const logo = document.getElementById("logo");
 

    logo.addEventListener("click", ()=>{
        const customEvent = createCustomEvent('/home');
        window.dispatchEvent(customEvent); 
    })

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

export async function deleteAccount(){  
    console.log("Chegou aqui na função delete!");
    try {
        const userId = await getUserId();
        
        const deleteResponse = await fetch(`/api/users/${userId}`,{
            method: 'DELETE'
        })

        if (!deleteResponse.ok) {
            throw new Error('Falha ao excluir o usuário');
        }
    
        document.getElementById("modal-header-delete").style.display = "none";
        document.getElementById("body1").style.display = "none";
        document.getElementById("body2").style.display = "block";
        
        const responseData = await deleteResponse.json();       
        console.log('Usuário excluído com sucesso:', responseData);


        // Espera 2 segundos antes de redirecionar para a página inicial
        setTimeout(() => {
            const customEvent = createCustomEvent('/');
            window.dispatchEvent(customEvent);
        }, 2000);


    } catch (error) {
        console.log("Falha ao deletar o usuário",error.message)
    }

}
