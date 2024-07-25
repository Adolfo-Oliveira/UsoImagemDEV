'use strict'

const { uuid } = require('uuidv4')

module.exports = {

  up: async (queryInterface, Sequelize) => {
    const assinante = await queryInterface.sequelize.query('select * from assinante where nome = \'Adolfo S\'')
    const evento = await queryInterface.sequelize.query('select * from evento where titulo = \'Evento de Tecnologia\'')
    const imagem = await queryInterface.sequelize.query('select * from imagem where nomeArquivo = \'FotoAdolfo\'')
    const termo = await queryInterface.sequelize.query('select * from termo where versao = \'2.0\'')

    await queryInterface.bulkInsert('contrato', [
      {
        id: uuid(),
        fkAssinante: assinante[0][0].id,
        fkEvento: evento[0][0].id,
        fkImagem: imagem[0][0].id,
        fkTermo: termo[0][0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('contrato', null, {})
  }
}
