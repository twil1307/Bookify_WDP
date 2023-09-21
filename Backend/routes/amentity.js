var express = require("express");
var router = express.Router();

router.post("/type", () => {
  console.log("Type route post");
});

router.get("/type", () => {
  console.log("Type route get type");
});

router.get("/", () => {
  console.log("Type route get");
});

module.exports = router;
