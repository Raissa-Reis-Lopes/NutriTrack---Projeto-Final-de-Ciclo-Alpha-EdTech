import createCustomEvent from "./event.js";
import { limitDate } from "../utils/limitDates.js";
import { logout } from "../utils/logout.js";
import { generateBarChart } from '../utils/barchart.js';
import { privacyPolicyModal, termsModal, sacModal, createModalEventsDefault } from "./modals.js";
import { footerHistory } from "./footer.js";

export function History() {
    const div = document.createElement("div");

    div.innerHTML=`
    <div class="back_general"></div>
    <header>
        <div class="logo" id="logo">
            <img src="./img/logo.svg" alt="NutriTrack">
        </div>
        <nav class="header_nav">
            <div id="navHome">Home</div>
            <div id="navProfile">Perfil</div>
            <button id="btnExit" class="btn_stroke btn_exit">Sair</button>
        </nav>
    </header>
    <main class="history_container">
        <div class="titles">
            <h1>Histórico</h1>
            <h5>Calorias consumidas:</h5>
            <h5>Meta de calorias:</h5>
        </div>
        <div class="period">
            <div id="input-date">
                <input type="date" id="dataInicio">
                <input type="date" id="dataFim">
            </div>
        </div>
        <section>
            <div class="chart">
                <div class="chart-container">
                    <span class="span_green ">Gráfico Semanal</span>
                    <div>
                    <div class="chart" id="week-chart"></div>
                </div>
            </div>
        </section>
        </div>
    </main>
    <!-- Tags para o modal -->
        <section>
            <div id="fade-privacy" class="hide"></div>
            <div id="modal-privacy" class="hide">
                <div class="modal-header">
                    <h2>política de privacidade</h2>
                    <img src="../img/botao-excluir.png" alt="botão fechar" id="close-modal-privacy"> 
                </div>
                <div class="modal-body">
                    <p>Bem vindo ao Nutri Track. Nós respeitamos sua privacidade e queremos proteger suas informações pessoais.</p>
                    <p>Podemos coletar informações pessoais, como nome, e-mail, peso, altura, data de nascimento, sexo biológico e nível de atividade. Enquanto você usa nosso site podemos coletar informações sobre suas atividades online.</p>
                    <p>Usamos suas informações para fornecer os serviços solicitados, para melhorar nosso site e para nos comunicarmos com vocẽ.</p>
                    <p>Não vendemos ou alugamos suas informações pessoais com terceiros. Podemos compartilhar suas informações com parceiros de negócios ou fornecedores que nos ajudam a operar o site.</p>
                    <p>Implementamos medidas de segurança para proteger suas informações pessoais.</p>
                    <p>Podemos atualizar esta política de privacidade periodicamente. Se fizermos alterações significativas, notificaremos você.</p>
                    <p>Se você tiver alguma dúvida sobre esta política de privacidade, entre em contato conosco em contato@email.com ou (11) 0800 1234-5678</p>
                </div>
            </div>
        </section>
    </main>
    <!-- Tags para o footer e modais -->
        <section id="privacy_policy_container"></section>
        <section id="terms_container"></section>
        <section id="sac_container"></section>
        <section id="footer_container"></section>
    `;
  
    document.getElementById("root").innerHTML = '';
    document.getElementById("root").appendChild(div);
    // limitDate('input-date');

    const dataAtual = new Date();
    const dataInicioInput = document.getElementById('dataInicio');
    const dataFimInput = document.getElementById('dataFim');
    const backDate = document.getElementById('backDate');
    const nextDate = document.getElementById('nextDate');
    
    // Define a data atual como o valor inicial dos elementos de entrada de data
    dataInicioInput.value = formatarData(dataAtual);
    dataFimInput.value = formatarData(new Date(dataAtual.getTime() - (7 * 24 * 60 * 60 * 1000))); // Adiciona uma semana à data atual

    const inputDate = document.getElementById('input-date');
    
    inputDate.addEventListener("change", function() {
        const selectedDate = inputDate.value;
        // getweek(selectedDate);
        // loadUserDataForDate(selectedDate); // Carrega os dados para a data selecionada
        
        const dataInicio = new Date(dataInicioInput.value);
        const dataFim = new Date(dataFimInput.value);
        const weeks = calcularDias(dataInicio, dataFim);
        
        // Define dataInicio para o último domingo
        dataInicio.setDate(dataInicio.getDate() - dataInicio.getDay());
        dataInicioInput.value = formatarData(dataInicio);
        
        // Define dataFim para o próximo sábado
        dataFim.setDate(dataInicio.getDate() + 6);
        dataFimInput.value = formatarData(dataFim);
    });
    
    const dias = [];
    generateBarChart(dias);



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
     const footer = footerHistory();
     footerContainer.appendChild(footer);
     
     //OBSERVAÇÃO, ESSE FUNCÃO TEM QUE VIR SÓ DEPOIS QUE PEGAR TODOS OS MODAIS
     createModalEventsDefault();

     navRoutes();
    backDate.addEventListener("click", function() {
        const startDate = new Date(dataInicioInput.value);
        const endDate = new Date(dataFimInput.value);
        navegar('-', startDate, endDate);
    });
    nextDate.addEventListener("click", function() {
        const startDate = new Date(dataInicioInput.value);
        const endDate = new Date(dataFimInput.value);
        navegar('+', startDate, endDate);
    });
    
    limitDate(inputDate);
    
    return div
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

async function getUserName(userId){
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

async function getWeekData(){
    try {
        const getWeek = await fetch("/api/week/", {
            method: "GET",
        });

        if(!getWeek.ok){
            throw new Error("Erro ao localizar os dados semanais");
        }

        const weekData = await getWeek.json();

        return weekData;
    } catch (error) {
        
    }
}

function formatarData(data) {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // +1 porque janeiro é 0
    const dia = String(data.getDate()).padStart(2, '0');
    
    return `${ano}-${mes}-${dia}`;
}

function navegar(direcao, startDate, endDate) {
    const newStartDate = new Date (startDate);
    const newEndDate = new Date (endDate);
    if (direcao === '-') {
        newStartDate.setDate(newStartDate.getDate() - 7);
        newEndDate.setDate(newEndDate.getDate() - 7);
    } else if (direcao === '+') {
        newStartDate.setDate(newStartDate.getDate() + 7);
        newEndDate.setDate(newEndDate.getDate() + 7);
    }

    document.getElementById('dataInicio').value = formatarData(newStartDate);
    document.getElementById('dataFim').value = formatarData(newEndDate);
}

function calcularDias(dataInicio, dataFim) {
    const dataAtual = new Date(dataInicio);

    while (dataAtual <= dataFim) {
        let dia = {
            data: formatarDataGrafico(dataAtual, 'ddd'),
            calorias: Math.floor(Math.random() * 1000),
            gordura: Math.floor(Math.random() * 100),
            proteina: Math.floor(Math.random() * 100),
            carboidrato: Math.floor(Math.random() * 200)
        };
        // dias.push(dia);
        dataAtual.setDate(dataAtual.getDate() + 1);
    }

    // return dias;
}

function formatarDataGrafico(data, formato) {
    const diaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // +1 porque janeiro é 0
    const dia = String(data.getDate()).padStart(2, '0');
    
    if (formato === 'ddd') {
        return `${diaSemana[data.getDay()]} ${dia}/${mes}`;
    }

    return `${ano}-${mes}-${dia}`;
}

// Requisição para a rota /api/semana no backend
fetch('/api/week')
    .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao obter os dados da semana');
    }
    return response.json();
})
    .then(dadosDaSemana => {
    generateBarChart(dadosDaSemana);
})
    .catch(error => {
    console.error('Erro ao obter os dados da semana:', error);
});


