const foodPlanServices = require('../services/foodPlanServices');


const getAllPlans = async(req, res) => {
    try {
        const plans = await foodPlanServices.getAllPlans();
        return res.status(200).json(plans);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar dados das tabelas alimentares!'});
    }
}

const getPlanById = async(req, res) => {
    const { id } = req.params;
    try {
        const plan = await foodPlanServices.getPlanById(id);
        return res.status(200).json(plan);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar dados dos planos alimentares' });
    }
}

module.exports = {
    getAllPlans,
    getPlanById,
}