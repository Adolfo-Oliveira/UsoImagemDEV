"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("adm", {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },

      setor: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      cargo: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      telefone: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      login: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      senha: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("adm");
  },
};
