const config = require('./src/config')
const express = require("express");
const app = express();
const port = config.PORT;
const bodyParser = require('body-parser')

app.get('/',(req, res) =>{
    res.send('Olá, mundo!');
})

app.listen(port, ()=>{
    console.log(`Server running on http://localhost:${port}`);
})

 