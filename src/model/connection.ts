const Sequelize = require('sequelize')

require('dotenv').config({ path: process.env.DEVMODE?.trim() === 'test' ? '.env.test' : '.env' })

console.log(process.env.HOST)

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PWD, {
  host: process.env.HOST,
  dialect: process.env.DIALECT,
  logging: false
})

// const sequelize = new Sequelize('SENAC_TaskManagerDEV2', 'sa', 'local', {
//   host: '10.9.8.20',
//   dialect: 'mssql',
//   logging: false
// })

export default sequelize
