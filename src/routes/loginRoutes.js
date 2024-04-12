const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController.js');

router.post('/', loginController.autenticate);

module.exports = router;

//A rota POST ‘/’ não passa por verificação de permissão pois qualquer usuário pode enviar os dados para receber o cookie ‘session_id’.