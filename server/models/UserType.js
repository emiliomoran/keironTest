const { DataTypes } = require("sequelize");
var sequelize = require("../db/connection");

var nametable = "usertype";

//Creating model UserType
var UserType = sequelize.define(nametable, {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = UserType;
