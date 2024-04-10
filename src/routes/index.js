const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes')
const loginRoutes = require('./loginRoutes');

//Aqui serão criadas as rotas da aplicação

router.use('/users', userRoutes);
router.use('/login', loginRoutes)

module.exports = router;