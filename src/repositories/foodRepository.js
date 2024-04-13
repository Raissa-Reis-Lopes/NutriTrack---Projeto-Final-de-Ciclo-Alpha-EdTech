const { connectToDatabase } = require('../db/postgresql');

async function getFoods(){
    const pool = await connectToDatabase();
    const query = 'SELECT * FROM food WHERE user_id IS NULL';
    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.log('Falha ao pegar os dados dos alimentos', error);
        throw error;
    }finally{
        pool.end();
    }
}

async function getAllFoods(){
    const pool = await connectToDatabase();
    const query = 'SELECT * FROM food';
    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.log('Falha ao pegar os dados dos alimentos', error);
        throw error;
    }finally{
        pool.end();
    }
}

async function getUserFoods(user_id){
    const pool = await connectToDatabase();
    const query = 'SELECT * FROM food WHERE user_id=$1';
    try {
        const result = await pool.query(query, [user_id]);
        return result.rows;
    } catch (error) {
        console.log('Falha ao pegar os dados dos alimentos', error);
        throw error;
    }finally{
        pool.end();
    }
}

async function getFoodById(id) {
    const pool = await connectToDatabase();
    const query = 'SELECT * FROM food WHERE id=$1';
    try {
        const result = await pool.query(query, [id]);
        return result.rows[0];
    } catch (error) {
        console.log('Alimento não encontrado!', error);
        throw error;
    } finally{
        pool.end();
    }
}

async function createUserFood(user_id, name, calorie, carbohydrate, protein, lipid){
    const pool = await connectToDatabase();
    const query = 'INSERT INTO food (user_id, name, calorie, carbohydrate, protein, lipid) VALUES($1, $2, $3, $4, $5, $6)';
    try {
        await pool.query(query,[user_id, name, calorie, carbohydrate, protein, lipid]);
        console.log("Alimento adicionado com sucesso");
        return { user_id, name, calorie, carbohydrate, protein, lipid };
    } catch (error) {
        console.log('Erro ao criar alimento do usuário', error);
        throw error;
    } finally{
        pool.end();
    }
}

async function updateUserFood(id, user_id, name, calorie, carbohydrate, protein, lipid){
    const pool = await connectToDatabase();
    const query = 'UPDATE food SET user_id=$1, name=$2, calorie=$3, carbohydrate=$4, protein=$5, lipid=$6 WHERE id=$7 AND user_id IS NOT NULL';
    try {
        await pool.query(query,[user_id, name, calorie, carbohydrate, protein, lipid, id]);
        console.log("Alimento atualizado com sucesso");
        return { user_id, name, calorie, carbohydrate, protein, lipid };
    } catch (error) {
        console.log('Erro ao atualizar alimento do usuário', error);
        throw error;
    } finally{
        pool.end();
    }
}

async function deleteUserFood(id){
    const pool = await connectToDatabase();
    const query = 'DELETE FROM food WHERE id=$1';
    try {
        await pool.query(query,[id]);
        console.log('Alimento deletado com sucesso');
    } catch (error) {
        console.log('Erro ao deletar o alimento!', error);
        throw error;
    } finally{
        pool.end();
    }
}

module.exports = {
    getFoods,
    getAllFoods,
    getUserFoods,
    getFoodById,
    createUserFood,
    updateUserFood,
    deleteUserFood,
}