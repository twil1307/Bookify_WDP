const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hotelHightlightSchemaSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  hotelType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HotelType",
  },
});

module.exports = mongoose.model("HotelHightlight", hotelHightlightSchemaSchema);
