const Voucher = require("../models/Voucher");
const catchAsync = require("../utils/catchAsync");
const roles = require("../enum/Role");
const VoucherType = require("../enum/Voucher");
const Hotel = require("../models/Hotel");
require("dotenv").config();

module.exports.signNewVoucher = catchAsync(async (req, res) => {
  const Voucher = new Voucher(req.body);

  const findExistedAmentity = await Voucher.findOne({
    name: Voucher.name,
  });

  if (findExistedAmentity) {
    return res.status(403).json({
      message: "Voucher name already existed",
    });
  } else {
    const newVoucher = null;

    if (req.user.role === roles.ADMIN) {
      Voucher.type = VoucherType.ALL;
      newVoucher = await Voucher.save();
    } else if (req.user.role === roles.HOST) {
      Voucher.type = VoucherType.HOTEL;
      newVoucher = await Voucher.save();

      // this logic is apply for only 1 owner per 1 hotel
      const hotelOwned = await Hotel.find({ user: req.user._id });

      if (hotelOwned) {
        hotelOwned.Voucher.push(newVoucher._id);
        await hotelOwned.save();
      }
    }

    if (newVoucher) {
      return res.status(200).json({
        message: "Voucher saved successfully",
        amenity: newVoucher,
      });
    } else {
      return res.status(500).json({
        message: "Couldn't save Voucher",
      });
    }
  }
});
