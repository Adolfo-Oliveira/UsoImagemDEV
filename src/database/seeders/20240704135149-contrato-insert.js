'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('contrato', [
      {
        fkUsuario: 2,
        fkEvento: 1,
        fkImagem: 1,
        fkTermo: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fkUsuario: 2,
        fkEvento: 2,
        fkImagem: 2,
        fkTermo: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('contrato', null, {});
  }
};
