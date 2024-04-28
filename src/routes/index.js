const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const loginRoutes = require('./loginRoutes');
const foodPlanRoutes = require('./foodPlanRoutes');
const foodRoutes = require('./foodRoutes');
const configHistoryRoutes = require('./configHistoryRoutes');
const calculateRoutes = require('./calculateRoutes');
const foodAddedRoutes = require('./foodAddedRoutes');
const uploadRoutes = require('./uploadRoutes');

//Aqui serão criadas as rotas da aplicação

router.use('/users', userRoutes);            //checked on postman
router.use('/login', loginRoutes);           //checked on postman
router.use('/foodPlan', foodPlanRoutes);     //checked on postman
router.use('/food', foodRoutes);             //checked on postman 
router.use('/config', configHistoryRoutes);  //Need update due to changes in "date"
router.use('/calculate', calculateRoutes);   //Need update due to changes in "date"
router.use('/foodAdded', foodAddedRoutes);   //Need update due to changes in "date"
router.use('/upload', uploadRoutes);


module.exports = router;