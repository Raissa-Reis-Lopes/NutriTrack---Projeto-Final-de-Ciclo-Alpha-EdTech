const express = require("express");
const app = express();
const bodyParser = require('body-parser')

require('dotenv').config();

const port = process.env.PORT || 3000;

//Vou manter a estrutura que usaremos qnd colocar o banco de dados mas deixar comentado enquanto não usamos
// const dbHost = process.env.DB_HOST;
// const dbUser = process.env.DB_USER;
// const dbPassword = process.env.DB_PASSWORD;

app.get('/',(req, res) =>{
    res.send('Olá, mundo!');
})

app.listen(port, ()=>{
    console.log(`Server running on http://localhost:${port}`);
})

