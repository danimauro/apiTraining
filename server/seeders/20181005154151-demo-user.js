const uuid = require('uuid/v4');

'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        /*
         * Tener en cuenta que al ejecutar este seeder estamos creando el primer usuario de la base de datos
         * el cual tendra los permisos de administrador, con el cual podemos registrar otros usuarios de tipo administrativos
         * tambien se debe ejecutar la la ruta /activaradmin con los parametros solicitados: identidad, email para que pueda activar el usuario
         */

        return queryInterface.bulkInsert('Usuarios', [{
            identidad: '102308977',
            nombre: 'Daniel',
            apellido: 'Gutierrez',
            telfijo: '890987',
            telcel: '8907738',
            edad: '27',
            email: 'dmgutierrez7@misena.edu.co',
            sexo: 'Masculino',
            tipo: 'admin',
            password: '1234',
            fecregistro: new Date(),
            estado: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});


    },

    down: (queryInterface, Sequelize) => {
        //Borrar seeder
        return queryInterface.bulkDelete('Usuarios', null, {});
    }
};