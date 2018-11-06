const express = require('express');
const app = express();

// Importar el modelo usuarios
const Invitado = require('../models').Invitado;

//middelewares
const { verificaToken, verificaAdmin } = require('../middlewares/autentication');

/*==============
* Traer invitados
================*/

app.get('/invitados', verificaToken, (req, res) => {

    Invitado.findAll({
        attributes: ['nombre', 'apellido', 'perfil', 'imagen', 'estado'],
        where: { estado: true }
    }).then(usuarioDB => {
        return res.status(400).json({
            ok: true,
            usuarioDB
        });
    });

});

/*==============
* Registrar in invitado
================*/

app.post('/invitado', verificaToken, verificaAdmin, (req, res) => {

    //Se toman los datos por medio del POST
    let body = req.body;

    Invitado.create({

        nombre: body.nombre,
        apellido: body.apellido,
        perfil: body.perfil,
        telcel: body.telcel,
        imagen: body.imagen,
        estado: true

    }).then(() => {

        return res.status(400).json({
            ok: true,
            message: 'Invitado guardado correctamente'
        });

    }).catch(err => {
        return res.status(200).json({
            ok: false,
            message: err.errors
        });

    });

});

module.exports = app;