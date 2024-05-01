import mongoose from "mongoose";

export const connect = async () => {
  // mongodb://localhost:27017
  const conn = await mongoose.connect(
    "mongodb://root:password@0.0.0.0:27017/users?authSource=admin",
  );

  if (!conn) return console.log("Couldn't connect to database");

  console.log("Connected to database");

  return conn;
};
