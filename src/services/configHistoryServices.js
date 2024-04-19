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

const getLatestConfigHistoryByUserId = async(user_id) => {
    try {
        const configHistory = await configHistoryRepository.getLatestConfigHistoryByUserId(user_id);
        return configHistory;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const createOrUpdateConfigHistory = async(user_id, food_plan_id, activity_level, weight, height, birth_date, gender, date) => {
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

        isValidDate(date);

        const validActivityLevels = ['sedentary', 'lightlyActive', 'moderatelyActive', 'veryActive', 'extraActive'];
        if (!validActivityLevels.includes(activity_level)) {
            throw new Error('Escolha um nível de atividade válido: "sedentary", "lightlyActive", "moderatelyActive", "veryActive", "extraActive"');
        }

        const currentDate = new Date().toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).split('/').reverse().join('-');

        const existingConfig = await configHistoryRepository.getConfigHistoryByUserIdAndDate(user_id, currentDate);
    
        if (existingConfig) {
            // Se existir uma configuração para o usuário na data atual, atualize-a
            const config = await configHistoryRepository.updateConfigHistory(user_id, food_plan_id, activity_level, weight, height, birth_date, gender, currentDate);
            return config;
        } else {
            // Se não existir, crie uma nova configuração
            const config = await configHistoryRepository.insertConfigHistory(user_id, food_plan_id, activity_level, weight, height, birth_date, gender, currentDate);
            return config;
        }

    } catch (error) {
        console.log(error);
        throw error;
    }
};


const findConfigByDate = async (userId, targetDate) => {
    try {
        // Obter todas as configurações de um detemrinado usuário
        const configs = await configHistoryRepository.getConfigsByUserId(userId);

        // Percorrer as configurações do mais recente para o mais antigo
        for (let i = 0; i < configs.length; i++) {
            const config = configs[i];

            // Se a data da configuração for menor ou igual à data desejada, retornamos essa configuração
            if (new Date(config.created_at) <= new Date(targetDate)) {
                return config;
            }
        }

        // Se não encontrarmos nenhuma configuração válida, lançamos um erro
        throw new Error('Nenhuma configuração válida encontrada para a data fornecida');
    } catch (error) {
        console.log(error);
        throw error;
    }
};

//Essa função vai pegar a configuração do usuário que estver dentro de um período estipulado (para usarmos no histórico e na busca de dias anteriores na Home);
const getConfigHistoryForPeriod = async (user_id, startDate, endDate) => {
    try {
        const configHistoryForPeriod = {};

        // Convertendo as datas para o formato YYYY-MM-DD
        startDate = new Date(startDate).toISOString().split('T')[0];
        endDate = new Date(endDate).toISOString().split('T')[0];

        // Pegando todas as datas entre startDate e endDate
        const currentDate = new Date(startDate);
        while (currentDate <= new Date(endDate)) {
            const date = currentDate.toISOString().split('T')[0];
            
            // Verificando se existe config_history para a data atual
            const configHistory = await configHistoryRepository.getConfigHistoryByUserIdAndDate(user_id, date);

            if (configHistory) {
                configHistoryForPeriod[date] = configHistory.id;
            } else {
                const lastConfigHistory = await configHistoryRepository.getLatestConfigHistoryBeforeDate(user_id, date);
                if (lastConfigHistory) {
                    configHistoryForPeriod[date] = lastConfigHistory.id;
                } else {
                    configHistoryForPeriod[date] = null;  
                }
            }

            // Avançando para o próximo dia
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return configHistoryForPeriod;
    } catch (error) {
        console.log(error);
        throw error;
    }
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


module.exports = {
    getAllConfigHistory,
    getLatestConfigHistoryByUserId,
    createOrUpdateConfigHistory,
    getConfigHistoryForPeriod,
    findConfigByDate
}