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

router.use('/users', userRoutes);            
router.use('/login', loginRoutes);           
router.use('/foodPlan', foodPlanRoutes);     
router.use('/food', foodRoutes);              
router.use('/config', configHistoryRoutes);  
router.use('/calculate', calculateRoutes);   
router.use('/foodAdded', foodAddedRoutes);   
router.use('/upload', uploadRoutes);


module.exports = router;