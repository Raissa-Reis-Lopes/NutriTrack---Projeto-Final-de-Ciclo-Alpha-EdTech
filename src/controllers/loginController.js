const loginServices = require('../services/loginServices')

const authenticate = async(req, res) => {
    const { username, password } = req.body;
    try {
        const user = await loginServices.getUser(username);
        
        if(!user){
            return res.status(400).json({ error:'Usuário não encontrado'});
        }

        const { auth, token } = await loginServices.authenticateUser(username, password);

        if(auth){
            res.cookie('session_id', sessionToken, { maxAge: 8460000, httpOnly: true });
            return res.status(200).json({ auth });
        }

        return res.status(400).json({ error: 'Usuário e/ou senha inválidos'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Falha ao autenticar usuário, erro no servidor'});
    }
};

module.exports = {
    authenticate,
}