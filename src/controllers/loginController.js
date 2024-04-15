const loginServices = require('../services/loginServices')

const authenticate = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await loginServices.getUser(email);
        
        if(!user){
            return res.status(400).json({ error:'Usuário não encontrado'});
        }

        const { auth, token } = await loginServices.authenticateUser(email, password);

        if(auth){          
            res.cookie('session_id', token, { maxAge: 8460000, httpOnly: true });
            console.log(req.user);
            return res.status(200).json({ auth, message: 'Usuário autenticado com sucesso!'});
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