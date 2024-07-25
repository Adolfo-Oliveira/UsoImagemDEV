'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('contrato', {

      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },

      fkAssinante: {
        type: Sequelize.UUID,
        allowNull: false
      },

      fkEvento: {
        type: Sequelize.UUID,
        allowNull: false
      },

      fkImagem: {
        type: Sequelize.UUID,
        allowNull: false
      },

      fkTermo: {
        type: Sequelize.UUID,
        allowNull: false
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('contrato')
  }
}
