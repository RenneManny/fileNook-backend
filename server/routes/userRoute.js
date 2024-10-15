const express = require("express");
const router = express.Router();
const {
  signUp,
  login,
  verifyToken,
} = require("../controller/userContoller.js");
// first route
router.post("/signup", signUp);
// verify email

router.get("/verify/:token", verifyToken);

// login route
router.post("/login", login);
module.exports = router;
