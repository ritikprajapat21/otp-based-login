import express from "express";
import dotenv from "dotenv";
import authRouter from "./router/auth.js";
import { connect } from "./connect.js";
import cors from "cors";
import otpRouter from "./router/otp.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.disable("x-powered-by");

app.use("/user", authRouter);

app.use("/otp", otpRouter);

connect()
  .then(app.listen(3001, () => console.log("Running on port 3001")))
  .catch((error) => {
    console.log("Could connect to db");
    console.error(error);
  });

// app.listen(3000, () => console.log("Rn"));
