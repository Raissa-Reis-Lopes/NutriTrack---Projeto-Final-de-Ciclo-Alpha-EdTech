const configHistoryRepository = require("../repositories/configHistoryRepository");

const validateHeight = (height) => {
    const heightRegex = /^[0-9]{3}$/;
    if (!heightRegex.test(height.toString())) {
        throw new Error('Altura inválida, insira a altura em centímetros com 3 números inteiros');
    }
};

const validateWeight = (weight) => {
    const weightRegex = /^[0-9]{2,3}([,.][0-9]{1})?$/;
    if (!weightRegex.test(weight.toString())) {
        throw new Error('Peso inválido');
    }
};

const isValidDate = (dateString) => {
    // Verifica se a data está no formato correto (YYYY-MM-DD)
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) {
        return false;
    }

    // Tenta criar um objeto Date a partir da string de data
    const date = new Date(dateString);

    // Verifica se o objeto Date é válido e se a data fornecida corresponde à data no objeto Date
    return date instanceof Date && !isNaN(date);
};


const getAllConfigHistory = async () =>{
    try {
        const configHistory = await configHistoryRepository.getAllConfigHistory();
        return configHistory.rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


const getAllConfigHistoryByUserId = async(user_id) => {
    try {
        const configHistory = await configHistoryRepository.getConfigHistoryByUserId(user_id);
        return configHistory.rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getLatestConfigHistoryByUserId = async(user_id) => {
    try {
        const configHistory = await configHistoryRepository.getLatestConfigHistoryByUserId(user_id);
        return configHistory;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


//Trocando o createConfig por configOrUpdate e testando no postman
// const createConfigHistory = async(user_id, food_plan_id, activity_level, weight, height, birth_date, gender) => {
//     try {
        
//         if(!user_id){
//             throw new Error('Usuário não existe');
//         }

//         if(food_plan_id !== "1" && food_plan_id !== "2" && food_plan_id !== "3"){
//             throw new Error('Plano alimentar inválido, escolha um plano existente (1 para perda de peso; 2 para manter o peso ou 3 para ganho de peso)')
//         }

//         if(gender !== 'M' && gender !== 'F'){
//             throw new Error('Formato inválido para o gênero, opções válidas "M" ou "F" ');
//         }

//         validateHeight(height);

//         validateWeight(weight);

//         isValidDate(birth_date);

//         const validActivityLevels = ['sedentary', 'lightlyActive', 'moderatelyActive', 'veryActive', 'extraActive'];
//         if (!validActivityLevels.includes(activity_level)) {
//             throw new Error('Escolha um nível de atividade válido: "sedentary", "lightlyActive", "moderatelyActive", "veryActive", "extraActive"');
//         }


//         const result = await configHistoryRepository.insertConfigHistory(user_id, food_plan_id, activity_level, weight, height, birth_date, gender);
//         return result;

//     } catch (error) {
//         console.log(error);
//         throw error;
//     }   
// }


const createOrUpdateConfigHistory = async(user_id, food_plan_id, activity_level, weight, height, birth_date, gender) => {
    try {
        if(!user_id){
            throw new Error('Usuário não existe');
        }

        if(food_plan_id !== "1" && food_plan_id !== "2" && food_plan_id !== "3"){
            throw new Error('Plano alimentar inválido, escolha um plano existente (1 para perda de peso; 2 para manter o peso ou 3 para ganho de peso)')
        }

        if(gender !== 'M' && gender !== 'F'){
            throw new Error('Formato inválido para o gênero, opções válidas "M" ou "F" ');
        }

        validateHeight(height);

        validateWeight(weight);

        isValidDate(birth_date);

        const validActivityLevels = ['sedentary', 'lightlyActive', 'moderatelyActive', 'veryActive', 'extraActive'];
        if (!validActivityLevels.includes(activity_level)) {
            throw new Error('Escolha um nível de atividade válido: "sedentary", "lightlyActive", "moderatelyActive", "veryActive", "extraActive"');
        }


        const currentDate = new Date().toISOString().split('T')[0];  // Pega a data atual no formato YYYY-MM-DD
    
        const existingConfig = await configHistoryRepository.getConfigHistoryByUserIdAndDate(user_id, currentDate);
    
        if (existingConfig) {
            // Se existir uma configuração para o usuário na data atual, atualize-a
            const config = await configHistoryRepository.updateConfigHistory(user_id, food_plan_id, activity_level, weight, height, birth_date, gender, currentDate);
            return config;
        } else {
            // Se não existir, crie uma nova configuração
            const config = await configHistoryRepository.insertConfigHistory(user_id, food_plan_id, activity_level, weight, height, birth_date, gender);
            return config;
        }

    } catch (error) {
        console.log(error);
        throw error;
    }

   
};


module.exports = {
    // createConfigHistory,
    getAllConfigHistory,
    getAllConfigHistoryByUserId,
    getLatestConfigHistoryByUserId,
    createOrUpdateConfigHistory
}