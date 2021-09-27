const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
const db = require('./configurations/db')
const app = express();

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(helmet());

app.use(cors());

app.use(morgan('combined'));

app.use(bodyParser.json());

require('./endpoints')(app)

// starting the server
db.sync().then(() => {
  app.listen(3000, () => {
    console.log('listening on port 3000');
  });

})
