// models/role.js
const { Model, Sequelize } = require('sequelize');

const ROLE_TABLE = 'role';

const RoleSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING(30),
  },
  description: {
    allowNull: true,
    type: Sequelize.STRING(256),
  },
};

class Role extends Model {
  static associate(models) {
    this.hasMany(models.User, {as: 'user', foreignKey: 'role_id' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ROLE_TABLE,
      modelName: 'Role',
      timestamps: false,
    };
  }
}

module.exports = { ROLE_TABLE, RoleSchema, Role };
