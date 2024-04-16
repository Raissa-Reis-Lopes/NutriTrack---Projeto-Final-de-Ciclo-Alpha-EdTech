const express = require('express');
const router = express.Router();
const foodPlanController = require('../controllers/foodPlanController');

//Aqui não tem o permissionVerify, pois ele é usado no cadastro, o usuário ainda não entrou no sistema logado

router.get('/', foodPlanController.getAllPlans);
router.get('/:id', foodPlanController.getPlanById);

module.exports = router;