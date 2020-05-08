var sequelize = require("../db/connection");
var User = require("../models/User");
var Ticket = require("../models/Ticket");

//To migrate tables
sequelize.sync();

const controllers = {
  create: async (req, res, next) => {
    try {
      //console.log(req.body);
      const { request, userId } = req.body;
      //console.log(req.body);
      const reg = await Ticket.create({
        request: request,
        userId: userId,
      });
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error create ticket",
      });
      next(error);
    }
  },
  get: async (req, res, next) => {
    try {
      const { id } = req.params;
      const reg = await Ticket.findOne({
        where: { id: id },
        include: [User],
      });
      if (!reg) {
        return res.status(404).send({
          message: "Not found ticket",
        });
      }
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error get ticket",
      });
      next(error);
    }
  },
  list: async (req, res, next) => {
    try {
      const reg = await Ticket.findAll({
        include: [User],
      });

      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error list ticket",
      });
      next(error);
    }
  },
  //List only tickets by user
  listUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const reg = await Ticket.findAll({
        where: { userId: id },
        include: [User],
      });

      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error list user ticket",
      });
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { request, userId } = req.body;
      const reg = await Ticket.update(
        {
          request: request,
          userId: userId,
        },
        {
          where: { id: id },
        }
      );
      return res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error update ticket",
      });
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const reg = await Ticket.destroy({
        where: { id: id },
      });
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error delete ticket",
      });
      next(error);
    }
  },
};

module.exports = controllers;
