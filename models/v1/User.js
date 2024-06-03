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
  name:{
    allowNull: true,
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
  tokenExpiration: {
    allowNull: true,
    type: Sequelize.DATE,
    field: 'token_expiration'
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
  priority: {
    allowNull: true,
    type: Sequelize.INTEGER,
  }
}

class User extends Model {
  // eslint-disable-next-line no-unused-vars
  static associate(models) {
    this.belongsTo(models.Role, { as: 'role', foreignKey: 'role_id' });
    this.hasMany(models.Ticket, {as:'ticket', foreignKey: 'user_id' });
    this.hasMany(models.Comment, {as: 'comment', foreignKey: 'user_id' });
    this.hasMany(models.Assignment, { as: 'admin', foreignKey: 'admin_id' });
    this.hasMany(models.Assignment, { as: 'tech', foreignKey: 'tech_id' });
    this.hasMany(models.Assignment, { as: 'client', foreignKey: 'client_id' });
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
