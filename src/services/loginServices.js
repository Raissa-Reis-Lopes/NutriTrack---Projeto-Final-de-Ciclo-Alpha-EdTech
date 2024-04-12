const jwt = require('jsonwebtoken');
const { comparePassword } = require('../utils/comparePassword');
const { SECRET_KEY } = require('../config');
const loginRepository = require('../repositories/loginRepository');

const getUser = async(username) => {
    try {
        const user = await loginRepository.getUserByUsername();
        return user;
    } catch (error) {
        throw error;
    }
}

const authenticateUser = async(username, password) => {
    try {
        const user = await loginRepository.getUserByUsername(username);
        const matchPassword = await comparePassword(password, user.password);

        //Vai durar 10 dias - 864000ms
        if(user && matchPassword){
            const token = jwt.sign({ id: user.id}, SECRET_KEY, { maxAge: 864000});
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