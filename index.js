'use strict'

require('dotenv').config();

const { db } = require('./src/models/index');
const server = require('./src/server');

db.sync()
  .then(() => {
    server.start(process.env.PORT)
  })
  .catch(console.error)






