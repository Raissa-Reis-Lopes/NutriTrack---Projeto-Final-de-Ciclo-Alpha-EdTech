const { connectToDatabase } = require('../db/postgresql');

async function changeAvatar (user_id, new_avatar) {
    const pool = await connectToDatabase();
    const query = 'UPDATE users SET avatar_img=$1 WHERE id=$2';
    try {
        await pool.query(query, [new_avatar, user_id]);
    } catch (error) {
        console.log('Erro ao atualizar o avatar do usuário', error);
        throw error;
    } finally{
        pool.end();
    }
}

async function getActualAvatar (user_id) {
    const pool = await connectToDatabase();
    const query = 'SELECT avatar_img FROM users WHERE id=$1';
    try {
        const result = await pool.query(query, [user_id]);
        return result.rows[0].avatar_img;
    } catch (error) {
        console.log('Erro ao encontrar o avatar do usuário', error);
        throw error;
    } finally{
        pool.end();
    }
}

module.exports = {
    changeAvatar,
    getActualAvatar
}