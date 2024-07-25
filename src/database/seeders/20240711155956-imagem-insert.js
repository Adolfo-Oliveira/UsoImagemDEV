'use strict'
const { uuid } = require('uuidv4')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const assinante = await queryInterface.sequelize.query('select * from assinante where nome = \'Adolfo S\'')

    if (assinante[0].length === 0) {
      throw new Error('Nenhum usuário encontrado na tabela "assinante".')
    }

    await queryInterface.bulkInsert('imagem', [
      {
        id: uuid(),
        fkAssinante: assinante[0][0].id,
        nomeArquivo: 'FotoAdolfo',
        dataUpLoad: new Date(),
        dataValidade: new Date('2024-10-29'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        fkAssinante: assinante[0][0].id,
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
