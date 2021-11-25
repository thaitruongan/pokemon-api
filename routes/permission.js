const router = require("express").Router();
const PermissionController = require("../controller/permission-controller");

router.get("/", PermissionController.list);
router.post("/", PermissionController.create);
router.delete("/", PermissionController.delete);
module.exports = router;
