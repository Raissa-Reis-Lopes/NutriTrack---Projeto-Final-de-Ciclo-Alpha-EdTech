const { connectToDatabase } = require('../db/postgresql');

const getUserByEmail = async (email) =>{
    const pool = await connectToDatabase();
    const query = 'SELECT * FROM users WHERE email=$1'
    try{
        const result = await pool.query(query,[email]);
        return result.rows;   //[0]
    }catch(error){
        console.log(error);
        throw new Error('Erro ao buscar o usuário');
    } finally {
        pool.end();
    }
}

module.exports = {
    getUserByEmail,
}