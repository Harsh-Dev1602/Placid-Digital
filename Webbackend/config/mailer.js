import nodemailer from "nodemailer";

const EMAIL_USER = process.env.EMAIL_USER || process.env.SEND_EMAIL_ID;
const EMAIL_PASS = process.env.EMAIL_PASS || process.env.SEND_PASS;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  family: 4, // force IPv4
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// Helpful in deploy logs; won't crash the app if misconfigured.
transporter.verify().then(
  () => console.log("Mailer ready."),
  (err) => console.error("Mailer verify failed:", err?.message || err)
);

export default transporter;