import createCustomEvent from "./event.js";
import { AddFood, SearchFood, CreateMyFoodbtn, EditFoodAdded } from "./modals.js";
import { limitDate } from "../utils/limitDates.js";
import { logout } from "../utils/logout.js";
import { generateDonutChart, updateCharts } from '../utils/donutchart.js';
import { showMessage } from "../utils/message.js";
import { escapeHtml, nameValid, numberValid } from "./validation.js";
import { privacyPolicyModal, termsModal, sacModal, createModalEventsDefault } from "./modals.js";
import { footerHome } from "./footer.js";
import { loader } from "../utils/loader.js";
import { panAnimation } from "../utils/panAnimation.js";
import { scroller } from "../utils/scrollerAnimation.js";

let proteinChartInstance = null;
let carboChartInstance = null;
let lipidChartInstance = null;

export function Home() {
    const div = document.createElement("div");
    div.innerHTML=`  
    <div id="modal_container_home" class="modal_container_home hidden"></div>
        <header>
            <div class="logo" id="logo">
                <a>
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
                        <div id="scroller_container"></div>
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
                <div class="meal_add" id="meal_add_breakfast"></div>

            </section>
            <section class="section_food">
                <div class="section_food_title">
                    <h2>Almoço</h2>
                    <div class="section_food_decoration"></div>
                    <button id="btn_add_lunch" class="btn_stroke btn_add">Adicionar</button>
                </div>
                <div class="meal_add" id="meal_add_lunch"></div>

            </section>
            <section class="section_food">
                <div class="section_food_title">
                    <h2>Jantar</h2>
                    <div class="section_food_decoration"></div>
                    <button id="btn_add_dinner" class="btn_stroke btn_add">Adicionar</button>
                </div>
                <div class="meal_add" id="meal_add_dinner"></div>

            </section>
            <section class="section_food">
                <div class="section_food_title">
                    <h2>Lanche</h2>
                    <div class="section_food_decoration"></div>
                    <button id="btn_add_snack" class="btn_stroke btn_add">Adicionar</button>
                </div>
                <div class="meal_add" id="meal_add_snack"></div>

            </section>
        </div>

        <!-- Tags para o footer e modais -->
        <section id="privacy_policy_container"></section>
        <section id="terms_container"></section>
        <section id="sac_container"></section>
        <section id="footer_container"></section>
    `;

    document.getElementById("root").innerHTML = '';
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
    
    const footerContainer = document.getElementById("footer_container");
    const footer = footerHome();
    footerContainer.appendChild(footer);
    
    //OBSERVAÇÃO, ESSE FUNCÃO TEM QUE VIR SÓ DEPOIS QUE PEGAR TODOS OS MODAIS
    createModalEventsDefault();


    const scrollerContainer = document.getElementById("scroller_container");
    const scroll = scroller();
    scrollerContainer.appendChild(scroll);

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

    document.getElementById('meal_add_snack').innerText = "";
    document.getElementById('meal_add_dinner').innerText = "";
    document.getElementById('meal_add_lunch').innerText = "";
    document.getElementById('meal_add_breakfast').innerText = "";



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

        const username = escapeHtml(userData.username);

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
                throw new Error("Erro ao localizar e calcular objetivo diário de consumo de calorias do usuário");         
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
       console.log(error.message)
    }
    loadAddedFoods();
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




export function navRoutes() {
  const navProfile = document.getElementById("navProfile");
  const navHistory = document.getElementById("navHistory");
  const btnExit = document.getElementById("btnExit");

  navProfile.addEventListener("click", () => {
    const customEvent = createCustomEvent("/profile");
    proteinChartInstance = null;
    carboChartInstance = null;
    lipidChartInstance = null;
    window.dispatchEvent(customEvent);
  });

  navHistory.addEventListener("click", () => {
    proteinChartInstance = null;
    carboChartInstance = null;
    lipidChartInstance = null;
    const customEvent = createCustomEvent("/history");
    window.dispatchEvent(customEvent);
  });

  btnExit.addEventListener("click", ()=>{
    proteinChartInstance = null;
    carboChartInstance = null;
    lipidChartInstance = null;
    logout();
  });
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

  
}

let selectedMealType = "";

