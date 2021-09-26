const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { getAll, insert, remove, update } = require('./service/User')

const app = express();


app.use(helmet());

app.use(bodyParser.json());

app.use(cors());

app.use(morgan('combined'));

app.get('/', async (req, res) => {
  res.send(await getAll());
});

// starting the server
app.listen(3001, () => {
  console.log('listening on port 3001');
});


app.post('/', async (req, res) => {
  const newUser = req.body
  await insert(newUser)
  res.send({ message: 'New user inserted' })
})

app.delete('/:id', async (req, res) => {
  await remove(req.params.id)
  res.send({ message: 'User removed' })
})

app.put('/', async (req, res) => {
  const updatedUser = req.body
  await update(updatedUser)
  res.send({ message: 'New usuer updated' })

})