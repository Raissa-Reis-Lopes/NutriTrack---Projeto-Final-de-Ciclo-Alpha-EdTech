// import createCustomEvent from "./event.js";

export function SearchFood(){
    const divModal = document.createElement("div");
    divModal.innerHTML=`  
    <div id="modalSearchFood" class="modal">
        <div class="modal_img">
            <img src="../img/go_back.svg" alt="Voltar" id="back_modal_searchFood">
        </div>
        <div class="container_modal">
    
            <div id="showFoods" class="foodSearch">
                Tudo
            </div>
            <div id="showMyFoods" class="foodSearch">
                Meus produtos
            </div>
        </div>
        <div class="container_modal">
            <input type="text" name="search" id="search" placeholder="Procurar Produtos">
        </div>
        <div id="datafood" class="container_dataFood">
        </div>
    </div>
    `;
      
    return divModal
}

export function AddFood(){
    const divModal = document.createElement("div");
    divModal.innerHTML=`  
    <div class="modal">
        <div class="modal_img">
            <img src="../img/go_back.svg" alt="Voltar" id="back_modal_addFood">
        </div>
        <div class="container_modal">
            <h2 id="nameFood" class="foodName">
                Alimento
            </h2>
        </div>
        <div class="container_modal quantity_nutri">
            <div class="calories">
                <div id="quantity_calories"></div>
                <span>Calorias</span>
            </div>
            <div class="carb">
                <div id="quantity_carb"></div>
                <span>Carboidratos</span>
            </div>
            <div class="proteins">
                <div id="quantity_proteins"></div>
                <span>Proteínas</span>
            </div>
            <div class="fat">
                <div id="quantity_fat"></div>
                <span>Gorduras</span>
            </div>
        </div>
        <div class="container_grams">
            <div class="grams_input">
                <span>Digite a quantidade consumida em gramas</span>
                <input type="text" name="grams" id="grams">
            </div>
            <div class="grams_select">
                <span>Selecione a refeição</span>
                <select name="meal" id="meal">
                    <option selected disabled>Escolha uma opção</option>
                    <option value="breakfast">Café da manhã</option>
                    <option value="lunch">Almoço</option>
                    <option value="dinner">Jantar</option>
                    <option value="snack">Lanche</option>
                </select>
            </div>
        </div>
        <div class="btns_addFood">
            <button id="btn_cancel_addFood" class="btn_stroke">Cancelar</button>
            <button id="btn_save_addFood" class="btn_stroke">Salvar</button>
        </div>
    </div>
    `;
    return divModal
}

export function CreateMyFoodbtn(){
    const divModal = document.createElement("div");
    divModal.innerHTML=`  
    <div class="modal container_modal_create" id="modalCreateFood">
        <h2>Tabela Nutricional</h2>
        <span>Insira as quantidades de acordo com uma porção de 100 gramas</span>
        <div class="form_create_food">
            <div class="input_create_food">
                <label for="nameCreate">Nome</label>
                <input type="text" id="nameCreate">
            </div>
            <div class="input_create_food">
                <label for="caloriesCreate">Calorias</label>
                <input type="text" id="caloriesCreate">
            </div>
            <div class="input_create_food">
                <label for="carbCreate">Carboidratos <span class="span_grams_create">(gramas)</span></label>
                <input type="text" id="carbCreate">
            </div>
            <div class="input_create_food">
                <label for="proteinCreate">Proteínas <span class="span_grams_create">(gramas)</span></label>
                <input type="text" id="proteinCreate">
            </div>
            <div class="input_create_food">
                <label for="fatCreate">Gorduras <span class="span_grams_create">(gramas)</span></label>
                <input type="text" id="fatCreate">
            </div>
            <div>
                <button id="btn_cancel_create" class="btn_stroke btn_cancel">Cancelar</button>
                <button id="btn_create_new" class="btn_stroke">Criar novo alimento</button>
             </div>
        </div> 
    </div>
    `;
      
    return divModal
}