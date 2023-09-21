var express = require("express");
var router = express.Router();

// booking a room
router.post("/", () => {
  console.log("post booking");
});

module.exports = router;
