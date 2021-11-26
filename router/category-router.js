const express = require("express");
const router = express.Router();
const Auth = require("../middleware/auth");

const categoryController = require("../controller/category-controller");

router.get(
  "/",
  Auth.authentication,
  Auth.authorization([{ permission: "view-v2", table: "category" }]),
  categoryController.list
);
router.get(
  "/:id",
  Auth.authentication,
  Auth.authorization([{ permission: "view", table: "category" }]),
  categoryController.getById
);
router.post(
  "/",
  Auth.authentication,
  Auth.authorization([{ permission: "create", table: "category" }]),
  categoryController.add
);
router.put(
  "/:id",
  Auth.authentication,
  Auth.authorization([{ permission: "update", table: "category" }]),
  categoryController.update
);
router.delete(
  "/:id",
  Auth.authentication,
  Auth.authorization([{ permission: "delete", table: "category" }]),
  categoryController.delete
);

module.exports = router;
