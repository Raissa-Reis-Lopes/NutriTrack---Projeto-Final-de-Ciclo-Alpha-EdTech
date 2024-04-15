const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const loginRoutes = require('./loginRoutes');
const foodPlanRoutes = require('./foodPlanRoutes');
const foodRoutes = require('./foodRoutes');
const mealRoutes = require('./mealRoutes')

//Aqui serão criadas as rotas da aplicação

router.use('/users', userRoutes);          //checked on postman
router.use('/login', loginRoutes);         //checked on postman
router.use('/foodPlan', foodPlanRoutes);  //checked on postman
router.use('/food', foodRoutes);          //checked on postman 
router.use('/meal', mealRoutes);

module.exports = router;