export function navRoutes() {
    const navProfile = document.getElementById("navProfile");
    const navHome = document.getElementById("navHome");
    const logo = document.getElementById("logo");
    const btnExit = document.getElementById("btnExit");

    logo.addEventListener("click", () => {
        const customEvent = createCustomEvent("/home");
        window.dispatchEvent(customEvent);
    });
function createModalEvents() {
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

export function registerBtns() {
    const btnHome = document.getElementById("btn_home");
    const btnProfile = document.getElementById("btn_profile");

    if(btnHome){
        btnHome.addEventListener ("click",function(e){
            e.preventDefault();
            const customEvent = createCustomEvent('/home');
            window.dispatchEvent(customEvent); 
        });
    }

    if (btnProfile) {
        btnProfile.addEventListener("click", () => {
            const customEvent = createCustomEvent('/profile');
            window.dispatchEvent(customEvent);
        });
    }
}

export function navRoutes() {
    const navProfile = document.getElementById("navToProfile");
    const navHistory = document.getElementById("navHome");
    const btnExit = document.querySelector(".btnExit");

    navProfile.addEventListener("click", () => {
        const customEvent = createCustomEvent("/profile");
        window.dispatchEvent(customEvent);
    });

    navHome.addEventListener("click", () => {
        const customEvent = createCustomEvent("/home");
        window.dispatchEvent(customEvent);
    });

    btnExit.addEventListener("click", ()=>{
        logout();
      });
}