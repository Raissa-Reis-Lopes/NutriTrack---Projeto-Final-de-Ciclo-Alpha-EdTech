//Aqui no services é onde fica a lógica de negócio, ele pega os dados recebidos do repository e os dados que serão retornados aqui vão ser usado no Controller

const userRepository = require('../repositories/userRepository');
const { hashPassword } = require('../utils/hashPassword');


const getAllUsers = async () => {
    try {
        const users = await userRepository.getAllUsers();
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



const createUser = async(username , email , password) => {
    try {

        if(password.length < 8 || password.length > 15 ){
            throw new Error("A senha deve conter no mínimo 8 caracteres e no máximo 15!")
        }

        const hashedPassword = await hashPassword(password);

        const result = await userRepository.insertUser(username , email , hashedPassword);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateUser = async(id, username , email , password) => {
    try {

        const verifyPassword = String(password);

        if(verifyPassword.length < 8 || verifyPassword.length > 15 ){
            throw new Error("A senha deve conter no mínimo 8 caracteres e no máximo 15")
        }

        const hashedPassword = await hashPassword(password);
       const result = await userRepository.updateUser(id, username , email , hashedPassword);
       return result;

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