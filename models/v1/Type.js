// models/Type.js
const { Model, Sequelize } = require('sequelize');

const TYPE_TABLE = 'type';

const TypeSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING(50),
  },
  description: {
    allowNull: true,
    type: Sequelize.STRING(255),
  },
  min_duration: {
    allowNull: true,
    type: Sequelize.INTEGER,
  },
  max_duration: {
    allowNull: true,
    type: Sequelize.INTEGER,
  },
  priority:{
    allowNull: true,
    type: Sequelize.INTEGER,
  }
};

class Type extends Model {
  static associate(models) {
    this.hasMany(models.Ticket, {as: 'ticket', foreignKey: 'type_id' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TYPE_TABLE,
      modelName: 'Type',
      timestamps: false,
    };
  }
}

module.exports = { TYPE_TABLE, TypeSchema, Type };
