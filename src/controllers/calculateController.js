const calculateServices = require('../services/calculateServices')


const calculateDailyNutrition = async(req,res) => {
    try {
        const {date} = req.query;
        const user_id = req.user;

        if(!user_id){
            throw new Error("o id do usuário é obrigatório");
        }

        if(!date){
            throw new Error('A data é obrigatória');
        }

        const dailyNutrition = await calculateServices.calculateDailyNutrition(user_id, date);
        return res.status(200).json({success: true, message:"Dados nutricionais diários calculado com sucesso", data: dailyNutrition });
    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
};



module.exports = {
    calculateDailyNutrition
}

