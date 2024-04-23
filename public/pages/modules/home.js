import createCustomEvent from "./event.js";
import {AddFood, SearchFood} from "./modals.js";
import { limitDate } from "../utils/limitDates.js";
import { logout } from "../utils/logout.js";
import { generateDonutChart } from '../utils/donutchart.js';
import { showMessage } from "../utils/message.js";


export function Home() {
    const div = document.createElement("div");
    div.innerHTML=`  
        <header>
            <div class="logo" id="logo">
                <a href="/home">
                    <img src="./img/logo.svg" alt="NutriTrack">
                </a>
            </div>
            <nav class="header_nav">
                <div id="navProfile">Perfil</div>
                <div id="navHistory">Histórico</div>
                <button id="btnExit" class="btn_stroke btn_exit">Sair</button>
            </nav>
        </header>
        <div id="message" class="message-container">
        <div id="message-content" class="message-content hidden"></div>
        </div>
        <div class="container_home">
            <main class="main_home">
                <div class="welcome_message">
                    <div class="img_profile">
                        <img src="" alt="">
                    </div>
                    <div class="user_welcome">
                        <h1>Olá, <span id="username"></span></h1>
                        <p>Animado? Hoje é um novo dia de transformação!</p>
                    </div>
                </div>
                <div class="goal">
                    <p>Objetivo <span id="total-calories"></span> calorias</p>
                </div>
            </main>
            <section class="section_home">
            <div class="calories_eat">
            <p><span id="remaining-calories"></span> calorias!</p>
            <div class="calories_bar">
                <div class="calories_progress" id="calories-progress"></div>
            </div>
            <p><span id="consumed-calories"></span> calorias ingeridas</p>
        </div>

                <div id="date">
                    <input type="date" name="date" id="input-date">
                </div>
            </section>
            <section class="section_home">
            <div class="chart-container">
                <span class="span_green ">Proteínas</span>
                <div>
                    <div class="chart" id="protein-chart"></div>
                    </div>
                    <div class="chart-subtitle">
                    <span id="consumed-protein"></span>/<span id="total-protein"></span>
                    </div>
            </div> 
            <div class="chart-container">
                <span class="span_green ">Carboidratos</span>
                <div>
                    <div class="chart" id="carbo-chart"></div>
                    </div>
                    <div class="chart-subtitle">
                    <span id="consumed-carbo"></span>/<span id="total-carbo"></span>
                    </div>
            </div>             
            <div class="chart-container">
                <span class="span_green ">Gorduras</span>
                <div>
                    <div class="chart" id="lipid-chart"></div>
                    </div>
                <div class="chart-subtitle">
                <span id="consumed-lipid"></span>/<span id="total-lipid"></span>
                </div>
            </div>
            </section>
            <section class="section_food">
                <div class="section_food_title">
                    <h2>Café da manha</h2>
                    <div class="section_food_decoration"></div>
                    <button id="btn_add_breakfast" class="btn_stroke btn_add">Adicionar</button>
                </div>
                <div class="meal_add">
                    <div class="food_card">
                        <span>Porção de 100g</span>
                        <div>
                            <img src="" alt="">
                        </div>
                        <span>250 kcal</span>
                        <div class="food_edit">
                            <img src="./img/edit.svg" alt="edit">
                            <img src="./img/trash.svg" alt="delete">
                        </div>
                        
                    </div>
                
                </div>

            </section>
            <section class="section_food">
                <div class="section_food_title">
                    <h2>Almoço</h2>
                    <div class="section_food_decoration"></div>
                    <button id="btn_add_lunch" class="btn_stroke btn_add">Adicionar</button>
                </div>
                <div class="meal_add"></div>

            </section>
            <section class="section_food">
                <div class="section_food_title">
                    <h2>Jantar</h2>
                    <div class="section_food_decoration"></div>
                    <button id="btn_add_dinner" class="btn_stroke btn_add">Adicionar</button>
                </div>
                <div class="meal_add"></div>

            </section>
            <section class="section_food">
                <div class="section_food_title">
                    <h2>Lanche</h2>
                    <div class="section_food_decoration"></div>
                    <button id="btn_add_snack" class="btn_stroke btn_add">Adicionar</button>
                </div>
                <div class="meal_add"></div>

            </section>
        </div>

        <footer class="footer footer_home">
            <span>all rights reserved</span>
            <a href=""><span>Termos de uso</span></a>
            <a href=""><span>Politica de Privacidade</span></a>
            <div id="help">
                <img src="" alt="">
                <span>Precisa de ajuda</span>
            </div>
        </footer>
    `;
    document.getElementById("root").appendChild(div);
    navRoutes();
    homeBtns();
    limitDate('input-date');

    const currentDate = new Date(); // Obtém a data atual
    const currentDateString = currentDate.toISOString().split('T')[0]; // Formata a data para o formato do input date
    const inputDate = document.getElementById('input-date');
    inputDate.value = currentDateString; // Define a data atual no input

    loadUserDataForDate(currentDateString); // Carrega os dados do dia atual

    inputDate.addEventListener('change', function() {
        const selectedDate = inputDate.value;
        loadUserDataForDate(selectedDate); // Carrega os dados para a data selecionada
    });

    return div
}

