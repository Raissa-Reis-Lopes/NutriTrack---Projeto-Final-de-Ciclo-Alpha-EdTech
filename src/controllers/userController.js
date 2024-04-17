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
    const { id } = req.params;
    try {
        const user = await userServices.getUserById(id);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar dados do usuário' });
    }
}

//Isso vai estar vinculado ao config_history, depois uso o config no services e retorno aqui
// const getDailyCaloriesByUserId = async (req, res) => {
//     try {
//         const userId = req.params.id; // Supondo que você esteja passando o ID do usuário como parâmetro na URL
        
//         const dailyCalories = await userServices.getDailyCaloriesByUserId(userId);
        
//         res.status(200).json(dailyCalories);
//     } catch (error) {
//         res.status(500).json({ message: 'Error getting daily calories', error: error.message });
//     }
// }

const createUser = async(req, res) => {
    try {
        const { username , email , password, avatar_img } = req.body;  

        

        if(!username){
            throw new Error('O nome é obrigatório');
        }

        if(!email){
            throw new Error('O email é obrigatório');
        }

        if(!password){
            throw new Error('A senha é obrigatório');
        }

        const user = await userServices.createUser(username , email , password, avatar_img);
        return res.status(200).json({ success: true, message: "Usuário cadastrado com sucesso!", data: user });
    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
}

const updateUser = async(req, res) => {
    try {
        const { id } = req.params;
        const {username , email , password, avatar_img  } = req.body;

        if(!id){
            throw new Error("O id do usuário é obrigatório")
        }

        if(!username){
            throw new Error('O nome é obrigatório');
        }

        if(!email){
            throw new Error('O email é obrigatório');
        }

        if(!password){
            throw new Error('A senha é obrigatório');
        }

        const user = await userServices.getUserById(id);
        if(!user){
            throw new Error('O usuário não existe');
        }

        const result = await userServices.updateUser(id, username , email , password, avatar_img);

        return res.status(200).json({ success: true, message: 'Usuário atualizado com sucesso', data: result});
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const deleteUser = async(req, res) => {
    const { id } = req.params;
    try {
        const user = await userServices.getUserById(id);
        
        if(!user){
            throw new Error('Usuário não cadastrado');
        }
        await userServices.deleteUser(id);
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