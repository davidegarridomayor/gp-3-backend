const { Model, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  username: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  password: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  role_id:{
    allowNull: true,
    type: Sequelize.INTEGER,
  },
  token: {
    allowNull: true,
    type: Sequelize.TEXT,
  },
  token_expiration: {
    allowNull: true,
    type: Sequelize.DATE,
  },
  createdAt: {
    allowNull: true,
    type: 'TIMESTAMP WITHOUT TIME ZONE',
    field: 'created_at',
  },
  updatedAt: {
    allowNull: true,
    type: 'TIMESTAMP WITHOUT TIME ZONE',
    field: 'updated_at',
  },
}

class User extends Model {
  // eslint-disable-next-line no-unused-vars
  static associate(models) {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamp: true
    }
  }
}

module.exports = { USER_TABLE, UserSchema, User }
