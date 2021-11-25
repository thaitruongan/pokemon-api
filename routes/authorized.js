const express = require("express");
const router = express.Router();
const AuthorizedController = require("../controller/authorization-controller");

router.get("/", AuthorizedController.list);
router.post("/", AuthorizedController.create);

module.exports = router;
