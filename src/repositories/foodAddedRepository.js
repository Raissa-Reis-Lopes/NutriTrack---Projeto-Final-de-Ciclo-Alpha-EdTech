// user_id, food_id, food_quantity, meal

const { connectToDatabase } = require('../db/postgresql');


async function getAllFoodsAdded(){
    const pool = await connectToDatabase();
    const query = 'SELECT * FROM food_added';
    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.log("Falha ao buscar os dados de alimentos adicionados");
        throw error;
    }
}

async function getFoodsAddedByUserId(userId){
    const pool = await connectToDatabase();
    const query = 'SELECT * FROM food_added WHERE user_id=$1';
    try {
        const result = await pool.query(query,[userId]);
        return result.rows;
    } catch (error) {
        console.log("Falha ao buscar os dados de alimentos adicionados");
        throw error;
    }
}



async function insertFoodAdded(user_id, food_id, food_quantity, meal){
    const pool = await connectToDatabase();
    const query = 'INSERT INTO food_added(user_id, food_id, food_quantity, meal) VALUES($1, $2, $3, $4)';
    try{
        await pool.query(query, [user_id, food_id, food_quantity, meal]);
        console.log(`Alimento de id ${food_id} inserido com sucesso na refeição ${meal}`);
        return { user_id, food_id, food_quantity, meal };
    } catch(error){
        console.log('Falha ao adicionar o alimento à refeição');
    }
} 

async function updateFoodAdded(id, user_id, food_id, food_quantity, meal){
    const pool = await connectToDatabase();
    const query = 'UPDATE food_added SET food_id=$3, food_qunatity=$4, meal=$5 WHERE id=$1 AND user_id=$2 ';
    try {
        await pool.query(query,[id, user_id, food_id, food_quantity, meal]);
        console.log('Atualização de food_added realizada com sucesso!')
        return { user_id, food_id, food_quantity, meal }
    } catch (error) {
        console.log('Falha ao atualizar o food_added');
        throw error;
    }
}

async function deleteFoodAdded(id){
    const pool = await connectToDatabase();
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
    getFoodsAddedByUserId,
    insertFoodAdded,
    updateFoodAdded,
    deleteFoodAdded
}

