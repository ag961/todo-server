'use strict';

const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World')
});

const start = (port) => {
  app.listen(port, () => {
    console.log('Server up on:', port)
  })
}

module.exports = {
  app,
  start
};