async function openModalWithMeal(meal) {

  selectedMealType = meal;
  const modal = SearchFood(); // Cria o modal de pesquisa de comida
  const modalSearchFood = modal.querySelector("#modalSearchFood");
  const btnCreatefoodContainer = document.createElement("div");
  const datafoodContainer = document.createElement("div");
  
  let userId;

    // variavel para o inputSearch

    const inputSearch = modal.querySelector("#search");
    
    const showFoods = modal.querySelector("#showFoods");
    const showMyFoods = modal.querySelector("#showMyFoods");   
   

    if (showFoods) {
      showFoods.addEventListener("click", async() => {
        datafoodContainer.innerHTML="";
        btnCreatefoodContainer.innerHTML="";
        let foodList;

        try {
          const responseFood = await fetch("/api/food", {
            method: "GET",
          });
      
          if (!responseFood.ok) {
            throw new Error("Falha ao tentar localizar os alimentos");
          }
      
           foodList = await responseFood.json(); // Trata a resposta JSON
          userId = await getUserId();
          // console.log(userId);
      
          // Adiciona os alimentos à lista no modal
          foodList.forEach((foodItem) => {
            const foodElement = document.createElement("div");
            foodElement.textContent = foodItem.name;
            foodElement.addEventListener("click", async () => {
              await openAddFoodModal(userId, foodItem, meal); // Abre o modal de adicionar comida
              modal.remove(); // Remove o modal após clicar em um elemento do foodlist
            });
            datafoodContainer.appendChild(foodElement);
          });
        } catch (error) {
          console.log("Erro ao buscar alimentos:", error);
        }
        
        inputSearch.addEventListener("input", () => {
          const searchTerm = inputSearch.value.toLowerCase().trim();
      
          // Filtrar alimentos com base na sequência digitada
          const filteredFoods = foodList.filter(foodItem => {
            const foodName = foodItem.name.toLowerCase();
            return foodName.includes(searchTerm); // Usar includes para verificar a presença da sequência
          });

          // Ordenar a lista de alimentos filtrados com base na posição da sequência no nome
          filteredFoods.sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            return nameA.indexOf(searchTerm) - nameB.indexOf(searchTerm);
          });
      
          // Atualizar a lista de alimentos filtrados
          renderFilteredFoods(filteredFoods, btnCreatefoodContainer,datafoodContainer, userId, meal,modal);
        });
      
      });
    }

    if (showMyFoods) {
      showMyFoods.addEventListener("click", async() => {
        datafoodContainer.innerHTML="";
        btnCreatefoodContainer.innerHTML="";
        let myFoodList;

        const createMyFoodbtn = document.createElement("button");
        createMyFoodbtn.innerText="criar alimento"
        btnCreatefoodContainer.appendChild(createMyFoodbtn);
        const listCreatefoodContainer = document.createElement("div");
        userId = await getUserId();

        createMyFoodbtn.addEventListener("click", ()=>{
          console.log(userId,"create");
          const modalCreate = CreateMyFoodbtn();
          const btnCancelCreate = modalCreate.querySelector("#btn_cancel_create");
          const btnCreateNew = modalCreate.querySelector("#btn_create_new");


          btnCancelCreate.addEventListener("click", ()=> modalCreate.remove());

          btnCreateNew.addEventListener("click", async()=>{
            const nameCreate = modalCreate.querySelector("#nameCreate").value;
            const caloriesCreate = modalCreate.querySelector("#caloriesCreate").value;
            const carbCreate = modalCreate.querySelector("#carbCreate").value;
            const proteinCreate = modalCreate.querySelector("#proteinCreate").value;
            const fatCreate = modalCreate.querySelector("#fatCreate").value;

          if (!nameValid(nameCreate)) {
              showMessage('fail',"Formato de nome inválido!");
              return;
          }
          if (!numberValid(caloriesCreate)||!numberValid(carbCreate)||!numberValid( proteinCreate)||!numberValid(caloriesCreate)||!numberValid(fatCreate)) {
            showMessage('fail',"Precisa ser um numero inteiro maior que 0");
            return;
        }

            // função para salvar o alimento no banco de dados
            createNewFood(userId,nameCreate,caloriesCreate,carbCreate,proteinCreate,fatCreate);
            
            modalCreate.remove();
          });

         document.body.appendChild(modalCreate);
          });

          refreshFoodList(userId);
          // função para listar os alimentos da tabela food que contenham o userID
          async function refreshFoodList(userId) {
            try {
              const responseFood = await fetch(`/api/food/user/${userId}`, {
                method: "GET",
              });
          
              if (!responseFood.ok) {
                throw new Error("Falha ao tentar localizar os alimentos");
              }
          
              myFoodList = await responseFood.json(); // Trata a resposta JSON
          
              // Limpa a lista existente antes de adicionar os novos alimentos
              listCreatefoodContainer.innerHTML = "";
          
              // Adiciona os alimentos à lista no modal
              myFoodList.forEach((myFoodItem) => {
                const myFoodElement = document.createElement("div");
                const myFoodElementName =document.createElement("div");
                myFoodElementName.textContent = myFoodItem.name;

                const btnEditMyFoodElement = document.createElement("button");
                btnEditMyFoodElement.textContent = `Editar`;
                const btnDeleteMyFoodElement = document.createElement("button");
                btnDeleteMyFoodElement.textContent = `Deletar`;
          
               // Event listener para o botão de editar
                btnEditMyFoodElement.addEventListener("click", async () => {
              
                  try {
                    console.log("Botão Editar clicado para o alimento:", myFoodItem.id);
                    await editMyFoodItem(userId, myFoodItem.id, myFoodItem.name, myFoodItem.calorie,myFoodItem.carbohydrate_g, myFoodItem.protein_g, myFoodItem.lipid_g);
                    
                    
                  } catch (error) {
                    console.error("Erro ao editar alimento:", error);
                  }
                });
          
                // Event listener para o botão de deletar
                btnDeleteMyFoodElement.addEventListener("click", async () => {
                  try {
                    // console.log("Botão Deletar clicado para o alimento:", food.id);
                    await deleteMyFoodItem(userId, myFoodItem.id);
                  } catch (error) {
                    console.error("Erro ao deletar alimento:", error);
                  }
                });

                myFoodElementName.addEventListener("click", async () => {
                  await openAddFoodModal(userId, myFoodItem, meal); // Abre o modal de adicionar comida
                  modal.remove(); // Remove o modal após clicar em um elemento do foodlist
                });

                myFoodElement.appendChild(myFoodElementName);
                 // Adicionar botões ao elemento do alimento
                myFoodElement.appendChild(btnEditMyFoodElement);
                myFoodElement.appendChild(btnDeleteMyFoodElement);

                listCreatefoodContainer.appendChild(myFoodElement);
                btnCreatefoodContainer.appendChild(listCreatefoodContainer);
              });
            } catch (error) {
              console.log("Erro ao buscar alimentos:", error);
              return [];
            }
          }

          // função para criar um novo alimento no banco de dados food
          async function createNewFood(userId, nameCreate, caloriesCreate, carbCreate, proteinCreate, fatCreate) {
            const foodData = {
              user_id: userId,
              name: nameCreate,
              calorie: caloriesCreate,
              carbohydrate_g: carbCreate,
              protein_g: proteinCreate,
              lipid_g: fatCreate,
            };

            try {
              const responseFood = await fetch("/api/food", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(foodData),
              });

              if (!responseFood.ok) {
                throw new Error("Falha ao tentar criar o alimento");
              }

              const newFood = await responseFood.json(); 
              refreshFoodList(userId);

              console.log("Alimento criado com sucesso:", newFood);
            } catch (error) {
              console.error("Erro ao criar alimento:", error);
            }
          }


          inputSearch.addEventListener("input", () => {
            const searchTerm = inputSearch.value.toLowerCase().trim();
        
            // Filtrar alimentos com base na sequência digitada
            const filteredFoods = myFoodList.filter(foodItem => {
              const foodName = foodItem.name.toLowerCase();
              return foodName.includes(searchTerm); // Usar includes para verificar a presença da sequência
            });
  
            // Ordenar a lista de alimentos filtrados com base na posição da sequência no nome
            filteredFoods.sort((a, b) => {
              const nameA = a.name.toLowerCase();
              const nameB = b.name.toLowerCase();
              return nameA.indexOf(searchTerm) - nameB.indexOf(searchTerm);
            });
        
            // Atualizar a lista de alimentos filtrados
            renderMyFilteredFoods(filteredFoods, btnCreatefoodContainer,datafoodContainer, userId, meal,modal)
          });
        })
       

      };

  
  
  modal.querySelector("#back_modal_searchFood").addEventListener("click", () => {
    document.querySelector(".modal").remove();
  });
  document.body.appendChild(modal); // Adiciona o modal ao body
 
  modalSearchFood.appendChild(btnCreatefoodContainer);
  modalSearchFood.appendChild(datafoodContainer);
 }

