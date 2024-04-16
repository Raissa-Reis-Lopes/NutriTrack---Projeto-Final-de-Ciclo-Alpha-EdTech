import createCustomEvent from "./event.js";

export function Register() {
    const div = document.createElement("div");

    div.innerHTML=`
    <header>
    <div class="logo" id="logo">
            <img src="../img/logo.svg" alt="NutriTrack">
    </div>
</header>
<main class="welcome"> 
    <form id="form1" class="form_input">
    <h1>Para começar, precisamos te conhecer um pouco melhor!</h1>
        <label for="name">Nome</label>
        <input type="text" name="name" id="name">
        <label for="email">E-mail</label>
        <input type="email" name="email" id="email">
        <label for="password">Senha</label>
        <input type="password" name="password" id="password">
        <label for="password">Repetir Senha</label>
        <input type="password" name="password" id="confirm_password">
        
        <label for="terms">Li e concordo com a <span id="open-modal-privacy">política de privacidade</span> e <span id="open-modal-terms">termos de uso</span></label>
        <input type="checkbox" name="terms" id="terms">
    
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
    </section>
    </form>
    <form id="form2" class="calculator_input" style="display:none;">
    <h1>Agora, vamos calcular seu gasto energético diário!</h1>
        <div class="form">
            <label for="weight">Peso</label>
            <input type="number" name="weight" id="weight" placeholder="CM" required />
        </div>
        <div class="form">
            <label for="height">Altura</label>
            <input type="number" name="height" id="height" placeholder="KG" required />
        </div>
        <div class="form">
            <label for="date">Data de nascimento</label>
            <input type="date" name="date" id="birth_date" />
        </div>
        <div class="form">
            <label for="gender">Sexo biológico</label>
            <select name="gender" id="gender">
                <option value="">Selecione</option>
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
            </select>
        </div>
        <div class="form">
            <label for="activity">Nivel de atividade</label>
            <select name="activity" id="activity">
                <option value="">Selecione</option>
                <option value="sedentary">Sedentário</option>
                <option value="light">Leve</option>
                <option value="moderate">Moderado</option>
                <option value="active">Ativo</option>
                <option valur="very_active">Muito Ativo</option>
            </select>
        </div>
    </form>
    <form id="form3" style="display:none;">
    <h1>Escolha seu plano alimentar!</h1>
        <div class="container_center">
            <div class="plan">
                <div>
                    <h1>Perder peso</h1>
                    <div class="flip-card">
                        <div class="flip-card-inner">
                            <div class="flip-card-front">
                                <h1>45% Carboidratos</h1>
                                <h1>30% Proteínas</h1>
                                <h1>25% Gorduras</h1>
                            </div>
                            <div class="flip-card-back">
                                <p>Essa dieta contém todos os ingredientes necessários e a alta ingestão de proteína ajuda a manter o corpo em forma e reduzir a fome, auxiliando na manutenção da baixa ingestão de calorias!</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h1>Manter o peso</h1>
                    <div class="flip-card">
                        <div class="flip-card-inner">
                            <div class="flip-card-front">
                                <h1>55% Carboidratos</h1>
                                <h1>15% Proteínas</h1>
                                <h1>30% Gorduras</h1>
                            </div>
                            <div class="flip-card-back">
                                <p>Essa dieta se baseia nas diretrizes da boa nutrição e te ajudará a manter o peso atual com uma alimentação saudável e balanceada!</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h1>Ganhar peso</h1>
                    <div class="flip-card">
                        <div class="flip-card-inner">
                            <div class="flip-card-front">
                                <h1>50% Carboidratos</h1>
                                <h1>25% Proteínas</h1>
                                <h1>25% Gorduras</h1>
                            </div>
                            <div class="flip-card-back">
                                <p>Essa dieta é recomendada para as pessoas que querem ganhar massa muscular e melhorar a sua performance! O balanceamento de gorduras e carboidratos darão energia, e a proteína auxiliará o desenvolvimento muscular!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>

    <div class="btns_index">
        <button id="btn_back" class="btn_stroke">Voltar</button>
        <button id="btn_next" class="btn_colorLinear">Próximo</button>
    </div>

</main>
<footer>
    <span>all rights reserved</span>
</footer>
  `;

  document.getElementById("root").innerHTML = '';
    document.getElementById("root").appendChild(div);
  registerBtns();
    return div
}

export function registerBtns() {
    let currentForm = 1;

    const btnBack = document.getElementById("btn_back");
    const btnNext = document.getElementById("btn_next");

    btnBack.addEventListener("click", () => {
        if (currentForm > 1) {
            currentForm--;
            showForm(currentForm);
        }
    });

    btnNext.addEventListener("click", () => {
        if(currentForm < 3) {
            currentForm++;
            showForm(currentForm);
        } else if(currentForm === 3) {
            submitForm();
            const customEvent = createCustomEvent('/home');
            history.pushState({}, '', '/home');
            window.dispatchEvent(customEvent);
        }
    });
}

function showForm(formNumber) {
    document.getElementById("form1").style.display = "none";
    document.getElementById("form2").style.display = "none";
    document.getElementById("form3").style.display = "none";

    document.getElementById(`form${formNumber}`).style.display = "block";
}

function nextStep(step) {
    if (step === 1) {
        showForm(2);
    } else if (step === 2) {
        showForm(3);
    }
}

async function submitForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm_password").value;
    const weight = document.getElementById("weight").value;
    const height = document.getElementById("height").value;
    const birthDate = document.getElementById("birth_date").value;
    const gender = document.getElementById("gender").value;
    const activityLevel = document.getElementById("activity").value;
    const foodPlan = document.getElementById("food_plan").value;
    const terms = document.getElementById("terms").checked;

    if (password !== confirmPassword) {
        alert("Senhas diferentes!");
        return
    }

    if (!terms) {
        alert("Voce precisa concordar com a politica de privacidade e termos de condições!");
        return;
    }

    const userData = {
        name,
        email,
        password,
        weight,
        height,
        birth_date: birthDate,
        gender,
        activity_level: activityLevel,
        food_plan: foodPlan,
    };

    try {
        const response = await fetch("/api/register", {
            method: "POST",
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

