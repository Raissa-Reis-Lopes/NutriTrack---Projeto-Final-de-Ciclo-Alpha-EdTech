const bcrypt = require('bcrypt');

async function comparePassword(password, hashedPassword) {
    try{ 
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    } catch (error){
        console.error('Erro ao comparar as senhas:', error)
        return false;
    }
}

module.exports = comparePassword;