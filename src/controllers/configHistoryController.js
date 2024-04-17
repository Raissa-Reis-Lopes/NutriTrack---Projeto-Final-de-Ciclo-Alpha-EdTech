const configHistoryServices = require("../services/configHistoryServices");

const getLatestConfigHistoryByUserId = async(req, res) => {
    const { id } = req.params;
    try {
        const config = await configHistoryServices.getLatestConfigHistoryByUserId(id);
        if (!config) {
            return res.status(404).json({ error: 'Configuração mais recente não encontrada' });
        }
        return res.status(200).json(config);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar a configuração mais recente' });
    }
};

const createOrUpdateConfigHistory = async(req,res) => {
    try {
        const { user_id, food_plan_id, activity_level, weight, height, birth_date, gender} = req.body;

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

        const config = await configHistoryServices.createOrUpdateConfigHistory(user_id, food_plan_id, activity_level, weight, height, birth_date, gender);
        return res.status(200).json({ success: true, message: "Configuração salva com sucesso!", data: config });
    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
}

module.exports = {
    createOrUpdateConfigHistory,
    getLatestConfigHistoryByUserId
}