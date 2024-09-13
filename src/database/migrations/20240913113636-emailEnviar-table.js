'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('emailEnviar', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },

      de: {
        type: Sequelize.STRING,
        allowNull: false
      },

      para: {
        type: Sequelize.STRING,
        allowNull: false
      },

      cc: {
        type: Sequelize.STRING,
        allowNull: true
      },

      titulo: {
        type: Sequelize.STRING,
        allowNull: false
      },

      conteudo: {
        type: Sequelize.STRING,
        allowNull: false
      },

      enviado: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },

      dataHoraEnvio: {
        type: Sequelize.DATE,
        allowNull: true
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('emailEnviar')
  }
}
