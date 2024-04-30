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
        const result = await foodAddedServices.getFoodAddedById(id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar dados do alimento adicionado!'})
    }
}

const getFoodsAddedByUserId =  async(req, res) => {
    console.log("Chegou aqui no foodAddedByUserId")
    const user_id = req.user;
    console.log("User_id no controller do foodAdded By user Id")
    console.log(user_id)
    try {
        const foods = await foodAddedServices.getFoodsAddedByUserId(user_id);
        return res.status(200).json(foods);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar dados dos alimentos adicionados pelo usuário' });
    }
}

const calculateDailyNutritionWithDetails = async(req, res) => {
    try {
        const { date } = req.query;
        const user_id = req.user;
        const result = await foodAddedServices.calculateDailyNutritionWithDetails(user_id, date);
        return res.status(200).json({success: true, data: result})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Erro ao calcular os valores nutricionais consumidos no dia e verificar os detalhes'});
    }
}

const calculatePeriodNutritionSummary = async (req, res) => {
    try {
        const { start_date, end_date } = req.query;
        const user_id = req.user;

        if(!user_id){
            throw new Error('O id do usuário é obrigatório');
        }

        if(!start_date){
            throw new Error('A data inicial é obrigatória');
        }

        if(!end_date){
            throw new Error('A data final é obrigatória');
        }

        const result = await foodAddedServices.calculatePeriodNutritionSummary(user_id, start_date, end_date);
        return res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Erro ao calcular os valores nutricionais consumidos no período' });
    }
}


const newFoodAdded = async(req, res) =>{
    try {
        
        const { food_id, food_quantity, meal, date } = req.body;
        const user_id = req.user;

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

        if(!date){
            throw new Error('A data é obrigatória')
        }

        const foodsAdded = await foodAddedServices.newFoodAdded(user_id, food_id, food_quantity, meal, date);
        return res.status(200).json({ success: true, message:"Alimento adicionado com sucesso na refeição", data: foodsAdded });
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}


const updateFoodAdded = async (req, res) => {
    try {
        const { id } = req.params; // Obtém o ID serial da refeição Adicionada da URL
        const { food_id, date, food_quantity, meal } = req.body;
        const user_id = req.user;

        if (!id) {
            throw new Error('O ID do alimento adicionado é obrigatório');
        }

        if (!user_id) {
            throw new Error('O ID do usuário é obrigatório');
        }

        if (!food_id) {
            throw new Error('O ID do alimento é obrigatório');
        }

        if (!food_quantity) {
            throw new Error('Forneça a quantidade consumida');
        }

        if (!meal) {
            throw new Error('Informe em qual refeição este alimento foi adicionado');
        }

        if (!date) {
            throw new Error('A data é obrigatória');
        }

        const result = await foodAddedServices.updateFoodAdded(user_id, food_id, date, food_quantity, meal, id); // Passa o ID serial como primeiro argumento
        return res.status(200).json({ success: true, message: 'Alimento atualizado com sucesso', data: result });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


const deleteFoodAdded = async(req, res) => {
    const { id } = req.params;
    try {
        await foodAddedServices.deleteFoodAdded(id);
        return res.status(200).json({ success: true, message: 'Registro deletado com sucesso!'})

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


module.exports = {
    getAllFoodsAdded,
    getFoodAddedById,
    getFoodsAddedByUserId,
    calculateDailyNutritionWithDetails,
    calculatePeriodNutritionSummary,
    newFoodAdded,
    updateFoodAdded,
    deleteFoodAdded
}