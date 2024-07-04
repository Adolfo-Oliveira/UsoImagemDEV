"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("usuario", {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },

      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      telefone: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      cep: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      dataNasc: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },      

      identidade: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          is: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
          notNull: {
            msg: "O campo CPF não pode ser nulo",
          },
        },
      },

      aluno: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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
    await queryInterface.dropTable("usuario");
  },
};
