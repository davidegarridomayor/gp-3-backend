const express = require('express');
const cors = require("cors");
const routes = require("./routes/index")
const { config } = require('./config/EnvConfig');
const whitelist = config.whiteList;
const port = config.port || 5000

const app = express();

app.use(express.json())

app.get('/', (req, res) => { 
    res.send('A simple Node App is '
        + 'running on this server' + 'hola profes somos el grupo 3 de computacion distribuida y le presentamos el bakend 🕺') 
    res.end() 
}) 


routes(app)
 
app.listen(port,console.log(
  `Server started on port ${port}`));