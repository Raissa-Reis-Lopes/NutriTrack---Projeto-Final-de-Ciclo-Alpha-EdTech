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

const createUser = async(req, res) => {
    try {
        const { food_plan_id, activity_level, username , email , password , weight , height , birth_date , gender } = req.body;

        if(!food_plan_id){
            throw new Error ('Escolha o plano alimentar');
        }

        if(!activity_level){
            throw new Error ('Escolha o nível de atividade');
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

        if(!weight){
            throw new Error('O peso é obrigatório');
        }

        if(!height){
            throw new Error('A altura é obrigatória');
        }

        if(!birth_date){
            throw new Error('A data de nascimento é obrigatória');
        }

        if(!gender){
            throw new Error('O sexo biológico é obrigatório');
        }

        const user = await userServices.createUser(food_plan_id, activity_level, username , email , password , weight , height , birth_date , gender);
        return res.status(200).json({ success: true, message: "Usuário cadastrado com sucesso!", data: user });
    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
}

const updateUser = async(req, res) => {
    const { id } = req.params;
    const { food_plan_id, activity_level, username , email , password , weight , height , birth_date , gender } = req.body;

    try {
        
        if(!food_plan_id){
            throw new Error ('Escolha o plano alimentar');
        }

        if(!activity_level){
            throw new Error ('Escolha o nível de atividade');
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

        if(!weight){
            throw new Error('O peso é obrigatório');
        }

        if(!height){
            throw new Error('A altura é obrigatória');
        }

        if(!birth_date){
            throw new Error('A data de nascimento é obrigatória');
        }

        if(!gender){
            throw new Error('O sexo biológico é obrigatório');
        }

        const user = await userServices.getUserById(id);
        if(!user){
            throw new Error('O usuário não existe');
        }

        const result = await userServices.updateUser(id, food_plan_id, activity_level, username , email , password , weight , height , birth_date , gender);
        return res.status(200).json({ success: true, message: 'Usuário atualizado com sucesso'});
        
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