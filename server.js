const config = require('./src/config');
const express = require("express");
const https = require('https');
const fs = require('fs');
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;
const port = config.PORT;
const routes = require('./src/routes');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

app.use(redirectToHTTPS());

const publicPath = path.join(__dirname, 'public');
const uploadsPath = path.join(__dirname, 'uploads');

app.use(express.json()); 

app.use(cookieParser());

app.use(express.static(publicPath));

app.use('/assets', express.static(uploadsPath));

app.use('/api', routes);

// Rota para servir a página HTML
app.get('/*', (req, res)=>{
    res.sendFile(path.resolve('public', 'index.html'));
})

// Carrega as opções de certificado SSL
const privateKey = fs.readFileSync('/etc/letsencrypt/live/alpha03.alphaedtech.org.br/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/alpha03.alphaedtech.org.br/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/alpha03.alphaedtech.org.br/chain.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

// Cria o servidor HTTPS
const httpsServer = https.createServer(credentials, app);

// Inicia o servidor na porta configurada
httpsServer.listen(port, () => {
    console.log(`Server running on https://alpha03.alphaedtech.org.br`);
});


/////////////////////////////////////////////
// const config = require('./src/config');
// const express = require("express");
// const app = express();
// const port = config.PORT;
// const routes = require('./src/routes');
// const cookieParser = require('cookie-parser');
// const path = require('path');

// // Define o caminho do diretório onde os arquivos estáticos estão localizados
// const publicPath = path.join(__dirname, 'public');
// // Define o caminho do diretório dos uploads
// const uploadsPath = path.join(__dirname, 'uploads');

// //middleware para analisar o corpo das requisições Json
// app.use(express.json()); 

// //Middleware para lidar com os cookies
// app.use(cookieParser());

// // Configura o Express para servir os arquivos estáticos da SPA
// app.use(express.static(publicPath));

// // Configura o Express para servir a pasta uploads 
// app.use('/assets', express.static(uploadsPath));

// //Pode mudar depois, mas a princípio deixei assim para usar as rotas com a rota /nutritrack na frente
// app.use('/api', routes)


// app.get('/*', (req, res)=>{
//     res.sendFile(path.resolve('public', 'index.html'));
// })



// app.listen(port, ()=>{
//     console.log(`Server running on http://localhost:${port}`);
// });