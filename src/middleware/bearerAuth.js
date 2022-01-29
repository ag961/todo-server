'use strict';
const { Users } = require('../models/index');

async function bearerAuth(req, res, next) {
  try {
    let token = req.headers.authorization.split(' ').pop();
    let currentUser = await Users.authenticateToken(token);
    req.user = currentUser;
    next()
  } catch (e) {
    throw new Error('Invalid token')
  }
}

module.exports = bearerAuth;