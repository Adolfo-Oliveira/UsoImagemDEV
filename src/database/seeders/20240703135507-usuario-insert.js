"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("usuario", [
      {
        nome: 'Adolfo S',
        telefone: '(99)999999999',
        email: 'adolfosantos@pe.senac.br',
        cep: '99999999',
        dataNasc: new Date('1993-10-29'),
        identidade: '9999999',
        cpf: '999.999.999-99',
        aluno: true,       
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Ana S',
        telefone: '(99)888888888',
        email: 'adolfosantos@hotmail.com',
        cep: '88888888',
        dataNasc: new Date(),
        identidade: '8888888',
        cpf: '888.888.888-88',
        aluno: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("usuario", null, {});
  }
};