async function loadUserDataForDate(date) {
    try { 
        const getUserId = await fetch("/api/login/", {
            method: "GET",
        });
        
        if(getUserId.ok){
            const userIdResponse = await getUserId.json();
            const userId = userIdResponse.user;

            const getUsername = await fetch(`/api/users/${userId}`,{
                method: "GET",
            });

            if(!getUsername.ok){
                throw new Error("Erro ao localizar o usuário pelo id"); 
            }

            const userData = await getUsername.json();
            console.log(userData);

            const username = document.getElementById('username');
            username.innerText = userData.username;

            const userAndDate = {
                user_id: userId,
                date: date
            }

            const getDailyGoal = await fetch('/api/calculate',{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userAndDate),
            });

            if (!getDailyGoal.ok) {
                throw new Error("Erro ao localizar o objetivo diário de consumo do usuário");         
            } 

            const userDailyGoal = await getDailyGoal.json();

            const userTotalCalories = userDailyGoal.data.total_calories;
            const userTotalProtein = userDailyGoal.data.total_protein;
            const userTotalCarbo = userDailyGoal.data.total_carb;
            const userTotalLipid = userDailyGoal.data.total_fat; 

            const totalCalorie = document.getElementById('total-calories');
            totalCalorie.innerText = userTotalCalories;

            const totalProteinSpan = document.getElementById("total-protein");
            totalProteinSpan.innerText = userTotalProtein;
            const totalCarboSpan = document.getElementById("total-carbo");
            totalCarboSpan.innerText = userTotalCarbo;
            const totalLipidSpan = document.getElementById("total-lipid");
            totalLipidSpan.innerText = userTotalLipid;


            const getDailyConsumed = await fetch(`/api/foodAdded/dailyConsumedWithDetail?user_id=${userId}&date=${date}`,{
                method: "GET",
            });

            if(!getDailyConsumed.ok){
                throw new Error("Erro ao localizar os alimentos adicionados pelo usuário"); 
            }

            const userDailyConsumed = await getDailyConsumed.json();

            if (!userDailyConsumed.data.totalNutrition) {
                const consumedProtein = document.getElementById("consumed-protein");
                const consumedCarbo = document.getElementById("consumed-carbo");
                const consumedLipid = document.getElementById("consumed-lipid");
                const consumedCalories = document.getElementById('consumed-calories');
                const remainingCalories = document.getElementById("remaining-calories");
                const progressBar = document.getElementById('calories-progress');
    
                consumedProtein.innerText = '0';
                consumedCarbo.innerText = '0';
                consumedLipid.innerText = '0';
                consumedCalories.innerText = '0';
    
                const userTotalCalories = userDailyGoal.data.total_calories;
                const totalCalorie = document.getElementById('total-calories');
                totalCalorie.innerText = userTotalCalories;
    
                let message = `Você ainda pode ingerir ${userTotalCalories} calorias!`;
                remainingCalories.innerText = message;
    
                progressBar.style.backgroundColor = '#4caf50'; // Cor verde
                progressBar.style.width = '0%';
    
                clearDonutCharts()

                generateDonutChart('Proteína', userTotalProtein, dailyProteinConsumed, 'protein-chart',"#E96001","#F5B689");
                generateDonutChart('Carboidratos', userTotalCarbo, dailyCarbohydrateConsumed, 'carbo-chart',"#FF0DE5","#FF9CF5");
                generateDonutChart('Gorduras',  userTotalLipid, dailyLipidConsumed, 'lipid-chart',"#1E1BFF","#A9A8F8");

                return;
            }

            console.log(userDailyConsumed);
            console.log(userDailyConsumed.data.totalNutrition);
            console.log(userDailyConsumed.data.totalNutrition.protein);
            

            const dailyCaloriesConsumed = Math.ceil(userDailyConsumed.data.totalNutrition.calories);
            const dailyProteinConsumed = Math.ceil(userDailyConsumed.data.totalNutrition.protein);
            const dailyCarbohydrateConsumed = Math.ceil(userDailyConsumed.data.totalNutrition.carbohydrate);
            const dailyLipidConsumed = Math.ceil(userDailyConsumed.data.totalNutrition.lipid);


            const consumedProtein = document.getElementById("consumed-protein");
            consumedProtein.innerText = dailyProteinConsumed;
            
            const consumedCarbo = document.getElementById("consumed-carbo");
            consumedCarbo.innerText = dailyCarbohydrateConsumed;
            
            const consumedLipid = document.getElementById("consumed-lipid");
            consumedLipid.innerText = dailyLipidConsumed;

            const consumedCalories = document.getElementById('consumed-calories');
            consumedCalories.innerText = dailyCaloriesConsumed;


            //Para fazer a barrinha de consumo de calorias:
            // const consumedCaloriesValue = dailyCaloriesConsumed;
            const remainingCaloriesValue = userTotalCalories - dailyCaloriesConsumed;

            // const consumedCalories = document.getElementById('consumed-calories');
            // consumedCalories.innerText = consumedCaloriesValue;

            const remainingCalories = document.getElementById("remaining-calories");
            let message = `Você ainda pode ingerir ${remainingCaloriesValue} calorias!`;
            remainingCalories.innerText = message;

            // Atualizar a barra de progresso
            const progressBar = document.getElementById('calories-progress');
            const totalCalories = userTotalCalories;
            let consumedPercent = (dailyCaloriesConsumed / totalCalories) * 100;

            // Verifica se ultrapassou a quantidade total diária permitida
            if (dailyCaloriesConsumed > totalCalories) {
                progressBar.style.backgroundColor = '#f44336'; // Cor vermelha
                consumedPercent = 100; // Define a barra para 100% caso ultrapasse
                const exceededCalories = dailyCaloriesConsumed - totalCalories;
                message = `Você ultrapassou ${exceededCalories} calorias`;
            } else {
                progressBar.style.backgroundColor = '#4caf50'; // Cor verde
            }

            progressBar.style.width = consumedPercent + '%';

            // Atualiza a mensagem de calorias restantes ou excedentes
            remainingCalories.innerText = message;

            // const consumedCaloriesValue = dailyCaloriesConsumed; // Já que você já arredondou para cima
            // const remainingCaloriesValue = userTotalCalories - consumedCaloriesValue;

            // // Atualizar a barra de progresso
            // const progressBar = document.getElementById('calories-progress');
            // const totalCalories = userTotalCalories;
            // const consumedPercent = (consumedCaloriesValue / totalCalories) * 100;

            // progressBar.style.width = consumedPercent + '%';



            clearDonutCharts()


            generateDonutChart('Proteína', userTotalProtein, dailyProteinConsumed, 'protein-chart',"#E96001","#F5B689");
            generateDonutChart('Carboidratos', userTotalCarbo, dailyCarbohydrateConsumed, 'carbo-chart',"#FF0DE5","#FF9CF5");
            generateDonutChart('Gorduras',  userTotalLipid, dailyLipidConsumed, 'lipid-chart',"#1E1BFF","#A9A8F8");
            //         // Atualizando os gráficos donut
            //  updateDonutChart('Proteína', userTotalProtein, 'protein-chart');
            //  updateDonutChart('Carboidratos', userTotalCarbo, 'carbo-chart');
            //  updateDonutChart('Gorduras', userTotalLipid, 'lipid-chart');
 

        }
    } catch(error) {
        showMessage("fail","Não há dados cadastrados para a data selecionada");
    }
}

