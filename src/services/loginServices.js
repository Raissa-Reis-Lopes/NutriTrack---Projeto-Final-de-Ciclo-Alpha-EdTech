const jwt = require('jsonwebtoken');
const { comparePassword } = require('../utils/comparePassword');
const { SECRET_KEY } = require('../config');
const loginRepository = require('../repositories/loginRepository');

const getUser = async(email) => {
    try {
        const user = await loginRepository.getUserByEmail(email);
        return user;
    } catch (error) {
        throw error;
    }
}

const authenticateUser = async(email, password) => {
    try {
        const user = await loginRepository.getUserByEmail(email);
        const matchPassword = await comparePassword(password, user[0].password);
        

        if(user && matchPassword){
            const token = jwt.sign({ id: user[0].id}, SECRET_KEY, {expiresIn: '10d'});
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