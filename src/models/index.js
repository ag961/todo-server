require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const UserTable = require('./users');
const ItemModel = require('./items');
const Collections = require('./collections');

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory' : process.env.DATABASE_URL;

const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
} : {}

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);

const Users = UserTable(sequelize, DataTypes);
const itemSchema = ItemModel(sequelize, DataTypes);
const itemsCollection = new Collections(itemSchema);

module.exports = {
  db: sequelize,
  Users,
  items: itemsCollection
}

