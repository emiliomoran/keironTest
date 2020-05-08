const express = require("express");
const router = express.Router();
var auth = require("../middlewares/auth");

const TicketController = require("../controllers/TicketController");

router.get("/list", auth.verifyAdmin, TicketController.list);
router.get("/list-user/:id", auth.verifyUser, TicketController.listUser);
router.post("/create", auth.verifyAdmin, TicketController.create);
router.get("/get/:id", auth.verifyAdmin, TicketController.get);
router.put("/update/:id", auth.verifyUser, TicketController.update);
router.delete("/delete/:id", auth.verifyAdmin, TicketController.delete);

module.exports = router;
