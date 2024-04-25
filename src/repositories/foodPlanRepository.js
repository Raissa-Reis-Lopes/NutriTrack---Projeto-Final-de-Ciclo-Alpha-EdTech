//O repository é quem fará a conexão com o banco de dados, depois o Services vai usar os dados que serão retornados aqui

// Aqui o usuário só pode pegar os dados do plano alimentar, e não alterar, editar ou remover
//O plano será pego pelo id
//id 1 = Perder Peso
// id 1 = Manter Peso
// id 3 = Ganhar Peso

const { connectToDatabase } = require('../db/postgresql');


async function getAllPlans(){
    const pool = await connectToDatabase();
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
    const pool = await connectToDatabase();
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