"use strict";
const { uuid } = require('uuidv4')
module.exports = {

  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("termo", [

      {
        id: uuid(),
        versao: '1.0',
        data: new Date("2023-10-29"),
        descricao: "termo do contrato",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: uuid(),
        versao: '2.0',
        data: new Date("2024-10-29"),
        descricao: "termo do contrato",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("termo", null, {});
  },
};
