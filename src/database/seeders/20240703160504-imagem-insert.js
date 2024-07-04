"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usuarios = await queryInterface.sequelize.query(
      `SELECT id FROM usuario;`
    );

    if (usuarios[0].length === 0) {
      throw new Error('Nenhum usuário encontrado na tabela "usuario".');
    }

    await queryInterface.bulkInsert("imagem", [
      {
        fkUsuario: usuarios[0][0].id,
        nomeArquivo: "FotoAdolfo",
        dataUpLoad: new Date(),
        dataValidade: new Date("2024-10-29"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fkUsuario: usuarios[0][1].id,
        nomeArquivo: "FotoAdolfo",
        dataUpLoad: new Date(),
        dataValidade: new Date("2024-08-10"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("imagem", null, {});
  },
};
