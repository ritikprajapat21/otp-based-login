import { Router } from "express";
import { authenticated } from "../authenticated.middleware.js";
import { sendOtp, verifyOtp } from "../otp/otp.js";

const otpRouter = Router();

otpRouter.post("/", authenticated, sendOtp);

otpRouter.post("/verify", authenticated, verifyOtp);

export default otpRouter;
