import createCustomEvent from "./event.js";
import { heightValid, weightValid } from "./validation.js";
import { showMessage } from "../utils/message.js";
import { limitDate } from "../utils/limitDates.js";


export function Config() {
    const div = document.createElement("div");

    div.innerHTML=`
    <header>
    <div class="logo" id="logo">
            <img src="../img/logo.svg" alt="NutriTrack">
    </div>
    </header>
    <main class="welcome"> 
    <div id="message" class="message-container">
    <div id="message-content" class="message-content hidden"></div>
    </div>
        <form id="form2" method="post" class="calculator_input" style="display:none;">
        <h1>Agora, vamos calcular seu gasto energético diário!</h1>
            <div class="form">
                <label for="weight">Peso</label>
                <input type="number" name="weight" id="weight" min="10" max="500" maxlength="3" placeholder="KG" required />
                <div id ="erroWeight" class="erro"></div>
            </div>
            <div class="form">
                <label for="height">Altura</label>
                <input type="number" name="height" id="height" min="10" max="300" maxlength="3" placeholder="CM" required />
                <div id ="erroHeight" class="erro"></div>
            </div>
            <div class="form">
                <label for="date">Data de nascimento</label>
                <input type="date" name="date" id="birth_date" />
            </div>
            <div class="form">
                <label for="gender">Sexo biológico</label>
                <select name="gender" id="gender">
                    <option value="">Selecione</option>
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                </select>
            </div>
            <div class="form">
                <label for="activity">Nivel de atividade</label>
                <select name="activity" id="activity">
                    <option value="">Selecione</option>
                    <option value="sedentary">Sedentário</option>
                    <option value="lightlyActive">Leve</option>
                    <option value="moderatelyActive">Moderado</option>
                    <option value="veryActive">Ativo</option>
                    <option value="extraActive">Muito Ativo</option>
                </select>
            </div>
            <div class="btns_index">
                <button id="btn_back" class="btn_stroke">Voltar</button>
                <button id="btn_next_2" class="btn_colorLinear">Próximo</button>
            </div>
        </form>
        <form id="form3" method="post" style="display:none;">
        <h1>Escolha seu plano alimentar!</h1>
            <div class="container_center">
                <div class="plan">
                    <div id="plan1" class="chosenPlan">
                        <h1>Perder peso</h1>
                        <div class="flip-card">
                            <div class="flip-card-inner">
                                <div class="flip-card-front">
                                    <h1>45% Carboidratos</h1>
                                    <h1>30% Proteínas</h1>
                                    <h1>25% Gorduras</h1>
                                </div>
                                <div class="flip-card-back">
                                    <p>Essa dieta contém todos os ingredientes necessários e a alta ingestão de proteína ajuda a manter o corpo em forma e reduzir a fome, auxiliando na manutenção da baixa ingestão de calorias!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="plan2" class="chosenPlan">
                        <h1>Manter o peso</h1>
                        <div class="flip-card">
                            <div class="flip-card-inner">
                                <div class="flip-card-front">
                                    <h1>55% Carboidratos</h1>
                                    <h1>15% Proteínas</h1>
                                    <h1>30% Gorduras</h1>
                                </div>
                                <div class="flip-card-back">
                                    <p>Essa dieta se baseia nas diretrizes da boa nutrição e te ajudará a manter o peso atual com uma alimentação saudável e balanceada!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="plan3" class="chosenPlan">
                        <h1>Ganhar peso</h1>
                        <div class="flip-card">
                            <div class="flip-card-inner">
                                <div class="flip-card-front">
                                    <h1>50% Carboidratos</h1>
                                    <h1>25% Proteínas</h1>
                                    <h1>25% Gorduras</h1>
                                </div>
                                <div class="flip-card-back">
                                    <p>Essa dieta é recomendada para as pessoas que querem ganhar massa muscular e melhorar a sua performance! O balanceamento de gorduras e carboidratos darão energia, e a proteína auxiliará o desenvolvimento muscular!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="btns_index">
                <button id="btn_back_3" class="btn_stroke">Voltar</button>
                <button id="btn_next_3" class="btn_colorLinear">Próximo</button>
            </div>
        </form>

       

    </main>
    <footer>
        <span>all rights reserved</span>
    </footer>
    `;

    document.getElementById("root").innerHTML = '';
    document.getElementById("root").appendChild(div);
    configBtns();
    limitDate('birth_date');
    addEventListenerToPlans();
    return div
}

