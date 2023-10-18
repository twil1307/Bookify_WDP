const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const VoucherType = require("../enum/Voucher");

const voucherSchema = new Schema({
  voucherId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
    require: [true, "Voucher name is required"],
  },
  percentAmount: {
    type: Number,
  },
  beginAt: {
    type: Date,
  },
  endAt: {
    type: Date,
  },
  status: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    enum: [VoucherType.ALL, VoucherType.ROOM, VoucherType.HOTEL],
  },
  extraField: mongoose.Schema.Types.Mixed,
});

module.exports = mongoose.model("Voucher", voucherSchema);
