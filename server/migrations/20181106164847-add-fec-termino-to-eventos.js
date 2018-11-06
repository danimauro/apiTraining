'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return  Promise.all([
        queryInterface.addColumn('Usueventos', 'fectermino', { type: Sequelize.DATE })
    ]);

  },

  down: (queryInterface, Sequelize) => {

    return Promise.all([
      queryInterface.removeColumn('Usueventos', 'fectermino')
    ]);
  }
};
