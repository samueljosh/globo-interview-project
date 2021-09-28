const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
const db = require('./src/configurations/db')
const app = express();

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(helmet());

app.use(cors());

app.use(morgan('combined'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});

app.get('/', (req, res) => {
  res.send('App works!')
})

app.use(bodyParser.json());

require('./src/routes/index')(app)
const port = process.env.PORT || 3000

// starting the server
db.sync().then(() => {
  app.listen(port, () => {
    console.log('listening on port 3000');
  });

})
