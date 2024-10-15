const User = require("../models/userModel.js");
const tempUser = require("../models/tempUser.js");
const bcrypt = require("bcrypt");
const { json } = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail.js");

// signup logic
const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Invalid email!" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Save user data temporarily
    await tempUser.create({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      isVerified: false,
    });

    // Save the temporary user

    await sendEmail(email, verificationToken);

    res
      .status(201)
      .json({ message: "Verification email sent. Please check your inbox." });
  } catch (err) {
    console.error("Signup error:", err); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Error while signing up.", error: err.message });
  }
};

// verification logic
const verifyToken = async (req, res) => {
  try {
    const { token } = req.params;
    const tempUserDetails = await tempUser.findOne({
      verificationToken: token,
    });
    if (!tempUserDetails) {
      return res
        .status(400)
        .json({ message: "Invalid token or user is not registered " });
    }
    const userData = await User.create({
      name: tempUserDetails.name,
      email: tempUserDetails.email,
      password: tempUserDetails.password,
    });
    console.log("user created ");
    await tempUser.deleteOne({ _id: tempUser._id });
    res.status(200).json({ message: "Email verified", userData });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while verifying the email ",
      err: error.message,
    });
  }
};

// login logic
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // checking user exist or not
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(400).json({ message: "User does not exist!" });
    }
    const isMatched = await bcrypt.compare(password, existingUser.password);
    if (!isMatched) {
      res.status(404).json({ message: "Invalid credentials!" });
    }
    // if password matches
    const token = jwt.sign({ id: existingUser._id }, process.env.SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "User logged in sucessfully!",
      name: existingUser.name,
      token,
    });
  } catch (err) {
    console.log(`Error logging in user`, err);
    res.status(500, { json: "Error loggin in user!!" });
  }
};
module.exports = { signUp, login, verifyToken };
