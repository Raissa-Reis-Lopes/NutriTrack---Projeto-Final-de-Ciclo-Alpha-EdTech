import createCustomEvent from "./event.js";

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
                <a href="/profile">Perfil</a>
                <a href="/historic">Histórico</a>
                <a href="/chalenge">Desafios</a>
                <button class="btn_stroke btn_exit">Sair</button>
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
    return div
}