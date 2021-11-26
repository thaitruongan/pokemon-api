const router = require("express").Router();
const uploadController = require("../controller/upload-controller");
const upload = require("../middleware/upload");
const Auth = require("../middleware/auth");

router.post(
  "/",
  Auth.authentication,
  Auth.authorization([{ permission: "upload", table: "" }]),
  upload,
  uploadController.upload
);

module.exports = router;
