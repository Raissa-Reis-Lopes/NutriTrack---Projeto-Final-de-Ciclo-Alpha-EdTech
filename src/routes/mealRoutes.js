const express = require('express');
const router = express.Router();
const mealController = require('../controllers/mealController');
const permissionVerify = require('../middlewares/permissionVerify')

router.use(permissionVerify);

router.get('/', mealController.getAllMeals);
router.get('/:id', mealController.getMealById);
router.get('/', mealController.getMealByUserByPeriodByDate)  //com query:
// ex: /meal/userPeriodDate?user_id=e26d00d2-bd3d-4f7a-aa2b-925983fe1dd8&period=almoço&date=2024-04-14T00:00:00.000Z
router.post('/', mealController.insertMeal);
router.put('/:id', mealController.updateMeal);
router.delete('/:id', mealController.deleteMeal);

module.exports = router;