const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const permissionVerify = require('../middlewares/permissionVerify')

//Essa rota vai ficar aqui em cima pq ela não precisa do permissionVerify, faz parte do cadastro
router.post('/', userController.createUser);

//As outras precisam da validação, então todas usarão o permissionVerify
router.use(permissionVerify);

router.get('/', userController.getAllUsers);
router.get('/byId', userController.getUserById);
router.put('/', userController.updateUser);
router.delete('/', userController.deleteUser);

module.exports = router;