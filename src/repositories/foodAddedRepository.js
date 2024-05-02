const { pool } = require("../db/postgresql");


async function getAllFoodsAdded(){
    const query = 'SELECT * FROM food_added';
    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.log("Falha ao buscar os dados de alimentos adicionados");
        throw error;
    }
}

async function getFoodAddedById(id){
    const query = 'SELECT * FROM food_added WHERE id=$1';
    try {
        const result = await pool.query(query,[id]);
        return result.rows[0];
    } catch (error) {
        console.log("Falha ao buscar os dados de alimentos adicionados");
        throw error;
    }
}

async function getFoodsAddedByUserId(userId){
    const query = 'SELECT * FROM food_added WHERE user_id=$1';
    try {
        const result = await pool.query(query,[userId]);
        return result.rows;
    } catch (error) {
        console.log("Falha ao buscar os dados de alimentos adicionados");
        throw error;
    }
}


async function getFoodsAddedByUserByDate(user_id, date){
    const query = 'SELECT * FROM food_added WHERE user_id=$1 AND created_at::date=$2';
    try {
        const result = await pool.query(query,[user_id, date]);
        return result.rows;
    } catch (error) {
        console.log("Falha ao buscar os dados de alimentos adicionados do usuário neste dia");
        throw error;
    }
}

async function getFoodsAddedByUserInPeriod(user_id, start_date, end_date) {
    const query = 'SELECT * FROM food_added WHERE user_id = $1 AND created_at::date >= $2 AND created_at::date <= $3 ORDER BY created_at ASC';
    try {
        const result = await pool.query(query, [user_id, start_date, end_date]);
        return result.rows;
    } catch (error) {
        console.log("Falha ao buscar os dados de alimentos adicionados do usuário neste período");
        throw error;
    }
}


//Não estava funcionando, coloquei o RETURNING * para ver o retorno
async function insertFoodAdded(user_id, food_id, food_quantity, meal, date) {
    const query = 'INSERT INTO food_added(user_id, food_id, food_quantity, meal, created_at) VALUES($1, $2, $3, $4, $5) RETURNING *';
    try {
        const result = await pool.query(query, [user_id, food_id, food_quantity, meal, date]);
        return result.rows[0];  // Retorna o registro inserido
    } catch (error) {
        console.log('Falha ao adicionar o alimento à refeição:', error.message);
        throw error;
    }
}

async function updateFoodAdded(user_id,food_id, date, food_quantity, meal, id){
    const query = 'UPDATE food_added SET food_id=$2, food_quantity=$4, meal=$5 WHERE user_id=$1 AND created_at =$3 AND id =$6 ';
    try {
        await pool.query(query,[user_id, food_id, date, food_quantity, meal,id]);
        return { user_id, food_id,  date, food_quantity, meal, id }
    } catch (error) {
        throw error;
    }
}

async function deleteFoodAdded(id){
    const query = 'DELETE FROM food_added WHERE id=$1';
    try {
        await pool.query(query,[id]);
        console.log('Alimento removido com sucesso da refeição');
    } catch (error) {
        console.log('Erro ao remover o alimento selecionado');
        throw error;
    }
}

module.exports = {
    getAllFoodsAdded,
    getFoodAddedById,
    getFoodsAddedByUserId,
    getFoodsAddedByUserByDate,
    getFoodsAddedByUserInPeriod,
    insertFoodAdded,
    updateFoodAdded,
    deleteFoodAdded
}

