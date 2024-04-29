const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');

router.get('/week', historyController.weekData);

module.exports = router;