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
            <a href="/home" class="btn_home">Home</a>
            <a href="/history" class="btn_history">Histórico</a>
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
                    
                    <button id="save" class="btn_stroke">Salvar alterações</button>
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

export function registerBtns() {
    const btnHome = document.getElementById("btn_home");
    const btnHistory = document.getElementById("btn_history");
    const btnAccount = document.getElementById("btn_account");

    if(btnHome){
        btnHome.addEventListener ("click",function(e){
            e.preventDefault();
            const customEvent = createCustomEvent('/home');
            window.dispatchEvent(customEvent); 
        });
    }

    if (btnHistory) {
        btnHistory.addEventListener("click", () => {
            const customEvent = createCustomEvent('/history');
            window.dispatchEvent(customEvent);
        });
    }

    if (btnAccount) {
        btnAccount.addEventListener ("click", function (){
            const editForms = document.querySelectorAll(".form_profile img");
            const forms = document.querySelectorAll(".form_input_profile");
            const formDisplay = document.querySelectorAll(".account > div:nth-child(2)");
            const btns = document.getElementById("save");

            forms.forEach(function(form) {
                form.style.display = "none";
            });

            editForms.forEach(function(img, index) {
                img.onclick = function() {
                    formDisplay[index].style.display = "none";
                    forms[index].style.display = "block";
                };
            });

            btns.forEach(function(btn, index) {
                btn.onclick = async function() {
                    forms[index].style.display = "none";
                    formDisplay[index].style.display = "block";

                    const name = document.getElementById("name").value;
                    const email = document.getElementById("email").value;
                    const password = document.getElementById("password").value;
                    const weight = document.getElementById("weight").value;
                    const height = document.getElementById("height").value;
                    const birthDate = document.getElementById("birth_date").value;

                    const userData = {
                        name,
                        email,
                        password,
                        weight,
                        height,
                        birth_date: birthDate,
                    };

                    try {
                        const response = await fetch("/api/register", {
                            method: "UPDATE",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(userData),
                        });
                
                        if (!response.ok) {
                            throw new Error("Erro ao realizar o registro");
                        }
                
                        alert('Cadastro de usuário realizado com sucesso!');
                    }
                    catch (error) {
                        console.error("Erro ao realizar o registro:", error);
                        alert("Erro ao realizar o registro. Tente novamente");
                    }
                }
            })
        })
    }
}