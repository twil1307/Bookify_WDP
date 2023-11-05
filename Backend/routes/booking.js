var express = require("express");
var router = express.Router();
const bookingController = require("../controller/booking.controller");
const { formDataRetrieve } = require("../service/uploadImg");
const jwtMiddleware = require("../middleware/jwtMiddleware");
const {
  verifyBankingAccount,
} = require("../middleware/bankAccountRequiredMiddleware");

/* GET user */
// router.get("/:userId", formDataRetrieve.none(), userController.getUser);

// booking a room
router.post(
  "/",
  jwtMiddleware,
  verifyBankingAccount, // verify if user have a banking account or not
  formDataRetrieve.none(),
  bookingController.bookingRoom
);

module.exports = router;
