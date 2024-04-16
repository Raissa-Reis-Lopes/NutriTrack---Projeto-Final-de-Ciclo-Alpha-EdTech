const express = require('express');
const router = express.Router();
const configHistoryController = require('../controllers/configHistoryController');
const permissionVerify = require('../middlewares/permissionVerify');


//Provavelmente só usaremos essas duas
router.get('/:id', permissionVerify, configHistoryController.getLatestConfigHistoryByUserId)
router.post('/', configHistoryController.createOrUpdateConfigHistory);

module.exports = router;

//Mas, deixei essas duas como extra caso em algum momento futuro precise ver todas as configurações
router.get('/', permissionVerify, configHistoryController.getAllConfigHistory);
router.get('/all/:id', permissionVerify, configHistoryController.getAllConfigHistoryByUserId);

