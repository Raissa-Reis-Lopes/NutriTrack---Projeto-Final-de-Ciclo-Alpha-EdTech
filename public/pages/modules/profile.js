import { showMessage } from "../utils/message.js";
import createCustomEvent from "./event.js";
import { limitDate } from"../utils/limitDates.js"
import { logout } from "../utils/logout.js";
import {  emailValid, passwordValid, heightValid, weightValid, escapeHtml } from "./validation.js";
import { privacyPolicyModal, termsModal, sacModal, deleteAccountModal, createModalEventsProfile } from "./modals.js";
import { footerProfile } from "./footer.js";

export function Profile() {
    const div = document.createElement("div");

    div.innerHTML=`
    <div class="back_profile"></div>
    <div class="logo_profile"></div>
    <header class="header_profile">
        <!-- 
        <div>
            <div class="logo" id="logo">
                <a>
                    <img src="../img/logo.svg" alt="NutriTrack" />
                </a>
            </div>
        </div>
        -->
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
            <div class="image-profile">
                <img id="img-user" src="" alt="Imagem do usuario" />
            </div>
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
    <div class="btns_profile">
        <button id="btn-save-changes" class="btn_stroke">Salvar Alterações</button>
        <button class="btn_stroke" id="btn-delete">APAGAR CONTA</button>
    </div>
    </section>
    <!-- Tags para o footer e modais -->
    <section id="privacy_policy_container">
    <section id="terms_container">
    <section id="sac_container">
    <section id="delete_account_container">
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
    
    
    // Para os modais: Pegar a seção onde ele fica, chamar a função para obter o modal, adicionar ao container:
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


    return div
}


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
        formData.append('avatar', inputImage.files[0]);
        
        if (inputImage.files.length === 0) {
            console.log('Por favor, selecione uma imagem.');
            return;
        }

        try {
            const response = await fetch(`/api/upload/${userId}`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            
            if (data.success) {
                imgProfile.src = `/assets/${data.new_avatar}`; // Atualizando o src da imagem
                showMessage('success','Imagem atualizada com sucesso!', );
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
    // const logo = document.getElementById("logo");
 

    // logo.addEventListener("click", ()=>{
    //     const customEvent = createCustomEvent('/home');
    //     window.dispatchEvent(customEvent); 
    // })

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
