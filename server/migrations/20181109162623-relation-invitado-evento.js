'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [

      queryInterface.addConstraint('Eventos', ['invitadoId'], {
          type: 'FOREIGN KEY',
          name: 'FK_Eventos_invitadoId_1',
          references: {
            table: 'Invitados',
            field: 'codigo',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
      }),


    ]
  },

  down: (queryInterface, Sequelize) => {
    return [

      queryInterface.removeConstraint('Eventos', 'FK_Eventos_invitadoId_1'),

    ]
    
  }
};
