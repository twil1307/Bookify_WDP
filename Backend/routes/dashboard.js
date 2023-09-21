var express = require("express");
var router = express.Router();

// get a hotel income per month (host)
router.get("/", () => {
  console.log("dashboard route get");
});

module.exports = router;
