import createCustomEvent from "./event.js";
import { heightValid, weightValid } from "./validation.js";
import { showMessage } from "../utils/message.js";
import { limitDate } from "../utils/limitDates.js";
import { messageError } from "../utils/messageError.js";
import { waveInput } from "../utils/waveInput.js";


export function Config() {
    const div = document.createElement("div");

    div.innerHTML=`
    <div class="back_general"></div>
    <header>
    <div class="logo" id="logo">
        <img src="../img/logo.svg" alt="NutriTrack">
    </div>
    </header>
    <main class="container_left container_login">
    <div class="register_container" id="form1" method="post" style="display:none;">
        <h1 class="title_register">Agora vamos calcular seu gasto energético diário!</h1>
        
        <div class="div_input_config">
        
        <div class="div_input_config_inner">
        <div class="form-control">
            <input type="number" id="weight" min="10" max="500" placeholder="KG" maxlength="3" required />
            <label>Peso</label>
        </div>
        <div id="message_weight"></div>


        <div class="form-control">
        <input placeholder="180 CM" type="number" id="height" min="10" max="300" maxlength="3" required />
            <label>Altura</label>
        </div>
        <div id="message_height"></div>

        <div id="message_birthdate" class="hidden"></div>
        <div class="form-control">
        <input type="date" name="date" id="birth_date" required />
        <label>Data de nascimento</label>
        </div>
        </div>

        <div class="div_input_config_inner_select">
        <div class="align_column_config">
        <label for="gender">Sexo biológico</label>
        <select class="input_config"  name="gender" id="gender">
            <option value="" disabled selected>Selecione</option>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
        </select>
        <div id="message_gender"></div>
        </div>
        <div class="align_column_config">
        <label for="activity">Nivel de atividade</label>
        <select class="input_config"  name="activity" id="activity">
            <option value="" disabled selected>Selecione</option>
            <option value="sedentary">Sedentário - Pouca ou nenhuma atividade física regular.</option>
            <option value="lightlyActive">Levemente Ativo - Alguma atividade física, como caminhada leve ou exercícios leves. </option>
            <option value="moderatelyActive">Moderadamente Ativo - Exercícios regulares, como caminhadas, corridas ou exercícios moderados. </option>
            <option value="veryActive">Ativo - Atividades físicas frequentes, como treinos regulares ou esportes recreativos. </option>
            <option value="extraActive">Muito Ativo - Atividades físicas intensas ou treinamento atlético regular. </option>
        </select>
        <div id="message_activity"></div>
        </div>
    </div>
    </div>
    <div class="btns_config">
    <button id="btn_next" class="btn_colorLinear">Próximo</button>
    <button id="btn_back" class="btn_stroke">Voltar</button>
    </div>
    </div>
   
    <div class="register_container" id="form2" method="post" style="display:none;">
        <h1 class="title_register">Escolha seu plano alimentar!</h1>
        <div class="div_input" >
            <div class="container_center">
                <div class="plan">
                    <div>
                        <h1>Perder peso</h1>
                        <div class="flip-card">
                            <div class="flip-card-inner chosenPlan" id="plan1">
                                <div class="flip-card-front" >
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
                    <div>
                        <h1>Manter o peso</h1>
                        <div class="flip-card">
                            <div class="flip-card-inner  chosenPlan"  id="plan2">
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
                    <div>
                        <h1>Ganhar peso</h1>
                        <div class="flip-card">
                            <div class="flip-card-inner chosenPlan"  id="plan3">
                                <div class="flip-card-front ">
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
        <div id="message" class="message-container hidden">
            <div id="message-content" class="message-content hidden"></div>
        </div>
        </div>
        <div id="message_plan"></div>
        <div class="btns_index">
            <button id="btn_next_2" class="btn_colorLinear">Próximo</button>
            <button id="btn_back_2" class="btn_stroke">Voltar</button>
        </div>
    </div>
</main>
<footer class="footer footer_full">
    <span>Todos os direitos reservados</span>
</footer>
    `;

    document.getElementById("root").innerHTML = '';
    document.getElementById("root").appendChild(div);
    configBtns();
    navConfig();
    limitDate('birth_date');
    addEventListenerToPlans();
    waveInput();
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


function navConfig(){
    const logo = document.getElementById("logo");
 
    logo.addEventListener("click", ()=>{
        const customEvent = createCustomEvent('/');
        window.dispatchEvent(customEvent); 
    })
}

function configBtns() {

    // let currentForm = 1;
    showForm(1);

    const btnBack = document.getElementById("btn_back");
    const btnBack2 = document.getElementById("btn_back_2");
    const btnNext1 = document.getElementById("btn_next");
    const btnNext2 = document.getElementById("btn_next_2");

    btnBack.addEventListener("click", () => {
            const customEvent = createCustomEvent('/login');
            window.dispatchEvent(customEvent);
    });

    btnBack2.addEventListener("click", ()=>{
        showForm(1);
    });

        btnNext1.addEventListener('click', async(event) =>{
            event.preventDefault();   

            const weight = document.getElementById("weight").value;
            const height = document.getElementById("height").value;
            const birthDate = document.getElementById("birth_date").value;
            const gender = document.getElementById("gender").value;
            const activityLevel = document.getElementById("activity").value;


            if(!weightValid(weight)){
                messageError("message_weight","Peso inválido, insira um valor entre 10kg e 500kg");
                return;
            }

            if(!heightValid(height)){
                messageError("message_height","Insira uma altura válida, em centímetros");
                return;
            }

            if(!birthDate){
                document.getElementById("message_birthdate").classList.remove("hidden");
                messageError("message_birthdate","A data de nascimento é obrigatória");
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

            showForm(2);

            btnNext2.addEventListener('click', async(event)=>{
                event.preventDefault();

                    const date = new Date().toLocaleDateString({
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    }).split('/').reverse().join('-');

                    if(!selectedPlanId){
                        messageError("message_plan","Escolha um plano alimentar");
                    }
    
                    const configData = {
                        food_plan_id: selectedPlanId, 
                        activity_level: activityLevel, 
                        weight, 
                        height, 
                        birth_date: birthDate, 
                        gender, 
                        date
                    }

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
                            showMessage("fail", "Falha ao finalizar o cadastro","-8%")
                            throw new Error("Erro ao finalizar o cadastro");
                        }                     
                       
                    } catch (error) {
                        console.error('Erro ao se cadastrar: ', error);
                    }
            }) 
        })
}

function showForm(formNumber) {
    document.getElementById("form1").style.display = "none";
    document.getElementById("form2").style.display = "none";
    document.getElementById(`form${formNumber}`).style.display = "flex";
}

