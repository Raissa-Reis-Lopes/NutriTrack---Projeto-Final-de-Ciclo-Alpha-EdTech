const loginServices = require('../services/loginServices')

const authenticate = async(req, res) => {
    const { email, password, rememberMe } = req.body;
    try {
        const user = await loginServices.getUser(email);

        if(!user){
            return res.status(400).json({ error:'Usuário não encontrado'});
        }

        const { auth, token } = await loginServices.authenticateUser(email, password);

        if(auth){          
            const maxAge = rememberMe ? 10 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;  // 10 dias se selecionado, 1 dia se não
            res.cookie('session_id', token, { maxAge, httpOnly: true });
            return res.status(200).json({ auth, message: 'Usuário autenticado com sucesso!'});
        }

        // if(auth){          
        //     res.cookie('session_id', token, { maxAge: 8460000, httpOnly: true });
        //     return res.status(200).json({ auth, message: 'Usuário autenticado com sucesso!'});
        // }

        return res.status(400).json({ error: 'Usuário e/ou senha inválidos'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Falha ao autenticar usuário, erro no servidor'});
    }
};

const getUserId = async (req, res) => {
    try {
        return res.status(200).json({ success:true, message:"Usuário autenticado", user: req.user});
    } catch (error) {
        return res.status(500)
.json({ error: "Erro interno no servidor"})        
    }
}

const logout = (req, res) => {
    try {
        // Deleta o cookie 'session_id'
        res.clearCookie('session_id', { path: '/' });
        return res.status(200).json({ success: true, message: 'Logout realizado com sucesso' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Falha ao realizar logout, erro no servidor' });
    }
};




module.exports = {
    authenticate,
    getUserId,
    logout
}