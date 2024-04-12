const { connectToDatabase } = require('../db/postgresql');

const getUserByUsername = async (username) =>{
    const pool = await connectToDatabase();
    const query = 'SELECT * FROM users WHERE username=$1'
    try{
        const result = await pool.query(query,[username]);
        return result.rows;
    }catch(error){
        console.log(error);
        throw new Error('Erro ao buscar o usuário');
    } finally {
        pool.end();
    }
}

module.exports = {
    getUserByUsername,
}