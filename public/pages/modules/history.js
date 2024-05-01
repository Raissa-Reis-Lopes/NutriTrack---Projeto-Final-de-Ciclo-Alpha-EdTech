import createCustomEvent from "./event.js";
import { limitDate } from "../utils/limitDates.js";
import { logout } from "../utils/logout.js";
// import { generateBarChart } from '../utils/barchart.js';
import { privacyPolicyModal, termsModal, sacModal, createModalEventsDefault } from "./modals.js";
import { footerHistory } from "./footer.js";
import { renderBarChart } from "../utils/barchart.js";

export function History() {
    const div = document.createElement("div");

    div.innerHTML = `
    <div class="back_general"></div>
    <header>
        <div class="logo" id="logo">
            <img src="./img/logo.svg" alt="NutriTrack">
        </div>
        <div class="titles">
        <h1>Histórico</h1>
    </div>
        <nav class="header_nav">
            <div id="navHome">Home</div>
            <div id="navProfile">Perfil</div>
            <button id="btnExit" class="btn_stroke btn_exit btn_exit_light">Sair</button>
        </nav>
    </header>
    <main class="history_container">   
        <div class="chart_history">
        <section>
            <div class="chart-container">
                <span class="chart_title">Gráfico Semanal</span>
                <div id="dateDisplay" class="date_display"></div>
                <div>
                  <canvas class="chart_canvas" id="week-chart"></canvas>
                </div>
            </div>
            <div class="align_row"> 
            <button id="previousWeekBtn" class="btn_history">Semana Anterior</button>
            <button id="nextWeekBtn" class="btn_history">Próxima Semana</button>
            </div>
        </section>
        </div>
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
    getDateAndRenderChart();
    navRoutes();

    return div
}

 //Para poder passar a cor dos gráficos usando variável, assim, se a gente mudar a variável já muda tudo
 const computedStyle = getComputedStyle(document.documentElement);
 const corCalorie = computedStyle.getPropertyValue('--cor-calorie').trim();
 const corProtein = computedStyle.getPropertyValue('--cor-protein').trim(); 
 const corCarbo = computedStyle.getPropertyValue('--cor-carbo').trim(); 
 const corLipid = computedStyle.getPropertyValue('--cor-lipid').trim(); 

async function fetchChartData(startDate, endDate) {

    try {
        const response = await fetch(`/api/foodAdded/periodNutrition?start_date=${startDate}&end_date=${endDate}`);
        const responseData = await response.json();
        console.log(responseData)

        console.log(`Esse é o responseData na função fetchCharData: ${responseData}`)
        return responseData;
    } catch (error) {
        console.log(error)
    }
};

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function getWeekRange(date) {
    const dayOfWeek = date.getDay(); // Dia da semana (0 = domingo, 1 = segunda, ..., 6 = sábado)
    const firstDay = new Date(date); // Clonar a data fornecida
    firstDay.setDate(date.getDate() - dayOfWeek); // Definir a data para o domingo da semana
    const lastDay = new Date(firstDay); // Clonar a data do primeiro dia da semana
    lastDay.setDate(firstDay.getDate() + 6); // Definir a data para o sábado da semana
    return [firstDay, lastDay];
}

async function getDateAndRenderChart() {
    // Elementos do DOM
    const dateDisplay = document.getElementById('dateDisplay');
    const previousWeekBtn = document.getElementById('previousWeekBtn');
    const nextWeekBtn = document.getElementById('nextWeekBtn');
    const chartContainer = document.getElementById('week-chart');

    // Função para converter o formato da data de DD/MM/YYYY para YYYY-MM-DD
    const convertDateFormat = (date) => {
        console.log(`Data no formatDate ${date}`)
        const [day, month, year] = date.split('/');
        return `${year}-${month}-${day}`;
    }

    // Data atual
    const today = new Date();

    // Função para atualizar a exibição da data com base na data atual
    async function updateDateDisplay(date) {
        const [startOfWeek, endOfWeek] = getWeekRange(date);
        const startDate = formatDate(startOfWeek);
        const endDate = formatDate(endOfWeek);

        dateDisplay.textContent = `${startDate} - ${endDate}`;

        const responseData = await fetchChartData(convertDateFormat(startDate), convertDateFormat(endDate));
        console.log(`Esse é o responseData na função updateDateDisplay: ${responseData}`)
        renderBarChart(responseData, chartContainer,corCalorie, corProtein, corCarbo, corLipid)
        return { startDate, endDate };
    };

    // Atualizar a exibição da data com a data atual
    updateDateDisplay(today);

    // Evento de clique no botão de semana anterior
    previousWeekBtn.addEventListener('click', async function () {
        today.setDate(today.getDate() - 7); // Retroceder 7 dias (uma semana)
        const { startDate, endDate } = updateDateDisplay(today); // Atualizar a exibição da data e obter as datas de início e fim do período
        const responseData = await fetchChartData(convertDateFormat(startDate), convertDateFormat(endDate));
        console.log(`Esse é o responseData na função previousWeekBtn: ${responseData}`)
        renderBarChart(responseData, chartContainer,corCalorie, corProtein, corCarbo, corLipid)
    });

    // Evento de clique no botão de próxima semana
    nextWeekBtn.addEventListener('click', async function () {
        today.setDate(today.getDate() + 7); // Avançar 7 dias (uma semana)
        const { startDate, endDate } = updateDateDisplay(today); // Atualizar a exibição da data e obter as datas de início e fim do período
        console.log(startDate);
        console.log(endDate)
        const responseData = await fetchChartData(convertDateFormat(startDate), convertDateFormat(endDate));
        console.log(`Esse é o responseData na função nextWeekBtn: ${responseData}`)
        renderBarChart(responseData, chartContainer,corCalorie, corProtein, corCarbo, corLipid)
    });


}

export function navRoutes() {
    const navProfile = document.getElementById("navProfile");
    const navHome = document.getElementById("navHome");
    const logo = document.getElementById("logo");
    const btnExit = document.getElementById("btnExit");

    logo.addEventListener("click", () => {
        const customEvent = createCustomEvent("/home");
        window.dispatchEvent(customEvent);
    });

    navProfile.addEventListener("click", () => {
        const customEvent = createCustomEvent("/profile");
        window.dispatchEvent(customEvent);
    });

    navHome.addEventListener("click", () => {
        const customEvent = createCustomEvent("/home");
        window.dispatchEvent(customEvent);
    });

    btnExit.addEventListener("click", () => {
        logout();
    });
}