const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController.js');
const permissionVerify = require('../middlewares/permissionVerify.js');

// router.get('/', permissionVerify, loginController.getLogin);
// router.post('/', loginController.autenticate);

module.exports = router;


// obtém o nome do usuário e seu nome completo com o GET em /nutritrack/login/

//recebe os dados do usuário e, se autenticado, retorna o cookie de sessão
//com o POST em /nutritrack/login
//A rota POST ‘/’ não passa pela verificação de permissão pois qualquer usuário pode enviar os dados para receber o cookie ‘session_id’.