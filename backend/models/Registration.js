const mongoose = require("mongoose");

const RegistrationSchema = new mongoose.Schema({
  username: String,
  course: String,
  paymentStatus: { type: String, default: "Pending" }
});

module.exports = mongoose.model("Registration", RegistrationSchema);
