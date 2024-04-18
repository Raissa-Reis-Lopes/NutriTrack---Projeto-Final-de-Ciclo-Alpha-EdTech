import createCustomEvent from "./event.js";

export function SearchFood(){
    const divModal = document.createElement("div");
    divModal.innerHTML=`  
    <div class="modal">
        <div class="modal_img">
            <img src="../img/go_back.svg" alt="Voltar">
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
            <img src="../img/go_back.svg" alt="Voltar">
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
            <button id="btn_cancel" class="btn_stroke">Cancelar</button>
            <button class="btn_stroke">Salvar</button>
        </div>
    </div>
    `;
    return divModal
}