const express = require("express");
const router = express.Router();
const AuthorizedController = require("../controller/authorization-controller");
const Auth = require("../middleware/auth");

router.get(
  "/",
  Auth.authentication,
  Auth.authorization([{ permission: "view", table: "authorized" }]),
  AuthorizedController.list
);
router.post(
  "/",
  Auth.authentication,
  Auth.authorization([{ permission: "create", table: "authorized" }]),
  AuthorizedController.create
);
router.post(
  "/user",
  Auth.authentication,
  Auth.authorization([{ permission: "view-v2", table: "authorized" }]),
  AuthorizedController.requestUserAuth
);
router.delete(
  "/",
  Auth.authentication,
  Auth.authorization([{ permission: "delete", table: "authorized" }]),
  AuthorizedController.delete
);

module.exports = router;
