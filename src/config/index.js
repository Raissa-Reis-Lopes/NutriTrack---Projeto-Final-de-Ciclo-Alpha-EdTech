require('dotenv').config();

const config = {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: process.env.PORT || 443,
    SECRET_KEY: process.env.SECRET_KEY,
    DB_USER: process.env.DB_USER,
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_DATABASE: process.env.DB_DATABASE || "nutritrack",
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_PORT: process.env.DB_PORT || 5432
}

module.exports = config;

