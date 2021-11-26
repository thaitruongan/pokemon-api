const express = require("express");
const router = express.Router();

const userController = require("../controller/user-controller");
const Auth = require("../middleware/auth");

router.post("/", userController.create);

router.put("/update", Auth.authentication, userController.selfUpdate);

router.post("/login", userController.login);

router.get(
  "/",
  Auth.authentication,
  Auth.authorization([{ permission: "view", table: "user" }]),
  userController.list
);

router.put(
  "/",
  Auth.authentication,
  Auth.authorization([{ permission: "update", table: "user" }]),
  userController.update
);

router.delete(
  "/",
  Auth.authentication,
  Auth.authorization([{ permission: "delete", table: "user" }]),
  Auth.authentication,
  userController.delete
);
module.exports = router;
