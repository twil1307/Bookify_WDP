const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accessibilitySchema = new Schema({
  name: {
    type: String,
    required: [true, "Accessibility name required"],
  },
  content: {
    type: String,
  },
  type: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "AccessibilityType",
  },
});

module.exports = mongoose.model("Accessibility", accessibilitySchema);
