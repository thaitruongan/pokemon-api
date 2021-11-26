const express = require("express");
const router = express.Router();
const Auth = require("../middleware/auth");

const pokeTypeController = require("../controller/pokeType-controller");

router.get(
  "/",
  Auth.authentication,
  Auth.authorization([{ permission: "view-v2", table: "poke-type" }]),
  pokeTypeController.list
);
router.get(
  "/:id",
  Auth.authentication,
  Auth.authorization([{ permission: "view", table: "poke-type" }]),
  pokeTypeController.getById
);
router.post(
  "/",
  Auth.authentication,
  Auth.authorization([{ permission: "create", table: "poke-type" }]),
  pokeTypeController.add
);
router.put(
  "/:id",
  Auth.authentication,
  Auth.authorization([{ permission: "update", table: "poke-type" }]),
  pokeTypeController.update
);
router.delete(
  "/:id",
  Auth.authentication,
  Auth.authorization([{ permission: "delete", table: "poke-type" }]),
  pokeTypeController.delete
);

module.exports = router;
