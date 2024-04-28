const configService = require('./configHistoryServices');
const foodPlanService = require('./foodPlanServices'); 

//Função para calcular a quantidade de calorias diárias recomendadas (Essa fórmula de Harris-Benedict foi extraída do Manual MSD para profissionais de Saúde)
const calculateDailyCalories = (gender, weight, height, age, activityLevel) => {
    let MB;

    if (gender === 'M') {
        MB = 66.47 + (13.75 * weight) + (5.003 * height) - (6.775 * age);
    } else if (gender === 'F') {
        MB = 655.01 + (9.563 * weight) + (1.85 * height) - (4.676 * age);
    } else {
        throw new Error('Gênero inválido');
    }

    let dailyCalories;

    switch (activityLevel) {
        case 'sedentary':
            dailyCalories = MB * 1.2;
            break;
        case 'lightlyActive':
            dailyCalories = MB * 1.375;
            break;
        case 'moderatelyActive':
            dailyCalories = MB * 1.55;
            break;
        case 'veryActive':
            dailyCalories = MB * 1.725;
            break;
        case 'extraActive':
            dailyCalories = MB * 1.9;
            break;
        default:
            throw new Error('Nível de atividade inválido');
    }
    
    return  Math.round(dailyCalories);
};


//Aqui eu faço o cálculo das calorias diárias totais com base no config_history
const calculateDailyCaloriesForConfig = (config) => {
    const { gender, weight, height, birth_date, activity_level } = config;
    
    // Calcula a idade com base na data de nascimento
    const today = new Date();
    const birthDate = new Date(birth_date);
    const age = today.getFullYear() - birthDate.getFullYear();

    const dailyCalories = calculateDailyCalories(gender, weight, height, age, activity_level);

    return dailyCalories;
};


// Função para calcular a distribuição de macros baseado no foodPlan
const calculateMacros = (totalCalories, foodPlan) => {
    let protein, fat, carbohydrates;

    // Extrair valores de protein, carbohydrates e lipid do foodPlan
    const { carbohydrate_percentage: carbohydratesPercentage, protein_percentage: proteinPercentage, lipid_percentage: lipidPercentage } = foodPlan;

    // Verificar se os valores foram extraídos corretamente
    if (!carbohydratesPercentage || !proteinPercentage || !lipidPercentage) {
        throw new Error('Valores de macronutrientes não encontrados');
    }

    // Calcular macros com base nos valores extraídos do foodPlan
    protein = totalCalories * (proteinPercentage / 100);
    fat = totalCalories * (lipidPercentage / 100);
    carbohydrates = totalCalories * (carbohydratesPercentage / 100);

    return {
        protein: Math.round(protein),
        fat: Math.round(fat),
        carbohydrates: Math.round(carbohydrates)
    };
};

//Aqui vai ser a parte personalizada de fato, em que vamos receber o id do usuário e a data que quer calcular, seja hoje ou de um histórico e retorna os totais daquele dia
const calculateDailyNutrition = async (userId, date) => {
    try {
        // Encontra a config_history para a data fornecida
        const config = await configService.findConfigByDate(userId, date);

        console.log(`Essa é a config que está vindo no calculateDailyNutrition em Calculate Services`, config)
        
        if (!config) {
            throw new Error('Configuração não encontrada para a data fornecida');
        }

        // Calcula as calorias totais do dia com base na config_history
        const dailyCalories = calculateDailyCaloriesForConfig(config);

         // Busca o plano alimentar pelo ID usando o foodPlanService
         const foodPlan = await foodPlanService.getPlanById(config.food_plan_id);

         if (!foodPlan) {
             throw new Error('Plano alimentar não encontrado');
         }
 
         // Calcula a distribuição de macronutrientes com base no foodPlan
         const { protein, carbohydrates, fat } = calculateMacros(dailyCalories, foodPlan);
 
        // Retorna os resultados
        return {
            user_id: userId,
            total_calories: dailyCalories,
            total_protein: protein,
            total_carb: carbohydrates,
            total_fat: fat
        };

    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    calculateDailyNutrition,
}