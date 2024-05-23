
// Requiring module
const express = require('express');
const cors = require("cors");
const routes = require("./routes/index")
const { config } = require('./config/EnvConfig');
const whitelist = config.whiteList;
// Creating express object
const app = express();




app.use(express.json())

 
// Handling GET request
app.get('/', (req, res) => { 
    res.send('A simple Node App is '
        + 'running on this server' + 'hola profes somos el grupo 3 de computacion distribuida y le presentamos el bakend 🕺') 
    res.end() 
}) 
 
// Port Number
const PORT = process.env.PORT ||5000;
 
// Server Setup
app.listen(PORT,console.log(
  `Server started on port ${PORT}`));