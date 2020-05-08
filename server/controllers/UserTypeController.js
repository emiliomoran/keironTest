var sequelize = require("../db/connection");
var UserType = require("../models/UserType");

//To migrate tables
sequelize.sync();

const controllers = {
  create: async (req, res, next) => {
    try {
      console.log(req.body);
      const { name } = req.body;
      console.log("UserType name ", name);
      const reg = await UserType.create({
        name: name,
      });
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error add user type",
      });
      next(error);
    }
  },
  get: async (req, res, next) => {
    try {
      const { id } = req.params;
      const reg = await UserType.findOne({
        where: { id: id },
      });
      if (!reg) {
        return res.status(404).send({
          message: "Not found user type",
        });
      }
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error query user type",
      });
      next(error);
    }
  },
  list: async (req, res, next) => {
    try {
      const reg = await UserType.findAll();

      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error list user type",
      });
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const reg = await UserType.update(
        {
          name: name,
        },
        {
          where: { id: id },
        }
      );
      return res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error update user type",
      });
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const reg = await UserType.destroy({
        where: { id: id },
      });
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error delete user type",
      });
      next(error);
    }
  },
};

module.exports = controllers;
