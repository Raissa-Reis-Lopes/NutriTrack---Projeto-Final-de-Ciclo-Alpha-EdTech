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

        const nutritionSummary = {};

        for (const food of foodsAdded) {
            const { created_at, food_id, food_quantity } = food;

            const year = created_at.getFullYear();
            const month = created_at.getMonth() + 1; 
            const day = created_at.getDate();
            const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

            if (!nutritionSummary[formattedDate]) {
                nutritionSummary[formattedDate] = {
                    formattedDate,
                    totalNutrition: {
                        calories: 0,
                        protein: 0,
                        carbohydrate: 0,
                        lipid: 0
                    }
                };
            }

            const foodInfo = await foodRepository.getFoodById(food_id);

            if (!foodInfo) {
                throw new Error(`Alimento não encontrado para o food_id ${food_id}`);
            }

            const { calorie, protein_g, carbohydrate_g, lipid_g } = foodInfo;

            // Calcular nutrientes para este alimento e adicioná-los aos totais do dia
            nutritionSummary[formattedDate].totalNutrition.calories += (calorie / 100) * food_quantity;
            nutritionSummary[formattedDate].totalNutrition.protein += (protein_g / 100) * food_quantity;
            nutritionSummary[formattedDate].totalNutrition.carbohydrate += (carbohydrate_g / 100) * food_quantity;
            nutritionSummary[formattedDate].totalNutrition.lipid += (lipid_g / 100) * food_quantity;
        }

        console.log(`Esse é o nutritionSummary sem formatar as datas para dom, seg: ${JSON.stringify(nutritionSummary)}`);

        // Converter as chaves do objeto para strings no formato 'Dom', 'Seg', etc.
        const formattedNutritionSummary = {};
        Object.keys(nutritionSummary).forEach(date => {
            const localDateString = new Date(date).toISOString().slice(0, -1);
            const localDate = new Date(localDateString);
            const dayOfWeekIndex = localDate.getDay();
            const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

            const dayOfWeek = daysOfWeek[dayOfWeekIndex];

            formattedNutritionSummary[dayOfWeek] = nutritionSummary[date];
        });

        console.log(`Esse é o nutritionSummary depois de formatar as datas para dom, seg: ${JSON.stringify(formattedNutritionSummary)}`);

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

