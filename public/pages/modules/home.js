import createCustomEvent from "./event.js";
import {
  AddFood,
  SearchFood,
  CreateMyFoodbtn,
  EditFoodAdded,
  deleteConfirmation,
} from "./modals.js";
import { limitDate } from "../utils/limitDates.js";
import { logout } from "../utils/logout.js";
import { generateDonutChart, updateCharts } from "../utils/donutchart.js";
import { showMessage } from "../utils/message.js";
import { escapeHtml, nameValid, numberValid } from "./validation.js";
import {
  privacyPolicyModal,
  termsModal,
  sacModal,
  createModalEventsDefault,
} from "./modals.js";
import { footerHome } from "./footer.js";
import { loader } from "../utils/loader.js";
import { panAnimation } from "../utils/panAnimation.js";
import { scroller } from "../utils/scrollerAnimation.js";
import { messageError } from "../utils/messageError.js" 

let proteinChartInstance = null;
let carboChartInstance = null;
let lipidChartInstance = null;

export function Home() {
    proteinChartInstance = null;
    carboChartInstance = null;
    lipidChartInstance = null;
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
        <div id="message" class="message-container hidden">
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
              <p class="container_calories"><span id="consumed-calories"></span> calorias ingeridas</p>
           </div>
           <div id="no_config" class="no_config"></div>
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

  document.getElementById("root").innerHTML = "";
  document.getElementById("root").appendChild(div);

  navRoutes();
  homeBtns();
  limitDate("input-date");

  const currentDate = new Date(); // Obtém a data atual
  currentDate.setMinutes(
    currentDate.getMinutes() - currentDate.getTimezoneOffset()
  ); // Ajusta para UTC
  const currentDateString = currentDate.toISOString().split("T")[0]; // Formata a data para o formato do input date
  const inputDate = document.getElementById("input-date");
  inputDate.value = currentDateString; // Define a data atual no input

  loadUserDataForDate(currentDateString); // Carrega os dados do dia atual

  inputDate.addEventListener("change", function () {
    const selectedDate = inputDate.value;
    loadUserDataForDate(selectedDate); // Carrega os dados para a data selecionada
  });

  //Para poder clicar em qualquer ponto do calendário e ele abrir
  const divDate = document.getElementById("date");
  divDate.addEventListener("click", function () {
    inputDate.click();
  });

  // Para os modais: Pegar a seção onde ele fica, chamar a função para obter o modal, adicionar ao container:
  const privacyModalContainer = document.getElementById(
    "privacy_policy_container"
  );
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

  return div;
}

function clearScreenValues() {
  // Limpa os valores do usuário
  document.getElementById("total-calories").innerText = 0;
  document.getElementById("total-protein").innerText = 0;
  document.getElementById("total-carbo").innerText = 0;
  document.getElementById("total-lipid").innerText = 0;
  document.getElementById("consumed-calories").innerText = 0;
  document.getElementById("consumed-protein").innerText = 0;
  document.getElementById("consumed-carbo").innerText = 0;
  document.getElementById("consumed-lipid").innerText = 0;
  document.getElementById("remaining-calories").innerText =
    "Você ainda pode ingerir 0 calorias!";

  document.getElementById("meal_add_snack").innerText = "";
  document.getElementById("meal_add_dinner").innerText = "";
  document.getElementById("meal_add_lunch").innerText = "";
  document.getElementById("meal_add_breakfast").innerText = "";

  // Limpa a barra de progresso
  const progressBar = document.getElementById("calories-progress");
  progressBar.style.width = "0%";
}

async function getUsername(){
    try {
        const getUsername = await fetch(`/api/users/byId`,{
            method: "GET",
        });


    if (!getUsername.ok) {
      throw new Error("Erro ao localizar o nome do usuário pelo id");
    }


    const userData = await getUsername.json();

    const username = escapeHtml(userData.username);

    return username;
  } catch (error) {}
}

async function getUserAvatar(){
    try {
        const getUserAvatar = await fetch(`/api/users/byId`,{
            method: "GET",
        });

    if (!getUserAvatar.ok) {
      throw new Error("Erro ao localizar a foto do usuário pelo id");
    }

    const userData = await getUserAvatar.json();

    const avatar = escapeHtml(userData.avatar_img);

    return avatar;
  } catch (error) {}
}


 //Para poder passar a cor dos gráficos usando variável, assim, se a gente mudar a variável já muda tudo
 const computedStyle = getComputedStyle(document.documentElement);
 const corProtein = computedStyle.getPropertyValue('--cor-protein').trim(); 
 const corBgProtein = computedStyle.getPropertyValue('--cor-bg-protein').trim(); 
 const corCarbo = computedStyle.getPropertyValue('--cor-carbo').trim(); 
 const corBgCarbo = computedStyle.getPropertyValue('--cor-bg-carbo').trim(); 
 const corLipid = computedStyle.getPropertyValue('--cor-lipid').trim(); 
 const corBgLipid = computedStyle.getPropertyValue('--cor-bg-lipid').trim(); 


