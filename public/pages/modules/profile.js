import { showMessage } from "../utils/message.js";
import createCustomEvent from "./event.js";
import { limitDate } from"../utils/limitDates.js"
import { logout } from "../utils/logout.js";
import {  emailValid, passwordValid, heightValid, weightValid } from "./validation.js";

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
                <span>Senha: </span>
                <input id="input-password" type="password" value="" placeholder="*******" readonly />
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
            <!--  
            <div>
                <button id="save-changes" class="btn_stroke">Salvar Alterações</button>
            </div>
            -->
        </div>
    </div>
    <div>
        <button id="btn-save-changes" class="btn_stroke">Salvar Alterações</button>
        <button class="btn_stroke" id="btn-delete">APAGAR CONTA</button>
    </div>
    <footer>
        <div class="footer_history">
            <span>all rights reserved</span>
            <span id="open-modal-terms">termos de uso</span>
            <span id="open-modal-privacy">política de privacidade</span>
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
        
           // Preencher os campos do formulário com os dados do usuário
           document.getElementById("input-name").value = user.username;
           document.getElementById("input-email").value = user.email;

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
        input.disabled = true;
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

    switch (inputId) {
        case 'input-password':
            isValid = passwordValid(inputValue);
            if (!isValid) {
                showMessage("fail","A senha deve ter entre 8 e 15 caracteres, contendo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.");
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
                showMessage("fail","Peso inválido");
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
        input.disabled = false;
        input.removeEventListener('change', handleInputChange);
    } else if (input.tagName === 'INPUT') {
        input.setAttribute('readonly', 'true');
        input.removeEventListener('blur', handleInputChange);
    }

    input.removeEventListener('blur', disableEdit);
}


async function saveChanges(){
    try {
        
    } catch (error) {
        
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

export function btnProfile(){
    //Falta fazer a lógica para deletar a conta
    const btnDelete = document.getElementById('btn-delete');
    const btnSaveChanges = document.getElementById("btn-save-changes");

}