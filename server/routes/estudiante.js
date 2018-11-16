const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

// Importar el modelo usuarios
const Usuario = require('../models').Usuario;
const Evento = require('../models').Evento;
const Usuevento = require('../models').Usuevento;

//middelewares
const { verificaToken, verificaAdmin } = require('../middlewares/autentication');


/*==============
* Traer Estudiante
================*/

app.get('/estudiantes', verificaToken, (req, res) => {

    Usuario.findAll({
        attributes: { exclude: ['password'] },
        where: { tipo: 'estudiante' }
    }).then(estudiantesDB => {
        return res.status(200).json({
            ok: true,
            estudiantesDB
        });
    }).catch(err => {
        return res.status(400).json({
            ok: false,
            message: 'Error al consultar la información'
        });

    });;

});

/*==============
* Registrar Estudiante
================*/

app.post('/estudiante', verificaToken, verificaAdmin, (req, res) => {

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
        tipo: 'estudiante',
        password: bcrypt.hashSync(body.password, 10),
        fecregistro: new Date(),
        estado: true

    }).then(() => {

        res.status(201).json({
            ok: true,
            message: 'Estudiante guardado correctamente'
        });

    }).catch(err => {
        return res.status(400).json({
            ok: false,
            message: err.errors
        });

    });

});

/*==============
* Traer los eventos relacionados a un estudiante por medio del id
* Tener en cuenta que tanto el usuario como el evento deben estar activos en el sistema
================*/

app.get('/estuevento/:id', verificaToken, verificaAdmin, (req, res) => {


    Usuario.findAll({
        include:[{
            model: Evento,
            as: 'eventoUsuario',
            attributes: ['codigo','nombre', 'descrip', 'imagen', 'fecevento'],
            through: { attributes: ['usuarioId','fecinscrip', 'fectermino', 'estado'] },
            where: { },
        }],
        attributes: ['codigo','identidad', 'nombre', 'apellido', 'email', 'telcel', 'telfijo', 'edad', 'sexo', 'fecregistro'],
        where: { estado: true, codigo: req.params.id }
    }).then(eventosEstudianteDB => {

        if (eventosEstudianteDB.length > 0) {

            return res.status(200).json({
                ok: true,
                eventosEstudianteDB
            });
        }

        return res.status(400).json({
            ok: false,
            message: 'No se encontró un estudiante con ese codigo'
        });

    });

});

app.put('/estudiante/:id', verificaToken, verificaAdmin, (req, res) => {

    let body = req.body;

    Usuario.findOne({
        attributes: { exclude: ['password'] },
        where: { codigo: req.params.id, tipo: 'estudiante' }
    }).then(estudianteDB => {

        if(!estudianteDB){

            return res.status(400).json({
                ok: false,
                message: 'Estudiante no encontrado'
            });

        }

        estudianteDB.update({
            nombre: body.nombre,
            apellido: body.apellido,
            telfijo: body.telfijo,
            telcel: body.telcel,
            email: body.email,
            edad: body.edad
        }).then(estudiante => {

            if (estudiante) {
                return res.status(200).json({
                    ok: true,
                    message: 'Estudiante actualizado correctamente'
                });
            }

        }).catch(err => {

            return res.status(400).json({
                ok: false,
                message: err
            });

        });

    });

});

module.exports = app;