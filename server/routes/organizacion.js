const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const app = express();

//default options
app.use(fileUpload());

// Importar el modelo Organizacion
const Organizacion = require('../models').Organizacion;

//middelewares
const { verificaToken, verificaAdmin } = require('../middlewares/autentication');


/*==============
* Traer Organizaciones
================*/

app.get('/organizaciones', verificaToken, (req, res) => {

    Organizacion.findAll({
        attributes: ['codigo', 'nombre', 'descrip', 'imagen', 'estado'],
        where: { }
    }).then(organiDB => {
     

        if(organiDB.length > 0){

            //Se configura el path de la imagen agregando el ubicación en el servidor antes de ser enviado al frontEnd
            for (let i = 0; i < organiDB.length; i++) {

                organiDB[i].imagen = `${ process.env.ROUTE_IMG_ORGANIZACIONES }${ organiDB[i].imagen }`

            }

        }        

        //se retorna al frontEnd el arreglo de objetos de tipo Organizacion
        return res.status(200).json({
            ok: true,
            organiDB
        });


        
        
    }).catch(err => {

        return res.status(400).json({
            ok: false,
            message: errors
        });

    });

});

/*==============
* Registrar organización
================*/

app.post('/organizacion', verificaToken, verificaAdmin, (req, res) => {

    //Se toman los datos por medio del POST
    let body = req.body;

    if(!req.files){
        return res.status(400).json({
            ok:false,
            message: 'No se ha enviado la imagen'
        });
    }


    //archivo fisico
    let imagen = req.files.imagen;


    //extraemos del nombre del archivo la extension que tiene
    let nombreCortado = imagen.name.split('.');
    let extension = nombreCortado[nombreCortado.length - 1];
    let nomImagen = nombreCortado[nombreCortado.length - 2];

    //Extensiones permitidas
    let extensionesValidas = ['png','jpg','jpeg'];

    //se valida la extension de la imagen con las permitidas por el sistema
    if(extensionesValidas.indexOf( extension ) < 0)
    {
        return res.status(400).json({
            ok:false,
            message: 'Las extensiones permitidas son' + extensionesValidas.join(', ')
        });
    }

    //Cambiar nombre al archivo
    let nombreImagen = `${ nomImagen }-${ new Date().getMilliseconds() }.${ extension }`;

    imagen.mv(`public/uploads/organizaciones/${nombreImagen}`, (err) => {

        //retorna error si no encuentra donde guarda la imagen
        if(err){
            return res.status(500).json({
                ok:false,
                message: "Error guardar la imagen en el servidor"
            });
        }

        //Aquí a imagen esta cargada

        Organizacion.create({

            nombre: body.nombre.trim(),
            descrip: body.descrip.trim(),
            imagen: nombreImagen.trim(),
            estado: true

        }).then(() => {

            return res.status(201).json({
                ok: true,
                message: 'Organización guardada correctamente'
            });

        }).catch(err => {

            return res.status(500).json({
                ok: false,
                message: "Error en la comunicación con el servidor, NO se registro la organización"
            });

        });

    });


});

/*==============
* Traer una Organización
================*/

app.get('/organizacion/:codigo', verificaToken, (req, res) => {


    Organizacion.findAll({

        attributes: ['codigo', 'nombre', 'descrip', 'imagen', 'estado'],
        where: { codigo: req.params.codigo }

    }).then(organiDB => {
     

        if(organiDB.length > 0){

            //Se configura el path de la imagen agregando el ubicación en el servidor antes de ser enviado al frontEnd
            for (let i = 0; i < organiDB.length; i++) {

                organiDB[i].imagen = `${ process.env.ROUTE_IMG_ORGANIZACIONES }${ organiDB[i].imagen }`

            }

        }        

        //se retorna al frontEnd el arreglo de objetos de tipo Organizacion
        return res.status(200).json({
            ok: true,
            organiDB
        });


        
        
    }).catch(err => {

        return res.status(400).json({
            ok: false,
            message: errors
        });

    });;

});



/*==============
* Actualizar Organización
================*/

app.put('/organizacion/:codigo', verificaToken, verificaAdmin, (req, res) => {

    let body = req.body;


    Organizacion.findOne({

        attributes: { },
        where: { codigo: req.params.codigo }

    }).then(organizacionDB => {

        if(!organizacionDB){

            return res.status(400).json({
                ok: false,
                message: 'Estudiante no encontrado'
            });

        }

        if(!req.files){

            organizacionDB.update({
            
                nombre: body.nombre.trim(),
                descrip: body.descrip.trim()

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
                    message: 'Error al actualizar el estudiante'
                });

            });

        }else{

            let pathImagen =  path.resolve(__dirname, `../../public/uploads/organizaciones/${ organizacionDB.imagen }`);
            if( fs.existsSync(pathImagen) ){
                fs.unlinkSync(pathImagen)
            }

            //archivo fisico
            let imagen = req.files.imagen;

            //extraemos del nombre del archivo la extension que tiene
            let nombreCortado = imagen.name.split('.');
            let extension = nombreCortado[nombreCortado.length - 1];
            let nomImagen = nombreCortado[nombreCortado.length - 2];

            validarEx(extension, res);

            //Cambiar nombre al archivo
            let nombreImagen = `${ nomImagen }-${ new Date().getMilliseconds() }.${ extension }`;

            imagen.mv(`public/uploads/organizaciones/${ nombreImagen }`, (err) => {

                //retorna error si no encuentra donde guarda la imagen
                if(err){
                    return res.status(500).json({
                        ok:false,
                        message: "Error al guardar la imagen en el servidor"
                    });
                }

                //Aquí a imagen esta cargada

                organizacionDB.update({

                    nombre: body.nombre.trim(),
                    descrip: body.descrip.trim(),
                    imagen: nombreImagen,

                }).then(() => {

                    return res.status(200).json({
                        ok: true,
                        message: 'Organización actualizada correctamente'
                    });

                }).catch(err => {

                    return res.status(500).json({
                        ok: false,
                        message: "Error en la comunicación con el servidor, NO se actualizó la organización"
                    });

                });


            });



        }
        

    });

});


function validarEx(extension, res){

    //Extensiones permitidas
    let extensionesValidas = ['png','jpg','jpeg'];

    //se valida la extension de la imagen con las permitidas por el sistema
    if(extensionesValidas.indexOf( extension ) < 0)
    {
        return res.status(400).json({
            ok:false,
            message: 'Las extensiones permitidas son' + extensionesValidas.join(', ')
        });
    }

}




module.exports = app;