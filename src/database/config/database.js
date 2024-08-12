require('dotenv').config({ path: process.env.DEVMODE.trim() === 'test' ? '.env.test' : '.env' })

// module.exports = {
//   username: process.env.USER,
//   password: process.env.PWD,
//   database: process.env.DATABASE,
//   host: process.env.SERVER,
//   dialect: process.env.DIALECT
// }

// require('dotenv').config({ path: process.env.DEV_MODE ? '.env.test' : '.env' });

// let config = {
//   username: process.env.USER,
//   password: process.env.PWD,
//   database: process.env.HOST,
//   dialect: process.env.DIALECT,
//   storage: './_tests_/database.sqlite',
//   logging: false,
// };

// if (!process.env.DEV_MODE) {
//   config = { ...config, timezone: '-03:00' };
// }

// require('dotenv').config({ path:'.env.dev'})

module.exports = {
  username: process.env.USER.trim(),
  password: process.env.PWD.trim(),
  database: process.env.DATABASE.trim(),
  host: process.env.HOST.trim(),
  dialect: process.env.DIALECT.trim(),
  timezone: '-03:00'
}
