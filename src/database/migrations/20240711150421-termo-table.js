'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('termo', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },

      versao: {
        type: Sequelize.STRING,
        allowNull: false
      },

      data: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },

      descricao: {
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
    await queryInterface.dropTable('termo')
  }
}
