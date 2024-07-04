"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("qr", {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      caminho: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("qr");
  },
};
