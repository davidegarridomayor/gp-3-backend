const { Sequelize } = require('sequelize');
const { config } = require('./EnvConfig');
const setupModels = require('./../models');

const options = {
  dialect: config.dbDialect,
  logging: config.isProd ? false : console.log,
};

if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const sequelize = new Sequelize(
  config.dbName,
  config.dbUser,
  config.dbPassword,
  {
    ...options,
    host: config.dbHost,
    port: config.dbPort,
  }
);

setupModels(sequelize);

module.exports = sequelize;