function openAddFoodModal(userId,item,meal) {
  
  const modal = AddFood(); // Cria o modal de adicionar comida
  // Define os valores no modal com base nos dados do item clicado
  modal.querySelector("#nameFood").textContent = item.name;
  modal.querySelector("#quantity_calories").textContent = Number(item.calorie).toFixed(2);
  modal.querySelector("#quantity_carb").textContent = Number(item.carbohydrate_g).toFixed(2);
  modal.querySelector("#quantity_proteins").textContent = Number(item.protein_g).toFixed(2);
  modal.querySelector("#quantity_fat").textContent = Number(item.lipid_g).toFixed(2);
  // Define a opção do select com base no meal
  modal.querySelector("#meal").value = meal;
  

  const btnCancel = modal.querySelector("#btn_cancel_addFood");
  btnCancel.addEventListener("click", ()=> modal.remove());

  const btnSave = modal.querySelector("#btn_save_addFood");
  btnSave.addEventListener("click", async () => {
    const gramsInput = modal.querySelector("#grams").value;
    const mealSelect = modal.querySelector("#meal").value;
    const dateCalendar = document.getElementById('input-date').value;
    if (!numberValid(gramsInput)) {
      showMessage('fail',"Precisa ser um numero inteiro maior que 0");
      return;
    }
    // console.log(dateCalendar);
    const foodId = item.id;
    // console.log(userId);

    try {
      const response = await fetch("/api/foodAdded/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
      },

        body: JSON.stringify({
          user_id: userId,
          food_id: foodId,
          food_quantity: gramsInput,
          meal: mealSelect,
          date: dateCalendar,
        }),
      });
      // console.log(response);
    

      if (!response.ok) {
        throw new Error("Erro ao salvar alimento");
      }

      loadUserDataForDate(dateCalendar);
      // console.log("Alimento salvo com sucesso!");
      modal.remove(); // Fecha o modal após salvar
      updateMealSection(userId,dateCalendar);
    } catch (error) {
      console.error("Erro ao salvar alimento:", error);
    }
  });

  modal.querySelector("#back_modal_addFood").addEventListener("click", () => {
    modal.remove();
    openModalWithMeal(selectedMealType); 

  });

  document.body.appendChild(modal); // Adiciona o modal ao body
}

