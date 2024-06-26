export function SearchFood(){
    const divModal = document.createElement("div");
    divModal.classList.add("modal_food_container")
    divModal.innerHTML=`  
    <div id="modalSearchFood" class="modal">
        <div class="modal_img">
            <img src="../img/go_back.svg" alt="Voltar" id="back_modal_searchFood">
        </div>
        <div class="container_modal btn_container_modal">
            <button id="showFoods" class="foodSearch">
                Tudo
            </button>
            <button id="showMyFoods" class="foodSearch">
                Meus produtos
            </button>
        </div>
        <div class="container_modal search_container_modal">
            <input type="text" name="search" id="search" placeholder="Procurar Produtos">
        </div>
        <div class="food_data_container">
            <div id="datafood" class="container_dataFood"></div>
        </div>
    </div>
    `;
      
    return divModal
}

export function AddFood(){
    const divModal = document.createElement("div");
    divModal.classList.add("modal_food_container");
    divModal.innerHTML=`  
    <div class="modal">
        <div class="modal_img">
            <img src="../img/go_back.svg" alt="Voltar" id="back_modal_addFood">
        </div>
        <div class="container_modal">
            <h2 id="nameFood" class="foodName">
                
            </h2>
        </div>
        <div class="container_modal quantity_nutri">
            <div class="calories">
                <div id="quantity_calories"></div>
                <span>Calorias</span>
            </div>
            <div id="message_add_calories"></div>
            <div class="carb">
                <div id="quantity_carb"></div>
                <span>Carboidratos</span>
            </div>
            <div id="message_add_carbo"></div>
            <div class="proteins">
                <div id="quantity_proteins"></div>
                <span>Proteínas</span>
            </div>
            <div id="message_add_protein"></div>
            <div class="fat">
                <div id="quantity_fat"></div>
                <span>Gorduras</span>
            </div>
            <div id="message_add_lipid"></div>
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
        <div id="message_add_grams"></div>
       <!-- <div id="errorMessage"></div> -->
        <div class="btns_addFood" id ="btnsAddFood">
            <button id="btn_cancel_addFood" class="btn_stroke btn_cancel">Cancelar</button>
            <button id="btn_save_addFood" class="btn_stroke">Salvar</button>
        </div>
    </div>
    `;
    return divModal
}

export function CreateMyFoodbtn(){
    const divModal = document.createElement("div");
    divModal.classList.add("modal_food_container");
    divModal.innerHTML=`  
    <div class="modal container_modal_create" id="modalCreateFood">
        <h2>Tabela Nutricional</h2>
        <span>Insira as quantidades de acordo com uma porção de 100 gramas</span>
        <div class="form_create_food">
            <div class="input_create_food">
                <label for="nameCreate">Nome</label>
                <input type="text" id="nameCreate">
            </div>
            <div id="message_new_name"></div>
            <div class="input_create_food">
                <label for="caloriesCreate">Calorias</label>
                <input type="text" id="caloriesCreate">
            </div>
            <div id="message_new_calories"></div>
            <div class="input_create_food">
                <label for="carbCreate">Carboidratos <span class="span_grams_create">(gramas)</span></label>
                <input type="text" id="carbCreate">
            </div>
            <div id="message_new_carbo"></div>
            <div class="input_create_food">
                <label for="proteinCreate">Proteínas <span class="span_grams_create">(gramas)</span></label>
                <input type="text" id="proteinCreate">
            </div>
            <div id="message_new_protein"></div>
            <div class="input_create_food">
                <label for="fatCreate">Gorduras <span class="span_grams_create">(gramas)</span></label>
                <input type="text" id="fatCreate">
            </div>
            <div id="message_new_lipid"></div>
            <div id="btnsCreateFood">
                <button id="btn_cancel_create" class="btn_stroke btn_cancel btn_create">Cancelar</button>
                <button id="btn_create_new" class="btn_stroke btn_create">Salvar alimento</button>
             </div>
          <!--   <div id="errorMessageCreateEdit"></div> -->
        </div> 
    </div>
    `;
      
    return divModal
}


