const hashPassword = require('../utils/hashPassword')
const comparePassword = require('../utils/comparePassword')

const { SECRET_KEY } = require('../config');
const jwt = require('jsonwebtoken');

//Tem que pegar o login de todos os usuários no banco de dados

const getLogin = async(req, res) => {
    const user = req.user;
    return res.json(user);
}

const autenticate = async (req, res) => {
    const { username, password } = req.body;

    if(!username){
        res.cookie('session_id', '',{ expires: new Date(0) });
        return res.status(400).json({ error: 'Usuário inválido' });
    }

    if(!password){
        res.cookie('session_id', '',{ expires: new Date(0) });
        return res.status(400).json({ error: 'Senha inválida' });
    }

    // ****************************************************
    //Aqui tem que buscar nos usuários do banco de dados qual deles tem o username e senha que combinam com esses recebidos

    //Gera o toke jwt com informações personalizadas como cookie session_id
    try{
        const sessionToken = await jwt.sign({ user }, SECRET_KEY);
        res.cookie('session_id', sessionToken, { maxAge: 900000, httpOnly: true });
        res.json({ success: true }); 
    } catch(err){
        res.status(500).json({ error:'Erro ao gerar toke JWT' })
    }
};

module.exports = {
    getLogin,
    autenticate
}