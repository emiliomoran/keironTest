const express = require("express");
const router = express.Router();

const UserTypeController = require("../controllers/UserTypeController");

router.get("/list", UserTypeController.list);
router.post("/create", UserTypeController.create);
router.get("/get/:id", UserTypeController.get);
router.put("/update/:id", UserTypeController.update);
router.delete("/delete/:id", UserTypeController.delete);

module.exports = router;
