const Sequelize = require('sequelize')

require('dotenv').config({ path: process.env.DEVMODE?.trim() === 'test' ? '.env.test' : '.env' })

console.log(process.env.HOST)

const sequelize = new Sequelize('UsoImagem', 'usoimagem', '3DCN6}Xa1NY6', {
  host: '10.9.8.74',
  dialect: 'mssql',
  logging: false,
  timezone: 'America/Recife'
})

// const sequelize = new Sequelize('SENAC_TaskManagerDEV2', 'sa', 'local', {
//   host: '10.9.8.20',
//   dialect: 'mssql',
//   logging: false
// })

export default sequelize
