import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../model/User.model.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !name || !password)
    return res
      .status(400)
      .json({ message: "Missing Data", name, email, password });

  const exists = await UserModel.findOne({ email }).exec();
  if (exists) return res.status(409).json({ message: "Email already taken" });

  const hashPassword = await bcrypt.hash(password, 10);

  const result = await UserModel.create({
    name,
    email,
    password: hashPassword,
    mobile,
    profile,
  });

  if (!result) return res.status(500).json({ message: "Server error" });

  res.status(201).json({ message: "User created" });
};

export const authenticateUser = async (req, res) => {
  const { email, password: pwd } = req.body;
  if (!email || !pwd) return res.status(400).json({ message: "Missing Data" });

  const foundUser = await UserModel.findOne({ email }).exec();

  if (!foundUser) return res.send(404).json({ message: "User not found" });

  const match = await bcrypt.compare(pwd, foundUser.password);

  if (!match) return res.status(400).json({ message: "Password not match" });

  const { password, ...user } = foundUser.toJSON();

  const accessToken = jwt.sign(
    {
      userID: user._id,
      username: user.email,
    },
    process.env.TOKEN,
    {
      expiresIn: "300s",
    },
  );

  foundUser.save();

  res.json({ user, accessToken });
};

export const logout = async (req, res) => {
  console.log("Logout");
  res.send("logout done");
};
