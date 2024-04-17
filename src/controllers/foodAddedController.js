const foodAddedServices = require("../services/foodAddedServices");

const getAllFoodsAdded = async(req, res) => {
    try {
        const foods = await foodAddedServices.getAllFoodsAdded();
        return res.status(200).json(foods);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar dados dos alimentos adicionados!'});
    }
}

const getFoodAddedById = async(req, res) => {
    const { id } = req.params;
    try {
        const foodAdded = await foodAddedServices.getFoodAddedById(id);
        return res.status(200).json(foodAdded);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar dados do alimento adicionado!'})
    }
}

const getFoodsAddedByUserId =  async(req, res) => {
    const { id } = req.params;
    try {
        const foods = await foodAddedServices.getFoodsAddedByUserId(id);
        return res.status(200).json(foods);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar dados dos alimentos adicionados pelo usuário' });
    }
}


const newFoodAdded = async(req, res) =>{
    try {
        
        const { user_id, food_id, food_quantity, meal } = req.body;

        if(!user_id){
            throw new Error('O id do usuário é obrigatório');
        }

        if(!food_id){
            throw new Error('O id do alimento é obrigatório')
        }

        if(!food_quantity){
            throw new Error('Forneça a quantidade consumida');
        }

        if(!meal){
            throw new Error("Informe em qual refeição este aliemnto foi adicionado")
        }

        const foodsAdded = await foodAddedServices.newFoodAdded(user_id, food_id, food_quantity, meal);
        return res.status(200).json({ success: true, message:"Alimento adicionado com sucesso na refeição", data: foodsAdded };
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}




const updateFoodAdded = async(req, res) => {
    
    try {
        
    const { id } = req.params;
    const { user_id, food_id, food_quantity, meal } = req.body;

    if(!user_id){
        throw new Error('O id do usuário é obrigatório');
    }

    if(!food_id){
        throw new Error('O id do alimento é obrigatório')
    }

    if(!food_quantity){
        throw new Error('Forneça a quantidade consumida');
    }

    if(!meal){
        throw new Error("Informe em qual refeição este aliemnto foi adicionado")
    }

    const result = await foodAddedServices.updateFoodAdded(id, user_id, food_id, food_quantity, meal);
    return res.status(200).json({ success: true, message:'Alimento atualizado com sucesso', data: result});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const deleteFoodAdded = async(req, res) => {
    const { id } = req.params;
    try {
        const foodAdded = await foodAddedServices.getFoodAddedById(id);
        
        if(!foodAdded){
            throw new Error('Registro de alimento adicionado não encontrado');
        }
        await foodAddedServices.deleteFoodAdded(id);
        return res.status(200).json({ success: true, message: 'Registro de alimento adicionado deletado com sucesso!'})

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


module.exports = {
    getAllFoodsAdded,
    getFoodAddedById,
    getFoodsAddedByUserId,
    newFoodAdded,
    updateFoodAdded,
    deleteFoodAdded
}