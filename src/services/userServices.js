//Aqui no services é onde fica a lógica de negócio, ele pega os dados recebidos do repository e os dados que serão retornados aqui vão ser usado no Controller

const userRepository = require('../repositories/userRepository');
const { hashPassword } = require('../utils/hashPassword');


const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;

    if (!passwordRegex.test(password)) {
        throw new Error("A senha deve conter no mínimo 8 caracteres e no máximo 15, pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial.");
    }
}

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



const createUser = async(username , email , password, avatar_img) => {
    try {

        validatePassword(password);

        const hashedPassword = await hashPassword(password);

        const result = await userRepository.insertUser(username , email , hashedPassword, avatar_img);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateUser = async(id, username , email , password, avatar_img) => {
    try {

        validatePassword(password);

        const hashedPassword = await hashPassword(password);
       const result = await userRepository.updateUser(id, username , email , hashedPassword, avatar_img);
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