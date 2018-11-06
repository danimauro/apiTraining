const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

// Importar el modelo usuarios
const Usuario = require('../models').Usuario;

//middelewares
const { verificaToken, verificaAdmin } = require('../middlewares/autentication');

/*==============
* Traer usuarios
================*/

app.get('/usuarios', verificaToken, verificaAdmin, (req, res) => {

    Usuario.findAll({
        attributes: ['identidad', 'nombre', 'apellido', 'sexo', 'fecregistro'],
        where: { tipo: 'admin', estado: true }
    }).then(usuarioDB => {
        return res.status(400).json({
            ok: true,
            usuarioDB
        });
    });

});

/*==============
* Registrar Usuario admin
================*/

app.post('/usuario', verificaToken, verificaAdmin, (req, res) => {

    //Se toman los datos por medio del POST
    let body = req.body;

    Usuario.create({

        identidad: body.identidad,
        nombre: body.nombre,
        apellido: body.apellido,
        telfijo: body.telfijo,
        telcel: body.telcel,
        edad: body.edad,
        email: body.email,
        sexo: body.sexo,
        tipo: 'admin',
        password: bcrypt.hashSync(body.password, 10),
        fecregistro: new Date(),
        estado: true

    }).then(() => {

        res.status(400).json({
            ok: true,
            message: 'Usuario guardado correctamente'
        });

    }).catch(err => {
        return res.status(400).json({
            ok: false,
            message: err.errors
        });

    });

});

/*===============
* Activar usuAdmin
=================*/

app.put('/activaradmin', (req, res) => {
    //Se toman los datos por medio del POST
    let body = req.body;

    Usuario.findOne({
        attributes: { exclude: ['password'] },
        where: { identidad: body.identidad, email: body.email, tipo: 'admin' }
    }).then(usuarioDB => {


        //se valida que se encuentre un usuario con los datos ingresados por el usuario
        if (!usuarioDB) {
            return res.status(200).json({
                ok: false,
                message: 'No se encontro el usuario con los datos ingresados'
            });
        }

        //se valida que el usuario ya este activado en el sistema
        if (usuarioDB.estado == 1) {
            return res.status(200).json({
                ok: false,
                message: 'El proceso de activacion ya se ejecuto anteriormente, favor comunicarse con el administrador del sistema'
            });
        }
        // actualiza la contraseña y activa el usuario que tendra los permisos de super admin
        usuarioDB.update({
            password: bcrypt.hashSync(body.password, 10),
            estado: 1
        }).then(usuario => {
            if (usuario) {
                return res.status(400).json({
                    ok: true,
                    message: 'Usuario activado correctamente'
                });
            }
        }).chatch(err => {
            return res.status(200).json({
                ok: false,
                message: 'Error al activar el usuario'
            });
        });


    });

});

module.exports = app;