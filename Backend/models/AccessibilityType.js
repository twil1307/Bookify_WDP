const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accessibilityTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("AccessibilityType", accessibilityTypeSchema);
