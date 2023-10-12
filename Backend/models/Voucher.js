const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const voucherSchema = new Schema({
  voucherId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  percentAmount: {
    type: Number,
  },
  voucherBegin: {
    type: Date,
  },
  voucherEnd: {
    type: Date,
  },
  status: {
    type: Boolean,
  },
  voucherType: {
    type: String,
    enum: ["all", "room"],
  },
});

module.exports = mongoose.model("voucher", voucherSchema);
