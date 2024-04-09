const config = require('./src/config')
const express = require("express");
const app = express();
const port = config.PORT;
const bodyParser = require('body-parser');
const routes = require('./src/routes');

//Pode mudar depois, mas a princípio deixei assim para usar as rotas com a rota /home na frente
app.use('/home', routes)

app.listen(port, ()=>{
    console.log(`Server running on http://localhost:${port}`);
})