export function EditFoodAdded(){
    const divModal = document.createElement("div");
    divModal.classList.add("modal_food_container");
    divModal.innerHTML=`  
    <div class="modal modalEditFoodAdded">
        <div class="modal_img">
            <img src="../img/go_back.svg" alt="Voltar" id="back_modal_editFoodAdded">
        </div>
        <div class="container_modal EditFoodAddedTitle">
            <div>Editar</div>
            <h2 id="nameEditFood" class="foodName"></h2>
        </div>
       
        <div class="container_grams container_grams_edit">
            <div class="grams_input">
                <span>Modifique a quantidade consumida em gramas</span>
                <input type="number" name="newGrams" id="newGrams">
            </div>
            <div class="grams_select">
                <span>Selecione a refeição</span>
                <select name="newMeal" id="newMeal">
                    <option selected disabled>Escolha uma opção</option>
                    <option value="breakfast">Café da manhã</option>
                    <option value="lunch">Almoço</option>
                    <option value="dinner">Jantar</option>
                    <option value="snack">Lanche</option>
                </select>
            </div>
        </div>
        <div class="btns_addFood">
            <button id="btn_cancel_editFood" class="btn_stroke btn_cancel">Cancelar</button>
            <button id="btn_save_editFood" class="btn_stroke">Salvar</button>
        </div>
    </div>
    `;
    return divModal
}

export function privacyPolicyModal(){
    const sectionModal = document.createElement("section");
    sectionModal.innerHTML=`
    <div id="fade-privacy" class="hide"></div>
    <div id="modal-privacy" class="hide">
        <div class="modal-header">
            <h2>Política de privacidade</h2>
            <img src="../img/botao-excluir.png" alt="botão fechar" id="close-modal-privacy"> 
        </div>
        <div class="modal-body">
            <p>Bem vindo ao NutriTrack. Nós respeitamos sua privacidade e queremos proteger suas informações pessoais.</p>
            <p>Podemos coletar informações pessoais, como nome, e-mail, peso, altura, data de nascimento, sexo biológico e nível de atividade. Enquanto você usa nosso site podemos coletar informações sobre suas atividades online.</p>
            <p>Usamos suas informações para fornecer os serviços solicitados, para melhorar nosso site e para nos comunicarmos com vocẽ.</p>
            <p>Não vendemos ou alugamos suas informações pessoais com terceiros. Podemos compartilhar suas informações com parceiros de negócios ou fornecedores que nos ajudam a operar o site.</p>
            <p>Implementamos medidas de segurança para proteger suas informações pessoais.</p>
            <p>Podemos atualizar esta política de privacidade periodicamente. Se fizermos alterações significativas, notificaremos você.</p>
            <p>É importante notar que as proporções dos planos são diretrizes gerais e podem precisar ser ajustadas com base nas necessidades individuais e na resposta do corpo a determinadas dietas. Consultar um nutricionista ou profissional de saúde é sempre recomendado para obter um plano alimentar adequado às suas necessidades específicas.</p>
            <p>Se você tiver alguma dúvida sobre esta política de privacidade, entre em contato conosco em contato@email.com ou (11) 0800 1234-5678</p>
        </div>
    </div>
    `
    return sectionModal;
}


