const mongoose = require("mongoose");

const tempUserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verificationToken: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
});

const tempUser = mongoose.model("tempUser", tempUserSchema);
module.exports = tempUser;
