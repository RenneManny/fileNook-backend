const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  
  password: {
    type: String,
    required: true,
  },
  verificationToken: {
    type: String,
    default: null,
  },
  verificationTokenExpire: {
    type: Date,
    default: null,
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
