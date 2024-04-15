import createCustomEvent from "./event.js";
import { registerBtns } from "./register.js";
export function Plan() {
    const div = document.createElement("div");

    div.innerHTML=`
    <div class="back_general"></div>
    <header>
        <div class="logo" id="logo">
            <a href="">
                <img src="../img/logo.svg" alt="NutriTrack" />
            </a>
        </div>
    </header>
    <main>
        <h1 class="title_plan">Escolha o seu plano alimentar!</h1>
        <div id="form3" class="container_center">
            <div class="plan">
                <div>
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
                <div>
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
                <div>
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
            <div class="btns-bot">
                <button id="btn_back_plan" class="btn_stroke">Voltar</button>
                <button id="btn_next_plan" class="btn_colorLinear">Próximo</button>
            </div>
        </div>
    </main>
  `;

  document.getElementById("root").innerHTML = '';
    document.getElementById("root").appendChild(div);
  registerBtns();
    return div
}

// precisa ver se não tem informação repetida e adicionar informações no banco de dados

// export function registerBtns(){
//     const btnBack = document.getElementById("btn_back");
//     const btnNext = document.getElementById("btn_next");
 
//     if(btnBack){
//         btnBack.addEventListener ("click",()=>{
//             const customEvent = createCustomEvent('/calculator');
//             history.pushState({}, '', '/calculator');
//             window.dispatchEvent(customEvent);
//         })
//     }
//     sem verificação
//     if(btnNext){
//         btnNext.addEventListener ("click",()=>{
//             const customEvent = createCustomEvent('/home');
//             history.pushState({}, '', '/home');
//             window.dispatchEvent(customEvent); 
//         })
//     }
    
//     btnNext.addEventListener("click", async () => {
//         const name = document.getElementById("name").value;
//         const email = document.getElementById("email").value;
//         const password = document.getElementById("password").value;

//         try {
//             const response = await fetch('/api/register', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ name, email, password }),
//             });

//             if (!response.ok) {
//                 throw new Error('Erro ao registrar');
//             }

//             const customEvent = createCustomEvent('/forms');
//             history.pushState({}, '', '/forms');
//             window.dispatchEvent(customEvent); 
//         } catch (error) {
//             console.error('Erro ao registrar:', error);
//         }
//     });
// }
