const express = require('express');
const router = express.Router();
const foodAddedController = require('../controllers/foodAddedController');
const permissionVerify = require('../middlewares/permissionVerify');

router.use(permissionVerify);

router.get('/', foodAddedController.getAllFoodsAdded);
router.get('/byUserId', foodAddedController.getFoodsAddedByUserId);
//Com query /dailyConsumedWithDetail?date=
router.get('/dailyConsumedWithDetail', foodAddedController.calculateDailyNutritionWithDetails);
//Com query /totalNutritionInPeriod?start_date= &end_date=
router.get('/periodNutrition', foodAddedController.calculatePeriodNutritionSummary)
//Pelo id da refeição Adicionada e não do usuário
router.get('/byId/:id', foodAddedController.getFoodAddedById);



router.post('/', foodAddedController.newFoodAdded);
router.put('/:id', foodAddedController.updateFoodAdded);
router.delete('/:id', foodAddedController.deleteFoodAdded);

module.exports = router;


