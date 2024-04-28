const express = require('express');
const router = express.Router();
const foodAddedController = require('../controllers/foodAddedController');
const permissionVerify = require('../middlewares/permissionVerify');

router.use(permissionVerify);

router.get('/', foodAddedController.getAllFoodsAdded);
router.get('/byUserId/:id', foodAddedController.getFoodsAddedByUserId);
//Com query /dailyConsumedWithDetail?user_id= &date=
router.get('/dailyConsumedWithDetail', foodAddedController.calculateDailyNutritionWithDetails);
router.get('/:id', foodAddedController.getFoodAddedById);



router.post('/', foodAddedController.newFoodAdded);
router.put('/:id', foodAddedController.updateFoodAdded);
router.delete('/:id', foodAddedController.deleteFoodAdded);

module.exports = router;


