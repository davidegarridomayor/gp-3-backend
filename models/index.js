// models/index.js
const { User, UserSchema } = require('./v1/User');
const { Role, RoleSchema } = require('./v1/Role');
const { Status, StatusSchema } = require('./v1/Status');
const { Type, TypeSchema } = require('./v1/Type');
const { Ticket, TicketSchema } = require('./v1/Ticket');
const { Comment, CommentSchema } = require('./v1/Comment');
const { Assignment, AssignmentSchema } = require('./v1/Assignment');

const setupModels = (sequelize) => {
  User.init(UserSchema, User.config(sequelize));
  Role.init(RoleSchema, Role.config(sequelize));
  Status.init(StatusSchema, Status.config(sequelize));
  Type.init(TypeSchema, Type.config(sequelize));
  Ticket.init(TicketSchema, Ticket.config(sequelize));
  Comment.init(CommentSchema, Comment.config(sequelize));
  Assignment.init(AssignmentSchema, Assignment.config(sequelize));

  User.associate(sequelize.models);
  Role.associate(sequelize.models);
  Status.associate(sequelize.models);
  Type.associate(sequelize.models);
  Ticket.associate(sequelize.models);
  Comment.associate(sequelize.models);
  Assignment.associate(sequelize.models);
};

module.exports = setupModels;
