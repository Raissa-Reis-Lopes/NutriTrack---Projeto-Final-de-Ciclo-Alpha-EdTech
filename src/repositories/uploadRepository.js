const { pool } = require("../db/postgresql");

async function changeAvatar (user_id, new_avatar) {
    const query = 'UPDATE users SET avatar_img=$1 WHERE id=$2';
    try {
        await pool.query(query, [new_avatar, user_id]);
    } catch (error) {
        console.log('Erro ao atualizar o avatar do usuário', error);
        throw error;
    } 
}

async function getActualAvatar (user_id) {
    const query = 'SELECT avatar_img FROM users WHERE id=$1';
    try {
        const result = await pool.query(query, [user_id]);
        return result.rows[0].avatar_img;
    } catch (error) {
        console.log('Erro ao encontrar o avatar do usuário', error);
        throw error;
    } 
}

module.exports = {
    changeAvatar,
    getActualAvatar
}