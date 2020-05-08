var Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "keiron", // database name
  "keironuser", // user
  "k31r0n", //password
  {
    host: "localhost",
    dialect: "mysql",
  }
);

module.exports = sequelize;
