const config = require('./src/config');
const express = require("express");
const app = express();
const port = config.PORT;
const routes = require('./src/routes');
const cookieParser = require('cookie-parser');


//middleware para analisar o corpo das requisições Json
app.use(express.json()); 

//Middleware para lidar com os cookies
app.use(cookieParser());


//Aqui vou vincular à página que vamos usar na pasta public



//Pode mudar depois, mas a princípio deixei assim para usar as rotas com a rota /nutritrack na frente
app.use('/nutritrack', routes)


// Hello World só para testar a conexão
app.get('/', (req, res)=>{
    res.send('Olá Mundo!');
})

app.listen(port, ()=>{
    console.log(`Server running on http://localhost:${port}`);
})