const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const permissionVerify = require('../middlewares/permissionVerify');

router.use(permissionVerify);

router.post('/', uploadController.upload.single('avatar'), uploadController.uploadAvatar);
router.delete('/', uploadController.removeAvatar);

module.exports = router;