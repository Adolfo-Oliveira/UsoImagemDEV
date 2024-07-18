'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usuario = await queryInterface.sequelize.query('select * from usuario where nome = \'Graça Bezerra\'')
    const qr = await queryInterface.sequelize.query('select * from qr where caminho = \'path/to/qr-code1.png\'')

    await queryInterface.bulkInsert('evento', [
      {
        id: uuidv4(),
        titulo: 'Evento de Tecnologia',
        data: new Date('2024-08-01'),
        hora: '19:00:00',
        descricao: 'Evento sobre as últimas tendências em tecnologia.',
        categoria: 'Tecnologia',
        eixo: 'Inovação',
        fkUsuario: usuario[0][0].id,
        fkQr: qr[0][0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        titulo: 'Evento de beleza',
        data: new Date('2025-08-01'),
        hora: '20:00:00',
        descricao: 'Evento sobre as últimas tendências em beleza.',
        categoria: 'beleza',
        eixo: 'Inovação',
        fkUsuario: usuario[0][0].id,
        fkQr: qr[0][0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        titulo: 'Evento de gastronomia',
        data: new Date('2024-05-10'),
        hora: '18:00:00',
        descricao: 'Evento sobre as últimas tendências em gastronomia.',
        categoria: 'gastronomia',
        eixo: 'Inovação',
        fkUsuario: usuario[0][0].id,
        fkQr: qr[0][0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('evento', null, {});
  }
};
