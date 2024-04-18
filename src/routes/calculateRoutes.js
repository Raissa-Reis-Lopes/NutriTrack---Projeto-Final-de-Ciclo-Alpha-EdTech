const express = require('express');
const router = express.Router();
const calculateController = require('../controllers/calculateController');

router.post('/', calculateController.calculateDailyNutrition);

module.exports = router;