const express = require('express');
const cors = require("cors");
const routes = require("./routes/index")
const { config } = require('./config/EnvConfig');
const whitelist = config.whiteList;
const port = config.port || 5000

const app = express();

app.use(express.json())

const options = {
    origin: (origin, callback) => {
      // CHANGE THIS LINE TO ALLOW ACCESS ONLY FROM YOUR FRONTEND
      if (whitelist.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed'));
      }
    }
  }

app.use(cors(options));
app.get('/', (req, res) => { 
    res.send('hola profes somos el grupo 3 de computacion distribuida y le presentamos el bakend 🕺' + 'api docs en https://api-gp-3.azurewebsites.net/api/v1/docs/') 
    res.end() 
}) 


routes(app)
 
app.listen(port,console.log(
  `Server started on port ${port}`));