export function termsModal(){
    const sectionModal = document.createElement("section");
    sectionModal.innerHTML=`
    <div id="fade-terms" class="hide"></div>
    <div id="modal-terms" class="hide">
        <div class="modal-header">
            <h2>Termos de uso</h2>
            <img src="../img/botao-excluir.png" alt="botão fechar" id="close-modal-terms">
        </div>
        <div class="modal-body">
            <p>Ao acessar e usar o site NutriTrack, você aceita e concorda em estar vinculado por estes Termos de uso.</p>
            <p>O conteúdo deste site, incluindo texto, gráficos, imagens e outros materiais, são protegidos por direitos autorais. Vocẽ não pode reproduzir, distribuir, modificar ou republicar materiais contidos neste site sem a permissão prévia por escrito do(s) responsável(is) legal(is) pelo NutriTrack.</p>
            <p>O site e seu conteúdo são fornecidos "como estão". Nós não oferecemos garantias ou representações de qualquer tipo, expressas ou implícitas, sobre a integridade, precisão confiabilidade, adequação ou disponibilidade do site ou seu conteúdo.</p>
            <p>Podemos alterar estes Termos de Uso periodicamente. Se fizermos alterações, notificaremos você.</p>
            <p>Se você tiver alguma dúvida sobre este Termo de Uso, entre em contato conosco em contato@email.com ou (11) 0800 1234-5678</p>
        </div>
    </div>
    `
    return sectionModal;
}

export function sacModal(){
    const sectionModal = document.createElement("section");
    sectionModal.innerHTML=`
    <div id="fade-sac" class="hide"></div>
    <div id="modal-sac" class="hide">
        <div class="modal-header">
            <h2>Fale Conosco</h2>
            <img src="../img/botao-excluir.png" alt="botão fechar" id="close-modal-sac"> 
        </div>
        <div class="modal-body modal-body_sac">
            <h3>Bem vindo à central de atendimento!</h3>
            <h4>Como podemos ajudá-lo?</h4>
            <div class="align_row_modal">
            <img src="../img/whatsapp.png" alt="whatsapp" />
            <p>WhatsApp: (11) 91234-5678</p>
            </div> 
            <div class="align_row_modal">
            <img src="../img/o-email.png" alt="email" />
            <p>Email: contato@email.com</p>
            </div> 
        </div>
    </div>
    `

    return sectionModal;
}

export function deleteAccountModal(){
    const sectionModal = document.createElement("section");
    sectionModal.innerHTML=`
    <div id="fade-account" class="hide"></div>
    <div id="modal-account" class="hide">
        <div class="modal-header" id="modal-header-delete">
            <img src="../img/botao-excluir.png" alt="botão fechar" id="close-modal-account"> 
        </div>
        <div id="body1" class="modal-body modal-body-account">
            <h1 class="delete_account_title">ATENÇÃO!</h1>
            <h3>Tem certeza que deseja apagar sua conta?</h3>
            <p>Esta ação é irreversível e você perderá todos os seus dados e histórico de uso. Por favor, tenha em mente que uma vez que sua conta for apagada, não poderemos recuperar suas informações.</p>
            <div class="btn_delete_account">
            <button id= cancelDelete class="btn_stroke">Cancelar</button>
            <button id="deleteAccount" class="btn_stroke">Confirmar</button>
            </div>
        </div>
        <div id="body2" class="modal-body">
            <h1>Conta excluída com sucesso!</h1>
        </div>
    </div>
    `

    return sectionModal;

}

export function deleteConfirmation(){
    const divDeleteConfirm = document.createElement("div");
    divDeleteConfirm.classList.add("modal_food_container");;
    divDeleteConfirm.innerHTML=`
    <div  class="modal">
        <div id="body1" class="modal-body modal-body-account">
            <h1 class="delete_account_title">ATENÇÃO!</h1>
            <h3 id="delete_h3">Tem certeza que deseja apagar esse alimento?</h3>
            <p id="delete_warning">Esta ação é irreversível e você perderá todos os dados e histórico desse alimento.</p>
            <div class="btn_delete_confirmation">
            <button id= "cancelConfirmDelete" class="btn_stroke">Cancelar</button>
            <button id="confirmDelete" class="btn_stroke btn_cancel">Deletar</button>
            </div>
        </div>
    </div>
    `
    return divDeleteConfirm;
}


