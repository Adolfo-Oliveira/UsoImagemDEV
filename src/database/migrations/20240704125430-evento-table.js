'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('evento', {

      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      titulo: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      data: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },

      descricao: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      categoria: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      eixo: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      fkAdm: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },

      fkQr: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('evento');
  }
};
