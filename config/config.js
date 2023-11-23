require('dotenv').config();

module.exports = {
  development: {
    username: process.env.USERID_DEV,
    password: process.env.PASSWORD_DEV,
    database: process.env.DATABASE_DEV,
    host: process.env.HOST_DEV,
    dialect: "mysql",
    port: process.env.PORT_DEV
  },
  test: {
    username: process.env.USERID_TEST,
    password: process.env.PASSWORD_TEST,
    database: process.env.DATABASE_TEST,
    host: process.env.HOST,
    dialect: "mysql",
    port: process.env.PORT_TEST
  },
  production: {
    username: process.env.USERID_PRODUCTION,
    password: process.env.PASSWORD__PRODUCTION,
    database: process.env.DATABASE_PRODUCTION,
    host: process.env.HOST_PRODUCTION,
    dialect: "mysql",
    port: process.env.PORT_PRODUCTION
  },
}
