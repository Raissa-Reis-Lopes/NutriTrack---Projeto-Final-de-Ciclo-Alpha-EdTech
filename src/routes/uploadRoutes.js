const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const permissionVerify = require('../middlewares/permissionVerify');

router.use(permissionVerify);

router.post('/:user_id', uploadController.upload.single('avatar'), uploadController.uploadAvatar);
router.delete('/:user_id', uploadController.removeAvatar);

module.exports = router;