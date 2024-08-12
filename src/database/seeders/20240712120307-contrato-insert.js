'use strict'

const { uuid } = require('uuidv4')

module.exports = {

  up: async (queryInterface, Sequelize) => {
    const assinatura = await queryInterface.sequelize.query('select * from assinatura where nome = \'Adolfo S\'')
    const evento = await queryInterface.sequelize.query('select * from evento where titulo = \'Propaganda na palestra de Tecnologia\'')
    const imagem = await queryInterface.sequelize.query('select * from imagem where nomeArquivo = \'FotoAdolfo\'')
    const termo = await queryInterface.sequelize.query('select * from termo where versao = \'2.0\'')

    // Verifique se os registros existem antes de acessar suas propriedades
    if (assinatura[0].length === 0) {
      throw new Error('Nenhum assinatura encontrado com o nome \'Adolfo S\'')
    }
    if (evento[0].length === 0) {
      throw new Error('Nenhum evento encontrado com o título \'Evento de Tecnologia\'')
    }
    if (imagem[0].length === 0) {
      throw new Error('Nenhuma imagem encontrada com o nomeArquivo \'FotoAdolfo\'')
    }
    if (termo[0].length === 0) {
      throw new Error('Nenhum termo encontrado com a versão \'2.0\'')
    }

    await queryInterface.bulkInsert('contrato', [
      {
        id: uuid(),
        fkAssinatura: assinatura[0][0].id,
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
