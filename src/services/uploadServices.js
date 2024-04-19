const uploadRepository = require('../repositories/uploadRepository');

const uploadAvatar = async(user_id, avatar) => {
    try {
        await uploadRepository.uploadAvatar(user_id, avatar);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    uploadAvatar
}