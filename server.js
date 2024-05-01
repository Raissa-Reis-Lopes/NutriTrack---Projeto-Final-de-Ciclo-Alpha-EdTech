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
