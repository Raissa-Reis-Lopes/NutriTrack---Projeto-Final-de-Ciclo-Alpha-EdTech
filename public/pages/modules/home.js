import createCustomEvent from "./event.js";
import {AddFood, SearchFood} from "./modals.js";
import { limitDate } from "../utils/limitDates.js";
import { logout } from "../utils/logout.js";
import { generateDonutChart, updateCharts } from '../utils/donutchart.js';
import { showMessage } from "../utils/message.js";

let proteinChartInstance = null;
let carboChartInstance = null;
let lipidChartInstance = null;

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
                    <img id="img-user" src="" alt="Imagem do usuario" />
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
            <p><span id="remaining-calories"></span></p>
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
                <span class="span_green ">Proteínas (g)</span>
                <div>
                    <div class="chart" id="protein-chart"></div>
                    </div>
                    <div class="chart-subtitle">
                    <span id="consumed-protein"></span>/<span id="total-protein"></span>
                    </div>
            </div> 
            <div class="chart-container">
                <span class="span_green ">Carboidratos (g)</span>
                <div>
                    <div class="chart" id="carbo-chart"></div>
                    </div>
                    <div class="chart-subtitle">
                    <span id="consumed-carbo"></span>/<span id="total-carbo"></span>
                    </div>
            </div>             
            <div class="chart-container">
                <span class="span_green ">Gorduras (g)</span>
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
    currentDate.setMinutes(currentDate.getMinutes() - currentDate.getTimezoneOffset()); // Ajusta para UTC
    const currentDateString = currentDate.toISOString().split('T')[0]; // Formata a data para o formato do input date
    const inputDate = document.getElementById('input-date');
    inputDate.value = currentDateString; // Define a data atual no input

    loadUserDataForDate(currentDateString); // Carrega os dados do dia atual

    inputDate.addEventListener("change", function() {
        const selectedDate = inputDate.value;
        loadUserDataForDate(selectedDate); // Carrega os dados para a data selecionada
    });

    return div
}

function clearScreenValues() {
    // Limpa os valores do usuário
    document.getElementById('total-calories').innerText = 0;
    document.getElementById('total-protein').innerText = 0;
    document.getElementById('total-carbo').innerText = 0;
    document.getElementById('total-lipid').innerText = 0;
    document.getElementById('consumed-calories').innerText = 0;
    document.getElementById('consumed-protein').innerText = 0;
    document.getElementById('consumed-carbo').innerText = 0;
    document.getElementById('consumed-lipid').innerText = 0;
    document.getElementById("remaining-calories").innerText ="Você ainda pode ingerir 0 calorias!" ;

    // Limpa a barra de progresso
    const progressBar = document.getElementById('calories-progress');
    progressBar.style.width = '0%';
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

async function getUsername(userId){
    try {
        const getUsername = await fetch(`/api/users/${userId}`,{
            method: "GET",
        });

        if(!getUsername.ok){
            throw new Error("Erro ao localizar o nome do usuário pelo id"); 
        }

        const userData = await getUsername.json();

        const username = userData.username;

        return username;
    } catch (error) {
        
    }
}

async function getUserAvatar(userId){
    try {
        const getUserAvatar = await fetch(`/api/users/${userId}`,{
            method: "GET",
        });

        if(!getUserAvatar.ok){
            throw new Error("Erro ao localizar a foto do usuário pelo id"); 
        }

        const userData = await getUserAvatar.json();

        const avatar = userData.avatar_img;

        return avatar;
    } catch (error) {
        
    }
}

async function loadUserDataForDate(date) {
    clearScreenValues(); // Limpa os valores da tela
    try { 
         const userId = await getUserId();

        if(userId){

            const username = await getUsername(userId);

            const usernameElement = document.getElementById('username');
            usernameElement.innerText = username;

            const userAvatar = await getUserAvatar(userId);

           // Pegar o local onde está a imagem do usuário na home
            const imgHome = document.querySelector("#img-user");
            imgHome.src = `/assets/${userAvatar}`;

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

            const userDailyConsumed = await getDailyConsumed.json();     
               
            const totalNutrition = userDailyConsumed.data.totalNutrition;

            const dailyCaloriesConsumed = Math.ceil(totalNutrition.calories) || 0;
            const dailyProteinConsumed = Math.ceil(totalNutrition.protein)  || 0; 
            const dailyCarbohydrateConsumed = Math.ceil(totalNutrition.carbohydrate)  || 0;
            const dailyLipidConsumed = Math.ceil(totalNutrition.lipid)  || 0;

            const consumedProtein = document.getElementById("consumed-protein");
            consumedProtein.innerText = dailyProteinConsumed;
            
            const consumedCarbo = document.getElementById("consumed-carbo");
            consumedCarbo.innerText = dailyCarbohydrateConsumed;
            
            const consumedLipid = document.getElementById("consumed-lipid");
            consumedLipid.innerText = dailyLipidConsumed;

            const consumedCalories = document.getElementById('consumed-calories');
            consumedCalories.innerText = dailyCaloriesConsumed;


            //Para fazer aquela barrinha de consumo de calorias:
            const remainingCaloriesValue = userTotalCalories - dailyCaloriesConsumed;

            const remainingCalories = document.getElementById("remaining-calories");
            let message = `Você ainda pode ingerir ${remainingCaloriesValue} calorias!`;
            remainingCalories.innerText = message;

            // Atualizar a barra de progresso
            const progressBar = document.getElementById('calories-progress');
            const totalCalories = userTotalCalories;
            let consumedPercent = (dailyCaloriesConsumed / totalCalories) * 100;

            // Verifica se ultrapassou a quantidade total diária permitida
            if (dailyCaloriesConsumed > totalCalories) {
                progressBar.style.backgroundColor = '#f44336'; 
                consumedPercent = 100; 
                const exceededCalories = dailyCaloriesConsumed - totalCalories;
                message = `Você ultrapassou ${exceededCalories} calorias`;
            } else {
                progressBar.style.backgroundColor = '#4caf50'; 
            }

            progressBar.style.width = consumedPercent + '%';
            remainingCalories.innerText = message;


            proteinChartInstance = updateOrCreateDonutChart('Proteínas', userTotalProtein, dailyProteinConsumed, proteinChartInstance, 'protein-chart', "#E96001", "#F5D8C4");
            carboChartInstance = updateOrCreateDonutChart('Carboidratos', userTotalCarbo, dailyCarbohydrateConsumed, carboChartInstance, 'carbo-chart', "#FF0DE5", "#FACFF6");
            lipidChartInstance = updateOrCreateDonutChart('Gorduras', userTotalLipid, dailyLipidConsumed, lipidChartInstance, 'lipid-chart', "#1E1BFF", "#D9D8F7");

        }
    } catch(error) {
        showMessage("fail","Não há alimentos cadastrados para a data selecionada");
    }
}

function updateOrCreateDonutChart(title, totalValue, consumedValue, chartInstance, chartElementId, color, bgColor) {
    if (!chartInstance) {
        const { chartInstance: newChartInstance, canvas } = generateDonutChart(title, totalValue, consumedValue, chartElementId, color, bgColor);
        document.getElementById(chartElementId).appendChild(canvas);
        return newChartInstance; 
    } else {
        updateCharts(chartInstance, title, totalValue, consumedValue, color, bgColor);
        return chartInstance;  
    }
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