async function updateMealSection(userId,dateCalendar) {
 
  clearMealSections();
  fetchAddedFoods(userId,dateCalendar);
}

async function loadAddedFoods() {
  const dateCalendar = document.getElementById('input-date').value;
  // console.log(dateCalendar, "carregando")
  const userId = await getUserId();
  clearMealSections();

  fetchAddedFoods(userId,dateCalendar)
  // console.log(userId, "carregando")

}


async function fetchAddedFoods(userId, dateCalendar){
  try {
    const response = await fetch(`/api/foodAdded/dailyConsumedWithDetail?user_id=${userId}&date=${dateCalendar}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Erro ao obter alimentos adicionados");
    }

    const responseData = await response.json();
    const addedFoods = responseData.data.foodDetails; 
    // console.log(addedFoods);
    // console.log(dateCalendar);

    if (addedFoods.length === 0) {
      const noFoodsMessage = document.createElement("div");
      noFoodsMessage.textContent = "Nenhum alimento adicionado nesta data.";
      const mealSection = document.querySelector(`#meal_add_${food.meal}`);
      mealSection.appendChild(noFoodsMessage);
    } else {
    addedFoods.forEach((food) => {
      const mealSection = document.querySelector(`#meal_add_${food.meal}`);
      const divFoodElement = document.createElement("div");
      const btnsFoodElement = document.createElement("div");
      // console.log(food.id,"foodid");
      // console.log(food.meal,"foodmeal");

      const btnEditFoodElement = document.createElement("button");
      btnEditFoodElement.textContent = `Editar`;
      const btnDeleteFoodElement = document.createElement("button");
      btnDeleteFoodElement.textContent = `Deletar`;

  //       // Event listener para o botão de editar
  btnEditFoodElement.addEventListener("click", async () => {

    try {
      console.log("Botão Editar clicado para o alimento:", food.id);
      await editFoodItem(food.id,food.food_name,food.meal,food.food_id);
    } catch (error) {
      console.error("Erro ao editar alimento:", error);
    }
  });

  // Event listener para o botão de deletar
  btnDeleteFoodElement.addEventListener("click", async () => {
    try {
      // console.log("Botão Deletar clicado para o alimento:", food.id);
      await deleteFoodItem(food.id);
    } catch (error) {
      console.error("Erro ao deletar alimento:", error);
    }
  });
      
      const newFoodElement = document.createElement("div");
      newFoodElement.textContent = `${food.food_name} - ${food.food_quantity}g`;

      divFoodElement.appendChild(newFoodElement);
      btnsFoodElement.appendChild(btnEditFoodElement);
      btnsFoodElement.appendChild(btnDeleteFoodElement);
      divFoodElement.appendChild(btnsFoodElement);
      mealSection.appendChild(divFoodElement);
    });
    }

    // console.log("Alimentos carregados do banco de dados com sucesso!");
  } catch (error) {
    console.error("Erro ao carregar alimentos do banco de dados:", error);
  }
}

