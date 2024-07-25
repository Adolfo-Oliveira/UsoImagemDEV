'use strict'
const { uuid } = require('uuidv4')

module.exports = {

  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('qr', [

      {
        id: uuid(),
        caminho: 'path/to/qr-code1.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: uuid(),
        caminho: 'path/to/qr-code2.png',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('qr', null, {})
  }
}
