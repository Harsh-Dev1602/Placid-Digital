import nodemailer from "nodemailer";
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// SendGrid ke liye EMAIL_USER hamesha "apikey" hi rahega (fix string)
// EMAIL_PASS aapki Generate ki hui SendGrid API Key hogi
const EMAIL_USER = "apikey"; 
const EMAIL_PASS = process.env.SENDGRID_API_KEY; // .env se uthayein

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 465, // SSL ke liye 465 best hai, ya 587 (TLS) use karein
  secure: true, // 465 ke liye true, 587 ke liye false
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// Logs for debugging
transporter.verify().then(
  () => console.log("SendGrid Mailer ready."),
  (err) => console.error("SendGrid verify failed:", err?.message || err)
);

export default transporter;