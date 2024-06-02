// models/ticket.js
const { Model, Sequelize } = require('sequelize');

const TICKET_TABLE = 'ticket';

const TicketSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  created_at: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  updated_at: {
    allowNull: true,
    type: Sequelize.DATE,
  },
  status_id: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  type_id: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  limit_date: {
    allowNull: true,
    type: Sequelize.DATE,
  },
  user_id: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  description: {
    allowNull: true,
    type: Sequelize.STRING,
  }
};

class Ticket extends Model {
  static associate(models) {
    this.belongsTo(models.Status, { as: 'status', foreignKey: 'status_id' });
    this.belongsTo(models.Type, { as: 'type', foreignKey: 'type_id' });
    this.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
    this.hasMany(models.Comment, { as: 'comments', foreignKey: 'ticket_id' });
    this.hasMany(models.Assignment, { as: 'assignment', foreignKey: 'ticket_id' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TICKET_TABLE,
      modelName: 'Ticket',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    };
  }
}

module.exports = { TICKET_TABLE, TicketSchema, Ticket };
