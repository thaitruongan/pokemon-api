const router = require("express").Router();
const PermissionController = require("../controller/permission-controller");

router.get("/", PermissionController.list);
router.post("/", PermissionController.create);

module.exports = router;
