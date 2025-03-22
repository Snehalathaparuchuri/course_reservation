const express = require("express");
const Registration = require("../models/Registration");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, course } = req.body;
  const registration = new Registration({ username, course });
  await registration.save();
  res.json({ success: true, message: "Course registered successfully" });
});

module.exports = router;
