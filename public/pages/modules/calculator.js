import createCustomEvent from "./event.js";
export function Calculator() {
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
    <main class="container_center">
        <div class="calculator">
            <h1 class="title_calculator">Agora, vamos calcular seu gasto energético diário!</h1>
            <div id="form2" class="calculator_input">
                <div class="form">
                    <label for="weight">Peso</label>
                    <input type="number" name="weight" id="weight" placeholder="CM" required />
                </div>
                <div class="form">
                    <label for="height">Altura</label>
                    <input type="number" name="height" id="height" placeholder="KG" required />
                </div>
                <div class="form">
                    <label for="date">Data de nascimento</label>
                    <input type="date" name="date" id="date" />
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
                        <option value="light">Leve</option>
                        <option value="moderate">Moderado</option>
                        <option value="active">Ativo</option>
                        <option valur="very_active">Muito Ativo</option>
                    </select>
                </div>
            </div>
            <div class="calculator_btn">
                <button id="btn_back_calculator" class="btn_stroke">Voltar</button>
                <button id="btn_next_calculator" class="btn_colorLinear">Próximo</button>
            </div>
        </div>
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
//             const customEvent = createCustomEvent('/register');
//             history.pushState({}, '', '/register');
//             window.dispatchEvent(customEvent); 
//         })
//     }
//     sem verificação
//     if(btnNext){
//         btnNext.addEventListener ("click",()=>{
//             const customEvent = createCustomEvent('/plan');
//             history.pushState({}, '', '/plan');
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
