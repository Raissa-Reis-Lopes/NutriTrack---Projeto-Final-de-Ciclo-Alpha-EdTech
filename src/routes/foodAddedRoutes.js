const express = require('express');
const router = express.Router();
const foodAddedController = require('../controllers/foodAddedController');
const permissionVerify = require('../middlewares/permissionVerify');


// getAllFoodsAdded,
// getFoodAddedById,
// getFoodsAddedByUserId,
// newFoodAdded,
// updateFoodAdded,
// deleteFoodAdded

router.get('/', foodAddedController.getAllFoodsAdded);
router.get('/:id', foodAddedController.getFoodAddedById);
router.get('/byUserId', foodAddedController.getFoodsAddedByUserId);
router.post('/', foodAddedController.newFoodAdded);
router.put('/:id' foodAddedController.updateFoodAdded);
router.delete('/:id' foodAddedController.deleteFoodAdded);



module.exports = router;
