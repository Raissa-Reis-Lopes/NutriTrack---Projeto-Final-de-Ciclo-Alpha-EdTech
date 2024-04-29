const calculateService = require('./calculateServices');

const calculateDays = async(req,res) => {
    try {
    const { user_id, startDate} = req.body;

    if(!user_id){
        throw new Error("o id do usuário é obrigatório");
    }

    if(!startDate){
        throw new Error('A data é obrigatória');
    }

        const daysNutrition = await calculateService.calculateDailyNutrition(user_id, startDate);
        return res.status(200).json({success: true, message:"Dados nutricionais dos dias da semana calculado com sucesso", data: daysNutrition });
    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
}