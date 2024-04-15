//(A refeição define em qual período o usuário está adicionando o alimento e em qual dia)
//Ela pode ser criada, atualizada, deletada e a bsuca deve ser feita com base no id do usuário + o período + o dia!! Para saber qual alimento o usuário adicionou em qual refeição exatamente e em que dia


const { connectToDatabase } = require('../db/postgresql');

async function insertMeal(user_id, food_id, food_quantity, period, date){
    const pool = connectToDatabase();
    const query = 'INSERT INTO meal(user_id, food_id, food_quantity, period, date) VALUES ($1, $2, $3, $4, $5)';
    try {
        await pool.query(query,[user_id, food_id, food_quantity, period, date]);
        console.log("Dados inseridos com sucesso");
        return { user_id, food_id, food_quantity, period, date }
    } catch (error) {
        console.log('Erro ao inserir os dados da refeição');
        throw error;
    } finally{
        pool.end();
    }
}

//Não acho que usaremos, mas vou deixar a opção de pegar todas as refeições
async function getAllMeals(){
    const pool = await connectToDatabase();
    const query = 'SELECT * FROM meal';
    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.log('Falha ao pegar os dados das refeições');
        throw error;
    } finally {
        pool.end();
    }
}

async function getMealById(id){
    const pool = connectToDatabase();
    const query = 'SELECT * FROM meal WHERE id=$1';
    try {
        const result = await pool.query(query,[id]);
        return result.row;
    } catch (error) {
        console.log('Erro ao buscar a refeição', error);
        throw error;
    } finally {
        pool.end();
    }
}

//Para colocar na home, temos que pegar os alimentos para colocar na tela inicial de acordo com o id do usuário, qual dia ele está salvando o alimento e em qual refeição(period)
async function getMealByUserByPeriodByDate(user_id, period, date){
    const pool = await connectToDatabase();
    const query = 'SELECT * FROM meal WHERE user_id=$1 AND period=$2 AND date=$3';
    try {
        const result = await pool.query(query,[user_id, period, date]);
        return result.rows;
    } catch (error) {
        console.log('Falha ao pegar os dados das refeições');
        throw error;
    } finally {
        pool.end();
    }
}

//Pensando no update, acho que a data não pode ser atualizada, ela pode ser usada para buscar o dia que aquele alimento foi cadastrado, mas não alterada
async function updateMeal(id, user_id, food_id, food_quantity, period, date){
    const pool = await connectToDatabase();
    const query = "UPDATE meal SET user_id=$2, food_id=$3, food_quantity=$4, period=$5  WHERE id = $1 AND date=$6";
    try {
        await pool.query(query,[id, user_id, food_id, food_quantity, period, date]);
        console.log("Usuário atualizado com sucesso!");
        return { id, user_id, food_id, food_quantity, period, period, date }
    } catch (error) {
        console.log('Erro ao atualizar os dados do usuário!', error);
        throw error;
    } finally{
        pool.end();
    }    
}


async function deleteMeal(id){
    const pool = await connectToDatabase();
    const query = 'DELETE FROM meal WHERE id=$1';
    try {
        await pool.query(query,[id]);
        console.log('Refeição deletada com sucesso');
    } catch (error) {
        console.log('Erro ao deletar a refeição', error);
        throw error;
    } finally {
        pool.end();
    }
}

module.exports = {
    insertMeal,
    getAllMeals,
    getMealById,
    getMealByUserByPeriodByDate,
    updateMeal,
    deleteMeal
}


