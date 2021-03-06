const { DataTypes } = require("sequelize");
var sequelize = require("../db/connection");

var User = require("./User");

var nametable = "ticket";

//Creating model UserType
var Ticket = sequelize.define(nametable, {
  request: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: "0",
  },
  userId: {
    type: DataTypes.INTEGER,
    refences: {
      model: User,
      key: "id",
    },
    allowNull: false,
  },
});

//Set relationship oneToMany
User.hasMany(Ticket);
Ticket.belongsTo(User);

module.exports = Ticket;
