const { pool } = require("../db/postgresql");

async function getAllPlans(){
    const query = 'SELECT * FROM food_plan';
    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.log('Falha ao pegar os dados dos planos alimentares');
        throw error;
    } 
}

async function getPlanById(id){
    const query = 'SELECT * FROM food_plan WHERE id=$1';
    try {
        const result = await pool.query(query, [id]);
        return result.rows[0];
    } catch (error) {
        console.log('Plano alimentar não encontrado!', error);
        throw error;
    } 
}


module.exports = {
    getAllPlans,
    getPlanById
}