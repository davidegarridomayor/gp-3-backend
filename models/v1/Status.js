// models/status.js
const { Model, Sequelize } = require('sequelize');

const STATUS_TABLE = 'status';

const StatusSchema = {
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
};

class Status extends Model {
  static associate(models) {
    this.hasMany(models.Ticket, {as: 'ticket', foreignKey: 'status_id' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: STATUS_TABLE,
      modelName: 'Status',
      timestamps: false,
    };
  }
}

module.exports = { STATUS_TABLE, StatusSchema, Status };
