const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Usuario = require('../models').Usuario;


app.post('/login', (req, res) => {

    let body = req.body;

    //se busca por medio del modelo Usuario

    Usuario.findOne({
        attributes: ['id', 'nombre', 'apellido', 'email', 'password', 'estado', 'tipo'],
        where: { email: body.email },
    }).then(usuarioDB => {

        if (!usuarioDB) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: '(Usuario) o contraseña incorrectos'
                }
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Usuario o (contraseña) incorrectos'
                }
            });
        }


        if (usuarioDB.estado == 0) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Usuario en estado: Inactivo'
                }
            });
        }

        usuarioDB.password = null;


        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });


        return res.status(200).json({
            ok: true,
            usuarioDB,
            token
        });

    }).catch(err => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'Error al realizar la consula en la base de datos'
                }
            });
        }
    });


});

module.exports = app;