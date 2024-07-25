'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('evento', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true

      },

      titulo: {
        type: Sequelize.STRING,
        allowNull: false
      },

      data: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },

      hora: {
        type: Sequelize.TIME,
        allowNull: true
      },

      descricao: {
        type: Sequelize.STRING,
        allowNull: false
      },

      categoria: {
        type: Sequelize.STRING,
        allowNull: false
      },

      eixo: {
        type: Sequelize.STRING,
        allowNull: false
      },

      fkUsuario: {
        type: Sequelize.UUID,
        allowNull: false
      },

      fkQr: {
        type: Sequelize.UUID,
        allowNull: true
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('evento')
  }
}
