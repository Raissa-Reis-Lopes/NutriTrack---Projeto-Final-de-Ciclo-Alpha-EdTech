const config = require('./src/config');
const express = require("express");
const https = require('https');
const port = config.PORT;
const hostname = config.HOSTNAME;
const routes = require('./src/routes');
const cookieParser = require('cookie-parser');
// const path = require('path');
const app = express();


app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.originalUrl} - IP: ${req.ip}`);
    next();
})


// const uploadsPath = path.join(__dirname, 'uploads');

app.use(express.json()); 

app.use(cookieParser());

// app.use('/assets', express.static(uploadsPath));

app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server running on https://${hostname}:${port}`);
});
