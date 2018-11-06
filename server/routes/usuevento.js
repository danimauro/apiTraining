const express = require('express');
const app = express();

// Importar el modelo Evento
const Usuevento = require('../models').Usuevento;

const Evento = require('../models').Evento;
const Usuario = require('../models').Usuario;

//middelewares
const { verificaToken, verificaAdmin } = require('../middlewares/autentication');

/*==============
* Registrar un usuario a un evento
================*/

app.post('/usuevento', verificaToken, verificaAdmin, (req, res) => {

    //Se toman los datos por medio del POST
    let body = req.body;

    Usuevento.create({

        usuarioId: body.usuarioId,
        eventoId: body.eventoId,
        fecinscrip: body.fecinscrip,
        fecevento: body.fecevento,
        estado: true

    }).then(() => {

        res.status(201).json({
            ok: true,
            message: 'Estudiante asignado al evento'
        });

    }).catch(err => {
        return res.status(500).json({
            ok: false,
            message: err
        });

    });

});


app.get('/verificarestadoporusuario/:usuarioId', (req, res) => {

    Usuevento.findAll({
        include: [Usuario],
        attributes: ['fecinscrip', 'estado'],
        where: { usuarioId: req.params.usuarioId }
    }).then(estado => {

        if (estado) {
            return res.status(200).json({
                ok: true,
                estado
            });
        }
        return res.status(400).json({
            ok: false,
            message: 'No se encontro el usuario'
        });

    });
});
module.exports = app;