const uploadServices = require('../services/uploadServices');

const multer = require('multer');
const path = require('path');

// Configuração do armazenamento e nome do arquivo
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Pasta onde os arquivos serão armazenados
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Nome do arquivo
    }
});

// Função para verificar se o arquivo é uma imagem
function verifyFileType(file, cb) {
    // Verifica a extensão do arquivo
    const imagesType = /jpeg|jpg|png|gif/;
    const validExtension = imagesType.test(path.extname(file.originalname).toLowerCase());
    // Verifica o tipo MIME do arquivo
    const validMIMEType = imagesType.test(file.mimetype);
  
    if (validExtension && validMIMEType) {
        return cb(null, true);
    } else {
        cb('Tipo de arquivo inválido! Por favor forneça uma imagem');
    }
}

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        verifyFileType(file, cb);
    }
});

const uploadAvatar = async (req, res) => {
    try {
        const { user_id } = req.params;
        const avatar = req.file.filename;

        await uploadServices.uploadAvatar(user_id, avatar);
    
        return res.status(200).json({ succes: true, message: 'Imagem enviada com sucesso', avatar });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao realizar upload do avatar', error });
    }
};

module.exports = {
    upload,
    uploadAvatar,
};