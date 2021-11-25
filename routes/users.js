const express = require("express");
const router = express.Router();

const userController = require("../controller/user-controller");
const auth = require("../middleware/auth");

router.get("/", auth, userController.list);
router.post("/", userController.create);
router.post("/login", userController.login);
router.delete("/", auth, userController.delete);
module.exports = router;
