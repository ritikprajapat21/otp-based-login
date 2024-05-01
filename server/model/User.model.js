import mongoose, { Schema } from "mongoose";

const UserSchema = Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model.Users || mongoose.model("User", UserSchema);
