'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('imagem', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },

      fkAssinante: {
        type: Sequelize.UUID,
        allowNull: false
      },

      nomeArquivo: {
        type: Sequelize.STRING,
        allowNull: false
      },

      dataUpLoad: {
        type: Sequelize.DATE,
        allowNull: false
      },

      dataValidade: {
        type: Sequelize.DATEONLY,
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
    await queryInterface.dropTable('imagem')
  }
}
