const express = require("express");
const router = express.Router();
var auth = require("../middlewares/auth");

const UserController = require("../controllers/UserController");

router.get("/list", auth.verifyAdmin, UserController.list);
router.get("/list-user", auth.verifyAdmin, UserController.listUser);
router.post("/create", UserController.create);
router.get("/get/:id", auth.verifyAdmin, UserController.get);
router.put("/update/:id", auth.verifyUser, UserController.update);
router.delete("/delete/:id", auth.verifyAdmin, UserController.delete);
router.post("/login", UserController.login);

module.exports = router;
