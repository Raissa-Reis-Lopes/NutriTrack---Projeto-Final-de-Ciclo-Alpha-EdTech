const userServices = require('../services/userServices');

const getAllUsers = async(req, res) => {
    try {
        const users = await userServices.getAllUsers();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar dados dos usuários!'});
    }
}

const getUserById = async(req, res) => {
    const user_id = req.user;
    try {
        const user = await userServices.getUserById(user_id);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar dados do usuário' });
    }
}

const createUser = async(req, res) => {
    try {
        const { username , email , password } = req.body;

        if(!username){
            throw new Error('O nome é obrigatório');
        }

        if(!email){
            throw new Error('O email é obrigatório');
        }

        if(!password){
            throw new Error('A senha é obrigatório');
        }

        const user = await userServices.createUser(username , email , password);
        return res.status(200).json({ success: true, message: "Usuário cadastrado com sucesso!", data: user });
    } catch (error) {
        if (error.code === '23505' && error.constraint === 'users_email_key') {
            return res.status(500).json({ message: "Email já cadastrado" });
        } else {
            return res.status(500).json({ error: error.message, message:"Falha ao realizar o cadastro do usuário" });
        }
    }
}

const updateUser = async(req, res) => {
    try {
        const user_id = req.user;
        const {username , email , newPassword, currentPassword  } = req.body;

        if(!user_id){
            throw new Error("O id do usuário é obrigatório")
        }

        if(!username){
            throw new Error('O nome é obrigatório');
        }

        if(!email){
            throw new Error('O email é obrigatório');
        }

        if (newPassword && currentPassword) {
            // Validar senha atual
            await userServices.validateCurrentPassword(user_id, currentPassword);
        }

        let result;

        if (newPassword) {
            result = await userServices.updateUser(user_id, username, email, newPassword);
        } else {
            result = await userServices.updateUserWithoutPassword(user_id, username, email);
        }

        return res.status(200).json({ success: true, message: 'Usuário atualizado com sucesso', data: result});
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const deleteUser = async(req, res) => {
    const user_id = req.user;
    try {
        const user = await userServices.getUserById(id);
        
        if(!user){
            throw new Error('Usuário não cadastrado');
        }
        await userServices.deleteUser(user_id);
        return res.status(200).json({ success: true, message: 'Usuário deletado com sucesso!'})

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}