const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accessibilitySchema = new Schema({
  accessibilityName: {
    type: Number,
    ref: "Hotel",
  },
  accessibilityType: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "AccessibilityType",
  },
});

module.exports = mongoose.model("Accessibility", accessibilitySchema);
