const calculateServices = require('../services/calculateServices')


const calculateDailyNutrition = async(req,res) => {
    try {
        const { userId, date} = req.body;

        if(!userId){
            throw new Error("o id do usuário é obrigatório");
        }

        if(!date){
            throw new Error('A data é obrigatória');
        }

        const dailyNutrition = await calculateServices.calculateDailyNutrition(userId, date);
        return res.status(200).json({success: true, message:"Dados nutricionais diários calculado com sucesso", data: dailyNutrition });
    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
};



module.exports = {
    calculateDailyNutrition
}

