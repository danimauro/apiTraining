const uuid = require('uuid/v4');
'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Organizacions', {
            codigo: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: uuid()
            },
            nombre: {
                type: Sequelize.STRING,
                allowNull: false
            },
            descrip: {
                type: Sequelize.STRING
            },
            imagen: {
                type: Sequelize.STRING,
                allowNull: false
            },
            estado: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Organizacions');
    }
};