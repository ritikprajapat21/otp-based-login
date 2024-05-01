import UserModel from "./model/User.model.js";

export const authenticated = async (req, res, next) => {
  console.log(req.body);
  let { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email Required!" });

  const result = await UserModel.findOne({ email }).exec();

  if (!result) return res.status(404).json({ message: "User not found" });

  next();
};
