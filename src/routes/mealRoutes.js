const express = require('express');
const router = express.Router();
const mealController = require('../controllers/mealController');
const permissionVerify = require('../middlewares/permissionVerify')

router.use(permissionVerify);


router.get('/', mealController.getAllMeals);
router.get('/:id', mealController.getMealById);
router.get('/user_period_date', mealController.getMealByUserByPeriodByDate)
router.post('/', mealController.insertMeal);
router.put('/:id', mealController.updateMeal);
router.delete('/:id', mealController.deleteMeal);

module.exports = router;