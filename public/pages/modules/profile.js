import createCustomEvent from "./event.js";

export function Profile() {
    const div = document.createElement("div");

    div.innerHTML=`
    <header>
        <div>
            <div class="logo" id="logo">
                <a href="">
                    <img src="../img/logo.svg" alt="NutriTrack" />
                </a>
            </div>
            <img src="../img/camera.png" alt="Imagem do usuario" />
        </div>
        <nav class="header_nav">
            <a href="/home">Home</a>
            <a href="/historic">Histórico</a>
            <a href="/chalenge">Desafios</a>
        </nav>
    </header>
    <div class="profile_changes">
        <div class="account">
            <div class="form_profile">
                <h3>Conta</h3>
                <img src="../img/edit.svg" alt="editor">
            </div>
            <div id="form1">
                <p><span>Email</span><span>email@example.com</span></p>
                <p><span>Senha</span><span>********</span></p>
            </div>
            <form id="form2" class="form_input_profile">
                <section>
                    <label for="email">E-mail</label>
                    <input type="email" name="email" id="email">
                    <div id ="erroEmailRegister" class="erro"></div>
                    <label for="actualPassword">Senha Atual</label>
                    <input type="password" name="actualPassword" id="actualPassword">
                    <label for="newPassword">Nova Senha</label>
                    <input type="password" name="newPassword" id="newPassword">
                    <label for="confirmNewPassword">Confirmar Nova Senha</label>
                    <input type="password" name="confirmNewPassword" id="confirmNewPassword">
                    <div id ="erroPasswordRegister" class="erro"></div>
                    
                    <button class="btn_stroke">Salvar alterações</button>
                </section>
            </form>
        </div>
        <div class="account">
            <div class="form_profile">
                <h3>Informações Pessoais</h3>
                <img src="../img/edit.svg" alt="editor">
            </div>
            <div id="form3">
                <p><span>Nome</span><span>Usuario1</span></p>
                <p><span>Data de Nascimento</span><span>01/01/1990</span></p>
                <p><span>Peso</span><span>65.0 KG</span></p>
                <p><span>Altura</span><span>180 CM</span></p>
            </div>
            <form id="form4" class="form_input_profile">
                <section>
                    <label for="name">Nome</label>
                    <input type="text" name="name" id="name">
                    <div id ="erroNameRegister" class="erro"></div>
                    <label for="birthDate">Data de Nascimento</label>
                    <input type="date" name="birthDate" id="birthDate">
                    <div id ="erroBirthRegister" class="erro"></div>
                    <label for="weight">Peso</label>
                    <input type="number" name="weight" id="weight">
                    <div id ="erroWeightRegister" class="erro"></div>
                    <label for="height">Altura</label>
                    <input type="number" name="height" id="height">
                    <div id ="erroHeightRegister" class="erro"></div>
                    
                    <button class="btn_stroke">Salvar alterações</button>
                </section>
            </form>
        </div>
    </div>
    <div>
        <button class="btn_stroke">DESCONECTAR</button>
        <button class="btn_stroke">APAGAR CONTA</button>
    </div>
    <footer>
        <div class="footer_history">
            <span>all rights reserved</span>
            <span id="open-modal-terms">termos de uso</span>
            <span id="open-modal-privacy">política de privacidade</span>
        </div>
    </footer>
  `;

  document.getElementById("root").innerHTML = '';
    document.getElementById("root").appendChild(div);
  registerBtns();
    return div
}



// export function registerBtns() {
//     let currentForm = 1;

//     const btnBack = document.getElementById("btn_back");
//     const btnNext = document.getElementById("btn_next");
  
//     let messageName = ''; // Inicialização das variáveis
//     let messageEmail = ''; // Inicialização das variáveis
//     let messagePassword = ''; // Inicialização das variáveis

//     btnBack.addEventListener("click", () => {
//       if(currentForm === 1) {
//             const customEvent = createCustomEvent('/');
//             history.pushState({}, '', '/');
//             window.dispatchEvent(customEvent);
//         } else if (currentForm > 1) {
//             currentForm--;
//             showForm(currentForm);
//         }
//     });

//     btnNext.addEventListener("click", () => {
//         if(currentForm < 3) {
//             currentForm++;
//             showForm(currentForm);
//         } else if(currentForm === 3) {
//             submitForm();
//             const customEvent = createCustomEvent('/login');
//             history.pushState({}, '', '/login');
//             window.dispatchEvent(customEvent);
//         }
//     });
// }