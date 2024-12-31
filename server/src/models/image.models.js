import mongoose, { Schema } from "mongoose";

const imageSchema = new Schema(
  {
    image: {
      type: String,
      require: true,
    }
  },
  {
    timestamps: true,
  }
);

export const Image = mongoose.model("Image", imageSchema);
