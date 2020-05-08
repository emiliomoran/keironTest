const { DataTypes } = require("sequelize");
var sequelize = require("../db/connection");

var UserType = require("./UserType");

var nametable = "user";

var User = sequelize.define(nametable, {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  usertypeId: {
    type: DataTypes.INTEGER,
    refences: {
      model: UserType,
      key: "id",
    },
    allowNull: false,
  },
});

UserType.hasMany(User);
User.belongsTo(UserType);

module.exports = User;
