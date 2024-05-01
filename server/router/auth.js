import express from "express";
import {
  authenticateUser,
  logout,
  registerUser,
} from "../controller/authController.js";

const authRouter = express.Router();

authRouter.get("/register", registerUser);

authRouter.post("/auth", authenticateUser);

authRouter.get("/logout", logout);

export default authRouter;
