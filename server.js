const config = require('./src/config');
const express = require("express");
const https = require('https');
const port = config.PORT;
const hostname = config.HOSTNAME;
const routes = require('./src/routes');
const cookieParser = require('cookie-parser');
const app = express();

app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.originalUrl} - IP: ${req.ip}`);
    next();
})

app.use(express.json()); 

app.use(cookieParser());


app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server running on https://${hostname}:${port}`);
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