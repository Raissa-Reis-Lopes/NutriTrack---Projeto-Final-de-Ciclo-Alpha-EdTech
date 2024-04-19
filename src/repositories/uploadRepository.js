const { connectToDatabase } = require('../db/postgresql');

async function uploadAvatar (user_id, avatar) {
    const pool = await connectToDatabase();
    const query = 'UPDATE users SET avatar_img=$1 WHERE id=$2';
    try {
        await pool.query(query, [avatar, user_id]);
        console.log("Avatar atualizado com sucesso");
    } catch (error) {
        console.log('Erro ao atualizar o avatar do usuário', error);
        throw error;
    } finally{
        pool.end();
    }
}

module.exports = {
    uploadAvatar
}