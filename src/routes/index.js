const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes')
const loginRoutes = require('./loginRoutes');
const foodPlanRoutes = require('./foodPlanRoutes')

//Aqui serão criadas as rotas da aplicação

router.use('/users', userRoutes);
router.use('/login', loginRoutes)
router.use('/foodPlan', foodPlanRoutes)

module.exports = router;