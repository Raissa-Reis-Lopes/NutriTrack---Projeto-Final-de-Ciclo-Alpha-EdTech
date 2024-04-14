const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const permissionVerify = require('../middlewares/permissionVerify')

//Essa rota vai ficar aqui em cima pq ela não precisa do permissionVerify, fazem parte do cadastro
router.post('/', userController.createUser);
router.get('/:id/dailyCalories', userController.getDailyCaloriesByUserId)

//As outras precisam da validação, então todas usarão o permissionVerify
router.use(permissionVerify);

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;