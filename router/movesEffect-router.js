const express = require("express");
const router = express.Router();
const Auth = require("../middleware/auth");

const movesEffectController = require("../controller/movesEffect-controller");

router.get(
  "/",
  Auth.authentication,
  Auth.authorization([{ permission: "view-v2", table: "moves-effect" }]),
  movesEffectController.list
);
router.get(
  "/:id",
  Auth.authentication,
  Auth.authorization([{ permission: "view", table: "moves-effect" }]),
  movesEffectController.getById
);
router.post(
  "/",
  Auth.authentication,
  Auth.authorization([{ permission: "create", table: "moves-effect" }]),
  movesEffectController.add
);
router.put(
  "/:id",
  Auth.authentication,
  Auth.authorization([{ permission: "update", table: "moves-effect" }]),
  movesEffectController.update
);
router.delete(
  "/:id",
  Auth.authentication,
  Auth.authorization([{ permission: "delete", table: "moves-effect" }]),
  movesEffectController.delete
);

module.exports = router;
