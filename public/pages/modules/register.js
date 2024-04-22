import createCustomEvent from "./event.js";
import { heightValid, weightValid, emailValid, passwordValid, escapeHtml } from "./validation.js";
import { showMessage } from "../utils/message.js";
import { limitDate } from "../utils/limitDates.js";
import { toggleModalPrivacy, toggleModalTerms } from "../../scripts/modalTerms.js";


export function Register() {
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
        <form id="form1" method="post" class="form_input">
        <h1>Para começar, precisamos te conhecer um pouco melhor!</h1>
            <label for="name">Nome</label>
            <input type="text" name="name" id="name">
            <div id ="erroNameRegister" class="erro"></div>
            <label for="email">E-mail</label>
            <input type="email" name="email" id="email">
            <div id ="erroEmailRegister" class="erro"></div>
            <label for="password">Senha</label>
            <input type="password" name="password" id="password">
            <label for="password">Repetir Senha</label>
            <input type="password" name="password" id="confirm_password">
            <div id ="erroPasswordRegister" class="erro"></div>
            
            <label for="terms">Li e concordo com a <span id="open-modal-privacy">política de privacidade</span> e <span id="open-modal-terms">termos de uso</span></label>
            <input type="checkbox" name="terms" id="terms">
            <div id ="erroTerms" class="erro"></div>
        
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
        </section>
        <div class="btns_index">
            <button id="btn_back" class="btn_stroke">Voltar</button>
            <button id="btn_next" class="btn_colorLinear">Próximo</button>
        </div>
        </form>
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
    registerBtns();
    limitDate('birth_date');
    addEventListenerToPlans();
    return div
}


//Para limitar a data de nascimento (não pode selecionar uma data que ainda não chegou)
// function limitBirthDate(){
//       //Limitando a data de nascimento no calendário para não poder selecionar dias acima do dia atual
//       const today = new Date();
//       const yyyy = today.getFullYear();
//       let mm = today.getMonth() + 1;
//       let dd = today.getDate();
      
//       if (mm < 10) {
//           mm = '0' + mm;
//       }
      
//       if (dd < 10) {
//           dd = '0' + dd;
//       }
      
//       const maxDate = yyyy + '-' + mm + '-' + dd;
      
//       document.getElementById('birth_date').setAttribute('max', maxDate);
// }

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

export function registerBtns() {

    

    let currentForm = 1;

    // const foodPlan = document.getElementById("food_plan").value;  
   

    const btnBack = document.getElementById("btn_back");
    const btnNext = document.getElementById("btn_next");
    const btnNext2 = document.getElementById("btn_next_2");
    const btnNext3 = document.getElementById("btn_next_3");
  
    let messageName = ''; // Inicialização das variáveis
    let messageEmail = ''; // Inicialização das variáveis
    let messagePassword = ''; // Inicialização das variáveis
    let messageTerms = '';    // Inicialização das variáveis 
    let messageWeight = ''; // Inicialização das variáveis
    let messageHeight = '';    // Inicialização das variáveis 

    btnBack.addEventListener("click", () => {
            const customEvent = createCustomEvent('/');
            window.dispatchEvent(customEvent);
    });

    //Para o primeiro forms do cadastro
        btnNext.addEventListener("click", async (event)=>{
        event.preventDefault()
       
        const erroName = document.getElementById("erroNameRegister");
        const erroEmail = document.getElementById("erroEmailRegister");
        const erroPassword = document.getElementById("erroPasswordRegister");
        const erroTerms = document.getElementById("erroTerms")
        erroName.innerText = ''; // Limpa mensagens antigas de erro
        erroEmail.innerText = ''; // Limpa mensagens antigas de erro
        erroPassword.innerText = ''; // Limpa mensagens antigas de erro
        erroTerms.innerText = '';
        const message = document.getElementById ("message-content"); //Para testar o "pop-up"


        const username = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm_password").value;
        const terms = document.getElementById("terms").checked;

        if(!username){
            messageName = escapeHtml("Nome inválido!"); 
            erroName.appendChild(document.createTextNode(messageName));
            return;
        }
    
    
        if (!emailValid(email)) {
            messageEmail = escapeHtml("Por favor, insira um email válido."); 
            erroEmail.appendChild(document.createTextNode(messageEmail));
            return;
        }
            
        if (!passwordValid(password)) {
            messagePassword = escapeHtml("Por favor, insira uma senha válida (Ela deve ter no mín 8 e no máx 15 caracteres, sendo pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial)."); 
            erroPassword.appendChild(document.createTextNode(messagePassword));
            return;
        }
    
        if (password !== confirmPassword){
            messagePassword = escapeHtml("As senhas precisam ser iguais"); 
            erroPassword.appendChild(document.createTextNode(messagePassword));
            return;
        }

        if(!terms){
            messageTerms = escapeHtml("É necessário ler e concordar com os termos de uso e privacidade"); 
            erroTerms.appendChild(document.createTextNode(messageTerms));
            return;
        }

        
        const userData = {
            username,
            email,
            password
        };
      
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
                    
                    showMessage("success", "Parabéns, você deu o primeiro passo para mudar a sua vida!");
                } catch (error) {
                    console.error('Erro ao fazer login:', error);
                }

                            
                const userInfoResponse = await fetch("/api/login/", {
                    method: "GET",
                });

                if (userInfoResponse.ok) {
                    const userData = await userInfoResponse.json();
                    // console.log(userData.user);
                } else {
                    console.log('Não foi possível obter informações do usuário');
                }

                currentForm++;
                showForm(currentForm);

            }
            catch (error) {
                console.error("Erro ao realizar o registro:", error);
                showMessage("fail", "Erro ao realizar o registro. Tente novamente")
            }
        })
    

        btnNext2.addEventListener('click', async(event) =>{
            event.preventDefault();

            

            const erroWeight = document.getElementById("erroWeight");
            const erroHeight = document.getElementById("erroHeight");
            erroWeight.innerText = ''; // Limpa mensagens antigas de erro
            erroHeight.innerText = ''; // Limpa mensagens antigas de erro
            const message = document.getElementById ("message-content"); //Para testar o "pop-up" e ver como fica melhor
    

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


                    try {
                        const response = await fetch('/api/config', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(configData),
                        }); 

                        if (!response.ok) {
                            showMessage("fail", "Erro ao finalizar o cadastro")
                            throw new Error("Erro ao finalizar o cadastro");
                        }                               
                        const customEvent = createCustomEvent('/home');
                        window.dispatchEvent(customEvent); 
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
    document.getElementById("form1").style.display = "none";
    document.getElementById("form2").style.display = "none";
    document.getElementById("form3").style.display = "none";
    document.getElementById(`form${formNumber}`).style.display = "block";
}

function nextStep(step) {
    if (step === 1) {
        showForm(2);
    } else if (step === 2) {
        showForm(3);
    }
}

toggleModalPrivacy();
toggleModalTerms();