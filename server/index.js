import express from "express";
import dotenv from "dotenv";
import authRouter from "./router/auth.js";
import { connect } from "./connect.js";
import { sendOtp } from "./otp/otp.js";
import { authenticated } from "./authenticated.middleware.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.disable("x-powered-by");

app.use("/user", authRouter);

app.get("/otp", authenticated, sendOtp);

connect()
  .then(app.listen(3001, () => console.log("Running on port 3001")))
  .catch((error) => {
    console.log("Could connect to db");
    console.error(error);
  });

// app.listen(3000, () => console.log("Rn"));
