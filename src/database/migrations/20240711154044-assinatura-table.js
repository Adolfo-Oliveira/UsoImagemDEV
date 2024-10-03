'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('assinatura', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },

      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },

      dataNasc: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },

      cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          is: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
          notNull: {
            msg: 'O campo CPF não pode ser nulo'
          }
        }
      },

      ddd: {
        type: Sequelize.STRING,
        allowNull: false
      },

      telefone: {
        type: Sequelize.STRING,
        allowNull: false
      },

      fkEvento: {
        type: Sequelize.UUID,
        allowNull: false
      },

      ip: {
        type: Sequelize.STRING,
        allowNull: false
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('assinatura')
  }
}
