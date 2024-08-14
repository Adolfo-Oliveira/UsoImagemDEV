'use strict'
const { uuid } = require('uuidv4')
module.exports = {

  up: async (queryInterface, Sequelize) => {
    const evento = await queryInterface.sequelize.query('select * from evento where titulo = \'Propaganda salão de beleza\'')
    await queryInterface.bulkInsert('assinatura', [
      {
        id: uuid(),
        nome: 'teste 2',
        ddd: '81',
        telefone: '999999999',
        email: 'aaaa@pe.senac.br',
        cep: '99999999',
        logradouro: 'Avenida Ulisses Montarroyos',
        numero: '9999',
        bairro: 'Candeias',
        cidade: 'Jaboatão dos Guararapes',
        estado: 'PE',
        dataNasc: new Date('1993-10-29'),
        cpf: '99999999999',
        fkEvento: evento[0][0].id,
        ip: '000.0.000.000',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        nome: 'Teste 2',
        ddd: '81',
        telefone: '888888888',
        email: 'aaaaaaaaa@hotmail.com',
        cep: '88888888',
        logradouro: 'Avenida Ulisses Montarroyos',
        numero: '9999',
        bairro: 'Candeias',
        cidade: 'Jaboatão dos Guararapes',
        estado: 'PE',
        dataNasc: new Date(),
        cpf: '88888888888',
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
