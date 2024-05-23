const express = require('express');
 
const app = express();
const cors = require("cors"); 
const routes = require("./routes");
const { config } = require('./config/EnvConfig');
const port = config.port;
app.use(express.json())

const whitelist = config.whiteList;
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed'));
    }
  }
}
app.use(cors(options));

app.get('/', (req, res) => { 
    res.send('hola profes somos el grupo 3 de computacion distribuida y le presentamos el bakend 🕺') 
    res.end() 
}) 

routes(app)
 

app.listen(port,console.log(
  `Server started on port ${port}`));