const foodAddedRepository = require('../repositories/foodAddedRepository');
const foodRepository = require('../repositories/foodRepository');

const calculateDailyNutritionWithDetails = async (user_id, date) => {
    try {
    

        const foodsAdded = await foodAddedRepository.getFoodsAddedByUserByDate(user_id, date);
      

        if (!foodsAdded || foodsAdded.length === 0) {
            return {
                totalNutrition: {
                    calories: 0,
                    protein: 0,
                    carbohydrate: 0,
                    lipid: 0
                },
                details: [] 
            };
        }

        let totalNutrition = {
            calories: 0,
            protein: 0,
            carbohydrate: 0,
            lipid: 0
        };

        let foodDetails = [];

        for (const food of foodsAdded) {
            const { id, food_id, food_quantity, meal } = food;

            const foodInfo = await foodRepository.getFoodById(food_id);

            if(!foodInfo){
                throw new Error(`Alimento não encontrado para o food_id ${food_id}`);
            }

            const { calorie, protein_g, carbohydrate_g, lipid_g, name } = foodInfo;


            const nutrition = {
                calorie: (calorie / 100) * food_quantity,
                protein: (protein_g / 100) * food_quantity,
                carbohydrate: (carbohydrate_g / 100) * food_quantity,
                lipid: (lipid_g / 100) * food_quantity
            };

            totalNutrition.calories += nutrition.calorie;
            totalNutrition.protein += nutrition.protein;
            totalNutrition.carbohydrate += nutrition.carbohydrate;
            totalNutrition.lipid += nutrition.lipid;

            const foodDetail = {
                id,
                food_id,
                food_name: name,
                food_quantity,
                user_id,
                meal
            };

            foodDetails.push({ ...nutrition, ...foodDetail });
        }

        return {
            totalNutrition,
            foodDetails
        };

    } catch (error) {
        console.log(error);
        throw new Error('Erro ao calcular os valores nutricionais consumidos no dia e verificar os detalhes');
    }
}

const calculatePeriodNutritionSummary = async (user_id, start_date, end_date) => {
    try {
        const foodsAdded = await foodAddedRepository.getFoodsAddedByUserInPeriod(user_id, start_date, end_date);

        // Objeto para armazenar os totais de nutrientes por dia
        const nutritionSummary = {};

        // Calcular totais de nutrientes para cada dia
        for (const food of foodsAdded) {
            const { created_at, food_id, food_quantity } = food;

            // Verificar se o dia já está no objeto nutritionSummary
            const day = created_at.toISOString().split('T')[0]; // Obtém a data no formato 'YYYY-MM-DD'

            if (!nutritionSummary[day]) {
                nutritionSummary[day] = {
                    totalNutrition: {
                        calories: 0,
                        protein: 0,
                        carbohydrate: 0,
                        lipid: 0
                    }
                };
            }

            // Buscar detalhes do alimento pelo food_id
            const foodInfo = await foodRepository.getFoodById(food_id);

            if (!foodInfo) {
                throw new Error(`Alimento não encontrado para o food_id ${food_id}`);
            }

            const { calorie, protein_g, carbohydrate_g, lipid_g } = foodInfo;

            // Calcular nutrientes para este alimento e adicioná-los aos totais do dia
            nutritionSummary[day].totalNutrition.calories += (calorie / 100) * food_quantity;
            nutritionSummary[day].totalNutrition.protein += (protein_g / 100) * food_quantity;
            nutritionSummary[day].totalNutrition.carbohydrate += (carbohydrate_g / 100) * food_quantity;
            nutritionSummary[day].totalNutrition.lipid += (lipid_g / 100) * food_quantity;
        }

        // Converter as chaves do objeto para strings no formato 'Dom', 'Seg', etc.
        const formattedNutritionSummary = {};
        Object.keys(nutritionSummary).forEach(date => {
            const dayOfWeekIndex = new Date(date).getDay(); // Índice do dia da semana (0 = domingo, 1 = segunda, ..., 6 = sábado)
            const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
            const dayOfWeek = daysOfWeek[dayOfWeekIndex];
            formattedNutritionSummary[dayOfWeek] = nutritionSummary[date];
        });

        return formattedNutritionSummary;
    } catch (error) {
        console.log(error);
        throw new Error('Erro ao calcular os valores nutricionais consumidos no período');
    }
}



const getAllFoodsAdded = async() => {
    try {
        const foodsAdded = await foodAddedRepository.getAllFoodsAdded();
        return foodsAdded;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getFoodAddedById = async(id) => {
    try {
        const foodAddedById = await foodAddedRepository.getFoodAddedById(id);
        return foodAddedById;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


const getFoodsAddedByUserId = async(user_id)=> {
    try {
        const foodsAdded = await foodAddedRepository.getFoodsAddedByUserId(user_id);
        return foodsAdded;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const newFoodAdded = async(user_id, food_id, food_quantity, meal, date)=> {
    try {
        if(!user_id){
            throw new Error('Usuário não existe');
        }
        
        const result = await foodAddedRepository.insertFoodAdded(user_id, food_id, food_quantity, meal, date);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateFoodAdded = async(user_id, food_id, date, food_quantity, meal,id) => {
    try {
        const result = await foodAddedRepository.updateFoodAdded(user_id, food_id, date, food_quantity, meal,id );
        return result;
    } catch (error) {
        console.log(error);
        throw error;   
    }
}


const deleteFoodAdded = async(id) => {
    try {
        await foodAddedRepository.deleteFoodAdded(id);
        return { success: true }
    } catch (error) {
        console.log(error);
        throw error;   
    }
}

module.exports = {
    getAllFoodsAdded,
    getFoodAddedById,
    getFoodsAddedByUserId,
    calculateDailyNutritionWithDetails,
    calculatePeriodNutritionSummary,
    newFoodAdded,
    updateFoodAdded,
    deleteFoodAdded
}