function clearDonutCharts() {
    const proteinChart = document.getElementById('protein-chart');
    const carboChart = document.getElementById('carbo-chart');
    const lipidChart = document.getElementById('lipid-chart');

    proteinChart.innerHTML = '';  // Remove o conteúdo interno do gráfico
    carboChart.innerHTML = '';    // Remove o conteúdo interno do gráfico
    lipidChart.innerHTML = '';     // Remove o conteúdo interno do gráfico
}

export function navRoutes(){
    const navProfile = document.getElementById("navProfile");
    const navHistory = document.getElementById("navHistory");
    const btnExit = document.getElementById("btnExit");


    navProfile.addEventListener ("click",()=>{
        const customEvent = createCustomEvent('/profile');
        window.dispatchEvent(customEvent); 
    })

    navHistory.addEventListener ("click",()=>{
        const customEvent = createCustomEvent('/history');
        window.dispatchEvent(customEvent); 
    })

    btnExit.addEventListener ("click", logout)
}

export function homeBtns() {
    const btnBreakfast = document.getElementById("btn_add_breakfast");
    const btnLunch = document.getElementById("btn_add_lunch");
    const btnDinner = document.getElementById("btn_add_dinner");
    const btnSnack = document.getElementById("btn_add_snack");

    btnBreakfast.addEventListener("click", () => openModalWithMeal("breakfast"));
    btnLunch.addEventListener("click", () => openModalWithMeal("lunch"));
    btnDinner.addEventListener("click", () => openModalWithMeal("dinner"));
    btnSnack.addEventListener("click", () => openModalWithMeal("snack"));

    // document.querySelector('.modal_img img').addEventListener('click', () => {
    //     document.querySelector('.modal').remove();
    // });
}

