const nodemailer = require('nodemailer');
const { log } = require('mercedlogger');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: false, // Set to true if you're using port 465 with SSL, false for port 587 with STARTTLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log("Email server connection error:", error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

const sendEmail = async (mailOptions) => {
  try {
    await transporter.sendMail(mailOptions); // Use sendMail, not sendEmail
    log.green("Email sent successfully");
  } catch (error) {
    console.error("Email sending error:", error);
    throw new Error("Failed to send email");
  }
};

module.exports = { sendEmail };
