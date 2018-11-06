const express = require('express');
const app = express();

// Importar el modelo Organizacion
const Organizacion = require('../models').Organizacion;

//middelewares
const { verificaToken, verificaAdmin } = require('../middlewares/autentication');

/*==============
* Traer Organizaciones
================*/

app.get('/organizaciones', verificaToken, (req, res) => {

    Organizacion.findAll({
        attributes: ['id', 'nombre', 'descrip', 'imagen', 'estado'],
        where: { estado: true }
    }).then(organiDB => {
        return res.status(200).json({
            ok: true,
            organiDB
        });
    });

});

/*==============
* Registrar organización
================*/

app.post('/organizacion', verificaToken, verificaAdmin, (req, res) => {

    //Se toman los datos por medio del POST
    let body = req.body;

    Organizacion.create({

        nombre: body.nombre,
        descrip: body.descrip,
        imagen: body.imagen,
        estado: true

    }).then(() => {

        return res.status(201).json({
            ok: true,
            message: 'Organización guardada correctamente'
        });

    }).catch(err => {

        return res.status(400).json({
            ok: false,
            message: err.errors
        });

    });

});

module.exports = app;