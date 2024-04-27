const foodAddedRepository = require('../repositories/foodAddedRepository');
const foodRepository = require('../repositories/foodRepository');

//Para testar das duas formas, o de cima só retorna os nutrientes consumidos, esse aqui retorna tanto os valores totais consumidos, quanto os detalhes de cada alimento que compõe esse total
const calculateDailyNutritionWithDetails = async (user_id, date) => {
    try {
    
        // Buscar todos os alimentos adicionados pelo usuário na data especificada
        const foodsAdded = await foodAddedRepository.getFoodsAddedByUserByDate(user_id, date);
        console.log(foodsAdded)

        if (!foodsAdded || foodsAdded.length === 0) {
            return {
                totalNutrition: {
                    calories: 0,
                    protein: 0,
                    carbohydrate: 0,
                    lipid: 0
                },
                details: [] // Aqui você pode retornar os detalhes como um array vazio ou null, dependendo da sua implementação
            };
        }

        let totalNutrition = {
            calories: 0,
            protein: 0,
            carbohydrate: 0,
            lipid: 0
        };

        let foodDetails = [];

        // Calcular o total de nutrientes para o dia e coletar detalhes dos alimentos
        for (const food of foodsAdded) {
            const { id, food_id, food_quantity, meal } = food;

            // Buscar detalhes do alimento pelo food_id
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


const getFoodsAddedByUserId = async(id)=> {
    try {
        const foodsAdded = await foodAddedRepository.getFoodsAddedByUserId(id);
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
    newFoodAdded,
    updateFoodAdded,
    deleteFoodAdded
}

