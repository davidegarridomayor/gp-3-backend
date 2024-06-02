// models/assignment.js
const { Model, Sequelize } = require('sequelize');

const ASSIGNMENT_TABLE = 'assignment';

const AssignmentSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  ticket_id: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  admin_id: {
    allowNull: true,
    type: Sequelize.INTEGER,
  },
  tech_id: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  client_id: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  status: {
    allowNull: true,
    type: Sequelize.INTEGER,
  },
  assignment_status: {
    allowNull: true,
    type: Sequelize.INTEGER,
  },
  start_date: {
    allowNull: true,
    type: Sequelize.DATE,
  },
  assignment_date: {
    allowNull: true,
    type: Sequelize.DATE,
  },
};

class Assignment extends Model {
  static associate(models) {
    this.belongsTo(models.Ticket, { as: 'ticket', foreignKey: 'ticket_id' });
    this.belongsTo(models.User, { as: 'admin', foreignKey: 'admin_id' });
    this.belongsTo(models.User, { as: 'tech', foreignKey: 'tech_id' });
    this.belongsTo(models.User, { as: 'client', foreignKey: 'client_id' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ASSIGNMENT_TABLE,
      modelName: 'Assignment',
      timestamps: false,
    };
  }
}

module.exports = { ASSIGNMENT_TABLE, AssignmentSchema, Assignment };
