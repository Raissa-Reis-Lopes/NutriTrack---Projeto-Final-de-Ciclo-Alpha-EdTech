//Aqui no services é onde fica a lógica de negócio, ele pega os dados recebidos do repository e os dados que serão retornados aqui vão ser usado no Controller

const userRepository = require('../repositories/userRepository');
const { hashPassword } = require('../utils/hashPassword');


//Essa parte vai para o config_history
// const calculateDailyCalories = (age, weight, height, gender, activityLevel) => {
//     let bmr; // Basal Metabolic Rate - Taxa metabólica basal

//     // Calculando a taxa metabólica basal (BMR) com base no sexo do usuário
//     //A equação usada é a Equação de Harris-Benedict
//     if (gender === 'M') {
//         bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
//     } else {
//         bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
//     }

//     // Aplicando o fator de atividade para obter as calorias diárias recomendadas
//     let dailyCalories;

//     switch (activityLevel) {
//         case 'sedentary':
//             dailyCalories = bmr * 1.2;
//             break;
//         case 'lightlyActive':
//             dailyCalories = bmr * 1.375;
//             break;
//         case 'moderatelyActive':
//             dailyCalories = bmr * 1.55;
//             break;
//         case 'veryActive':
//             dailyCalories = bmr * 1.725;
//             break;
//         case 'extraActive':
//             dailyCalories = bmr * 1.9;
//             break;
//         default:
//             dailyCalories = bmr;
//     }

//     return Math.round(dailyCalories);
// }

// const getDailyCaloriesByUserId = async (userId) => {
//     try {
//         const user = await userRepository.getUserById(userId);
//         if (!user) {
//             throw new Error('Usuário não encontrado');
//         }

//         // Calculando as calorias diárias recomendadas com base nos dados do usuário
//         const age = new Date().getFullYear() - new Date(user.birth_date).getFullYear();
//         const dailyCalories = calculateDailyCalories(age, user.weight, user.height, user.gender, user.activity_level);

//         return { dailyCalories };
//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// }


//Isso vai para o config_history
        // // Calculando as calorias diárias recomendadas
        // const age = new Date().getFullYear() - new Date(birth_date).getFullYear();
        // const dailyCalories = calculateDailyCalories(age, weight, height, gender, activity_level);
        
        // const result = await userRepository.insertUser(food_plan_id, activity_level, username , email , hashedPassword, weight , height , birth_date , gender);
        
        // // Retorna a dailyCalories junto com o resultado, sem salvar as dailyCalories no banco de dados
        // return { ...result, dailyCalories };


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

        if(password.length < 8 || password.length > 15 ){
            throw new Error("A senha deve conter no mínimo 8 caracteres e no máximo 15!")
        }

        const hashedPassword = await hashPassword(password);

        const result = await userRepository.insertUser(username , email , hashedPassword, avatar_img)
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateUser = async(id, username , email , password, avatar_img) => {
    try {

        const verifyPassword = String(password);

        if(verifyPassword.length < 8 || verifyPassword.length > 15 ){
            throw new Error("A senha deve conter no mínimo 8 caracteres e no máximo 15")
        }

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