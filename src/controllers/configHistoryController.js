const configHistoryServices = require("../services/configHistoryServices")

const getLatestConfigHistoryByUserId = async(req, res) => {
    const user_id = req.user;
    try {
        const config = await configHistoryServices.getLatestConfigHistoryByUserId(user_id);
        if (!config) {
            return res.status(404).json({ error: 'Configuração mais recente não encontrada' });
        }
        return res.status(200).json(config);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar a configuração mais recente' });
    }
};

const getAllConfigHistory = async(req, res) => {
    try {
        const config = await configHistoryServices.getAllConfigHistory();
        if (!config) {
            return res.status(404).json({ error: 'Configurações não localizadas' });
        }
        return res.status(200).json(config);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar todas as configurações dos usuários' });
    }
};

const getAllConfigHistoryByUserId = async(req, res) => {
    const user_id = req.user;
    try {
        const config = await configHistoryServices.getAllConfigHistoryByUserId(user_id);
        if (!config) {
            return res.status(404).json({ error: 'Configurações do usuário não encontradas' });
        }
        return res.status(200).json(config);
    } catch (error) {
        return res.status(500).json({ error: 'Configurações do usuário não encontradas' });
    }
};


const createOrUpdateConfigHistory = async(req,res) => {   
    try {
        const { food_plan_id, activity_level, weight, height, birth_date, gender, date} = req.body;
        const user_id = req.user;

        if(!user_id){
            throw new Error('O id do usuário é obrigatório');
        }

        if(!food_plan_id){
            throw new Error('O id do plano alimentar é obrigatótio');
        }

        if(!activity_level){
            throw new Error("O nível de atividade é obrigatório");
        }

        if(!weight){
            throw new Error("O peso é obrigatório");
        }

        if(!height){
            throw new Error('A altura é obrigatória');
        }

        if(!birth_date){
            throw new Error('A data de nascimento é obrigatória');
        }

        if(!gender){
            throw new Error('O gênero é obrigatório')
        }

        if(!date){
            throw new Error('A data é obrigatória')
        }

        const config = await configHistoryServices.createOrUpdateConfigHistory(user_id, food_plan_id, activity_level, weight, height, birth_date, gender, date);
        return res.status(200).json({ success: true, message: "Configuração salva/atualizada com sucesso!", data: config });
    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
}

module.exports = {
    createOrUpdateConfigHistory,
    getLatestConfigHistoryByUserId,
    getAllConfigHistory,
    getAllConfigHistoryByUserId
}