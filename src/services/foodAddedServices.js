const foodAddedRepository = require('../repositories/foodAddedRepository');


const getAllFoodsAdded = async() => {
    try {
        const foodsAdded = await foodAddedRepository.getAllFoodsAdded();
        return foodsAdded;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getFoodAddedById = async(id) => {
    try {
        const foodAddedById = await foodAddedRepository.getFoodAddedById(id);
        return foodAddedByID;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


const getFoodsAddedByUserId = async(id)=> {
    try {
        const foodsAdded = await foodAddedRepository.getFoodsAddedByUserId(id);
        return foodsAdded;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const newFoodAdded = async(user_id, food_id, food_quantity, meal)=> {
    try {
        const result = await foodAddedRepository.insertFoodAdded(user_id, food_id, food_quantity, meal);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateFoodAdded = async(id, user_id, food_id, food_quantity, meal) => {
    try {
        const result = await foodAddedRepository.updateFoodAdded(id, user_id, food_id, food_quantity, meal);
        return result;
    } catch (error) {
        console.log(error);
        throw error;   
    }
}


const deleteFoodAdded = async(id) => {
    try {
        await foodAddedRepository.deleteFoodAdded(id);
        return { success: true }
    } catch (error) {
        console.log(error);
        throw error;   
    }
}

module.exports = {
    getAllFoodsAdded,
    getFoodAddedById
    getFoodsAddedByUserId,
    newFoodAdded,
    updateFoodAdded,
    deleteFoodAdded
}

