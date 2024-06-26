const foodServices = require('../services/foodServices');

const getFoods = async(req, res) => {
    try {
        const foods = await foodServices.getFoods();
        return res.status(200).json(foods);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar dados dos alimentos!'});
    }
}

const getUserFoods = async(req, res) => {
    const user_id = req.user;
    try {
        const foods = await foodServices.getUserFoods(user_id);

        return res.status(200).json(foods);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar dados dos alimentos!'});
    }
}

const getFoodById = async(req, res) => {
    const { id } = req.params;
    try {
        const food = await foodServices.getFoodById(id);

        if (!food) {
            return res.status(404).json({ error: 'Alimento não encontrado!' })
        }

        return res.status(200).json(food);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar dados dos alimentos!' });
    }
}

const getFoodNameById = async(req, res) => {
    try {
        const { id } = req.params;

        const food = await foodServices.getFoodById(id);

        if (!food) {
            return res.status(404).json({ error: 'Alimento não encontrado!' })
        }

        const foodName = await foodServices.getFoodNameById(id);

        return res.status(200).json(foodName);
        
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar o nome do alimento!' });
    }
}

const createUserFood = async(req, res) => {
    try {
        const { name, calorie, carbohydrate_g, protein_g, lipid_g } = req.body;
        const user_id = req.user;

        if(!user_id){
            throw new Error ('O user_id é obrigatório');
        }

        if(!name){
            throw new Error('O nome é obrigatório');
        }

        if(!calorie){
            throw new Error('Informe as calorias');
        }

        if(!carbohydrate_g){
            throw new Error('A quantidade de carboidratos é obrigatória');
        }

        if(!protein_g){
            throw new Error('A quantidade de protein_gas é obrigatória');
        }

        if(!lipid_g){
            throw new Error('A quantidade de lipídios é obrigatória');
        }

        const food = await foodServices.createUserFood(user_id, name, calorie, carbohydrate_g, protein_g, lipid_g);
        return res.status(200).json({ success: true, message: "Alimento cadastrado com sucesso!", data: food });
    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
}

const updateUserFood = async(req, res) => {
    const { id } = req.params;
    const foodFound = await foodServices.getFoodById(id);
    
    if (!foodFound) {
        return res.status(404).json({ error: 'Alimento não encontrado!' })
    }

    if (!foodFound.user_id) {
        return res.status(405).json({ error: 'Este alimento não pode ser alterado!' })
    }

    const { name, calorie, carbohydrate_g, protein_g, lipid_g } = req.body;
    const user_id = req.user;

    try {
        if(!user_id){
            throw new Error ('O user_id é obrigatório');
        }

        if(!name){
            throw new Error('O nome é obrigatório');
        }

        if(!calorie){
            throw new Error('Informe as calorias');
        }

        if(!carbohydrate_g){
            throw new Error('A quantidade de carboidratos é obrigatória');
        }

        if(!protein_g){
            throw new Error('A quantidade de protein_gas é obrigatória');
        }

        if(!lipid_g){
            throw new Error('A quantidade de lipídios é obrigatória');
        }

        const food = await foodServices.updateUserFood(id, user_id, name, calorie, carbohydrate_g, protein_g, lipid_g);
        return res.status(200).json({ success: true, message: "Alimento atualizado com sucesso!", data: food });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const deleteUserFood = async(req, res) => {
    const { id } = req.params;
    try {
        const food = await foodServices.getFoodById(id);
        
        if (!food) {
            return res.status(404).json({ error: 'Alimento não encontrado!' });
        }
    
        if (!food.user_id) {
            return res.status(405).json({ error: 'Este alimento não pode ser deletado!' });
        }

        await foodServices.deleteUserFood(id);
        return res.status(200).json({ success: true, message: 'Alimento deletado com sucesso!'});

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getFoods,
    getUserFoods,
    getFoodById,
    getFoodNameById,
    createUserFood,
    updateUserFood,
    deleteUserFood,
}