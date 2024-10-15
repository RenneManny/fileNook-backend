require("dotenv").config();
const nodemailer = require("nodemailer");

let sendEmail = async (email, token) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const url = `http://localhost:5173/verify/${token}`;

  await transporter.sendMail({
    to: email,
    subject: "Verify Email",
    html: `<p>Click here to verify email: <a href="${url}">${url}</a></p>`,
  });
};

module.exports = sendEmail;
