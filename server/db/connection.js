var Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "keiron", // database
  "keironuser", // user / usuario
  "k31r0n", //password
  {
    host: "localhost",
    dialect: "mysql",
  }
);

module.exports = sequelize;
