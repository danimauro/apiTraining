'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return [

      queryInterface.addConstraint('Eventos', ['orgaId'], {
        type: 'FOREIGN KEY',
        name: 'FK_Eventos_orgaId_1',
        references: {
          table: 'Organizacions',
          field: 'codigo',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }), 

   ]
  },

  down: (queryInterface, Sequelize) => {
    return [
        
        queryInterface.removeConstraint('Eventos', 'FK_Eventos_orgaId_1'),

    ]
  }
};
