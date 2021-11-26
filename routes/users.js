const express = require("express");
const router = express.Router();

const userController = require("../controller/user-controller");
const Auth = require("../middleware/auth");

router.get("/", userController.list);
router.post("/", userController.create);
router.put("/", userController.update);
router.post("/login", userController.login);
router.delete("/", Auth.authentication, userController.delete);
module.exports = router;
