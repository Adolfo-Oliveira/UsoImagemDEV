"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("imagem", {
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

      nomeArquivo: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      dataUpLoad: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      dataValidade: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("imagem");
  },
};
