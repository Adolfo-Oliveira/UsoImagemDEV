// require('dotenv').config({path: process.env.DEV_MODE ? '.env.dev' : '.env'});

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

require('dotenv').config({ path:'.env.dev'})

module.exports = {
  username: process.env.USER,
  password: process.env.PWD,
  database: process.env.DATABASE,
  host: process.env.HOST,
  dialect: process.env.DIALECT
}
