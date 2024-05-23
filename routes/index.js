const express = require('express');
const authRouter = require('./v1/AuthRouter')
//const { isAuthenticated} = require('../middlewares/AuthHandler')

function routes(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  //router.use('/users', usersRouter);
  router.use('/auth', authRouter);

  //app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
}

module.exports = routes;
