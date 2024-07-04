"use strict";

module.exports = {

  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("termo", [

      {
        versao: '1.0',
        data: new Date("2023-10-29"),
        descricao: "termo do contrato",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
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
