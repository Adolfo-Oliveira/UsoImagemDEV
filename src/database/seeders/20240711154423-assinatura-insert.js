'use strict'
const { uuid } = require('uuidv4')
module.exports = {

  up: async (queryInterface, Sequelize) => {
    const evento = await queryInterface.sequelize.query('select * from evento where titulo = \'Propaganda salão de beleza\'')
    await queryInterface.bulkInsert('assinatura', [
      {
        id: uuid(),
        nome: 'Teste1',
        email: 'aaaa@pe.senac.br',
        dataNasc: new Date('1993-10-29'),
        cpf: '99999999999',
        ddd: '81',
        telefone: '999999999',
        fkEvento: evento[0][0].id,
        ip: '000.0.000.000',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Teste2',
        email: 'aaaaaaaaa@hotmail.com',
        dataNasc: new Date(),
        cpf: '88888888888',
        ddd: '81',
        telefone: '999999999',
        fkEvento: evento[0][0].id,
        ip: '000.0.000.000',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('assinatura', null, {})
  }
}
