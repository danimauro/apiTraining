const jwt = require('jsonwebtoken');

// =================
// Verificar token
// =================

let verificaToken = (req, res, next) => {

    //leer headers de peticion
    let token = req.get('token');

    //se verifica el token
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,  
                message: 'Token no válido'
            })
        }

        req.usuario = decoded.usuario;
        next();

    });
}

// =================
// Verificar admin
// =================

let verificaAdmin = (req, res, next) => {

    //leer headers de peticion
    let token = req.get('token');

    //se verifica el token
    jwt.verify(token, process.env.SEED, (err, decoded) => {

        //se valida si el usuario es de tipo administrador "admin"
        if (decoded.usuario.tipo === 'admin') {
            next();
        } else {
            return res.status(401).json({
                ok: false,
                message: 'No tienes permisos para este proceso'
            })
        }

    });

}

module.exports = {
    verificaToken,
    verificaAdmin
}