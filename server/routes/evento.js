const express = require('express');
const app = express();

// Importar el modelo Evento
const Evento = require('../models').Evento;
const Categoria = require('../models').Categoria;
const Organizacion = require('../models').Organizacion;
const Invitado = require('../models').Invitado;
const Usuario = require('../models').Usuario;

//middelewares
const { verificaToken, verificaAdmin } = require('../middlewares/autentication');

/*==============
* Traer Eventos
================*/

app.get('/eventos', verificaToken, (req, res) => {

    Evento.findAll({
        include: [Categoria, Organizacion, Invitado],
        attributes: ['nombre', 'descrip', 'imagen', 'fecevento'],
        where: { estado: true }
    }).then(eventoDB => {
        return res.status(200).json({
            ok: true,
            eventoDB
        });
    });

});

/*==============
* Registrar Evento
================*/

app.post('/evento', verificaToken, verificaAdmin, (req, res) => {

    //Se toman los datos por medio del POST
    let body = req.body;

    Evento.create({

        nombre: body.nombre,
        descrip: body.descrip,
        imagen: body.imagen,
        fecevento: body.fecevento,

        orgaId: body.orgaId,
        cateId: body.cateId,
        invitadoId: body.invitadoId,
        estado: true

    }).then(() => {

        res.status(201).json({
            ok: true,
            message: 'Evento guardado correctamente'
        });

    }).catch(err => {
        return res.status(500).json({
            ok: false,
            message: err
        });

    });

});

/*==============
*  Traer eventos relacionados al usuario por el ID del evento
================*/

app.get('/eventosusuario/:idevento', (req, res) => {

    Evento.findAll({
        include: [{
            model: Usuario,
            as: 'Usuarios',
            required: false,
            attributes: ['identidad', 'nombre', 'apellido', 'telcel', 'email'],
            through: { attributes: [] },
            where: { estado: true, tipo: 'estudiante' }
        }],
        attributes: ['nombre', 'descrip', 'imagen', 'fecevento'],
        where: { estado: true, id: req.params.idevento }
    }).then(eventoDB => {

        if (eventoDB.length > 0) {
            return res.status(200).json({
                ok: true,
                eventoDB
            });
        }
        return res.status(200).json({
            ok: false,
            message: 'No se encontro el evento'
        });
    });

});


module.exports = app;