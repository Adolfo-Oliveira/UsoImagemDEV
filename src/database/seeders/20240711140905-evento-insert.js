'use strict'

const { v4: uuidv4 } = require('uuid')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usuario = await queryInterface.sequelize.query('select * from usuario where nome = \'Graça Bezerra\'')
    const qr = await queryInterface.sequelize.query('select * from qr where caminho = \'path/to/qr-code1.png\'')

    await queryInterface.bulkInsert('evento', [
      {
        id: uuidv4(),
        titulo: 'Propaganda Salão de Beleza',
        descricao: 'Assinaturas do contrato de direito de imagem para o salão de beleza do SENAC.',
        categoria: 'Beleza',
        eixo: 'Propaganda',
        fkUsuario: usuario[0][0].id,
        fkQr: qr[0][0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('evento', null, {})
  }
}
