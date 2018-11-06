const express = require('express');
const app = express();

// Importar el modelo usuarios
const Categoria = require('../models').Categoria;

//middelewares
const { verificaToken, verificaAdmin } = require('../middlewares/autentication');

/*==============
* Traer Categorias
================*/

app.get('/categorias', verificaToken, (req, res) => {

    Categoria.findAll({

        where: { estado: true }
    }).then(categoriaDB => {
        return res.status(200).json({
            ok: true,
            categoriaDB
        });
    });

});

/*==============
* Registrar Categoria
================*/

app.post('/categoria', verificaToken, verificaAdmin, (req, res) => {

    //Se toman los datos por medio del POST
    let body = req.body;

    Categoria.create({

        nombre: body.nombre,
        descrip: body.descrip,
        estado: true

    }).then(() => {

        res.status(201).json({
            ok: true,
            message: 'Categoria guardada correctamente'
        });

    }).catch(err => {
        return res.status(500).json({
            ok: false,
            message: err.errors
        });

    });

});

module.exports = app;