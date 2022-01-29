'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const { Users, items } = require('./models');
const morgan = require('morgan');
const basicAuth = require('./middleware/basicAuth');
const bearerAuth = require('./middleware/bearerAuth');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/signup', async (req, res) => {
  try {
    let userRecord = await Users.create(req.body);
    const output = {
      user: userRecord,
      userToken: userRecord.token
    };
    res.status(200).json(output);
  } catch (err) {
    res.status(500).send(err.errors[0].message);
  }
})

app.get('/signin', basicAuth, (req, res) => {
  let authenticatedUser = {
    token: req.user.token,
    capabilities: req.user.capabilities,
    username: req.user.username
  };
  res.status(200).json(authenticatedUser);
})

app.get('/verify', bearerAuth, (req, res) => {
  let authenticatedUser = {
    token: req.user.token,
    capabilities: req.user.capabilities,
    username: req.user.username
  };
  console.log('bearer User', authenticatedUser);
  res.status(200).json(authenticatedUser);
})

app.get('/todo', bearerAuth, async (req, res) => {
  let fullList = await items.read();
  res.status(200).json(fullList);
})

app.post('/todo', bearerAuth, async (req, res) => {
  let receivedItem = req.body;
  let addedItem = await items.create(receivedItem);
  res.status(200).json(addedItem);
})

app.put('/todo', bearerAuth, async (req, res) => {
  let itemId = req.body.id;
  console.log('PUT BODY', req.body);
  let updatedItem = await items.update(itemId, req.body);
  res.status(200).json(updatedItem);
})

app.delete('/todo/:id', bearerAuth, async (req, res) => {
  let itemId = req.params.id;
  let deletedItem = await items.delete(itemId);
  res.status(200).json(deletedItem);
})

const start = (port) => {
  app.listen(port, () => {
    console.log('Server up on:', port);
  })
}

module.exports = {
  app,
  start
};
