const uuid = require('uuid/v4');
'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Eventos', {
            id: {
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
                type: Sequelize.STRING
            },
            fecevento: {
                type: Sequelize.DATE,
                allowNull: false
            },
            estado: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            orgaId: {
                type: Sequelize.UUID
            },
            cateId: {
                type: Sequelize.UUID
            },
            invitadoId: {
                type: Sequelize.UUID
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
        return queryInterface.dropTable('Eventos');
    }
};