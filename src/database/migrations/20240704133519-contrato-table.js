'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('contrato', {

      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      fkUsuario: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },

      fkEvento: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },

      fkImagem: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },

      fkTermo: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('contrato');
  }
};