async function loadUserDataForDate(date) {
  const noConfig = document.getElementById("no_config");
  noConfig.innerText = "";

    clearScreenValues(); // Limpa os valores da tela
    try { 
            const username = await getUsername();

      const usernameElement = document.getElementById("username");
      usernameElement.innerText = username;

            const userAvatar = await getUserAvatar();

            const imgHome = document.querySelector("#img-user");
            imgHome.src = `uploads/${userAvatar}`;
          
            const getDailyGoal = await fetch(`/api/calculate?date=${date}`,{
                method:"GET",
            });

      if (!getDailyGoal.ok) {
        throw new Error(
          "Erro ao localizar e calcular objetivo diário de consumo de calorias do usuário"
        );
      }

      const userDailyGoal = await getDailyGoal.json();

      const userTotalCalories = userDailyGoal.data.total_calories;
      const userTotalProtein = userDailyGoal.data.total_protein;
      const userTotalCarbo = userDailyGoal.data.total_carb;
      const userTotalLipid = userDailyGoal.data.total_fat;

      const totalCalorie = document.getElementById("total-calories");
      totalCalorie.innerText = userTotalCalories;

      const totalProteinSpan = document.getElementById("total-protein");
      totalProteinSpan.innerText = userTotalProtein;
      const totalCarboSpan = document.getElementById("total-carbo");
      totalCarboSpan.innerText = userTotalCarbo;
      const totalLipidSpan = document.getElementById("total-lipid");
      totalLipidSpan.innerText = userTotalLipid;


            const getDailyConsumed = await fetch(`/api/foodAdded/dailyConsumedWithDetail?date=${date}`,{
                method: "GET",
            });

      const userDailyConsumed = await getDailyConsumed.json();

      const totalNutrition = userDailyConsumed.data.totalNutrition;

      const dailyCaloriesConsumed = Math.ceil(totalNutrition.calories) || 0;
      const dailyProteinConsumed = Math.ceil(totalNutrition.protein) || 0;
      const dailyCarbohydrateConsumed =
        Math.ceil(totalNutrition.carbohydrate) || 0;
      const dailyLipidConsumed = Math.ceil(totalNutrition.lipid) || 0;

            const consumedProtein = document.getElementById("consumed-protein");
            consumedProtein.innerText = dailyProteinConsumed;
            
            const consumedCarbo = document.getElementById("consumed-carbo");
            consumedCarbo.innerText = dailyCarbohydrateConsumed;
            
            const consumedLipid = document.getElementById("consumed-lipid");
            consumedLipid.innerText = dailyLipidConsumed;

      const consumedCalories = document.getElementById("consumed-calories");
      consumedCalories.innerText = dailyCaloriesConsumed;

      //Para fazer aquela barrinha de consumo de calorias:
      const remainingCaloriesValue = userTotalCalories - dailyCaloriesConsumed;

      const remainingCalories = document.getElementById("remaining-calories");
      let message = `Você ainda pode ingerir <span class="remaining_calories_value">${remainingCaloriesValue}</span> calorias!`;
      remainingCalories.innerHTML = message;
      remainingCalories.classList.add("container_calories");

      // Atualizar a barra de progresso
      const progressBar = document.getElementById("calories-progress");
      const totalCalories = userTotalCalories;
      let consumedPercent = (dailyCaloriesConsumed / totalCalories) * 100;

      // Verifica se ultrapassou a quantidade total diária permitida
      if (dailyCaloriesConsumed > totalCalories) {
        progressBar.style.backgroundColor = "#f44336";
        consumedPercent = 100;
        const exceededCalories = dailyCaloriesConsumed - totalCalories;
        message = `Você ultrapassou <span class="exceeded_calories_value"> ${exceededCalories} </span> calorias`;
      } else {
        progressBar.style.backgroundColor = "#4caf50";
      }

      progressBar.style.width = consumedPercent + "%";
      remainingCalories.innerHTML = message;

            proteinChartInstance = updateOrCreateDonutChart('Proteínas', userTotalProtein, dailyProteinConsumed, proteinChartInstance, 'protein-chart', corProtein, corBgProtein);
            carboChartInstance = updateOrCreateDonutChart('Carboidratos', userTotalCarbo, dailyCarbohydrateConsumed, carboChartInstance, 'carbo-chart', corCarbo, corBgCarbo);
            lipidChartInstance = updateOrCreateDonutChart('Gorduras', userTotalLipid, dailyLipidConsumed, lipidChartInstance, 'lipid-chart', corLipid, corBgLipid);
        
    } catch(error) {
      proteinChartInstance = updateOrCreateDonutChart('Proteínas', 0, 0, proteinChartInstance, 'protein-chart', corProtein, corBgProtein);
      carboChartInstance = updateOrCreateDonutChart('Carboidratos', 0, 0, carboChartInstance, 'carbo-chart', corCarbo, corBgCarbo);
      lipidChartInstance = updateOrCreateDonutChart('Gorduras', 0, 0, lipidChartInstance, 'lipid-chart', corLipid, corBgLipid);
      noConfig.innerText = "Você não tem dados cadastrados para esta data!"
      console.log(error.message)
    }
    loadAddedFoods();
}

