var express = require("express");
var router = express.Router();
const hotelController = require("../controller/hotel.controller");
const voucherController = require("../controller/voucher.controller");
const accessibilityController = require("../controller/accessibility.controller");
const jwtMiddleware = require("../middleware/jwtMiddleware");
const {
  hasRole,
  isExactHost,
  isUserAvailable,
} = require("../middleware/userAuthMiddleware");
const {
  hotelImageUploaderLocal,
  formDataRetrieve,
} = require("../service/uploadImg");
const Roles = require("../enum/Role");

// Create new hotel with role admin
router.post(
  "/",
  jwtMiddleware,
  hasRole(Roles.USER, Roles.ADMIN),
  hotelImageUploaderLocal.fields([
    { name: "backgroundImage", maxCount: 1 },
    { name: "hotelImage", maxCount: 10 },
    { name: "viewImage", maxCount: 10 },
  ]),
  hotelController.signNewHotel
);

// create hotel type
router.post(
  "/type",
  formDataRetrieve.none(),
  jwtMiddleware,
  hasRole(Roles.USER, Roles.ADMIN),
  hotelController.signNewHotelType
);

// create hotel accessibility type
router.post(
  "/accessibilityType",
  formDataRetrieve.none(),
  jwtMiddleware,
  hasRole(Roles.HOST, Roles.ADMIN),
  accessibilityController.signNewHotelAccessibilityType
);

router.get("/type", jwtMiddleware, hotelController.getHotelTypes);

router.post(
  "/voucher",
  formDataRetrieve.none(),
  jwtMiddleware,
  hasRole(Roles.HOST, Roles.ADMIN),
  voucherController.signNewVoucher
);

// get all hotel
router.get("/", isUserAvailable, hotelController.getAllHotels);

module.exports = router;
