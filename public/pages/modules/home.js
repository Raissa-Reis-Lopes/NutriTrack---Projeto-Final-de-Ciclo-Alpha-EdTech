import createCustomEvent from "./event.js";
import { AddFood, SearchFood } from "./modals.js";
import { limitDate } from "../utils/limitDates.js";
import { logout } from "../utils/logout.js";

export function Home() {
  const div = document.createElement("div");

  div.innerHTML = `  
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
        <div class="container_home">
            <main class="main_home">
                <div class="welcome_message">
                    <div class="img_profile">
                        <img src="" alt="">
                    </div>
                    <div class="user_welcome">
                        <h1>Olá, <span>User</span></h1>
                        <p>Animado? Hoje é um novo dia de transformação!</p>
                    </div>
                </div>
                <div class="goal">
                    <p>Objetivo <span>1800</span> calorias</p>
                </div>
            </main>
            <section class="section_home">
                <div class="calories_eat">
                    <p>Você ainda pode ingerir <span>1800</span> calorias!</p>
                    <div id="calories_bar"></div>
                    <p><span>0</span> calorias ingeridas</p>
                </div>

                <div id="date">
                    <input type="date" name="input-date" id="input-date">
                </div>
            </section>
            <section class="section_home">
                <div>
                    <div class="chart"></div>
                    <span class="span_black">Proteinas</span>
                    <span>0/300g</span>
                </div>
                <div>
                    <div class="chart"></div>
                    <span class="span_black">Carboidratos</span>
                    <span>0/300g</span>
                </div>
                <div>
                    <div class="chart"></div>
                    <span class="span_black">Gorduras</span>
                    <span>0/300g</span>
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
  // loadAddedFoods();


  return div;
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

  btnExit.addEventListener("click", logout);
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

async function openModalWithMeal(meal) {
  const modal = SearchFood(); // Cria o modal de pesquisa de comida
  const modalSearchFood = modal.querySelector("#modalSearchFood");
  const datafoodContainer = document.createElement("div");
  let userId;

  try {
    const responseFood = await fetch("/api/food", {
      method: "GET",
    });

    if (!responseFood.ok) {
      throw new Error("Falha ao tentar localizar os alimentos");
    }

    const foodList = await responseFood.json(); // Trata a resposta JSON
    userId = await getUserId();
    console.log(userId);

    // Adiciona os alimentos à lista no modal
    foodList.forEach((foodItem) => {
      const foodElement = document.createElement("div");
      foodElement.textContent = foodItem.name;
      foodElement.addEventListener("click", () =>
        openAddFoodModal(userId,foodItem, meal),
      ); // Abre o modal de adicionar comida ao clicar no alimento
      datafoodContainer.appendChild(foodElement);
    });
  } catch (error) {
    console.log("Erro ao buscar alimentos:", error);
  }
  modal.querySelector(".modal_img img").addEventListener("click", () => {
    document.querySelector(".modal").remove();
  });
  document.body.appendChild(modal); // Adiciona o modal ao body
  modalSearchFood.appendChild(datafoodContainer);
}

function openAddFoodModal(userId,item, meal) {
  console.log(userId);
  const modal = AddFood(); // Cria o modal de adicionar comida
  const modalSearchFood = SearchFood(); // Cria o modal de adicionar comida
  // Define os valores no modal com base nos dados do item clicado
  modal.querySelector("#nameFood").textContent = item.name;
  // modal.querySelector("#quantity_calories").textContent = item.calories;
  // modal.querySelector("#quantity_carb").textContent = item.carbs;
  // modal.querySelector("#quantity_proteins").textContent = item.proteins;
  // modal.querySelector("#quantity_fat").textContent = item.fat;
  // Define a opção do select com base no meal
  modal.querySelector("#meal").value = meal;

  const btnSave = modal.querySelector(".btns_addFood button:last-child");
  btnSave.addEventListener("click", async () => {
    const gramsInput = modal.querySelector("#grams").value;
    const mealSelect = modal.querySelector("#meal").value;
    const dateCalendar = document.getElementById('input-date').value;
    console.log(dateCalendar);
    const foodId = item.id;
    console.log(userId);

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
          // date: dateCalendar,
        }),
      });
      console.log(response);
    

      if (!response.ok) {
        throw new Error("Erro ao salvar alimento");
      }

      console.log("Alimento salvo com sucesso!");
      modal.remove(); // Fecha o modal após salvar
      modalSearchFood.remove();
      updateMealSection(userId);
    } catch (error) {
      console.error("Erro ao salvar alimento:", error);
    }
  });

  modal.querySelector(".modal_img img").addEventListener("click", () => {
    document.querySelector(".modal").remove();
  });

  document.body.appendChild(modal); // Adiciona o modal ao body
}

function updateMealSection(userId) {
  // const dateInput = document.getElementById('date').value;
  // ?date=${dateInput}

  fetch(`/api/foodAdded/dailyConsumedWithDetail?user_id=${userId}`, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao obter alimentos adicionados");
      }
      return response.json();
      
    })
    .then((addedFoods) => {
      addedFoods.forEach((food) => {
        const mealSection = document.querySelector(`#meal_add_${food.meal}`);
        const newFoodElement = document.createElement("div");
        newFoodElement.textContent = `${food.name} - ${food.food_quantity}g`;
        console.log("teste");
        console.log(food);
        console.log(addedFoods);
        mealSection.appendChild(newFoodElement);
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar alimentos do banco de dados:", error);
    });
}

// async function loadAddedFoods() {
//   // const dateInput = document.getElementById('date').value;

//   try {
//     const response = await fetch(`/api/foodAdded`, {
//       method: "GET",
//     });

//     if (!response.ok) {
//       throw new Error("Erro ao obter alimentos adicionados");
//     }

//     const addedFoods = await response.json();

//     if (addedFoods.length === 0) {
//       const noFoodsMessage = document.createElement("div");
//       noFoodsMessage.textContent = "Nenhum alimento adicionado nesta data.";
//       const mealSection = document.querySelector(".meal_add");
//       mealSection.appendChild(noFoodsMessage);
//     } else {
//       addedFoods.forEach((food) => {
//         const mealSection = document.querySelector(`.meal_add_${food.meal}`);
//         const newFoodElement = document.createElement("div");
//         newFoodElement.textContent = `${food.name} - ${food.grams}g`;
//         mealSection.appendChild(newFoodElement);
//       });
//     }

//     console.log("Alimentos carregados do banco de dados com sucesso!");
//   } catch (error) {
//     console.error("Erro ao carregar alimentos do banco de dados:", error);
//   }
// }


async function getUserId(){
  try { 
    const getUserId = await fetch("/api/login/", {
        method: "GET",
    });

    if(getUserId.ok){
        const userIdResponse = await getUserId.json();
        const userId = userIdResponse.user;
        return userId;
      }
      if (!getUserId.ok) {
        throw new Error("Erro ao pegar o id do usuario");
      }
    } catch(error){
      console.error("Erro ao pegar o id do usuario:", error);
    }
}