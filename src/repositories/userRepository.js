//O repository é quem fará a conexão com o banco de dados, depois o Services vai usar os dados que serão retornados aqui

const { connectToDatabase } = require('../db/postgresql');

async function insertUser(food_plan_id, activity_level, username , email , password , weight , height , birth_date , gender){
    const pool = await connectToDatabase();
    const query = 'INSERT INTO users(food_plan_id, activity_level, username , email , password , weight , height , birth_date , gender) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)';
    try {
        await pool.query(query,[food_plan_id, activity_level, username , email , password , weight , height , birth_date , gender]);
        console.log("Dados inseridos com sucesso");
        return { food_plan_id, activity_level, username , email , password , weight , height , birth_date , gender };
    } catch (error) {
        console.log('Erro ao inserir os dados do usuário', error);
        throw error;
    } finally{
        pool.end();
    }
}

async function getAllUsers(){
    const pool = await connectToDatabase();
    const query = 'SELECT * FROM users';
    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.log('Falha ao pegar os dados dos usuários', error);
        throw error;
    }finally{
        pool.end();
    }
}


async function getUserById(id) {
    const pool = await connectToDatabase();
    const query = 'SELECT * FROM users WHERE id=$1';
    try {
        const result = await pool.query(query, [id]);
        return result.rows[0];
    } catch (error) {
        console.log('Usuário não encontrado!', error);
        throw error;
    } finally{
        pool.end();
    }
}

async function updateUser(id, food_plan_id, activity_level, username , email , password , weight , height , birth_date , gender){
    const pool = await connectToDatabase();
    const query = 'UPDATE users SET food_plan_id=$1, activity_level=$2, username=$3 , email=$4 , password=$5 , weight=$6 , height=$7 , birth_date=$8 , gender=$9 WHERE id=$10';
    try {
        await pool.query(query,[food_plan_id,activity_level, username,email,password,weight,height,birth_date,gender,id]);
        console.log('Usuário atualizado com sucesso!');
        return { id, food_plan_id, activity_level, username , email , password , weight , height , birth_date , gender };
    } catch (error) {
        console.log('Erro ao atualizar os dados do usuário', error);
        throw error;
    } finally{
        pool.end();
    }
}

async function deleteUser(id){
    const pool = await connectToDatabase();
    const query = 'DELETE FROM users WHERE id=$1';
    try {
        await pool.query(query,[id]);
        console.log('Usuário deletado com sucesso');
    } catch (error) {
        console.log('Erro ao deletar usuário!', error);
        throw error;
    } finally{
        pool.end();
    }
}

module.exports ={
    insertUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}


