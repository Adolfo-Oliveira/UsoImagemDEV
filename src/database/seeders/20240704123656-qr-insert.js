"use strict";

module.exports = {

  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("qr", [

      {
        caminho: 'path/to/qr-code1.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        caminho: 'path/to/qr-code2.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("qr", null, {});
  },
};
