const { pool } = require("../db/postgresql");

async function insertUser(username , email , password){
    const query = 'INSERT INTO users(username , email , password) VALUES($1, $2, $3)';
    try {
        await pool.query(query,[username , email , password]);
        console.log("Novo usuário criado com sucesso");
        return { username , email , password };
    } catch (error) {
        console.log('Falha ao inserir os dados do novo usuário', error);
        throw error;
    } 
}

async function getAllUsers(){
    const query = 'SELECT * FROM users';
    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.log('Falha ao pegar os dados dos usuários', error);
        throw error;
    }
}

async function getUserById(id) {
    const query = 'SELECT * FROM users WHERE id=$1';
    try {
        const result = await pool.query(query, [id]);
        return result.rows[0];
    } catch (error) {
        console.log('Usuário não encontrado!', error);
        throw error;
    } 
}

async function updateUser(id, username , email , password){
    const query = 'UPDATE users SET username=$2 , email=$3 , password=$4 WHERE id=$1';
    try {
        await pool.query(query,[id, username , email , password]);
        console.log('Usuário atualizado com sucesso!');
        return { id, username , email , password };
    } catch (error) {
        console.log('Erro ao atualizar os dados do usuário', error);
        throw error;
    } 
}

const updateUserWithoutPassword = async (id, username, email) => {
    const query = `UPDATE users SET username = $2, email = $3
    WHERE id = $1`;
    try {
        const { rows } = await pool.query(query,[id, username, email]);
        return rows[0];
    } catch (error) {
        throw error;
    }
};


async function deleteUser(id){
    const query = 'DELETE FROM users WHERE id=$1';
    try {
        await pool.query(query,[id]);
        console.log('Usuário deletado com sucesso');
    } catch (error) {
        console.log('Erro ao deletar usuário!', error);
        throw error;
    } 
}

module.exports ={
    getAllUsers,
    getUserById,
    insertUser,
    updateUser,
    updateUserWithoutPassword,
    deleteUser
}


