const foodRepository = require('../repositories/foodRepository');

const getFoods = async () => {
    try {
        const foods = await foodRepository.getFoods();
        return foods;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getAllFoods = async () => {
    try {
        const foods = await foodRepository.getAllFoods();
        return foods;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getUserFoods = async (user_id) => {
    try {
        const foods = await foodRepository.getUserFoods(user_id);
        return foods;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getFoodById = async(id) =>{
    try {
        const food = await foodRepository.getFoodById(id);
        return food;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const createUserFood = async(user_id, name, calorie, carbohydrate, protein, lipid) => {
    try {
        const result = await foodRepository.createUserFood(user_id, name, calorie, carbohydrate, protein, lipid)
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateUserFood = async(id, user_id, name, calorie, carbohydrate, protein, lipid) => {
    try {
        const result = await foodRepository.updateUserFood(id, user_id, name, calorie, carbohydrate, protein, lipid)
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const deleteUserFood = async(id) => {
    try {
        await foodRepository.deleteUserFood(id);
    } catch (error) {
        console.log(error);
        throw error;   
    }
}

module.exports = {
    getFoods,
    getAllFoods,
    getUserFoods,
    getFoodById,
    createUserFood,
    updateUserFood,
    deleteUserFood,
}