export function createModalEventsProfile(){
    const openModalPrivacy = document.getElementById("open-modal-privacy");
    const openModalTerms = document.getElementById("open-modal-terms");
    const closeModalPrivacy = document.getElementById("close-modal-privacy");
    const closeModalTerms = document.getElementById("close-modal-terms");
    const modalPrivacy = document.querySelector("#modal-privacy");
    const modalTerms = document.querySelector("#modal-terms");
    const fadePrivacy = document.querySelector("#fade-privacy");
    const fadeTerms = document.querySelector("#fade-terms");
    const openModalAccount = document.getElementById("btn-delete");
    const closeModalAccount = document.getElementById("close-modal-account");
    const modalAccount = document.querySelector("#modal-account");
    const fadeAccount = document.querySelector("#fade-account");
    const openModalSac = document.getElementById("open-modal-sac");
    const closeModalSac = document.getElementById("close-modal-sac");
    const modalSac = document.querySelector("#modal-sac");
    const fadeSac = document.querySelector("#fade-sac");
    const cancel = document.getElementById("cancelDelete");
    
    // adiciona ou remove a classe "hide"
    function toggleModalPrivacy () {
        modalPrivacy.classList.toggle("hide");
        fadePrivacy.classList.toggle("hide");
    }
    
    function toggleModalTerms() {
        modalTerms.classList.toggle("hide");
        fadeTerms.classList.toggle("hide");
    }

    function toggleModalAccount() {
        modalAccount.classList.toggle("hide");
        fadeAccount.classList.toggle("hide");
    }

    function toggleModalSac() {
        modalSac.classList.toggle("hide");
        fadeSac.classList.toggle("hide");
    }
    
    // Para cada variável cria um EventListener de click e chama a função
    [openModalPrivacy, closeModalPrivacy, fadePrivacy].forEach((el) => {
        el.addEventListener("click", () => toggleModalPrivacy());
    });
    
    [openModalTerms, closeModalTerms, fadeTerms].forEach((el) => {
        el.addEventListener("click", () => toggleModalTerms());
    });

    [openModalAccount, closeModalAccount, cancel, fadeAccount].forEach((el) => {
        el.addEventListener("click", () => toggleModalAccount());
    });

    [openModalSac, closeModalSac, fadeSac].forEach((el) => {
        el.addEventListener("click", () => toggleModalSac());
    });
}


export function createModalEventsDefault(){
    const openModalPrivacy = document.getElementById("open-modal-privacy");
    const openModalTerms = document.getElementById("open-modal-terms");
    const closeModalPrivacy = document.getElementById("close-modal-privacy");
    const closeModalTerms = document.getElementById("close-modal-terms");
    const modalPrivacy = document.querySelector("#modal-privacy");
    const modalTerms = document.querySelector("#modal-terms");
    const fadePrivacy = document.querySelector("#fade-privacy");
    const fadeTerms = document.querySelector("#fade-terms");
    const openModalSac = document.getElementById("open-modal-sac");
    const closeModalSac = document.getElementById("close-modal-sac");
    const modalSac = document.querySelector("#modal-sac");
    const fadeSac = document.querySelector("#fade-sac");
    
    // adiciona ou remove a classe "hide"
    function toggleModalPrivacy () {
        modalPrivacy.classList.toggle("hide");
        fadePrivacy.classList.toggle("hide");
    }
    
    function toggleModalTerms() {
        modalTerms.classList.toggle("hide");
        fadeTerms.classList.toggle("hide");
    }

    function toggleModalSac() {
        modalSac.classList.toggle("hide");
        fadeSac.classList.toggle("hide");
    }
    
    // Para cada variável cria um EventListener de click e chama a função
    [openModalPrivacy, closeModalPrivacy, fadePrivacy].forEach((el) => {
        el.addEventListener("click", () => toggleModalPrivacy());
    });
    
    [openModalTerms, closeModalTerms, fadeTerms].forEach((el) => {
        el.addEventListener("click", () => toggleModalTerms());
    });

    [openModalSac, closeModalSac, fadeSac].forEach((el) => {
        el.addEventListener("click", () => toggleModalSac());
    });

}

