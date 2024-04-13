const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');
const permissionVerify = require('../middlewares/permissionVerify')

router.use(permissionVerify);

// Pega os alimentos fixos do bancos de dados, sem incluir os alimentos do usuário
router.get('/', foodController.getFoods);

// Pega todos os alimentos (talvez seja retirado)
router.get('/all', foodController.getAllFoods);

// Pega os alimentos personalizados do usuário a partir do id do mesmo
router.get('/user/:user_id', foodController.getUserFoods);

// Pega um alimento pelo seu id
router.get('/:id', foodController.getFoodById);

router.post('/', foodController.createUserFood);
router.put('/:id', foodController.updateUserFood);
router.delete('/:id', foodController.deleteUserFood);

module.exports = router;