import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || "smtp.gmail.com",
  port: parseInt(process.env.MAIL_PORT) || 587,
  secure: false, // 587 port এ false, 465 এ true
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS, // Gmail App Password
  },
});

export const sendOTPEmail = async (email, name, otp) => {
  const expMin = process.env.OTP_EXPIRES_MIN || 10;
  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: email,
    subject: "ShebaLink — Email Verification Code",
    html: `
 <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;
 padding:32px;border-radius:12px;border:1px solid #eee;">
 <h2 style="color:#0d2b55;margin-bottom:8px;">
 Welcome to ShebaLink, ${name}!
 </h2>
 <p style="color:#555;margin-bottom:16px;">
 Your email verification code is:
 </p>
 <div style="font-size:38px;font-weight:800;letter-spacing:10px;
 color:#d4580a;text-align:center;padding:24px;
 background:#fff7f0;border-radius:8px;margin:0 0 16px;">
 ${otp}
 </div>
 <p style="color:#999;font-size:12px;">
 This code expires in <strong>${expMin} minutes</strong>.
 Do not share it with anyone.
 </p>
 </div>
 `,
  });
};
export default transporter;
