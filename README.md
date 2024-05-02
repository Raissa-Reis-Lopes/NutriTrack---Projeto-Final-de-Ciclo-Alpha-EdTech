Projeto final do Ciclo 1 da Alpha EdTech

# NutriTrack


![alt text](<capa_nutritrack.png>)


<h2>Descrição</h2>
<h4> A Nutritrack é uma aplicação aliada da sua saúde! </h4>
<p> Um contador de calorias com gráficos que facilitam a visualização dos consumos diários de caloria, proteína, gordura e carboidrato! Ao se cadastrar o usuário pode escolher o plano alimentar que melhor se enquadra para atingir os seus objetivos! Já dentro da aplicação o usuário pode adicionar os alimentos consumidos em cada uma das refeições do dia definindo as suas porções, além disso, também é possível criar alimentos personalizados! Há uma página de histórico em que o usuário pode acompanhar toda a sua trajetória e evolução no controle do consumo de calorias! E, também pode personalizar o seu perfil com uma foto que seja do seu agrado!</p>

<h2>Funcionalidades</h2>
<p>Cadastro de Usuários: Os usuários podem se cadastrar no site fornecendo as informações básicas e necessárias para montar um plano personalizado. 
Autenticação: Sistema de login seguro com criptografia de senha.
Controle dos alimentos consumidos: Os usuários podem pesquisar todos os alimentos cadastrados para adicionar nas refeições ao longo do dia!
Personalização de alimentos: É possível criar alimentos personalizados que também podem ser adicionados às refeições.
Personalização do perfil: O usuário pode escolher uma foto para usar no seu perfil
Gráficos de controle: Gráficos que são atualizados a cada alimento adicionado, para facilitar a visualização do total consumido 
Gráficos de histórico: Gráfico para realizar o acompanhamento de toda a trajetória de consumo
</p>

<h2>Tecnologias Utilizadas</h2>
<ul>
    <li>Node.js: Plataforma para execução do backend da aplicação.</li>
    <li>Express: Framework web para Node.js, utilizado para construir as rotas da API.</li>
    <li>PostgreSQL: Banco de dados relacional para armazenar dados da aplicação.</li>
    <li>Nginx: Servidor de proxy reverso para servir os arquivos estáticas do projeto.</li>
    <li>PM2: Servidor de proxy reverso para servir os arquivos estáticas do projeto.</li>
    <li>Figma: Para a prototipagem do projeto.</li>
    <li>HTML/CSS/JavaScript: Frontend para interação com os usuários.</li>
    <li>Chart.js: Para apresentar os dados em gráficos e facilitar a visualização para o usuário.</li>
    <li>Git/GitHub: Controle de versão e hospedagem do código-fonte.</li>
    <li>JWT: Utilizado para autenticação de usuários e geração de tokens de sessão.</li>
    <li>Cookie-Parser: Middleware para o Express que facilita o gerenciamento de cookies em aplicativos web.</li>
    <li>Nodemon: Utilitário que monitora alterações nos arquivos do projeto e reinicia automaticamente o servidor durante o desenvolvimento.</li>
    <li>Bcrypt: Biblioteca para Node.js que ajuda a criptografar senhas para armazenamento seguro no banco de dados.</li>
    <li>Cors: Middleware para o Express que permite controlar o acesso aos recursos da API a partir de diferentes origens.</li>
    <li>Método Scrum: Utilização do método scrum com realização de dailies e definição de backlogs para cada semana.</li>
    <li>Trello: Para anotar as pautas de cada daily, dividir as tarefas e atribuit responsalidades de cada memebro</li>
    <li>Discord e Whatsapp: Para comunicação e reuniões.</li>
</ul>

<h2>Instalação e Uso</h2>
<ol>
    <li>Clone o repositório via http: git clone https://github.com/Raissa-Reis-Lopes/NutriTrack---Projeto-Final-de-Ciclo-Alpha-EdTech.git</li>
    <li>Ou via ssh: git clone git@github.com:Raissa-Reis-Lopes/NutriTrack---Projeto-Final-de-Ciclo-Alpha-EdTech.git</li>
    <li>Instale as dependências com o comando: npm install</li>
    <li>Configure as tabelas no banco de dados seguindo a ordem de criação fornecida no arquivo create-table.sql</li>
    <li>Configure as variáveis de ambiente no arquivo .env conforme o modelo fornecido em .env-example</li>
    <li>Configure as tabelas no banco de dados seguindo a ordem de criação fornecida no arquivo create-table.sql</li>
    <li>Popule a tabela food com o seguinte comando no terminal: node populate-food.js</li>
    <li>Inicie o servidor: npm start</li>
    <li>Acesse a aplicação em: http://localhost:3000</li>
</ol>

<h2>Equipe</h2>
<ul>
    <li><a href="https://github.com/gabriela-sg">Gabriela Gamba</a></li>
    <li><a href="https://github.com/LuizCrashAlves">Luiz Alves</a></li>    
    <li><a href="https://github.com/Raissa-Reis-Lopes">Raissa Reis</a></li>
</ul>





