"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "adm",
      [
        {
          setor: "GTI",
          nome: "Adolfo",
          cargo: "Analista de sistemas",
          telefone: "(99)999999999",
          login: "adolfosantos",
          senha: "123456",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          setor: "GTI",
          nome: "Ana S",
          cargo: "Analista",
          telefone: "(99)888888888",
          login: "anasilva",
          senha: "321654",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("adm", null, {});
  },
};
