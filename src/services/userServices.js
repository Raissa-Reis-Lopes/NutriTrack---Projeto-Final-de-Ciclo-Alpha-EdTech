//Aqui no services é onde fica a lógica de negócio, ele pega os dados recebidos do repository e os dados que serão retornados aqui vão ser usado no Controller

const userRepository = require('../repositories/userRepository');
const { hashPassword } = require('../utils/hashPassword');


const getAllUsers = async () => {
    try {
        const users = await userRepository.getAllUsers;
        return users;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getUserById = async(id) =>{
    try {
        const user = await userRepository.getUserById(id);
        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const createUser = async(food_plan_id, activity_level, username , email , password , weight , height , birth_date , gender) => {
    try {
        const hashedPassword = await hashPassword(password);
        const result = await userRepository.insertUser(food_plan_id, activity_level, username , email , hashedPassword, weight , height , birth_date , gender)
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateUser = async(id, food_plan_id, activity_level, username , email , password , weight , height , birth_date , gender) => {
    try {
        const hashedPassword = await hashPassword(password);
        await userRepository.updateUser(id, food_plan_id, activity_level, username , email , hashedPassword , weight , height , birth_date , gender)
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const deleteUser = async(id) => {
    try {
        await userRepository.deleteUser(id);
        return { success: true }
    } catch (error) {
        console.log(error);
        throw error;   
    }
}


module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}