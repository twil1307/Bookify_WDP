const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User booking required"],
      ref: "User",
    },
    BookingDetail: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "BookingDetail",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);
