const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "helperemail14716@gmail.com",
    pass: process.env.GMAIL_SMTP_PASSWORD,
  },
});

exports.sendEmail = function (to, subject, html) {
  transporter
    .sendMail({
      from: "helperemail14716@gmail.com",
      to,
      subject,
      html, 
    })
    .then((data) => {
      console.log("Email sent successfully:", data);
      console.log("Email sent successfully!");
    });
};
