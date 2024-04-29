//Aqui no services é onde fica a lógica de negócio, ele pega os dados recebidos do repository e os dados que serão retornados aqui vão ser usado no Controller

const userRepository = require('../repositories/userRepository');
const { hashPassword } = require('../utils/hashPassword');
const { comparePassword } = require('../utils/comparePassword');


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
        throw new Error("Falha ao localizar os usuários cadastrados", error);
    }
}

const getUserById = async(id) =>{
    try {
        const user = await userRepository.getUserById(id);
        return user;
    } catch (error) {
        console.log(error);
        throw new Error(`Falha ao buscar os dados do usuário pelo seu id`, error);
    }
}



const createUser = async(username , email , password) => {
    try {

        validatePassword(password);

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

        validatePassword(password);

        const hashedPassword = await hashPassword(password);
       const result = await userRepository.updateUser(id, username , email , hashedPassword);
       return result;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateUserWithoutPassword = async (id, username, email) => {
    try {
        const updatedUser = await userRepository.updateUserWithoutPassword(id, username, email); 
        return updatedUser;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const deleteUser = async(id) => {
    try {
        await userRepository.deleteUser(id);
        return { success: true }
    } catch (error) {
        console.log(error);
        throw error;   
    }
}

const validateCurrentPassword = async(userId, password) => {
    try {
        const user = await userRepository.getUserById(userId);

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            throw new Error('A senha atual fornecida está incorreta');
        }
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
    updateUserWithoutPassword,
    deleteUser,
    validateCurrentPassword,
}