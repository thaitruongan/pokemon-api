const express = require("express");
const router = express.Router();
const Auth = require("../middleware/auth");

const typeController = require("../controller/type-controller");

router.get(
  "/",
  Auth.authentication,
  Auth.authorization([{ permission: "view-v2", table: "type" }]),
  typeController.list
);
router.get(
  "/:id",
  Auth.authentication,
  Auth.authorization([{ permission: "view", table: "type" }]),
  typeController.getById
);
router.post(
  "/",
  Auth.authentication,
  Auth.authorization([{ permission: "create", table: "type" }]),
  typeController.add
);
router.put(
  "/:id",
  Auth.authentication,
  Auth.authorization([{ permission: "update", table: "type" }]),
  typeController.update
);
router.delete(
  "/:id",
  Auth.authentication,
  Auth.authorization([{ permission: "delete", table: "type" }]),
  typeController.delete
);

module.exports = router;
