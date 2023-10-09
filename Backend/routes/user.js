var express = require("express");
var router = express.Router();
const userController = require("../controller/user.controller");
const {
  userImageUploaderLocal,
  formDataRetrieve,
} = require("../service/uploadImg");
const jwtMiddleware = require("../middleware/jwtMiddleware");

// Get user money ammount
router.get("/", () => {
  console.log("user get");
});

/* GET user */
router.get("/:userId", formDataRetrieve.none(), userController.getUser);

// signup new user
router.post("/", formDataRetrieve.none(), userController.signUpUser);

// update user info
router.put(
  "/",
  jwtMiddleware,
  userImageUploaderLocal.single("avatar"),
  userController.updateUser
);

// verify jwt token
router.post("/verifyjwt", userController.verifyJwtToken);

// login
router.post("/login", formDataRetrieve.none(), userController.logIn);

// refresh new access and refresh token after access token expired
router.post("/refresh", userController.refreshNewTokens);

// compare password
router.post(
  "/compareCurrentPassword",
  jwtMiddleware,
  formDataRetrieve.none(),
  userController.compareCurrentPassword
);

// change password
router.put(
  "/changePassword",
  jwtMiddleware,
  formDataRetrieve.none(),
  userController.changePassword
);

module.exports = router;
