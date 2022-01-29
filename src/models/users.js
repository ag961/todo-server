require('dotenv').config();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET = process.env.SECRET || 'banana';

const userTable = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'User',
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM('guest', 'writer', 'editor', 'admin'),
        allowNull: false,
        defaultValue: 'guest'
      },
      token: {
        type: DataTypes.VIRTUAL,
        get() {
          return jwt.sign({
            username: this.username
          }, SECRET)
        }
      },
      capabilities: {
        type: DataTypes.VIRTUAL,
        get() {
          const acl = {
            guest: ['read'],
            writer: ['read', 'create'],
            editor: ['read', 'create', 'update'],
            admin: ['read', 'create', 'update', 'delete']
          };
          return acl[this.role]
        }
      }
    }
  )

  model.beforeCreate(async (user) => {
    let hashedPass = await bcrypt.hash(user.password, 10);
    user.password = hashedPass;
  });

  model.authenticateBasic = async function (username, password) {
    const user = await this.findOne({ where: { username } })
    const valid = await bcrypt.compare(password, user.password)
    if (valid) { return user; }
    throw new Error('Invalid User');
  }

  model.authenticateToken = async function (token) {
    try {
      const parsedToken = jwt.verify(token, SECRET);
      const user = await this.findOne({ where: { username: parsedToken.username } })
      if (user) { return user; }
    } catch (err) {
      throw new Error(e.message)
    }
  }
  return model;
}

module.exports = userTable;

