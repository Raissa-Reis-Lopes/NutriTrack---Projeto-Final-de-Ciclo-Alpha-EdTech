const jwt = require('jsonwebtoken');
const { comparePassword } = require('../utils/comparePassword');
const { SECRET_KEY } = require('../config');
const loginRepository = require('../repositories/loginRepository');

const getUser = async(username) => {
    try {
        const user = await loginRepository.getUserByUsername(username);
        return user;
    } catch (error) {
        throw error;
    }
}

const authenticateUser = async(username, password) => {
    try {
        const user = await loginRepository.getUserByUsername(username);
        const matchPassword = await comparePassword(password, user[0].password);

        if(user && matchPassword){
            const token = jwt.sign({ id: user.id}, SECRET_KEY, {expiresIn: '10d'});
            return{ auth: true, token};
        }
        return { auth: false, error:'Usuário e/ou senha inválidos'};
    } catch (error) {
        console.log(error);
        throw new Error('Falha na autenticação do usuário')
    }
}


module.exports = {
    getUser,
    authenticateUser,
}