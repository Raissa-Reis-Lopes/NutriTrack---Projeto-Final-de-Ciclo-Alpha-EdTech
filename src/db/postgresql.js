require('dotenv').config();
const { Pool } = require('pg');

async function connectToDatabase(){
    const pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    });

    try{
        await pool.connect();
        console.log('Conexão bem sucedida!');
        return pool;
    }catch(error){
        console.log('Erro de conexão:', error);
        throw error;
    }
}

module.exports = connectToDatabase;