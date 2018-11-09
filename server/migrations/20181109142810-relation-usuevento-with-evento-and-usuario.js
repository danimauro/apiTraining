'use strict';
 
module.exports = {
  up: (queryInterface, Sequelize) => {
   return [

    queryInterface.addConstraint('Usueventos', ['usuarioId'], {
      type: 'FOREIGN KEY',
      name: 'FK_Usueventos_usuario_1',
      references: {
        table: 'Usuarios',
        field: 'codigo',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }),
    queryInterface.addConstraint('Usueventos', ['eventoId'], {
      type: 'FOREIGN KEY',
      name: 'FK_Usueventos_evento_1',
      references: {
        table: 'Eventos',
        field: 'codigo',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }),
  ]
  },
 
  down: (queryInterface, Sequelize) => {
   return [
    queryInterface.removeConstraint('Usueventos', 'FK_Usueventos_usuario_1'),
    queryInterface.removeConstraint('Usueventos', 'FK_Usueventos_evento_1'),
  ]
  }
};