// Função para abrir o modal de pesquisa de comida
function openModalWithMeal(meal) {
    const modal = SearchFood();
    const datafoodContainer = modal.getElementById("datafood");

    // fazer o fetch aqui

    document.body.appendChild(modal); // Adiciona o modal ao body
}

// Função para abrir o modal de adicionar comida
function openAddFoodModal(item, meal) {
    const modal = AddFood(); // Chama a função que cria o modal de adicionar comida
    // Define os valores no modal com base nos dados do item clicado
    modal.querySelector("#nameFood").textContent = item.name;
    modal.querySelector("#quantity_calories").textContent = item.calories;
    modal.querySelector("#quantity_carb").textContent = item.carbs;
    modal.querySelector("#quantity_proteins").textContent = item.proteins;
    modal.querySelector("#quantity_fat").textContent = item.fat;
    // Define a opção do select com base no meal
    modal.querySelector("#meal").value = meal;

    const btnSave = modal.querySelector(".btns_addFood button:last-child");
    btnSave.addEventListener("click", () => {
        const gramsInput = modal.querySelector("#grams").value;
        const mealSelect = modal.querySelector("#meal").value;
        console.log("Quantidade em gramas:", gramsInput);
        console.log("Refeição selecionada:", mealSelect);
        modal.remove(); // Fecha o modal após clicar em "Salvar"
    });

    document.body.appendChild(modal); // Adiciona o modal ao body
}