const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const permissionVerify = require('../middlewares/permissionVerify');

router.use(permissionVerify);

router.post('/:user_id', uploadController.upload.single('avatar'), uploadController.uploadAvatar);

module.exports = router;