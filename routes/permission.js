const router = require("express").Router();
const PermissionController = require("../controller/permission-controller");
const Auth = require("../middleware/auth");

router.get(
  "/",
  Auth.authentication,
  Auth.authorization([{ permission: "view", table: "permission" }]),
  PermissionController.list
);
router.post(
  "/",
  Auth.authentication,
  Auth.authorization([{ permission: "create", table: "permission" }]),
  PermissionController.create
);
router.delete(
  "/",
  Auth.authentication,
  Auth.authorization([{ permission: "delete", table: "permission" }]),
  PermissionController.delete
);
module.exports = router;
