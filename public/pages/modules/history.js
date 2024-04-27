import createCustomEvent from "./event.js";
// import { limitDate } from "../utils/limitDates.js";
import { logout } from "../utils/logout.js";
import { generateBarChart } from '../utils/barchart.js';

export function History() {
    const div = document.createElement("div");

    div.innerHTML=`
    <header>
        <div class="back_general"></div>
        <div class="logo" id="logo">
            <a>
                <img src="../img/logo.svg" alt="NutriTrack">
            </a>
        </div>
        <nav class="header_nav">
            <div id="navToHome">Home</div>
            <div id="navProfile">Perfil</div>
            <button class="btn_exit">Sair</button>
        </nav>
    </header>
    <main>
        <div class="titles">
            <h1>Histórico</h1>
            <h5>Calorias consumidas:</h5>
            <h5>Meta de calorias:</h5>
        </div>
        <div class="period">
            <div id="input-date">
                <button class="btn_stroke" onclick="navegar('-')">← Anterior</button>
                <input type="date" id="dataInicio">
                <input type="date" id="dataFim">
                <button class="btn_stroke" onclick="navegar('+')">Próximo →</button>
            </div>
        </div>
        <div class="chart">
        <section>
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
        <section>
            <div id="fade-terms" class="hide"></div>
            <div id="modal-terms" class="hide">
                <div class="modal-header">
                    <h2>Termos de uso</h2>
                    <img src="../img/botao-excluir.png" alt="botão fechar" id="close-modal-terms">
                </div>
                <div class="modal-body">
                    <p>Ao acessar e usar o site Nutri Track, você aceita e concorda em estar vinculado por estes Termos de uso.</p>
                    <p>Vocẽ concorda em usar o site apenas para fins legais e de maneira que não infrinja os direitos ou restrinja ou iniba o uso e aproveitamento do site por qualquer terceiro.</p>
                    <p>O conteúdo deste site, incluindo texto, gráficos, imagens e outros materiais, são protegidos por direitos autorais. Vocẽ não pode reproduzir, distribuir, modificar ou republicar materiais contidos neste site sem a permissão prévia por escrito do(s) responsável(is) legal(is) pelo Nutri Track.</p>
                    <p>O site e seu conteúdo são fornecidos "como estão". Nós não oferecemos garantias ou representações de qualquer tipo, expressas ou implícitas, sobre a integridade, precisão confiabilidade, adequação ou disponibilidade do site ou seu conteúdo.</p>
                    <p>Podemos alterar estes Termos de Uso periodicamente. Se fizermos alterações, notificaremos você.</p>
                    <p>Se você tiver alguma dúvida sobre este Termo de Uso, entre em contato conosco em contato@email.com ou (11) 0800 1234-5678</p>
                </div>
            </div>
        </section>
        <!-- Tags para o modal sac -->
        <section>
            <div id="fade-sac" class="hide"></div>
            <div id="modal-sac" class="hide">
                <div class="modal-header">
                    <h2>Bem vindo a central de atendimento</h2>
                    <img src="../img/botao-excluir.png" alt="botão fechar" id="close-modal-sac"> 
                </div>
                <div class="modal-body">
                    <h4>Como podemos ajudá-lo?</h4>
                    <img src="../img/whatsapp.png" alt="whatsapp" />
                    <p>WhatsApp: (11) 91234-5678</p>
                    <img src="../img/o-email.png" alt="email" />
                    <p>Email: contato@email.com</p>
                </div>
            </div>
        </section>
    <footer>
        <div class="footer_history">
            <span>all rights reserved</span>
            <span id="open-modal-terms">termos de uso</span>
            <span id="open-modal-privacy">política de privacidade</span>
            <span id="open-modal-sac">posso ajudar?</span>
        </div>
    </footer>
    `;
  
    document.getElementById("root").innerHTML = '';
    document.getElementById("root").appendChild(div);
    registerBtns();
    createModalEvents();
    // limitDate('input-date');

    const dataAtual = new Date();
    const dataInicioInput = document.getElementById('dataInicio');
    const dataFimInput = document.getElementById('dataFim');

    // Define a data atual como o valor inicial dos elementos de entrada de data
    dataInicioInput.value = formatarData(dataAtual);
    dataFimInput.value = formatarData(new Date(dataAtual.getTime() - (7 * 24 * 60 * 60 * 1000))); // Adiciona uma semana à data atual

    const inputDate = document.getElementById('input-date');
  
    inputDate.addEventListener("change", function() {
        const selectedDate = inputDate.value;
        // getweek(selectedDate);
        // loadUserDataForDate(selectedDate); // Carrega os dados para a data selecionada
        
        let dataInicio = new Date(document.getElementById('dataInicio').value);
        let dataFim = new Date(document.getElementById('dataFim').value);
        let dias = calcularDias(dataInicio, dataFim);
        
        // Define dataInicio para o último domingo
        dataInicio.setDate(dataInicio.getDate() - dataInicio.getDay());
        document.getElementById('dataInicio').value = formatarData(dataInicio);
        
        // Define dataFim para o próximo sábado
        dataFim.setDate(dataInicio.getDate() + 6);
        document.getElementById('dataFim').value = formatarData(dataFim);
    });

    const dias = [];
    generateBarChart(dias);
    
    return div
}

function formatarData(data) {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // +1 porque janeiro é 0
    const dia = String(data.getDate()).padStart(2, '0');
    
    return `${ano}-${mes}-${dia}`;
}

function navegar(direcao) {
    if (direcao === '-') {
        dataInicio.setDate(dataInicio.getDate() - 7);
        dataFim.setDate(dataFim.getDate() - 7);
    } else if (direcao === '+') {
        dataInicio.setDate(dataInicio.getDate() + 7);
        dataFim.setDate(dataFim.getDate() + 7);
    }

    document.getElementById('dataInicio').value = formatarData(dataInicio);
    document.getElementById('dataFim').value = formatarData(dataFim);
}

// function calcularDias(dataInicio, dataFim) {
//     const dataAtual = new Date(dataInicio);

//     while (dataAtual <= dataFim) {
//         let dia = {
//             data: formatarDataGrafico(dataAtual, 'ddd'),
//             calorias: Math.floor(Math.random() * 1000),
//             gordura: Math.floor(Math.random() * 100),
//             proteina: Math.floor(Math.random() * 100),
//             carboidrato: Math.floor(Math.random() * 200)
//         };
//         dias.push(dia);
//         dataAtual.setDate(dataAtual.getDate() + 1);
//     }

//     return dias;
// }

function formatarDataGrafico(data, formato) {
    let diaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    let ano = data.getFullYear();
    let mes = String(data.getMonth() + 1).padStart(2, '0'); // +1 porque janeiro é 0
    let dia = String(data.getDate()).padStart(2, '0');
    
    if (formato === 'ddd') {
        return `${diaSemana[data.getDay()]} ${dia}/${mes}`;
    }

    return `${ano}-${mes}-${dia}`;
}

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
        register.addEventListener ("click",function(e){
            e.preventDefault();
            const customEvent = createCustomEvent('/home');
            window.dispatchEvent(customEvent); 
        });
    }

    if (btnProfile) {
        btnBack.addEventListener("click", () => {
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

    navHistory.addEventListener("click", () => {
        const customEvent = createCustomEvent("/home");
        window.dispatchEvent(customEvent);
    });

    btnExit.addEventListener("click", logout);
}