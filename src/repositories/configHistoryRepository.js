const { pool } = require("../db/postgresql");

//Vou deixar por padrão, mas não será usada 
async function getAllConfigHistory(){
    const query = 'SELECT * FROM config_history'
    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.log("Falha ao buscar os dados de histórico de configurações");
        throw error;
    }
}


const getConfigsByUserId = async (userId) => {
    try {
        const query = `
            SELECT * FROM config_history
            WHERE user_id = $1
            ORDER BY created_at DESC
        `;
        const values = [userId];
        const { rows } = await pool.query(query, values);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

async function getLatestConfigHistoryByUserId(user_id){
    const query = 'SELECT * FROM config_history WHERE user_id=$1 ORDER BY created_at DESC LIMIT 1';
    try {
        const result = await pool.query(query, [user_id]);
        return result.rows[0]; // Retorna apenas o primeiro registro (o mais recente)
    } catch (error) {
        console.log('Configuração não localizada');
        throw error;
    }
}

async function getConfigHistoryByUserIdAndDate(user_id, date) {
    const query = 'SELECT * FROM config_history WHERE user_id=$1 AND created_at::date=$2';
    try {
        const result = await pool.query(query, [user_id, date]);
        return result.rows[0];  // Retorna a primeira configuração encontrada para a data
    } catch (error) {
        console.log('Falha ao buscar a configuração por usuário e data', error);
        throw error;
    }
}

//Esse select será usado para fazer as buscas pelo config_history de um determinado período
const getLatestConfigHistoryBeforeDate = async (user_id, date) => {
    const query = `SELECT *
    FROM config_history
    WHERE user_id = $1 AND created_at::date < $2
    ORDER BY created_at DESC
    LIMIT 1`;
    try {
        const result = await pool.query(query,[user_id, date]);
        return result.rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
};

async function updateConfigHistory(user_id, food_plan_id, activity_level, weight, height, birth_date, gender, date) {
    const query = `
        UPDATE config_history 
        SET food_plan_id=$2, activity_level=$3, weight=$4, height=$5, birth_date=$6, gender=$7 
        WHERE user_id=$1 AND created_at::date=$8
    `;
    try {
        await pool.query(query, [user_id, food_plan_id, activity_level, weight, height, birth_date, gender, date]);
        return { user_id, food_plan_id, activity_level, weight, height, birth_date, gender, date };
    } catch (error) {
        console.log('Falha ao atualizar a configuração', error);
        throw error;
    }
}

async function insertConfigHistory(user_id, food_plan_id, activity_level, weight, height, birth_date, gender, date){
    const query = 'INSERT INTO config_history(user_id, food_plan_id, activity_level, weight, height, birth_date, gender, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8::date)'
    try {
        await pool.query(query,[user_id, food_plan_id, activity_level, weight, height, birth_date, gender, date]);       
        return { user_id, food_plan_id, activity_level, weight, height, birth_date, gender, created_at }
    } catch (error) {
        console.log('Falha ao inserir os dados da configuração do usuário')
    }
}



module.exports = {
    insertConfigHistory,
    getAllConfigHistory,
    getConfigsByUserId,
    getLatestConfigHistoryByUserId,
    getConfigHistoryByUserIdAndDate,
    getLatestConfigHistoryBeforeDate,
    updateConfigHistory
}