const express = require('express');
const authRouter = require('./v1/AuthRouter');
const usersRouter = require('./v1/UserRouter')
const ticketRouter = require('./v1/TicketRouter')
const typeRouter = require('./v1/TypeRouter')
const statusRouter = require('./v1/StatusRouter')
const roleRouter = require('./v1/RoleRouter')
const commentRouter = require('./v1/CommentRouter')
const assignmentRouter = require('./v1/AssignmentRouter')
const { swaggerDocs } = require('./v1/swagger');
//const { isAuthenticated } = require('../middlewares/AuthHandler');

function routes(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/auth', authRouter);
  router.use('/ticket', ticketRouter);
  router.use('/type', typeRouter);
  router.use('/status', statusRouter);
  router.use('/comment', commentRouter);
  router.use('/assignment', assignmentRouter);
  router.use('/role', roleRouter);

  router.use('/docs', ...swaggerDocs); // Spread the swaggerDocs array to use the middleware functions
}

module.exports = routes;
