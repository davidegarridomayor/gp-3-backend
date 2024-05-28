const express = require("express");
const router = express.Router();

const UserService = require("./../../services/v1/UserService");
const userService = new UserService();


module.exports = router;
