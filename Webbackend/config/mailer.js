import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SEND_EMAIL_ID,
    pass: process.env.SEND_PASS
  }
});

export default transporter;