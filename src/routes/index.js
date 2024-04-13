const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const loginRoutes = require('./loginRoutes');
const foodPlanRoutes = require('./foodPlanRoutes');
const foodRoutes = require('./foodRoutes');

//Aqui serão criadas as rotas da aplicação

router.use('/users', userRoutes);
router.use('/login', loginRoutes);
router.use('/foodPlan', foodPlanRoutes);
router.use('/food', foodRoutes);

module.exports = router;