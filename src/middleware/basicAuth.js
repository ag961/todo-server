'use strict';
const base64 = require('base-64');
const { Users } = require('../models/index')

const basicAuth = async (req, res, next) => {
  const hashedInfo = req.headers.authorization.split(' ')[1];
  const [username, password] = base64.decode(hashedInfo).split(':');
  try {
    let result = await Users.authenticateBasic(username, password);
    req.user = result;
    next();
  } catch (e) {
    res.status(403).send('Invalid Basic Login');
    console.log(e.message)
  }
}

module.exports = basicAuth;