var express = require("express");
var router = express.Router();

router.get("/getOwnerHotel", () => {
  console.log("Hotel get");
});

module.exports = router;
