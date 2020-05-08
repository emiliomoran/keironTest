var sequelize = require("../db/connection");
var User = require("../models/User");
var UserType = require("../models/UserType");
const bcrypt = require("bcrypt");
var token = require("../services/token");

//To migrate tables
sequelize.sync();

const controllers = {
  create: async (req, res, next) => {
    try {
      //console.log(req.body);
      const { name, username, password, usertypeId } = req.body;

      //Hashing password
      const pass_hash = await bcrypt.hash(password, 10);
      //console.log(req.body);
      const reg = await User.create({
        name: name,
        username: username,
        password: pass_hash,
        usertypeId: usertypeId,
      });
      res.status(200).send({
        message: "Success",
      });
    } catch (error) {
      res.status(500).send({
        message: "Error create user",
      });
      next(error);
    }
  },
  get: async (req, res, next) => {
    try {
      const { id } = req.params;
      const reg = await User.findOne({
        where: { id: id },
        include: [UserType],
        attributes: { exclude: ["password"] },
      });
      if (!reg) {
        return res.status(404).send({
          message: "Not found user",
        });
      }
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error get user",
      });
      next(error);
    }
  },
  list: async (req, res, next) => {
    try {
      const reg = await User.findAll({
        include: [UserType],
        attributes: { exclude: ["password"] },
      });

      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error list users",
      });
      next(error);
    }
  },
  //List only tickets by user with type Usuario
  listUser: async (req, res, next) => {
    try {
      const reg = await User.findAll({
        /* where: {
          usertypeId: 2,
        }, */
        include: [
          {
            model: UserType,
            where: {
              name: "Usuario",
            },
          },
        ],
        attributes: { exclude: ["password"] },
      });

      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error list users",
      });
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, username, password, usertypeId } = req.body;
      const pass_hash = await bcrypt.hash(password, 10);
      const reg = await User.update(
        {
          name: name,
          username: username,
          password: pass_hash,
          usertypeId: usertypeId,
        },
        {
          where: { id: id },
        }
      );
      return res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error update user",
      });
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const reg = await User.destroy({
        where: { id: id },
      });
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error delete user",
      });
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const user = await User.findOne({
        where: { username: req.body.username },
        include: [UserType],
      });

      //Checking if user exists
      if (user) {
        let match = await bcrypt.compare(req.body.password, user.password);
        //Checking password
        if (match) {
          //Generating token by user
          let tokenReturn = await token.encode(
            user.id,
            user.usertype.name,
            user.username
          );
          res.status(200).json({
            user: {
              id: user.id,
              name: user.name,
              username: user.username,
              usertypeId: user.usertypeId,
              usertype: user.usertype,
            },
            tokenReturn,
          });
        } else {
          res.status(404).send({
            message: "Incorrect password",
          });
        }
      } else {
        res.status(404).send({
          message: "User not found",
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "Error login user",
      });
      next(error);
    }
  },
};

module.exports = controllers;
