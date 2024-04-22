const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController.js');
const permissionVerify = require('../middlewares/permissionVerify.js')

router.post('/', loginController.authenticate);
// router.get('/getData', permissionVerify, loginController.getUserData); // Nova rota GET

router.post('/logout', loginController.logout);

router.get('/', permissionVerify, loginController.getUserId);


module.exports = router;

//A rota POST ‘/’ não passa por verificação de permissão pois qualquer usuário pode enviar os dados para receber o cookie ‘session_id’.