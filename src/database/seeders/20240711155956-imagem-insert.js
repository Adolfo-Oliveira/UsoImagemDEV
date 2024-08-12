'use strict'
const { uuid } = require('uuidv4')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const assinatura = await queryInterface.sequelize.query('select * from assinatura where nome = \'Adolfo S\'')

    if (assinatura[0].length === 0) {
      throw new Error('Nenhum usuário encontrado na tabela "assinatura".')
    }

    await queryInterface.bulkInsert('imagem', [
      {
        id: uuid(),
        fkAssinatura: assinatura[0][0].id,
        nomeArquivo: 'FotoAdolfo',
        dataUpLoad: new Date(),
        dataValidade: new Date('2024-10-29'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        fkAssinatura: assinatura[0][0].id,
        nomeArquivo: 'FotoAdolfo',
        dataUpLoad: new Date(),
        dataValidade: new Date('2024-08-10'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('imagem', null, {})
  }
}
