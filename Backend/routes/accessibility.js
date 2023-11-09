var express = require("express");
var router = express.Router();
const jwtMiddleware = require("../middleware/jwtMiddleware");
const { hasRole } = require("../middleware/userAuthMiddleware");
const accessibilityController = require("../controller/accessibility.controller");
const { userImageUploaderLocal } = require("../service/uploadImg");
const Roles = require("../enum/Role");

// router.post(
//   "/type",
//   userImageUploaderLocal.none(),
//   jwtMiddleware,
//   hasRole(Roles.ADMIN, Roles.USER),
//   amenityController.signNewAmenityType
// );

// router.get(
//   "/type",
//   jwtMiddleware,
//   hasRole(Roles.ADMIN, Roles.USER),
//   amenityController.getAllAmenityType
// );

router.get(
  "/type",
  jwtMiddleware,
  hasRole(Roles.ADMIN, Roles.USER, Roles.HOST),
  accessibilityController.getCurrentAccessibilityType
);

module.exports = router;
