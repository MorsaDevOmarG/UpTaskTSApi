import nodemailer from "nodemailer";
import dotenv from 'dotenv';

dotenv.config();

const config = () => {
  // return {
  //   host: "sandbox.smtp.mailtrap.io",
  //   port: 2525,
  //   auth: {
  //     user: "a473447fd7f2bd80a0a2a3",
  //     pass: "b0ab6e5d3a78f407b3b2b1",
  //   }
  // };
  return {
    host: process.env.SMTP_HOST,
    port: +process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  };
};

// Looking to send emails in production? Check out our Email API/SMTP product!
// var transport = nodemailer.createTransport({
//   host: "sandbox.smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "73447fd7f2bd80",
//     pass: "ab6e5d3a78f407",
//   },
// });

export const transporter = nodemailer.createTransport(config());