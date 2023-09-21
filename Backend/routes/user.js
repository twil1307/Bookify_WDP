var express = require("express");
var router = express.Router();

// Get user money ammount
router.get("/", () => {
  console.log("user get");
});

module.exports = router;
