'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [adm] = await queryInterface.sequelize.query(`SELECT id FROM adm;`);
    const [qr] = await queryInterface.sequelize.query(`SELECT id FROM qr;`);

    await queryInterface.bulkInsert('evento', [
      {
        titulo: 'Evento de Tecnologia',
        data: new Date('2024-08-01'),
        descricao: 'Evento sobre as últimas tendências em tecnologia.',
        categoria: 'Tecnologia',
        eixo: 'Inovação',
        fkAdm: adm[0].id,
        fkQr: qr[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        titulo: 'Workshop de Desenvolvimento Web',
        data: new Date('2024-09-15'),
        descricao: 'Workshop prático sobre desenvolvimento web com JavaScript.',
        categoria: 'Educação',
        eixo: 'Desenvolvimento',
        fkAdm: adm[1].id,
        fkQr: qr[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('evento', null, {});
  }
};
