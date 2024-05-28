const { User, UserSchema } = require('./v1/User');

function setupModels(sequelize) {

  User.init(UserSchema, User.config(sequelize));

  // associate all models

}

module.exports = setupModels;
