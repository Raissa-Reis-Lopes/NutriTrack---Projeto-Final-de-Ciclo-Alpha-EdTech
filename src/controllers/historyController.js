const configHistoryServices = require('./configHistoryServices');

const getWeekData = async(req,res) => {
    try {
    const { user_id, startDate, endDate} = req.body;

    if(!user_id){
        throw new Error("o id do usuário é obrigatório");
    }

    if(!startDate){
        throw new Error('A data é obrigatória');
    }

    if(!endDate){
        throw new Error('A data é obrigatória');
    }

        const weekNutrition = await configHistoryServices.getConfigHistoryForPeriod(user_id, startDate, endDate);
        return res.status(200).json({success: true, message:"Dados nutricionais semanais calculado com sucesso", data: weekNutrition });
    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
  
}

function weekData (req, res) {
    try {
        const dataWeek = getWeekData();
        res.json(dataWeek);
    } catch (error) {
        console.error('Erro ao obter os dados da semana:', error);
        res.status(500).json({ error: 'Erro ao obter os dados da semana' });
    }
};
  
module.exports = { 
  weekData 
};