import createCustomEvent from "./event.js";
import {AddFood, SearchFood} from "./modals.js";


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
                    <input type="date" name="date" id="date">
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
    
    return div
}

export function navRoutes(){
    const navProfile = document.getElementById("navProfile");
    const navHistory = document.getElementById("navHistory");
    const btnExit = document.getElementById("btnExit");


    navProfile.addEventListener ("click",()=>{
        const customEvent = createCustomEvent('/profile');
        history.pushState({}, '', '/profile');
        window.dispatchEvent(customEvent); 
    })

    navHistory.addEventListener ("click",()=>{
        const customEvent = createCustomEvent('/history');
        history.pushState({}, '', '/history');
        window.dispatchEvent(customEvent); 
    })

    btnExit.addEventListener ("click",()=>{
        const customEvent = createCustomEvent('/');
        history.pushState({}, '', '/');
        window.dispatchEvent(customEvent); 
        // falta limpar os cookies
    })
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

    document.querySelector('.modal_img img').addEventListener('click', () => {
        document.querySelector('.modal').remove();
    });
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