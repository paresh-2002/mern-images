import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
});

export const User = mongoose.model("user", userSchema);