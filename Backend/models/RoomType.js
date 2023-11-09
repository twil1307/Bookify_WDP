const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomTypeSchema = new Schema({
  roomTypeId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  roomPrice: {
    type: Number,
    required: [true, "Price required"],
  },
  bedType: {
    type: String,
    required: [true, "Bed type required"],
    default: "Normal",
  },
  bedNum: {
    type: Number,
    required: [true, "Bed number required"],
  },
  bathroomType: {
    type: String,
    required: [true, "Bathroom type required"],
    default: "Normal",
  },
  bathNum: {
    type: Number,
    required: [true, "Bathroom number required"],
  },
  maxGuest: {
    type: Number,
    required: [true, "Max guest per room required"],
  },
  bedroomNum: {
    type: Number,
    required: [true, "Number of bedroom required"],
  },
  isbathPrivate: {
    type: Boolean,
    required: [true, "Is bathroom private"],
    default: true,
  },
  roomService: [
    {
      type: {
        context: { type: String, required: false },
        icon: { type: String, required: false },
        status: { type: Boolean, required: false },
      },
    },
  ],
  // total number of this type of rooms
  roomNumber: {
    type: Number,
    required: [true, "Number of rooms required"],
  },
});

module.exports = mongoose.model("RoomType", roomTypeSchema);
