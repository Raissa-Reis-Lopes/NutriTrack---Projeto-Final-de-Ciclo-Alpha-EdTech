const express = require('express');
const router = express.Router();
const calculateController = require('../controllers/calculateController');
const permissionVerify = require('../middlewares/permissionVerify');


//Com query passando a data
router.get('/', permissionVerify, calculateController.calculateDailyNutrition);

module.exports = router;