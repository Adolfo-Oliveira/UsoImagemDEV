'use strict'
const { uuid } = require('uuidv4')

module.exports = {

  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('emailEnviar', [

      {
        id: uuid(),
        de: 'semresposta@pe.senac.br',
        para: 'teste@teste',
        cc: '',
        titulo: 'Confirmação da assinatura',
        conteudo: 'Sua assinatura foi realizada com sucesso.',
        enviado: false,
        dataHoraEnvio: ''
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('emailEnviar', null, {})
  }
}