function clearMealSections() {
  const mealSections = document.querySelectorAll(".meal_add");
  mealSections.forEach((section) => {
    section.innerHTML = ""; // Limpa o conteúdo da seção de refeições
  });
}


async function deleteFoodItem(foodId) {
  if (!confirm("Tem certeza que deseja deletar este alimento?")) {
    return;
  }

  try {
    const response = await fetch(`/api/foodAdded/${foodId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erro ao deletar alimento.");
    }

    console.log("Alimento deletado com sucesso!");
    location.reload();
   
  } catch (error) {
    console.error("Erro ao deletar alimento:", error);
  }
}


async function editFoodItem(foodId,foodName,meal,id_food) {
  const modalEditFoodAdded = EditFoodAdded();
  modalEditFoodAdded.querySelector("#nameEditFood").textContent = foodName;

  const btnCancelEdit = modalEditFoodAdded.querySelector("#btn_cancel_editFood");
  btnCancelEdit.addEventListener("click", ()=> modalEditFoodAdded.remove());

  const backModalEditFoodAdded = modalEditFoodAdded.querySelector("#back_modal_editFoodAdded");
  backModalEditFoodAdded.addEventListener("click", ()=> modalEditFoodAdded.remove());

  modalEditFoodAdded.querySelector("#newMeal").value = meal;

  console.log(foodId,"teste");
  const btnSaveEdit = modalEditFoodAdded.querySelector("#btn_save_editFood");
  btnSaveEdit.addEventListener("click", async () => {
    const newGrams = modalEditFoodAdded.querySelector("#newGrams").value;
    const newMeal = modalEditFoodAdded.querySelector("#newMeal").value;

    
    if (!newGrams || !newMeal) {
      console.error("Dados de edição incompletos.");
      return;
    }

    try {
      const userId = await getUserId();
      const dateCalendar = document.getElementById('input-date').value;
      

      const response = await fetch(`/api/foodAdded/${foodId}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          food_id: id_food,
          date: dateCalendar,
          food_quantity: newGrams,
          meal: newMeal,
          id:foodId

        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao editar alimento.");
      }

      console.log("Alimento editado com sucesso!");

      // Atualizar a página para refletir as mudanças
      location.reload();
      

    } catch (error) {
      console.error("Erro ao editar alimento:", error);
    }
  });

  document.body.appendChild(modalEditFoodAdded);
}


