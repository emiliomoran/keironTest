var tokenService = require("../services/token");

//Functions to validate routers by user type
const auth = {
  verifyAdmin: async (req, res, next) => {
    if (!req.headers.token) {
      return res.status(404).send({
        message: "Token not found",
      });
    }
    const response = await tokenService.decode(req.headers.token);
    //console.log("decode", response);
    if (response.type === "Administrador") {
      next();
    } else {
      return res.status(403).send({
        message: "Not authorized",
      });
    }
  },
  verifyUser: async (req, res, next) => {
    if (!req.headers.token) {
      return res.status(404).send({
        message: "Token not found",
      });
    }
    const response = await tokenService.decode(req.headers.token);
    if (response.type === "Usuario" || response.type === "Administrador") {
      next();
    } else {
      return res.status(403).send({
        message: "Not authorized",
      });
    }
  },
};

module.exports = auth;
