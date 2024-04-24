const uploadServices = require('../services/uploadServices');

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { error } = require('console');

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

function removeActualAvatar(actual_avatar) {
    const actualAvatarPath = path.join('uploads', actual_avatar);

    // Verifica se o arquivo existe antes de tentar excluí-lo
    fs.access(actualAvatarPath, fs.constants.F_OK, (error) => {
        if (error) {
            console.log('O arquivo não existe ou não é acessível:', error);
            return;
        }
        
        // Exclui o arquivo
        fs.unlink(actualAvatarPath, (unlinkError) => {
            if (unlinkError) {
                console.log('Erro ao excluir o arquivo:', unlinkError);
                return;
            }
            console.log('Arquivo excluído com sucesso.');
        });
    });
}

const uploadAvatar = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Nenhum arquivo enviado' });
        }

        const { user_id } = req.params;
        const new_avatar = req.file.filename;

        // Busca e apaga a imagem atual do avatar
        const actual_avatar = await uploadServices.getActualAvatar(user_id);

        console.log('actual_avatar:', actual_avatar);
        
        if (actual_avatar !== 'default-avatar.png') {
            removeActualAvatar(actual_avatar);
        }
        
        // Insere a nova imagem para o avatar
        await uploadServices.changeAvatar(user_id, new_avatar);
    
        return res.status(200).json({ success: true, message: 'Imagem enviada com sucesso', new_avatar });
    } catch (error) {
        console.error('Erro ao realizar upload do avatar:', error);
        return res.status(500).json({ message: 'Erro ao realizar upload do avatar', error: error.message });
    }
};



const removeAvatar = async (req, res) => {
    try {
        const { user_id } = req.params;
        const default_avatar = 'default-avatar.png';
        
        // Busca a imagem atual do avatar
        const actual_avatar = await uploadServices.getActualAvatar(user_id);

        if (actual_avatar != default_avatar) {
            removeActualAvatar(actual_avatar);
            // Se não for o avatar padrão, apaga a imagem atual e substitui pela padrão
            await uploadServices.changeAvatar(user_id, default_avatar);
        }

        return res.status(200).json({ success: true, message: 'Imagem removida com sucesso', new_avatar: default_avatar });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao remover o avatar atual', error });
    }
}

module.exports = {
    upload,
    uploadAvatar,
    removeAvatar
};