async function editMyFoodItem(userId, myFoodItemId, nameCreate,caloriesCreate,carbCreate, proteinCreate,fatCreate ){
  const modalEditMyFood = CreateMyFoodbtn();
  

  const btnCancelEdit = modalEditMyFood.querySelector("#btn_cancel_create");
  btnCancelEdit.addEventListener("click", ()=> modalEditMyFood.remove());


  console.log(myFoodItemId,"teste");


  modalEditMyFood.querySelector("#nameCreate").value = nameCreate;
  modalEditMyFood.querySelector("#caloriesCreate").value = caloriesCreate;
  modalEditMyFood.querySelector("#carbCreate").value = carbCreate;
  modalEditMyFood.querySelector("#proteinCreate").value = proteinCreate;
  modalEditMyFood.querySelector("#fatCreate").value = fatCreate;


  const btnSaveEdit = modalEditMyFood.querySelector("#btn_create_new");
  btnSaveEdit.addEventListener("click", async () => {
    const newNameCreate = modalEditMyFood.querySelector("#nameCreate").value;
    const newCaloriesCreate = modalEditMyFood.querySelector("#caloriesCreate").value;
    const newCarbCreate = modalEditMyFood.querySelector("#carbCreate").value;
    const newProteinCreate = modalEditMyFood.querySelector("#proteinCreate").value;
    const newFatCreate = modalEditMyFood.querySelector("#fatCreate").value;

    
    if (!newNameCreate || !newCaloriesCreate || !newCarbCreate || !newProteinCreate || !newFatCreate) {
      console.error("Dados de edição incompletos.");
      return;
    }
    if (!nameValid(newNameCreate)) {
      showMessage('fail',"Formato de nome inválido!");
      return;
  }
    if (!numberValid(newCaloriesCreate)||!numberValid(newCarbCreate)||!numberValid(newProteinCreate)||!numberValid(newFatCreate)) {
      showMessage('fail',"Precisa ser um numero inteiro maior que 0");
      return;
  }

    try {
      
      const response = await fetch(`/api/food/${myFoodItemId}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId, 
          name: newNameCreate, 
          calorie: newCaloriesCreate, 
          carbohydrate_g: newCarbCreate, 
          protein_g: newProteinCreate, 
          lipid_g: newFatCreate
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao editar alimento.");
      }

      console.log("Alimento editado com sucesso!");

      // Atualizar a página para refletir as mudanças
      // refreshFoodList(userId);
      location.reload();
      

    } catch (error) {
      console.error("Erro ao editar alimento:", error);
    }
  });

  document.body.appendChild(modalEditMyFood);
}




async function deleteMyFoodItem(userId, myFoodItemId){
  console.log(myFoodItemId);
  if (!confirm("Tem certeza que deseja deletar este alimento?")) {
    return;
  }

  try {
    const response = await fetch(`/api/food/${myFoodItemId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erro ao deletar alimento.");
    }

    console.log("Alimento deletado com sucesso!");
     // Atualizar a lista de alimentos após a exclusão
     refreshFoodList(userId);
     location.reload();
   
  } catch (error) {
    console.error("Erro ao deletar alimento:", error);
  }
}



// Função para renderizar os alimentos filtrados no modal
function renderFilteredFoods(filteredFoods, btnCreatefoodContainer,datafoodContainer, userId, meal,modal) {
  btnCreatefoodContainer.innerHTML = ""; // Limpar o conteúdo atual do contêiner
  datafoodContainer.innerHTML =""; // Limpar o conteúdo atual do contêiner

  if (filteredFoods.length === 0) {
    datafoodContainer.innerHTML = "<p>Nenhum resultado encontrado.</p>";
  } else {
    filteredFoods.forEach(foodItem => {
      const foodElement = document.createElement("div");
      foodElement.textContent = foodItem.name;
      foodElement.addEventListener("click", async () => {
        await openAddFoodModal(userId, foodItem, meal); // Abre o modal de adicionar comida
        modal.remove(); // Remove o modal após clicar em um elemento do foodlist
      });
      datafoodContainer.appendChild(foodElement);
    });
  }
}

function renderMyFilteredFoods(filteredFoods, btnCreatefoodContainer,datafoodContainer, userId, meal,modal) {
  btnCreatefoodContainer.innerHTML = ""; // Limpar o conteúdo atual do contêiner
 datafoodContainer.innerHTML ="";


  if (filteredFoods.length === 0) {
    btnCreatefoodContainer.innerHTML = "<p>Nenhum resultado encontrado.</p>";
  } else {
    filteredFoods.forEach(myFoodItem => {
      const myFoodElement = document.createElement("div");
      const myFoodName = document.createElement("span");
      myFoodName.textContent = myFoodItem.name;

      const btnEdit = document.createElement("button");
      btnEdit.textContent = "Editar";
      btnEdit.addEventListener("click", async() => {
        try {
          console.log("Botão Editar clicado para o alimento:", myFoodItem.id);
          await editMyFoodItem(userId, myFoodItem.id, myFoodItem.name, myFoodItem.calorie,myFoodItem.carbohydrate_g, myFoodItem.protein_g, myFoodItem.lipid_g);
          
          
        } catch (error) {
          console.error("Erro ao editar alimento:", error);
        }
      });

      const btnDelete = document.createElement("button");
      btnDelete.textContent = "Deletar";
      btnDelete.addEventListener("click", async() => {
        try {
          // console.log("Botão Deletar clicado para o alimento:", food.id);
          await deleteMyFoodItem(userId, myFoodItem.id);
        } catch (error) {
          console.error("Erro ao deletar alimento:", error);
        }
      });
      myFoodName.addEventListener("click", async () => {
        await openAddFoodModal(userId, myFoodItem, meal); // Abre o modal de adicionar comida
        modal.remove(); // Remove o modal após clicar em um elemento do foodlist
      });

      myFoodElement.appendChild(myFoodName);
      myFoodElement.appendChild(btnEdit);
      myFoodElement.appendChild(btnDelete);

      btnCreatefoodContainer.appendChild(myFoodElement);
    });
  }
}


