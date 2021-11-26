const express = require("express");
const router = express.Router();

const typeEffectController = require("../controller/typeEffect-controller");

router.get(
  "/",
  Auth.authentication,
  Auth.authorization([{ permission: "view-v2", table: "type-effect" }]),
  typeEffectController.list
);
router.get(
  "/:id",
  Auth.authentication,
  Auth.authorization([{ permission: "view", table: "type-effect" }]),
  typeEffectController.getById
);
router.post(
  "/",
  Auth.authentication,
  Auth.authorization([{ permission: "create", table: "type-effect" }]),
  typeEffectController.add
);
router.put(
  "/:id",
  Auth.authentication,
  Auth.authorization([{ permission: "update", table: "type-effect" }]),
  typeEffectController.update
);
router.delete(
  "/:id",
  Auth.authentication,
  Auth.authorization([{ permission: "delete", table: "type-effect" }]),
  typeEffectController.delete
);

module.exports = router;
