// models/comment.js
const { Model, Sequelize } = require('sequelize');

const COMMENT_TABLE = 'comment';

const CommentSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  content: {
    allowNull: false,
    type: Sequelize.TEXT,
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
  user_id: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  ticket_id: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
};

class Comment extends Model {
  static associate(models) {
    this.belongsTo(models.User, {as:'user', foreignKey: 'user_id' });
    this.belongsTo(models.Ticket, {as:'ticket', foreignKey: 'ticket_id' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: COMMENT_TABLE,
      modelName: 'Comment',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    };
  }
}

module.exports = { COMMENT_TABLE, CommentSchema, Comment };
