const Sequelize = require("sequelize")
const config = require('../config/database');

require("dotenv").config({ path: process.env.DEVMODE?.trim() === "test" ? ".env.test" : ".env" })

const sequelize = new Sequelize(config.database, config.username, config.password, config) 
//     {
//   host: process.env.SERVER,
//   dialect: process.env.DIALECT,
//   logging: false
// }



// const sequelize = new Sequelize("UsoImagemDEV", "adolfosantos", "Dofao0354.", {
//   host: "10.9.8.74",
//   dialect: "mssql",
//   logging: false,
//   dialectOptions: {
//     timezone: 'America/Sao_Paulo'
//   }
// })

// const sequelize = new Sequelize("Tasktest", "sa", "local", {
//   host: "10.9.8.20",
//   dialect: "mssql",
//   logging: false,
//   dialectOptions: {
//     timezone: "America/Sao_Paulo"
//   }
  
// })



export default sequelize