export function createModalEventsRegister(){
     
    const openModalPrivacy = document.getElementById("open-modal-privacy");
    const openModalTerms = document.getElementById("open-modal-terms");
    const closeModalPrivacy = document.getElementById("close-modal-privacy");
    const closeModalTerms = document.getElementById("close-modal-terms");
    const modalPrivacy = document.querySelector("#modal-privacy");
    const modalTerms = document.querySelector("#modal-terms");
    const fadePrivacy = document.querySelector("#fade-privacy");
    const fadeTerms = document.querySelector("#fade-terms");
    // adiciona ou remove a classe "hide"
    function toggleModalPrivacy () {
        modalPrivacy.classList.toggle("hide");
        fadePrivacy.classList.toggle("hide");
    }
    
    function toggleModalTerms() {
        modalTerms.classList.toggle("hide");
        fadeTerms.classList.toggle("hide");
    }
    
    // Para cada variável cria um EventListener de click e chama a função
    [openModalPrivacy, closeModalPrivacy, fadePrivacy].forEach((el) => {
        el.addEventListener("click", () => toggleModalPrivacy());
    });
    
    [openModalTerms, closeModalTerms, fadeTerms].forEach((el) => {
        el.addEventListener("click", () => toggleModalTerms());
    });
}


export function createModalEventsHome(){
    const openModalPrivacy = document.getElementById("open-modal-privacy");
    const openModalTerms = document.getElementById("open-modal-terms");
    const closeModalPrivacy = document.getElementById("close-modal-privacy");
    const closeModalTerms = document.getElementById("close-modal-terms");
    const modalPrivacy = document.querySelector("#modal-privacy");
    const modalTerms = document.querySelector("#modal-terms");
    const fadePrivacy = document.querySelector("#fade-privacy");
    const fadeTerms = document.querySelector("#fade-terms");
    const openModalSac = document.getElementById("open-modal-sac");
    const closeModalSac = document.getElementById("close-modal-sac");
    const modalSac = document.querySelector("#modal-sac");
    const fadeSac = document.querySelector("#fade-sac");
    
const openModalSearchFood = document.querySelectorAll(".btn_add");
const closeModalSearchFood = document.getElementById("close-modal-search-food");
const modalSearchFood = document.querySelector("#modal-search-food");
const fadeSearchFood = document.querySelector("#fade-search-food");
const foodSearchBody = document.getElementById("modal_body_search_food");
    
    // adiciona ou remove a classe "hide"
    function toggleModalPrivacy () {
        modalPrivacy.classList.toggle("hide");
        fadePrivacy.classList.toggle("hide");
    }
    
    function toggleModalTerms() {
        modalTerms.classList.toggle("hide");
        fadeTerms.classList.toggle("hide");
    }

    function toggleModalSac() {
        modalSac.classList.toggle("hide");
        fadeSac.classList.toggle("hide");
    }

    function toggleModalSearchFood() {
        modalSearchFood.classList.toggle("hide");
        fadeSearchFood.classList.toggle("hide");
        foodSearchBody.classList.toggle("hide");
    }
    
    // Para cada variável cria um EventListener de click e chama a função
    [openModalPrivacy, closeModalPrivacy, fadePrivacy].forEach((el) => {
        el.addEventListener("click", () => toggleModalPrivacy());
    });
    
    [openModalTerms, closeModalTerms, fadeTerms].forEach((el) => {
        el.addEventListener("click", () => toggleModalTerms());
    });

    [openModalSac, closeModalSac, fadeSac].forEach((el) => {
        el.addEventListener("click", () => toggleModalSac());
    });

    [openModalSearchFood, closeModalSearchFood, fadeSearchFood].forEach((el) => {
        el.addEventListener("click", () => toggleModalSearchFood());
    });

}