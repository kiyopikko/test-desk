const express = require("express");
const router = express.Router();

router.get(`/user`, (req, res) => {
  res.contentType("application/json");
  setTimeout(() => res.status(200).json({ test: "Hello" }), 1000);
});

module.exports = router;
