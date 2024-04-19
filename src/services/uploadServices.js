const uploadRepository = require('../repositories/uploadRepository');

const getActualAvatar = async(user_id) => {
    try {
        const actual_avatar = await uploadRepository.getActualAvatar(user_id);
        return actual_avatar;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const changeAvatar = async(user_id, new_avatar) => {
    try {
        await uploadRepository.changeAvatar(user_id, new_avatar);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    getActualAvatar,
    changeAvatar
}