const { SECRET_KEY } = require("../config");
const jwt = require("jsonwebtoken");


function permissionVerify(req, res, next) {
    //Verifica se tem o session_id na requisição
    const sessionToken = req.cookies.session_id;

    if(!sessionToken){
        return res.status(401).json({ error: "Token JWT ausente" });
    }

    //Verifica e decodifica o token JWT
    jwt.verify(sessionToken, SECRET_KEY, (err, decoded) => {
        if(err){
            return res.status(403).json({ error: 'Token JWT inválido'});
        } else{
            req.user = decoded.user; //Armazena a info do usuário decodificada no objeto req
            next(); 
        }
    })
}

module.exports = permissionVerify;