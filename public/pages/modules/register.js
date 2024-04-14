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
    <div>
        <h1>Para começar, precisamos te conhecer um pouco melhor!</h1>
        <div class="div_input">
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

            <div class="btns_index">
                <button id="btn_back" class="btn_stroke">Voltar</button>
                <button id="btn_next" class="btn_colorLinear">Próximo</button>
            </div>
        </div>
        
    </div>

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

// precisa ver se não tem informação repetida e adicionar informações no banco de dados

export function registerBtns(){
    const btnBack = document.getElementById("btn_back");
    const btnNext = document.getElementById("btn_next");
 
    if(btnBack){
        btnBack.addEventListener ("click",()=>{
            const customEvent = createCustomEvent('/');
            history.pushState({}, '', '/');
            window.dispatchEvent(customEvent); 
        })
    }
    // sem verificação
    // if(btnNext){
    //     btnNext.addEventListener ("click",()=>{
    //         const customEvent = createCustomEvent('/forms');
    //         history.pushState({}, '', '/forms');
    //         window.dispatchEvent(customEvent); 
    //     })
    // }
    
    btnNext.addEventListener("click", async () => {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (!response.ok) {
                throw new Error('Erro ao registrar');
            }

            const customEvent = createCustomEvent('/forms');
            history.pushState({}, '', '/forms');
            window.dispatchEvent(customEvent); 
        } catch (error) {
            console.error('Erro ao registrar:', error);
        }
    });
}
