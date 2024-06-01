const express = require('express');
const authRouter = require('./v1/AuthRouter');
const usersRouter = require('./v1/UserRouter')
const ticketRouter = require('./v1/TicketRouter')
const typeRouter = require('./v1/TypeRouter')
const { swaggerDocs } = require('./v1/swagger');
//const { isAuthenticated } = require('../middlewares/AuthHandler');

function routes(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/auth', authRouter);
  router.use('/ticket', ticketRouter);
  router.use('/type', typeRouter);
  router.use('/docs', ...swaggerDocs); // Spread the swaggerDocs array to use the middleware functions
}

module.exports = routes;
