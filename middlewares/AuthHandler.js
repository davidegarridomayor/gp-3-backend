const UserService = require("./../services/v1/UserService");
const userService = new UserService();


require('dotenv').config();


async function isAuthenticated(req, res, next) {
  try {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authorizationHeader.replace('Bearer ', '');

    const authTypeHeader = req.headers['authtype'];

    const isValidToken = await userService.checkTokenUser(token, authTypeHeader);

    if (isValidToken.valid) {
      req.currentUser = isValidToken.currentUser
      next();
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

// function for authenticate socket
async function socketIsAuthenticated(socket, next) {
  next();
  /*
  const token = socket.handshake?.auth?.token;
  const validToken = token ? await userService.checkTokenUser(token, 'microsoft') : false;
  // const validToken = true;
  if (validToken) {
    next();
  }
  else {
    next(new Error("Unauthorized"));
  }
  */
};

module.exports = {
  isAuthenticated,
  socketIsAuthenticated,
};
