var express = require("express");
var router = express.Router();
const hotelController = require("../controller/hotel.controller");
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
const { isUserEverStayHere } = require("../middleware/reviewQualify");
const Roles = require("../enum/Role");
const { countPageViews } = require("../middleware/pageViewMiddleware");

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

router.get(
  "/getOwnerHotel",
  jwtMiddleware,
  hasRole(Roles.HOST, Roles.ADMIN),
  hotelController.getOwnerHotel
);

router.get("/type", jwtMiddleware, hotelController.getHotelTypes);

// get all hotel
router.get("/", isUserAvailable, hotelController.getAllHotels);

// Get specific hotel
router.get("/:hotelId", countPageViews, hotelController.getHotel);

// update hotel
router.put(
  "/:hotelId",
  jwtMiddleware,
  hasRole(Roles.ADMIN, Roles.HOST),
  isExactHost,
  hotelImageUploaderLocal.fields([
    { name: "backgroundImage", maxCount: 1 },
    { name: "hotelImage", maxCount: 5 },
    { name: "viewImage", maxCount: 5 },
  ]),
  hotelController.updateHotel
);

// delete hotel
router.delete(
  "/:hotelId",
  jwtMiddleware,
  hasRole(Roles.ADMIN),
  hotelController.deleteHotel
);

// review hotel
router.post(
  "/:hotelId/review",
  formDataRetrieve.none(),
  jwtMiddleware,
  isUserEverStayHere,
  hotelController.reviewHotel
);

// report hotel
router.post(
  "/:hotelId/report",
  formDataRetrieve.none(),
  jwtMiddleware,
  isUserEverStayHere,
  hotelController.reportHotel
);

router.get(
  "/:hotelId/isUserEverStayHere",
  jwtMiddleware,
  hotelController.checkIsUserEverStayHere
);

router.post(
  "/:hotelId/roomTypeAvaibility/:roomTypeId",
  formDataRetrieve.none(),
  jwtMiddleware,
  hotelController.checkRoomTypeAvaibility
);

module.exports = router;
