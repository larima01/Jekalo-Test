const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const helmet = require('helmet');
const expressValidator = require('express-validator');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();
const http = require('http');

require('dotenv').config({ path: __dirname + '/.env' });
app.use(cors());
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = http.createServer(app);


// Express Validtor Middleware
app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    var namespace = param.split('.')
      ,root = namespace.shift()
      ,formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

// swagger configuration
const swaggerDefinition = {
  info: {
    title: 'JEKALO Swagger API',
    version: '1.0.0',
    description: 'Endpoints to test the routes',
  },
  // host: 'localhost:5050',
  host:'jekalotest.herokuapp.com',
  basePath: '/',
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

let userApi = require('./routes/api');

app.use('/api/', userApi);

app.get('/', function(req, res) {
    res.status(200).json({status:"success", message:"Welcome to Jekalo Test Api."})
});


//set the express.static middleware
app.use(express.static(__dirname + "/public"));

// set port
const port = process.env.PORT || 5050;

// start server
server.listen(port, function () {
  console.log(`Server started on port ${port}...`);
});