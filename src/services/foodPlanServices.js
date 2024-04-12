//Aqui no services é onde fica a lógica de negócio, ele pega os dados recebidos do repository e os dados que serão retornados aqui vão ser usado no Controller

const foodPlanRepository = require('../repositories/foodPlanRepository');

const getAllPlans = async () => {
    try {
        const plans = await foodPlanRepository.getAllPlans();
        return plans;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getPlanById = async(id) =>{
    try {
        const plan = await foodPlanRepository.getPlanById(id);
        return plan;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    getAllPlans,
    getPlanById
}