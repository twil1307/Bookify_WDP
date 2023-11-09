const Voucher = require("../models/Voucher");
const catchAsync = require("../utils/catchAsync");
const roles = require("../enum/Role");
const VoucherType = require("../enum/Voucher");
const Hotel = require("../models/Hotel");
require("dotenv").config();

module.exports.signNewVoucher = catchAsync(async (req, res) => {
  const VoucherSign = new Voucher(req.body);

  const findExistedAmentity = await Voucher.findOne({
    name: VoucherSign.name,
  });

  if (findExistedAmentity) {
    return res.status(403).json({
      message: "Voucher name already existed",
    });
  } else {
    let newVoucher = null;

    if (req.user.role === roles.ADMIN) {
      VoucherSign.type = VoucherType.ALL;
      // newVoucher = await VoucherSign.save();
    } else if (req.user.role === roles.HOST) {
      console.log("here");
      VoucherSign.type = VoucherType.HOTEL;
      console.log(VoucherSign);
      // newVoucher = await VoucherSign.save();

      // this logic is apply for only 1 owner per 1 hotel
      const hotelOwned = await Hotel.findOne({ user: req.user._id });

      console.log(hotelOwned.Vouchers);

      return res.status(200).json({
        message: "Voucher saved successfully",
        voucher: newVoucher,
      });

      if (hotelOwned) {
        try {
          hotelOwned.Vouchers.push(newVoucher._id);
          console.log(hotelOwned);
          await hotelOwned.save();
        } catch (error) {
          console.log(error);
        }
      }
    }

    console.log(VoucherSign);

    return res.status(200).json({
      message: "Voucher saved successfully",
      voucher: newVoucher,
    });
  }
});
