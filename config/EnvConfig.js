require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'developement',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  whiteList: process.env.WHITE_LIST.split(','),
  dbUser:  process.env.DB_USER,
  dbPassword:  process.env.DB_PASSWORD,
  dbHost:  process.env.DB_HOST,
  dbName:  process.env.DB_NAME,
  dbPort:  process.env.DB_PORT,
  dbDialect: process.env.DB_DIALECT,
  dbSsl: process.env.NODE_ENV === 'production',
  jwt_key:process.env.SECRET_KEY,
}

module.exports = { config };
