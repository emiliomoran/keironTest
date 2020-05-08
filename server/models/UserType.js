const { DataTypes } = require("sequelize");
var sequelize = require("../db/connection");

var nametable = "usertype"; // nombre de la tabla

var UserType = sequelize.define(
  nametable,
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
  /* {
    // remove  createdAt y updated
    timestamps: false,
  } */
);

module.exports = UserType;
