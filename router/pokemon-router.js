const express = require("express");
const router = express.Router();
const Auth = require("../middleware/auth");

const pokemonController = require("../controller/pokemon-controller");

router.get(
  "/",
  Auth.authentication,
  Auth.authorization([{ permission: "view-v2", table: "pokemon" }]),
  pokemonController.list
);
router.get(
  "/:id",
  Auth.authentication,
  Auth.authorization([{ permission: "view", table: "pokemon" }]),
  pokemonController.getById
);
router.post(
  "/",
  Auth.authentication,
  Auth.authorization([{ permission: "create", table: "pokemon" }]),
  pokemonController.add
);
router.put(
  "/:id",
  Auth.authentication,
  Auth.authorization([{ permission: "update", table: "pokemon" }]),
  pokemonController.update
);
router.delete(
  "/:id",
  Auth.authentication,
  Auth.authorization([{ permission: "delete", table: "pokemon" }]),
  pokemonController.delete
);

module.exports = router;
