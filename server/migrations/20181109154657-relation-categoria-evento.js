'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [ 

    queryInterface.addConstraint('Eventos', ['cateId'], {
        type: 'FOREIGN KEY',
        name: 'FK_Eventos_cateId_1',
        references: {
          table: 'Categorias',
          field: 'codigo',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
        

    ]

  },

  down: (queryInterface, Sequelize) => {
    return [
    
        queryInterface.removeConstraint('Eventos', 'FK_Eventos_cateId_1'),

    ]
  }
};
