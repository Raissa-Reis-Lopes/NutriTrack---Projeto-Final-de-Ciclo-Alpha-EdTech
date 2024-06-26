require('dotenv').config();

const config = {
    NODE_ENV: process.env.NODE_ENV || "development",
    HOSTNAME: process.env.HOSTNAME,
    PORT: process.env.PORT || 3000,
    SECRET_KEY: process.env.SECRET_KEY,
    DB_USER: process.env.DB_USER,
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_DATABASE: process.env.DB_DATABASE || "nutritrack",
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_PORT: process.env.DB_PORT || 5432,
    PRIVATE_KEY_PATH: process.env.PRIVATE_KEY_PATH,
    CERTIFICATE_PATH: process.env.CERTIFICATE_PATH,
    CA_PATH: process.env.CA_PATH,
}

module.exports = config;

