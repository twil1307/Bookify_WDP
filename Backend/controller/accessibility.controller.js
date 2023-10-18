const AccessibilityType = require("../models/AccessibilityType");
const catchAsync = require("../utils/catchAsync");
require("dotenv").config();

module.exports.signNewHotelAccessibilityType = catchAsync(async (req, res) => {
  const accessibilityType = new AccessibilityType(req.body);

  console.log(accessibilityType);

  const findExistedAmentity = await AccessibilityType.findOne({
    name: accessibilityType.name,
  });

  if (findExistedAmentity) {
    return res.status(403).json({
      message: "Accessibility Type name already existed",
    });
  } else {
    const newAmenityType = await accessibilityType.save();

    if (newAmenityType) {
      return res.status(200).json({
        message: "Sign new Accessibility Type successfully",
        amenity: newAmenityType,
      });
    } else {
      return res.status(500).json({
        message: "Couldn't sign new Accessibility Type",
      });
    }
  }
});
