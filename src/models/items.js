'use strict';

const itemModel = (sequelize, DataTypes) => sequelize.define('todo_items', {
  // text(string), assignee(str), difficulty(str), id(str), complete (boolean),
  text: {
    type: DataTypes.STRING
  },
  assignee: {
    type: DataTypes.STRING
  },
  difficulty: {
    type: DataTypes.STRING
  },
  complete: {
    type: DataTypes.BOOLEAN
  },
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  }
})

module.exports = itemModel;