import { showMessage } from "../utils/message.js";
import createCustomEvent from "./event.js";

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
                <span>Peso: </span>
                <input type="number" value="KG" readonly />
            </div>
            <div class="info_item" id="altura">
                <span>Altura: </span>
                <input type="number" value="CM" readonly />
            </div>
            <!--  
            <div class="info_item" id="age">
                <span>Idade: </span>
                <input type="number" value="DD/MM/AAAA" readonly />
            </div>
            -->
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
//   registerBtns();
    return div
}


//FUnção para resgatar os dados dos usuários e preencher os campos dos fomulários para mostrar ao usuário
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
           document.getElementById("name").value = user.name;
           document.getElementById("email").value = user.email;
           document.getElementById("password").value = user.password;

           const userConfigInfo = await fetch(`/api/config${userId}`,{
            method: 'GET',
            });
            document.getElementById("weight").value = user.weight;
            document.getElementById("height").value = user.height;
            document.getElementById("birthDate").value = user.birth_date;
            document.getElementById("gender").value = user.gender;
            document.getElementById("activityLevel").value = user.activity_level;
            document.getElementById("plan").value = user.food_plan;

            } catch (error) {
                console.log(`Falha ao buscar os dados do usuário pelo id: `, error)
            }
}


//FUnção para resgatar os dados dos usuários e preencher os campos dos fomulários para mostrar ao usuário
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
           document.getElementById("name").value = user.name;
           document.getElementById("email").value = user.email;
           document.getElementById("password").value = user.password;

           const userConfigInfo = await fetch(`/api/config${userId}`,{
            method: 'GET',
            });
            document.getElementById("weight").value = user.weight;
            document.getElementById("height").value = user.height;
            document.getElementById("birthDate").value = user.birth_date;
            document.getElementById("gender").value = user.gender;
            document.getElementById("activityLevel").value = user.activity_level;
            document.getElementById("plan").value = user.food_plan;

            } catch (error) {
                console.log(`Falha ao buscar os dados do usuário pelo id: `, error)
            }
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