import mail from "@sendgrid/mail";
import UserModel from "../model/User.model.js";

export const sendOtp = async (req, res) => {
  mail.setApiKey(process.env.SENDGRID_API_KEY);
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const user = await UserModel.findOne({ email: email }).exec();
  user.otp = otp;
  user.save();

  const msg = {
    to: email,
    from: process.env.from_email,
    subject: "OTP for login",
    text: `OTP is ${otp}`,
  };

  mail
    .send(msg)
    .then((res) => console.log(`Email sent: ${res}`))
    .catch((err) => console.log("Erroe", err.response.body.errors));
  return res.status(200).json({ message: "OTP sent to registered email" });
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const user = await UserModel.findOne({ email: email }).exec();

  if (user.otp !== otp) {
    return res.status(400).json({ message: "Incorrect OTP" });
  }

  // Clearing the saved otp
  user.otp = "";
  user.save();

  return res.status(200).json({ message: "Entering..." });
};