// Armazenar o ID do plano selecionado em uma variável global
let selectedPlanId = null;

// Função para mudar a borda do plano selecionado
function selectPlan(planId) {
    // Resetar a borda de todos os planos
    const plans = document.querySelectorAll('.chosenPlan');
    plans.forEach(plan => {
        plan.classList.remove('selected');
    });

    // Mudar a borda do plano selecionado
    const selectedPlan = document.getElementById(planId);
    selectedPlan.classList.add('selected');

    switch (planId) {
        case "plan1":
            selectedPlanId = 1;
            break;
        case "plan2":
            selectedPlanId = 2;
            break;
        case "plan3":
            selectedPlanId = 3;
            break;
        default:
            break;
    }
}

function addEventListenerToPlans(){
    // Adicionar eventos de clique aos planos
document.getElementById('plan1').addEventListener('click', () => selectPlan('plan1'));
document.getElementById('plan2').addEventListener('click', () => selectPlan('plan2'));
document.getElementById('plan3').addEventListener('click', () => selectPlan('plan3'));
}

export function configBtns() {

    //Separei o form 1 do cadastro em outra página
    let currentForm = 2;
    showForm(currentForm);

    const btnBack = document.getElementById("btn_back");
    const btnNext2 = document.getElementById("btn_next_2");
    const btnNext3 = document.getElementById("btn_next_3");

    btnBack.addEventListener("click", () => {
            const customEvent = createCustomEvent('/login');
            window.dispatchEvent(customEvent);
    });

        btnNext2.addEventListener('click', async(event) =>{
            event.preventDefault();

            

            // const erroWeight = document.getElementById("erroWeight");
            // const erroHeight = document.getElementById("erroHeight");
            // erroWeight.innerText = ''; // Limpa mensagens antigas de erro
            // erroHeight.innerText = ''; // Limpa mensagens antigas de erro
            // // const message = document.getElementById ("message-content"); //Para testar o "pop-up" e ver como fica melhor
    

            const weight = document.getElementById("weight").value;
            const height = document.getElementById("height").value;
            const birthDate = document.getElementById("birth_date").value;
            const gender = document.getElementById("gender").value;
            const activityLevel = document.getElementById("activity").value;


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

            currentForm++;
            showForm(currentForm);

            btnNext3.addEventListener('click', async(event)=>{
                event.preventDefault();

                const getUserId = await fetch("/api/login/", {
                    method: "GET",
                });

                if(getUserId){
                    const userData = await getUserId.json();
                    const userId = userData.user;


                    const date = new Date().toLocaleDateString({
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    }).split('/').reverse().join('-');
    
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

                    console.log(configData);


                    try {
                        const response = await fetch('/api/config', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(configData),
                        }); 

                        if (response.ok) {
                            const customEvent = createCustomEvent('/home');
                            window.dispatchEvent(customEvent);           
                        } else {
                            showMessage("fail", "Erro ao finalizar o cadastro")
                            throw new Error("Erro ao finalizar o cadastro");
                        }                     
                       
                    } catch (error) {
                        console.error('Erro ao se cadastrar:', error);
                    }
                } else {
                    console.log('Não foi possível obter informações do usuário');
                }
            }) 
        })
}

function showForm(formNumber) {
    document.getElementById("form2").style.display = "none";
    document.getElementById("form3").style.display = "none";
    document.getElementById(`form${formNumber}`).style.display = "block";
}

