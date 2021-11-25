const express = require("express");
const router = express.Router();
const AuthorizedController = require("../controller/authorization-controller");

router.get("/", AuthorizedController.list);
router.post("/", AuthorizedController.create);
router.post("/user", AuthorizedController.getUserAuth);
router.delete("/", AuthorizedController.delete);

module.exports = router;
