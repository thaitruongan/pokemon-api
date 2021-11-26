const express = require("express");
const router = express.Router();

const Auth = require("../middleware/auth");

const movesController = require("../controller/moves-controller");

router.get(
  "/",
  Auth.authentication,
  Auth.authorization([{ permission: "view-v2", table: "moves" }]),
  movesController.list
);
router.get(
  "/:id",
  Auth.authentication,
  Auth.authorization([{ permission: "view", table: "moves" }]),
  movesController.getById
);
router.post(
  "/",
  Auth.authentication,
  Auth.authorization([{ permission: "create", table: "moves" }]),
  movesController.add
);
router.put(
  "/:id",
  Auth.authentication,
  Auth.authorization([{ permission: "update", table: "moves" }]),
  movesController.update
);
router.delete(
  "/",
  Auth.authentication,
  Auth.authorization([{ permission: "delete", table: "moves" }]),
  movesController.delete
);

module.exports = router;
