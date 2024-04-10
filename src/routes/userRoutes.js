const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const permissionVerify = require('../middlewares/permissionVerify')

//Colocando aqui a gente use esse para todas as rotas do user
router.use(permissionVerify);

// router.get('/', userController.getAllUsers);
// router.post("/", userController.createUser);
// router.put('/:id', userController.updateUser);
// router.delete('/:id', userController.deleteUser);

module.exports = router;