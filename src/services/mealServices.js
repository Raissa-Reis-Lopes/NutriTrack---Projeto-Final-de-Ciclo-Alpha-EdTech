const mealRepository = require('../repositories/mealRepository');

const insertMeal = async(user_id, food_id, food_quantity, period, date) =>{
    try {
        const result = await mealRepository.insertMeal(user_id, food_id, food_quantity, period, date);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getAllMeals = async () => {
    try {
        const meals = await mealRepository.getAllMeals();
        return meals;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getMealById = async(id) => {
    try {
        const meal = await mealRepository.getMealById(id);
        return meal;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


//Pegar pelo id e pelo user_id depois faz um filtro no front com os dados recebidos
const getMealByUserByPeriodByDate = async(user_id,period, date) => {
    try {
        const meal = await mealRepository.getMealByUserByPeriodByDate(user_id,period, date);
        return meal;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


const updateMeal = async(id, user_id, food_id, food_quantity, period, date)=>{
    try {
        const result = await mealRepository.updateMeal(id, user_id, food_id, food_quantity, period, date);
        return result;
    } catch (error) {
        console.log(error);
        throw error;       
    }
}


const deleteMeal = async(id) => {
    try {
        await mealRepository.deleteMeal(id);
        return{ succes:true, message:"Refeição deletada com sucesso"}
    } catch (error) {
        console.log(error);
        throw error; 
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