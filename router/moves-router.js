const express = require("express");
const router = express.Router();

const Auth = require("../middleware/auth");

const movesController = require("../controller/moves-controller");

router.get("/", movesController.list);
router.get("/:id", movesController.getById);
router.post("/", movesController.add);
router.put("/:id", movesController.update);
router.delete(
  "/",
  Auth.authentication,
  Auth.authorization([{ permission: "delete", table: "moves" }]),
  movesController.delete
);

module.exports = router;