function updateOrCreateDonutChart(
  title,
  totalValue,
  consumedValue,
  chartInstance,
  chartElementId,
  color,
  bgColor
) {
  if (!chartInstance) {
    const { chartInstance: newChartInstance, canvas } = generateDonutChart(
      title,
      totalValue,
      consumedValue,
      chartElementId,
      color,
      bgColor
    );
    document.getElementById(chartElementId).appendChild(canvas);
    return newChartInstance;
  } else {
    updateCharts(
      chartInstance,
      title,
      totalValue,
      consumedValue,
      color,
      bgColor
    );
    return chartInstance;
  }
}

export function navRoutes() {
  const navProfile = document.getElementById("navProfile");
  const navHistory = document.getElementById("navHistory");
  const btnExit = document.getElementById("btnExit");

  navProfile.addEventListener("click", () => {
    const customEvent = createCustomEvent("/profile");
    window.dispatchEvent(customEvent);
  });

  navHistory.addEventListener("click", () => {
    const customEvent = createCustomEvent("/history");
    window.dispatchEvent(customEvent);
  });

  btnExit.addEventListener("click", ()=>{
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
let lastSelectedList = "showFoods";


async function openModalWithMeal(meal) {
  selectedMealType = meal;
  const modal = SearchFood(); // Cria o modal de pesquisa de comida
  const datafood = modal.querySelector("#datafood");
  const btnCreatefoodContainer = document.createElement("div");
  const datafoodContainer = document.createElement("div");
  datafoodContainer.classList.add("dataFoodScroll");

  // div criada para ser o conteiner dos alimentos criados que fica dentro do btnCreatefoodContainer
  const listCreatefoodContainer = document.createElement("div");
  listCreatefoodContainer.classList.add("dataFoodScroll");


  // variavel para o inputSearch

  const inputSearch = modal.querySelector("#search");

  const showFoods = modal.querySelector("#showFoods");
  const showMyFoods = modal.querySelector("#showMyFoods");

  if (lastSelectedList === "showMyFoods") {
    await showMyFoodsList();
    showMyFoods.classList.add("selectedList")
    showFoods.classList.remove("selectedList");
  } else {
    await showFoodsList();
    showMyFoods.classList.remove("selectedList")
    showFoods.classList.add("selectedList");
  }

  showFoods.addEventListener("click", async () => {
    showMyFoods.classList.remove("selectedList")
    showFoods.classList.add("selectedList");
    lastSelectedList = "showFoods";
    await showFoodsList();
  });

  showMyFoods.addEventListener("click", async () => {
    showMyFoods.classList.add("selectedList")
    showFoods.classList.remove("selectedList");
    lastSelectedList = "showMyFoods";
    await showMyFoodsList();
  });

  async function showFoodsList() {
    datafoodContainer.innerHTML = "";
      btnCreatefoodContainer.innerHTML = "";
      let foodList;

        try {
          const responseFood = await fetch("/api/food", {
            method: "GET",
          });
      
          if (!responseFood.ok) {
            throw new Error("Falha ao tentar localizar os alimentos");
          }
      
          foodList = await responseFood.json(); // Trata a resposta JSON
      
          // Adiciona os alimentos à lista no modal
          foodList.forEach((foodItem) => {
            const foodElement = document.createElement("div");
            foodElement.textContent = escapeHtml(foodItem.name);
            foodElement.addEventListener("click", async () => {
              await openAddFoodModal(foodItem, meal); // Abre o modal de adicionar comida
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
          renderFilteredFoods(filteredFoods, btnCreatefoodContainer,datafoodContainer, listCreatefoodContainer, meal,modal);
        });
  }

  async function showMyFoodsList() {
      datafoodContainer.innerHTML = "";
      btnCreatefoodContainer.innerHTML = "";
      let myFoodList;      

        const createMyFoodbtn = document.createElement("button");
        createMyFoodbtn.classList.add("btn_stroke", "createMyFoodbtn");
        createMyFoodbtn.innerText="criar alimento"
        btnCreatefoodContainer.appendChild(createMyFoodbtn);


        createMyFoodbtn.addEventListener("click", ()=>{
          const modalCreate = CreateMyFoodbtn();
          

        const btnsCreateFood = modalCreate.querySelector("#btnsCreateFood");

        // const errorMessageCreate = document.createElement("div");

        const btnCancelCreate = modalCreate.querySelector("#btn_cancel_create");
        const btnCreateNew = modalCreate.querySelector("#btn_create_new");

        btnCancelCreate.addEventListener("click", () => modalCreate.remove());

        btnCreateNew.addEventListener("click", async () => {



          const nameCreate = escapeHtml(
            modalCreate.querySelector("#nameCreate").value
          );
          const caloriesCreate = escapeHtml(
            modalCreate.querySelector("#caloriesCreate").value
          );
          const carbCreate = escapeHtml(
            modalCreate.querySelector("#carbCreate").value
          );
          const proteinCreate = escapeHtml(
            modalCreate.querySelector("#proteinCreate").value
          );
          const fatCreate = escapeHtml(
            modalCreate.querySelector("#fatCreate").value
          );

          if (!nameCreate){
            messageError("message_new_name","O nome não pode ser vazio");
            return;
          }
          if (!caloriesCreate){
            messageError("message_new_calories","A quantidade de calorias não pode ser vazia");
            return;
          }
          if (!numberValid(caloriesCreate)){
            messageError("message_new_calories","Precisa ser um número positivo");
            return;
          }
          if (!carbCreate){
            messageError("message_new_carbo","A quantidade de carboidrato não pode ser vazio");
            return;
          }
          
          if (!numberValid(carbCreate)){
            messageError("message_new_carbo","Precisa ser um número positivo");
            return;
          }
          if (!proteinCreate){
            messageError("message_new_protein","A quantidade de proteína não pode ser vazia");
            return;
          }
          if (!numberValid(proteinCreate)){
            messageError("message_new_protein","Precisa ser um número positivo");
            return;
          }
          if (!fatCreate){
            messageError("message_new_lipid","A quantidade de gordura não pode ser vazia");
            return;
          }        
          if (!numberValid(fatCreate)){
            messageError("message_new_lipid","Precisa ser um número positivo");
            return;
          }
       

        //   errorMessageCreate.innerText = "";
        //   if (
        //     !nameCreate ||
        //     !caloriesCreate ||
        //     !carbCreate ||
        //     !proteinCreate ||
        //     !fatCreate
        //   ) {
        //     errorMessageCreate.innerText = "Dados de criação incompletos.";
        //     return;
        //   }
        //   if (!nameValid(nameCreate)) {
        //     errorMessageCreate.innerText = "Formato de nome inválido!";
        //     return;
        //   }
        //   if (
        //     !numberValid(caloriesCreate) ||
        //     !numberValid(carbCreate) ||
        //     !numberValid(proteinCreate) ||
        //     !numberValid(caloriesCreate) ||
        //     !numberValid(fatCreate)
        //   ) {
        //     errorMessageCreate.innerText =
        //       "Precisa ser um numero inteiro maior que 0";
        //     return;
        // }

        
            // função para salvar o alimento no banco de dados
            createNewFood(nameCreate,caloriesCreate,carbCreate,proteinCreate,fatCreate);
            
            modalCreate.remove();
          });

        // btnsCreateFood.appendChild(errorMessageCreate);
        document.body.appendChild(modalCreate);
      });

          refreshFoodList();

          // função para listar os alimentos da tabela food 

          async function refreshFoodList() {
            try {
              const responseFood = await fetch(`/api/food/user`, {
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
                myFoodElement.classList.add("myFoodElementContainer");
                const myFoodElementName =document.createElement("div");
                myFoodElementName.textContent = escapeHtml(myFoodItem.name);

            const btnEditDeleteMyFood = document.createElement("div");
            btnEditDeleteMyFood.classList.add("btnsEditDeleteContainer");

                const btnEditMyFoodElement = document.createElement("img");
                btnEditMyFoodElement.src = "./img/edit.svg"; 
                btnEditMyFoodElement.alt = "Editar";
               
                const btnDeleteMyFoodElement = document.createElement("img");
                btnDeleteMyFoodElement.src = "./img/trash.svg"; 
                btnDeleteMyFoodElement.alt = "Deletar"; 
           
          
               // Event listener para o botão de editar
                btnEditMyFoodElement.addEventListener("click", async () => {
              
                  try {
                   await editMyFoodItem(myFoodItem.id, myFoodItem.name, myFoodItem.calorie,myFoodItem.carbohydrate_g, myFoodItem.protein_g, myFoodItem.lipid_g);

                    
                  } catch (error) {
                    console.error("Erro ao editar alimento:", error);
                  }
        
                });
          

                // Event listener para o botão de deletar
                btnDeleteMyFoodElement.addEventListener("click", async () => {
                  try {
                    await deleteMyFoodItem(myFoodItem.id);

                  } catch (error) {
                    console.error("Erro ao deletar alimento:", error);
                  }
                
                });

                myFoodElementName.addEventListener("click", async () => {
                  await openAddFoodModal(myFoodItem, meal); // Abre o modal de adicionar comida
                  modal.remove(); // Remove o modal após clicar em um elemento do foodlist
                });

              
                myFoodElement.appendChild(myFoodElementName);
                myFoodElement.appendChild(btnEditDeleteMyFood);
                 // Adicionar botões ao elemento do alimento
                 btnEditDeleteMyFood.appendChild(btnEditMyFoodElement);
                 btnEditDeleteMyFood.appendChild(btnDeleteMyFoodElement);

            listCreatefoodContainer.appendChild(myFoodElement);
            btnCreatefoodContainer.appendChild(listCreatefoodContainer);
          });
        } catch (error) {
          console.log("Erro ao buscar alimentos:", error);
          return [];
        }
      }

          // função para criar um novo alimento no banco de dados food
          async function createNewFood(nameCreate, caloriesCreate, carbCreate, proteinCreate, fatCreate) {
            const foodData = {
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
              refreshFoodList();


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
            renderMyFilteredFoods(filteredFoods, btnCreatefoodContainer,datafoodContainer, listCreatefoodContainer, meal,modal)
          });
  }

  modal
    .querySelector("#back_modal_searchFood")
    .addEventListener("click", () => {
      document.querySelector(".modal").remove();
      document.querySelector(".modal_food_container").remove();
    });
  document.body.appendChild(modal); // Adiciona o modal ao body

  datafood.appendChild(btnCreatefoodContainer);
  datafood.appendChild(datafoodContainer);

}

function openAddFoodModal(item,meal) {

  
  const modal = AddFood(); // Cria o modal de adicionar comida
  // Define os valores no modal com base nos dados do item clicado


  modal.querySelector("#nameFood").textContent = item.name;
  modal.querySelector("#quantity_calories").textContent = Math.ceil(Number(item.calorie));
  modal.querySelector("#quantity_carb").textContent = Math.ceil(Number(item.carbohydrate_g));
  modal.querySelector("#quantity_proteins").textContent = Math.ceil(Number(item.protein_g));
  modal.querySelector("#quantity_fat").textContent = Math.ceil(Number(item.lipid_g));
  // Define a opção do select com base no meal
  modal.querySelector("#meal").value = escapeHtml(meal);

  // const errorMessage = modal.querySelector("#errorMessage");

  const btnCancel = modal.querySelector("#btn_cancel_addFood");
  btnCancel.addEventListener("click", () => modal.remove());

  const btnSave = modal.querySelector("#btn_save_addFood");
  btnSave.addEventListener("click", async () => {
    const gramsInput = escapeHtml(modal.querySelector("#grams").value);
    const mealSelect = escapeHtml(modal.querySelector("#meal").value);
    const dateCalendar = escapeHtml(
      document.getElementById("input-date").value
    );
    // errorMessage.innerText = "";
    // if (!numberValid(gramsInput) || !grams) {
    //   errorMessage.innerText = "Precisa ser um numero inteiro maior que 0";
    //   return;
    // }
    if (!numberValid(gramsInput) || !gramsInput) {
      messageError("message_add_grams","Precisa ser um número positivo");
      return;
    }

    const foodId = item.id;

    try {
      const response = await fetch("/api/foodAdded/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          food_id: foodId,
          food_quantity: gramsInput,
          meal: mealSelect,
          date: dateCalendar,
        }),
      });
  

      if (!response.ok) {
        throw new Error("Erro ao salvar alimento");
      }

      loadUserDataForDate(dateCalendar);
      modal.remove(); // Fecha o modal após salvar
      updateMealSection(dateCalendar);
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

async function updateMealSection(dateCalendar) {
 
  clearMealSections();
  fetchAddedFoods(dateCalendar);
}

async function loadAddedFoods() {
  const dateCalendar = escapeHtml(document.getElementById("input-date").value);
  clearMealSections();

  fetchAddedFoods(dateCalendar)

}


async function fetchAddedFoods(dateCalendar){
  try {
    const response = await fetch(`/api/foodAdded/dailyConsumedWithDetail?date=${dateCalendar}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Erro ao obter alimentos adicionados");
    }

    const responseData = await response.json();
    const addedFoods = responseData.data.foodDetails;

    if (addedFoods.length === 0) {
      const noFoodsMessage = document.createElement("div");
      noFoodsMessage.textContent = "Nenhum alimento adicionado nesta data.";
      const mealSection = document.querySelector(`#meal_add_${food.meal}`);
      mealSection.appendChild(noFoodsMessage);
    } else {
      addedFoods.forEach((food) => {
        const mealSection = document.querySelector(`#meal_add_${food.meal}`);
        mealSection.classList.add("mealSection");
        const divFoodElement = document.createElement("div");
        divFoodElement.classList.add("divFoodElement");
        const btnsFoodElement = document.createElement("div");
        btnsFoodElement.classList.add("btnsEditDeleteContainer");

        const btnEditFoodElement = document.createElement("img");
        btnEditFoodElement.src = "./img/edit.svg";
        btnEditFoodElement.alt = "Editar";
      
        const btnDeleteFoodElement = document.createElement("img");
        btnDeleteFoodElement.src = "./img/trash.svg";
        btnDeleteFoodElement.alt = "Deletar";
    

        // Event listener para o botão de editar
        btnEditFoodElement.addEventListener("click", async () => {
          try {
            await editFoodItem(
              food.id,
              food.food_name,
              food.food_quantity,
              food.meal,
              food.food_id
            );
          } catch (error) {
            console.error("Erro ao editar alimento:", error);
          }
        });

        // Event listener para o botão de deletar
        btnDeleteFoodElement.addEventListener("click", async () => {
          try {
            await deleteFoodItem(food.id);
          } catch (error) {
            console.error("Erro ao deletar alimento:", error);
          }
        });

        const newFoodElementName = document.createElement("div");
        newFoodElementName.classList.add("newFoodElementName");
        newFoodElementName.textContent = escapeHtml(`${food.food_name}`);

        const newFoodElementQuantity = document.createElement("div");
        newFoodElementQuantity.classList.add("newFoodElementQuantity");
        newFoodElementQuantity.textContent = escapeHtml(
          `Porção de ${food.food_quantity}g`
        );

        const newFoodElementcalorie = document.createElement("div");
        newFoodElementcalorie.classList.add("newFoodElementcalorie");
        newFoodElementcalorie.textContent = escapeHtml(
          `${Number(food.calorie)} Kcal`
        );

        divFoodElement.appendChild(newFoodElementQuantity);
        divFoodElement.appendChild(newFoodElementName);
        divFoodElement.appendChild(newFoodElementcalorie);
        btnsFoodElement.appendChild(btnEditFoodElement);
        btnsFoodElement.appendChild(btnDeleteFoodElement);
        divFoodElement.appendChild(btnsFoodElement);
        mealSection.appendChild(divFoodElement);
      });
    }

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

  const deleteConfirmationModal =  deleteConfirmation();
  const deleteWarningText = deleteConfirmationModal.querySelector("#delete_warning");
  const deleteText = deleteConfirmationModal.querySelector("#delete_h3");


  const cancelConfirmDelete = deleteConfirmationModal.querySelector("#cancelConfirmDelete");
  const confirmDelete = deleteConfirmationModal.querySelector("#confirmDelete");
  deleteWarningText.innerText ="";
  deleteText.innerText ="";
  deleteWarningText.innerText="Tem certeza que deseja remover esse alimento da refeição?"
   
  cancelConfirmDelete.addEventListener("click", ()=>{
   deleteConfirmationModal.remove();
   return
  });
  
  confirmDelete.addEventListener("click", async()=>{
    try {
      const response = await fetch(`/api/foodAdded/${foodId}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Erro ao deletar alimento.");
      }

  
      const customEvent = createCustomEvent("/home");
      window.dispatchEvent(customEvent);
    } catch (error) {
      console.error("Erro ao deletar alimento:", error);
    }
 
   deleteConfirmationModal.remove();
 
  });
   
   document.body.appendChild(deleteConfirmationModal);
  
}

async function editFoodItem(foodId, foodName,foodGrams, meal, id_food) {
  const modalEditFoodAdded = EditFoodAdded();
  modalEditFoodAdded.querySelector("#nameEditFood").textContent =
    escapeHtml(foodName);

  const btnCancelEdit = modalEditFoodAdded.querySelector(
    "#btn_cancel_editFood"
  );
  btnCancelEdit.addEventListener("click", () => modalEditFoodAdded.remove());

  const backModalEditFoodAdded = modalEditFoodAdded.querySelector(
    "#back_modal_editFoodAdded"
  );
  backModalEditFoodAdded.addEventListener("click", () =>
    modalEditFoodAdded.remove()
  );

  modalEditFoodAdded.querySelector("#newMeal").value = escapeHtml(meal);
  modalEditFoodAdded.querySelector("#newGrams").value = escapeHtml(foodGrams);

  const btnSaveEdit = modalEditFoodAdded.querySelector("#btn_save_editFood");
  btnSaveEdit.addEventListener("click", async () => {
    const newGrams = escapeHtml(
      modalEditFoodAdded.querySelector("#newGrams").value
    );
    const newMeal = escapeHtml(
      modalEditFoodAdded.querySelector("#newMeal").value
    );

    if (!newGrams || !newMeal) {
      console.error("Dados de edição incompletos.");
      return;
    }

    try {
      const dateCalendar = document.getElementById('input-date').value;
      

      const response = await fetch(`/api/foodAdded/${foodId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          food_id: id_food,
          date: dateCalendar,
          food_quantity: newGrams,
          meal: newMeal,
          id: foodId,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao editar alimento.");
      }

      const customEvent = createCustomEvent("/home");
      window.dispatchEvent(customEvent);

    } catch (error) {
      console.error("Erro ao editar alimento:", error);
    }
    modalEditFoodAdded.remove()
  });

  document.body.appendChild(modalEditFoodAdded);
}


async function editMyFoodItem(myFoodItemId, nameCreate,caloriesCreate,carbCreate, proteinCreate,fatCreate ){
  const modalEditMyFood = CreateMyFoodbtn();

  const btnCancelEdit = modalEditMyFood.querySelector("#btn_cancel_create");
  btnCancelEdit.addEventListener("click", () => modalEditMyFood.remove());

  modalEditMyFood.querySelector("#nameCreate").value = escapeHtml(nameCreate);
  modalEditMyFood.querySelector("#caloriesCreate").value =
    escapeHtml(caloriesCreate);
  modalEditMyFood.querySelector("#carbCreate").value = escapeHtml(carbCreate);
  modalEditMyFood.querySelector("#proteinCreate").value =
    escapeHtml(proteinCreate);
  modalEditMyFood.querySelector("#fatCreate").value = escapeHtml(fatCreate);

  const btnSaveEdit = modalEditMyFood.querySelector("#btn_create_new");
  btnSaveEdit.addEventListener("click", async () => {
    const newNameCreate = escapeHtml(
      modalEditMyFood.querySelector("#nameCreate").value
    );
    const newCaloriesCreate = escapeHtml(
      modalEditMyFood.querySelector("#caloriesCreate").value
    );
    const newCarbCreate = escapeHtml(
      modalEditMyFood.querySelector("#carbCreate").value
    );
    const newProteinCreate = escapeHtml(
      modalEditMyFood.querySelector("#proteinCreate").value
    );
    const newFatCreate = escapeHtml(
      modalEditMyFood.querySelector("#fatCreate").value
    );
    // const errorMessageCreateEdit = modalEditMyFood.querySelector(
    //   "#errorMessageCreateEdit"
    // );

    if (!newNameCreate){
      messageError("message_new_name","O nome não pode ser vazio");
      return;
    }
    if (!newCaloriesCreate){
      messageError("message_new_calories","A quantidade de calorias não pode ser vazia");
      return;
    }
    if (!newCarbCreate){
      messageError("message_new_carbo","A quantidade de carboidrato não pode ser vazio");
      return;
    }
    if (!newProteinCreate){
      messageError("message_new_protein","A quantidade de proteína não pode ser vazia");
      return;
    }
    if (!newFatCreate){
      messageError("message_new_lipid","A quantidade de gordura não pode ser vazia");
      return;
    }
    if (!numberValid(caloriesCreate)){
      messageError("message_new_calories","Precisa ser um número positivo");
      return;
    }
    if (!numberValid(carbCreate)){
      messageError("message_new_carbo","Precisa ser um número positivo");
      return;
    }
    if (!numberValid(proteinCreate)){
      messageError("message_new_protein","Precisa ser um número positivo");
      return;
    }
    if (!numberValid(fatCreate)){
      messageError("message_add_lipid","Precisa ser um número positivo");
      return;
    }

    // errorMessageCreateEdit.innerText = "";
    // if (
    //   !newNameCreate ||
    //   !newCaloriesCreate ||
    //   !newCarbCreate ||
    //   !newProteinCreate ||
    //   !newFatCreate
    // ) {
    //   errorMessageCreateEdit.innerText = "Dados de criação incompletos.";
    //   return;
    // }
    // if (!nameValid(newNameCreate)) {
    //   errorMessageCreateEdit.innerText = "Formato de nome inválido!";
    //   return;
    // }
    // if (
    //   !numberValid(newCaloriesCreate) ||
    //   !numberValid(newCarbCreate) ||
    //   !numberValid(newProteinCreate) ||
    //   !numberValid(newFatCreate)
    // ) {
    //   errorMessageCreateEdit.innerText =
    //     "Precisa ser um numero inteiro maior que 0";
    //   return;
    // }

    try {
      const response = await fetch(`/api/food/${myFoodItemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
  
      // Atualizar a página para refletir as mudanças
     
      const customEvent = createCustomEvent("/home");
      window.dispatchEvent(customEvent);


      const customEventmodal = new CustomEvent("updateModal");
      window.dispatchEvent(customEventmodal);
     
    } catch (error) {
      console.error("Erro ao editar alimento:", error);
    }
    modalEditMyFood.remove();
    
  });
  document.body.appendChild(modalEditMyFood);
}

async function deleteMyFoodItem(myFoodItemId){

  
 const deleteConfirmationModal =  deleteConfirmation();


 const cancelConfirmDelete = deleteConfirmationModal.querySelector("#cancelConfirmDelete");
 const confirmDelete = deleteConfirmationModal.querySelector("#confirmDelete");

  
 cancelConfirmDelete.addEventListener("click", ()=>{
  deleteConfirmationModal.remove();
  return
 });
 
 confirmDelete.addEventListener("click", async()=>{


  try {
    const response = await fetch(`/api/food/${myFoodItemId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erro ao deletar alimento.");
    }

    // Atualizar a lista de alimentos após a exclusão
    const customEventmodal = new CustomEvent("updateModal");
    window.dispatchEvent(customEventmodal);

    const customEvent = createCustomEvent("/home");
   window.dispatchEvent(customEvent);


  } catch (error) {
    console.error("Erro ao deletar alimento:", error);
  }
  
  deleteConfirmationModal.remove();


  
 });

  
 
  document.body.appendChild(deleteConfirmationModal);
}

// Função para renderizar os alimentos filtrados no modal
function renderFilteredFoods(filteredFoods, btnCreatefoodContainer,datafoodContainer,listCreatefoodContainer, meal,modal) {
  listCreatefoodContainer.innerHTML = ""; // Limpar o conteúdo atual do contêiner
  datafoodContainer.innerHTML = ""; // Limpar o conteúdo atual do contêiner

  if (filteredFoods.length === 0) {
    datafoodContainer.innerHTML = "<p>Nenhum resultado encontrado.</p>";
  } else {
    filteredFoods.forEach((foodItem) => {
      const foodElement = document.createElement("div");
      foodElement.textContent = escapeHtml(foodItem.name);
      foodElement.addEventListener("click", async () => {
        await openAddFoodModal(foodItem, meal); // Abre o modal de adicionar comida
        modal.remove(); // Remove o modal após clicar em um elemento do foodlist
      });
      datafoodContainer.appendChild(foodElement);
    });
  }
}

function renderMyFilteredFoods(filteredFoods, btnCreatefoodContainer,datafoodContainer, listCreatefoodContainer, meal,modal) {
  listCreatefoodContainer.innerHTML = ""; // Limpar o conteúdo atual do contêiner
 datafoodContainer.innerHTML ="";


  if (filteredFoods.length === 0) {
    listCreatefoodContainer.innerHTML = "<p>Nenhum resultado encontrado.</p>";
  } else {
    filteredFoods.forEach((myFoodItem) => {
      const myFoodElement = document.createElement("div");
      const myFoodName = document.createElement("div");
      myFoodName.textContent = escapeHtml(myFoodItem.name);
      myFoodElement.classList.add("myFoodElementContainer");

      const btnEditDeleteMySearch = document.createElement("div");
      btnEditDeleteMySearch.classList.add("btnsEditDeleteContainer");

      const btnEdit = document.createElement("img");
      btnEdit.src = "./img/edit.svg";
      btnEdit.alt = "Editar";
      // btnEditMyFoodElement.classList.add("icone-editar");
      btnEdit.addEventListener("click", async () => {
        try {
          await editMyFoodItem(myFoodItem.id, myFoodItem.name, myFoodItem.calorie,myFoodItem.carbohydrate_g, myFoodItem.protein_g, myFoodItem.lipid_g);
          
          
        } catch (error) {
          console.error("Erro ao editar alimento:", error);
        }
   
      });

      const btnDelete = document.createElement("img");
      btnDelete.src = "./img/trash.svg";
      btnDelete.alt = "Deletar";
     

      btnDelete.addEventListener("click", async () => {
        try {

          await deleteMyFoodItem(myFoodItem.id);
        } catch (error) {
          console.error("Erro ao deletar alimento:", error);
        }

      });
      myFoodName.addEventListener("click", async () => {
        await openAddFoodModal(myFoodItem, meal); // Abre o modal de adicionar comida
        modal.remove(); // Remove o modal após clicar em um elemento do foodlist
      });

      myFoodElement.appendChild(myFoodName);
      myFoodElement.appendChild(btnEditDeleteMySearch);
      btnEditDeleteMySearch.appendChild(btnEdit);
      btnEditDeleteMySearch.appendChild(btnDelete);

      listCreatefoodContainer.appendChild(myFoodElement);
      btnCreatefoodContainer.appendChild(listCreatefoodContainer);
    });
  }
}

function handleModalUpdate(event) {
  if (event.type === "updateModal") {
    openModalWithMeal(selectedMealType);
  }
}
window.addEventListener("updateModal", handleModalUpdate);