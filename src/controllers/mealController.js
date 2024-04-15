// insertMeal,
// getAllMeals,
// getMealById,
// getMealByUserByPeriodByDate,
// updateMeal,
// deleteMeal

const mealService = require('../services/mealServices');


const getAllMeals = async(req, res) => {
    try {
        const meals = await mealService.getAllMeals();
        return res.status(200).json(meals);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar dados das refeições!'});
    }
}

const getMealById = async(req, res) => {
    const { id } = req.params;
    try {
        const meal = await mealService.getMealById(id);
        return res.status(200).json(meal);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar dados do usuário' });
    }
}

const getMealByUserByPeriodByDate = async(req, res) => {
    const { user_id, period, date} = req.body;
    try {
        const meal = await mealService.getMealByUserByPeriodByDate(user_id, period, date);
        return res.status(200).json(meal);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar dados do usuário' });
    }
}


const insertMeal = async(req, res) => {
    try {
        const { user_id, food_id, food_quantity, period, date } = req.body;

        if(!user_id){
            throw new Error ('Forneça o id do usuário');
        }

        if(!food_id){
            throw new Error ('Forneça o id do alimento a ser cadastrado');
        }

        if(!food_quantity){
            throw new Error ('Forneça a quantidade consumida');
        }

        if(!period){
            throw new Error ('Especifique em qual refeição o alimento deve se adicionado');
        }

        if(!date){
            throw new Error ('Forneça a data em que a refeição está sendo cadastrada');
        }

        const meal = await mealService.insertMeal(user_id, food_id, food_quantity, period, date);
        return res.status(200).json({ success:true, message:"Refeição cadastrada com sucesso", data: meal });
    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
}

const updateMeal = async(req, res) => {
    const { id } = req.params;
    const { user_id, food_id, food_quantity, period, date } = req.body;

    try {
        if(!user_id){
            throw new Error ('Forneça o id do usuário');
        }

        if(!food_id){
            throw new Error ('Forneça o id do alimento a ser cadastrado');
        }

        if(!food_quantity){
            throw new Error ('Forneça a quantidade consumida');
        }

        if(!period){
            throw new Error ('Especifique em qual refeição o alimento deve se adicionado');
        }

        if(!date){
            throw new Error ('Forneça a data em que a refeição está sendo cadastrada');
        }

        const meal = await mealService.updateMeal(id, user_id, food_id, food_quantity, period, date);
        return res.status(200).json({ success: true, message: 'Refeição atualizada com sucesso', data: meal});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const deleteMeal = async(req, res) => {
    const { id } = req.params;
    try {
        const meal = await mealService.getMealById(id);

        if(!meal){
            throw new Error('Refeição não cadastrada');
        }
        await mealService.deleteMeal(id);
        return res.status(200).json({ success: true, message: 'Refeição deletada com sucesso!'})

    } catch (error) {
        return res.status(500).json({ error: error.message });   
    }
}

module.exports = {
    insertMeal,
    getAllMeals,
    getMealById,
    getMealByUserByPeriodByDate,
    updateMeal,
    deleteMeal
}