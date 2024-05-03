const { pool } = require("../db/postgresql");

async function getFoods(){
    const query = 'SELECT * FROM food WHERE user_id IS NULL';
    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.log('Falha ao pegar os dados dos alimentos', error);
        throw error;
    }
}

async function getUserFoods(user_id){
    const query = 'SELECT * FROM food WHERE user_id=$1';
    try {
        const result = await pool.query(query, [user_id]);
        return result.rows;
    } catch (error) {
        console.log('Falha ao pegar os dados dos alimentos', error);
        throw error;
    }
}

async function getFoodById(id) {
    const query = 'SELECT * FROM food WHERE id=$1';
    try {
        const result = await pool.query(query, [id]);
        return result.rows[0];
    } catch (error) {
        console.log('Alimento não encontrado!', error);
        throw error;
    } 
}

async function 
getFoodNameById(food_id) {
    const query = 'SELECT name FROM food WHERE id=$1';
    try {
        const result = await pool.query(query, [food_id]);
        return result.rows[0];
    } catch (error) {
        console.log("Falha ao buscar o nome do alimento pelo Id");
        throw error;
    }
}

//Depois mudar a lógica para deixar o usuário definir o tamanho da porção
async function createUserFood(user_id, name, calorie, carbohydrate_g, protein_g, lipid_g){
    const query = 'INSERT INTO food (user_id, name, calorie, carbohydrate_g, protein_g, lipid_g) VALUES($1, $2, $3, $4, $5, $6)';
    try {
        await pool.query(query,[user_id, name, calorie, carbohydrate_g, protein_g, lipid_g]);
        return { user_id, name, calorie, carbohydrate_g, protein_g, lipid_g };
    } catch (error) {
        console.log('Erro ao criar alimento do usuário', error);
        throw error;
    } 
}

async function updateUserFood(id, user_id, name, calorie, carbohydrate_g, protein_g, lipid_g){
    const query = 'UPDATE food SET name=$3, calorie=$4, carbohydrate_g=$5, protein_g=$6, lipid_g=$7 WHERE id=$1 AND user_id=$2';
    try {
        await pool.query(query,[id, user_id, name, calorie, carbohydrate_g, protein_g, lipid_g]);
        return { user_id, name, calorie, carbohydrate_g, protein_g, lipid_g };
    } catch (error) {
        console.log('Erro ao atualizar alimento do usuário', error);
        throw error;
    } 
}

async function deleteUserFood(id){
    const query = 'DELETE FROM food WHERE id=$1';
    try {
        await pool.query(query,[id]);
        console.log('Alimento deletado com sucesso');
    } catch (error) {
        console.log('Erro ao deletar o alimento!', error);
        throw error;
    } 
}

module.exports = {
    getFoods,
    getUserFoods,
    getFoodById,
    getFoodNameById,
    createUserFood,
    updateUserFood,
    deleteUserFood,
}