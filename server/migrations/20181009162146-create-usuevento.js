const uuid = require('uuid/v4');
'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Usueventos', {
            usuarioId: {
                type: Sequelize.UUID
            },
            eventoId: {
                type: Sequelize.UUID
            },
            fecinscrip: {
                type: Sequelize.DATE,
                allowNull: false
            },
            fectermino: {
                type: Sequelize.DATE
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
        return queryInterface.dropTable('Usueventos');
    }
};