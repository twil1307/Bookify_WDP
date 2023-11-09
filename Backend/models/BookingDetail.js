const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingDetailSchema = new Schema(
  {
    bookingDetailId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Room booking required"],
      ref: "Room",
    },
    roomType: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Room type required"],
      ref: "RoomType",
    },
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Hotel booking required"],
      ref: "Hotel",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User booking required"],
      ref: "User",
    },
    price: {
      type: Number,
      required: [true, "Price required"],
    },
    checkin: {
      type: Date,
      required: [true, "Check in time required"],
    },
    checkout: {
      type: Date,
      required: [true, "Check out time required"],
    },
    aldult: {
      type: Number,
      default: 0,
    },
    child: {
      type: Number,
      default: 0,
    },
    infant: {
      type: Number,
      default: 0,
    },
    pet: {
      type: Number,
      default: 0,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BookingDetail", bookingDetailSchema);
