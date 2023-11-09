const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const VoucherType = require("../enum/Voucher");

const voucherSchema = new Schema({
  voucherId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
  },
  percentAmount: {
    type: Number,
  },
  beginAt: {
    type: Date,
    default: Date.now,
  },
  endAt: {
    type: Date,
    default: function () {
      // Set the default value to "Date.now + 24 hours"
      return new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours in milliseconds
    },
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
