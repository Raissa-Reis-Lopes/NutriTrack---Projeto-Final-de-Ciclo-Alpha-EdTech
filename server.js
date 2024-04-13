const config = require('./src/config');
const express = require("express");
const app = express();
const port = config.PORT;
const routes = require('./src/routes');
const cookieParser = require('cookie-parser');
const path = require('path');

// Define o diretório onde os arquivos estáticos da SPA estão localizados
const publicPath = path.join(__dirname, 'public');

//middleware para analisar o corpo das requisições Json
app.use(express.json()); 

//Middleware para lidar com os cookies
app.use(cookieParser());

// Configura o Express para servir os arquivos estáticos da SPA
app.use(express.static(publicPath));

//Pode mudar depois, mas a princípio deixei assim para usar as rotas com a rota /nutritrack na frente
app.use('/api', routes)

// Captura todas as requisições que não correspondem a nenhuma outra rota definida anteriormente.
app.get('*', (req, res)=>{
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, ()=>{
    console.log(`Server running on http://localhost:${port}`);
});